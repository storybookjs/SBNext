'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _load = require('./entries/load');

var _load2 = _interopRequireDefault(_load);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./entries/load');

describe('config', function () {
  test('exports SBConfig fn as default', function () {
    expect(_config2.default).toBeDefined();
  });
});

describe('exportPathMap', function () {
  test('generates index by default ', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _load2.default.mockReturnValueOnce([]);

            expect(_config.exportPathMap).toBeDefined();
            _context.next = 4;
            return (0, _config.exportPathMap)();

          case 4:
            result = _context.sent;


            expect(result).toBeDefined();
            expect(_load2.default).toBeCalled();
            expect(result).toHaveProperty('/');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('generates doc entry with default page', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _load2.default.mockReturnValueOnce([{ data: { url: '/test', page: 'doc' } }]);

            expect(_config.exportPathMap).toBeDefined();
            _context2.next = 4;
            return (0, _config.exportPathMap)();

          case 4:
            result = _context2.sent;


            expect(result).toBeDefined();
            expect(_load2.default).toBeCalled();
            expect(result).toHaveProperty('/');
            expect(result).toHaveProperty('/test', { page: '/doc' });

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  test('generates doc entry with given page', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _load2.default.mockReturnValueOnce([{ data: { url: '/test', page: 'test' } }]);

            expect(_config.exportPathMap).toBeDefined();
            _context3.next = 4;
            return (0, _config.exportPathMap)();

          case 4:
            result = _context3.sent;


            expect(result).toBeDefined();
            expect(_load2.default).toBeCalled();
            expect(result).toHaveProperty('/');
            expect(result).toHaveProperty('/test', { page: '/test' });

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('does not generates doc entry if page is false', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _load2.default.mockReturnValueOnce([{ data: { url: '/test', page: false } }]);

            expect(_config.exportPathMap).toBeDefined();
            _context4.next = 4;
            return (0, _config.exportPathMap)();

          case 4:
            result = _context4.sent;


            expect(result).toBeDefined();
            expect(_load2.default).toBeCalled();
            expect(result).toHaveProperty('/');
            expect(result).not.toHaveProperty('/test', { page: '/test' });

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});