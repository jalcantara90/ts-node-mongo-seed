/* Globals */
import { Response } from "express";

export interface ICustomResponse extends Response {
  body?: any;
}
