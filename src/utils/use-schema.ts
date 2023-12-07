import { NextFunction, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'

export const useSchema =
  (schema: swaggerUI.JsonObject) =>
  (req: Request, res: Response, next: NextFunction) =>
    swaggerUI.setup(schema)(req, res, next)
