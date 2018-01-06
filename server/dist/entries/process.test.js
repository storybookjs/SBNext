'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _frontmatter = require('frontmatter');

var _frontmatter2 = _interopRequireDefault(_frontmatter);

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('fs');
jest.mock('frontmatter');

describe('processEntries ', function () {
  test('exports processEntries fn as default', function () {
    expect(_process2.default).toBeDefined();
  });

  test('retrieves an array of docs with default values', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var expectedPage, expectedCategory, expectedName, expectedEntry, expectedContent, expectedUrl, expectedDate, expectedFileContent, actual;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expectedPage = 'doc';
            expectedCategory = undefined;
            expectedName = 'test';
            expectedEntry = 'docs/' + expectedName + '.md';
            expectedContent = 'text';
            expectedUrl = '/' + expectedName;
            expectedDate = new Date();
            expectedFileContent = '\n        ---\n        ---\n        ' + expectedContent + '\n        ';


            _fs.readFileSync.mockReturnValueOnce(expectedFileContent);

            _frontmatter2.default.mockReturnValueOnce({
              data: {},
              content: expectedContent
            });

            _fs.statSync.mockReturnValueOnce({
              birthtime: expectedDate
            });

            _context.next = 13;
            return (0, _process2.default)([expectedEntry], 'docs');

          case 13:
            actual = _context.sent;


            expect(actual).toMatchSnapshot();

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});

describe('frontmatter: permalink', function () {
  test('default permalink', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var expectedPage, expectedCategory, expectedName, expectedEntry, expectedUrl, expectedDate, actual;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            expectedPage = 'doc';
            expectedCategory = 'category';
            expectedName = 'test';
            expectedEntry = 'docs/' + expectedName + '.md';
            expectedUrl = '/' + expectedCategory + '/' + expectedName;
            expectedDate = new Date();


            _frontmatter2.default.mockReturnValueOnce({
              data: {
                category: expectedCategory
              }
            });

            _fs.statSync.mockReturnValueOnce({
              birthtime: expectedDate
            });

            _context2.next = 10;
            return (0, _process2.default)([expectedEntry], 'docs');

          case 10:
            actual = _context2.sent;


            expect(actual).toMatchSnapshot();

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  test('permalink /:category/:name.html', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var permalink, expectedPage, expectedCategory, expectedName, expectedEntry, expectedUrl, expectedDate, actual;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            permalink = '/:category/:name.html';
            expectedPage = 'doc';
            expectedCategory = 'category';
            expectedName = 'test';
            expectedEntry = 'docs/' + expectedName + '.md';
            expectedUrl = '/' + expectedCategory + '/' + expectedName + '.html';
            expectedDate = new Date();


            _frontmatter2.default.mockReturnValueOnce({
              data: {
                category: expectedCategory,
                permalink: permalink
              }
            });

            _fs.statSync.mockReturnValueOnce({
              birthtime: expectedDate
            });

            _context3.next = 11;
            return (0, _process2.default)([expectedEntry], 'docs');

          case 11:
            actual = _context3.sent;


            expect(actual).toMatchSnapshot();

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  test('permalink /:date/:name.html', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var permalink, expectedPage, expectedCategory, expectedName, expectedEntry, dateStr, expectedUrl, expectedDate, actual;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            permalink = '/:date/:name.html';
            expectedPage = 'doc';
            expectedCategory = 'category';
            expectedName = 'test';
            expectedEntry = 'docs/' + expectedName + '.md';
            dateStr = '2017-05-01';
            expectedUrl = '/' + dateStr + '/' + expectedName + '.html';
            expectedDate = new Date(dateStr);


            _frontmatter2.default.mockReturnValueOnce({
              data: {
                category: expectedCategory,
                permalink: permalink,
                date: expectedDate
              }
            });

            _fs.statSync.mockReturnValueOnce({
              birthtime: expectedDate
            });

            _context4.next = 12;
            return (0, _process2.default)([expectedEntry], 'docs');

          case 12:
            actual = _context4.sent;


            expect(actual).toMatchSnapshot();

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});