const searchHandler = require('../controller/searchController');

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
            file: function(request) {
                return 'index.html';
            }
        }
    },
    {
        method: 'GET',
        path: '/static/{filename*}',
        handler: function(request, h) {
            return h.file(`../build/static/${request.params.filename}`);
        }
    }
];