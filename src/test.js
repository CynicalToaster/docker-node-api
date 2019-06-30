/* eslint-disable */

import {
  DockerApi,
  DockerPort,
  DockerStack,
  DockerContainer,
} from './classes';

const dockerApi = new DockerApi();

// DockerContainer
//   .get('teedev.devan.testGroup.apache')
//   .then((containers) => {
//     console.log(containers);
//   });

const apache = new DockerContainer({
  name: 'docker.devan.apache',
  image: 'teedev:apache',
  ports: [
    {
      publicPort: 8090,
      privatePort: 80,
    },
  ],
  volumes: [
    {
      src: '/c/github/teedev-docker/laravel-code-base',
      dest: '/usr/local/apache2/htdocs',
    },
  ],
});

const php = new DockerContainer({
  name: 'docker.devan.php',
  image: 'teedev:php',
  ports: [
    {
      publicPort: 8070,
      privatePort: 9000,
    },
  ],
  volumes: [
    {
      src: '/c/github/teedev-docker/laravel-code-base',
      dest: '/usr/local/apache2/htdocs',
    },
  ],
});

const stack = new DockerStack({
  containers: [
    apache,
    php,
  ]
});

stack.create().then(() => {
  stack.start();
});
