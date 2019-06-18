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

var _dockerode = _interopRequireDefault(require("dockerode"));

var _ = require("./");

var DockerApi =
/*#__PURE__*/
function () {
  function DockerApi() {
    var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    (0, _classCallCheck2["default"])(this, DockerApi);
    this.user = user;
    this.scope = scope;
    this._docker = new _dockerode["default"](options);
  }

  (0, _createClass2["default"])(DockerApi, [{
    key: "getContainerName",
    value: function getContainerName(group, service) {
      return "".concat(this.scope, ".").concat(this.user, ".").concat(group, ".").concat(service);
    }
  }, {
    key: "createContainer",
    value: function createContainer(service, options) {
      return new _.DockerContainer(this.getContainerName('testGroup', service), options, this._docker).create();
    }
  }, {
    key: "listContainers",
    value: function () {
      var _listContainers = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _this = this;

        var containers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                containers = [];
                _context.next = 3;
                return this._docker.listContainers({
                  all: true
                }).then(function (list) {
                  list.forEach(function (dockerContainer) {
                    console.log(dockerContainer);
                    containers.push(new _.DockerContainer(dockerContainer.Names[0], {
                      id: dockerContainer.Id,
                      image: dockerContainer.Image,
                      ports: dockerContainer.Ports.map(function (port) {
                        return new _.DockerPort().dockerFormat(port);
                      })
                    }, _this._docker));
                  });
                });

              case 3:
                return _context.abrupt("return", containers);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function listContainers() {
        return _listContainers.apply(this, arguments);
      }

      return listContainers;
    }()
  }, {
    key: "getContainer",
    value: function () {
      var _getContainer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(name) {
        var _this2 = this;

        var containers;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.listContainers();

              case 2:
                containers = _context2.sent;
                return _context2.abrupt("return", containers.find(function (container) {
                  container.name = _this2.getContainerName('testGroup', name);
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getContainer(_x) {
        return _getContainer.apply(this, arguments);
      }

      return getContainer;
    }()
  }]);
  return DockerApi;
}();

exports["default"] = DockerApi;
//# sourceMappingURL=DockerApi.js.map