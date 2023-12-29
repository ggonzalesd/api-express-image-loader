import fs from 'node:fs'
import boom from 'boom'

export default class Service {
  constructor() {
    this.regex = /^[a-zA-Z0-9_]+$/
  }

  test_folder() {
    if(!fs.existsSync('images')) {
      fs.mkdirSync('images')
    }
  }

  async save_image(name, body) {
    this.test_folder()

    if ( !this.regex.test(name) )
      throw boom.badRequest(`Name '${name}' is not valid!`)

    const filePath = `images/${name}`
    fs.writeFileSync(filePath, body)

    return body
  }

  async get_image(name) {
    this.test_folder()

    if ( !this.regex.test(name) )
      throw boom.badRequest(`Name '${name}' is not valid!`)

    const filePath = `images/${name}`
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath)
      return buffer
    }
    throw boom.notFound(`Image '${name}' does not exist!`)
  }
}
