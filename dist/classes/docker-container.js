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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _ = require(".");

var DockerContainer =
/*#__PURE__*/
function (_DockerObject) {
  (0, _inherits2["default"])(DockerContainer, _DockerObject);

  function DockerContainer() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id,
        name = _ref.name,
        image = _ref.image,
        scope = _ref.scope,
        command = _ref.command,
        _ref$ports = _ref.ports,
        ports = _ref$ports === void 0 ? [] : _ref$ports,
        _ref$volumes = _ref.volumes,
        volumes = _ref$volumes === void 0 ? [] : _ref$volumes;

    (0, _classCallCheck2["default"])(this, DockerContainer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DockerContainer).call(this));
    _this.id = id;
    _this.name = name;
    _this.scope = scope;
    _this.image = image;
    _this.command = command;
    _this.ports = _.DockerPort.map(ports);
    _this.volumes = _.DockerVolume.map(volumes);
    _this.status = null;
    return _this;
  }

  (0, _createClass2["default"])(DockerContainer, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var container;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return DockerContainer.get(this.fullName);

              case 2:
                container = _context.sent;
                Object.assign(this, container);
                return _context.abrupt("return", this);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get() {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "fromDockerSyntax",
    value: function fromDockerSyntax(_ref2) {
      var _ref2$Id = _ref2.Id,
          Id = _ref2$Id === void 0 ? this.id : _ref2$Id,
          _ref2$Image = _ref2.Image,
          Image = _ref2$Image === void 0 ? this.image : _ref2$Image,
          _ref2$Command = _ref2.Command,
          Command = _ref2$Command === void 0 ? this.command : _ref2$Command,
          _ref2$Names = _ref2.Names,
          Names = _ref2$Names === void 0 ? null : _ref2$Names,
          _ref2$Ports = _ref2.Ports,
          Ports = _ref2$Ports === void 0 ? null : _ref2$Ports,
          _ref2$Mounts = _ref2.Mounts,
          Mounts = _ref2$Mounts === void 0 ? null : _ref2$Mounts;
      this.id = Id;
      this.image = Image;
      this.command = Command;
      this.name = Names ? Names[0].replace(/^.+\./, '') : this.name;
      this.scope = Names ? Names[0].replace(/^.+\.([a-zA-Z]+)\..+/, '$1') : this.scope;
      this.ports = Ports ? _.DockerPort.map(Ports, true) : this.ports;
      this.volumes = Mounts ? _.DockerVolume.map(Mounts, true) : this.volumes;
      return this;
    }
  }, {
    key: "toDockerSyntax",
    value: function toDockerSyntax() {
      return {
        Tty: true,
        Id: this.id,
        name: this.fullName,
        Image: this.image,
        Command: this.command,
        Names: ["/".concat(this.fullName)],
        Ports: this.ports.map(function (port) {
          return port.toDockerSyntax();
        }),
        Mounts: this.volumes.map(function (volume) {
          return volume.toDockerSyntax();
        }),
        HostConfig: {
          Binds: this.volumes.filter(function (v) {
            return v.type === 'bind';
          }).map(function (v) {
            return "".concat(v.src, ":").concat(v.dest);
          })
        }
      };
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        $dockerApi.createContainer(_this2.toDockerSyntax()).then(function (_ref3) {
          var id = _ref3.id;
          _this2.id = id;
          resolve(_this2);
        })["catch"](
        /*#__PURE__*/
        function () {
          var _ref4 = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee2(err) {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.t0 = err.statusCode;
                    _context2.next = _context2.t0 === 409 ? 3 : 7;
                    break;

                  case 3:
                    _context2.next = 5;
                    return _this2.get();

                  case 5:
                    resolve(_this2);
                    return _context2.abrupt("break", 9);

                  case 7:
                    reject(err);
                    return _context2.abrupt("break", 9);

                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x) {
            return _ref4.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5() {
        var _this3 = this;

        var canAutoCreate,
            dockerContainer,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                canAutoCreate = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : true;

                if (this.id) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 4;
                return this.get();

              case 4:
                dockerContainer = $dockerApi.getContainer(this);
                return _context5.abrupt("return", new Promise(function (resolve, reject) {
                  dockerContainer.start().then(
                  /*#__PURE__*/
                  (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee3() {
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this3.pullStatus();

                          case 2:
                            resolve(_this3);

                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  })))["catch"](
                  /*#__PURE__*/
                  function () {
                    var _ref6 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee4(err) {
                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.t0 = err.statusCode;
                              _context4.next = _context4.t0 === 304 ? 3 : _context4.t0 === 404 ? 7 : 14;
                              break;

                            case 3:
                              _context4.next = 5;
                              return _this3.pullStatus();

                            case 5:
                              resolve(_this3);
                              return _context4.abrupt("break", 16);

                            case 7:
                              if (!canAutoCreate) {
                                _context4.next = 12;
                                break;
                              }

                              _context4.next = 10;
                              return _this3.create();

                            case 10:
                              _context4.next = 12;
                              return _this3.start(false);

                            case 12:
                              resolve(_this3);
                              return _context4.abrupt("break", 16);

                            case 14:
                              reject(err);
                              return _context4.abrupt("break", 16);

                            case 16:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }));

                    return function (_x2) {
                      return _ref6.apply(this, arguments);
                    };
                  }());
                }));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        var _this4 = this;

        var dockerContainer;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this.id) {
                  _context8.next = 3;
                  break;
                }

                _context8.next = 3;
                return this.get();

              case 3:
                dockerContainer = $dockerApi.getContainer(this);
                return _context8.abrupt("return", new Promise(function (resolve, reject) {
                  dockerContainer.stop().then(
                  /*#__PURE__*/
                  (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee6() {
                    return _regenerator["default"].wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            _context6.next = 2;
                            return _this4.pullStatus();

                          case 2:
                            resolve(_this4);

                          case 3:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  })))["catch"](
                  /*#__PURE__*/
                  function () {
                    var _ref8 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee7(err) {
                      return _regenerator["default"].wrap(function _callee7$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              _context7.t0 = err.statusCode;
                              _context7.next = _context7.t0 === 304 ? 3 : _context7.t0 === 404 ? 7 : 9;
                              break;

                            case 3:
                              _context7.next = 5;
                              return _this4.pullStatus();

                            case 5:
                              resolve(_this4);
                              return _context7.abrupt("break", 11);

                            case 7:
                              resolve(_this4);
                              return _context7.abrupt("break", 11);

                            case 9:
                              reject(err);
                              return _context7.abrupt("break", 11);

                            case 11:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      }, _callee7);
                    }));

                    return function (_x3) {
                      return _ref8.apply(this, arguments);
                    };
                  }());
                }));

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: "restart",
    value: function () {
      var _restart = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10() {
        var _this5 = this;

        var dockerContainer;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.id) {
                  _context10.next = 3;
                  break;
                }

                _context10.next = 3;
                return this.get();

              case 3:
                dockerContainer = $dockerApi.getContainer(this);
                return _context10.abrupt("return", new Promise(function (resolve, reject) {
                  dockerContainer.restart().then(
                  /*#__PURE__*/
                  (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee9() {
                    return _regenerator["default"].wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            _context9.next = 2;
                            return _this5.pullStatus();

                          case 2:
                            resolve(_this5);

                          case 3:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  })))["catch"](function (err) {
                    reject(err);
                  });
                }));

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function restart() {
        return _restart.apply(this, arguments);
      }

      return restart;
    }()
  }, {
    key: "pullStatus",
    value: function pullStatus() {
      var _this6 = this;

      var dockerContainer = $dockerApi.getContainer(this);
      return new Promise(function (resolve) {
        dockerContainer.inspect().then(function (_ref10) {
          var State = _ref10.State;
          _this6.status = State.Status;
          resolve(_this6);
        })["catch"](function () {
          resolve(_this6);
        });
      });
    }
  }, {
    key: "fullName",
    get: function get() {
      var name = '';
      name += "".concat($dockerApi.scope, ".") || '';
      name += "".concat($dockerApi.user, ".") || '';
      name += "".concat(this.scope, ".") || '';
      name += this.name;
      return name;
    }
  }], [{
    key: "get",
    value: function () {
      var _get2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(name) {
        var containers;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.getAll();

              case 2:
                containers = _context11.sent;
                return _context11.abrupt("return", containers.find(function (c) {
                  return c.fullName === name;
                }));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function get(_x4) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12() {
        var dockerContainers;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return $dockerApi.listContainers({
                  all: true
                });

              case 2:
                dockerContainers = _context12.sent;
                return _context12.abrupt("return", this.map(dockerContainers, true));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }]);
  return DockerContainer;
}(_.DockerObject);

exports["default"] = DockerContainer;
//# sourceMappingURL=docker-container.js.map