'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _fs = require('fs');

var _path = require('path');

var _frontmatter = require('frontmatter');

var _frontmatter2 = _interopRequireDefault(_frontmatter);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (paths) {
  return paths.map(function (path) {
    return (0, _fs.readFileSync)(path, 'utf-8');
  }).map(_frontmatter2.default).map(addEntry(paths)).map(addName).map(addDate).map(addUrl);
};

var addPage = function addPage(value) {
  var data = value.data;
  var _data$page = data.page,
      page = _data$page === undefined ? 'doc' : _data$page;

  return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { page: page }) });
};

var addEntry = function addEntry(paths) {
  return function (value, idx) {
    var data = value.data;

    return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { _entry: paths[idx] }) });
  };
};

var addName = function addName(value) {
  var data = value.data;

  return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { name: createName((0, _extends3.default)({}, data)) }) });
};

var addUrl = function addUrl(value) {
  var data = value.data;

  return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { url: createURL((0, _extends3.default)({}, data)) }) });
};

var addDate = function addDate(value) {
  var data = value.data;

  return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { date: createDate((0, _extends3.default)({}, data)) }) });
};

var DATE_IN_FILE_REGEX = /^(\d{4}-\d{2}-\d{2})-(.+)$/;
var DATE_MATCH_INDEX = 1;
var NAME_MATCH_INDEX = 2;

var extractFileName = function extractFileName(path) {
  return (0, _path.basename)(path, (0, _path.extname)(path));
};

var createName = function createName(_ref) {
  var _entry = _ref._entry;

  var name = extractFileName(_entry);
  var match = name.match(DATE_IN_FILE_REGEX);

  return match ? match[NAME_MATCH_INDEX] : name;
};

var createURL = function createURL(data) {
  var _entry = data._entry;


  return '/' + _entry.replace(/\.[^/.]+$/, '/');
};

var createDate = function createDate(_ref2) {
  var _entry = _ref2._entry,
      date = _ref2.date;

  var name = extractFileName(_entry);
  var match = name.match(DATE_IN_FILE_REGEX);
  var result = void 0;

  if (date) {
    result = new Date(date);
  } else if (match) {
    result = new Date(match[DATE_MATCH_INDEX]);
  } else {
    result = fileCreationDate(_entry);
  }

  return result.toJSON();
};

var fileCreationDate = function fileCreationDate(path) {
  var _statSync = (0, _fs.statSync)(path),
      birthtime = _statSync.birthtime;

  return birthtime;
};