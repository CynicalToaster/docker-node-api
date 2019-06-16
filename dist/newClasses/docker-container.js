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
  function DockerContainer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id,
        name = _ref.name,
        ports = _ref.ports,
        image = _ref.image;

    (0, _classCallCheck2["default"])(this, DockerContainer);
    this.id = id, this.name = name;
    this.ports = ports;
    this.image = image;
  }

  (0, _createClass2["default"])(DockerContainer, [{
    key: "fromDockerSyntax",
    value: function fromDockerSyntax(_ref2) {
      var _ref2$Id = _ref2.Id,
          Id = _ref2$Id === void 0 ? this.id : _ref2$Id,
          _ref2$Image = _ref2.Image,
          Image = _ref2$Image === void 0 ? this.image : _ref2$Image,
          _ref2$Names = _ref2.Names,
          Names = _ref2$Names === void 0 ? null : _ref2$Names,
          _ref2$Ports = _ref2.Ports,
          Ports = _ref2$Ports === void 0 ? null : _ref2$Ports;
      this.id = Id;
      this.image = Image;
      this.name = Names ? Names[0].replace(/^\//, '') : this.name;
      this.ports = Ports ? Ports.map(function (port) {
        return new _.DockerPort().fromDockerSyntax(port);
      }) : this.ports;
      return this;
    }
  }, {
    key: "toDockerSyntax",
    value: function toDockerSyntax() {
      return {
        Id: this.id,
        Image: this.image,
        Names: ["/".concat(this.name)],
        Ports: this.ports.map(function (port) {
          return port.toDockerSyntax();
        })
      };
    }
  }], [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(name) {
        var containers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return DockerContainer.getAll();

              case 2:
                containers = _context.sent;
                return _context.abrupt("return", containers.find(function (container) {
                  return container.name = name;
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var dockerContainers;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return $dockerApi.listContainers({
                  all: true
                });

              case 2:
                dockerContainers = _context2.sent;
                return _context2.abrupt("return", dockerContainers.map(function (dockerContainer) {
                  return new DockerContainer().fromDockerSyntax(dockerContainer);
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }]);
  return DockerContainer;
}();

exports["default"] = DockerContainer;
;