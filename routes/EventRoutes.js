const express = require('express')
const router = express.Router()
const EventController = require('../controllers/EventController')

router.get('/', EventController.findAllEvent)
router.get('/userevent/:id', EventController.getEvent)
router.get('/:id', EventController.findOne)
router.post('/', EventController.createEvent)
router.put('/:id', EventController.updateEvent)
router.put('/:id', EventController.deleteEvent)

module.exports = router