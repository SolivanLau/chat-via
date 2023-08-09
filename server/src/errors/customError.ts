export class CustomApiError extends Error {
  statusCode: number;
  info?: Record<string, any>;
  constructor(message: string, statusCode: number, info?: Record<string, any>) {
    super(message);
    this.statusCode = statusCode;
    this.info = info;
  }
}

export const createCustomError = (
  msg: string,
  statusCode: number,
  info: Record<string, any>
) => {
  return new CustomApiError(msg, statusCode, info);
};
