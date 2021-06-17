const router = require('express').Router()
const {
    verifyToken,
    isUser,
    isUserVerified,
} = require('../middleware/authentication')
const {
    register,
    activateAccount,
    login,
    resetPassword,
    updatePasswordByToken,
    getOrders,
} = require('../controllers/users')

// User registration
router.post('/register', register)

// Email activation
router.post('/email-activate', activateAccount)

// User login
router.post('/login', isUserVerified, login)

// Forgot password
router.post('/reset-password', isUserVerified, resetPassword)

// Change password from forgot password
router.post('/new-password', updatePasswordByToken)

// get all orders of loggedIn user
router.get('/orders', verifyToken, isUser, getOrders)

module.exports = router
