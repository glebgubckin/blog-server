const { Article } = require("../models/models")
const ApiError = require('../error/ApiError')
const _ = require('../utils/utils')

class ArticleController {
  async create(req, res) {
    const { title, description, borderColor, access } = req.body
    const upload = _.getCurrentDate()
    const article = await Article.create({title, description, borderColor, upload, access})
    return res.json(article)
  }

  async getOne(req, res) {
    const {id} = req.params
    const article = await Article.findOne({where: {id}})
    if (!article) res.json(ApiError.badRequest('Страница не найдена'))
    else res.json(article)
  }

  async getAll(req, res) {
    const articles = await Article.findAll()
    return res.json(articles)
  }

  async delete(req, res) {
    
  }
}

module.exports = new ArticleController()