const User = require('../models/User')
const Chapter = require('../models/Chapter')
const Order = require('../models/Order')
const Item = require('../models/Item')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

class GetController {
  async getUserData(req, res) {
    try {
      const { token } = req.headers
      const decodedToken = await jwt.verify(token, config.jwtKey)

      const user = await User.findOne({ _id: decodedToken.userId })

      if (user)
        res.status(200).json({
          username: user.username,
          surname: user.surname,
          city: user.city,
          index: user.index
        })
      else
        res.status(400).json({
          error: { msg: 'Пользователь не найден.' }
        })
    } catch (err) {
      if (err.name === 'TokenExpiredError')
        res.status(500).json({
          error: { msg: 'Жизненный цикл токена истек.', type: err.name }
        })
      else if (err.name === 'JsonWebTokenError')
        res.status(500).json({
          error: { msg: 'Недействительный токен.', type: err.name }
        })
      else
        res.status(500).json({
          error: { msg: 'Ошибка сервер: ' + err.message }
        })
    }
  }

  async getChapters(req, res) {
    try {
      const chapters = await Chapter.find()
      if (!chapters)
        return res.status(400).json({
          error: { msg: 'Дынне в базе не найдены.' }
        })

      res.status(200).json({ chapters })
    } catch (err) {
      res.status(500).json({
        error: { msg: 'Ошибка сервера: ' + err.message }
      })
    }
  }

  async getItems(req, res) {
    try {
      const { id } = req.headers
      const items = await Item.find({ chapter: id })

      // if (!items.length)
      //   return res.status(400).json({
      //     error: { msg: 'Товары категории не найдены.' }
      //   })

      res.status(200).json({ items })
    } catch (err) {
      res.status(500).json({
        error: { msg: 'Ошибка сервера: ' + err.message }
      })
    }
  }

  async getOrderItems(req, res) {
    try {
      const { token } = req.headers
      const items = new Array()

      const decodedToken = await jwt.verify(token, config.jwtKey)

      const orders = await Order.find({ user: decodedToken.userId })

      for (const order of orders) {
        const item = await Item.findOne({ _id: order.item })
        items.push(item)
      }

      res.status(200).json({ items })
    } catch (err) {
      if (err.name === 'TokenExpiredError')
        res.status(500).json({
          error: { msg: 'Жизненный цикл токена истек.', type: err.name }
        })
      else if (err.name === 'JsonWebTokenError')
        res.status(500).json({
          error: { msg: 'Недействительный токен.', type: err.name }
        })
      else
        res.status(500).json({
          error: { msg: 'Ошибка сервер: ' + err.message }
        })
    }
  }

  async getProductData(req, res) {
    try {
      const { id } = req.headers
      const product = await Item.findOne({ _id: id })

      if (!product)
        return res.status(400).json({
          error: { msg: 'Товар не найден.' }
        })

      res.status(200).json({ product })
    } catch (err) {
      res.status(500).json({
        error: { msg: 'Ошибка сервера: ' + err.message }
      })
    }
  }

  async getOrders(req, res) {
    try {
      const { token } = req.headers
      const decodedToken = await jwt.verify(token, config.jwtKey)

      const orders = await Order.find({ user: decodedToken.userId })

      res.status(200).json({ orders })
    } catch (err) {
      if (err.name === 'TokenExpiredError')
        res.status(500).json({
          error: { msg: 'Жизненный цикл токена истек.', type: err.name }
        })
      else if (err.name === 'JsonWebTokenError')
        res.status(500).json({
          error: { msg: 'Недействительный токен.', type: err.name }
        })
      else
        res.status(500).json({
          error: { msg: 'Ошибка сервер: ' + err.message }
        })
    }
  }
}

module.exports = new GetController()
