const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  imageUrl: { type: String, trim: true },
  inStock: { type: Boolean, default: false }
})

module.exports = mongoose.model('Item', itemSchema)
