/* Globals */
import sinon from 'sinon';
import { Request } from 'express';
import { badRequest } from 'boom';
import { unlinkSync } from 'fs';

/* Interface */
import { ICustomResponse } from '../../interfaces/IcustomResponse.interface';
import { IFile } from '../../components/files/files.schema';

/* Service */
import * as fileService from '../../components/files/files.service';

/* Controller */
import * as fileController from '../../components/files/files.controllers';

describe('@FileController', () => {
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();
  const next = (value?: any) => ({});
  const nextSpy = sandbox.spy(next);
  const badRequestSpy = sandbox.spy(badRequest);
  const unlinkSyncSpy = sandbox.spy(unlinkSync);

  afterEach(sandbox.restore);

  describe('#getAllFiles', () => {
    it('should call fileService.getAllFiles', done => {
      const fileServiceAllFiles = sandbox.stub(fileService, 'getAllFiles');

      fileController.getAllFiles({} as Request, {} as ICustomResponse, next);
      done();
      sandbox.assert.called(fileServiceAllFiles);
      sandbox.assert.called(nextSpy);
    });
  });

  describe('#getFileById', () => {
    it('should call fileService.getFileById', done => {
      const fileServiceGetFileById = sandbox.stub(fileService, 'getFileById');

      fileController.getFileById({ params: { fileId: '1234' } } as Request, {} as ICustomResponse, next);
      done();
      fileServiceGetFileById.calledWith('1234');
      sandbox.assert.called(nextSpy);
    });
  });

  describe('#createFile', () => {
    it('should call fileService.createFile', done => {
      const fileServiceCreateFile = sandbox.stub(fileService, 'createFile');
      const file: IFile = {
        name: 'name',
        originalName: 'name',
        mimetype: 'json',
        encoding: '',
        path: '/'
      };

      fileController.createFile({ body: file } as Request, {} as ICustomResponse, next);
      done();
      fileServiceCreateFile.calledWith(file);
      sandbox.assert.called(nextSpy);
    });

    it('should call badRequest', done => {
      fileController.createFile({} as Request, {} as ICustomResponse, next);
      done();
      sandbox.assert.called(badRequestSpy);
      sandbox.assert.called(nextSpy);
    });
  });

  describe('#deleteFile', () => {
    it('should', done => {
      const file: IFile = {
        name: 'name',
        originalName: 'name',
        mimetype: 'json',
        encoding: '',
        path: '/'
      };

      const fileServiceDeleteFile = sandbox.stub(fileService, 'deleteFile').returns( Promise.resolve(file) );
      fileController.deleteFile({ params: { fileId: '1234' } } as Request, {} as ICustomResponse, next);
      done();
      fileServiceDeleteFile.calledWith('1234');
      unlinkSyncSpy.calledWith(file.path);
      sandbox.assert.called(nextSpy);
    });
  });
});
