import Docker from 'dockerode';

import {
  DockerContainer,
} from './'; 

export default class DockerApi {
  constructor(user = null, scope = null, options = null) {
    this.user = user;
    this.scope = scope;

    this._docker = new Docker(options);
  }

  getContainerName(name) {
    return `${this.scope}.${this.user}.${name}`;
  }

  createContainer(name, options) {
    return new DockerContainer(
      this.getContainerName(name),
      options,
      this._docker,
    ).create();
  }
}
