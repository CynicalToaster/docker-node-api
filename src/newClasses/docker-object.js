export default class DockerObject {
  static map(object, dockerSyntax = false) {
    if (Array.isArray(object)) {
      return object.map(port => DockerObject.map(port));
    }

    console.log(this, static, object);

    if (object instanceof DockerObject) {
      return object;
    }

    if (dockerSyntax) {
      return new DockerObject().fromDockerSyntax(object);
    }

    return new DockerObject(object);
  }
};
