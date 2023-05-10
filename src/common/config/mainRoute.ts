import { Express, Router } from 'express'
import userRouter from '../../user/user.route'
const mainRoute = (app: Express) => {
    const rootRoute = Router()

    // import other routers
    rootRoute.use('/user', userRouter)

    app.use(rootRoute)
}

export default mainRoute