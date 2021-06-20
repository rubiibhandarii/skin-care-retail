const { Service, Provider } = require('../../models')
const { createValidation } = require('../../validation/admin/services')

exports.all = async (req, res, next) => {
    try {
        const services = await Service.findAll({
            include: [
                {
                    model: Provider,
                    as: 'provider',
                },
            ],
        })
        return res.status(200).json({
            success: true,
            message: 'All the available services are fetched.',
            count: services.length,
            data: services,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { serviceId } = req.params

    try {
        const singleService = await Service.findByPk(serviceId, {
            include: [
                {
                    model: Provider,
                    as: 'provider',
                },
            ],
        })

        if (!singleService)
            return res.status(404).json({
                success: false,
                message: 'Service not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single service is fetched.',
            data: singleService,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    const { name, description, price, serviceTypeId, providerId } = req.body

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const createdService = await Service.create(
            {
                name,
                description,
                price,
                serviceTypeId,
                providerId,
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
            message: 'New service was added.',
            data: createdService,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { serviceId } = req.params
    const { name, description, price, serviceTypeId, providerId } = req.body

    try {
        const singleService = await Service.findByPk(serviceId)

        if (!singleService)
            return res.status(404).json({
                success: false,
                message: 'Service not found!',
            })

        const updatedService = await Service.update(
            { name, description, price, serviceTypeId, providerId },
            { where: { id: serviceId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Service was updated.',
            data: updatedService,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { serviceId } = req.params

    try {
        const singleService = await Service.findByPk(serviceId)

        if (!singleService)
            return res.status(404).json({
                success: false,
                message: 'Service not found!',
            })

        const deletedService = await Service.destroy({
            where: { id: serviceId },
        })
        return res.status(200).json({
            success: true,
            message: 'Service was deleted.',
            data: deletedService,
        })
    } catch (err) {
        return next(err)
    }
}
