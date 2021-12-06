const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  inStock: { type: Boolean, default: false },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }
})

module.exports = mongoose.model('Item', itemSchema)
