import {
  DockerApi,
  DockerPort,
  DockerContainer,
} from './newClasses';

const dockerApi = new DockerApi();

console.log(DockerPort.map([
  {
    publicPort: '8080',
  },
  {
    publicPort: '8090',
  },
]));

// DockerContainer
//   .get('teedev.devan.testGroup.apache')
//   .then((containers) => {
//     console.log(containers);
//   });
