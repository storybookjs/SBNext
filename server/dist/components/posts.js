'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPostsFilterBy = exports.sortByDate = exports.inCategory = exports.entries = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _load = require('../entries/load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var entries = exports.entries = _load2.default;

var inCategory = exports.inCategory = function inCategory(category) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$includeSubCatego = _ref.includeSubCategories,
      includeSubCategories = _ref$includeSubCatego === undefined ? false : _ref$includeSubCatego;

  return function (post) {
    var data = post.data;
    var _data$category = data.category,
        postCategory = _data$category === undefined ? '' : _data$category;

    var result = !includeSubCategories ? postCategory === category : postCategory.startsWith(category);

    return category ? result : true;
  };
};

var sortByDate = exports.sortByDate = function sortByDate(a, b) {
  var aTime = new Date(a.data.date).getTime();
  var bTime = new Date(b.data.date).getTime();
  return bTime - aTime;
};

var withPostsFilterBy = exports.withPostsFilterBy = function withPostsFilterBy(filter) {
  return function (WrappedComponent) {
    return function (_Component) {
      (0, _inherits3.default)(_class, _Component);

      function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      (0, _createClass3.default)(_class, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }], [{
        key: 'getInitialProps',
        value: function () {
          var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var wrappedInitial,
                wrapped,
                all,
                posts,
                _args = arguments;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    wrappedInitial = WrappedComponent.getInitialProps;

                    if (!wrappedInitial) {
                      _context.next = 7;
                      break;
                    }

                    _context.next = 4;
                    return wrappedInitial.apply(undefined, _args);

                  case 4:
                    _context.t0 = _context.sent;
                    _context.next = 8;
                    break;

                  case 7:
                    _context.t0 = {};

                  case 8:
                    wrapped = _context.t0;
                    _context.next = 11;
                    return (0, _load2.default)();

                  case 11:
                    all = _context.sent;
                    posts = filter ? all.filter(filter) : all;
                    return _context.abrupt('return', (0, _extends3.default)({}, wrapped, {
                      posts: posts
                    }));

                  case 14:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function getInitialProps() {
            return _ref2.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }]);
      return _class;
    }(_react.Component);
  };
};

var withPosts = withPostsFilterBy();

exports.default = withPosts;