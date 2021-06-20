const { Appointment, Service } = require('../../models')
const { createValidation } = require('../../validation/admin/appointments')

exports.all = async (req, res, next) => {
    try {
        const appointments = await Appointment.findAll()
        return res.status(200).json({
            success: true,
            message: 'All the available appointments are fetched.',
            count: appointments.length,
            data: appointments,
        })
    } catch (err) {
        return next(err)
    }
}

exports.single = async (req, res, next) => {
    const { appointmentId } = req.params

    try {
        const singleAppointment = await Appointment.findByPk(appointmentId)

        if (!singleAppointment)
            return res.status(404).json({
                success: false,
                message: 'Appointment not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single appointment is fetched.',
            data: singleAppointment,
        })
    } catch (err) {
        return next(err)
    }
}

exports.create = async (req, res, next) => {
    const { date, time, serviceId, userId } = req.body

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const service = await Service.findByPk(serviceId)

        if (!service)
            return res.status(400).json({
                success: false,
                message: 'Service not found.',
            })

        const appointment = await Appointment.create({
            date,
            time,
            userId,
            serviceId,
        })

        return res.status(200).json({
            success: true,
            message: 'Appointment booked',
            data: appointment,
        })
    } catch (err) {
        return next(err)
    }
}

exports.update = async (req, res, next) => {
    const { appointmentId } = req.params
    const { date, time, serviceId, userId } = req.body

    try {
        const singleAppointment = await Appointment.findByPk(appointmentId)

        if (!singleAppointment)
            return res.status(404).json({
                success: false,
                message: 'Appointment not found!',
            })

        const updatedAppointment = await Appointment.update(
            { date, time, userId, serviceId },
            { where: { id: appointmentId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Appointment was updated.',
            data: updatedAppointment,
        })
    } catch (err) {
        return next(err)
    }
}

exports.remove = async (req, res, next) => {
    const { appointmentId } = req.params

    try {
        const singleAppointment = await Appointment.findByPk(appointmentId)

        if (!singleAppointment)
            return res.status(404).json({
                success: false,
                message: 'Appointment not found!',
            })

        const deletedAppointment = await Appointment.destroy({
            where: { id: appointmentId },
        })
        return res.status(200).json({
            success: true,
            message: 'Appointment was deleted.',
            data: deletedAppointment,
        })
    } catch (err) {
        return next(err)
    }
}
