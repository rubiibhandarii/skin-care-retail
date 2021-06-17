const router = require('express').Router()
const { verifyToken, isRetailer } = require('../middleware/authentication')

const {
    all,
    single,
    create,
    update,
    remove,
} = require('../controllers/products')

router.get('/', verifyToken, all)

router.get('/:productId', verifyToken, single)

router.post('/new', verifyToken, isRetailer, create)

router.put('/update/:productId', verifyToken, isRetailer, update)

router.delete('/delete/:productId', verifyToken, isRetailer, remove)

module.exports = router
