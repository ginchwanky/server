const express = require('express')
const router = express.Router()
const EventController = require('../controllers/EventController')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', EventController.findAllEvent)
router.get('/:id', EventController.findOne)
router.get('/history/:userId', authentication, EventController.getEventHistory)
router.post('/', authentication, EventController.createEvent)
router.put('/:id', authentication, authorization, EventController.updateEvent)
router.delete('/:id', authentication, authorization,EventController.deleteEvent)

module.exports = router