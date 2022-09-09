import {Request, Response, NextFunction} from 'express'
import { v4 as uuidv4 } from 'uuid'
import ProductModel from '../models/product.model'
import JWTHelper from '../Utils/JWTHelper'
import Logger from '../Utils/logger'

interface Product {
    name: string
    description: string
    price: number
    availableCount: number
    sellerId: string
    id: string
}

export const addProduct = async (req:Request, res:Response, next: NextFunction) => {
    const { name, description, price, availableCount } = req.body
    let token : any = ''
    token = req.headers.token

    const JWTObj = new JWTHelper()
    const {isValid, id} = await JWTObj.verifyToken(token)
    if (isValid) {
        try {
            res.set('token', token)
            const insert_data : Product = {name, description, price, availableCount, sellerId: id, id: uuidv4()}
            const product = await ProductModel.query().insert({...insert_data})
            res.status(200).json({id: product.id})
        } catch (err) {
            Logger.error(err)
            res.status(409).json({error: 'Failed to insert product'})
        }
    }else {
        res.status(400).json({error: 'Invalid Credentials'})
    }
}