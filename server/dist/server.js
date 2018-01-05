'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _next = require('next');

var _next2 = _interopRequireDefault(_next);

var _url = require('url');

var _pathMatch = require('path-match');

var _pathMatch2 = _interopRequireDefault(_pathMatch);

var _path = require('path');

var _load = require('./entries/load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = function () {
  function Server(_ref) {
    var _this = this;

    var _ref$dir = _ref.dir,
        dir = _ref$dir === undefined ? '.' : _ref$dir,
        _ref$dev = _ref.dev,
        dev = _ref$dev === undefined ? true : _ref$dev;
    (0, _classCallCheck3.default)(this, Server);

    this.handleRequest = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var app, exportPathMap, parsedUrl, pathname, customRoute, matchEntry, entryParam, path, e, page, query;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                app = _this.app, exportPathMap = _this.exportPathMap;
                parsedUrl = (0, _url.parse)(req.url, true);
                pathname = parsedUrl.pathname;
                customRoute = exportPathMap[pathname];

                console.log(customRoute);

                matchEntry = (0, _pathMatch2.default)()('/_load_entry/:path+');
                entryParam = matchEntry(pathname);

                if (!(pathname === '/_load_entries')) {
                  _context.next = 10;
                  break;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return _context.abrupt('return', res.end(_this.entriesAsJSON()));

              case 10:
                if (!entryParam) {
                  _context.next = 18;
                  break;
                }

                path = entryParam.path.join(_path.sep);

                if (!path) {
                  _context.next = 18;
                  break;
                }

                _context.next = 15;
                return (0, _load.byFileName)(path);

              case 15:
                e = _context.sent;


                res.writeHead(200, { 'Content-Type': 'application/json' });
                return _context.abrupt('return', res.end(JSON.stringify(e)));

              case 18:
                if (!customRoute) {
                  _context.next = 21;
                  break;
                }

                page = customRoute.page, query = customRoute.query;
                return _context.abrupt('return', app.render(req, res, page, query));

              case 21:

                app.handleRequest(req, res, parsedUrl);

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.app = (0, _next2.default)({ dev: dev });
  }

  (0, _createClass3.default)(Server, [{
    key: 'readEntries',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var entries, kv;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _load2.default)();

              case 2:
                entries = _context2.sent;
                kv = entries.map(function (entry) {
                  var data = entry.data;
                  var url = data.url;

                  return [url, entry];
                });


                this.entriesMap = new Map(kv);
                _context2.next = 7;
                return this.app.config.exportPathMap();

              case 7:
                this.exportPathMap = _context2.sent;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function readEntries() {
        return _ref3.apply(this, arguments);
      }

      return readEntries;
    }()
  }, {
    key: 'entriesAsJSON',
    value: function entriesAsJSON() {
      var entriesMap = this.entriesMap;

      return JSON.stringify(Array.from(entriesMap.values()));
    }

    /**
     * Freaking issue with babel-eslint or eslint or babel or ... that retrieves an error when using arrow func on class props
     */
    /* eslint-disable no-undef */

  }, {
    key: 'start',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(port, hostname) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.readEntries();

              case 2:
                _context3.next = 4;
                return this.app.prepare();

              case 4:
                this.http = _http2.default.createServer(this.handleRequest);
                _context3.next = 7;
                return new Promise(function (resolve, reject) {
                  // This code catches EADDRINUSE error if the port is already in use
                  _this2.http.on('error', reject);
                  _this2.http.on('listening', function () {
                    return resolve();
                  });
                  _this2.http.listen(port, hostname);
                });

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function start(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'hotReloadPosts',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var hotReloader;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                hotReloader = this.app.hotReloader;

                hotReloader.webpackDevMiddleware.invalidate();
                _context4.next = 4;
                return this.readEntries();

              case 4:
                hotReloader.webpackDevMiddleware.waitUntilValid(function () {
                  var rootDir = (0, _path.join)('bundles', 'pages');

                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = new Set([].concat((0, _toConsumableArray3.default)(hotReloader.prevChunkNames)))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var n = _step.value;

                      var _route = toRoute((0, _path.relative)(rootDir, n));
                      hotReloader.send('reload', _route);
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }

                  hotReloader.send('reload', '/bundles/pages/');
                });

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function hotReloadPosts() {
        return _ref5.apply(this, arguments);
      }

      return hotReloadPosts;
    }()
  }]);
  return Server;
}();

exports.default = Server;


function toRoute(file) {
  var f = _path.sep === '\\' ? file.replace(/\\/g, '/') : file;
  return ('/' + f).replace(/(\/index)?\.js$/, '') || '/';
}