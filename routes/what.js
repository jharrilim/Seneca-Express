const Seneca = require("seneca")();
const SenecaWeb = require('seneca-web');
const Express = require('express');
const SenecaWebAdapter = require('seneca-web-adapter-express');

const mongoose = require('mongoose');
const Student = require("./model/student");

mongoose.connect("mongodb://localhost/lab4");
mongoose.model("Student", Student);

Seneca.use(require("./operations.js"));
Seneca.use(SenecaWeb, {
  context: Express,
  adapter: SenecaWebAdapter
});
Seneca.ready(()=> {
    const app = Seneca.export("web/context")();
    //app.use(require("body-parser").json());
    app.listen(3000);
});
