const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        orderDate: Joi.date().required(),
        quantity: Joi.number().required(),
        totalPrice: Joi.number().required(),
        productId: Joi.string().required(),
    })
    return schema.validate(data)
}