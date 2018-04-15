module.exports = function(options) {
    const Student = require('mongoose').model("Student");
    function create(msg, respond) {
        Student.create({
                name: msg.name,
                studentNumber: msg.studentNumber,
                email: msg.email
            },
            (err, student) => {
                if (err)
                    return next(err);
                respond(null, {
                    status: "OK",
                    result: student
                });
            });
    }

    function read(msg, respond) {
        Student.find({
                name: msg.name,
                studentNumber: msg.studentNumber,
                email: msg.email
            },
            (err, student) => {
                respond(null, {
                    status: "OK",
                    result: student
                });
            });
    }

    function update(msg, respond) {
        Student.findOneAndUpdate({
                name: msg.name,
                studentNumber: msg.studentNumber,
                email: msg.email
            },
            (err, student) => {
                respond(null, {
                    status: "OK",
                    result: student
                });
            });
    }

    function $delete(msg, respond) {
        Student.findOneAndRemove({
                name: msg.name,
                studentNumber: msg.studentNumber,
                email: msg.email
            },
            (err, student) => {
                respond(null, {
                    status: "OK",
                    result: student
                });
            });
    }

    this.add({
        role: 'student',
        cmd: 'create'
    }, create);

    this.add({
        role: 'student',
        cmd: 'read'
    }, read);

    this.add({
        role: 'student',
        cmd: 'update'
    }, update);

    this.add({
        role: 'student',
        cmd: 'delete'
    }, $delete);

}
