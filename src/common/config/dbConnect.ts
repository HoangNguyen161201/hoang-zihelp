import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { User } from '../../user/entities/user.entity'

// config env
dotenv.config()

// options to connect db
const AppDataSource = new DataSource({
    type: 'postgres',
    port: 5432,
    url: process.env.POSTGRES_URL,
    entities: [User],
    synchronize: true,
    logging: true,
})

export default AppDataSource