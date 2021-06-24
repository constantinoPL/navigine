import { httpStatusCodes } from '../common/http.status-codes';

export class ApiError extends Error {
  status: httpStatusCodes;
  errors: Array<Error>;

  constructor(status: httpStatusCodes, message: string, errors: Array<Error> = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: Array<Error> = []) {
    return new ApiError(httpStatusCodes.BAD_REQUEST, message, errors);
  }

  static AccessDenied(message: string, errors: Array<Error> = []) {
    return new ApiError(httpStatusCodes.ACCESS_DENIED, message, errors);
  }

  static NotFound(message: string, errors: Array<Error> = []) {
    return new ApiError(httpStatusCodes.NOT_FOUND, message, errors);
  }

  // TODO: make generic method
}
