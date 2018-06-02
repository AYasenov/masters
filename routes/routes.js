const searchHandler = require('../controller/searchController');

const _estates = [
    {
        name: '3T flat near Peremoha station',
        id: 1,
        photo: 'https://img01-olxua.akamaized.net/img-olxua/655259036_2_1000x700_prodam-2-komkv-hgora-fotograf_rev001.jpg',
        location: '50.059527,36.201539',
        price: 80000,
        params: [
            {value: 80000, name: 'price'},
            {value: 3, name: 'bedrooms'},
            {value: 80, name: 'area'}
        ]
    },
    {
        name: '3T flat near HTZ market',
        id: 2,
        location: '49.939402,36.378565',
        price: 6000,
        photo: 'https://img01-olxua.akamaized.net/img-olxua/427059082_8_1000x700_otel-kvartira-arenda-dlya-devochek-_rev011.jpg',
        params: [
            {value: 60000, name: 'price'},
            {value: 3, name: 'bedrooms'},
            {value: 68, name: 'area'}
        ]
    },
    {
        name: '3T flat in Rohan',
        location: '49.912116,36.408962',
        id: 3,
        price: 58000,
        photo: 'https://img01-olxua.akamaized.net/img-olxua/656752510_2_1000x700_vnimanie-2-k-izkvartiru-n-doma-ul-harkovskih-diviziy-fotografii.jpg',
        params: [
            {value: 58000, name: 'price'},
            {value: 3, name: 'bedrooms'},
            {value: 70, name: 'area'}
        ]
    }
];

module.exports = [
    {
        method: 'post',
        path: '/search',
        handler: searchHandler
    },
    {
        method: 'get',
        path: '/',
        handler: {
            file: function (request) {
                return 'index.html';
            }
        }
    },
    {
        method: 'get',
        path: '/estates',
        handler: function (request, h) {
            return _estates.sort((a, b) => {
                if (a.price < b.price) {
                    return -1;
                }

                if (a.price > b.price) {
                    return 1;
                }

                return 0;
            });
        }
    },
    {
        method: 'GET',
        path: '/static/{filename*}',
        handler: function (request, h) {
            return h.file(`../build/static/${request.params.filename}`);
        }
    }
];