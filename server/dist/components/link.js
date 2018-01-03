'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  var data = props.data,
      children = props.children,
      content = props.content,
      rest = (0, _objectWithoutProperties3.default)(props, ['data', 'children', 'content']);
  var href = rest.href,
      as = rest.as;

  if (data) {
    var _data$page = data.page,
        page = _data$page === undefined ? 'post' : _data$page,
        _entry = data._entry,
        url = data.url;

    href = { pathname: '/' + page, query: { _entry: _entry } };
    as = url;
  }

  return _react2.default.createElement(
    _link2.default,
    (0, _extends3.default)({}, rest, { href: href, as: as }),
    children
  );
};