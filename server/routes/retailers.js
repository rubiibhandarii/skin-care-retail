const router = require('express').Router()
const {
    verifyToken,
    isRetailerVerified,
    isRetailer,
} = require('../middleware/authentication')
const {
    register,
    activateAccount,
    login,
    resetPassword,
    updatePasswordByToken,
    getOrders,
    changeOrderStatus,
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

// get all orders of loggedIn retailer
router.get('/orders', verifyToken, isRetailer, getOrders)

// approve/refuse orders
router.post(
    '/orders/:orderId/status',
    verifyToken,
    isRetailer,
    changeOrderStatus
)

module.exports = router
