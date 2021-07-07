import { CustomError } from './custom-error';


export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error Connecting to database";
  constructor() {
    super("Error connecting DB");
    // Only because we are extending a built in object
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.reason }
    ]
  }
}
