'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = styleable;

var _getDisplayName = require('./utils/get-display-name');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getSelectorsNotInStylesheet(cssProps, stylesheet) {
  var propKeys = Object.keys(cssProps);
  var cssKeys = Object.keys(stylesheet);
  return propKeys.filter(function (prop) {
    return cssKeys.indexOf(prop) === -1;
  });
}

function isPropsAnOverride(cssProps, stylesheet) {
  return getSelectorsNotInStylesheet(cssProps, stylesheet).length <= 0;
}

function hasDefinedStyles(stylesheet) {
  return stylesheet && Object.keys(stylesheet).length > 0;
}

function stylesAreOverrides(cssProps, stylesheet) {
  return hasDefinedStyles(stylesheet) ? isPropsAnOverride(cssProps, stylesheet) : true;
}

function isClass(Comp) {
  // :( try/catch flow control -- want something better
  try {
    Comp();
  } catch (e) {
    return e && e.message && /Cannot call a class as a function/.test(e.message);
  }
  return false;
}

function styleable(stylesheet) {
  if (!stylesheet) stylesheet = {};

  if ((typeof stylesheet === 'undefined' ? 'undefined' : _typeof(stylesheet)) !== 'object' || Array.isArray(stylesheet)) throw new Error('stylesheet must be an object (eg, export object from a css module)');

  return function decorateSource(DecoratedComponent) {
    var _class, _temp;

    if (!isClass(DecoratedComponent)) {
      var styledFn = function styledFn(props) {
        return DecoratedComponent(_extends({}, props, {
          css: _extends({}, stylesheet, props.css)
        }));
      };
      styledFn.defaultProps = _extends({}, DecoratedComponent.defaultProps, {
        css: {}
      });
      styledFn.propTypes = _extends({}, DecoratedComponent.propTypes, {
        css: _react2.default.PropTypes.object
      });
      return styledFn;
    } else return _temp = _class = function (_React$Component) {
      _inherits(Styleable, _React$Component);

      function Styleable() {
        _classCallCheck(this, Styleable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Styleable).apply(this, arguments));
      }

      _createClass(Styleable, [{
        key: 'getCss',
        value: function getCss() {
          (0, _invariant2.default)(stylesAreOverrides(this.props.css, stylesheet), 'Expected "this.props.css" to provide only overrides to the given stylesheet.  Selectors "%s" not included in the stylesheet keys, "%s".', getSelectorsNotInStylesheet(this.props.css, stylesheet), Object.keys(stylesheet));
          return _extends({}, stylesheet, this.props.css);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(DecoratedComponent, _extends({ ref: 'wrapped' }, this.props, { css: this.getCss() }));
        }
      }]);

      return Styleable;
    }(_react2.default.Component), _class.displayName = 'Styleable(' + (0, _getDisplayName2.default)(DecoratedComponent) + ')', _class.defaultProps = _extends({}, DecoratedComponent.defaultProps, {
      css: {}
    }), _class.propTypes = _extends({}, DecoratedComponent.propTypes, {
      css: _react2.default.PropTypes.object
    }), _temp;
  };
}
//# sourceMappingURL=styleable.js.map