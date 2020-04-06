'use strict'

/*
|--------------------------------------------------------------------------
| PropertySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const rand = (min, max) => Math.floor(min + Math.random() * (max - min))

class PropertySeeder {
  async run () {
    const users = await User.all()
    const jsonUsers = users.toJSON()
    const properties = await Factory.model('App/Models/Property').makeMany(jsonUsers.length)
    const retrievedUsers = []
    for (const p of properties) {
      const idx = rand(0, jsonUsers.length - 1)
      const user = retrievedUsers[idx] || await User.find(jsonUsers[idx].id)
      if (!retrievedUsers.includes(user)) retrievedUsers.push(user)
      await user.properties().save(p)
    }
  }
}

module.exports = PropertySeeder
