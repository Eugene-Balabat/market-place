const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

class PostController {
  async updateUserData(req, res) {
    try {
      const { name, surname, index, city } = req.body
      const { token } = req.headers
      const decodedToken = await jwt.verify(token, config.jwtKey)

      const user = await User.findOne({ _id: decodedToken.userId })

      if (!user)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Пользователь не найден.'
          }
        })

      const result = await user.updateOne({ name, surname, index, city })

      if (!result.modifiedCount)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Данные не обновлены.'
          }
        })
      const updatedUser = await User.findOne({ _id: decodedToken.userId })

      if (!updatedUser)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Пользователь не найден.'
          }
        })

      res.status(200).json({
        user: {
          name: updatedUser.username,
          surname: updatedUser.surname,
          city: updatedUser.city,
          index: updatedUser.index
        },
        msg: 'Данные успешно обновлены'
      })
    } catch (e) {
      if (e.name === 'TokenExpiredError')
        return res.status(500).json({
          error: { msg: 'Жизненный цикл токена истек.', type: e.name }
        })
      else if (e.name === 'JsonWebTokenError')
        return res.status(500).json({
          error: { msg: 'Недействительный токен.', type: e.name }
        })
      else
        return res.status(500).json({
          error: { msg: 'Ошибка сервера: ' + e.message }
        })
    }
  }
}

module.exports = new PostController()
