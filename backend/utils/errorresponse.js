export default class ErrorResponse extends Error {
  constructor(message, status = 500, extras = undefined) {
    super(message);
    this.name = "ErrorResponse";
    this.status = Number.isInteger(status) ? status : 500;
    if (extras && typeof extras === "object") {
      this.extras = extras;
    }
    Error.captureStackTrace?.(this, this.constructor);
  }
}


