export default class DockerVolume {
  constructor({
    ip          = '0.0.0.0',
    type        = 'tcp',
    publicPort  = null,
    privatePort = null,
    } = {}) {
    this.ip          = ip;
    this.type        = type;
    this.publicPort  = publicPort;
    this.privatePort = privatePort;
  }

  static map(object, dockerSyntax = false) {
    if (Array.isArray(object)) {
      return object.map(port => DockerPort.map(port));
    }

    if (object instanceof DockerPort) {
      return object;
    }

    if (dockerSyntax) {
      return new DockerPort().fromDockerSyntax(object);
    }

    return new DockerPort(object);
  }

  fromDockerSyntax({
    IP          = this.ip,
    Type        = this.type,
    PublicPort  = this.publicPort,
    PrivatePort = this.privatePort,
  }) {
    this.ip          = IP;
    this.type        = Type;
    this.publicPort  = PublicPort;
    this.privatePort = PrivatePort;

    return this;
  }

  toDockerSyntax() {
    return {
      IP         : this.ip,
      Type       : this.type,
      PublicPort : this.publicPort,
      PrivatePort: this.privatePort,
    };
  }
};
