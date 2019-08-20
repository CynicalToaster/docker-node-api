export default class DockerImage {
  constructor({
    name,
    context = __dirname,
    dockerFile = 'Dockerfile',
  } = {}) {
    this.name       = name;
    this.context    = context;
    this.dockerFile = dockerFile;
  }

  async build() {
    const stream = await $dockerApi.buildImage(
      {
        context: this.context,
        src: ['.'],
      },
      {
        dockerfile: this.dockerFile,
        t: this.name,
      },
    );

    await new Promise((resolve, reject) => {
      $dockerApi._docker.modem.followProgress(
        stream,
        (err, res) => {
          console.log(res, err);

          return err ? reject(err) : resolve(res);
        },
      );
    });

    console.log('Finished build');
  }
}
