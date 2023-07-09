export interface IError {
  message: string;
  code: string;
}

export class Result<T> {
  public httpStatusCode: 500;
  public error: boolean;
  public code: string;
  public message: string;
  public data?: T;

  private constructor(httpStatusCode, message, error, code?, data?) {
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.error = error;
    this.data = data;
    this.code = code;

    Object.freeze(this);
  }

  public static Conflict(data: IError) {
    throw new Result(409, data.message, true, data.code);
  }

  public static Created<OutPut>(data: OutPut): Result<OutPut> {
    return new Result<OutPut>(201, null, false, null, data);
  }
}
