/* Globals */
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

/* Config */
import { MONGODB_HOST } from '@config';

/* Logger */
import { logger } from '@logger';

export class MongoLib {
  private options: object = {
    useNewUrlParser: true,
    autoIndex: false
  }

  constructor() {
    mongoose.set('useCreateIndex', true);
    mongoose.set('debug', process.env.DEBUG || false );
  }

  public connect(): void {
    mongoose.connect( MONGODB_HOST, this.options, (err: MongoError) => {
      if (err) {
        logger.error(`ERROR connecting to: ${MONGODB_HOST}. ${err}`);
      } else {
        logger.info(`Successfully connection to: ${MONGODB_HOST}.`);
      }
    });
  }
}