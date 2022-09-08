import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', table => {
        table.string('id').primary()
        table.string('name')
        table.string('description')
        table.integer('price').notNullable()
        table.integer('availableCount')
        table.string('sellerId')
    })
            
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('products')
}

