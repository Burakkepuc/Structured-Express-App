import db from '../../src/models/index';

class StudentServices{
  static async getAll(){
		try {
			const result = await db.Student.findAll();
			return {type: true, message: 'All students get', data: result}; 
		}
		catch (error) {
			return {type: false, message: error.message};
		}
	}

	static async getOne(id){
	 try {
   const result = await db.Student.findOne({where:{id:id}})
	 return {type: true, message: 'A student get', data: result}; 

 } catch (error) {
			return {type: false, message: error.message};
 }
	}
}

export default StudentServices