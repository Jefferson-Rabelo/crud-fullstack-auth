const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/users', userController.createUsers)
router.get('/users', authMiddleware, userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id', authMiddleware, userController.deleteUser)
router.post('/login', userController.login)

module.exports = router