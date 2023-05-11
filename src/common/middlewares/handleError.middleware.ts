import { Express, NextFunction, Request, Response } from 'express'
import { BaseResponse } from '../../utils/baseResponse'

export type ErrorInfo = {
    code?: string,
    statusCode?: number
} & Error

const handleError = (app: Express) => {
    app.use('*', ({ message, statusCode = 500, code }: ErrorInfo, _: Request, res: Response, next: NextFunction) => {
        if (code == '22P02') {
            message = 'Resource not found'
            statusCode = 404
        } else {
            try {
                message = JSON.parse(message)
            } catch (err) { }
        }
        const response = new BaseResponse({
            error: message,
            success: false
        })
        return res.status(statusCode).json(response)
    })
}

export default handleError