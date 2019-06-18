"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var DockerVolume =
/*#__PURE__*/
function () {
  function DockerVolume(type, src, dest) {
    (0, _classCallCheck2["default"])(this, DockerVolume);
    this.type = type;
    this.src = src;
    this.dest = dest;
  }

  (0, _createClass2["default"])(DockerVolume, null, [{
    key: "map",
    value: function map(object) {
      if (Array.isArray(object)) {
        return object.map(function (obj) {
          return DockerVolume.map(obj);
        });
      }

      if (object instanceof DockerVolume) {
        return object;
      }

      return new DockerVolume(object.type, object.src, object.dest);
    }
  }]);
  return DockerVolume;
}();

exports["default"] = DockerVolume;
//# sourceMappingURL=DockerVolume.js.map