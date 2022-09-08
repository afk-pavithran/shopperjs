import {JSONSchema, Model} from 'objection'
import knex from '../db'

Model.knex(knex)

class CustomerModel extends Model {
    id!: string
    email!: string
    password!: string
    accountType!: string
    phone!: string
    
    static get tableName () : string {
        return 'customers'
    }

    static get jsonSchema () : JSONSchema {
        return {
            type: 'object',
            required: ['id', 'email', 'password', 'accountType'],
            properties: {
                id: {type: 'string'},
                email: {type: 'string'},
                password: {type: 'string'},
                accountType: {type: 'string'},
                phone: {type: 'string'}
            }
        }
    }

}

export default CustomerModel