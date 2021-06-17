const router = require('express').Router()
const { all, single } = require('../controllers/categories')

router.get('/', all)

router.get('/:categoryId', single)

module.exports = router
