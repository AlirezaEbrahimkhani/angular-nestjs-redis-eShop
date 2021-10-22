import { HttpVerb } from '.';

export type RequestHandler = {
  [verb in HttpVerb]: any;
};
