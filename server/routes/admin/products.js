const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')

const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/products')

router.get('/', verifyToken, isAdmin, all)

router.get('/:productId', verifyToken, isAdmin, single)

router.post('/new', verifyToken, isAdmin, create)

router.put('/update/:productId', verifyToken, isAdmin, update)

router.delete('/delete/:productId', verifyToken, isAdmin, remove)

module.exports = router
