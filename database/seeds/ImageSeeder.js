'use strict'

/*
|--------------------------------------------------------------------------
| ImageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Property = use('App/Models/Property')
const rand = (min, max) => Math.floor(min + Math.random() * (max - min))

class ImageSeeder {
  async run () {
    const properties = await Property.all()
    const propertiesJson = properties.toJSON()
    for (const i in propertiesJson) {
      const property = await Property.find(propertiesJson[i].id)
      const images = Array.from({length: rand(0, 3)}, (_, j) => ({
        path: `img/${propertiesJson[i].id}_${j}.png`
      }))
      await property.images().createMany(images)
    }
  }
}

module.exports = ImageSeeder
