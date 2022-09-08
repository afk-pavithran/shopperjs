import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('description')
        table.integer('price').notNullable()
        table.integer('availableCount')
        table.integer('sellerId')
    })
            
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('products')
}

