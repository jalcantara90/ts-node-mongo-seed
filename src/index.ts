/* Globals */
import 'module-alias/register';
import bodyParser from 'body-parser';
import cors from 'cors';

/* server */
import Server from './server';

/*  Routes */
import routes from './components/components.routes';
import { logger } from '@logger';

/* Middlewares */
import { loggerMiddleware, parserResponseMiddleware } from './middlewares/logger.middleware';
import { logErrors, clientErrorHandler } from './middlewares/errorHandler.middleware';

/* Swagger */
import swaggerConfig from './libs/swagger-docs';

/* MongoLib */
import { MongoLib } from '@MongoLib';

const server = Server.instance;
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// Initialize mongodb connection
new MongoLib().connect();

server.app.use('/docs', swaggerConfig);

//CORS only available in dev
if (process.env.NODE_ENV === 'dev') {
  server.app.use( cors({ origin: true, credentials: true }) );
}

// routes
server.app.use('/api', routes());

server.app.use(logErrors);
server.app.use(clientErrorHandler);

server.listen( () => logger.info(`server running on http://localhost:${process.env.PORT}`) );
