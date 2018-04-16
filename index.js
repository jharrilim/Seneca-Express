const mongoose = require('mongoose');
const StudentSchema = require("./model/studentSchema");

mongoose.connect("mongodb://localhost/lab4");
mongoose.model("Student", StudentSchema);

const Seneca = require('seneca');
const SenecaWeb = require('seneca-web');
const Express = require('express');
const seneca = Seneca();
require("./appContext").define(seneca);
seneca.use(require("./operations.js"));
seneca.use(SenecaWeb, {
  context: Express(),
  adapter: require('seneca-web-adapter-express')
});

const StudentController = require("./controller/student");

seneca.ready(() => {
  const app = seneca.export('web/context')();
  app.get("/api/student/create", StudentController.createStudent)
     .post("/api/student/create", StudentController.createStudent)
     .get("/api/student/read", StudentController.getStudent)
     .post("/api/student/read", StudentController.getStudent)
     .get("/api/student/update", StudentController.updateStudent)
     .post("/api/student/update", StudentController.updateStudent)
     .get("/api/student/delete", StudentController.deleteStudent)
     .post("/api/student/delete", StudentController.deleteStudent);
  app.listen(3000);
});
