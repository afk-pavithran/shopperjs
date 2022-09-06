import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {UserModel} from '../models'
import Logger from '../Utils/logger'
import dotenv from 'dotenv'

dotenv.config()

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info(req.body)

    const {username, password, email} = req.body
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const user = await UserModel.default.query().insert({username, email, password: hashedPassword})
        // @ts-ignore:next-line
        const tokenData = {email, userId: user.id}

        const jwtToken = process.env.JWT_TOKEN || 'JWT_TOKEN_KEY'
        const token = jwt.sign(tokenData, jwtToken, {expiresIn: '24h'})
        console.log(token)
        res.json({token}).status(200)
    }
    catch (err) {
        Logger.error('Failed to insert User')
        res.status(409).json({error: 'username or email Already Exist'})
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {password, email} = req.body
    res.status(409).json({error: 'username or email Already Exist'})
}


