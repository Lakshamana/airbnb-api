'use strict'

/** @type {import('App/Models/User')} */
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class UserController {
  /**
   * @param {Object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create ({ request }) {
    const data = request.only(['username', 'password', 'email'])
    const user = await User.create(data)
    return user
  }
}

module.exports = UserController
