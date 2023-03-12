import StudentServices from '../Services/Student';
import StudentValidation from '../Validation/Student';

class StudentControllers {

	/**
	 * @swagger
	 * @route GET /student
	 * @group Students
	 * @summary endpoint for getting all students
	 * @returns {object} 200 - An array of students info
	 * @returns {Error} 500 - Internal server error
	 */
	static async getAll(req, res) {
		try {
			const result = await StudentServices.getAll();
			res.json(result);
		}
		catch (error) {
			res.json(error.message);
		}
	}

	/**
	 * @swagger
	 * @route GET /student/{id}
	 * @group Students
	 * @summary endpoint for getting one student
	 * @param {string} id.path.required - ID
	 * @returns {object} 200 - An array of students info
	 * @returns {Error} 500 - Internal server error
	 */
	static async getOne(req, res) {
    	
		try {
			const result = await StudentServices.getOne(req.params.id);
			res.json(result);
		}
		catch (error) {
			res.json(error.message);
		}
	}

	/**
	 * @typedef Student
	 * @property {string} name.required
	 * @property {string} surname.required
	 * @property {string} email.required
	 */
	/**
	 * @swagger
	 * @typedef Student
	 * @route POST /student
	 * @group Students - Post operation about student
	 * @summary endpoint for adding a student
	 * @param {Student.model} Student.body.required
	 * @returns {object} 200 - Student Model
	 * @returns {Error} 500 - Internal server error
	 */
	static async create(req, res) {
		try {
      	const validateCreate = await StudentValidation.validateStudentCreate(req.body);
      	if (!validateCreate.type){
				return res.json({type: false, message: validateCreate.message});
			}
			const result = await StudentServices.create(req.body);
			res.json(result);
		}
		catch (error) {
			res.json(error.message);
		}
	}

	/**
	 * @typedef Student
	 * @property {string} name
	 * @property {string} surname
	 * @property {string} email
	 */
	/**
	 * @swagger
	 * @typedef Student
	 * @route PUT /student/{id}
	 * @group Students - Put operation about student
	 * @summary Updating a user
	 * @param {string} id.path.required - ID
	 * @param {Student.model} Student.body.required
	 * @returns {object} 200 - Student Model
	 * @returns {Error} 500 - Internal server error
	 */
	static async update(req, res) {
		try {
      	const validateUpdate = await StudentValidation.validateStudentUpdate(req.body);
      	if (!validateUpdate.type){
				return res.json({type: false, message: validateUpdate.message});
			}
			const result = await StudentServices.update(req.params.id, req.body);
			res.json(result);
		}
		catch (error) {
			res.json(error.message);
		}
	}

	/**
	 * @swagger
	 * @route DELETE /student/{id}
	 * @group Students - Delete operation about a student
	 * @summary Deleting a student from database
	 * @param {string} id.path.required - ID
	 * @returns {object} 200 - An array of user info
	 * @returns {Error} 500 - Internal server error
	 */
	static async delete(req, res) {
		try {
			const result = await StudentServices.delete(req.params.id);
			res.json(result);
		}
		catch (error) {
			res.json(error.message);

		}
	}

}

export default StudentControllers;