const express = require('express')
const router = express.Router()
const UserEventController = require('../controllers/UserEventController')

router.get('/:EventId', UserEventController.getEvent)
router.post('/', UserEventController.createUserEvent)
router.put('/:EventId', UserEventController.updateEvent)
router.delete('/:id', UserEventController.deleteEvent)

module.exports = router