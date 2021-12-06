const { Router } = require('express')
const getController = require('../controllers/get.controller')

const router = Router()

router.get('/userInfo', getController.getUserData)
router.get('/chapters', getController.getChapters)
router.get('/orderItems', getController.getOrderItems)
router.get('/items', getController.getItems)
router.get('/product', getController.getProductData)
router.get('/orders', getController.getOrders)

module.exports = router
