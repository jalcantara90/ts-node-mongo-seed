/* Globals */
import { Request, NextFunction } from 'express';
import { badRequest, notFound } from 'boom';
import { createWriteStream, createReadStream, unlinkSync } from 'fs';
import Busboy from 'busboy';
import uuid4 from 'uuid/v4';
import archiver, { ArchiverError } from 'archiver';
import { ObjectID } from 'mongodb';

/* Interfaces */
import { ICustomResponse } from '../../interfaces/IcustomResponse.interface';
import { IFile } from './files.schema';

/* Services */
import * as fileService from './files.service';

/* Environment */
import { UPLOAD_PATH } from '@config';

/* Logger */
import { logger } from '@logger';

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
    unlinkSync(res.body.path);
    next();
  } catch (error) {
    next( badRequest(error) );
  }
}
export const uploadFile = async (req: Request, res: ICustomResponse, next: NextFunction): Promise<any> => {
  const busboy = new Busboy({headers: req.headers});
  res.body = [];
  let filesCount = 0;

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      filesCount++;
      const hashName = filename.replace('.', `_${uuid4()}.`);
      
      file.on('data', (data) => logger.info(`File buffer [${filename}] got ${data.length} bytes`) );
      file.on('end', async () => {
        try {
          const file: IFile = {
            name: hashName,
            originalName: filename,
            mimetype,
            path: `${UPLOAD_PATH}/${hashName}`,
            encoding
          };
          const fileSaved = await fileService.createFile(file);
          res.body.push(fileSaved);
          logger.info(`File buffer [${filename}] saved`);
          
          filesCount--;
          if(!filesCount) {
            busboy.emit('finishedAll');
          }
        } catch (error) {
          throw error;
        }
      });
      
      const outStream = createWriteStream(`${UPLOAD_PATH}/${hashName}`);
      file.pipe(outStream);
  });
  busboy.on('finishedAll', () => next() );

  return req.pipe(busboy);
};

export const downloadFile = async (req: Request, res: ICustomResponse, next: NextFunction): Promise<any> => {
  try {
    const { fileId } = req.params;

    const file = await fileService.getFileById( fileId );

    if (!file) {
      throw notFound('File not found');
    }

    const stream = createReadStream(file.path);
    res.type(file.mimetype);
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
}

export const getZip = async (req: Request, res: ICustomResponse, next: NextFunction): Promise<any> => {
  try {
    const { zipName } = req.params;
    const { fileId } = req.query;
    if (!zipName || !fileId || !fileId.length) throw badRequest('Id required');
    let fileErrors: string[] = [];
    const filesIds: ObjectID[] = fileId.map( (id: string) => new ObjectID(id) );
   
    const files = await fileService.getFileMulti(filesIds);

    if (!files.length) {
      throw notFound('Files not found', { notFindedFiles: fileId });
    } else if (fileId.length !== files.length) {
      fileErrors = fileId.filter( (id: string) => files.find( (file: IFile) => file._id !== id) );
      throw notFound('Some file was not found', { notFindedFiles: fileErrors });
    }

    let archive = archiver('zip', {
      zlib: { level: 9 },
      comment: zipName
    });

    archive.on('error', ((err: ArchiverError) => {
      archive.abort();
      logger.error('Unable to archive ' + err);
      
      return res.status(500).send(err);
    }));

    files.forEach( (file: IFile) => {
      const streamFile = createReadStream(file.path);
      archive.append(streamFile, {name: file.originalName });
    });

    archive.pipe(res);
    archive.finalize();
  } catch (error) {
    next(error);
  }
}