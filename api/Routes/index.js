import express from 'express'
import fs from 'fs'
const app = express();

fs.readdir('./api/Routes', (err,files) => {
  if (err){
    console.log(err);
  }else{
  files.forEach((file) => {
    if(file.indexOf('index.js') !== -1) return;
    const routeName = file.slice(0,-3).toLowerCase();
    const route = require(`../Routes/${routeName}`);
    app.use(`/${routeName}`, route);
  })
  }
})


module.exports = app;