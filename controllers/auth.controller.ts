import { Request, Response, NextFunction } from 'express'
import {UserModel} from '../models'
import Logger from '../Utils/logger'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info(req.body)

    const {username, password, email} = req.body

    const user = await UserModel.default.query().insert({username, email, password})

    console.log(user)
    res.json({username, password, email})


}


