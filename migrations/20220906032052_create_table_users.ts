import { table } from "console";
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
            .createTable('users', table => {
                table.increments('id').primary()
                table.string('username').unique()
                table.string('password')
                table.string('email').unique()
            })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
}

