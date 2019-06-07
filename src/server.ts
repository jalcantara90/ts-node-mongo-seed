/* Globals */
import express from 'express';

/* Config */
import { PORT } from '@config';

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: string | undefined;

  constructor() {
    this.app = express();
    this.port = PORT;
  }

  public static get instance(): Server {
    return this._instance || ( this._instance = new this() );
  }

  listen( callback: Function ): void {
    this.app.listen( this.port, callback(this) );
  }
}
