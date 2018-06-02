const _ = require('lodash');

exports.plugin = {
    pkg: require('../package.json'),
    register: async function(server, options) {
        server.method('prettyEstate', (infraCat) => {
           return infraCat.map(item => {
               return {
                   distance: item.distance,
                   name: item.name,
                   rating: item.rating,
                   rate: item.rate
               }
           })
        });
    }
};