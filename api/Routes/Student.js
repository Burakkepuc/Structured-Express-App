import express from 'express'
import StudentControllers from '../Controllers/Student'

const router = express.Router()

router.get('/',StudentControllers.getAll)
router.get('/:id',StudentControllers.getOne)



module.exports = router
