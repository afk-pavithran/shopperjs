import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('customers', table => {
        table.string('id').primary()
        table.string('email').unique().notNullable()
        table.string('password').unique()
        table.string('phone').unique()
        table.string('accountType').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('customers')
}

