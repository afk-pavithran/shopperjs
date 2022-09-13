import {Pool} from 'pg'
import Logger from '../Utils/logger'
import dotenv from 'dotenv'

// const portNumber = parseInt(process.env.DB_PORT) || 5432

dotenv.config()

const client = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432
})

const dbName : string = 'shopperjs_db'

const createDBFunction = async () => {
    try {
        await client.connect()
        await client.query(`CREATE DATABASE ${dbName}`)
        await client.end()
        Logger.info(`Database ${dbName} created`)
    }
    catch (err){
        Logger.error(err)
    }
}

// createDBFunction()

import config from '../knexfile'
import knex from 'knex'
const  knexObj = knex(config.development)
export default knexObj