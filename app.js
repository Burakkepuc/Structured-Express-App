const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

const port = 5000;
const {
  sequelize,
  Student,
} = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Swagger settings
let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a server with basic API features',
      title: 'School Management simulation',
      version: '1.0.0',
    },
    host: 'localhost:5000',
    basePath: '/',
    produces: ['application/json', 'application/xml'],
    schemas: ['http', 'https'],
    securityDefinition: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
    },
  },

  basedir: __dirname,
  files: ['./app.js'],
};
expressSwagger(options);

/**
 * @swagger
 * @route GET /students
 * @group Students
 * @summary endpoint for getting all students
 * @returns {object} 200 - An array of students info
 * @returns {Error} 500 - Internal server error
 */
app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * @route GET /student/{id}
 * @group Students
 * @summary endpoint for getting one student
 * @param {string} id.path.required - ID
 * @returns {object} 200 - An array of students info
 * @returns {Error} 500 - Internal server error
 */
app.get('/student/:id',async (req,res) => {
 try {
   const {id} = req.params; 
   const student = await Student.findOne({where:{id:id}})
  res.json(student)
 } catch (error) {
    return res.status(500).json({error: error.message});
 }
})

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
app.post('/student', async (req, res) => {
  try {
    const {name, surname, email} = req.body;
    const student = await Student.create({name, surname, email});
    return res.json(student);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

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
app.put('/student/:id',async(req,res) => {
  try {
    const {id} = req.params;
    const findStudent = await Student.findOne({where:{id:id}})
    if(!findStudent){
				return {type: false, message: 'Student could not find'};
    }
    const student = await Student.update(req.body,{where:{id:id}})
    return res.json(student)
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

/**
 * @swagger
 * @route DELETE /student/{id}
 * @group Students - Delete operation about a student
 * @summary Deleting a student from database
 * @param {string} id.path.required - ID
 * @returns {object} 200 - An array of user info
 * @returns {Error} 500 - Internal server error
 */
app.delete('/student/:id', async(req,res) => {
  try {
    const {id} = req.params;
    const findStudent = await Student.findOne({where:{id:id}})
    if(!findStudent){
				return {type: false, message: 'Student could not find'};
    }
    const student = await findStudent.destroy()
    return res.json(student)
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.sync({alter: true});
  console.log('Database connected');
});
