import Docker from 'dockerode';

import {
  DockerPort,
  DockerContainer,
} from './'; 

export default class DockerApi {
  constructor(user = null, scope = null, options = null) {
    this.user = user;
    this.scope = scope;

    this._docker = new Docker(options);
  }

  getContainerName(group, service) {
    return `${this.scope}.${this.user}.${group}.${service}`;
  }

  createContainer(service, options) {
    return new DockerContainer(
      this.getContainerName('testGroup', service),
      options,
      this._docker,
    ).create();
  }

  async listContainers() {
    const containers = [];

    await this._docker.listContainers({ all: true })
      .then((list) => {
        list.forEach((dockerContainer) => {
          console.log(dockerContainer);

          containers.push(
            new DockerContainer(
              dockerContainer.Names[0],
              {
                id: dockerContainer.Id,
                image: dockerContainer.Image,
                ports: dockerContainer.Ports.map(port => new DockerPort().dockerFormat(port))
              },
              this._docker,
            ),
          );
        })
      });
  
    return containers;
  }

  async getContainer(name) {
    const containers = await this.listContainers();

    return containers.find((container) => {
      container.name = this.getContainerName('testGroup', name);
    });
  }
}
