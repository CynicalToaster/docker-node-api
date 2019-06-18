import {
  DockerObject,
  DockerPort,
} from './';

export default class DockerContainer extends DockerObject {
  constructor({
    id,
    name,
    ports,
    image,
  } = {}) {
    super();

    this.id    = id,
    this.name  = name;
    this.ports = ports;
    this.image = image;
  }

  static async get(name) {
    const containers = await DockerContainer.getAll();

    return containers.find(container => container.name = name);
  }

  static async getAll() {
    const dockerContainers = await $dockerApi.listContainers({ all: true });

    return DockerContainer.map(dockerContainers, true);
  }

  fromDockerSyntax({
    Id    = this.id,
    Image = this.image,

    Names = null,
    Ports = null,
  }) {
    this.id    = Id;
    this.image = Image;

    this.name  = Names ? Names[0].replace(/^\//, '') : this.name;
    this.ports = Ports ? DockerPort.map(Ports, true) : this.ports;

    return this;
  }

  toDockerSyntax() {
    return {
      Id   : this.id,
      Image: this.image,

      Names: [`/${this.name}`],
      Ports: this.ports.map(port => port.toDockerSyntax()),
    };
  }
};
