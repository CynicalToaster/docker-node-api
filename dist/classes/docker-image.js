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

var DockerImage =
/*#__PURE__*/
function () {
  function DockerImage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        _ref$context = _ref.context,
        context = _ref$context === void 0 ? __dirname : _ref$context,
        _ref$dockerFile = _ref.dockerFile,
        dockerFile = _ref$dockerFile === void 0 ? 'Dockerfile' : _ref$dockerFile;

    (0, _classCallCheck2["default"])(this, DockerImage);
    this.name = name;
    this.context = context;
    this.dockerFile = dockerFile;
  }

  (0, _createClass2["default"])(DockerImage, [{
    key: "build",
    value: function () {
      var _build = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var stream;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return $dockerApi.buildImage({
                  context: this.context,
                  src: ['.']
                }, {
                  dockerfile: this.dockerFile,
                  t: this.name
                });

              case 2:
                stream = _context.sent;
                _context.next = 5;
                return new Promise(function (resolve, reject) {
                  $dockerApi._docker.modem.followProgress(stream, function (err, res) {
                    console.log(res, err);
                    return err ? reject(err) : resolve(res);
                  });
                });

              case 5:
                console.log('Finished build');

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function build() {
        return _build.apply(this, arguments);
      }

      return build;
    }()
  }]);
  return DockerImage;
}();

exports["default"] = DockerImage;
//# sourceMappingURL=docker-image.js.map