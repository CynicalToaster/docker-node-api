"use strict";

var _classes = require("./classes");

/* eslint-disable */
var dockerApi = new _classes.DockerApi(); // DockerContainer
//   .get('teedev.devan.testGroup.apache')
//   .then((containers) => {
//     console.log(containers);
//   });

var apache = new _classes.DockerContainer({
  name: 'docker.devan.apache',
  image: 'teedev:apache',
  ports: [{
    publicPort: 8090,
    privatePort: 80
  }],
  volumes: [{
    src: '/c/github/teedev-docker/laravel-code-base',
    dest: '/usr/local/apache2/htdocs'
  }]
});
var php = new _classes.DockerContainer({
  name: 'docker.devan.php',
  image: 'teedev:php',
  ports: [{
    publicPort: 8070,
    privatePort: 9000
  }],
  volumes: [{
    src: '/c/github/teedev-docker/laravel-code-base',
    dest: '/usr/local/apache2/htdocs'
  }]
});
var stack = new _classes.DockerStack({
  containers: [apache, php]
});
stack.create().then(function () {
  stack.start();
}); // container.create()
//   .then(async (container) => {
//     await container.start();
//     console.log(container);
//   });
//# sourceMappingURL=test.js.map