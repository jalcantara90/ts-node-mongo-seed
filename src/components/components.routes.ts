/* Globals */
import { Router } from 'express';

/* Middlewares */
import { parserResponseMiddleware, loggerMiddleware } from '../middlewares/logger.middleware';

/* Routes */
import fileRouter from './files/files.routes';

const componentsRouter: Router = Router();

export default () => {
  componentsRouter.use(loggerMiddleware);

  componentsRouter.use('/files', fileRouter());
  
  componentsRouter.use(parserResponseMiddleware);
  return componentsRouter;
}
