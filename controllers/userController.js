const { User } = require("../models/models")
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {id: id, email, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'})
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body

    const name = String(Date.now()),
    surname = ''

    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким Email уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      name, surname, email, password: hashPassword
    })
    
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'))
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController()