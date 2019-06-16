"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _ = require("./");

var DockerPort =
/*#__PURE__*/
function (_DockerObject) {
  (0, _inherits2["default"])(DockerPort, _DockerObject);

  function DockerPort() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ip = _ref.ip,
        ip = _ref$ip === void 0 ? '0.0.0.0' : _ref$ip,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'tcp' : _ref$type,
        _ref$publicPort = _ref.publicPort,
        publicPort = _ref$publicPort === void 0 ? null : _ref$publicPort,
        _ref$privatePort = _ref.privatePort,
        privatePort = _ref$privatePort === void 0 ? null : _ref$privatePort;

    (0, _classCallCheck2["default"])(this, DockerPort);
    _this.ip = ip;
    _this.type = type;
    _this.publicPort = publicPort;
    _this.privatePort = privatePort;
    return (0, _possibleConstructorReturn2["default"])(_this);
  }

  (0, _createClass2["default"])(DockerPort, [{
    key: "fromDockerSyntax",
    value: function fromDockerSyntax(_ref2) {
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
      return this;
    }
  }, {
    key: "toDockerSyntax",
    value: function toDockerSyntax() {
      return {
        IP: this.ip,
        Type: this.type,
        PublicPort: this.publicPort,
        PrivatePort: this.privatePort
      };
    }
  }]);
  return DockerPort;
}(_.DockerObject);

exports["default"] = DockerPort;
;