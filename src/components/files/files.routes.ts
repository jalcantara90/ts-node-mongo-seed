/* Globals */
import { Router } from 'express';

/* Controller */
import * as filesController from './files.controllers';

const fileRouter: Router = Router();

export default () => {

  fileRouter.get('/', filesController.getAllFiles);
  fileRouter.get('/:fileId', filesController.getFileById);
  fileRouter.post('/', filesController.createFile);
  fileRouter.delete('/:fileId', filesController.deleteFile);

  return fileRouter;
}