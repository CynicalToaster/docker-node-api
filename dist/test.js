"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classes = require("./classes");

var _dockerImage = _interopRequireDefault(require("./classes/docker-image"));

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
    src: '/c/github/teedev-api',
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
    src: '/c/github/teedev-api',
    dest: '/usr/local/apache2/htdocs'
  }]
});
var stack = new _classes.DockerStack({
  scope: 'devenv',
  containers: [apache, php],
  volumes: [],
  networks: []
}); // stack.start().then(() => {
//   console.log('Done');
// });

var testImage = new _dockerImage["default"]({
  name: 'test/testimage',
  dockerFile: '/images/php.dockerfile',
  context: '/github/teedev-docker'
});
testImage.build().then(function () {
  console.log('Then');
})["catch"](function () {
  console.log('Catch');
});
//# sourceMappingURL=test.js.map