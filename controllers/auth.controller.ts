import { Request, Response, NextFunction } from 'express'
// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {UserModel} from '../models'
import Logger from '../Utils/logger'
import dotenv from 'dotenv'
import BcryptHelper from '../Utils/bcryptHelper'

dotenv.config()

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info(req.body)

    const {username, password, email} = req.body
    const bcryptObj = new BcryptHelper(password)
    const hashedPassword = await bcryptObj.createHashedPassword()
    try {
        const user = await UserModel.default.query().insert({username, email, password: hashedPassword})
        const tokenData = {email, userId: user.id}
        const jwtToken = process.env.JWT_TOKEN || 'JWT_TOKEN_KEY'
        const token = jwt.sign(tokenData, jwtToken, {expiresIn: '24h'})
        res.json({token}).status(200)
    }
    catch (err) {
        Logger.error('Failed to insert User')
        res.status(409).json({error: 'username or email Already Exist'})
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {password, email} = req.body

    const user = await UserModel.default.query().findOne({email})
    if (!user) {
        res.status(404).json({error: 'User Not Found'})
    } else {
    const bcryptObj = new BcryptHelper(password)
    const bcrypt = bcryptObj.getBcrypt()
    
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            const tokenData = {email, userId: user.id}
            const jwtToken = process.env.JWT_TOKEN || 'JWT_TOKEN_KEY'
            const token = jwt.sign(tokenData, jwtToken, {expiresIn: '24h'})
            res.status(200).json({token})
        }
        else {
            res.status(400).json({error: 'Invalid Credentials'})
        }
    })
    }
}


