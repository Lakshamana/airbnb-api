'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Auth')} Auth */

class SessionController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async auth ({request, response, auth}) {
    const {email, password} = request.all()
    const {token} = await auth.attempt(email, password)
    return response.cookie('accessToken', token)
  }
}

module.exports = SessionController
