/* Globals */
import { badImplementation } from 'boom';
import { ObjectID } from 'mongodb';

/* Schema - Models */
import { FileModel, IFile } from './files.schema';

export const createFile = async ( file: IFile ): Promise<IFile>  => {
  try {
    return await FileModel.create(file);
  } catch (error) {
    throw badImplementation(error);
  }
}

export const getAllFiles = async (): Promise<IFile[]>  => {
  try {
    return await FileModel.find();
  } catch (error) {
    throw badImplementation(error);
  }
}

export const getFileById = async ( fileId: string ): Promise<IFile | null>  => {
  try {
    return await FileModel.findById(fileId);
  } catch (error) {
    throw badImplementation(error);
  }
}

export const getFileMulti = async ( filesId: ObjectID[] ): Promise<IFile[]> => {
  try {
    return await FileModel.find({_id: { $in: filesId } });
  } catch (error) {
    throw badImplementation(error);
  }
}

export const deleteFile = async ( fileId: string ): Promise<IFile | null>  => {
  try {
    return await FileModel.findByIdAndDelete(fileId);
  } catch (error) {
    throw badImplementation(error);
  }
}
