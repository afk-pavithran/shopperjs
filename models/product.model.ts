import {Model, JSONSchema} from 'objection'
import knex from '../db'

Model.knex(knex)

class ProductModel extends Model {
    id!: number
    name!: string
    description!: string
    price!: number
    availableCount!: number
    sellerId!: number

    static get tableName () : string {
        return 'products'
    }

    static get jsonSchema () : JSONSchema {
        return {
            type: 'object',
            required: ['name', 'availableCount', 'sellerId', 'price'],
            properties: {
                id: {type: 'integer'},
                name: {type: 'string'},
                description: {type: 'string'},
                price: {type: 'integer'},
                availableCount: {type: 'integer'},
                sellerId: {type: 'integer'}
            }

        }
    }
}

export default ProductModel