const router = require('express').Router()
const { verifyToken, isRetailer } = require('../middleware/authentication')
const multer = require('../middleware/multer')
const {
    all,
    single,
    create,
    update,
    remove,
} = require('../controllers/products')

router.get('/', all)

router.get('/:productId', single)

router.post('/new', verifyToken, isRetailer, multer.array('image'), create)

router.put('/update/:productId', verifyToken, isRetailer, update)

router.delete('/delete/:productId', verifyToken, isRetailer, remove)

module.exports = router
