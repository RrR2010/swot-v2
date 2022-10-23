export enum ErrorType {
  GeneralError = "GeneralError",
  ObjectNotFound = "ObjectNotFound",
  ObjectAlreadyExists = "ObjectAlreadyExists",
  MissingBodyParameters = "MissingBodyParameters",
  InvalidBodyParameters = "InvalidBodyParameters",
  InvalidPassword = "InvalidPassword",
  LoginFailed = "LoginFailed",
  Unauthenticated = "Unauthenticated",
};

export class HTTPError extends Error {
  static code: number = 400
  static type: ErrorType = ErrorType.GeneralError
  static message: string = "General HTTP Error"
  static exampleMessage: string = "General HTTP Error"
  constructor(message: string = "General HTTP Error") {
    super(message)
    this.message = message
  }
};

//#region CRUD Errors

class ObjectAlreadyExistsError extends HTTPError {
  static code = 400
  static type = ErrorType.ObjectAlreadyExists
  static exampleMessage = "An object already exists with provided parameters: {parametersNames}"
  constructor(parametersNames: string | string[]) {
    if (typeof parametersNames === 'string') { parametersNames = [parametersNames] }
    super(`An object already exists with provided parameters: ${parametersNames.map(value => `'${value}'`).join(', ')}`)
  }
};

class ObjectNotFoundError extends HTTPError {
  static code = 404
  static type = ErrorType.ObjectNotFound
  static exampleMessage = "The object was not founded with provided parameters: {parametersNames}"
  constructor(parametersNames: string | string[]) {
    if (typeof parametersNames === 'string') { parametersNames = [parametersNames] }
    super(`The object was not founded with provided parameters: ${parametersNames.map(value => `'${value}'`).join(', ')}`)
  }
};

//#endregion

//#region Request Errors

class MissingBodyParametersError extends HTTPError {
  static code = 400
  static type = ErrorType.MissingBodyParameters
  static exampleMessage = "Request body missing the parameters: {parametersNames}"
  constructor(parametersNames: string | string[]) {
    if (typeof parametersNames === 'string') { parametersNames = [parametersNames] }
    super(`Request body missing the parameters: ${parametersNames.map(value => `'${value}'`).join(', ')}`)
  }
};

class InvalidBodyParameters extends HTTPError {
  static code = 400
  static type = ErrorType.InvalidBodyParameters
  static exampleMessage = "The provided parameters was invalid: {parametersNames}"
  constructor(parametersNames: string | string[]) {
    if (typeof parametersNames === 'string') { parametersNames = [parametersNames] }
    super(`The provided parameters was invalid: ${parametersNames.map(value => `'${value}'`).join(', ')}`)
  }
};

//#endregion

//#region Login Errors

class LoginError extends HTTPError {
  static code = 500
  static type = ErrorType.LoginFailed
  static exampleMessage = "Error occurred while trying to login to the server."
  constructor() {
    super("Error occurred while trying to login to the server.")
  }
};

class UnauthenticatedError extends HTTPError {
  static code = 401
  static type = ErrorType.Unauthenticated
  static exampleMessage = "You are not authenticated. Please send the authorization token with the request."
  constructor() {
    super("You are not authenticated. Please send the authorization token with the request.")
  }
};

//#endregion

export const ERRORS = {
  HTTPError,
  ObjectAlreadyExistsError,
  ObjectNotFoundError,
  MissingBodyParametersError,
  InvalidBodyParameters,
  LoginError,
  UnauthenticatedError,
}