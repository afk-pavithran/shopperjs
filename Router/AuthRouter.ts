import {Router} from 'express'
import {authController} from '../controllers'

const authRouter = Router()

authRouter.post('/', authController.registerUser)
authRouter.post('/login', authController.loginUser)

export default authRouter