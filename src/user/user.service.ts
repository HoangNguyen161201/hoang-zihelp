import { ErrorInfo } from "../common/middlewares/handleError.middleware";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

class UserService {
    findAll() {
        return User.find({})
    }

    async findById(id: string) {
        const data = await User.findOneBy({
            id
        })
        if (!data) {
            const error = (new Error(`Resource not found`) as ErrorInfo)
            error.statusCode = 404
            throw error
        }
        return data
    }

    create(dto: CreateUserDto) {
        const data = User.create({ ...dto })
        return User.save(data)
    }

    async update(id: string, dto: UpdateUserDto) {
        // find bi id to check exist
        let user = await this.findById(id)

        // update info
        user = {
            ...user,
            ...dto
        } as User
        return await User.save(user)
    }

    async delete(id: string) {
        // find bi id to check exist
        let user = await this.findById(id)
        await User.remove(user)
    }

    async search(name: string) {
        let query = User.createQueryBuilder("user");

        if (name) {
            query = query
                .where("user.last_name LIKE :name", { name: `${name}%` })
                .orWhere("user.first_name LIKE :name", { name: `${name}%` })
        }

        // sort desc by first name
        const data = await query.orderBy("user.first_name", "DESC").getMany();
        return data;
    }

}

export default new UserService