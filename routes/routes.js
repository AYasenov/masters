const testHandler = require('../controller/testcontroller');

module.exports = [
    {
        method: 'post',
        path: '/testroute',
        handler: testHandler
    }
];