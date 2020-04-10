'use strict'

/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Property = use('App/Models/Property')

/** @type {typeof import('@adonisjs/ignitor/src/Helpers')} Helpers */
const Helpers = use('Helpers')

const {readFileSync} = require('fs')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Create/save a new image.
   * POST properties/:id/images
   * @param {Object} ctx
   * @param {Object} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const property = await Property.findOrFail(params.id)
    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.movedAll()) {
      return response.status(500).send({errors: images.errors()})
    }

    await Promise.all(
      images
        .movedList()
        .map(image => property.images().create({ path: image.fileName }))
    )
  }

  /**
   *
   * @param {Object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const { path } = params
    response.download(Helpers.tmpPath('uploads') + `/${path}`)
  }
}

module.exports = ImageController
