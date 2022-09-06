import {Router} from 'express'
import {authController} from '../controllers'

const authRouter = Router()

authRouter.post('/', authController.registerUser)


export default authRouter