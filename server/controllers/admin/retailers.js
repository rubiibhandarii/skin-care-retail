const bcrypt = require('bcryptjs')
const { Provider } = require('../../models')
const { createValidation } = require('../../validation/admin/providers')

exports.all = async (req, res, next) => {
    try {
        const providers = await Provider.findAll()
        return res.status(200).json({
            success: true,
            message: 'All the available providers are fetched.',
            count: providers.length,
            data: providers,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { providerId } = req.params

    try {
        const singleProvider = await Provider.findByPk(providerId)

        if (!singleProvider)
            return res.status(404).json({
                success: false,
                message: 'Provider not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single provider is fetched.',
            data: singleProvider,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    const { username, email, password } = req.body

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        // Checking if username exists
        const usernameExists = await Provider.findOne({ where: { username } })

        if (usernameExists)
            return res.status(400).json({
                success: false,
                message: 'Username was already taken.',
            })

        // Checking if email exists
        const emailExists = await Provider.findOne({ where: { email } })

        if (emailExists)
            return res.status(400).json({
                success: false,
                message: 'Email was already taken.',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createdProvider = await Provider.create({
            username,
            email,
            password: hashedPassword,
            isVerified: true,
        })
        return res.status(200).json({
            success: true,
            message: 'New provider was added.',
            data: createdProvider,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { providerId } = req.params
    const { username, email, password } = req.body

    try {
        const singleProvider = await Provider.findByPk(providerId)

        if (!singleProvider)
            return res.status(404).json({
                success: false,
                message: 'Provider not found!',
            })

        const updatedProvider = await Provider.update(
            { username, email, password },
            { where: { id: providerId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Provider was updated.',
            data: updatedProvider,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { providerId } = req.params

    try {
        const singleProvider = await Provider.findByPk(providerId)

        if (!singleProvider)
            return res.status(404).json({
                success: false,
                message: 'Provider not found!',
            })

        const deletedProvider = await Provider.destroy({
            where: { id: providerId },
        })
        return res.status(200).json({
            success: true,
            message: 'Provider was deleted.',
            data: deletedProvider,
        })
    } catch (err) {
        return next(err)
    }
}
