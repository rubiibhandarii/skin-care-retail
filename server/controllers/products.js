const { Product, Retailer } = require('../models')

exports.all = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Retailer,
                    as: 'retailer',
                },
            ],
        })
        return res.status(200).json({
            success: true,
            message: 'All the available products are fetched.',
            count: products.length,
            data: products,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { productId } = req.params

    try {
        const singleProduct = await Product.findByPk(productId, {
            include: [
                {
                    model: Retailer,
                    as: 'retailer',
                },
            ],
        })

        if (!singleProduct)
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single product is fetched.',
            data: singleProduct,
        })
    } catch (err) {
        return next(err)
    }
}
