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

router.get('/:retailerId', verifyToken, single)

router.post('/new', verifyToken, isRetailer, create)

router.put('/update/:retailerId', verifyToken, isRetailer, update)

router.delete('/delete/:retailerId', verifyToken, isRetailer, remove)

module.exports = router
