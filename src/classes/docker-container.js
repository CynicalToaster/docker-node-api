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
    scope,
    command,
    ports   = [],
    volumes = [],
  } = {}) {
    super();

    this.id = id;
    this.name = name;
    this.scope = scope;
    this.image = image;
    this.command = command;

    this.ports = DockerPort.map(ports);
    this.volumes = DockerVolume.map(volumes);

    this.status = null;
  }

  static async get(name) {
    const containers = await this.getAll();

    return containers.find(c => c.fullName === name);
  }

  static async getAll() {
    const dockerContainers = await $dockerApi.listContainers({ all: true });

    return this.map(dockerContainers, true);
  }

  get fullName() {
    let name = '';

    name += `${$dockerApi.scope}.` || '';
    name += `${$dockerApi.user}.` || '';
    name += `${this.scope}.` || '';
    name += this.name;

    return name;
  }

  async get() {
    const container = await DockerContainer.get(this.fullName);

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

    this.name    = Names  ? Names[0].replace(/^.+\./, '')  : this.name;
    this.scope   = Names  ? Names[0].replace(/^.+\.([a-zA-Z]+)\..+/, '$1')  : this.scope;
    this.ports   = Ports  ? DockerPort.map(Ports, true)    : this.ports;
    this.volumes = Mounts ? DockerVolume.map(Mounts, true) : this.volumes;

    return this;
  }

  toDockerSyntax() {
    return {
      Tty: true,

      Id     : this.id,
      name   : this.fullName,
      Image  : this.image,
      Command: this.command,

      Names : [`/${this.fullName}`],
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

  async start(canAutoCreate = true) {
    if (!this.id) {
      await this.get();
    }

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

            case 404:
              if (canAutoCreate) {
                await this.create();
                await this.start(false);
              }

              resolve(this);
              break;

            default:
              reject(err);
              break;
          }
        });
    });
  }

  async stop() {
    if (!this.id) {
      await this.get();
    }

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

            case 404:
              resolve(this);
              break;

            default:
              reject(err);
              break;
          }
        });
    });
  }

  async restart() {
    if (!this.id) {
      await this.get();
    }

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
