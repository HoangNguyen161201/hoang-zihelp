import { NextFunction, Request, Response } from 'express'

const catchAsyncError = (fn: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).then(data => res.status(200).json(data)).catch(next)
}

export default catchAsyncError