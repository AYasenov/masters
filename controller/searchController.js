const config = require('config');
const Promise = require('bluebird');
const _ = require('lodash');

const Ranking = require('../services/RankingClass');

const googleMapsClient = require('@google/maps').createClient({
    key: config.get('googleApiKey'),
    Promise: Promise
});

const _groupedTypes = {
    transport: ['airport', 'bus_station', 'subway_station', 'train_station'],
    education: ['library', 'school'],
    health: ['hospital', 'dentist', 'doctor'],
    recreation: ['amusement_park', 'aquarium', 'art_gallery', 'bar', 'cafe', 'cemetery', 'zoo', 'stadium', 'park'],
    shopping: ['bakery', 'clothing_store', 'department_store', 'electronics_store', 'store'],
    other: ['atm', 'bank', 'gym', 'car_wash', 'parking']
};

const _tmpRanking = {
    1: ['transport'],
    2: ['health', 'education']
};

const _calculate = async (radius, estate, prettyEstate) => {
    const types = [];
    _.forEach(_tmpRanking, (value) => {
        value.forEach(type => {
            types.push(type);
        });
    });

    //add promises arrays by type
    const grouppedPromises = types.map(type => {
        return Promise.all(_groupedTypes[type].map(subtype => { //search nearby objects by subtype
            return googleMapsClient.placesNearby({location: estate.location, radius, type: subtype}).asPromise();
        }));
    });

    //make request
    const infraObjects = await Promise.all(grouppedPromises);

    /**
     groupedResult = {
        education: [{}, {}, {}],
        transport: [{}, {}, {}]
     }
     */
        //group results by infrastructure categories

    const groupedResult = {};
    types.forEach((type, index) => {
        groupedResult[type] = {objects: []};

        infraObjects[index].forEach(infraObj => {
            infraObj.json.results.forEach(obj => {
                groupedResult[type].objects.push(obj);
            });
        });
    });

    const rankObj = new Ranking(_tmpRanking);
    rankObj.calculateRanks();
    rankObj.calculateUtilityCoeff();

    const resultEstate = Object.assign({generalMark: 0, infra: {}}, estate);

    //calculate distance
    for (const prop in groupedResult) {
        const tempVariable = await googleMapsClient.distanceMatrix({
            mode: 'walking',
            origins: estate.location,
            destinations: groupedResult[prop].objects.map(obj => {
                return `place_id:${obj.place_id}`
            }).join('|')
        }).asPromise();

        groupedResult[prop].generalMark = 0;

        //add distance to the objects
        groupedResult[prop].objects.forEach((item, index) => {
            try {
                item.distance = tempVariable.json.rows[0].elements[index].distance.value;
            } catch (err) {
                item.distance = Infinity;
            }

            if (item.distance < radius) {
                item.distanceRel = -(item.distance - radius) / radius;
            } else {
                item.distanceRel = 0;
            }
        });

        //sort infrastructure array by distance from low to high
        groupedResult[prop].objects.sort((a, b) => {
            if (a.distance < b.distance) {
                return -1;
            }
            if (a.distance > b.distance) {
                return 1;
            }
            return 0;
        });

        groupedResult[prop].objects.forEach((item, index) => {
            item.rate = item.distanceRel * Math.pow(0.5, (index + 1)) * (item.rating ? item.rating / 5 : 0.5);
            groupedResult[prop].generalMark += item.rate;
        });

        for (const prop1 in _tmpRanking) {
            if (_tmpRanking[prop1].indexOf(prop) !== -1) {
                groupedResult[prop].generalMark = groupedResult[prop].generalMark * rankObj.utilityCoeff[prop1];
                break;
            }
        }

        resultEstate.generalMark += groupedResult[prop].generalMark;
        resultEstate.infra[prop] = prettyEstate(groupedResult[prop].objects);
    }
    return resultEstate;
};

module.exports = async (request, h) => {
    const radius = request.payload.radius;
    const estates = request.payload.estates;

    const marks = [];

    for (let i = 0; i < estates.length; i++) {
        marks.push(await _calculate(radius, estates[i], request.server.methods.prettyEstate));
    }

    return marks;
};