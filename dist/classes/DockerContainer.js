"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ = require("./");

var DockerContainer =
/*#__PURE__*/
function () {
  function DockerContainer(name, _ref, docker) {
    var id = _ref.id,
        image = _ref.image,
        _ref$ports = _ref.ports,
        ports = _ref$ports === void 0 ? [] : _ref$ports,
        _ref$volumes = _ref.volumes,
        volumes = _ref$volumes === void 0 ? [] : _ref$volumes,
        dockerFile = _ref.dockerFile;
    (0, _classCallCheck2["default"])(this, DockerContainer);
    this.id = id;
    this.name = name;
    this.image = image;
    this.ports = _.DockerPort.map(ports);
    this.volumes = _.DockerVolume.map(volumes);
    this.dockerFile = dockerFile;
    this._docker = docker;
    this._container = null;
  }

  (0, _createClass2["default"])(DockerContainer, [{
    key: "build",
    value: function build() {}
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _this = this;

        var containerExists;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._docker.getContainer();

              case 2:
                containerExists = _context.sent;

                if (this._container) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return new Promise(function (resolve) {
                  _this._docker.createContainer(_this.dockerFormat).then(function (container) {
                    console.log('Created new container');
                    _this._container = container;
                    resolve(_this);
                  })["catch"](function () {
                    return resolve();
                  });
                });

              case 6:
                return _context.abrupt("return", this);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.container.start().then(function () {
          console.log('Started container');
          resolve(_this2);
        })["catch"](function () {
          console.log('Failed to start creating new container');

          _this2.create().then(function (container) {
            console.log('Starting container');

            _this2.container.start().then(function () {
              return resolve(_this2);
            })["catch"](function () {
              return reject();
            });
          });
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
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.container.inspect().then(function (container) {
          console.log('Inspect found container'); // this._container = container;

          resolve(_this3);
        })["catch"](function () {
          return resolve();
        });
      });
    }
  }, {
    key: "container",
    get: function get() {
      if (!this._container) {
        this._container = this._docker.getContainer(this.name);
      }

      return this._container;
    }
  }, {
    key: "dockerFormat",
    get: function get() {
      return {
        name: this.name,
        Image: this.image,
        Ports: this.ports.map(function (port) {
          return port.dockerFormat;
        }),
        HostConfig: {
          Mounts: this.volumes.map(function (volume) {
            return {
              Source: volume.src,
              Target: volume.dest,
              Type: volume.type
            };
          })
        } // Networks: this.networks,

      };
    } // set dockerFormat() {
    // }

  }]);
  return DockerContainer;
}();

exports["default"] = DockerContainer;