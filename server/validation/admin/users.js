const Joi = require('@hapi/joi')

exports.createValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'user').required(),
    })
    return schema.validate(data)
}
