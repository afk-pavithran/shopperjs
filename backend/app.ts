import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import authRouter from './Router/AuthRouter'
import Logger from './Utils/logger'
import ProductRouter from './Router/ProductRouter'

dotenv.config()


const app: Express = express()
const port = process.env.port || 3000

app.use(express.json())
app.get('/', (req: Request, res: Response) => {
    res.json({msg: 'Initial Response'})
})

app.use('/auth', authRouter)
app.use('/product', ProductRouter)
app.listen(port, () => Logger.debug(`Server Running on ${port}`))