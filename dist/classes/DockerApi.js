"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dockerode = _interopRequireDefault(require("dockerode"));

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DockerApi =
/*#__PURE__*/
function () {
  function DockerApi() {
    var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, DockerApi);

    this.user = user;
    this.scope = scope;
    this._docker = new _dockerode["default"](options);
  }

  _createClass(DockerApi, [{
    key: "getContainerName",
    value: function getContainerName(name) {
      return "".concat(this.scope, ".").concat(this.user, ".").concat(name);
    }
  }, {
    key: "createContainer",
    value: function createContainer(name, options) {
      return new _.DockerContainer(this.getContainerName(name), options, this._docker).create();
    }
  }]);

  return DockerApi;
}();

exports["default"] = DockerApi;