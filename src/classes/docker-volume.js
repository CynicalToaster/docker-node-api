import { DockerObject } from '.';

export default class DockerVolume extends DockerObject {
  constructor({
    mode = 'rw',
    type = 'bind',
    src = null,
    dest = null,
    propagation = 'rprivate',
  } = {}) {
    super();

    this.mode = mode;
    this.type = type;
    this.src = src;
    this.dest = dest;
    this.propagation = propagation;
  }

  fromDockerSyntax({
    Mode = this.mode,
    Type = this.type,
    Source = this.src,
    Destination = this.dest,
    Propagation = this.propagation,
  }) {
    this.mode = Mode;
    this.type = Type;
    this.src = Source;
    this.dest = Destination;
    this.propagation = Propagation;

    return this;
  }

  toDockerSyntax() {
    return {
      Mode: this.mode,
      Type: this.type,
      Source: this.src,
      Destination: this.dest,
      Propagation: this.propagation,
    };
  }
}
