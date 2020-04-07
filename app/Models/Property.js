'use strict'

/** @typedef {import('@adonisjs/lucid/src/Lucid/QueryBuilder')} QueryBuilder */

const Model = use('Model')
const Database = use('Database')

class Property extends Model {
  images () {
    return this.hasMany('App/Models/Image')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  static get hidden() {
    return ['created_at', 'updated_at']
  }

  /**
   *
   * @param {QueryBuilder} query
   * @param {*} lat
   * @param {*} long
   * @param {*} dist
   */
  static scopeNearby(query, lat, long, dist) {
    const haversine =
      `(6371 * acos(cos(radians(${lat}))
      * cos(radians(latitude))
      * cos(radians(longitude)
      - radians(${long}))
      + sin(radians(${lat}))
      * sin(radians(latitude))))`
    return query
      .select('*', Database.raw(`${haversine} as distance`))
      .whereRaw(`${haversine} < ${dist}`)
  }
}

module.exports = Property
