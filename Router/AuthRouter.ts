import {Router} from 'express'

const authRouter = Router()

authRouter.get('/', (req, res) => res.send({msg: 'Auth'}))


export default authRouter