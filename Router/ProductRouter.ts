import { Router } from 'express'
import { addProduct } from '../controllers/product.controller'

const ProductRouter = Router()

ProductRouter.post('/add', addProduct)


export default ProductRouter
