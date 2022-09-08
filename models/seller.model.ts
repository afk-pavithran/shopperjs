import {Model, JSONSchema, RelationMappings, RelationMappingsThunk} from 'objection'
import ProductModel from './product.model'
import knex from '../db'

Model.knex(knex)

class SellerModel extends Model {

    id!: string
    email!: string
    password!: string
    sellerId!: string
    accountType!: string

    static get tableName(): string {
        return 'sellers'
    }

    static get jsonSchema () : JSONSchema {
        return {
            type: 'object',
            required: ['email', 'password', 'sellerId'],
            properties: {
                id: {type: 'string'},
                email : {type: 'string'},
                password: {type: 'string'},
                sellerId: {type: 'string'},
                accountType: {type: 'string'}
            }
        }
    }

    static get relationMappings () : RelationMappings | RelationMappingsThunk {
        return {
            owned_product : {
                relation: Model.HasManyRelation,
                modelClass: ProductModel,
                join: {
                    from: 'sellers.id',
                    to: 'products.sellrId'
                }
            }
        }
    }

}

export default SellerModel