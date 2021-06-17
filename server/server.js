const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')
const cors = require('cors')
const db = require('./models')

const app = express()
require('dotenv').config()

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

// Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/retailers', require('./routes/retailers'))
app.use('/api/products', require('./routes/products'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/orders', require('./routes/orders'))

// 404 not found
app.use((req, res) =>
    res.status(404).json({
        success: false,
        message: `404 Not found: /api/v2${req.url} does not exist`,
    })
)

// Error handling
app.use((err, req, res) =>
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
)

// Defining PORT
const PORT = process.env.PORT || 5000

db.sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () =>
            console.log(
                `${chalk.green('✓')} ${chalk.blue(
                    `Listening on http://localhost:${PORT}.`
                )}`
            )
        )
    )
