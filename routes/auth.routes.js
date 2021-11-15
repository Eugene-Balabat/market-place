const { Router } = require('express')
const authController = require('../controllers/auth.controller')

const router = Router()

router.post('/registr', authController.registration)

router.post('/login', authController.login)

module.exports = router
