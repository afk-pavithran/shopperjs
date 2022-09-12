import {Request, Response, NextFunction} from 'express'
import { v4 as uuidv4 } from 'uuid'
import { SellerModel } from '../models'
import CustomerModel from '../models/customer.model'
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
    category: string
}

export const addProduct = async (req:Request, res:Response, next: NextFunction) => {
    const { name, description, price, availableCount, category } = req.body
    let token : any = ''
    token = req.headers.token

    const JWTObj = new JWTHelper()
    const {isValid, id, email} = await JWTObj.verifyToken(token)
    const seller = await SellerModel.query().findOne({email})
    if (isValid && seller) {
        try {
            res.set('token', token)
            const insert_data : Product = {name, description, price, availableCount, sellerId: id, id: uuidv4(), category}
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

export const getProduct = async (req:Request, res:Response, next: NextFunction) => {
    let token : any = ''
    token = req.headers.token

    const product = await ProductModel.query().findById(req.params.id)
    
    if (product) {
        res.status(200).json({data: product})
    }
    else {
        res.status(404).json({error: 'Product Not Found'})
    }
}

export const getProducts = async (req:Request, res: Response, next: NextFunction) => {
    const offset = parseInt(req.params.offset)
    const products = await ProductModel.query().select('*').orderBy('name').limit(20).offset(offset)

    if (products) {
        res.status(200).json({data: products})
    }else {
        res.status(404).json({error: 'Product Not Found'})
    }
}

export const getProductsByCategory = async (req:Request, res: Response, next: NextFunction) => {
    const category = req.params.category
    const offset = parseInt(req.params.offset)
    const products = await ProductModel.query().select('*').where('category', '=', category).orderBy('name').limit(20).offset(offset)

    if (products) {
        res.status(200).json({data: products})
    }else {
        res.status(404).json({error: 'Product Not Found'})
    }
}

export const deleteProduct = async (req:Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const deletedRows = await ProductModel.query().delete().where({id})
    if (deletedRows > 0) {
        res.status(200).json({data: deletedRows})
    }
    else {
        res.status(200).json({error: 'No Rows Deleted'})
    }
}


export const editProduct = async (req:Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const updateValues = req.body.updateValues
    const numberOfAffectedRows = await ProductModel.query().patch(updateValues).where('id', id)

    if (numberOfAffectedRows > 0) {
        res.status(200).json({data: numberOfAffectedRows})
    }
    else {
        res.status(200).json({error: 'No Rows Updated'})
    }
}

export const buyProduct = async (req:Request, res: Response, next: NextFunction) => {
    let token : any = ''
    token = req.headers.token
    const JWTObj = new JWTHelper()
    const {isValid, id, email} = await JWTObj.verifyToken(token)
    const seller = await CustomerModel.query().findOne({email})
    if (isValid && seller) {
        const {productId, count} = req.body

        const product = await ProductModel.query().findOne({id: productId})
        if (product) {
           const remainingCount : number = product.availableCount - count
           if(remainingCount < 0) {
               res.status(400).json({error: 'Not Enough Products available'})
           }
           else {
               const affectedRow = await ProductModel.query().patch({availableCount: remainingCount}).where('id', productId)
                if (affectedRow > 0) {
                    res.status(200).json({data: product})
                }
                else {
                    res.status(400).json({error: 'order Failed, server side issue'})
                }
            }
        }

    }
    else {
        res.status(400).json({error: 'Invalid Credentials'})
    }
}