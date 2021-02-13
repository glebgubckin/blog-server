const { User } = require("../models/models")
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, name, surname, role) => {
  return jwt.sign(
    {id, email, name, surname, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'})
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body

    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким Email уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      email, password: hashPassword, role
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
    const token = generateJwt(user.id, user.email, user.name, user.surname, user.role)
    return res.json({token})
  }

  async update(req, res, next) {
    const {id} = req.params
    const { name, surname, email, password } = req.body
    if (password) {
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.update({name, surname, email, hashPassword}, {where: {id}})
      const updatedUser = await User.findOne({where: {id}})
      return res.json(updatedUser)
    } else {
      const user = await User.update({name, surname, email}, {where: {id}})
      const updatedUser = await User.findOne({where: {id}})
      return res.json(updatedUser)
    }
    
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.surname, req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController()