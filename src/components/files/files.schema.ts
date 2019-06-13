/* Globals */
import { prop, Typegoose } from 'typegoose';

export interface IFile {
  _id?: string;
  name: string;
  originalName: string;
  mimetype: string;
  path: string;
  encoding: string;
}

export class File extends Typegoose {
  @prop({ required: true }) name: string;
  @prop({ required: true }) originalName: string;
  @prop({ required: true }) mimetype: string;
  @prop({ required: true }) path: string;
  @prop({ required: true }) encoding: string;
}

export const FileModel = new File().getModelForClass(File);
