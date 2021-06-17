const router = require('express').Router()
const { isRetailerVerified } = require('../middleware/authentication')
const {
    register,
    activateAccount,
    login,
    resetPassword,
    updatePasswordByToken,
} = require('../controllers/retailers')

// Retailer registration
router.post('/register', register)

// Email activation
router.post('/email-activate', activateAccount)

// Retailer login
router.post('/login', isRetailerVerified, login)

// Forgot password
router.post('/reset-password', isRetailerVerified, resetPassword)

// Change password from forgot password
router.post('/new-password', updatePasswordByToken)

module.exports = router
