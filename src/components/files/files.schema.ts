/* Globals */
import { prop, Typegoose } from 'typegoose';

export class File extends Typegoose {
  @prop({ required: true }) name: string;
  @prop({ required: true }) mimeType: string;
  @prop({ required: true }) path: string;
}

export const FileModel = new File().getModelForClass(File);
