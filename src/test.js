import {
  DockerApi,
  DockerPort,
  DockerContainer,
} from './newClasses';

const dockerApi = new DockerApi();

// DockerContainer
//   .get('teedev.devan.testGroup.apache')
//   .then((containers) => {
//     console.log(containers);
//   });

DockerContainer
  .getAll()
  .then((containers) => {
    console.log(containers);
  });
