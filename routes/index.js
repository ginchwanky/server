const express = require('express')
const router = express.Router()
const UserRoutes = require('./UserRoutes')
const EventRoutes = require('./EventRoutes')

router.use('/users', UserRoutes)
router.use('/events', EventRoutes)

module.exports = router