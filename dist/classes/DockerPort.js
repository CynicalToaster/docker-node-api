"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var DockerPort =
/*#__PURE__*/
function () {
  function DockerPort(_ref) {
    var _ref$ip = _ref.ip,
        ip = _ref$ip === void 0 ? '0.0.0.0' : _ref$ip,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'tcp' : _ref$type,
        publicPort = _ref.publicPort,
        privatePort = _ref.privatePort;
    (0, _classCallCheck2["default"])(this, DockerPort);
    this.ip = ip;
    this.type = type;
    this.publicPort = publicPort;
    this.privatePort = privatePort;
  }

  (0, _createClass2["default"])(DockerPort, [{
    key: "dockerFormat",
    get: function get() {
      return {
        IP: this.ip,
        Type: this.type,
        PublicPort: this.publicPort,
        PrivatePort: this.privatePort
      };
    },
    set: function set(_ref2) {
      var _ref2$IP = _ref2.IP,
          IP = _ref2$IP === void 0 ? this.ip : _ref2$IP,
          _ref2$Type = _ref2.Type,
          Type = _ref2$Type === void 0 ? this.type : _ref2$Type,
          _ref2$PublicPort = _ref2.PublicPort,
          PublicPort = _ref2$PublicPort === void 0 ? this.publicPort : _ref2$PublicPort,
          _ref2$PrivatePort = _ref2.PrivatePort,
          PrivatePort = _ref2$PrivatePort === void 0 ? this.privatePort : _ref2$PrivatePort;
      this.ip = IP;
      this.type = Type;
      this.publicPort = PublicPort;
      this.privatePort = PrivatePort;
    }
  }], [{
    key: "map",
    value: function map(object) {
      if (Array.isArray(object)) {
        return object.map(function (obj) {
          return DockerPort.map(obj);
        });
      }

      if (object instanceof DockerPort) {
        return object;
      }

      return new DockerPort(object);
    }
  }]);
  return DockerPort;
}();

exports["default"] = DockerPort;