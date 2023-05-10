import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ErrorInfo } from '../common/middlewares/handleError.middleware';

async function validationError(classDto: any, data: any): Promise<void> {
    const parseDto = plainToClass(classDto, data);
    const errors = await validate(parseDto);

    if (errors.length > 0) {
        const validationErrors = errors.map(error => {
            const { constraints } = error;
            return Object.values(constraints as any)[0]
        });
        const error = (new Error(JSON.stringify(validationErrors)) as ErrorInfo)
        error.statusCode = 400
        throw error;
    }
}

export default validationError







