"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require("./");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DockerContainer =
/*#__PURE__*/
function () {
  function DockerContainer(name, _ref, docker) {
    var image = _ref.image,
        _ref$ports = _ref.ports,
        ports = _ref$ports === void 0 ? [] : _ref$ports,
        _ref$volumes = _ref.volumes,
        volumes = _ref$volumes === void 0 ? [] : _ref$volumes,
        dockerFile = _ref.dockerFile;

    _classCallCheck(this, DockerContainer);

    this.name = name;
    this.image = image;
    this.ports = ports;
    this.volumes = _.DockerVolume.map(volumes);
    this.dockerFile = dockerFile;
    this._docker = docker;
    this._container = null;
  }

  _createClass(DockerContainer, [{
    key: "build",
    value: function build() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.container.inspect().then(function (container) {
          _this._container = container;
          resolve(_this);
        })["catch"](function (err) {
          _this._docker.createContainer({
            name: _this.name,
            Image: _this.image,
            HostConfig: {
              Mounts: _this.volumes.map(function (volume) {
                return {
                  Source: volume.src,
                  Target: volume.dest,
                  Type: volume.type
                };
              }),
              PortBindings: _this.ports.reduce(function (obj, port) {
                var splitPort = port.split(':');
                obj["".concat(splitPort[1], "/tcp")] = [{
                  HostPort: splitPort[0]
                }];
                return obj;
              }, {})
            } // Networks: this.networks,

          }).then(function (container) {
            _this._container = container;
            resolve(_this);
          })["catch"](function (err) {
            return reject(err);
          });
        });
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      this.container.start().then(function () {
        console.log('Container Started');
      })["catch"](function () {
        console.log('Failed to start container: Creating new');

        _this2.create(userId).then(function (c) {
          return c.start();
        });
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.container.stop();
    }
  }, {
    key: "restart",
    value: function restart() {
      this.container.restart();
    }
  }, {
    key: "inspect",
    value: function inspect() {
      con;
    }
  }, {
    key: "container",
    get: function get() {
      if (!this._container) {
        this._container = this._docker.getContainer(this.name);
      }

      return this._container;
    }
  }]);

  return DockerContainer;
}();

exports["default"] = DockerContainer;