import { Router } from 'express'
import catchAsyncError from '../utils/catchAsyncError'
import UserController from './user.controller'

const userRouter = Router()

userRouter.get('/read', catchAsyncError(UserController.find))
userRouter.post('/add', catchAsyncError(UserController.create))
userRouter.put('/edit/:id', catchAsyncError(UserController.update))
userRouter.delete('/edit/:id', catchAsyncError(UserController.delete))
userRouter.get('/search', catchAsyncError(UserController.search))

export default userRouter