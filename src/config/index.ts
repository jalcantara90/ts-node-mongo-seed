/* Globals */
import * as dotenv from 'dotenv';
import path from 'path';

const __basedir = path.join( __dirname, '..', '..' );
let environmentPath: string;
  
switch (process.env.NODE_ENV) {
  case 'prod':
    environmentPath = path.join( __basedir, '.env' );
    break;
  default:
    environmentPath = path.join( __basedir, '.env.development' );
    break;
}

dotenv.config({ path: environmentPath });  
export const PORT: string | undefined = process.env.PORT;
export const MONGODB_HOST: string = process.env.MONGODB_HOST || 'mongodb://localhost:27017/files';
export const UPLOAD_PATH: string = path.join( __basedir, 'dist', 'uploads' );

