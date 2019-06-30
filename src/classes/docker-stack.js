export default class DockerStack {
  constructor({
    containers = [],
  } = {}) {
    this.containers = containers;
  }

  async create() {
    const promises = [];

    this.containers.forEach((container) => {
      promises.push(container.create());
    });

    await Promise.all(promises);

    return this;
  }

  async start() {
    const promises = [];

    this.containers.forEach((container) => {
      promises.push(container.start());
    });

    await Promise.all(promises);

    return this;
  }

  async stop() {
    const promises = [];

    this.containers.forEach((container) => {
      promises.push(container.stop());
    });

    await Promise.all(promises);

    return this;
  }
}
