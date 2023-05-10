import { Request } from 'express';
import { BaseResponse } from '../utils/baseResponse';
import validationError from '../utils/validationError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import userService from './user.service';

class UserController {
    async find(req: Request) {
        const { id } = req.query
        let data
        if (!id) {
            data = await userService.findAll()
        } else {
            data = await userService.findById(id as string)
        }
        return new BaseResponse({
            message: 'Get user successfully',
            data
        })
    }

    async create(req: Request) {
        const dto = req.body as CreateUserDto

        // validate
        await validationError(CreateUserDto, dto)

        const data = await userService.create(dto)
        return new BaseResponse({
            message: 'Create user successfully',
            data
        })
    }

    async update(req: Request) {
        const { id } = req.params
        const dto = req.body as UpdateUserDto

        // validate
        await validationError(UpdateUserDto, dto)

        const data = await userService.update(id, dto)
        return new BaseResponse({
            message: 'Update user successfully',
            data
        })
    }

    async delete(req: Request) {
        const { id } = req.params
        await userService.delete(id)
        return new BaseResponse({
            message: 'Delete user successfully',
        })
    }

    async search(req: Request) {
        const { name } = req.query
        const data = await userService.search(name as string)
        return new BaseResponse({
            message: 'Search users successfully',
            data
        })
    }
}

export default new UserController
