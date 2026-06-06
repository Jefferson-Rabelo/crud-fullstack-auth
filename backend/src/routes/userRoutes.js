const express = require('express')
const router = express.Router()
const adminMiddleware = require('../middlewares/adminMiddleware')

const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/users', userController.createUsers)
router.get('/users', authMiddleware, userController.getUsers)
router.get('/users/:id', authMiddleware, userController.getUserById)
router.put('/users/:id', authMiddleware, userController.updateUser)
router.delete('/users/:id', authMiddleware, adminMiddleware, userController.deleteUser)
router.post('/login', userController.login)
router.get('/me', authMiddleware, userController.getMe)

module.exports = router