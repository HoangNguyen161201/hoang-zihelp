import { Express, NextFunction, Request, Response } from 'express'

export type ErrorInfo = {
    code?: string,
    statusCode?: number
} & Error

const handleError = (app: Express) => {
    app.use('*', ({ message, statusCode = 500, code }: ErrorInfo, _: Request, res: Response, next: NextFunction) => {

        return res.status(statusCode).json({
            message: code == '22P02' ? 'Resource not found' : JSON.parse(message),
            status: code == '22P02' ? 404 : statusCode
        })
    })
}

export default handleError