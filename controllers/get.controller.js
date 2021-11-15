const User = require('../models/User')
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
          name: user.username,
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
}

module.exports = new GetController()
