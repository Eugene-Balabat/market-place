const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const User = require('./models/User')
const authMiddleware = require('./middlewares/auth-resolution')

const app = express()
const port = config.get('port') || 5000

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/get', require('./routes/get.routes'))
app.use('/api/post', require('./routes/post.routes'))

app.get('/api/auth/users', authMiddleware, async (req, res) => {
  User.find({}, (error, data) => res.status(200).json(data))
})

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'))
    app.listen(port, () => {
      console.log(`Server is working on ${port} port...`)
    })
  } catch (e) {
    console.log('Server errror:', e.message)
    process.exit(1)
  }
}

start()
