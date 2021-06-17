const { Order, Product } = require('../models')
const { createValidation } = require('../validation/orders')

exports.create = async (req, res, next) => {
    const { orderedDate, quantity, totalPrice, productId } = req.body
    const userId = req.user.id

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const product = await Product.findByPk(productId)

        if (!product)
            return res.status(404).json({
                success: false,
                message: 'Product not found.',
            })

        const order = await Order.create({
            orderedDate,
            quantity,
            totalPrice,
            productId,
            userId,
        })

        return res.status(200).json({
            success: true,
            message: 'Order placed',
            data: order,
        })
    } catch (err) {
        return next(err)
    }
}
