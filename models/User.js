const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  username: { type: String, required: true, trim: true },
  surname: { type: String, trim: true, required: true },
  index: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
})

module.exports = mongoose.model('User', userSchema)
