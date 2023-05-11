import { Express, NextFunction, Request, Response } from 'express'
import { BaseResponse } from '../../utils/baseResponse'

export type ErrorInfo = {
    code?: string,
    statusCode?: number
} & Error

const handleError = (app: Express) => {
    app.use('*', ({ message, statusCode = 500, code }: ErrorInfo, _: Request, res: Response, next: NextFunction) => {

        const response = new BaseResponse({
            error: code == '22P02' ? 'Resource not found' : JSON.parse(message),
            success: false
        })
        return res.status(code == '22P02' ? 404 : statusCode).json(response)
    })
}

export default handleError