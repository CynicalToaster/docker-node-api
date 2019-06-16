export default class DockerPort {
    constructor({
        ip = '0.0.0.0',
        type = 'tcp',
        publicPort,
        privatePort,
    }) {
      this.ip      = ip;
      this.type    = type;
      this.publicPort  = publicPort;
      this.privatePort = privatePort;
    }

    static map(object) {
      if (Array.isArray(object)) {
        return object.map(obj => DockerPort.map(obj));
      }
  
      if (object instanceof DockerPort) {
        return object;
      }
  
      return new DockerPort(object);
    }
  
    get dockerFormat() {
      return {
        IP:          this.ip,
        Type:        this.type, 
        PublicPort:  this.publicPort,
        PrivatePort: this.privatePort,
      };
    }

    set dockerFormat({
      IP          = this.ip,
      Type        = this.type, 
      PublicPort  = this.publicPort,
      PrivatePort = this.privatePort,
    }) {
      this.ip      = IP;
      this.type    = Type;
      this.publicPort  = PublicPort;
      this.privatePort = PrivatePort;
    }
  }
  