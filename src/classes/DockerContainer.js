import {
  DockerPort,
  DockerVolume,
} from './';

export default class DockerContainer {
  constructor(
    name,
    {
      id,
      image,
      ports = [],
      volumes = [],
      dockerFile,
    },
    docker,
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.ports = DockerPort.map(ports);
    this.volumes = DockerVolume.map(volumes);
    this.dockerFile = dockerFile;

    this._docker = docker;
    this._container = null;
  }

  get container() {
    if (!this._container) {
      this._container = this._docker.getContainer(this.name);
    }

    return this._container;
  }

  build() {
  }

  async create() {
    const containerExists = await this._docker.getContainer();

    if (!this._container) {
      await new Promise((resolve) => {
        this._docker.createContainer(this.dockerFormat)
          .then((container) => {
            console.log('Created new container');

            this._container = container;
  
            resolve(this);
          })
          .catch(() => resolve());
      });
    }

    return this;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.container.start()
        .then(() => {
          console.log('Started container');

          resolve(this);
        }).catch(() => {
          console.log('Failed to start creating new container');
  
          this.create()
            .then(container => {
              console.log('Starting container');

              this.container.start()
                .then(() => resolve(this))
                .catch(() => reject());
            });
        });
    });
  }

  stop() {
    this.container.stop();
  }

  restart() {
    this.container.restart();
  }

  inspect() {
    return new Promise((resolve) => {
      this.container.inspect()
        .then((container) => {
          console.log('Inspect found container');

          // this._container = container;

          resolve(this);
        })
        .catch(() => resolve());
    });
  }

  get dockerFormat() {
    return {
      name: this.name,
      Image: this.image,
      Ports: this.ports.map(port => port.dockerFormat),
      HostConfig: {
        Mounts: this.volumes.map(volume => ({
          Source: volume.src,
          Target: volume.dest,
          Type: volume.type,
        })),
      },
      // Networks: this.networks,
    };
  }

  // set dockerFormat() {
    
  // }
}
