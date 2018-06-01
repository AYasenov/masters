exports.plugin = {
    pkg: require('../package.json'),
    register: async function(server, options) {
        server.method('getMappedTypes');
    }
};