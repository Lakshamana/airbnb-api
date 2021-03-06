'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class SessionController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async auth ({request, auth}) {
    const {email, password} = request.all()
    const token = await auth.attempt(email, password)
    console.log(token, email, password)
    return token
  }
}

module.exports = SessionController
