import { NextFunction, Request, Response } from "express";
import { jsonBadRequest } from "../../lib/Response";

type Place = 'body' | 'query' | 'header';

function validator(req: Request, place: Place, param: string): boolean {
  if (req[place]) {
    const data = req[place][param];
    if (data === true || data === false || data === 0) {
      return true
    }
    if (!Boolean(data)) {
      return false;
    }
    return true;
  }
  return false;
}

export function bodyValidator(params: Array<string>) {
  return (req: Request, resp: Response, next: NextFunction) => {
    let isValid = true;
    for(let i = 0 ; i < params.length ; i++) {
      isValid = validator(req, 'body', params[i]);
      if (!isValid) { break; }
    }
    if (!isValid){
      return jsonBadRequest(resp);
    }
    next();
  }
}

export function queryValidator(params: Array<string>) {
  return (req: Request, resp: Response, next: NextFunction) => {
    let isValid = true;
    for(let i = 0 ; i < params.length ; i++) {
      isValid = validator(req, 'query', params[i]);

      if (!isValid) { break; }
    }
    if (!isValid){
      return jsonBadRequest(resp);
    }
    next();
  }
}
