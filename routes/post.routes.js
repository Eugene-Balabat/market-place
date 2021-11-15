const { Router } = require('express')
const postController = require('../controllers/post.controller')

const router = Router()

router.post('/updateUser', postController.updateUserData)

module.exports = router
