export interface IError {
  message: string;
  errorReference: string;
}

export class Result<T> {
  public httpStatusCode: 500;
  public error: boolean;
  public errorReference: string;
  public message: string;
  public data?: T;

  private constructor(httpStatusCode, message, error, errorReference?, data?) {
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.error = error;
    this.data = data;
    this.errorReference = errorReference;

    Object.freeze(this);
  }

  public static BadRequest(data: IError) {
    throw new Result(400, data.message, true, data.errorReference);
  }
  public static Conflict(data: IError) {
    throw new Result(409, data.message, true, data.errorReference);
  }
  public static Created<OutPut>(data: OutPut): Result<OutPut> {
    return new Result<OutPut>(201, null, false, null, data);
  }
  public static Ok<OutPut>(data?: OutPut): Result<OutPut> {
    return new Result<OutPut>(201, null, false, null, data);
  }
}
