/* Globals */
import { Request, NextFunction } from 'express';

/* Logger */
import { logger } from '@logger';

/* Interfaces */
import { ICustomResponse } from '../interfaces/IcustomResponse.interface';

export const loggerMiddleware = (req: Request, res: ICustomResponse, next: NextFunction) => {
  logger.debug(`Before: ${req.method} ${req.path}${buildQueryString(req.query) || ''}`);
  next();
}

export const parserResponseMiddleware = (req: Request, res: ICustomResponse, next: NextFunction) => {
  const { body = {} } = res;
  logger.debug(`After: ${req.method} ${req.path}${buildQueryString(req.query) || ''}`);
  res.status(200).send(body);
  next();
}

const buildQueryString = (query: any): string => Object.keys(query).length ? 
  `?${Object.keys(query).map(key => `${key}=${query[key]}`).join('&')}` : 
  '';
