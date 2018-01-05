'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportPathMap = exports.webpack = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _load = require('./entries/load');

var _load2 = _interopRequireDefault(_load);

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (original) {
  var oWebpack = original.webpack,
      oExportPathMap = original.exportPathMap;


  return (0, _extends4.default)({}, original, {
    webpack: function webpack() {
      var our = _webpack.apply(undefined, arguments);
      var their = void 0;

      if (oWebpack) {
        their = oWebpack.apply(undefined, arguments);
      }

      return (0, _extends4.default)({}, our, their);
    },
    exportPathMap: function exportPathMap() {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var our, their;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _exportPathMap();

              case 2:
                our = _context.sent;
                their = void 0;

                if (!oExportPathMap) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return oExportPathMap();

              case 7:
                their = _context.sent;

              case 8:
                return _context.abrupt('return', (0, _extends4.default)({}, our, their));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  });
};

var _webpack = function _webpack(config, _ref) {
  var dev = _ref.dev;

  config.node = {
    fs: 'empty'
  };

  config.plugins = config.plugins.filter(function (plugin) {
    return plugin.constructor.name !== 'UglifyJsPlugin';
  });

  if (!dev) {
    config.plugins.push(new _uglifyjsWebpackPlugin2.default({
      parallel: true,
      sourceMap: true
    }));
  }

  return config;
};

exports.webpack = _webpack;
var _exportPathMap = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var entries, map;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _load2.default)();

          case 2:
            entries = _context2.sent;
            map = entries.reduce(function (prev, _ref3) {
              var data = _ref3.data;
              var url = data.url,
                  page = data.page,
                  _entry = data._entry;

              var query = _entry ? { _entry: _entry } : undefined;
              return page ? (0, _extends4.default)({}, prev, (0, _defineProperty3.default)({}, url, { page: '/' + page, query: query })) : prev;
            }, {});
            return _context2.abrupt('return', (0, _extends4.default)({
              '/': { page: '/' }
            }, map));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function _exportPathMap() {
    return _ref2.apply(this, arguments);
  };
}();
exports.exportPathMap = _exportPathMap;