const router = require('express').Router()
const { all, single } = require('../controllers/products')

router.get('/', all)

router.get('/:productId', single)

module.exports = router
