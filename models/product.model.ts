import {Model, JSONSchema} from 'objection'
import knex from '../db'

Model.knex(knex)

class ProductModel extends Model {
    id!: string
    name!: string
    description!: string
    price!: number
    availableCount!: number
    sellerId!: string
    category!: string

    static get tableName () : string {
        return 'products'
    }

    static get jsonSchema () : JSONSchema {
        return {
            type: 'object',
            required: ['name', 'availableCount', 'sellerId', 'price'],
            properties: {
                id: {type: 'string'},
                name: {type: 'string'},
                description: {type: 'string'},
                price: {type: 'integer'},
                availableCount: {type: 'integer'},
                sellerId: {type: 'string'},
                category: {type: 'string'}
            }

        }
    }
}

export default ProductModel