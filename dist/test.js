"use strict";

var _newClasses = require("./newClasses");

var dockerApi = new _newClasses.DockerApi(); // DockerContainer
//   .get('teedev.devan.testGroup.apache')
//   .then((containers) => {
//     console.log(containers);
//   });

_newClasses.DockerContainer.getAll().then(function (containers) {
  console.log(containers);
});
//# sourceMappingURL=test.js.map