const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true, trim: true }
})

module.exports = mongoose.model('Chapter', chapterSchema)
