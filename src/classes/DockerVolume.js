export default class DockerVolume {
  constructor(type, src, dest) {
    this.type = type;
    this.src = src;
    this.dest = dest;
  }

  static map(object) {
    if (Array.isArray(object)) {
      return object.map(obj => DockerVolume.map(obj));
    }

    if (object instanceof DockerVolume) {
      return object;
    }

    return new DockerVolume(
      object.type,
      object.src,
      object.dest,
    );
  }
}
