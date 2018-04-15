const mongoose = require('mongoose');
const StudentSchema = require("./model/studentSchema");
const Student = require("./model/student");

mongoose.connect("mongodb://localhost/lab4");
mongoose.model("Student", StudentSchema);

const Seneca = require('seneca');
const SenecaWeb = require('seneca-web');
const Express = require('express');
const seneca = Seneca();
seneca.use(require("./operations.js"));
seneca.use(SenecaWeb, {
  context: Express(),
  adapter: require('seneca-web-adapter-express')
});
seneca.ready(() => {
  const app = seneca.export('web/context')();
  app.get("/api/student", createStudent);
  app.listen(3000);
});

function createStudent(req, res, next) {
    let student;
    if (req.body) {
        student = new Student(req.body.name, req.body.studentNumber, req.body.email);
    } else {
        student = new Student(req.query.name, req.query.studentNumber, req.query.email);
    }

    seneca.act({
        role: 'student',
        cmd: 'create',
        name: student.name,
        studentNumber: student.studentNumber,
        email: student.email
    }, function(err, result) {
        console.log(result);
        next(err);
    });
    res.json(student);
}
