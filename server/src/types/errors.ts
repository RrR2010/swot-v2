export enum ErrorType {
  GeneralError = "GeneralError",
  ObjectAlreadyExists = "ObjectAlreadyExists",
  MissingBodyParameters = "MissingBodyParameters",
  InvalidTypesBodyParameters = "InvalidTypesBodyParameters",
  InvalidPassword = "InvalidPassword",
  LoginFailed = "LoginFailed",
  Unauthenticated = "Unauthenticated",
}

export class BaseError extends Error {
  code: number;
  type: ErrorType;
  detail: string;
  helpUrl: string;
  constructor(code: number, type: ErrorType, message: string, detail: string, helpUrl: string) {
    super(message);
    this.code = code;
    this.type = type;
    this.detail = detail;
    this.helpUrl = helpUrl;
  }
};

//#region CRUD Errors

export class ObjectAlreadyExistsError extends BaseError {
  constructor(existingParametersNames: string | string[]) {
    if (typeof existingParametersNames === 'string') { existingParametersNames = [existingParametersNames] }
    super(
      400,
      ErrorType.ObjectAlreadyExists,
      `An object already exists with provided parameters: ${existingParametersNames.map(value => `'${value}'`).join(', ')}`,
      'Please create a new object with different parameters.',
      ""
    );
  };
};

export class ObjectNotFoundError extends BaseError {
  constructor(seachParametersNames: string | string[]) {
    if (typeof seachParametersNames === 'string') { seachParametersNames = [seachParametersNames] }
    super(
      400,
      ErrorType.ObjectAlreadyExists,
      `The object was not founded with provided parameters: ${seachParametersNames.map(value => `'${value}'`).join(', ')}`,
      'Please provide a new search with different parameters.',
      ""
    );
  };
};

//#endregion

//#region Request Errors

export class MissingBodyParametersError extends BaseError {
  constructor(missingParametersNames: string | string[]) {
    if (typeof missingParametersNames === 'string') { missingParametersNames = [missingParametersNames] }
    super(
      400,
      ErrorType.MissingBodyParameters,
      `Request body missing the parameters: ${missingParametersNames.map(value => `'${value}'`).join(', ')}`,
      'Send a request with correct parameters.',
      ""
    );
  };
};

//#endregion

//#region Login Errors

export class InvalidPasswordError extends BaseError {
  constructor() {
    super(
      400,
      ErrorType.InvalidPassword,
      "The provided password is invalid.",
      "Please enter a valid password.",
      ""
    );
  }
};

export class LoginError extends BaseError {
  constructor() {
    super(
      500,
      ErrorType.LoginFailed,
      "Error occurred while trying to login to the server.",
      "Please try again later.",
      ""
    );
  }
};

export class UnauthenticatedError extends BaseError {
  constructor() {
    super(
      403,
      ErrorType.Unauthenticated,
      "You are not authenticated.",
      "Please send the authorization token with the request.",
      ""
    )
  }
};

//#endregion