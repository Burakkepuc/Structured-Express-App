import Joi from '@hapi/joi';

class StudentValidation{

	static async validateStudentCreate(body){
		try {
			const createSchema = Joi.object({
				name: Joi.string().min(3).required(),
				surname: Joi.string().min(3).required(),
				email: Joi.string().email({minDomainSegments: 2}).required()
			});

			const {error} = createSchema.validate(body, {abortEarly: false});
			if (error){
				return {type: false, message: error.message};
			}
			return {type: true};
		}
		catch (error) {
			return {type: false, message: error.message};
		}
	}

  	static async validateStudentUpdate(body){
		try {
 	      const updateSchema = Joi.object({
				name: Joi.string().min(3).required(),
				surname: Joi.string().min(3).required(),
				email: Joi.string().email({minDomainSegments: 2}).required()
			});
			const {error} = updateSchema.validate(body, {abortEarly: false});

			if (error){
				return {type: false, message: error.message};
			}
			return {type: true};
		}
		catch (error){
			return {type: false, message: error.message};
		}
	}

}

export default StudentValidation;