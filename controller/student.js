const Student = require("../model/student");
const Seneca = require("../appContext").context.seneca;
function parseStudent(req) {
    let student;
    if (req.body) {
        student = new Student(req.body.name, req.body.studentNumber, req.body.email);
    } else {
        student = new Student(req.query.name, req.query.studentNumber, req.query.email);
    }
    return student;
}

function studentCommand(student, cmd) {
    Seneca.act({
        role: 'student',
        cmd: cmd,
        name: student.name,
        studentNumber: student.studentNumber,
        email: student.email
    }, (err, result) => {
        console.log(result);
        next(err);
    });
    res.json(student);
}

module.exports.createStudent = (req, res, next) => {
    const student = parseStudent(req);
    studentCommand(student, "create");
}

module.exports.getStudent = (req, res, next) => {
    const student = parseStudent(req);
    studentCommand(student, "read");
};

module.exports.updateStudent = (req, res, next) => {
    const student = parseStudent(req);
    studentCommand(student, "update");
}

module.exports.deleteStudent = (req, res, next) => {
    const student = parseStudent(req);
    studentCommand(student, "delete");
}
