const express = require('express')
const router = express.Router()
const UserRoutes = require('./UserRoutes')
const EventRoutes = require('./EventRoutes')
const UserEventRoutes = require('./UserEventRoutes')

router.use('/users', UserRoutes)
router.use('/events', EventRoutes)
router.use('/UserEvent', UserEventRoutes)

module.exports = router