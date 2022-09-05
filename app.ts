import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import Logger from './Utils/logger'

dotenv.config()

const app: Express = express()

const port = process.env.port || 3000

app.get('/', (req: Request, res: Response) => {
    res.json({msg: 'Initial Response'})
})

app.listen(port, () => Logger.debug(`Server Running on ${port}`))