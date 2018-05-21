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

module.exports = async (request, h) => {
    const radius = request.payload.radius;
    const location = request.payload.location;
    // const types = request.payload.types;

    const types = [];
    _.forEach(_tmpRanking, (value) => {
        value.forEach(type => {
            types.push(type);
        });
    });

    //add promises arrays by type
    const grouppedPromises = types.map(type => {
        return Promise.all(_groupedTypes[type].map(subtype => { //search nearby objects by subtype
            return googleMapsClient.placesNearby({location, radius, type: subtype}).asPromise();
        }));
    });

    //make request
    const result = await Promise.all(grouppedPromises);

    /**
     groupedResult = {
        education: [{}, {}, {}],
        transport: [{}, {}, {}]
     }
     */
        //group results by infrastructure categories
    const groupedResult = {};
    types.forEach((type, index) => {
        groupedResult[type] = [];

        result[index].forEach(infraObj => {
            infraObj.json.results.forEach(obj => {
                groupedResult[type].push(obj);
            });
        });
    });

    //calculate distance
    for (const prop in groupedResult) {
        const result = await googleMapsClient.distanceMatrix({
            mode: 'walking',
            origins: location,
            destinations: groupedResult[prop].map(obj => {
                return `place_id:${obj.place_id}`
            }).join('|')
        }).asPromise();

        //add distance to the objects
        groupedResult[prop].forEach((item, index) => {
            item.distance = result.json.rows[0].elements[index].distance.value
        });

        //sort infrastructure array by distance from low to high
        groupedResult[prop].sort((a, b) => {
            if (a.distance < b.distance) {
                return -1;
            }
            if (a.distance > b.distance) {
                return 1;
            }
            return 0;
        });
    }

    const rankObj = new Ranking(_tmpRanking);
    rankObj.calculateRanks();
    rankObj.calculateUtilityCoeff();

    return 'Hello world';
};