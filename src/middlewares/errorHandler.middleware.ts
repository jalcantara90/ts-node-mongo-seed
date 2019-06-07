/* Globals */
import { Request, Response, NextFunction } from 'express';

/* Logger */
import { logger } from '@logger';

export const logErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.isBoom) {
    const error: string = `${err.output.statusCode}: ${err.output.payload.error} - ${err.output.payload.message}`;
    logger.error(error);
    logger.error(err.stack);
  }

  next(err);
}

export const clientErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (req.xhr) {
    res.status(500).json({err: err.message});
  } else {
    if (err.isBoom) {
      return res.status(err.output.statusCode).send({ error: err.output.payload });
    }

    res.status(500).send(err);
  }
}
