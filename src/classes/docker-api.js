
import Docker from 'dockerode';

// import {
//   DockerPort,
//   DockerContainer,
// } from '.';

export default class DockerApi {
  constructor(
    scope   = null,
    user    = null,
    options = null,
  ) {
    this.user  = user;
    this.scope = scope;

    this._docker = new Docker(options);
  }

  listContainers(...params) {
    return this._docker.listContainers(...params);
  }

  createContainer(...params) {
    return this._docker.createContainer(...params);
  }

  getContainer(container) {
    return this._docker.getContainer(container.id);
  }
}

global.$dockerApi = new DockerApi();
