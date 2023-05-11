interface IBaseResponse {
    data: any
    error: string
    message: string
    success: boolean
}

export class BaseResponse {
    success = true
    data = null
    error
    message
    constructor({ success = true, data, error, message }: Partial<IBaseResponse>) {
        this.data = data
        this.success = success
        this.error = error
        this.message = message
    }
}