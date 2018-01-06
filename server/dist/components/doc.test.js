'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _unified = require('unified');

var _unified2 = _interopRequireDefault(_unified);

var _load = require('../entries/load');

var _doc = require('../components/doc');

var _doc2 = _interopRequireDefault(_doc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../entries/load');
jest.mock('unified', function () {
  var Impl = function Impl() {
    (0, _classCallCheck3.default)(this, Impl);
    this.use = mockedUnified.use;
    this.processSync = mockedUnified.processSync;
  };

  function mockedUnified() {
    return new Impl();
  }
  mockedUnified.processSync = jest.fn();
  mockedUnified.use = jest.fn(function mockUse() {
    return this;
  });

  return mockedUnified;
});

describe('withDoc', function () {
  test('exports HOC withDoc as default', function () {
    expect(_doc2.default).toBeDefined();
  });

  test('withDocs should add `doc` property to getInitialProps', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var expected, expectedFileName, Component, actual;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expected = { data: {}, content: '' };
            expectedFileName = 'fake';
            Component = (0, _doc2.default)(function () {
              return _react2.default.createElement(
                'div',
                null,
                'Test'
              );
            });


            _load.byFileName.mockReturnValueOnce(expected);
            _context.next = 6;
            return Component.getInitialProps({ query: { _entry: expectedFileName } });

          case 6:
            actual = _context.sent;


            expect(actual.doc).toBeDefined();
            expect(actual.doc).toEqual(expect.objectContaining(expected));
            expect(_load.byFileName).toHaveBeenCalledWith(expectedFileName);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});

describe('Content', function () {
  test('exports Content', function () {
    expect(_doc.Content).toBeDefined();
  });

  test('Content component should render doc content', function () {
    var expectedContent = 'lorem ipsum';

    _unified2.default.processSync.mockReturnValueOnce({ contents: _react2.default.createElement(
        'p',
        null,
        expectedContent
      ) });

    var comp = _reactTestRenderer2.default.create(_react2.default.createElement(_doc.Content, { content: expectedContent }));

    expect(_unified2.default.processSync).toHaveBeenCalledWith(expectedContent);
    expect(comp.toJSON()).toMatchSnapshot();
  });
});