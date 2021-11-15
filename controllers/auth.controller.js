const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')
const Role = require('../models/Role')

class AuthController {
  async registration(req, res) {
    try {
      const { email, password, username, surname, index, city } = req.body
      const candidate = await User.findOne({ email })

      if (candidate)
        return res.status(400).json({
          error: {
            msg: 'Пользователь с таким email уже существует.'
          }
        })

      const hashedPassword = await bcrypt.hash(password, 8)

      const role = await Role.findOne({ value: 'USER' })
      const user = new User({
        email,
        password: hashedPassword,
        username,
        surname,
        index,
        city,
        roles: [role._id]
      })

      await user.save()

      res.status(201).json({ msg: 'Пользователь успешно сохранен.' })
    } catch (e) {
      res.status(500).json({
        error: { msg: 'Ошибка во время запроса: ' + e.message }
      })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user)
        return res.status(400).json({
          error: { msg: 'Ползователь с таким email не существует.' }
        })

      const isMatchPasswords = await bcrypt.compare(password, user.password)

      if (!isMatchPasswords)
        return res.status(400).json({ error: { msg: 'Неверный пароль.' } })

      const token = jwt.sign({ userId: user.id }, config.jwtKey, {
        expiresIn: '1h'
      })

      res.json({ token })
    } catch (e) {
      res
        .status(500)
        .json({ error: { msg: 'Ошибка во время запроса:' + e.message } })
    }
  }
}

module.exports = new AuthController()
