import express from 'express';
import { Student, sequelize } from '../src/models'
import options from '../src/config/swaggerOptions';
import routes from '../api/Routes/index';

const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)

expressSwagger(options);

app.listen(port, async () => {
  // if your model names are not starting with lowercase letter, make force:true !! EVERY TABLE WILL BE DELETED
  // if you keep your existing table as is but created new model with lowercase letter ->
  // -> make this alter:true
  await sequelize.sync({ alter: true })
  console.log(`Express server listening port ${port}`);
});
