const { Product, Retailer } = require('../models')
const { createValidation } = require('../validation/products')

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

exports.create = async (req, res, next) => {
    const { name, description, price, categoryId } = req.body
    const retailerId = req.user.id

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const createdProduct = await Product.create(
            {
                name,
                description,
                price,
                categoryId,
                retailerId,
            }
            // {
            //     include: [
            //         {
            //             model: Provider,
            //             as: 'provider',
            //         },
            //     ],
            // }
        )
        return res.status(200).json({
            success: true,
            message: 'New product was added.',
            data: createdProduct,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { productId } = req.params
    const retailerId = req.user.id
    const { name, description, price, categoryId } = req.body

    try {
        const singleProduct = await Product.findByPk(productId)

        if (!singleProduct)
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            })

        if (singleProduct.retailerId !== retailerId)
            return res.status(401).json({
                success: false,
                message:
                    'Access denied ! Only creator of this product can update.',
            })

        const updatedProduct = await Product.update(
            { name, description, price, categoryId },
            { where: { id: productId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Product was updated.',
            data: updatedProduct,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { productId } = req.params
    const retailerId = req.user.id

    try {
        const singleProduct = await Product.findByPk(productId)

        if (!singleProduct)
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            })

        if (singleProduct.retailerId !== retailerId)
            return res.status(401).json({
                success: false,
                message:
                    'Access denied ! Only creator of this product can delete.',
            })

        const deletedProduct = await Product.destroy({
            where: { id: productId },
        })
        return res.status(200).json({
            success: true,
            message: 'Product was deleted.',
            data: deletedProduct,
        })
    } catch (err) {
        return next(err)
    }
}
