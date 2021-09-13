const router = require('express').Router()
const {
    all,
    single,
    singleByName,
    itemsByCategory,
} = require('../controllers/categories')

router.get('/', all)

router.get('/:categoryId', single)

router.get('/name/:categoryName', singleByName)

router.get('/items/:categoryName', itemsByCategory)

module.exports = router
