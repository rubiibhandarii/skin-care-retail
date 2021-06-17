const { Op } = require('sequelize')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const mg = require('../config/mailgun')
const {
    registerValidation,
    activateAccountValidation,
    resetPasswordValidation,
    loginValidation,
    updatePasswordByTokenValidation,
} = require('../validation/users')

exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body

    // Validation
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    try {
        // Checking if email exists
        const emailExists = await User.findOne({ where: { email } })

        if (emailExists)
            return res.status(400).json({
                success: false,
                message: 'Email was already taken.',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating a new user
        const registeredUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
        })

        const verificationData = {
            from: 'noreply@hello.com',
            to: registeredUser.email,
            subject: 'Account Activation Link',
            html: `
            <h2>Please click on given link to activate your account</h2>
            <p>${process.env.CLIENT_URL}/verify-email/${registeredUser.emailToken}</p>
        `,
        }

        // Sending verification email
        await mg.messages().send(verificationData)
        return res.status(200).json({
            success: true,
            message:
                'Account was created successfully. Email has been sent, please activate your account.',
            data: registeredUser,
        })
    } catch (err) {
        return next(err)
    }
}

exports.activateAccount = async (req, res, next) => {
    const { token } = req.body

    // Validation
    const { error } = activateAccountValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({ where: { emailToken: token } })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Token is invalid.',
            })

        await User.update(
            { emailToken: null, isVerified: true },
            { where: { id: user.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'Account is verified.',
            data: user,
        })
    } catch (err) {
        return next(err)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    // Validation
    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        // Checking if user with that email exists
        const user = await User.findOne({ where: { email } })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Checking if password matches
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Removing password and emailToken from object
        user.password = undefined
        user.emailToken = undefined

        // Assigning a token
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

        return res.status(200).json({
            success: true,
            message: 'You are now logged in.',
            token,
            data: user,
        })
    } catch (err) {
        return next(err)
    }
}

exports.resetPassword = async (req, res, next) => {
    const { email } = req.body
    const token = crypto.randomBytes(64).toString('hex')

    // Validation
    const { error } = resetPasswordValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({ where: { email } })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User with that email does not exist.',
            })

        await User.update(
            {
                resetToken: token,
                expireToken: Date.now() + 3600000,
            },
            { where: { id: user.id } }
        )

        const data = {
            from: 'noreply@hello.com',
            to: user.email,
            subject: 'Password Reset',
            html: `
                <h2>Please click on given link to reset your password</h2>
                <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
                `,
        }

        // Sending verification email
        await mg.messages().send(data)
        return res.status(200).json({
            success: true,
            message: 'Email has been sent, please reset your password.',
        })
    } catch (err) {
        return next(err)
    }
}

exports.updatePasswordByToken = async (req, res, next) => {
    const { newPassword, token } = req.body

    // Validation
    const { error } = updatePasswordByTokenValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const user = await User.findOne({
            where: { resetToken: token, expireToken: { [Op.gt]: Date.now() } },
        })

        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Session expired',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await User.update(
            { password: hashedPassword, resetToken: null, expireToken: null },
            { where: { id: user.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'New password was updated.',
        })
    } catch (err) {
        return next(err)
    }
}
