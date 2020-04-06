'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const seeders = [
  require('./UserSeeder'),
  require('./PropertySeeder'),
  require('./ImageSeeder'),
]

class DatabaseSeeder {
  async run () {
    for (const s of seeders) {
      const seeder = new s()
      await seeder.run()
    }
  }
}

module.exports = DatabaseSeeder
