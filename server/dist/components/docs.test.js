'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _load = require('../entries/load');

var _load2 = _interopRequireDefault(_load);

var _docs = require('./docs');

var _docs2 = _interopRequireDefault(_docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../entries/load');

describe('withDocs', function () {
  test('exports HOC withDocs as default', function () {
    expect(_docs2.default).toBeDefined();
  });

  test('withDocs should add `docs` property to getInitialProps', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var expected, Component, actual;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expected = [{ data: {}, content: '' }];
            Component = (0, _docs2.default)(function (_ref2) {
              var docs = _ref2.docs;
              return _react2.default.createElement(
                'div',
                null,
                'There are ',
                docs.length,
                ' docs'
              );
            });


            _load2.default.mockReturnValueOnce(expected);
            _context.next = 5;
            return Component.getInitialProps();

          case 5:
            actual = _context.sent;


            expect(actual.docs).toMatchSnapshot();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});

describe('entries', function () {
  test('exports entries function', function () {
    expect(_docs.entries).toBeDefined();
  });
});