const { Router } = require('express')
const postController = require('../controllers/post.controller')

const router = Router()

router.post('/updateUser', postController.updateUserData)
router.post('/deleteOrder', postController.deleteOrder)
router.post('/add-order', postController.addNewOrder)

module.exports = router
