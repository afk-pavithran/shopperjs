import {JSONSchema, Model} from 'objection'
import knex from '../db'

Model.knex(knex)

class UserModel extends Model {
    static get tableName(): string {
        return 'users'
    }

    static get jsonSchema() : JSONSchema {
        return {
            type: 'object',
            required: ['username', 'email', 'password'],
            properties : {
                id: {type: 'integer'},
                username: {type: 'string'},
                email: {type: 'string'},
                password: {type: 'string'},
            }
        }
    }
}

export default UserModel

