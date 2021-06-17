const Joi = require('@hapi/joi')

exports.registerValidation = (data) => {
    const schema = Joi.object({
        companyName: Joi.string().required(),
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string().min(6).required(),
        location: Joi.string().required(),
    })
    return schema.validate(data)
}

exports.activateAccountValidation = (data) => {
    const schema = Joi.object({
        token: Joi.string().required(),
    })
    return schema.validate(data)
}

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
}

exports.resetPasswordValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }),
    })
    return schema.validate(data)
}

exports.updatePasswordByTokenValidation = (data) => {
    const schema = Joi.object({
        newPassword: Joi.string().required(),
        token: Joi.string().required(),
    })
    return schema.validate(data)
}

exports.orderStatusValidation = (data) => {
    const schema = Joi.object({
        status: Joi.string()
            .valid('approved', 'refused', 'delivered')
            .required(),
    })
    return schema.validate(data)
}
