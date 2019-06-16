"use strict";

var _newClasses = require("./newClasses");

var dockerApi = new _newClasses.DockerApi();
console.log(_newClasses.DockerPort.map([{
  publicPort: '8080'
}, {
  publicPort: '8090'
}])); // DockerContainer
//   .get('teedev.devan.testGroup.apache')
//   .then((containers) => {
//     console.log(containers);
//   });