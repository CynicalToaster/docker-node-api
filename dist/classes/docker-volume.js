"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _ = require(".");

var DockerVolume =
/*#__PURE__*/
function (_DockerObject) {
  (0, _inherits2["default"])(DockerVolume, _DockerObject);

  function DockerVolume() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? 'rw' : _ref$mode,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'bind' : _ref$type,
        _ref$src = _ref.src,
        src = _ref$src === void 0 ? null : _ref$src,
        _ref$dest = _ref.dest,
        dest = _ref$dest === void 0 ? null : _ref$dest,
        _ref$propagation = _ref.propagation,
        propagation = _ref$propagation === void 0 ? 'rprivate' : _ref$propagation;

    (0, _classCallCheck2["default"])(this, DockerVolume);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DockerVolume).call(this));
    _this.mode = mode;
    _this.type = type;
    _this.src = src;
    _this.dest = dest;
    _this.propagation = propagation;
    return _this;
  }

  (0, _createClass2["default"])(DockerVolume, [{
    key: "fromDockerSyntax",
    value: function fromDockerSyntax(_ref2) {
      var _ref2$Mode = _ref2.Mode,
          Mode = _ref2$Mode === void 0 ? this.mode : _ref2$Mode,
          _ref2$Type = _ref2.Type,
          Type = _ref2$Type === void 0 ? this.type : _ref2$Type,
          _ref2$Source = _ref2.Source,
          Source = _ref2$Source === void 0 ? this.src : _ref2$Source,
          _ref2$Destination = _ref2.Destination,
          Destination = _ref2$Destination === void 0 ? this.dest : _ref2$Destination,
          _ref2$Propagation = _ref2.Propagation,
          Propagation = _ref2$Propagation === void 0 ? this.propagation : _ref2$Propagation;
      this.mode = Mode;
      this.type = Type;
      this.src = Source;
      this.dest = Destination;
      this.propagation = Propagation;
      return this;
    }
  }, {
    key: "toDockerSyntax",
    value: function toDockerSyntax() {
      return {
        Mode: this.mode,
        Type: this.type,
        Source: this.src,
        Destination: this.dest,
        Propagation: this.propagation
      };
    }
  }]);
  return DockerVolume;
}(_.DockerObject);

exports["default"] = DockerVolume;
//# sourceMappingURL=docker-volume.js.map