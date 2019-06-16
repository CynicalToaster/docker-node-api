import { DockerObject } from './';

export default class DockerPort extends DockerObject {
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
