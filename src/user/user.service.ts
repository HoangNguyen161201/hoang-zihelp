import * as geolib from 'geolib';
import { FindManyOptions, Not } from "typeorm";
import { ErrorInfo } from "../common/middlewares/handleError.middleware";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

class UserService {
    findAll(options?: FindManyOptions<User>) {
        return User.find(options)
    }

    async findById(id: string) {
        const data = await User.findOne({
            where: {
                id
            }
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

    async locate({ userId, n = 3 }: { userId: string, n?: number }) {
        console.log(userId)
        const currentUser = await this.findById(userId)
        console.log(currentUser)

        // get lat and long by split coordinate
        const [latCurrentUser, longCurrentUser] = currentUser.coordinate.split(':')

        // find other users
        const users = await this.findAll({
            where: {
                id: Not(userId)
            }
        })

        const data = users.map(user => {
            const [lat, lon] = user.coordinate.split(':')
            const distance = geolib.getDistance({
                lat,
                lon
            }, {
                lat: latCurrentUser,
                lon: longCurrentUser
            })
            return {
                ...user,
                distance
            }
        })

        data.sort((userA, userB) => {
            return userA.distance - userB.distance
        })

        return data.slice(0, n)
    }
}

export default new UserService