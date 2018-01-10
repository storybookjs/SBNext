'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Content = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _unified = require('unified');

var _unified2 = _interopRequireDefault(_unified);

var _remarkParse = require('remark-parse');

var _remarkParse2 = _interopRequireDefault(_remarkParse);

var _remarkRehype = require('remark-rehype');

var _remarkRehype2 = _interopRequireDefault(_remarkRehype);

var _rehypeReact = require('rehype-react');

var _rehypeReact2 = _interopRequireDefault(_rehypeReact);

var _rehypeRaw = require('rehype-raw');

var _rehypeRaw2 = _interopRequireDefault(_rehypeRaw);

var _unistUtilSelect = require('unist-util-select');

var _unistUtilSelect2 = _interopRequireDefault(_unistUtilSelect);

var _load = require('../entries/load');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractExcerpt = function extractExcerpt(excerpt) {
  if (!excerpt) {
    return;
  }

  var selector = typeof excerpt === 'string' ? excerpt : ':root > paragraph:first-child';

  return function () {
    return (/* attacher */function (tree) {
        /* transformer */
        tree.children = (0, _unistUtilSelect2.default)(tree, selector);
        return tree;
      }
    );
  };
};

var toReact = function toReact(_ref) {
  var content = _ref.content,
      excerpt = _ref.excerpt,
      renderers = _ref.renderers,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? 'entry-' : _ref$prefix;
  return (0, _unified2.default)().use(_remarkParse2.default).use(extractExcerpt(excerpt)).use(_remarkRehype2.default, { allowDangerousHTML: true }).use(_rehypeRaw2.default).use(_rehypeReact2.default, {
    createElement: _react2.default.createElement,
    prefix: prefix,
    components: renderers
  }).processSync(content).contents;
};

var Content = function Content(props) {
  var content = props.content,
      excerpt = props.excerpt,
      renderers = props.renderers,
      data = props.data,
      prefix = props.prefix,
      componentProps = (0, _objectWithoutProperties3.default)(props, ['content', 'excerpt', 'renderers', 'data', 'prefix']);

  var cmp = toReact({ content: content, excerpt: excerpt, renderers: renderers, prefix: prefix });
  var cmpProps = cmp.props;


  return (0, _extends3.default)({}, cmp, {
    props: (0, _extends3.default)({}, cmpProps, componentProps)
  });
};

exports.Content = Content;

exports.default = function (WrappedComponent) {
  return function (_Component) {
    (0, _inherits3.default)(_class, _Component);

    function _class() {
      (0, _classCallCheck3.default)(this, _class);
      return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
      key: 'render',
      value: function render() {
        var props = this.props;


        return _react2.default.createElement(WrappedComponent, props);
      }
    }], [{
      key: 'getInitialProps',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var wrappedInitial, wrapped, _args$0$query, query, _entry, post;

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
                  return wrappedInitial.apply(undefined, args);

                case 4:
                  _context.t0 = _context.sent;
                  _context.next = 8;
                  break;

                case 7:
                  _context.t0 = {};

                case 8:
                  wrapped = _context.t0;
                  _args$0$query = args[0].query, query = _args$0$query === undefined ? {} : _args$0$query;
                  _entry = query._entry;

                  if (!_entry) {
                    _context.next = 17;
                    break;
                  }

                  _context.next = 14;
                  return (0, _load.byFileName)(_entry);

                case 14:
                  _context.t1 = _context.sent;
                  _context.next = 18;
                  break;

                case 17:
                  _context.t1 = undefined;

                case 18:
                  post = _context.t1;
                  return _context.abrupt('return', (0, _extends3.default)({}, wrapped, {
                    post: post
                  }));

                case 20:
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