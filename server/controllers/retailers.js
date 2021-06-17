const { Op } = require('sequelize')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Retailer, Product, Order } = require('../models')
const mg = require('../config/mailgun')
const {
    registerValidation,
    activateAccountValidation,
    resetPasswordValidation,
    loginValidation,
    updatePasswordByTokenValidation,
    orderStatusValidation,
} = require('../validation/retailers')

exports.register = async (req, res, next) => {
    const { companyName, email, password, location } = req.body

    // Validation
    const { error } = registerValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        // Checking if email exists
        const emailExists = await Retailer.findOne({ where: { email } })

        if (emailExists)
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating a new user
        const registeredRetailer = await Retailer.create({
            companyName,
            email,
            password: hashedPassword,
            location,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
        })

        const verificationData = {
            from: 'noreply@hello.com',
            to: registeredRetailer.email,
            subject: 'Account Activation Link',
            html: `
            <h2>Please click on given link to activate your account</h2>
            <p>${process.env.CLIENT_URL}/verify-email/${registeredRetailer.emailToken}</p>
        `,
        }

        // Sending verification email
        await mg.messages().send(verificationData)
        return res.status(200).json({
            success: true,
            message:
                'Account was created successfully. Email has been sent, please activate your account.',
            data: registeredRetailer,
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
        const retailer = await Retailer.findOne({
            where: { emailToken: token },
        })

        if (!retailer)
            return res.status(400).json({
                success: false,
                message: 'Token is invalid.',
            })

        await Retailer.update(
            { emailToken: null, isVerified: true },
            { where: { id: retailer.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'Account is verified.',
            data: retailer,
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
        // Checking if provider with that email exists
        const retailer = await Retailer.findOne({ where: { email } })
        if (!retailer)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Checking if password matches
        const isPassword = await bcrypt.compare(password, retailer.password)
        if (!isPassword)
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials.',
            })

        // Removing password and emailToken from object
        retailer.password = undefined
        retailer.emailToken = undefined

        // Assigning a token
        const token = jwt.sign({ id: retailer.id }, process.env.TOKEN_SECRET)

        return res.status(200).json({
            success: true,
            message: 'You are now logged in.',
            token,
            data: retailer,
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
        const retailer = await Retailer.findOne({ where: { email } })
        if (!retailer)
            return res.status(200).json({
                success: true,
                message: 'Email has been sent, please reset your password.',
            })

        await Retailer.update(
            {
                resetToken: token,
                expireToken: Date.now() + 3600000,
            },
            { where: { id: retailer.id } }
        )

        const data = {
            from: 'noreply@hello.com',
            to: retailer.email,
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
        const retailer = await Retailer.findOne({
            where: { resetToken: token, expireToken: { [Op.gt]: Date.now() } },
        })

        if (!retailer)
            return res.status(400).json({
                success: false,
                message: 'Session expired',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await Retailer.update(
            { password: hashedPassword, resetToken: null, expireToken: null },
            { where: { id: retailer.id } }
        )

        return res.status(200).json({
            success: true,
            message: 'New password was updated.',
        })
    } catch (err) {
        return next(err)
    }
}

exports.getOrders = async (req, res, next) => {
    const { retailerId } = req.user.id
    try {
        const orders = await Order.findAll({
            where: { retailerId },
        })
        return res.status(200).json({
            success: true,
            message: 'All the orders are fetched.',
            count: orders.length,
            data: orders,
        })
    } catch (err) {
        return next(err)
    }
}

exports.orderStatus = async (req, res, next) => {
    const { orderId } = req.params
    const { status } = req.body
    const retailerId = req.user.id

    // Validation
    const { error } = orderStatusValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: Product,
                    as: 'product',
                },
            ],
        })

        if (!order)
            return res
                .status(404)
                .json({ success: false, message: 'Order not found' })

        if (order.product.retailerId !== retailerId)
            return res.status(401).json({
                success: false,
                message: 'Access denied !',
            })

        if (status === 'approved')
            await Order.update({ status }, { where: { id: orderId } })
        else if (status === 'refused')
            await Order.update({ status }, { where: { id: orderId } })
        else if (status === 'delivered')
            await Order.update({ status }, { where: { id: orderId } })

        const orderAfterUpdate = await Order.findByPk(orderId)

        return res.status(200).json({
            success: true,
            message: `Order ${status}.`,
            data: orderAfterUpdate,
        })
    } catch (err) {
        return next(err)
    }
}
