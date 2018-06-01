const testHandler = require('../controller/testcontroller');

module.exports = [
    {
        method: 'post',
        path: '/testroute',
        handler: testHandler
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