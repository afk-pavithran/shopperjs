import {Router} from 'express'
import {authController} from '../controllers'

const authRouter = Router()

// authRouter.post('/', authController.registerUser)
// authRouter.post('/login', authController.loginUser)
authRouter.post('/regseller', authController.createSeller)
authRouter.post('/regcustomer', authController.createCustomer)
authRouter.post('/logcustomer', authController.loginCustomer)
authRouter.post('/logseller', authController.loginSeller)
authRouter.post('/verify', authController.JWTVerify)

export default authRouter