import db from '../../src/models/index';

class StudentServices {
	static async getAll() {
		try {
			const result = await db.Student.findAll();
			console.log(result);
			return { type: true, message: 'All students get', data: result };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async getOne(id) {
		try {
			const result = await db.Student.findOne({ where: { id: id } })
			return { type: true, message: 'A student get', data: result };

		} catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async create(body) {
		try {
			const result = await db.Student.create(body);
			return { type: true, message: 'A student is created', data: result };
		} catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async update(id, body) {
		try {
			const findStudent = await db.Student.findOne({ where: { id: id } })
			if (!findStudent) {
				return { type: false, message: 'Student could not find' };
			}
			const result = await db.Student.update(body, { where: { id: id } })
			return { type: true, message: 'A student is updated', data: result };
		} catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async delete(id) {
		try {
			const findStudent = await db.Student.findOne({ where: { id: id } })
			if (!findStudent) {
				return { type: false, message: 'Student could not find' };
			}
			const result = await db.Student.destroy({ where: { id: id } })
			return { type: true, message: 'A student is deleted', data: result };

		} catch (error) {
			return { type: false, message: error.message };
		}
	}
}

export default StudentServices