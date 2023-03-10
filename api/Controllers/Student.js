import StudentServices from "../Services/Student";

class StudentControllers{
  /**
 * @swagger
 * @route GET /student
 * @group Students
 * @summary endpoint for getting all students
 * @returns {object} 200 - An array of students info
 * @returns {Error} 500 - Internal server error
 */
  static async getAll(req,res){
    try {
      const result = await StudentServices.getAll();
      res.json(result)
    } catch (error) {
      res.json(error.message)
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
  static async getOne(req,res){
    try {
      const result = await StudentServices.getOne(req.params.id);
      res.json(result)
    } catch (error) {
      res.json(error.message)
    }
  }
}

export default StudentControllers