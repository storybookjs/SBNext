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

exports.default = function (paths, entriesPath) {
  return paths.map(function (path) {
    return (0, _fs.readFileSync)(path, 'utf-8');
  }).map(_frontmatter2.default).map(addPage).map(addEntry(paths)).map(addName).map(addCategory(entriesPath)).map(addDate).map(addUrl);
};

var addPage = function addPage(value, idx) {
  var data = value.data;
  var _data$page = data.page,
      page = _data$page === undefined ? 'post' : _data$page;

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

  return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { name: createEntryName((0, _extends3.default)({}, data)) }) });
};

var addCategory = function addCategory(entriesPath) {
  return function (value) {
    var data = value.data;

    return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { category: createEntryCategory((0, _extends3.default)({ entriesPath: entriesPath }, data)) }) });
  };
};

var addUrl = function addUrl(value) {
  var data = value.data;

  return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { url: createEntryURL((0, _extends3.default)({}, data)) }) });
};

var addDate = function addDate(value) {
  var data = value.data;

  return (0, _extends3.default)({}, value, { data: (0, _extends3.default)({}, data, { date: createEntryDate((0, _extends3.default)({}, data)) }) });
};

var DATE_IN_FILE_REGEX = /^(\d{4}-\d{2}-\d{2})-(.+)$/;
var DATE_MATCH_INDEX = 1;
var NAME_MATCH_INDEX = 2;
var DEFAULT_PERMALINK = '/:category?/:name';
var PERMALINK_CATEGORIES = ':category(.*)';

var extractFileName = function extractFileName(path) {
  return (0, _path.basename)(path, (0, _path.extname)(path));
};

var createEntryName = function createEntryName(_ref) {
  var _entry = _ref._entry;

  var name = extractFileName(_entry);
  var match = name.match(DATE_IN_FILE_REGEX);

  return match ? match[NAME_MATCH_INDEX] : name;
};

var createEntryURL = function createEntryURL(data) {
  var page = data.page,
      date = data.date,
      _data$permalink = data.permalink,
      permalink = _data$permalink === undefined ? DEFAULT_PERMALINK : _data$permalink;

  var toUrl = _pathToRegexp2.default.compile(permalink.replace(':category', PERMALINK_CATEGORIES));
  var url = toUrl((0, _extends3.default)({}, data, { date: date.replace(/T.*Z/, '') }), { encode: function encode(v) {
      return v;
    } });

  return page ? url : undefined;
};

var createEntryDate = function createEntryDate(_ref2) {
  var _entry = _ref2._entry,
      date = _ref2.date;

  var name = extractFileName(_entry);
  var match = name.match(DATE_IN_FILE_REGEX);

  return (date ? new Date(date) : match ? new Date(match[DATE_MATCH_INDEX]) : fileCreationDate(_entry)).toJSON();
};

var fileCreationDate = function fileCreationDate(path) {
  var _statSync = (0, _fs.statSync)(path),
      birthtime = _statSync.birthtime;

  return birthtime;
};

var createEntryCategory = function createEntryCategory(_ref3) {
  var entriesPath = _ref3.entriesPath,
      category = _ref3.category,
      _entry = _ref3._entry;

  if (category) return category;
  var categorySeparator = '/';
  var root = (0, _path.resolve)(process.cwd(), entriesPath);
  var post = (0, _path.resolve)(process.cwd(), _entry);
  var folderCategory = (0, _path.relative)(root, (0, _path.dirname)(post)).replace(_path.sep, categorySeparator);
  return folderCategory || undefined;
};