/* Globals */
import { badImplementation } from 'boom';

/* Schema - Models */
import { File, FileModel } from './files.schema';

export const createFile = async ( file: File ): Promise<File>  => {
  try {
    return await FileModel.create(file);
  } catch (error) {
    throw badImplementation(error);
  }
}

export const getAllFiles = async (): Promise<File[]>  => {
  try {
    return await FileModel.find();
  } catch (error) {
    throw badImplementation(error);
  }
}

export const getFileById = async ( fileId: string ): Promise<File | null>  => {
  try {
    return await FileModel.findById(fileId);
  } catch (error) {
    throw badImplementation(error);
  }
}

export const deleteFile = async ( fileId: string ): Promise<File | null>  => {
  try {
    return await FileModel.findByIdAndDelete(fileId);
  } catch (error) {
    throw badImplementation(error);
  }
}
