import express from 'express'
import StudentControllers from '../Controllers/Student'

const router = express.Router()

router.get('/', StudentControllers.getAll)
router.get('/:id', StudentControllers.getOne)
router.post('/', StudentControllers.create)
router.put('/:id', StudentControllers.update)
router.delete('/:id', StudentControllers.delete)



module.exports = router
