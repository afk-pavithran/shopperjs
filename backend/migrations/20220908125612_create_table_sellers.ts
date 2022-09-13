import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sellers', table => {
        table.string('id').primary()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('sellerId').notNullable()
        table.string('accountType').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('sellers')
}

