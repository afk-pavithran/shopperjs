import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import {SellerModel, UserModel} from '../models'
import Logger from '../Utils/logger'
import dotenv from 'dotenv'
import BcryptHelper from '../Utils/bcryptHelper'
import JWTHelper from '../Utils/JWTHelper'
import CustomerModel from '../models/customer.model'

dotenv.config()

export const JWTVerify = async (req: Request, res: Response, next: NextFunction)  => {
    const {token} = req.body
    const JWTObj = new JWTHelper()
    const tokenData = await JWTObj.verifyToken(token)
    if (tokenData.isValid) {
        res.status(200).json(tokenData)
    }
    else {
        res.status(400).json({error: 'Wrong or Expired Token'})
    }
}


export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body
    const id: string = uuidv4()

    const bcryptObj = new BcryptHelper(password)
    const hashedPassword = await bcryptObj.createHashedPassword()

    try {
        const customer = await CustomerModel.query().insert({email, password: hashedPassword, id, accountType: 'customer'})
        const JWTObj = new JWTHelper()
        const token = JWTObj.signToken(email, customer.id)
        res.json({token}).status(200)
    }
    catch (err) {
        console.log(err)
        Logger.error('Failed to insert Customer')
        res.status(409).json({error: 'email Already Exist'})
    }
}

export const createSeller = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body
    const id: string = uuidv4()
    const sellerId : string = id

    const bcryptObj = new BcryptHelper(password)
    const hashedPassword = await bcryptObj.createHashedPassword()

    try {
        const seller = await SellerModel.query().insert({email, password: hashedPassword, id, sellerId, accountType: 'seller'})
        const JWTObj = new JWTHelper()
        const token = JWTObj.signToken(email, seller.id)
        res.json({token}).status(200)
    }
    catch (err) {
        console.log(err)
        Logger.error('Failed to insert Seller')
        res.status(409).json({error: 'email Already Exist'})
    }
}


export const loginCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body
    const user = await CustomerModel.query().findOne({email})
    if (!user) {
            res.status(404).json({error: 'User Not Found'})
    } else {
    const bcryptObj = new BcryptHelper(password)
    
    const isValid = await bcryptObj.compareHashPassword(user.password)
    
    if (isValid) {
        const JWTObj = new JWTHelper()
        const token = JWTObj.signToken(email, user.id)
        res.status(200).json({token})
    }
    else {
        res.status(400).json({error: 'Invalid Credentials'})
    }
    }
}

export const loginSeller = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body
    const user = await SellerModel.query().findOne({email})
    if (!user) {
            res.status(404).json({error: 'User Not Found'})
    } else {
    const bcryptObj = new BcryptHelper(password)
    
    const isValid = await bcryptObj.compareHashPassword(user.password)
    
    if (isValid) {
        const JWTObj = new JWTHelper()
        const token = JWTObj.signToken(email, user.id)
        res.status(200).json({token})
    }
    else {
        res.status(400).json({error: 'Invalid Credentials'})
    }
    }
}