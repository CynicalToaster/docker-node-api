import {
  DockerVolume,
} from './';

export default class DockerContainer {
  constructor(
    name,
    {
      image,
      ports = [],
      volumes = [],
      dockerFile,
    },
    docker,
  ) {
    this.name = name;
    this.image = image;
    this.ports = ports;
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

  create() {
    return new Promise((resolve, reject) => {
      this.container.inspect()
        .then((container) => {
          this._container = container;

          resolve(this);
        })
        .catch((err) => {
          this._docker.createContainer({
            name: this.name,
            Image: this.image,
            HostConfig: {
              Mounts: this.volumes.map(volume => ({
                Source: volume.src,
                Target: volume.dest,
                Type: volume.type,
              })),
              PortBindings: this.ports.reduce((obj, port) => {
                const splitPort = port.split(':');
        
                obj[`${splitPort[1]}/tcp`] = [{
                  HostPort: splitPort[0],
                }];
    
                return obj;
              }, {}),
            },
            // Networks: this.networks,
          })
            .then((container) => {
              this._container = container;
    
              resolve(this);
            })
            .catch(err => reject(err));
        });
    });
  }

  start() {
    this.container.start()
      .then(() => {
        console.log('Container Started');
      }).catch(() => {
        console.log('Failed to start container: Creating new');

        this.create(userId)
          .then(c => c.start());
      });
  }

  stop() {
    this.container.stop();
  }

  restart() {
    this.container.restart();
  }

  inspect() {
    con
  }
}
