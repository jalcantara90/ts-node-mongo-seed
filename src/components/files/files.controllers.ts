/* Globals */
import { Request, NextFunction } from 'express';
import { badRequest } from "boom";

/* Interfaces */
import { ICustomResponse } from "../../interfaces/IcustomResponse.interface";

/* Services */
import * as fileService from './files.service';

export const getAllFiles = async (req: Request, res: ICustomResponse, next: NextFunction): Promise<void> => {
  try {

    res.body = await fileService.getAllFiles();
    next();
  } catch (error) {
    next( badRequest(error) );
  }
}

export const getFileById = async (req: Request, res: ICustomResponse, next: NextFunction): Promise<void> => {
  try {
    const { fileId } = req.params;

    res.body = await fileService.getFileById(fileId);
    next();
  } catch (error) {
    next( badRequest(error) );
  }
}

export const createFile = async (req: Request, res: ICustomResponse, next: NextFunction): Promise<void> => {
  try {
    const { body } = req;

    if (!body) {
      throw 'Not file sended';
    }

    res.body = await fileService.createFile( body );
    next();
  } catch (error) {
    next( badRequest(error) );
  }
}

export const deleteFile = async (req: Request, res: ICustomResponse, next: NextFunction): Promise<void> => {
  try {
    const { fileId } = req.params;

    res.body = await fileService.deleteFile( fileId );
    next();
  } catch (error) {
    next( badRequest(error) );
  }
}