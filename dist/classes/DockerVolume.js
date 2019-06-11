"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DockerVolume =
/*#__PURE__*/
function () {
  function DockerVolume(type, src, dest) {
    _classCallCheck(this, DockerVolume);

    this.type = type;
    this.src = src;
    this.dest = dest;
  }

  _createClass(DockerVolume, null, [{
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