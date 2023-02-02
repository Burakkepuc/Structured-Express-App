const express = require('express');
const app = express();
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

app.post('/students', async (req, res) => {
  try {
    const {name, surname, email} = req.body;
    const student = await Student.create({name, surname, email});
    return res.json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    return res.status(500).json({error: 'Something went wrong'});
  }
});

app.post('/instructors', async (req, res) => {
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
    const {subjectName} = req.body;
    const subject = await Subject.create({
      subjectName,
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

app.get('/instructors', async (req, res) => {
  try {
    const instructors = await Instructor.findAll({include: [Subject]});
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
