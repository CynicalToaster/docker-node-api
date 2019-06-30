import {
  DockerObject,
  DockerVolume,
  DockerPort,
} from '.';

export default class DockerContainer extends DockerObject {
  constructor({
    id,
    name,
    image,
    command,
    ports   = [],
    volumes = [],
  } = {}) {
    super();

    this.id = id;
    this.name = name;
    this.image = image;
    this.command = command;

    this.ports = DockerPort.map(ports);
    this.volumes = DockerVolume.map(volumes);

    this.status = null;
  }

  static async get(name) {
    const containers = await this.getAll();

    return containers.find(c => c.name === name);
  }

  static async getAll() {
    const dockerContainers = await $dockerApi.listContainers({ all: true });

    return this.map(dockerContainers, true);
  }

  async get() {
    const container = await DockerContainer.get(this.name);

    Object.assign(this, container);
    return this;
  }

  fromDockerSyntax({
    Id      = this.id,
    Image   = this.image,
    Command = this.command,

    Names  = null,
    Ports  = null,
    Mounts = null,
  }) {
    this.id      = Id;
    this.image   = Image;
    this.command = Command;

    this.name    = Names  ? Names[0].replace(/^\//, '')    : this.name;
    this.ports   = Ports  ? DockerPort.map(Ports, true)    : this.ports;
    this.volumes = Mounts ? DockerVolume.map(Mounts, true) : this.volumes;

    return this;
  }

  toDockerSyntax() {
    return {
      Tty: true,

      Id     : this.id,
      name   : this.name,
      Image  : this.image,
      Command: this.command,

      Names : [`/${this.name}`],
      Ports : this.ports.map(port => port.toDockerSyntax()),
      Mounts: this.volumes.map(volume => volume.toDockerSyntax()),

      HostConfig: {
        Binds: this.volumes
          .filter(v => v.type === 'bind')
          .map(v => `${v.src}:${v.dest}`),
      },
    };
  }

  create() {
    return new Promise((resolve, reject) => {
      $dockerApi
        .createContainer(this.toDockerSyntax())
        .then(({ id }) => {
          this.id = id;

          resolve(this);
        })
        .catch(async (err) => {
          switch (err.statusCode) {
            case 409:
              await this.get();
              resolve(this);
              break;

            default:
              reject(err);
              break;
          }
        });
    });
  }

  start() {
    const dockerContainer = $dockerApi.getContainer(this);

    return new Promise((resolve, reject) => {
      dockerContainer.start()
        .then(async () => {
          await this.pullStatus();
          resolve(this);
        })
        .catch(async (err) => {
          switch (err.statusCode) {
            case 304:
              await this.pullStatus();
              resolve(this);
              break;

            default:
              reject(err);
              break;
          }
        });
    });
  }

  stop() {
    const dockerContainer = $dockerApi.getContainer(this);

    return new Promise((resolve, reject) => {
      dockerContainer.stop()
        .then(async () => {
          await this.pullStatus();
          resolve(this);
        })
        .catch(async (err) => {
          switch (err.statusCode) {
            case 304:
              await this.pullStatus();
              resolve(this);
              break;

            default:
              reject(err);
              break;
          }
        });
    });
  }

  restart() {
    const dockerContainer = $dockerApi.getContainer(this);

    return new Promise((resolve, reject) => {
      dockerContainer.restart()
        .then(async () => {
          await this.pullStatus();
          resolve(this);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  pullStatus() {
    const dockerContainer = $dockerApi.getContainer(this);

    return new Promise((resolve) => {
      dockerContainer.inspect()
        .then(({ State }) => {
          this.status = State.Status;

          resolve(this);
        })
        .catch(() => {
          resolve(this);
        });
    });
  }
}
