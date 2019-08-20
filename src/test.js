/* eslint-disable */

import {
  DockerApi,
  DockerPort,
  DockerStack,
  DockerContainer,
} from './classes';
import DockerImage from './classes/docker-image';

$dockerApi = new DockerApi('teedev', 'devan');

// DockerContainer
//   .get('teedev.devan.testGroup.apache')
//   .then((containers) => {
//     console.log(containers);
//   });

const apache = new DockerContainer({
  name: 'apache',
  image: 'teedev:apache',
  ports: [
    {
      publicPort: 8090,
      privatePort: 80,
    },
  ],
  volumes: [
    {
      src: '/c/github/teedev-api',
      dest: '/usr/local/apache2/htdocs',
    },
  ],
});

const php = new DockerContainer({
  name: 'php',
  image: 'teedev:php',
  ports: [
    {
      publicPort: 8070,
      privatePort: 9000,
    },
  ],
  volumes: [
    {
      src: '/c/github/teedev-api',
      dest: '/usr/local/apache2/htdocs',
    },
  ],
});

const stack = new DockerStack({
  scope: 'devenv',
  containers: [
    apache,
    php,
  ],
  volumes: [

  ],
  networks: [
    
  ],
});

// stack.start().then(() => {
//   console.log('Done');
// });

const testImage = new DockerImage({
  name: 'test/testimage',
  dockerFile: '/images/php.dockerfile',
  context: '/github/teedev-docker',
});

testImage.build()
  .then(() => {
    console.log('Then');
  })
  .catch(() => {
    console.log('Catch');
  });
