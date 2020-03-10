'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Auth')} Auth */

class SessionController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   */
  async auth ({request, auth}) {
    const {username, password} = request.all()
    const token = await auth.attempt({username, password})
    return token
  }
}

module.exports = SessionController
