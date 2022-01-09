const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const User = require('./models/User')
const authMiddleware = require('./middlewares/auth-resolution')

const app = express()
const port = process.env.PORT || config.get('port') || 5000

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/get', require('./routes/get.routes'))
app.use('/api/post', require('./routes/post.routes'))

app.get('/api/auth/users', authMiddleware, async (req, res) => {
  User.find({}, (error, data) => res.status(200).json(data))
})

app.get('/', async (req, res) => {
  res.end(`<h1>Home page</h1>`)
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
