'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byFileName = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _unfetch = require('unfetch');

var _unfetch2 = _interopRequireDefault(_unfetch);

var _env = require('./env');

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'posts';
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _env.isServer)() ? fromServer(path) : fromClient(path));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function () {
    return _ref.apply(this, arguments);
  };
}(); /* global __NEXT_DATA__ */


var fromServer = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(entriesPath) {
    var paths;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            paths = _glob2.default.sync(entriesPath + '/**/*.md', { root: process.cwd() });
            return _context2.abrupt('return', (0, _process2.default)(paths, entriesPath).filter(function (_ref3) {
              var data = _ref3.data;
              return data.published !== false;
            }));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fromServer(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var fromClient = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(path) {
    var resp;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!__NEXT_DATA__.nextExport) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', __NEXT_DATA__.props.posts);

          case 2:
            _context3.next = 4;
            return (0, _unfetch2.default)('/_load_entries');

          case 4:
            resp = _context3.sent;
            return _context3.abrupt('return', resp.json());

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function fromClient(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var byFileName = exports.byFileName = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(path) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'posts';
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', (0, _env.isServer)() ? byFileNameFromServer(path, root) : byFileNameFromClient(path));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function byFileName(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var byFileNameFromServer = function byFileNameFromServer(path, entriesPath) {
  return (0, _process2.default)([path], entriesPath).pop();
};

var byFileNameFromClient = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(path) {
    var resp;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!__NEXT_DATA__.nextExport) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt('return', findPostFromNextCache(path));

          case 2:
            _context5.next = 4;
            return (0, _unfetch2.default)('/_load_entry/' + path.replace(_path.sep, '/'));

          case 4:
            resp = _context5.sent;
            return _context5.abrupt('return', resp.json());

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function byFileNameFromClient(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

var findPostFromNextCache = function findPostFromNextCache(path) {
  var _NEXT_DATA__$props = __NEXT_DATA__.props,
      post = _NEXT_DATA__$props.post,
      posts = _NEXT_DATA__$props.posts;


  return post && post.data._entry === path ? post : posts.filter(function (p) {
    return p.data._entry === path;
  }).reduce(function (v) {
    return v;
  });
};