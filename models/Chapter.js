const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true, trim: true },
  imageUrl: { type: String, trim: true },
  listItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
})

module.exports = mongoose.model('Chapter', chapterSchema)
