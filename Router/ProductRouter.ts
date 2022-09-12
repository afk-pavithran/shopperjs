import { Router } from 'express'
import { addProduct, deleteProduct, editProduct, getProduct, getProducts, getProductsByCategory } from '../controllers/product.controller'

const ProductRouter = Router()


ProductRouter.get('/:id', getProduct)

ProductRouter.get('/all/:offset', getProducts)

ProductRouter.get('/category/:category/:offset', getProductsByCategory)

ProductRouter.post('/add', addProduct)

ProductRouter.delete('/delete/:id', deleteProduct)

ProductRouter.put('/edit/:id', editProduct)

export default ProductRouter
