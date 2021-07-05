const { Order } = require('../models')
const { createValidation } = require('../validation/orders')

exports.create = async (req, res, next) => {
    const { products } = req.body
    const userId = req.user.id

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const newProducts = products.map((v) => ({ ...v, userId }))

        const createdOrder = await Order.bulkCreate(newProducts)

        return res.status(200).json({
            success: true,
            message: 'Item(s) ordered',
            data: createdOrder,
        })
    } catch (err) {
        return next(err)
    }
}
