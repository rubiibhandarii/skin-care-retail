const router = require('express').Router()
const { verifyToken, isAdmin } = require('../../middleware/authentication')
const {
    all,
    single,
    create,
    update,
    remove,
} = require('../../controllers/admin/users')

router.get('/', verifyToken, isAdmin, all)

router.get('/:userId', verifyToken, isAdmin, single)

router.post('/new', verifyToken, isAdmin, create)

router.put('/update/:userId', verifyToken, isAdmin, update)

router.delete('/delete/:userId', verifyToken, isAdmin, remove)

module.exports = router
