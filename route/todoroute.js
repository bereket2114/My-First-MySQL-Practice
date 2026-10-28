const express = require('express')
const router = express.Router()
const todoCont = require('../controller/todo')

router.get('/', todoCont.getTodo)
router.get('/:one', todoCont.getOne)
router.post('/create', todoCont.create)
router.delete('/cancel/:id', todoCont.remove)

router.put('/:id', todoCont.update)

module.exports = router