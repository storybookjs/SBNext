'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _unfetch = require('unfetch');

var _unfetch2 = _interopRequireDefault(_unfetch);

var _env = require('./env');

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _load = require('./load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('glob');

// SUT

jest.mock('fs');
jest.mock('unfetch');
jest.mock('./env');
jest.mock('./process');

describe('loadEntries', function () {
  test('exports loadEntries fn as default', function () {
    expect(_load2.default).toBeDefined();
  });
});

describe('from Server', function () {
  beforeEach(function () {
    _env.isServer.mockReturnValue(true);
  });

  afterEach(function () {
    _env.isServer.mockRestore();
  });

  test('loadEntries retrieves an array of docs reading from Server', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var files, docs, actual;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            files = ['docs/test.md'];
            docs = [{ data: {}, content: '' }];


            _glob2.default.sync.mockReturnValueOnce(files);

            _process2.default.mockReturnValueOnce(docs);

            _context.next = 6;
            return (0, _load2.default)();

          case 6:
            actual = _context.sent;


            expect(actual).toEqual(expect.arrayContaining(docs));

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('byFileName retrieves a doc reading from Server', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var files, doc, docs, actual;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            files = ['docs/test.md'];
            doc = { data: {}, content: '' };
            docs = [doc];


            _glob2.default.sync.mockReturnValueOnce(files);

            _process2.default.mockReturnValueOnce(docs);

            _context2.next = 7;
            return (0, _load.byFileName)('docs/test.md');

          case 7:
            actual = _context2.sent;


            expect(actual).toEqual(expect.objectContaining(doc));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('from Client', function () {
  beforeEach(function () {
    _env.isServer.mockReturnValue(false);
    global.__NEXT_DATA__ = {};
  });

  afterEach(function () {
    _env.isServer.mockRestore();
  });

  test('loadEntries retrieves an array of docs fetching from Server', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var docs, actual;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            docs = [{ data: {}, content: '' }];


            _unfetch2.default.mockReturnValueOnce(Promise.resolve({ json: function json() {
                return docs;
              } }));

            _process2.default.mockReturnValueOnce(docs);

            _context3.next = 5;
            return (0, _load2.default)();

          case 5:
            actual = _context3.sent;


            expect(actual).toEqual(expect.arrayContaining(docs));
            expect(_unfetch2.default).toHaveBeenCalledWith('/_load_entries');

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('byFileName retrieves a doc fetching from Server', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var doc, docs, path, actual;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            doc = { data: {}, content: '' };
            docs = [doc];
            path = 'doc/test.md';


            _unfetch2.default.mockReturnValueOnce(Promise.resolve({ json: function json() {
                return doc;
              } }));

            _process2.default.mockReturnValueOnce(docs);

            _context4.next = 7;
            return (0, _load.byFileName)(path);

          case 7:
            actual = _context4.sent;


            expect(actual).toEqual(expect.objectContaining(doc));
            expect(_unfetch2.default).toHaveBeenCalledWith('/_load_entry/' + path);

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});