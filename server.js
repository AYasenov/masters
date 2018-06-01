const config = require('config');
const Hapi = require('hapi');
const routes = require('./routes/routes');
const Path = require('path');

const server = Hapi.server({
    port: config.get('server.port'),
    host: config.get('server.host'),
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'build')
        }
    }
});

const init = async () => {

    await server.register(require('inert'));

    server.route(routes);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();