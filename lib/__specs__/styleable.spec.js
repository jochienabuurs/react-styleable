'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _styleable = require('../styleable');

var _styleable2 = _interopRequireDefault(_styleable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var css = {
  content: 'someHashFromALocalCssModule'
};

function mkFixture(css) {
  var _dec, _class, _class2, _temp;

  var Subject = (_dec = (0, _styleable2.default)(css), _dec(_class = (_temp = _class2 = function (_React$Component) {
    _inherits(Subject, _React$Component);

    function Subject() {
      _classCallCheck(this, Subject);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Subject).apply(this, arguments));
    }

    _createClass(Subject, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: this.props.css.content, ref: 'content' },
          'Content ',
          this.props.aDefault
        );
      }
    }]);

    return Subject;
  }(_react2.default.Component), _class2.defaultProps = {
    aDefault: 'still here'
  }, _temp)) || _class);


  return Subject;
}

function mkFixtureWithReqPropTypes() {
  var _dec2, _class3, _class4, _temp2;

  var Subject = (_dec2 = (0, _styleable2.default)(css), _dec2(_class3 = (_temp2 = _class4 = function (_React$Component2) {
    _inherits(Subject, _React$Component2);

    function Subject() {
      _classCallCheck(this, Subject);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Subject).apply(this, arguments));
    }

    _createClass(Subject, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: this.props.css.content, ref: 'content' },
          'Req content ',
          this.props.aReqProp
        );
      }
    }]);

    return Subject;
  }(_react2.default.Component), _class4.propTypes = {
    aReqProp: _react2.default.PropTypes.string.isRequired
  }, _temp2)) || _class3);


  return Subject;
}

function mkFunctionFixture(css) {
  function subject(props) {
    return _react2.default.createElement(
      'div',
      { className: props.css.content },
      'Content ',
      props.aDefault
    );
  }
  subject.defaultProps = {
    aDefault: 'still here'
  };

  return (0, _styleable2.default)(css)(subject);
}

function mkFunctionFixtureWithReqPropTypes() {
  function subject(props) {
    return _react2.default.createElement(
      'div',
      { className: props.css.content },
      'Req content ',
      props.aReqProp
    );
  }
  subject.propTypes = {
    aReqProp: _react2.default.PropTypes.string.isRequired
  };

  return (0, _styleable2.default)(css)(subject);
}

describe('styleable', function () {

  it('creates a default stylesheet if none supplied', function () {
    var defaultStylesheet = {};
    var Subject = mkFixture();
    var component = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Subject, null));
    component.props.css.should.eql(defaultStylesheet);
  });

  describe('with invalid stylesheet', function () {

    it('rejects css as strings', function () {
      (function () {
        var Subject = mkFixture('nonCssObj');
        _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Subject, null));
      }).should.throw(/must be an object/);
    });

    it('rejects css as array', function () {
      (function () {
        var Subject = mkFixture(['css', 'stuff']);
        _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Subject, null));
      }).should.throw(/must be an object/);
    });
  });

  it('wraps the component in a component', function () {
    var Subject = mkFixture();
    var component = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Subject, null));
    component.refs.should.not.have.property('content');
    component.refs.should.have.property('wrapped');
  });

  describe('with invalid override selectors', function () {

    it('rejects styles that won\'t be used (superset override)', function (done) {
      var origCss = { content: 'hash' };
      var overrideCss = { unusedSelector: 'anotherHash' };
      var Subject = mkFixture(origCss);
      try {
        _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Subject, { css: overrideCss }));
      } catch (e) {
        /*
          Using this instead of (() => {}).should.throw()
          Because I was getting this error:
           TypeError: Cannot call a class as a function
             at _classCallCheck (lib/styleable.js:23:34)
             at CssStyleComponent (lib/styleable.js:31:35)
             at Context.<anonymous> (lib/__specs__/styleable.spec.js:64:41)
         */
        e.message.should.match(/provide only overrides/);
        done();
      }
    });
  });

  it('overrides original stylesheet', function () {
    var newHash = 'anotherHash';
    var origCss = { content: 'hash' };
    var overrideCss = { content: newHash };
    var Subject = mkFixture(origCss);
    var component = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Subject, { css: overrideCss }));
    component.props.css.content.should.eql(newHash);
  });

  it('lets defaultProps pass through', function () {
    var Subject = mkFixture();
    Subject.defaultProps.aDefault.should.exist;
    var component = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Subject, null));
    component.props.aDefault.should.eql('still here');
  });

  it('lets propTypes pass through', function () {
    var Subject = mkFixtureWithReqPropTypes();
    Subject.propTypes.aReqProp.should.exist;
  });

  describe('with stateless functions', function () {

    it('makes the css prop available', function () {
      var css = { content: 'cssHash' };
      var Subject = mkFunctionFixture(css);
      var component = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Subject, null)
      ));
      _reactDom2.default.findDOMNode(component).children[0].className.should.eql(css.content);
    });

    it('allows overrides to the stylesheet', function () {
      var newHash = 'anotherHash';
      var origCss = { content: 'hash' };
      var overrideCss = { content: newHash };
      var Subject = mkFunctionFixture(origCss);
      var component = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Subject, { css: overrideCss })
      ));
      _reactDom2.default.findDOMNode(component).children[0].className.should.eql(newHash);
    });

    it('lets defaultProps pass through', function () {
      var Subject = mkFunctionFixture();
      Subject.defaultProps.aDefault.should.exist;
      var component = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Subject, null)
      ));
      _reactDom2.default.findDOMNode(component).children[0].textContent.should.eql('Content still here');
    });

    it('lets propTypes pass through', function () {
      var Subject = mkFunctionFixtureWithReqPropTypes();
      /*
        Not sure how to really test the real problem where warnings aren't
        happening when a child component has been styleable'd. This at least
        tests the fix for the real problem.
      */
      Subject.propTypes.aReqProp.should.exist;
    });
  });
});
//# sourceMappingURL=styleable.spec.js.map