import reasonPhrases from '@/constants/http-status-code/reason-phrases'
import statusCodes from '@/constants/http-status-code/status-codes'

class ErrorResponse extends Error {
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message: string = reasonPhrases.CONFLICT,
    statusCode: number = statusCodes.CONFLICT,
  ) {
    super(message, statusCode)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message: string = reasonPhrases.FORBIDDEN,
    statusCode: number = statusCodes.FORBIDDEN,
  ) {
    super(message, statusCode)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message: string = reasonPhrases.NOT_FOUND,
    statusCode: number = statusCodes.NOT_FOUND,
  ) {
    super(message, statusCode)
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(
    message: string = reasonPhrases.UNAUTHORIZED,
    statusCode: number = statusCodes.UNAUTHORIZED,
  ) {
    super(message, statusCode)
  }
}

export {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
  UnauthorizedError,
}
