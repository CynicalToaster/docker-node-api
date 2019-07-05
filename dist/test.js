"use strict";

var _classes = require("./classes");

/* eslint-disable */
$dockerApi = new _classes.DockerApi('teedev', 'devan'); // DockerContainer
//   .get('teedev.devan.testGroup.apache')
//   .then((containers) => {
//     console.log(containers);
//   });

var apache = new _classes.DockerContainer({
  name: 'apache',
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
  name: 'php',
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
  scope: 'devenv',
  containers: [apache, php]
});
stack.restart().then(function () {
  console.log('Done');
});
//# sourceMappingURL=test.js.map