import { Response } from 'express';
import { ErrorMessageInterface, SuccessMessageInterface} from '../../../common/interfaces/Response.interface'

import { RESPONSE_CODES } from '../../../common/utils/consts';
import { ERRORS } from '../utils/serverMessages';
import { SERVICES } from '../../../common/utils/consts';

export function successResponse(res: Response, message: string, statusCode: number): void {
  res
    .status(statusCode || RESPONSE_CODES.success)
    .send({
      error: '',
      body: message
    });
}

export function errorResponse(res: Response, message: string, statusCode: number):void {
  res
    .status(statusCode || RESPONSE_CODES.error)
    .send({
      error: message,
      body: ''
    });
}
export function jsonSuccess(res: Response, data: any, statusCode: number, success: SuccessMessageInterface): void {
  success.servicesVersion = SERVICES;
  res
    .status(statusCode || RESPONSE_CODES.success)
    .json({
      success,
      data
    });
}

export function jsonError(res: Response, statusCode: number, error: ErrorMessageInterface, serverError?: any): void {
  res
    .status(statusCode || RESPONSE_CODES.error)
    .json({
      error,
      serverError
  });
}

export function jsonBadRequest(res: Response): void {
  res
    .status(RESPONSE_CODES.badRequest)
    .json(ERRORS.badRequest)
}
