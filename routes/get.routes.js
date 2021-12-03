const { Router } = require('express')
const getController = require('../controllers/get.controller')

const router = Router()

router.get('/userInfo', getController.getUserData)
router.get('/chapters', getController.getChapters)
router.get('/items', getController.getItems)
router.get('/product', getController.getProductData)

module.exports = router
