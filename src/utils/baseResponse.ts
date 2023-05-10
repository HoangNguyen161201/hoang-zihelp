interface IBaseResponse {
    status: number,
    message: string,
    data: any
}

export class BaseResponse {
    status = 200
    message = ''
    data = null
    constructor({ status = 200, message = '', data }: Partial<IBaseResponse>) {
        this.status = status
        this.message = message
        this.data = data
    }
}