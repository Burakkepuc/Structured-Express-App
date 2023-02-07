const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const swaggerUi = require('swagger-ui-express');

const port = 3000;
const {
  sequelize,
  Student,
  Instructor,
  Subject,
  Class,
  StudentClass,
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
    host: 'localhost:3000',
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options));

/**
 * @swagger
 * @group Students - Operations About Student
 * @route POST /student - Add a new student
 * @summary endpoint for adding a student
 * @param {string} name.required - Student name
 * @param {string} surname.required - Student surname
 * @param {string} email.required - Student email
 * @produces application/json
 * @consumes application/json
 * @returns {Students} 200 - Student Model
 * @security JWT
 */

app.post('/student', async (req, res) => {
  try {
    const {name, surname, email} = req.body;
    const student = await Student.create({name, surname, email});
    return res.json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

/**
 * @swagger
 * @group Instructors
 * @route POST /instructor - Add a new instructor
 * @summary endpoint for adding a instructor
 * @param {string} instructorDegree.required - Instructor degree
 * @param {string} name.required - Instructor name
 * @param {string} surname.required - Instructor surname
 * @param {string} subjectId.required - Instructor email
 * @produces application/json
 * @consumes application/json
 * @returns {Instructor} 200 - Instructor Model
 * @security JWT
 */

app.post('/instructor', async (req, res) => {
  try {
    console.log(req.body);

    const {instructorDegree, name, surname, subjectId} = req.body;
    const instructor = await Instructor.create({
      instructorDegree,
      name,
      surname,
      subjectId,
    });
    return res.json(instructor);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.post('/subjects', async (req, res) => {
  try {
    const {subjectName, instructorId} = req.body;
    const subject = await Subject.create({
      subjectName,
      instructorId,
    });
    return res.json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.post('/classes', async (req, res) => {
  try {
    const {instructorId, classCode} = req.body;
    const savedClass = await Class.create({
      instructorId,
      classCode,
    });
    return res.json(savedClass);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.post('/student_classes', async (req, res) => {
  try {
    const {classId, studentId} = req.body;
    const saveClassesandStudents = await StudentClass.create({
      classId,
      studentId,
    });

    return res.json(saveClassesandStudents);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

/**
 * @swagger
 * @route GET /students
 * @summary endpoint for getting all students
 * @group Students
 * @returns {array} 200 - An array of students info
 * @returns {Error} 500 - Internal server error
 *
 * @typedef Student
 *
 */
app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    return res.status(500).json({error: 'Something went wrong'});
  }
});

/**
 * @swagger
 * @route GET /instructors
 * @summary endpoind for getting all instructors
 * @group Instructors - Operations About instructors
 * @returns {array} 200 - An array of students info
 * @returns {Error} 500 - Internal server error
 */
app.get('/instructors', async (req, res) => {
  try {
    const instructors = await Instructor.findAll({include: ['Subject']});
    return res.json(instructors);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.sync({alter: true});
  console.log('Database connected');
});
