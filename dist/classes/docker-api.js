"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dockerode = _interopRequireDefault(require("dockerode"));

// import {
//   DockerPort,
//   DockerContainer,
// } from '.';
var DockerApi =
/*#__PURE__*/
function () {
  function DockerApi() {
    var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    (0, _classCallCheck2["default"])(this, DockerApi);
    this.user = user;
    this.scope = scope;
    this._docker = new _dockerode["default"](options);
  }

  (0, _createClass2["default"])(DockerApi, [{
    key: "listContainers",
    value: function listContainers() {
      var _this$_docker;

      return (_this$_docker = this._docker).listContainers.apply(_this$_docker, arguments);
    }
  }, {
    key: "createContainer",
    value: function createContainer() {
      var _this$_docker2;

      return (_this$_docker2 = this._docker).createContainer.apply(_this$_docker2, arguments);
    }
  }, {
    key: "getContainer",
    value: function getContainer(container) {
      return this._docker.getContainer(container.id);
    }
  }, {
    key: "buildImage",
    value: function buildImage() {
      var _this$_docker3;

      return (_this$_docker3 = this._docker).buildImage.apply(_this$_docker3, arguments);
    }
  }]);
  return DockerApi;
}();

exports["default"] = DockerApi;
global.$dockerApi = new DockerApi();
//# sourceMappingURL=docker-api.js.map