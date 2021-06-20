const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')
const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/retailers')

router.get('/', verifyToken, isAdmin, all)

router.get('/:retailerId', isAdmin, single)

router.post('/new', verifyToken, isAdmin, create)

router.put('/update/:retailerId', verifyToken, isAdmin, update)

router.delete('/delete/:retailerId', verifyToken, isAdmin, remove)

module.exports = router
