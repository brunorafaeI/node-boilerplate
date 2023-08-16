import { NextFunction, Request, Response } from 'express'

export class AppError extends Error {

  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super()
  }

  static handler(
    err: any,
    req: Request,
    res: Response,
    _: NextFunction
  ) {
    const { message, statusCode } = err

    if (statusCode) {
      return res.status(statusCode).json({ message})
    }

    return res.status(500).json({
      message: "Internal server error."
    })
  }
}
