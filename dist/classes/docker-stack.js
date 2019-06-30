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

var DockerStack =
/*#__PURE__*/
function () {
  function DockerStack() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$containers = _ref.containers,
        containers = _ref$containers === void 0 ? [] : _ref$containers;

    (0, _classCallCheck2["default"])(this, DockerStack);
    this.containers = containers;
  }

  (0, _createClass2["default"])(DockerStack, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var promises;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promises = [];
                this.containers.forEach(function (container) {
                  promises.push(container.create());
                });
                _context.next = 4;
                return Promise.all(promises);

              case 4:
                return _context.abrupt("return", this);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var promises;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                promises = [];
                this.containers.forEach(function (container) {
                  promises.push(container.start());
                });
                _context2.next = 4;
                return Promise.all(promises);

              case 4:
                return _context2.abrupt("return", this);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var promises;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                promises = [];
                this.containers.forEach(function (container) {
                  promises.push(container.stop());
                });
                _context3.next = 4;
                return Promise.all(promises);

              case 4:
                return _context3.abrupt("return", this);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }]);
  return DockerStack;
}();

exports["default"] = DockerStack;
//# sourceMappingURL=docker-stack.js.map