const router = require('express').Router()
const { isUserVerified } = require('../middleware/authentication')
const {
    register,
    activateAccount,
    login,
    resetPassword,
    updatePasswordByToken,
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

module.exports = router
