"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var DockerObject =
/*#__PURE__*/
function () {
  function DockerObject() {
    (0, _classCallCheck2["default"])(this, DockerObject);
  }

  (0, _createClass2["default"])(DockerObject, null, [{
    key: "map",
    value: function map(object) {
      var dockerSyntax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (Array.isArray(object)) {
        return object.map(function (port) {
          return DockerObject.map(port);
        });
      }

      console.log(this, object);

      if (object instanceof DockerObject) {
        return object;
      }

      if (dockerSyntax) {
        return new DockerObject().fromDockerSyntax(object);
      }

      return new DockerObject(object);
    }
  }]);
  return DockerObject;
}();

exports["default"] = DockerObject;
;