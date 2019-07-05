export default class DockerStack {
  constructor({
    scope      = null,
    containers = [],
  } = {}) {
    this.scope      = scope;
    this.containers = containers;

    this._applyScope();
  }

  _applyScope() {
    this.containers.forEach((container) => {
      container.scope = this.scope;
    });
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

  async restart() {
    const promises = [];

    this.containers.forEach((container) => {
      promises.push(container.restart());
    });

    await Promise.all(promises);

    return this;
  }
}
