const config = require('config');
const Hapi = require('hapi');
const routes = require('./routes/routes');

const server = Hapi.server({
    port: config.get('server.port'),
    host: config.get('server.host')
});

server.route(routes);

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();