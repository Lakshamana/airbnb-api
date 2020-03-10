'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Property extends Model {
  images () {
    return this.hasMany('App/Models/Image')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Property
