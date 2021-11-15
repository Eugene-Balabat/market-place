const { Router } = require('express')
const getController = require('../controllers/get.controller')

const router = Router()

router.get('/userInfo', getController.getUserData)

module.exports = router
