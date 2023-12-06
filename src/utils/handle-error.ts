import { NextFunction, Request, Response } from 'express'

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.status ?? 500

  res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  })
  next()
}
