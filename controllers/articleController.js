const { Article } = require("../models/models")
const ApiError = require('../error/ApiError')

class ArticleController {
  async create(req, res) {
    const { title, description, borderColor, access } = req.body
    const upload = Date.now()
    const article = await Article.create({title, description, borderColor, upload, access})
    return res.json(article)
  }

  async update(req, res) {
    const {id} = req.params
    const { title, description, borderColor, access } = req.body
    const article = await Article.update({title, description, borderColor, access}, {where: {id}})
    const updatedArticle = await Article.findOne({where: {id}})
    return res.json(updatedArticle)
  }

  async delete(req, res) {
    const {id} = req.params
    const article = await Article.destroy({where: {id}})
    const articles = await Article.findAll()
    return res.json(articles)
  }

  async getOne(req, res) {
    const {id} = req.params
    const article = await Article.findOne({where: {id}})
    if (!article) res.json(ApiError.badRequest('Страница не найдена'))
    else res.json(article)
  }

  async getAll(req, res) {
    const articles = await Article.findAll()
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = articles.slice(startIndex, endIndex)
    return res.json(results)
  }
}

module.exports = new ArticleController()