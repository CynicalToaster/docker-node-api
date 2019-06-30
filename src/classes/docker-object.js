export default class DockerObject {
  static map(object, dockerSyntax = false) {
    if (Array.isArray(object)) {
      return object.map(port => this.map(port, dockerSyntax));
    }

    if (object instanceof DockerObject) {
      return object;
    }

    if (dockerSyntax) {
      return new this.prototype.constructor().fromDockerSyntax(object);
    }

    return new this.prototype.constructor(object);
  }
}
