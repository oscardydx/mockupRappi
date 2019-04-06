'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('NIUP', 254).notNullable().unique()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 20).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('is_active').defaultTo(0)
      table.string('roll', 15).notNullable().defaultTo('client')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
