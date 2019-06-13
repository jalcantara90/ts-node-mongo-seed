/* Globals */
import sinon from 'sinon';
import { ObjectID } from 'mongodb';

/* Schema - Interface */
import { FileModel, IFile } from '../../components/files/files.schema';

/* Service */
import * as fileService from '../../components/files/files.service';

describe('@fileService', () => {

  const sandbox: sinon.SinonSandbox = sinon.createSandbox();

  afterEach( () => sandbox.restore() );

  describe('#createFile', () => {
    it('should call FileModel.create()', done => {
      const fileModelCreate = sandbox.stub(FileModel, 'create');
      const file: IFile = {
        name: 'name',
        originalName: 'name',
        mimetype: 'json',
        encoding: '',
        path: '/'
      }
      fileService.createFile(file);
      done();

      fileModelCreate.calledWith(file);
    })
  });

  describe('#getAllFiles', () => {
    it('should call FileModel.getAllFiles()', done => {
      const fileModelfind = sandbox.stub(FileModel, 'find');

      fileService.getAllFiles();
      done();

      sandbox.assert.called(fileModelfind);
    });
  });

  describe('#getFileById', () => {
    it('should call FileModel.findById()', done => {
      const fileModelFindById = sandbox.stub(FileModel, 'findById');

      fileService.getFileById('1234');
      done();

      fileModelFindById.calledWith('1234');
    });
  });

  describe('#getFileMulti', () => {
    it('should call FileModel.find()', done => {
      const fileModelFind = sandbox.stub(FileModel, 'find');
      const params = [ new ObjectID('5d02288b1b94fe2df3caa2bc'), new ObjectID('5d0228ab1b94fe2df3caa2bd') ]
      fileService.getFileMulti(params);
      done();

      fileModelFind.calledWith({ _id: { $in: params } });
    });
  });

  describe('#deleteFile', () => {
    it('should call FileModel.findByIdAndDelete()', done => {
      const fileModelRemove = sandbox.stub(FileModel, 'findByIdAndDelete');

      fileService.deleteFile('1234');
      done();

      fileModelRemove.calledWith('1234');
    });
  });
});