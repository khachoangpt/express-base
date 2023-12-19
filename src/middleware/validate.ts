import { z } from 'zod'

import { ConflictRequestError } from '@/core/error.response'

export const validator = async <T>(
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>,
  requestBody: unknown,
): Promise<T> => {
  try {
    const parseData = (await schema.parseAsync(requestBody)) as T
    return parseData
  } catch (error) {
    if (error instanceof z.ZodError) {
      error = error.issues.map((e) => ({ path: e.path[0], message: e.message }))
    }
    throw new ConflictRequestError(JSON.stringify(error))
  }
}
