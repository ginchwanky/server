const express = require('express')
const router = express.Router()
const UserEventController = require('../controllers/UserEventController')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/:EventId', UserEventController.getEvent)
router.post('/', authentication, UserEventController.createUserEvent)
router.put('/:EventId', authentication, UserEventController.updateEvent)
router.delete('/:id', authentication, UserEventController.deleteEvent)

module.exports = router