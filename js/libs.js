
/**
 * Swiper 6.0.4
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: July 15, 2020
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Swiper = factory());
}(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  /**
   * SSR Window 3.0.0-alpha.4
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2020, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: May 20, 2020
   */

  /* eslint-disable no-param-reassign */
  function isObject(obj) {
    return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
  }

  function extend(target, src) {
    if (target === void 0) {
      target = {};
    }

    if (src === void 0) {
      src = {};
    }

    Object.keys(src).forEach(function (key) {
      if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }

  var ssrDocument = {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: ''
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {}
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS: function createElementNS() {
      return {};
    },
    importNode: function importNode() {
      return null;
    },
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      protocol: '',
      search: ''
    }
  };

  function getDocument() {
    var doc = typeof document !== 'undefined' ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }

  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ''
    },
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      protocol: '',
      search: ''
    },
    history: {
      replaceState: function replaceState() {},
      pushState: function pushState() {},
      go: function go() {},
      back: function back() {}
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        }
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
    matchMedia: function matchMedia() {
      return {};
    },
    requestAnimationFrame: function requestAnimationFrame(callback) {
      if (typeof setTimeout === 'undefined') {
        callback();
        return null;
      }

      return setTimeout(callback, 0);
    },
    cancelAnimationFrame: function cancelAnimationFrame(id) {
      if (typeof setTimeout === 'undefined') {
        return;
      }

      clearTimeout(id);
    }
  };

  function getWindow() {
    var win = typeof window !== 'undefined' ? window : {};
    extend(win, ssrWindow);
    return win;
  }

  /**
   * Dom7 3.0.0-alpha.7
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * https://framework7.io/docs/dom7.html
   *
   * Copyright 2020, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 14, 2020
   */

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }
  /* eslint-disable no-proto */


  function makeReactive(obj) {
    var proto = obj.__proto__;
    Object.defineProperty(obj, '__proto__', {
      get: function get() {
        return proto;
      },
      set: function set(value) {
        proto.__proto__ = value;
      }
    });
  }

  var Dom7 = /*#__PURE__*/function (_Array) {
    _inheritsLoose(Dom7, _Array);

    function Dom7(items) {
      var _this;

      _this = _Array.call.apply(_Array, [this].concat(items)) || this;
      makeReactive(_assertThisInitialized(_this));
      return _this;
    }

    return Dom7;
  }( /*#__PURE__*/_wrapNativeSuper(Array));

  function arrayFlat(arr) {
    if (arr === void 0) {
      arr = [];
    }

    var res = [];
    arr.forEach(function (el) {
      if (Array.isArray(el)) {
        res.push.apply(res, arrayFlat(el));
      } else {
        res.push(el);
      }
    });
    return res;
  }

  function arrayFilter(arr, callback) {
    return Array.prototype.filter.call(arr, callback);
  }

  function arrayUnique(arr) {
    var uniqueArray = [];

    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
    }

    return uniqueArray;
  }

  function qsa(selector, context) {
    if (typeof selector !== 'string') {
      return [selector];
    }

    var a = [];
    var res = context.querySelectorAll(selector);

    for (var i = 0; i < res.length; i += 1) {
      a.push(res[i]);
    }

    return a;
  }

  function $(selector, context) {
    var window = getWindow();
    var document = getDocument();
    var arr = [];

    if (!context && selector instanceof Dom7) {
      return selector;
    }

    if (!selector) {
      return new Dom7(arr);
    }

    if (typeof selector === 'string') {
      var html = selector.trim();

      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) toCreate = 'ul';
        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
        if (html.indexOf('<tbody') === 0) toCreate = 'table';
        if (html.indexOf('<option') === 0) toCreate = 'select';
        var tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;

        for (var i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        arr = qsa(selector.trim(), context || document);
      } // arr = qsa(selector, document);

    } else if (selector.nodeType || selector === window || selector === document) {
      arr.push(selector);
    } else if (Array.isArray(selector)) {
      if (selector instanceof Dom7) return selector;
      arr = selector;
    }

    return new Dom7(arrayUnique(arr));
  }

  $.fn = Dom7.prototype;

  function addClass() {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }

    var classNames = arrayFlat(classes.map(function (c) {
      return c.split(' ');
    }));
    this.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).add.apply(_el$classList, classNames);
    });
    return this;
  }

  function removeClass() {
    for (var _len2 = arguments.length, classes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      classes[_key2] = arguments[_key2];
    }

    var classNames = arrayFlat(classes.map(function (c) {
      return c.split(' ');
    }));
    this.forEach(function (el) {
      var _el$classList2;

      (_el$classList2 = el.classList).remove.apply(_el$classList2, classNames);
    });
    return this;
  }

  function toggleClass() {
    for (var _len3 = arguments.length, classes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      classes[_key3] = arguments[_key3];
    }

    var classNames = arrayFlat(classes.map(function (c) {
      return c.split(' ');
    }));
    this.forEach(function (el) {
      classNames.forEach(function (className) {
        el.classList.toggle(className);
      });
    });
  }

  function hasClass() {
    for (var _len4 = arguments.length, classes = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      classes[_key4] = arguments[_key4];
    }

    var classNames = arrayFlat(classes.map(function (c) {
      return c.split(' ');
    }));
    return arrayFilter(this, function (el) {
      return classNames.filter(function (className) {
        return el.classList.contains(className);
      }).length > 0;
    }).length > 0;
  }

  function attr(attrs, value) {
    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs);
      return undefined;
    } // Set attrs


    for (var i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }

    return this;
  }

  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }

    return this;
  }

  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].style.transform = transform;
    }

    return this;
  }

  function transition(duration) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].style.transition = typeof duration !== 'string' ? duration + "ms" : duration;
    }

    return this;
  }

  function on() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    var eventType = args[0],
        targetSelector = args[1],
        listener = args[2],
        capture = args[3];

    if (typeof args[1] === 'function') {
      eventType = args[0];
      listener = args[1];
      capture = args[2];
      targetSelector = undefined;
    }

    if (!capture) capture = false;

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) return;
      var eventData = e.target.dom7EventData || [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
        var _parents = $(target).parents(); // eslint-disable-line


        for (var k = 0; k < _parents.length; k += 1) {
          if ($(_parents[k]).is(targetSelector)) listener.apply(_parents[k], eventData);
        }
      }
    }

    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      listener.apply(this, eventData);
    }

    var events = eventType.split(' ');
    var j;

    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];

      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];
          if (!el.dom7Listeners) el.dom7Listeners = {};
          if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var _event = events[j];
          if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
          if (!el.dom7LiveListeners[_event]) el.dom7LiveListeners[_event] = [];

          el.dom7LiveListeners[_event].push({
            listener: listener,
            proxyListener: handleLiveEvent
          });

          el.addEventListener(_event, handleLiveEvent, capture);
        }
      }
    }

    return this;
  }

  function off() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var eventType = args[0],
        targetSelector = args[1],
        listener = args[2],
        capture = args[3];

    if (typeof args[1] === 'function') {
      eventType = args[0];
      listener = args[1];
      capture = args[2];
      targetSelector = undefined;
    }

    if (!capture) capture = false;
    var events = eventType.split(' ');

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];

      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var handlers = void 0;

        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }

        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];

            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }

    return this;
  }

  function trigger() {
    var window = getWindow();

    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    var events = args[0].split(' ');
    var eventData = args[1];

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];

      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];

        if (window.CustomEvent) {
          var evt = new window.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true
          });
          el.dom7EventData = args.filter(function (data, dataIndex) {
            return dataIndex > 0;
          });
          el.dispatchEvent(evt);
          el.dom7EventData = [];
          delete el.dom7EventData;
        }
      }
    }

    return this;
  }

  function transitionEnd(callback) {
    var dom = this;

    function fireCallBack(e) {
      if (e.target !== this) return;
      callback.call(this, e);
      dom.off('transitionend', fireCallBack);
    }

    if (callback) {
      dom.on('transitionend', fireCallBack);
    }

    return this;
  }

  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var _styles = this.styles();

        return this[0].offsetWidth + parseFloat(_styles.getPropertyValue('margin-right')) + parseFloat(_styles.getPropertyValue('margin-left'));
      }

      return this[0].offsetWidth;
    }

    return null;
  }

  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var _styles2 = this.styles();

        return this[0].offsetHeight + parseFloat(_styles2.getPropertyValue('margin-top')) + parseFloat(_styles2.getPropertyValue('margin-bottom'));
      }

      return this[0].offsetHeight;
    }

    return null;
  }

  function offset() {
    if (this.length > 0) {
      var window = getWindow();
      var document = getDocument();
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = document.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === window ? window.scrollY : el.scrollTop;
      var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
      };
    }

    return null;
  }

  function styles() {
    var window = getWindow();
    if (this[0]) return window.getComputedStyle(this[0], null);
    return {};
  }

  function css(props, value) {
    var window = getWindow();
    var i;

    if (arguments.length === 1) {
      if (typeof props === 'string') {
        // .css('width')
        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
      } else {
        // .css({ width: '100px' })
        for (i = 0; i < this.length; i += 1) {
          for (var _prop in props) {
            this[i].style[_prop] = props[_prop];
          }
        }

        return this;
      }
    }

    if (arguments.length === 2 && typeof props === 'string') {
      // .css('width', '100px')
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }

      return this;
    }

    return this;
  }

  function each(callback) {
    if (!callback) return this;
    this.forEach(function (el, index) {
      callback.apply(el, [el, index]);
    });
    return this;
  }

  function filter(callback) {
    var result = arrayFilter(this, callback);
    return $(result);
  }

  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }

    return this;
  }

  function text(text) {
    if (typeof text === 'undefined') {
      return this[0] ? this[0].textContent.trim() : null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }

    return this;
  }

  function is(selector) {
    var window = getWindow();
    var document = getDocument();
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') return false;

    if (typeof selector === 'string') {
      if (el.matches) return el.matches(selector);
      if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
      if (el.msMatchesSelector) return el.msMatchesSelector(selector);
      compareWith = $(selector);

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }

      return false;
    }

    if (selector === document) {
      return el === document;
    }

    if (selector === window) {
      return el === window;
    }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }

      return false;
    }

    return false;
  }

  function index() {
    var child = this[0];
    var i;

    if (child) {
      i = 0; // eslint-disable-next-line

      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }

      return i;
    }

    return undefined;
  }

  function eq(index) {
    if (typeof index === 'undefined') return this;
    var length = this.length;

    if (index > length - 1) {
      return $([]);
    }

    if (index < 0) {
      var returnIndex = length + index;
      if (returnIndex < 0) return $([]);
      return $([this[returnIndex]]);
    }

    return $([this[index]]);
  }

  function append() {
    var newChild;
    var document = getDocument();

    for (var k = 0; k < arguments.length; k += 1) {
      newChild = k < 0 || arguments.length <= k ? undefined : arguments[k];

      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;

          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }

  function prepend(newChild) {
    var document = getDocument();
    var i;
    var j;

    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;

        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }

    return this;
  }

  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return $([this[0].nextElementSibling]);
        }

        return $([]);
      }

      if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
      return $([]);
    }

    return $([]);
  }

  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) return $([]);

    while (el.nextElementSibling) {
      var _next = el.nextElementSibling; // eslint-disable-line

      if (selector) {
        if ($(_next).is(selector)) nextEls.push(_next);
      } else nextEls.push(_next);

      el = _next;
    }

    return $(nextEls);
  }

  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];

      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return $([el.previousElementSibling]);
        }

        return $([]);
      }

      if (el.previousElementSibling) return $([el.previousElementSibling]);
      return $([]);
    }

    return $([]);
  }

  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) return $([]);

    while (el.previousElementSibling) {
      var _prev = el.previousElementSibling; // eslint-disable-line

      if (selector) {
        if ($(_prev).is(selector)) prevEls.push(_prev);
      } else prevEls.push(_prev);

      el = _prev;
    }

    return $(prevEls);
  }

  function parent(selector) {
    var parents = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }

    return $(parents);
  }

  function parents(selector) {
    var parents = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      var _parent = this[i].parentNode; // eslint-disable-line

      while (_parent) {
        if (selector) {
          if ($(_parent).is(selector)) parents.push(_parent);
        } else {
          parents.push(_parent);
        }

        _parent = _parent.parentNode;
      }
    }

    return $(parents);
  }

  function closest(selector) {
    var closest = this; // eslint-disable-line

    if (typeof selector === 'undefined') {
      return $([]);
    }

    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }

    return closest;
  }

  function find(selector) {
    var foundElements = [];

    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);

      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }

    return $(foundElements);
  }

  function children(selector) {
    var children = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].children;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector || $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }

    return $(children);
  }

  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }

    return this;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    styles: styles,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    filter: filter,
    remove: remove
  };
  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = Methods[methodName];
  });

  function deleteProps(obj) {
    var object = obj;
    Object.keys(object).forEach(function (key) {
      try {
        object[key] = null;
      } catch (e) {// no getter for object
      }

      try {
        delete object[key];
      } catch (e) {// something got wrong
      }
    });
  }

  function nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return setTimeout(callback, delay);
  }

  function now() {
    return Date.now();
  }

  function getTranslate(el, axis) {
    if (axis === void 0) {
      axis = 'x';
    }

    var window = getWindow();
    var matrix;
    var curTransform;
    var transformMatrix;
    var curStyle = window.getComputedStyle(el, null);

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;

      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function (a) {
          return a.replace(',', '.');
        }).join(', ');
      } // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case


      transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
        else curTransform = parseFloat(matrix[4]);
    }

    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
        else curTransform = parseFloat(matrix[5]);
    }

    return curTransform || 0;
  }

  function isObject$1(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  }

  function extend$1() {
    var to = Object(arguments.length <= 0 ? undefined : arguments[0]);

    for (var i = 1; i < arguments.length; i += 1) {
      var nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];

      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));

        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

          if (desc !== undefined && desc.enumerable) {
            if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
              extend$1(to[nextKey], nextSource[nextKey]);
            } else if (!isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
              to[nextKey] = {};
              extend$1(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }

    return to;
  }

  function bindModuleMethods(instance, obj) {
    Object.keys(obj).forEach(function (key) {
      if (isObject$1(obj[key])) {
        Object.keys(obj[key]).forEach(function (subKey) {
          if (typeof obj[key][subKey] === 'function') {
            obj[key][subKey] = obj[key][subKey].bind(instance);
          }
        });
      }

      instance[key] = obj[key];
    });
  }

  var support;

  function calcSupport() {
    var window = getWindow();
    var document = getDocument();
    return {
      touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
      pointerEvents: !!window.PointerEvent && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints >= 0,
      observer: function checkObserver() {
        return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
      }(),
      passiveListener: function checkPassiveListener() {
        var supportsPassive = false;

        try {
          var opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            }
          });
          window.addEventListener('testPassiveListener', null, opts);
        } catch (e) {// No support
        }

        return supportsPassive;
      }(),
      gestures: function checkGestures() {
        return 'ongesturestart' in window;
      }()
    };
  }

  function getSupport() {
    if (!support) {
      support = calcSupport();
    }

    return support;
  }

  var device;

  function calcDevice(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        userAgent = _ref.userAgent;

    var support = getSupport();
    var window = getWindow();
    var platform = window.navigator.platform;
    var ua = userAgent || window.navigator.userAgent;
    var device = {
      ios: false,
      android: false
    };
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    var windows = platform === 'Win32';
    var macos = platform === 'MacIntel'; // iPadOs 13 fix

    var iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768'];

    if (!ipad && macos && support.touch && iPadScreens.indexOf(screenWidth + "x" + screenHeight) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad) ipad = [0, 1, '13_0_0'];
      macos = false;
    } // Android


    if (android && !windows) {
      device.os = 'android';
      device.android = true;
    }

    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    } // Export object


    return device;
  }

  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    if (!device) {
      device = calcDevice(overrides);
    }

    return device;
  }

  var browser;

  function calcBrowser() {
    var window = getWindow();

    function isSafari() {
      var ua = window.navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
    }

    return {
      isEdge: !!window.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
    };
  }

  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }

    return browser;
  }

  var modular = {
    useParams: function useParams(instanceParams) {
      var instance = this;
      if (!instance.modules) return;
      Object.keys(instance.modules).forEach(function (moduleName) {
        var module = instance.modules[moduleName]; // Extend params

        if (module.params) {
          extend$1(instanceParams, module.params);
        }
      });
    },
    useModules: function useModules(modulesParams) {
      if (modulesParams === void 0) {
        modulesParams = {};
      }

      var instance = this;
      if (!instance.modules) return;
      Object.keys(instance.modules).forEach(function (moduleName) {
        var module = instance.modules[moduleName];
        var moduleParams = modulesParams[moduleName] || {}; // Add event listeners

        if (module.on && instance.on) {
          Object.keys(module.on).forEach(function (moduleEventName) {
            instance.on(moduleEventName, module.on[moduleEventName]);
          });
        } // Module create callback


        if (module.create) {
          module.create.bind(instance)(moduleParams);
        }
      });
    }
  };

  /* eslint-disable no-underscore-dangle */
  var eventsEmitter = {
    on: function on(events, handler, priority) {
      var self = this;
      if (typeof handler !== 'function') return self;
      var method = priority ? 'unshift' : 'push';
      events.split(' ').forEach(function (event) {
        if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
        self.eventsListeners[event][method](handler);
      });
      return self;
    },
    once: function once(events, handler, priority) {
      var self = this;
      if (typeof handler !== 'function') return self;

      function onceHandler() {
        self.off(events, onceHandler);

        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        handler.apply(self, args);
      }

      onceHandler.__emitterProxy = handler;
      return self.on(events, onceHandler, priority);
    },
    onAny: function onAny(handler, priority) {
      var self = this;
      if (typeof handler !== 'function') return self;
      var method = priority ? 'unshift' : 'push';

      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }

      return self;
    },
    offAny: function offAny(handler) {
      var self = this;
      if (!self.eventsAnyListeners) return self;
      var index = self.eventsAnyListeners.indexOf(handler);

      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }

      return self;
    },
    off: function off(events, handler) {
      var self = this;
      if (!self.eventsListeners) return self;
      events.split(' ').forEach(function (event) {
        if (typeof handler === 'undefined') {
          self.eventsListeners[event] = [];
        } else if (self.eventsListeners[event]) {
          self.eventsListeners[event].forEach(function (eventHandler, index) {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self.eventsListeners[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit: function emit() {
      var self = this;
      if (!self.eventsListeners) return self;
      var events;
      var data;
      var context;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (typeof args[0] === 'string' || Array.isArray(args[0])) {
        events = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }

      data.unshift(context);
      var eventsArray = Array.isArray(events) ? events : events.split(' ');
      eventsArray.forEach(function (event) {
        if (self.eventsListeners && self.eventsListeners[event]) {
          var handlers = [];
          self.eventsListeners[event].forEach(function (eventHandler) {
            handlers.push(eventHandler);
          });
          handlers.forEach(function (eventHandler) {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    }
  };

  function updateSize() {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;

    if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }

    if (typeof swiper.params.height !== 'undefined' && swiper.params.width !== null) {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }

    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    } // Subtract paddings


    width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);
    height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);
    if (Number.isNaN(width)) width = 0;
    if (Number.isNaN(height)) height = 0;
    extend$1(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height
    });
  }

  function updateSlides() {
    var swiper = this;
    var window = getWindow();
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl,
        swiperSize = swiper.size,
        rtl = swiper.rtlTranslate,
        wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    var slides = $wrapperEl.children("." + swiper.params.slideClass);
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    function slidesForMargin(slideEl, slideIndex) {
      if (!params.cssMode) return true;

      if (slideIndex === slides.length - 1) {
        return false;
      }

      return true;
    }

    var offsetBefore = params.slidesOffsetBefore;

    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;

    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;
    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;

    if (typeof swiperSize === 'undefined') {
      return;
    }

    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
    }

    swiper.virtualSize = -spaceBetween; // reset margins

    if (rtl) slides.css({
      marginLeft: '',
      marginTop: ''
    });else slides.css({
      marginRight: '',
      marginBottom: ''
    });
    var slidesNumberEvenToRows;

    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }

      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    } // Calc slides


    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);

    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);

      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = void 0;
        var column = void 0;
        var row = void 0;

        if (params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1) {
          var groupIndex = Math.floor(i / (params.slidesPerGroup * params.slidesPerColumn));
          var slideIndexInGroup = i - params.slidesPerColumn * params.slidesPerGroup * groupIndex;
          var columnsInGroup = groupIndex === 0 ? params.slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * slidesPerColumn * params.slidesPerGroup) / slidesPerColumn), params.slidesPerGroup);
          row = Math.floor(slideIndexInGroup / columnsInGroup);
          column = slideIndexInGroup - row * columnsInGroup + groupIndex * params.slidesPerGroup;
          newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
          slide.css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex
          });
        } else if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - column * slidesPerColumn;

          if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
            row += 1;

            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - row * slidesPerRow;
        }

        slide.css("margin-" + (swiper.isHorizontal() ? 'top' : 'left'), row !== 0 && params.spaceBetween && params.spaceBetween + "px");
      }

      if (slide.css('display') === 'none') continue; // eslint-disable-line

      if (params.slidesPerView === 'auto') {
        var slideStyles = window.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;
        var currentWebKitTransform = slide[0].style.webkitTransform;

        if (currentTransform) {
          slide[0].style.transform = 'none';
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = 'none';
        }

        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            var width = parseFloat(slideStyles.getPropertyValue('width') || 0);
            var paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left') || 0);
            var paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right') || 0);
            var marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left') || 0);
            var marginRight = parseFloat(slideStyles.getPropertyValue('margin-right') || 0);
            var boxSizing = slideStyles.getPropertyValue('box-sizing');

            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
            }
          } else {
            var height = parseFloat(slideStyles.getPropertyValue('height') || 0);
            var paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top') || 0);
            var paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom') || 0);
            var marginTop = parseFloat(slideStyles.getPropertyValue('margin-top') || 0);
            var marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom') || 0);

            var _boxSizing = slideStyles.getPropertyValue('box-sizing');

            if (_boxSizing && _boxSizing === 'border-box') {
              slideSize = height + marginTop + marginBottom;
            } else {
              slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
            }
          }
        }

        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }

        if (params.roundLengths) slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths) slideSize = Math.floor(slideSize);

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }

      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }

      slidesSizesGrid.push(slideSize);

      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }

    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({
        width: swiper.virtualSize + params.spaceBetween + "px"
      });
    }

    if (params.setWrapperSize) {
      if (swiper.isHorizontal()) $wrapperEl.css({
        width: swiper.virtualSize + params.spaceBetween + "px"
      });else $wrapperEl.css({
        height: swiper.virtualSize + params.spaceBetween + "px"
      });
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
      if (swiper.isHorizontal()) $wrapperEl.css({
        width: swiper.virtualSize + params.spaceBetween + "px"
      });else $wrapperEl.css({
        height: swiper.virtualSize + params.spaceBetween + "px"
      });

      if (params.centeredSlides) {
        newSlidesGrid = [];

        for (var _i = 0; _i < snapGrid.length; _i += 1) {
          var slidesGridItem = snapGrid[_i];
          if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
          if (snapGrid[_i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
        }

        snapGrid = newSlidesGrid;
      }
    } // Remove last grid elements depending on width


    if (!params.centeredSlides) {
      newSlidesGrid = [];

      for (var _i2 = 0; _i2 < snapGrid.length; _i2 += 1) {
        var _slidesGridItem = snapGrid[_i2];
        if (params.roundLengths) _slidesGridItem = Math.floor(_slidesGridItem);

        if (snapGrid[_i2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(_slidesGridItem);
        }
      }

      snapGrid = newSlidesGrid;

      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }

    if (snapGrid.length === 0) snapGrid = [0];

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) slides.filter(slidesForMargin).css({
          marginLeft: spaceBetween + "px"
        });else slides.filter(slidesForMargin).css({
          marginRight: spaceBetween + "px"
        });
      } else slides.filter(slidesForMargin).css({
        marginBottom: spaceBetween + "px"
      });
    }

    if (params.centeredSlides && params.centeredSlidesBounds) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      var maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map(function (snap) {
        if (snap < 0) return -offsetBefore;
        if (snap > maxSnap) return maxSnap + offsetAfter;
        return snap;
      });
    }

    if (params.centerInsufficientSlides) {
      var _allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        _allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      _allSlidesSize -= params.spaceBetween;

      if (_allSlidesSize < swiperSize) {
        var allSlidesOffset = (swiperSize - _allSlidesSize) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    extend$1(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }

    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) swiper.checkOverflow();
      swiper.emit('snapGridLengthChange');
    }

    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight(speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;

    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    } // Find slides currently in view


    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        swiper.visibleSlides.each(function (slide) {
          activeSlides.push(slide);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          var index = swiper.activeIndex + i;
          if (index > swiper.slides.length) break;
          activeSlides.push(swiper.slides.eq(index)[0]);
        }
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    } // Find new height from highest slide in view


    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    } // Update Height


    if (newHeight) swiper.$wrapperEl.css('height', newHeight + "px");
  }

  function updateSlidesOffset() {
    var swiper = this;
    var slides = swiper.slides;

    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress(translate) {
    if (translate === void 0) {
      translate = this && this.translate || 0;
    }

    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides,
        rtl = swiper.rtlTranslate;
    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
    var offsetCenter = -translate;
    if (rtl) offsetCenter = translate; // Visible Slides

    slides.removeClass(params.slideVisibleClass);
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + params.spaceBetween);

      if (params.watchSlidesVisibility || params.centeredSlides && params.autoHeight) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }

      slide.progress = rtl ? -slideProgress : slideProgress;
    }

    swiper.visibleSlides = $(swiper.visibleSlides);
  }

  function updateProgress(translate) {
    var swiper = this;

    if (typeof translate === 'undefined') {
      var multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

      translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }

    var params = swiper.params;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress,
        isBeginning = swiper.isBeginning,
        isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;

    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }

    extend$1(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd
    });
    if (params.watchSlidesProgress || params.watchSlidesVisibility || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }

    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }

    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses() {
    var swiper = this;
    var slides = swiper.slides,
        params = swiper.params,
        $wrapperEl = swiper.$wrapperEl,
        activeIndex = swiper.activeIndex,
        realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    slides.removeClass(params.slideActiveClass + " " + params.slideNextClass + " " + params.slidePrevClass + " " + params.slideDuplicateActiveClass + " " + params.slideDuplicateNextClass + " " + params.slideDuplicatePrevClass);
    var activeSlide;

    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find("." + params.slideClass + "[data-swiper-slide-index=\"" + activeIndex + "\"]");
    } else {
      activeSlide = slides.eq(activeIndex);
    } // Active classes


    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + realIndex + "\"]").addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + realIndex + "\"]").addClass(params.slideDuplicateActiveClass);
      }
    } // Next Slide


    var nextSlide = activeSlide.nextAll("." + params.slideClass).eq(0).addClass(params.slideNextClass);

    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    } // Prev Slide


    var prevSlide = activeSlide.prevAll("." + params.slideClass).eq(0).addClass(params.slidePrevClass);

    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }

    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + nextSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + nextSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicateNextClass);
      }

      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + prevSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + prevSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicatePrevClass);
      }
    }

    swiper.emitSlidesClasses();
  }

  function updateActiveIndex(newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid,
        snapGrid = swiper.snapGrid,
        params = swiper.params,
        previousIndex = swiper.activeIndex,
        previousRealIndex = swiper.realIndex,
        previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;

    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      } // Normalize slideIndex


      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
      }
    }

    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }

    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }

      return;
    } // Get real index


    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
    extend$1(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');

    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }

    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      swiper.emit('slideChange');
    }
  }

  function updateClickedSlide(e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest("." + params.slideClass)[0];
    var slideFound = false;

    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) slideFound = true;
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;

      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }

    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide
  };

  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? 'x' : 'y';
    }

    var swiper = this;
    var params = swiper.params,
        rtl = swiper.rtlTranslate,
        translate = swiper.translate,
        $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    if (params.cssMode) {
      return translate;
    }

    var currentTranslate = getTranslate($wrapperEl[0], axis);
    if (rtl) currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }

  function setTranslate(translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate,
        params = swiper.params,
        $wrapperEl = swiper.$wrapperEl,
        wrapperEl = swiper.wrapperEl,
        progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      $wrapperEl.transform("translate3d(" + x + "px, " + y + "px, " + z + "px)");
    }

    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate() {
    return -this.snapGrid[0];
  }

  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }

  function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
    if (translate === void 0) {
      translate = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    if (translateBounds === void 0) {
      translateBounds = true;
    }

    var swiper = this;
    var params = swiper.params,
        wrapperEl = swiper.wrapperEl;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var minTranslate = swiper.minTranslate();
    var maxTranslate = swiper.maxTranslate();
    var newTranslate;
    if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

    swiper.updateProgress(newTranslate);

    if (params.cssMode) {
      var isH = swiper.isHorizontal();

      if (speed === 0) {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          var _wrapperEl$scrollTo;

          wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, _wrapperEl$scrollTo[isH ? 'left' : 'top'] = -newTranslate, _wrapperEl$scrollTo.behavior = 'smooth', _wrapperEl$scrollTo));
        } else {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
        }
      }

      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.emit('transitionEnd');
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.emit('transitionStart');
      }

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;

            if (runCallbacks) {
              swiper.emit('transitionEnd');
            }
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
      }
    }

    return true;
  }

  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
    translateTo: translateTo
  };

  function setTransition(duration, byController) {
    var swiper = this;

    if (!swiper.params.cssMode) {
      swiper.$wrapperEl.transition(duration);
    }

    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var activeIndex = swiper.activeIndex,
        params = swiper.params,
        previousIndex = swiper.previousIndex;
    if (params.cssMode) return;

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }

      swiper.emit('slideChangeTransitionStart');

      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var activeIndex = swiper.activeIndex,
        previousIndex = swiper.previousIndex,
        params = swiper.params;
    swiper.animating = false;
    if (params.cssMode) return;
    swiper.setTransition(0);
    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }

      swiper.emit('slideChangeTransitionEnd');

      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1
  };

  function slideTo(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var slideIndex = index;
    if (slideIndex < 0) slideIndex = 0;
    var params = swiper.params,
        snapGrid = swiper.snapGrid,
        slidesGrid = swiper.slidesGrid,
        previousIndex = swiper.previousIndex,
        activeIndex = swiper.activeIndex,
        rtl = swiper.rtlTranslate,
        wrapperEl = swiper.wrapperEl;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex]; // Update progress

    swiper.updateProgress(translate); // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    } // Directions locks


    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }

      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) return false;
      }
    }

    var direction;
    if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

    if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
      swiper.updateActiveIndex(slideIndex); // Update Height

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      swiper.updateSlidesClasses();

      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }

      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }

      return false;
    }

    if (params.cssMode) {
      var isH = swiper.isHorizontal();
      var t = -translate;

      if (rtl) {
        t = wrapperEl.scrollWidth - wrapperEl.offsetWidth - t;
      }

      if (speed === 0) {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          var _wrapperEl$scrollTo;

          wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, _wrapperEl$scrollTo[isH ? 'left' : 'top'] = t, _wrapperEl$scrollTo.behavior = 'smooth', _wrapperEl$scrollTo));
        } else {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        }
      }

      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var newIndex = index;

    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideNext(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var params = swiper.params,
        animating = swiper.animating;
    var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup;

    if (params.loop) {
      if (animating && params.loopPreventsSlide) return false;
      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slidePrev(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var params = swiper.params,
        animating = swiper.animating,
        snapGrid = swiper.snapGrid,
        slidesGrid = swiper.slidesGrid,
        rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating && params.loopPreventsSlide) return false;
      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    var translate = rtlTranslate ? swiper.translate : -swiper.translate;

    function normalize(val) {
      if (val < 0) return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }

    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) {
      return normalize(val);
    });
    var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

    if (typeof prevSnap === 'undefined' && params.cssMode) {
      snapGrid.forEach(function (snap) {
        if (!prevSnap && normalizedTranslate >= snap) prevSnap = snap;
      });
    }

    var prevIndex;

    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    }

    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideReset(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    if (threshold === void 0) {
      threshold = 0.5;
    }

    var swiper = this;
    var index = swiper.activeIndex;
    var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

    if (translate >= swiper.snapGrid[snapIndex]) {
      // The current translate is on or after the current snap index, so the choice
      // is between the current index and the one after it.
      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      // The current translate is before the current snap index, so the choice
      // is between the current index and the one before it.
      var prevSnap = swiper.snapGrid[snapIndex - 1];
      var _currentSnap = swiper.snapGrid[snapIndex];

      if (translate - prevSnap <= (_currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }

    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide() {
    var swiper = this;
    var params = swiper.params,
        $wrapperEl = swiper.$wrapperEl;
    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;

    if (params.loop) {
      if (swiper.animating) return;
      realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children("." + params.slideClass + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + params.slideDuplicateClass + ")").eq(0).index();
          nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children("." + params.slideClass + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + params.slideDuplicateClass + ")").eq(0).index();
        nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide
  };

  function loopCreate() {
    var swiper = this;
    var document = getDocument();
    var params = swiper.params,
        $wrapperEl = swiper.$wrapperEl; // Remove duplicated slides

    $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass).remove();
    var slides = $wrapperEl.children("." + params.slideClass);

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(document.createElement('div')).addClass(params.slideClass + " " + params.slideBlankClass);
          $wrapperEl.append(blankNode);
        }

        slides = $wrapperEl.children("." + params.slideClass);
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
    swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
    swiper.loopedSlides += params.loopAdditionalSlides;

    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (el, index) {
      var slide = $(el);

      if (index < swiper.loopedSlides) {
        appendSlides.push(el);
      }

      if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
        prependSlides.push(el);
      }

      slide.attr('data-swiper-slide-index', index);
    });

    for (var _i = 0; _i < appendSlides.length; _i += 1) {
      $wrapperEl.append($(appendSlides[_i].cloneNode(true)).addClass(params.slideDuplicateClass));
    }

    for (var _i2 = prependSlides.length - 1; _i2 >= 0; _i2 -= 1) {
      $wrapperEl.prepend($(prependSlides[_i2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix() {
    var swiper = this;
    swiper.emit('beforeLoopFix');
    var activeIndex = swiper.activeIndex,
        slides = swiper.slides,
        loopedSlides = swiper.loopedSlides,
        allowSlidePrev = swiper.allowSlidePrev,
        allowSlideNext = swiper.allowSlideNext,
        snapGrid = swiper.snapGrid,
        rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

    if (activeIndex < loopedSlides) {
      newIndex = slides.length - loopedSlides * 3 + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if (activeIndex >= slides.length - loopedSlides) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;

      var _slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (_slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
  }

  function loopDestroy() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl,
        params = swiper.params,
        slides = swiper.slides;
    $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + ",." + params.slideClass + "." + params.slideBlankClass).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy
  };

  function setGrabCursor(moving) {
    var swiper = this;
    if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor() {
    var swiper = this;

    if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }

    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor
  };

  function appendSlide(slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl,
        params = swiper.params;

    if (params.loop) {
      swiper.loopDestroy();
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.append(slides[i]);
      }
    } else {
      $wrapperEl.append(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && swiper.support.observer)) {
      swiper.update();
    }
  }

  function prependSlide(slides) {
    var swiper = this;
    var params = swiper.params,
        $wrapperEl = swiper.$wrapperEl,
        activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }

    var newActiveIndex = activeIndex + 1;

    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.prepend(slides[i]);
      }

      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && swiper.support.observer)) {
      swiper.update();
    }

    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide(index, slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl,
        params = swiper.params,
        activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;

    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children("." + params.slideClass);
    }

    var baseLength = swiper.slides.length;

    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }

    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }

    var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
    var slidesBuffer = [];

    for (var i = baseLength - 1; i >= index; i -= 1) {
      var currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (var _i = 0; _i < slides.length; _i += 1) {
        if (slides[_i]) $wrapperEl.append(slides[_i]);
      }

      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (var _i2 = 0; _i2 < slidesBuffer.length; _i2 += 1) {
      $wrapperEl.append(slidesBuffer[_i2]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && swiper.support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide(slidesIndexes) {
    var swiper = this;
    var params = swiper.params,
        $wrapperEl = swiper.$wrapperEl,
        activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;

    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children("." + params.slideClass);
    }

    var newActiveIndex = activeIndexBuffer;
    var indexToRemove;

    if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
        if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      }

      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && swiper.support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides() {
    var swiper = this;
    var slidesIndexes = [];

    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }

    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    addSlide: addSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides
  };

  function onTouchStart(event) {
    var swiper = this;
    var document = getDocument();
    var window = getWindow();
    var data = swiper.touchEventsData;
    var params = swiper.params,
        touches = swiper.touches;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }

    var e = event;
    if (e.originalEvent) e = e.originalEvent;
    var $targetEl = $(e.target);

    if (params.touchEventsTarget === 'wrapper') {
      if (!$targetEl.closest(swiper.wrapperEl).length) return;
    }

    data.isTouchEvent = e.type === 'touchstart';
    if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
    if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
    if (data.isTouched && data.isMoved) return;

    if (params.noSwiping && $targetEl.closest(params.noSwipingSelector ? params.noSwipingSelector : "." + params.noSwipingClass)[0]) {
      swiper.allowClick = true;
      return;
    }

    if (params.swipeHandler) {
      if (!$targetEl.closest(params.swipeHandler)[0]) return;
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

    var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.screen.width - edgeSwipeThreshold)) {
      return;
    }

    extend$1(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) data.allowThresholdMove = false;

    if (e.type !== 'touchstart') {
      var preventDefault = true;
      if ($targetEl.is(data.formElements)) preventDefault = false;

      if (document.activeElement && $(document.activeElement).is(data.formElements) && document.activeElement !== $targetEl[0]) {
        document.activeElement.blur();
      }

      var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

      if (params.touchStartForcePreventDefault || shouldPreventDefault) {
        e.preventDefault();
      }
    }

    swiper.emit('touchStart', e);
  }

  function onTouchMove(event) {
    var document = getDocument();
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params,
        touches = swiper.touches,
        rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }

      return;
    }

    if (data.isTouchEvent && e.type !== 'touchmove') return;
    var targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
    var pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }

    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;

      if (data.isTouched) {
        extend$1(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }

      return;
    }

    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }

    if (data.isTouchEvent && document.activeElement) {
      if (e.target === document.activeElement && $(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }

    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }

    if (e.targetTouches && e.targetTouches.length > 1) return;
    touches.currentX = pageX;
    touches.currentY = pageY;
    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < swiper.params.threshold) return;

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;

      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }

    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }

    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }

    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }

    if (!data.startMoving) {
      return;
    }

    swiper.allowClick = false;

    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }

    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }

      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);

      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }

      data.allowMomentumBounce = false; // Grab Cursor

      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }

      swiper.emit('sliderFirstMove', e);
    }

    swiper.emit('sliderMove', e);
    data.isMoved = true;
    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) diff = -diff;
    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;
    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;

    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }

    if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    } // Directions locks


    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }

    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    } // Threshold


    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger || params.cssMode) return; // Update active index in free mode

    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime
        });
      }

      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: now()
      });
    } // Update progress


    swiper.updateProgress(data.currentTranslate); // Update translate

    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params,
        touches = swiper.touches,
        rtl = swiper.rtlTranslate,
        $wrapperEl = swiper.$wrapperEl,
        slidesGrid = swiper.slidesGrid,
        snapGrid = swiper.snapGrid;
    var e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }

    data.allowTouchCallbacks = false;

    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }

      data.isMoved = false;
      data.startMoving = false;
      return;
    } // Return Grab Cursor


    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    } // Time diff


    var touchEndTime = now();
    var timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap click', e);

      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit('doubleTap doubleClick', e);
      }
    }

    data.lastClickTime = now();
    nextTick(function () {
      if (!swiper.destroyed) swiper.allowClick = true;
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }

    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    var currentPos;

    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.cssMode) {
      return;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }

        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();
          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;

          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          } // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.


          if (time > 150 || now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }

        swiper.velocity *= params.freeModeMomentumVelocityRatio;
        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;
        var newPosition = swiper.translate + momentumDistance;
        if (rtl) newPosition = -newPosition;
        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;

        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }

            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }

          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }

            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }

          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (params.freeModeSticky) {
          var nextSlide;

          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }

          newPosition = -newPosition;
        }

        if (needsLoopFix) {
          swiper.once('transitionEnd', function () {
            swiper.loopFix();
          });
        } // Fix duration


        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }

          if (params.freeModeSticky) {
            // If freeModeSticky is active and the user ends a swipe with a slow-velocity
            // event, then durations can be 20+ seconds to slide one (or zero!) slides.
            // It's easy to see this when simulating touch with mouse events. To fix this,
            // limit single-slide swipes to the default slide duration. This also has the
            // nice side effect of matching slide speed if the user stopped moving before
            // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
            // For faster swipes, also apply limits (albeit higher ones).
            var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
            var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

            if (moveDistance < currentSlideSize) {
              momentumDuration = params.speed;
            } else if (moveDistance < 2 * currentSlideSize) {
              momentumDuration = params.speed * 1.5;
            } else {
              momentumDuration = params.speed * 2.5;
            }
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
            swiper.emit('momentumBounce');
            swiper.setTransition(params.speed);
            setTimeout(function () {
              swiper.setTranslate(afterBouncePosition);
              $wrapperEl.transitionEnd(function () {
                if (!swiper || swiper.destroyed) return;
                swiper.transitionEnd();
              });
            }, 0);
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);

          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      return;
    } // Find current slide


    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];

    for (var i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      var _increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

      if (typeof slidesGrid[i + _increment] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + _increment]) {
          stopIndex = i;
          groupSize = slidesGrid[i + _increment] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    } // Find current slide size


    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    var increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + increment);else swiper.slideTo(stopIndex);
      }

      if (swiper.swipeDirection === 'prev') {
        if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment);else swiper.slideTo(stopIndex);
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === 'next') {
          swiper.slideTo(stopIndex + increment);
        }

        if (swiper.swipeDirection === 'prev') {
          swiper.slideTo(stopIndex);
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize() {
    var swiper = this;
    var params = swiper.params,
        el = swiper.el;
    if (el && el.offsetWidth === 0) return; // Breakpoints

    if (params.breakpoints) {
      swiper.setBreakpoint();
    } // Save locks


    var allowSlideNext = swiper.allowSlideNext,
        allowSlidePrev = swiper.allowSlidePrev,
        snapGrid = swiper.snapGrid; // Disable locks on resize

    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();

    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }

    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      swiper.autoplay.run();
    } // Return locks after resize


    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick(e) {
    var swiper = this;

    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) e.preventDefault();

      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function onScroll() {
    var swiper = this;
    var wrapperEl = swiper.wrapperEl,
        rtlTranslate = swiper.rtlTranslate;
    swiper.previousTranslate = swiper.translate;

    if (swiper.isHorizontal()) {
      if (rtlTranslate) {
        swiper.translate = wrapperEl.scrollWidth - wrapperEl.offsetWidth - wrapperEl.scrollLeft;
      } else {
        swiper.translate = -wrapperEl.scrollLeft;
      }
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    } // eslint-disable-next-line


    if (swiper.translate === -0) swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }

    swiper.emit('setTranslate', swiper.translate, false);
  }

  var dummyEventAttached = false;

  function dummyEventListener() {}

  function attachEvents() {
    var swiper = this;
    var document = getDocument();
    var params = swiper.params,
        touchEvents = swiper.touchEvents,
        el = swiper.el,
        wrapperEl = swiper.wrapperEl,
        device = swiper.device,
        support = swiper.support;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);

    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);
    var capture = !!params.nested; // Touch Events

    if (!support.touch && support.pointerEvents) {
      el.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      document.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      document.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (support.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        el.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        el.addEventListener(touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
          passive: false,
          capture: capture
        } : capture);
        el.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);

        if (touchEvents.cancel) {
          el.addEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }

        if (!dummyEventAttached) {
          document.addEventListener('touchstart', dummyEventListener);
          dummyEventAttached = true;
        }
      }

      if (params.simulateTouch && !device.ios && !device.android || params.simulateTouch && !support.touch && device.ios) {
        el.addEventListener('mousedown', swiper.onTouchStart, false);
        document.addEventListener('mousemove', swiper.onTouchMove, capture);
        document.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    } // Prevent Links Clicks


    if (params.preventClicks || params.preventClicksPropagation) {
      el.addEventListener('click', swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl.addEventListener('scroll', swiper.onScroll);
    } // Resize handler


    if (params.updateOnWindowResize) {
      swiper.on(device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
    } else {
      swiper.on('observerUpdate', onResize, true);
    }
  }

  function detachEvents() {
    var swiper = this;
    var document = getDocument();
    var params = swiper.params,
        touchEvents = swiper.touchEvents,
        el = swiper.el,
        wrapperEl = swiper.wrapperEl,
        device = swiper.device,
        support = swiper.support;
    var capture = !!params.nested; // Touch Events

    if (!support.touch && support.pointerEvents) {
      el.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      document.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      document.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (support.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        el.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        el.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        el.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);

        if (touchEvents.cancel) {
          el.removeEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
      }

      if (params.simulateTouch && !device.ios && !device.android || params.simulateTouch && !support.touch && device.ios) {
        el.removeEventListener('mousedown', swiper.onTouchStart, false);
        document.removeEventListener('mousemove', swiper.onTouchMove, capture);
        document.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    } // Prevent Links Clicks


    if (params.preventClicks || params.preventClicksPropagation) {
      el.removeEventListener('click', swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl.removeEventListener('scroll', swiper.onScroll);
    } // Resize handler


    swiper.off(device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents
  };

  function setBreakpoint() {
    var swiper = this;
    var activeIndex = swiper.activeIndex,
        initialized = swiper.initialized,
        _swiper$loopedSlides = swiper.loopedSlides,
        loopedSlides = _swiper$loopedSlides === void 0 ? 0 : _swiper$loopedSlides,
        params = swiper.params,
        $el = swiper.$el;
    var breakpoints = params.breakpoints;
    if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters

    var breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;

      if (breakpointOnlyParams) {
        ['slidesPerView', 'spaceBetween', 'slidesPerGroup', 'slidesPerGroupSkip', 'slidesPerColumn'].forEach(function (param) {
          var paramValue = breakpointOnlyParams[param];
          if (typeof paramValue === 'undefined') return;

          if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
            breakpointOnlyParams[param] = 'auto';
          } else if (param === 'slidesPerView') {
            breakpointOnlyParams[param] = parseFloat(paramValue);
          } else {
            breakpointOnlyParams[param] = parseInt(paramValue, 10);
          }
        });
      }

      var breakpointParams = breakpointOnlyParams || swiper.originalParams;
      var wasMultiRow = params.slidesPerColumn > 1;
      var isMultiRow = breakpointParams.slidesPerColumn > 1;

      if (wasMultiRow && !isMultiRow) {
        $el.removeClass(params.containerModifierClass + "multirow " + params.containerModifierClass + "multirow-column");
        swiper.emitContainerClasses();
      } else if (!wasMultiRow && isMultiRow) {
        $el.addClass(params.containerModifierClass + "multirow");

        if (breakpointParams.slidesPerColumnFill === 'column') {
          $el.addClass(params.containerModifierClass + "multirow-column");
        }

        swiper.emitContainerClasses();
      }

      var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      extend$1(swiper.params, breakpointParams);
      extend$1(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });
      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }
  }

  function getBreakpoints(breakpoints) {
    var window = getWindow(); // Get breakpoint for window width

    if (!breakpoints) return undefined;
    var breakpoint = false;
    var points = Object.keys(breakpoints).map(function (point) {
      if (typeof point === 'string' && point.indexOf('@') === 0) {
        var minRatio = parseFloat(point.substr(1));
        var value = window.innerHeight * minRatio;
        return {
          value: value,
          point: point
        };
      }

      return {
        value: point,
        point: point
      };
    });
    points.sort(function (a, b) {
      return parseInt(a.value, 10) - parseInt(b.value, 10);
    });

    for (var i = 0; i < points.length; i += 1) {
      var _points$i = points[i],
          point = _points$i.point,
          value = _points$i.value;

      if (value <= window.innerWidth) {
        breakpoint = point;
      }
    }

    return breakpoint || 'max';
  }

  var breakpoints = {
    setBreakpoint: setBreakpoint,
    getBreakpoint: getBreakpoints
  };

  function addClasses() {
    var swiper = this;
    var classNames = swiper.classNames,
        params = swiper.params,
        rtl = swiper.rtl,
        $el = swiper.$el,
        device = swiper.device;
    var suffixes = [];
    suffixes.push('initialized');
    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }

    if (params.autoHeight) {
      suffixes.push('autoheight');
    }

    if (rtl) {
      suffixes.push('rtl');
    }

    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');

      if (params.slidesPerColumnFill === 'column') {
        suffixes.push('multirow-column');
      }
    }

    if (device.android) {
      suffixes.push('android');
    }

    if (device.ios) {
      suffixes.push('ios');
    }

    if (params.cssMode) {
      suffixes.push('css-mode');
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });
    $el.addClass(classNames.join(' '));
    swiper.emitContainerClasses();
  }

  function removeClasses() {
    var swiper = this;
    var $el = swiper.$el,
        classNames = swiper.classNames;
    $el.removeClass(classNames.join(' '));
    swiper.emitContainerClasses();
  }

  var classes = {
    addClasses: addClasses,
    removeClasses: removeClasses
  };

  function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
    var window = getWindow();
    var image;

    function onReady() {
      if (callback) callback();
    }

    var isPicture = $(imageEl).parent('picture')[0];

    if (!isPicture && (!imageEl.complete || !checkForComplete)) {
      if (src) {
        image = new window.Image();
        image.onload = onReady;
        image.onerror = onReady;

        if (sizes) {
          image.sizes = sizes;
        }

        if (srcset) {
          image.srcset = srcset;
        }

        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages() {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');

    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
      if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) swiper.update();
        swiper.emit('imagesReady');
      }
    }

    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages
  };

  function checkOverflow() {
    var swiper = this;
    var params = swiper.params;
    var wasLocked = swiper.isLocked;
    var lastSlidePosition = swiper.slides.length > 0 && params.slidesOffsetBefore + params.spaceBetween * (swiper.slides.length - 1) + swiper.slides[0].offsetWidth * swiper.slides.length;

    if (params.slidesOffsetBefore && params.slidesOffsetAfter && lastSlidePosition) {
      swiper.isLocked = lastSlidePosition <= swiper.size;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }

    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked; // events

    if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? 'lock' : 'unlock');

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      if (swiper.navigation) swiper.navigation.update();
    }
  }

  var checkOverflow$1 = {
    checkOverflow: checkOverflow
  };

  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: 'slide',
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: undefined,
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // Images
    preloadImages: true,
    updateOnImagesReady: true,
    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,
    loopPreventsSlide: true,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    // NS
    containerModifierClass: 'swiper-container-',
    // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false
  };

  var prototypes = {
    modular: modular,
    eventsEmitter: eventsEmitter,
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images
  };
  var extendedDefaults = {};

  var Swiper = /*#__PURE__*/function () {
    function Swiper() {
      var el;
      var params;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        el = args[0];
        params = args[1];
      }

      if (!params) params = {};
      params = extend$1({}, params);
      if (el && !params.el) params.el = el; // Swiper Instance

      var swiper = this;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      });

      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }

      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];

        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];
          if (typeof moduleParams !== 'object' || moduleParams === null) return;
          if (!(moduleParamName in params && 'enabled' in moduleParams)) return;

          if (params[moduleParamName] === true) {
            params[moduleParamName] = {
              enabled: true
            };
          }

          if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
            params[moduleParamName].enabled = true;
          }

          if (!params[moduleParamName]) params[moduleParamName] = {
            enabled: false
          };
        }
      }); // Extend defaults with modules params

      var swiperParams = extend$1({}, defaults);
      swiper.useParams(swiperParams); // Extend defaults with passed params

      swiper.params = extend$1({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = extend$1({}, swiper.params);
      swiper.passedParams = extend$1({}, params); // add event listeners

      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach(function (eventName) {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      } // Save Dom lib


      swiper.$ = $; // Find el

      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (containerEl) {
          var newParams = extend$1({}, params, {
            el: containerEl
          });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper; // Find Wrapper

      var $wrapperEl;

      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        $wrapperEl = $(el.shadowRoot.querySelector("." + swiper.params.wrapperClass)); // Children needs to return slot items

        $wrapperEl.children = function (options) {
          return $el.children(options);
        };
      } else {
        $wrapperEl = $el.children("." + swiper.params.wrapperClass);
      } // Extend Swiper


      extend$1(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],
        // Classes
        classNames: [],
        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // RTL
        rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEvents: function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];

          if (swiper.support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          }

          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
            cancel: touch[3]
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2]
          };
          return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }(),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video, label',
          // Last click time
          lastClickTime: now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      }); // Install Modules

      swiper.useModules();
      swiper.emit('_swiper'); // Init

      if (swiper.params.init) {
        swiper.init();
      } // Return app instance


      return swiper;
    }

    var _proto = Swiper.prototype;

    _proto.emitContainerClasses = function emitContainerClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var classes = swiper.el.className.split(' ').filter(function (className) {
        return className.indexOf('swiper-container') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit('_containerClasses', classes.join(' '));
    };

    _proto.emitSlidesClasses = function emitSlidesClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      swiper.slides.each(function (slideEl) {
        var classes = slideEl.className.split(' ').filter(function (className) {
          return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
        });
        swiper.emit('_slideClass', slideEl, classes.join(' '));
      });
    };

    _proto.slidesPerViewDynamic = function slidesPerViewDynamic() {
      var swiper = this;
      var params = swiper.params,
          slides = swiper.slides,
          slidesGrid = swiper.slidesGrid,
          swiperSize = swiper.size,
          activeIndex = swiper.activeIndex;
      var spv = 1;

      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;

        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }

        for (var _i = activeIndex - 1; _i >= 0; _i -= 1) {
          if (slides[_i] && !breakLoop) {
            slideSize += slides[_i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        for (var _i2 = activeIndex + 1; _i2 < slides.length; _i2 += 1) {
          if (slidesGrid[_i2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }

      return spv;
    };

    _proto.update = function update() {
      var swiper = this;
      if (!swiper || swiper.destroyed) return;
      var snapGrid = swiper.snapGrid,
          params = swiper.params; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      }

      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      var translated;

      if (swiper.params.freeMode) {
        setTranslate();

        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }

        if (!translated) {
          setTranslate();
        }
      }

      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }

      swiper.emit('update');
    };

    _proto.changeDirection = function changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }

      var swiper = this;
      var currentDirection = swiper.params.direction;

      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }

      if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
        return swiper;
      }

      swiper.$el.removeClass("" + swiper.params.containerModifierClass + currentDirection).addClass("" + swiper.params.containerModifierClass + newDirection);
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.each(function (slideEl) {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });
      swiper.emit('changeDirection');
      if (needUpdate) swiper.update();
      return swiper;
    };

    _proto.init = function init() {
      var swiper = this;
      if (swiper.initialized) return;
      swiper.emit('beforeInit'); // Set breakpoint

      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      } // Add Classes


      swiper.addClasses(); // Create loop

      if (swiper.params.loop) {
        swiper.loopCreate();
      } // Update size


      swiper.updateSize(); // Update slides

      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      } // Set Grab Cursor


      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      } // Slide To Initial Slide


      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      } // Attach events


      swiper.attachEvents(); // Init Flag

      swiper.initialized = true; // Emit

      swiper.emit('init');
    };

    _proto.destroy = function destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) {
        deleteInstance = true;
      }

      if (cleanStyles === void 0) {
        cleanStyles = true;
      }

      var swiper = this;
      var params = swiper.params,
          $el = swiper.$el,
          $wrapperEl = swiper.$wrapperEl,
          slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy'); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles


      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');

        if (slides && slides.length) {
          slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');
        }
      }

      swiper.emit('destroy'); // Detach emitter events

      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        deleteProps(swiper);
      }

      swiper.destroyed = true;
      return null;
    };

    Swiper.extendDefaults = function extendDefaults(newDefaults) {
      extend$1(extendedDefaults, newDefaults);
    };

    Swiper.installModule = function installModule(module) {
      if (!Swiper.prototype.modules) Swiper.prototype.modules = {};
      var name = module.name || Object.keys(Swiper.prototype.modules).length + "_" + now();
      Swiper.prototype.modules[name] = module;
    };

    Swiper.use = function use(module) {
      if (Array.isArray(module)) {
        module.forEach(function (m) {
          return Swiper.installModule(m);
        });
        return Swiper;
      }

      Swiper.installModule(module);
      return Swiper;
    };

    _createClass(Swiper, null, [{
      key: "extendedDefaults",
      get: function get() {
        return extendedDefaults;
      }
    }, {
      key: "defaults",
      get: function get() {
        return defaults;
      }
    }]);

    return Swiper;
  }();

  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      extend$1(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            swiper.emit('orientationchange');
          }
        }
      });
    },
    on: {
      init: function init(swiper) {
        var window = getWindow(); // Emit resize

        window.addEventListener('resize', swiper.resize.resizeHandler); // Emit orientationchange

        window.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy(swiper) {
        var window = getWindow();
        window.removeEventListener('resize', swiper.resize.resizeHandler);
        window.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      }
    }
  };

  var Observer = {
    attach: function attach(target, options) {
      if (options === void 0) {
        options = {};
      }

      var window = getWindow();
      var swiper = this;
      var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit('observerUpdate', mutations[0]);
          return;
        }

        var observerUpdate = function observerUpdate() {
          swiper.emit('observerUpdate', mutations[0]);
        };

        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(observerUpdate);
        } else {
          window.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
      });
      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;
      if (!swiper.support.observer || !swiper.params.observer) return;

      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();

        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      } // Observe container


      swiper.observer.attach(swiper.$el[0], {
        childList: swiper.params.observeSlideChildren
      }); // Observe wrapper

      swiper.observer.attach(swiper.$wrapperEl[0], {
        attributes: false
      });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    }
  };
  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        observer: _extends(_extends({}, Observer), {}, {
          observers: []
        })
      });
    },
    on: {
      init: function init(swiper) {
        swiper.observer.init();
      },
      destroy: function destroy(swiper) {
        swiper.observer.destroy();
      }
    }
  };

  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var _swiper$params = swiper.params,
          slidesPerView = _swiper$params.slidesPerView,
          slidesPerGroup = _swiper$params.slidesPerGroup,
          centeredSlides = _swiper$params.centeredSlides;
      var _swiper$params$virtua = swiper.params.virtual,
          addSlidesBefore = _swiper$params$virtua.addSlidesBefore,
          addSlidesAfter = _swiper$params$virtua.addSlidesAfter;
      var _swiper$virtual = swiper.virtual,
          previousFrom = _swiper$virtual.from,
          previousTo = _swiper$virtual.to,
          slides = _swiper$virtual.slides,
          previousSlidesGrid = _swiper$virtual.slidesGrid,
          renderSlide = _swiper$virtual.renderSlide,
          previousOffset = _swiper$virtual.offset;
      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;
      var offsetProp;
      if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
      var slidesAfter;
      var slidesBefore;

      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
        slidesBefore = slidesPerGroup + addSlidesBefore;
      }

      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
      extend$1(swiper.virtual, {
        from: from,
        to: to,
        offset: offset,
        slidesGrid: swiper.slidesGrid
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, offset + "px");
        }

        swiper.updateProgress();
        return;
      }

      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset,
          from: from,
          to: to,
          slides: function getSlides() {
            var slidesToRender = [];

            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }

            return slidesToRender;
          }()
        });

        if (swiper.params.virtual.renderExternalUpdate) {
          onRendered();
        }

        return;
      }

      var prependIndexes = [];
      var appendIndexes = [];

      if (force) {
        swiper.$wrapperEl.find("." + swiper.params.slideClass).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find("." + swiper.params.slideClass + "[data-swiper-slide-index=\"" + i + "\"]").remove();
          }
        }
      }

      for (var _i = 0; _i < slides.length; _i += 1) {
        if (_i >= from && _i <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(_i);
          } else {
            if (_i > previousTo) appendIndexes.push(_i);
            if (_i < previousFrom) prependIndexes.push(_i);
          }
        }
      }

      appendIndexes.forEach(function (index) {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort(function (a, b) {
        return b - a;
      }).forEach(function (index) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, offset + "px");
      onRendered();
    },
    renderSlide: function renderSlide(slide, index) {
      var swiper = this;
      var params = swiper.params.virtual;

      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }

      var $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $("<div class=\"" + swiper.params.slideClass + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>");
      if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
      if (params.cache) swiper.virtual.cache[index] = $slideEl;
      return $slideEl;
    },
    appendSlide: function appendSlide(slides) {
      var swiper = this;

      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) swiper.virtual.slides.push(slides[i]);
        }
      } else {
        swiper.virtual.slides.push(slides);
      }

      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slides) {
      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var newActiveIndex = activeIndex + 1;
      var numberOfNewSlides = 1;

      if (Array.isArray(slides)) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
        }

        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }

      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          var $cachedEl = cache[cachedIndex];
          var cachedElIndex = $cachedEl.attr('data-swiper-slide-index');

          if (cachedElIndex) {
            $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + 1);
          }

          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
        });
        swiper.virtual.cache = newCache;
      }

      swiper.virtual.update(true);
      swiper.slideTo(newActiveIndex, 0);
    },
    removeSlide: function removeSlide(slidesIndexes) {
      var swiper = this;
      if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
      var activeIndex = swiper.activeIndex;

      if (Array.isArray(slidesIndexes)) {
        for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);

          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }

          if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);

        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }

        if (slidesIndexes < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }

      swiper.virtual.update(true);
      swiper.slideTo(activeIndex, 0);
    },
    removeAllSlides: function removeAllSlides() {
      var swiper = this;
      swiper.virtual.slides = [];

      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }

      swiper.virtual.update(true);
      swiper.slideTo(0, 0);
    }
  };
  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        renderExternalUpdate: true,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        virtual: _extends(_extends({}, Virtual), {}, {
          slides: swiper.params.virtual.slides,
          cache: {}
        })
      });
    },
    on: {
      beforeInit: function beforeInit(swiper) {
        if (!swiper.params.virtual.enabled) return;
        swiper.classNames.push(swiper.params.containerModifierClass + "virtual");
        var overwriteParams = {
          watchSlidesProgress: true
        };
        extend$1(swiper.params, overwriteParams);
        extend$1(swiper.originalParams, overwriteParams);

        if (!swiper.params.initialSlide) {
          swiper.virtual.update();
        }
      },
      setTranslate: function setTranslate(swiper) {
        if (!swiper.params.virtual.enabled) return;
        swiper.virtual.update();
      }
    }
  };

  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var window = getWindow();
      var document = getDocument();
      var rtl = swiper.rtlTranslate;
      var e = event;
      if (e.originalEvent) e = e.originalEvent; // jquery fix

      var kc = e.keyCode || e.charCode;
      var pageUpDown = swiper.params.keyboard.pageUpDown;
      var isPageUp = pageUpDown && kc === 33;
      var isPageDown = pageUpDown && kc === 34;
      var isArrowLeft = kc === 37;
      var isArrowRight = kc === 39;
      var isArrowUp = kc === 38;
      var isArrowDown = kc === 40; // Directions locks

      if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
        return false;
      }

      if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
        return false;
      }

      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }

      if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }

      if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
        var inView = false; // Check that swiper should be inside of visible area of window

        if (swiper.$el.parents("." + swiper.params.slideClass).length > 0 && swiper.$el.parents("." + swiper.params.slideActiveClass).length === 0) {
          return undefined;
        }

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var swiperOffset = swiper.$el.offset();
        if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
        var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];

        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];

          if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
            inView = true;
          }
        }

        if (!inView) return undefined;
      }

      if (swiper.isHorizontal()) {
        if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        }

        if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
        if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
      } else {
        if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
          if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        }

        if (isPageDown || isArrowDown) swiper.slideNext();
        if (isPageUp || isArrowUp) swiper.slidePrev();
      }

      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;
      var document = getDocument();
      if (swiper.keyboard.enabled) return;
      $(document).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;
      var document = getDocument();
      if (!swiper.keyboard.enabled) return;
      $(document).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    }
  };
  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false,
        onlyInViewport: true,
        pageUpDown: true
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        keyboard: _extends({
          enabled: false
        }, Keyboard)
      });
    },
    on: {
      init: function init(swiper) {
        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy(swiper) {
        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      }
    }
  };

  function isEventSupported() {
    var document = getDocument();
    var eventName = 'onwheel';
    var isSupported = (eventName in document);

    if (!isSupported) {
      var element = document.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported && document.implementation && document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    document.implementation.hasFeature('', '') !== true) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }

  var Mousewheel = {
    lastScrollTime: now(),
    lastEventBeforeSnap: undefined,
    recentWheelEvents: [],
    event: function event() {
      var window = getWindow();
      if (window.navigator.userAgent.indexOf('firefox') > -1) return 'DOMMouseScroll';
      return isEventSupported() ? 'wheel' : 'mousewheel';
    },
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;
      var sX = 0;
      var sY = 0; // spinX, spinY

      var pX = 0;
      var pY = 0; // pixelX, pixelY
      // Legacy

      if ('detail' in e) {
        sY = e.detail;
      }

      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }

      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }

      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if (e.shiftKey && !pX) {
        // if user scrolls with shift he wants horizontal scroll
        pX = pY;
        pY = 0;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      } // Fall-back if spin cannot be determined


      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      var swiper = this;
      swiper.mouseEntered = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      var swiper = this;
      swiper.mouseEntered = false;
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (swiper.params.cssMode) {
        e.preventDefault();
      }

      var target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarget !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarget);
      }

      if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;
      if (e.originalEvent) e = e.originalEvent; // jquery fix

      var delta = 0;
      var rtlFactor = swiper.rtlTranslate ? -1 : 1;
      var data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) return true;
      if (params.invert) delta = -delta;

      if (!swiper.params.freeMode) {
        // Register the new event in a variable which stores the relevant data
        var newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta),
          raw: event
        }; // Keep the most recent events

        var recentWheelEvents = swiper.mousewheel.recentWheelEvents;

        if (recentWheelEvents.length >= 2) {
          recentWheelEvents.shift(); // only store the last N events
        }

        var prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
        recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
        //   If direction has changed or
        //   if the scroll is quicker than the previous one:
        //     Animate the slider.
        // Else (this is the first time the wheel is moved):
        //     Animate the slider.

        if (prevEvent) {
          if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
            swiper.mousewheel.animateSlider(newEvent);
          }
        } else {
          swiper.mousewheel.animateSlider(newEvent);
        } // If it's time to release the scroll:
        //   Return now so you don't hit the preventDefault.


        if (swiper.mousewheel.releaseScroll(newEvent)) {
          return true;
        }
      } else {
        // Freemode or scrollContainer:
        // If we recently snapped after a momentum scroll, then ignore wheel events
        // to give time for the deceleration to finish. Stop ignoring after 500 msecs
        // or if it's a new scroll (larger delta or inverse sign as last event before
        // an end-of-momentum snap).
        var _newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta)
        };
        var lastEventBeforeSnap = swiper.mousewheel.lastEventBeforeSnap;
        var ignoreWheelEvents = lastEventBeforeSnap && _newEvent.time < lastEventBeforeSnap.time + 500 && _newEvent.delta <= lastEventBeforeSnap.delta && _newEvent.direction === lastEventBeforeSnap.direction;

        if (!ignoreWheelEvents) {
          swiper.mousewheel.lastEventBeforeSnap = undefined;

          if (swiper.params.loop) {
            swiper.loopFix();
          }

          var position = swiper.getTranslate() + delta * params.sensitivity;
          var wasBeginning = swiper.isBeginning;
          var wasEnd = swiper.isEnd;
          if (position >= swiper.minTranslate()) position = swiper.minTranslate();
          if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
          swiper.setTransition(0);
          swiper.setTranslate(position);
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();

          if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
            swiper.updateSlidesClasses();
          }

          if (swiper.params.freeModeSticky) {
            // When wheel scrolling starts with sticky (aka snap) enabled, then detect
            // the end of a momentum scroll by storing recent (N=15?) wheel events.
            // 1. do all N events have decreasing or same (absolute value) delta?
            // 2. did all N events arrive in the last M (M=500?) msecs?
            // 3. does the earliest event have an (absolute value) delta that's
            //    at least P (P=1?) larger than the most recent event's delta?
            // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
            // If 1-4 are "yes" then we're near the end of a momuntum scroll deceleration.
            // Snap immediately and ignore remaining wheel events in this scroll.
            // See comment above for "remaining wheel events in this scroll" determination.
            // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
            clearTimeout(swiper.mousewheel.timeout);
            swiper.mousewheel.timeout = undefined;
            var _recentWheelEvents = swiper.mousewheel.recentWheelEvents;

            if (_recentWheelEvents.length >= 15) {
              _recentWheelEvents.shift(); // only store the last N events

            }

            var _prevEvent = _recentWheelEvents.length ? _recentWheelEvents[_recentWheelEvents.length - 1] : undefined;

            var firstEvent = _recentWheelEvents[0];

            _recentWheelEvents.push(_newEvent);

            if (_prevEvent && (_newEvent.delta > _prevEvent.delta || _newEvent.direction !== _prevEvent.direction)) {
              // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
              _recentWheelEvents.splice(0);
            } else if (_recentWheelEvents.length >= 15 && _newEvent.time - firstEvent.time < 500 && firstEvent.delta - _newEvent.delta >= 1 && _newEvent.delta <= 6) {
              // We're at the end of the deceleration of a momentum scroll, so there's no need
              // to wait for more events. Snap ASAP on the next tick.
              // Also, because there's some remaining momentum we'll bias the snap in the
              // direction of the ongoing scroll because it's better UX for the scroll to snap
              // in the same direction as the scroll instead of reversing to snap.  Therefore,
              // if it's already scrolled more than 20% in the current direction, keep going.
              var snapToThreshold = delta > 0 ? 0.8 : 0.2;
              swiper.mousewheel.lastEventBeforeSnap = _newEvent;

              _recentWheelEvents.splice(0);

              swiper.mousewheel.timeout = nextTick(function () {
                swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
              }, 0); // no delay; move on next tick
            }

            if (!swiper.mousewheel.timeout) {
              // if we get here, then we haven't detected the end of a momentum scroll, so
              // we'll consider a scroll "complete" when there haven't been any wheel events
              // for 500ms.
              swiper.mousewheel.timeout = nextTick(function () {
                var snapToThreshold = 0.5;
                swiper.mousewheel.lastEventBeforeSnap = _newEvent;

                _recentWheelEvents.splice(0);

                swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
              }, 500);
            }
          } // Emit event


          if (!ignoreWheelEvents) swiper.emit('scroll', e); // Stop autoplay

          if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions

          if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
        }
      }

      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      return false;
    },
    animateSlider: function animateSlider(newEvent) {
      var swiper = this;
      var window = getWindow(); // If the movement is NOT big enough and
      // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
      //   Don't go any further (avoid insignificant scroll movement).

      if (newEvent.delta >= 6 && now() - swiper.mousewheel.lastScrollTime < 60) {
        // Return false as a default
        return true;
      } // If user is scrolling towards the end:
      //   If the slider hasn't hit the latest slide or
      //   if the slider is a loop and
      //   if the slider isn't moving right now:
      //     Go to next slide and
      //     emit a scroll event.
      // Else (the user is scrolling towards the beginning) and
      // if the slider hasn't hit the first slide or
      // if the slider is a loop and
      // if the slider isn't moving right now:
      //   Go to prev slide and
      //   emit a scroll event.


      if (newEvent.direction < 0) {
        if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
          swiper.slideNext();
          swiper.emit('scroll', newEvent.raw);
        }
      } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
        swiper.slidePrev();
        swiper.emit('scroll', newEvent.raw);
      } // If you got here is because an animation has been triggered so store the current time


      swiper.mousewheel.lastScrollTime = new window.Date().getTime(); // Return false as a default

      return false;
    },
    releaseScroll: function releaseScroll(newEvent) {
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (newEvent.direction < 0) {
        if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }
      } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }

      return false;
    },
    enable: function enable() {
      var swiper = this;
      var event = Mousewheel.event();

      if (swiper.params.cssMode) {
        swiper.wrapperEl.removeEventListener(event, swiper.mousewheel.handle);
        return true;
      }

      if (!event) return false;
      if (swiper.mousewheel.enabled) return false;
      var target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarget !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarget);
      }

      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;
      var event = Mousewheel.event();

      if (swiper.params.cssMode) {
        swiper.wrapperEl.addEventListener(event, swiper.mousewheel.handle);
        return true;
      }

      if (!event) return false;
      if (!swiper.mousewheel.enabled) return false;
      var target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarget !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarget);
      }

      target.off(event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    }
  };
  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarget: 'container'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        mousewheel: {
          enabled: false,
          lastScrollTime: now(),
          lastEventBeforeSnap: undefined,
          recentWheelEvents: [],
          enable: Mousewheel.enable,
          disable: Mousewheel.disable,
          handle: Mousewheel.handle,
          handleMouseEnter: Mousewheel.handleMouseEnter,
          handleMouseLeave: Mousewheel.handleMouseLeave,
          animateSlider: Mousewheel.animateSlider,
          releaseScroll: Mousewheel.releaseScroll
        }
      });
    },
    on: {
      init: function init(swiper) {
        if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
          swiper.mousewheel.disable();
        }

        if (swiper.params.mousewheel.enabled) swiper.mousewheel.enable();
      },
      destroy: function destroy(swiper) {
        if (swiper.params.cssMode) {
          swiper.mousewheel.enable();
        }

        if (swiper.mousewheel.enabled) swiper.mousewheel.disable();
      }
    }
  };

  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;
      if (swiper.params.loop) return;
      var _swiper$navigation = swiper.navigation,
          $nextEl = _swiper$navigation.$nextEl,
          $prevEl = _swiper$navigation.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }

        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }

        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },
    onPrevClick: function onPrevClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop) return;
      swiper.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop) return;
      swiper.slideNext();
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) return;
      var $nextEl;
      var $prevEl;

      if (params.nextEl) {
        $nextEl = $(params.nextEl);

        if (swiper.params.uniqueNavElements && typeof params.nextEl === 'string' && $nextEl.length > 1 && swiper.$el.find(params.nextEl).length === 1) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }

      if (params.prevEl) {
        $prevEl = $(params.prevEl);

        if (swiper.params.uniqueNavElements && typeof params.prevEl === 'string' && $prevEl.length > 1 && swiper.$el.find(params.prevEl).length === 1) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', swiper.navigation.onNextClick);
      }

      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', swiper.navigation.onPrevClick);
      }

      extend$1(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0]
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var _swiper$navigation2 = swiper.navigation,
          $nextEl = _swiper$navigation2.$nextEl,
          $prevEl = _swiper$navigation2.$prevEl;

      if ($nextEl && $nextEl.length) {
        $nextEl.off('click', swiper.navigation.onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }

      if ($prevEl && $prevEl.length) {
        $prevEl.off('click', swiper.navigation.onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    }
  };
  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        navigation: _extends({}, Navigation)
      });
    },
    on: {
      init: function init(swiper) {
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge(swiper) {
        swiper.navigation.update();
      },
      fromEdge: function fromEdge(swiper) {
        swiper.navigation.update();
      },
      destroy: function destroy(swiper) {
        swiper.navigation.destroy();
      },
      click: function click(swiper, e) {
        var _swiper$navigation3 = swiper.navigation,
            $nextEl = _swiper$navigation3.$nextEl,
            $prevEl = _swiper$navigation3.$prevEl;

        if (swiper.params.navigation.hideOnClick && !$(e.target).is($prevEl) && !$(e.target).is($nextEl)) {
          var isHidden;

          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }

          if (isHidden === true) {
            swiper.emit('navigationShow');
          } else {
            swiper.emit('navigationHide');
          }

          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }

          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      }
    }
  };

  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el; // Current/Total

      var current;
      var total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

        if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
          current -= slidesLength - swiper.loopedSlides * 2;
        }

        if (current > total - 1) current -= total;
        if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      } // Types


      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;

        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', swiper.pagination.bulletSize * (params.dynamicMainBullets + 4) + "px");

          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += current - swiper.previousIndex;

            if (swiper.pagination.dynamicBulletIndex > params.dynamicMainBullets - 1) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }

          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }

        bullets.removeClass(params.bulletActiveClass + " " + params.bulletActiveClass + "-next " + params.bulletActiveClass + "-next-next " + params.bulletActiveClass + "-prev " + params.bulletActiveClass + "-prev-prev " + params.bulletActiveClass + "-main");

        if ($el.length > 1) {
          bullets.each(function (bullet) {
            var $bullet = $(bullet);
            var bulletIndex = $bullet.index();

            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }

            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(params.bulletActiveClass + "-main");
              }

              if (bulletIndex === firstIndex) {
                $bullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
              }

              if (bulletIndex === lastIndex) {
                $bullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          var bulletIndex = $bullet.index();
          $bullet.addClass(params.bulletActiveClass);

          if (params.dynamicBullets) {
            var $firstDisplayedBullet = bullets.eq(firstIndex);
            var $lastDisplayedBullet = bullets.eq(lastIndex);

            for (var i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(params.bulletActiveClass + "-main");
            }

            if (swiper.params.loop) {
              if (bulletIndex >= bullets.length - params.dynamicMainBullets) {
                for (var _i = params.dynamicMainBullets; _i >= 0; _i -= 1) {
                  bullets.eq(bullets.length - _i).addClass(params.bulletActiveClass + "-main");
                }

                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(params.bulletActiveClass + "-prev");
              } else {
                $firstDisplayedBullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
                $lastDisplayedBullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
              }
            } else {
              $firstDisplayedBullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
              $lastDisplayedBullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
            }
          }
        }

        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (swiper.pagination.bulletSize * dynamicBulletsLength - swiper.pagination.bulletSize) / 2 - midIndex * swiper.pagination.bulletSize;
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', bulletsOffset + "px");
        }
      }

      if (params.type === 'fraction') {
        $el.find("." + params.currentClass).text(params.formatFractionCurrent(current + 1));
        $el.find("." + params.totalClass).text(params.formatFractionTotal(total));
      }

      if (params.type === 'progressbar') {
        var progressbarDirection;

        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }

        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;

        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }

        $el.find("." + params.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")").transition(swiper.params.speed);
      }

      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', $el[0]);
      } else {
        swiper.emit('paginationUpdate', $el[0]);
      }

      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      var paginationHTML = '';

      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<" + params.bulletElement + " class=\"" + params.bulletClass + "\"></" + params.bulletElement + ">";
          }
        }

        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find("." + params.bulletClass);
      }

      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"" + params.currentClass + "\"></span>" + ' / ' + ("<span class=\"" + params.totalClass + "\"></span>");
        }

        $el.html(paginationHTML);
      }

      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"" + params.progressbarFillClass + "\"></span>";
        }

        $el.html(paginationHTML);
      }

      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el) return;
      var $el = $(params.el);
      if ($el.length === 0) return;

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass("" + params.modifierClass + params.type + "-dynamic");
        swiper.pagination.dynamicBulletIndex = 0;

        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }

      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', "." + params.bulletClass, function onClick(e) {
          e.preventDefault();
          var index = $(this).index() * swiper.params.slidesPerGroup;
          if (swiper.params.loop) index += swiper.loopedSlides;
          swiper.slideTo(index);
        });
      }

      extend$1(swiper.pagination, {
        $el: $el,
        el: $el[0]
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) return;
      var $el = swiper.pagination.$el;
      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      if (swiper.pagination.bullets) swiper.pagination.bullets.removeClass(params.bulletActiveClass);

      if (params.clickable) {
        $el.off('click', "." + params.bulletClass);
      }
    }
  };
  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets',
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: function formatFractionCurrent(number) {
          return number;
        },
        formatFractionTotal: function formatFractionTotal(number) {
          return number;
        },
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-',
        // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable',
        // NEW
        lockClass: 'swiper-pagination-lock'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        pagination: _extends({
          dynamicBulletIndex: 0
        }, Pagination)
      });
    },
    on: {
      init: function init(swiper) {
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange(swiper) {
        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange(swiper) {
        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange(swiper) {
        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange(swiper) {
        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy(swiper) {
        swiper.pagination.destroy();
      },
      click: function click(swiper, e) {
        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && swiper.pagination.$el.length > 0 && !$(e.target).hasClass(swiper.params.pagination.bulletClass)) {
          var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);

          if (isHidden === true) {
            swiper.emit('paginationShow');
          } else {
            swiper.emit('paginationHide');
          }

          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      }
    }
  };

  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      var scrollbar = swiper.scrollbar,
          rtl = swiper.rtlTranslate,
          progress = swiper.progress;
      var dragSize = scrollbar.dragSize,
          trackSize = scrollbar.trackSize,
          $dragEl = scrollbar.$dragEl,
          $el = scrollbar.$el;
      var params = swiper.params.scrollbar;
      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;

      if (rtl) {
        newPos = -newPos;

        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }

      if (swiper.isHorizontal()) {
        $dragEl.transform("translate3d(" + newPos + "px, 0, 0)");
        $dragEl[0].style.width = newSize + "px";
      } else {
        $dragEl.transform("translate3d(0px, " + newPos + "px, 0)");
        $dragEl[0].style.height = newSize + "px";
      }

      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl,
          $el = scrollbar.$el;
      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize;

      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + "px";
      } else {
        $dragEl[0].style.height = dragSize + "px";
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }

      if (swiper.params.scrollbar.hide) {
        $el[0].style.opacity = 0;
      }

      extend$1(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },
    getPointerPosition: function getPointerPosition(e) {
      var swiper = this;

      if (swiper.isHorizontal()) {
        return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientX : e.clientX;
      }

      return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientY : e.clientY;
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar,
          rtl = swiper.rtlTranslate;
      var $el = scrollbar.$el,
          dragSize = scrollbar.dragSize,
          trackSize = scrollbar.trackSize,
          dragStartPos = scrollbar.dragStartPos;
      var positionRatio;
      positionRatio = (scrollbar.getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);

      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar,
          $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el,
          $dragEl = scrollbar.$dragEl;
      swiper.scrollbar.isTouched = true;
      swiper.scrollbar.dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? scrollbar.getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
      e.preventDefault();
      e.stopPropagation();
      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);
      clearTimeout(swiper.scrollbar.dragTimeout);
      $el.transition(0);

      if (params.hide) {
        $el.css('opacity', 1);
      }

      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css('scroll-snap-type', 'none');
      }

      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar,
          $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el,
          $dragEl = scrollbar.$dragEl;
      if (!swiper.scrollbar.isTouched) return;
      if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar,
          $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      if (!swiper.scrollbar.isTouched) return;
      swiper.scrollbar.isTouched = false;

      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css('scroll-snap-type', '');
        $wrapperEl.transition('');
      }

      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }

      swiper.emit('scrollbarDragEnd', e);

      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) return;
      var document = getDocument();
      var scrollbar = swiper.scrollbar,
          touchEventsTouch = swiper.touchEventsTouch,
          touchEventsDesktop = swiper.touchEventsDesktop,
          params = swiper.params,
          support = swiper.support;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = support.passiveListener && params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      var passiveListener = support.passiveListener && params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;

      if (!support.touch) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        document.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        document.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) return;
      var document = getDocument();
      var scrollbar = swiper.scrollbar,
          touchEventsTouch = swiper.touchEventsTouch,
          touchEventsDesktop = swiper.touchEventsDesktop,
          params = swiper.params,
          support = swiper.support;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = support.passiveListener && params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      var passiveListener = support.passiveListener && params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;

      if (!support.touch) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        document.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        document.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) return;
      var scrollbar = swiper.scrollbar,
          $swiperEl = swiper.$el;
      var params = swiper.params.scrollbar;
      var $el = $(params.el);

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find("." + swiper.params.scrollbar.dragClass);

      if ($dragEl.length === 0) {
        $dragEl = $("<div class=\"" + swiper.params.scrollbar.dragClass + "\"></div>");
        $el.append($dragEl);
      }

      extend$1(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0]
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    }
  };
  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        scrollbar: _extends({
          isTouched: false,
          timeout: null,
          dragTimeout: null
        }, Scrollbar)
      });
    },
    on: {
      init: function init(swiper) {
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update(swiper) {
        swiper.scrollbar.updateSize();
      },
      resize: function resize(swiper) {
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate(swiper) {
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate(swiper) {
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(swiper, duration) {
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy(swiper) {
        swiper.scrollbar.destroy();
      }
    }
  };

  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;
      var $el = $(el);
      var rtlFactor = rtl ? -1 : 1;
      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if (x.indexOf('%') >= 0) {
        x = parseInt(x, 10) * progress * rtlFactor + "%";
      } else {
        x = x * progress * rtlFactor + "px";
      }

      if (y.indexOf('%') >= 0) {
        y = parseInt(y, 10) * progress + "%";
      } else {
        y = y * progress + "px";
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
        $el[0].style.opacity = currentOpacity;
      }

      if (typeof scale === 'undefined' || scale === null) {
        $el.transform("translate3d(" + x + ", " + y + ", 0px)");
      } else {
        var currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
        $el.transform("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")");
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el,
          slides = swiper.slides,
          progress = swiper.progress,
          snapGrid = swiper.snapGrid;
      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (el) {
        swiper.parallax.setTransform(el, progress);
      });
      slides.each(function (slideEl, slideIndex) {
        var slideProgress = slideEl.progress;

        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
        }

        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (el) {
          swiper.parallax.setTransform(el, slideProgress);
        });
      });
    },
    setTransition: function setTransition(duration) {
      if (duration === void 0) {
        duration = this.params.speed;
      }

      var swiper = this;
      var $el = swiper.$el;
      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (parallaxEl) {
        var $parallaxEl = $(parallaxEl);
        var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
        if (duration === 0) parallaxDuration = 0;
        $parallaxEl.transition(parallaxDuration);
      });
    }
  };
  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        parallax: _extends({}, Parallax)
      });
    },
    on: {
      beforeInit: function beforeInit(swiper) {
        if (!swiper.params.parallax.enabled) return;
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      init: function init(swiper) {
        if (!swiper.params.parallax.enabled) return;
        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate(swiper) {
        if (!swiper.params.parallax.enabled) return;
        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(swiper, duration) {
        if (!swiper.params.parallax.enabled) return;
        swiper.parallax.setTransition(duration);
      }
    }
  };

  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) return 1;
      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return distance;
    },
    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var support = swiper.support;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;

      if (!support.gestures) {
        if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
          return;
        }

        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }

      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest("." + swiper.params.slideClass);
        if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }

      if (gesture.$imageEl) {
        gesture.$imageEl.transition(0);
      }

      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var support = swiper.support;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (!support.gestures) {
        if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
          return;
        }

        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        if (e.type === 'gesturechange') zoom.onGestureStart(e);
        return;
      }

      if (support.gestures) {
        zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = gesture.scaleMove / gesture.scaleStart * zoom.currentScale;
      }

      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = gesture.maxRatio - 1 + Math.pow(zoom.scale - gesture.maxRatio + 1, 0.5);
      }

      if (zoom.scale < params.minRatio) {
        zoom.scale = params.minRatio + 1 - Math.pow(params.minRatio - zoom.scale + 1, 0.5);
      }

      gesture.$imageEl.transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var device = swiper.device;
      var support = swiper.support;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (!support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }

        if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !device.android) {
          return;
        }

        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;
      if (zoom.scale === 1) gesture.$slideEl = undefined;
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var device = swiper.device;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture,
          image = zoom.image;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      if (image.isTouched) return;
      if (device.android && e.cancelable) e.preventDefault();
      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture,
          image = zoom.image,
          velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      swiper.allowClick = false;
      if (!image.isTouched || !gesture.$slideEl) return;

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);

        if (swiper.rtl) {
          image.startX = -image.startX;
          image.startY = -image.startY;
        }
      } // Define if we need image drag


      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
          image.isTouched = false;
          return;
        }

        if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
          image.isTouched = false;
          return;
        }
      }

      if (e.cancelable) {
        e.preventDefault();
      }

      e.stopPropagation();
      image.isMoved = true;
      image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
      image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = image.minX + 1 - Math.pow(image.minX - image.currentX + 1, 0.8);
      }

      if (image.currentX > image.maxX) {
        image.currentX = image.maxX - 1 + Math.pow(image.currentX - image.maxX + 1, 0.8);
      }

      if (image.currentY < image.minY) {
        image.currentY = image.minY + 1 - Math.pow(image.minY - image.currentY + 1, 0.8);
      }

      if (image.currentY > image.maxY) {
        image.currentY = image.maxY - 1 + Math.pow(image.currentY - image.maxY + 1, 0.8);
      } // Velocity


      if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
      if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
      if (!velocity.prevTime) velocity.prevTime = Date.now();
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();
      gesture.$imageWrapEl.transform("translate3d(" + image.currentX + "px, " + image.currentY + "px,0)");
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture,
          image = zoom.image,
          velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }

      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY; // Fix duration

      if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
      if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
      image.currentX = newPositionX;
      image.currentY = newPositionY; // Define if we need image drag

      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
      gesture.$imageWrapEl.transition(momentumDuration).transform("translate3d(" + image.currentX + "px, " + image.currentY + "px,0)");
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        if (gesture.$imageEl) {
          gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        }

        if (gesture.$imageWrapEl) {
          gesture.$imageWrapEl.transform('translate3d(0,0,0)');
        }

        zoom.scale = 1;
        zoom.currentScale = 1;
        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;
      }
    },
    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function _in(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture,
          image = zoom.image;

      if (!gesture.$slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.$slideEl = swiper.$wrapperEl.children("." + swiper.params.slideActiveClass);
        } else {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }

        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      gesture.$slideEl.addClass("" + params.zoomedSlideClass);
      var touchX;
      var touchY;
      var offsetX;
      var offsetY;
      var diffX;
      var diffY;
      var translateX;
      var translateY;
      var imageWidth;
      var imageHeight;
      var scaledWidth;
      var scaledHeight;
      var translateMinX;
      var translateMinY;
      var translateMaxX;
      var translateMaxY;
      var slideWidth;
      var slideHeight;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = offsetX + slideWidth / 2 - touchX;
        diffY = offsetY + slideHeight / 2 - touchY;
        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;
        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;
        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }

        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }

        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }

      gesture.$imageWrapEl.transition(300).transform("translate3d(" + translateX + "px, " + translateY + "px,0)");
      gesture.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
    },
    out: function out() {
      var swiper = this;
      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;

      if (!gesture.$slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.$slideEl = swiper.$wrapperEl.children("." + swiper.params.slideActiveClass);
        } else {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }

        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass("" + params.zoomedSlideClass);
      gesture.$slideEl = undefined;
    },
    toggleGestures: function toggleGestures(method) {
      var swiper = this;
      var zoom = swiper.zoom;
      var selector = zoom.slideSelector,
          passive = zoom.passiveListener;
      swiper.$wrapperEl[method]('gesturestart', selector, zoom.onGestureStart, passive);
      swiper.$wrapperEl[method]('gesturechange', selector, zoom.onGestureChange, passive);
      swiper.$wrapperEl[method]('gestureend', selector, zoom.onGestureEnd, passive);
    },
    enableGestures: function enableGestures() {
      if (this.zoom.gesturesEnabled) return;
      this.zoom.gesturesEnabled = true;
      this.zoom.toggleGestures('on');
    },
    disableGestures: function disableGestures() {
      if (!this.zoom.gesturesEnabled) return;
      this.zoom.gesturesEnabled = false;
      this.zoom.toggleGestures('off');
    },
    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var support = swiper.support;
      var zoom = swiper.zoom;
      if (zoom.enabled) return;
      zoom.enabled = true;
      var passiveListener = swiper.touchEvents.start === 'touchstart' && support.passiveListener && swiper.params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      var activeListenerWithCapture = support.passiveListener ? {
        passive: false,
        capture: true
      } : true;
      var slideSelector = "." + swiper.params.slideClass;
      swiper.zoom.passiveListener = passiveListener;
      swiper.zoom.slideSelector = slideSelector; // Scale image

      if (support.gestures) {
        swiper.$wrapperEl.on(swiper.touchEvents.start, swiper.zoom.enableGestures, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.end, swiper.zoom.disableGestures, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
        swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);

        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
        }
      } // Move image


      swiper.$wrapperEl.on(swiper.touchEvents.move, "." + swiper.params.zoom.containerClass, zoom.onTouchMove, activeListenerWithCapture);
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (!zoom.enabled) return;
      var support = swiper.support;
      swiper.zoom.enabled = false;
      var passiveListener = swiper.touchEvents.start === 'touchstart' && support.passiveListener && swiper.params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      var activeListenerWithCapture = support.passiveListener ? {
        passive: false,
        capture: true
      } : true;
      var slideSelector = "." + swiper.params.slideClass; // Scale image

      if (support.gestures) {
        swiper.$wrapperEl.off(swiper.touchEvents.start, swiper.zoom.enableGestures, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.end, swiper.zoom.disableGestures, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
        swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);

        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
        }
      } // Move image


      swiper.$wrapperEl.off(swiper.touchEvents.move, "." + swiper.params.zoom.containerClass, zoom.onTouchMove, activeListenerWithCapture);
    }
  };
  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        zoom: _extends({
          enabled: false,
          scale: 1,
          currentScale: 1,
          isScaling: false,
          gesture: {
            $slideEl: undefined,
            slideWidth: undefined,
            slideHeight: undefined,
            $imageEl: undefined,
            $imageWrapEl: undefined,
            maxRatio: 3
          },
          image: {
            isTouched: undefined,
            isMoved: undefined,
            currentX: undefined,
            currentY: undefined,
            minX: undefined,
            minY: undefined,
            maxX: undefined,
            maxY: undefined,
            width: undefined,
            height: undefined,
            startX: undefined,
            startY: undefined,
            touchesStart: {},
            touchesCurrent: {}
          },
          velocity: {
            x: undefined,
            y: undefined,
            prevPositionX: undefined,
            prevPositionY: undefined,
            prevTime: undefined
          }
        }, Zoom)
      });
      var scale = 1;
      Object.defineProperty(swiper.zoom, 'scale', {
        get: function get() {
          return scale;
        },
        set: function set(value) {
          if (scale !== value) {
            var imageEl = swiper.zoom.gesture.$imageEl ? swiper.zoom.gesture.$imageEl[0] : undefined;
            var slideEl = swiper.zoom.gesture.$slideEl ? swiper.zoom.gesture.$slideEl[0] : undefined;
            swiper.emit('zoomChange', value, imageEl, slideEl);
          }

          scale = value;
        }
      });
    },
    on: {
      init: function init(swiper) {
        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy(swiper) {
        swiper.zoom.disable();
      },
      touchStart: function touchStart(swiper, e) {
        if (!swiper.zoom.enabled) return;
        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(swiper, e) {
        if (!swiper.zoom.enabled) return;
        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(swiper, e) {
        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd(swiper) {
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      },
      slideChange: function slideChange(swiper) {
        if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
          swiper.zoom.onTransitionEnd();
        }
      }
    }
  };

  var Lazy = {
    loadInSlide: function loadInSlide(index, loadInDuplicate) {
      if (loadInDuplicate === void 0) {
        loadInDuplicate = true;
      }

      var swiper = this;
      var params = swiper.params.lazy;
      if (typeof index === 'undefined') return;
      if (swiper.slides.length === 0) return;
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var $slideEl = isVirtual ? swiper.$wrapperEl.children("." + swiper.params.slideClass + "[data-swiper-slide-index=\"" + index + "\"]") : swiper.slides.eq(index);
      var $images = $slideEl.find("." + params.elementClass + ":not(." + params.loadedClass + "):not(." + params.loadingClass + ")");

      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images.push($slideEl[0]);
      }

      if ($images.length === 0) return;
      $images.each(function (imageEl) {
        var $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);
        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');
        var $pictureEl = $imageEl.parent('picture');
        swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;

          if (background) {
            $imageEl.css('background-image', "url(\"" + background + "\")");
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }

            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }

            if ($pictureEl.length) {
              $pictureEl.children('source').each(function (sourceEl) {
                var $source = $(sourceEl);

                if ($source.attr('data-srcset')) {
                  $source.attr('srcset', $source.attr('data-srcset'));
                  $source.removeAttr('data-srcset');
                }
              });
            }

            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find("." + params.preloaderClass).remove();

          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + swiper.params.slideDuplicateClass + ")");
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children("." + swiper.params.slideDuplicateClass + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]");
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }

          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);

          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        });
        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl,
          swiperParams = swiper.params,
          slides = swiper.slides,
          activeIndex = swiper.activeIndex;
      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;
      var slidesPerView = swiperParams.slidesPerView;

      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if ($wrapperEl.children("." + swiperParams.slideClass + "[data-swiper-slide-index=\"" + index + "\"]").length) {
            return true;
          }
        } else if (slides[index]) return true;

        return false;
      }

      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr('data-swiper-slide-index');
        }

        return $(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) swiper.lazy.initialImageLoaded = true;

      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children("." + swiperParams.slideVisibleClass).each(function (slideEl) {
          var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
          swiper.lazy.loadInSlide(index);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) swiper.lazy.loadInSlide(i);
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }

      if (params.loadPrevNext) {
        if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

          for (var _i = activeIndex + slidesPerView; _i < maxIndex; _i += 1) {
            if (slideExist(_i)) swiper.lazy.loadInSlide(_i);
          } // Prev Slides


          for (var _i2 = minIndex; _i2 < activeIndex; _i2 += 1) {
            if (slideExist(_i2)) swiper.lazy.loadInSlide(_i2);
          }
        } else {
          var nextSlide = $wrapperEl.children("." + swiperParams.slideNextClass);
          if (nextSlide.length > 0) swiper.lazy.loadInSlide(slideIndex(nextSlide));
          var prevSlide = $wrapperEl.children("." + swiperParams.slidePrevClass);
          if (prevSlide.length > 0) swiper.lazy.loadInSlide(slideIndex(prevSlide));
        }
      }
    }
  };
  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,
        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        lazy: _extends({
          initialImageLoaded: false
        }, Lazy)
      });
    },
    on: {
      beforeInit: function beforeInit(swiper) {
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init(swiper) {
        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll(swiper) {
        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize(swiper) {
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove(swiper) {
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart(swiper) {
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd(swiper) {
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      },
      slideChange: function slideChange(swiper) {
        if (swiper.params.lazy.enabled && swiper.params.cssMode) {
          swiper.lazy.load();
        }
      }
    }
  };

  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = function search() {
        var maxIndex;
        var minIndex;
        var guess;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;

          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;

            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }

          return maxIndex;
        };
      }();

      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.

      var i1;
      var i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

        return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
      };

      return this;
    },
    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;

      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(_setTranslate, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier;
      var controlledTranslate;
      var Swiper = swiper.constructor;

      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;

        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out

          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }

        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }

      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var Swiper = swiper.constructor;
      var controlled = swiper.controller.control;
      var i;

      function setControlledTransition(c) {
        c.setTransition(duration, swiper);

        if (duration !== 0) {
          c.transitionStart();

          if (c.params.autoHeight) {
            nextTick(function () {
              c.updateAutoHeight();
            });
          }

          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) return;

            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }

            c.transitionEnd();
          });
        }
      }

      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    }
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide' // or 'container'

      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        controller: _extends({
          control: swiper.params.controller.control
        }, Controller)
      });
    },
    on: {
      update: function update(swiper) {
        if (!swiper.controller.control) return;

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize(swiper) {
        if (!swiper.controller.control) return;

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate(swiper) {
        if (!swiper.controller.control) return;

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(swiper, translate, byController) {
        if (!swiper.controller.control) return;
        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(swiper, duration, byController) {
        if (!swiper.controller.control) return;
        swiper.controller.setTransition(duration, byController);
      }
    }
  };

  var A11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    makeElNotFocusable: function makeElNotFocusable($el) {
      $el.attr('tabIndex', '-1');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;
      if (e.keyCode !== 13) return;
      var $targetEl = $(e.target);

      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }

        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }

      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }

        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }

      if (swiper.pagination && $targetEl.is("." + swiper.params.pagination.bulletClass)) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;
      if (notification.length === 0) return;
      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;
      if (swiper.params.loop || !swiper.navigation) return;
      var _swiper$navigation = swiper.navigation,
          $nextEl = _swiper$navigation.$nextEl,
          $prevEl = _swiper$navigation.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
          swiper.a11y.makeElNotFocusable($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
          swiper.a11y.makeElFocusable($prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
          swiper.a11y.makeElNotFocusable($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
          swiper.a11y.makeElFocusable($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;

      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletEl) {
          var $bulletEl = $(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;
      swiper.$el.append(swiper.a11y.liveRegion); // Navigation

      var params = swiper.params.a11y;
      var $nextEl;
      var $prevEl;

      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }

      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }

      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }

      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      } // Pagination


      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', "." + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) swiper.a11y.liveRegion.remove();
      var $nextEl;
      var $prevEl;

      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }

      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }

      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }

      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      } // Pagination


      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', "." + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
      }
    }
  };
  var A11y$1 = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        a11y: _extends(_extends({}, A11y), {}, {
          liveRegion: $("<span class=\"" + swiper.params.a11y.notificationClass + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")
        })
      });
    },
    on: {
      init: function init(swiper) {
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge(swiper) {
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge(swiper) {
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate(swiper) {
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.updatePagination();
      },
      destroy: function destroy(swiper) {
        if (!swiper.params.a11y.enabled) return;
        swiper.a11y.destroy();
      }
    }
  };

  var History = {
    init: function init() {
      var swiper = this;
      var window = getWindow();
      if (!swiper.params.history) return;

      if (!window.history || !window.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }

      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues(swiper.params.url);
      if (!history.paths.key && !history.paths.value) return;
      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);

      if (!swiper.params.history.replaceState) {
        window.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      var window = getWindow();

      if (!swiper.params.history.replaceState) {
        window.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues(swiper.params.url);
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues(urlOverride) {
      var window = getWindow();
      var location;

      if (urlOverride) {
        location = new URL(urlOverride);
      } else {
        location = window.location;
      }

      var pathArray = location.pathname.slice(1).split('/').filter(function (part) {
        return part !== '';
      });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return {
        key: key,
        value: value
      };
    },
    setHistory: function setHistory(key, index) {
      var swiper = this;
      var window = getWindow();
      if (!swiper.history.initialized || !swiper.params.history.enabled) return;
      var location;

      if (swiper.params.url) {
        location = new URL(swiper.params.url);
      } else {
        location = window.location;
      }

      var slide = swiper.slides.eq(index);
      var value = History.slugify(slide.attr('data-history'));

      if (!location.pathname.includes(key)) {
        value = key + "/" + value;
      }

      var currentState = window.history.state;

      if (currentState && currentState.value === value) {
        return;
      }

      if (swiper.params.history.replaceState) {
        window.history.replaceState({
          value: value
        }, null, value);
      } else {
        window.history.pushState({
          value: value
        }, null, value);
      }
    },
    slugify: function slugify(text) {
      return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;

      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHistory = History.slugify(slide.attr('data-history'));

          if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    }
  };
  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        history: _extends({}, History)
      });
    },
    on: {
      init: function init(swiper) {
        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy(swiper) {
        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd(swiper) {
        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
      slideChange: function slideChange(swiper) {
        if (swiper.history.initialized && swiper.params.cssMode) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      }
    }
  };

  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      var document = getDocument();
      swiper.emit('hashChange');
      var newHash = document.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');

      if (newHash !== activeSlideHash) {
        var newIndex = swiper.$wrapperEl.children("." + swiper.params.slideClass + "[data-hash=\"" + newHash + "\"]").index();
        if (typeof newIndex === 'undefined') return;
        swiper.slideTo(newIndex);
      }
    },
    setHash: function setHash() {
      var swiper = this;
      var window = getWindow();
      var document = getDocument();
      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) return;

      if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
        window.history.replaceState(null, null, "#" + swiper.slides.eq(swiper.activeIndex).attr('data-hash') || '');
        swiper.emit('hashSet');
      } else {
        var slide = swiper.slides.eq(swiper.activeIndex);
        var hash = slide.attr('data-hash') || slide.attr('data-history');
        document.location.hash = hash || '';
        swiper.emit('hashSet');
      }
    },
    init: function init() {
      var swiper = this;
      var document = getDocument();
      var window = getWindow();
      if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
      swiper.hashNavigation.initialized = true;
      var hash = document.location.hash.replace('#', '');

      if (hash) {
        var speed = 0;

        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHash = slide.attr('data-hash') || slide.attr('data-history');

          if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }

      if (swiper.params.hashNavigation.watchState) {
        $(window).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      var window = getWindow();

      if (swiper.params.hashNavigation.watchState) {
        $(window).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    }
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        hashNavigation: _extends({
          initialized: false
        }, HashNavigation)
      });
    },
    on: {
      init: function init(swiper) {
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy(swiper) {
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd(swiper) {
        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      },
      slideChange: function slideChange(swiper) {
        if (swiper.hashNavigation.initialized && swiper.params.cssMode) {
          swiper.hashNavigation.setHash();
        }
      }
    }
  };

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;

      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }

      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = nextTick(function () {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }

        if (swiper.params.cssMode && swiper.autoplay.running) swiper.autoplay.run();
      }, delay);
    },
    start: function start() {
      var swiper = this;
      if (typeof swiper.autoplay.timeout !== 'undefined') return false;
      if (swiper.autoplay.running) return false;
      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;
      if (!swiper.autoplay.running) return false;
      if (typeof swiper.autoplay.timeout === 'undefined') return false;

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }

      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;
      if (!swiper.autoplay.running) return;
      if (swiper.autoplay.paused) return;
      if (swiper.autoplay.timeout) clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.paused = true;

      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    },
    onVisibilityChange: function onVisibilityChange() {
      var swiper = this;
      var document = getDocument();

      if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
        swiper.autoplay.pause();
      }

      if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
        swiper.autoplay.run();
        swiper.autoplay.paused = false;
      }
    },
    onTransitionEnd: function onTransitionEnd(e) {
      var swiper = this;
      if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
      if (e.target !== swiper.$wrapperEl[0]) return;
      swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
      swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      swiper.autoplay.paused = false;

      if (!swiper.autoplay.running) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.run();
      }
    }
  };
  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        autoplay: _extends(_extends({}, Autoplay), {}, {
          running: false,
          paused: false
        })
      });
    },
    on: {
      init: function init(swiper) {
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
          var document = getDocument();
          document.addEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
        }
      },
      beforeTransitionStart: function beforeTransitionStart(swiper, speed, internal) {
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove(swiper) {
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      touchEnd: function touchEnd(swiper) {
        if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.run();
        }
      },
      destroy: function destroy(swiper) {
        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }

        var document = getDocument();
        document.removeEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
      }
    }
  };

  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;
        if (!swiper.params.virtualTranslate) tx -= swiper.translate;
        var ty = 0;

        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }

        var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl.css({
          opacity: slideOpacity
        }).transform("translate3d(" + tx + "px, " + ty + "px, 0px)");
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides,
          $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration);

      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  };
  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        fadeEffect: _extends({}, Fade)
      });
    },
    on: {
      beforeInit: function beforeInit(swiper) {
        if (swiper.params.effect !== 'fade') return;
        swiper.classNames.push(swiper.params.containerModifierClass + "fade");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        extend$1(swiper.params, overwriteParams);
        extend$1(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate(swiper) {
        if (swiper.params.effect !== 'fade') return;
        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(swiper, duration) {
        if (swiper.params.effect !== 'fade') return;
        swiper.fadeEffect.setTransition(duration);
      }
    }
  };

  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el,
          $wrapperEl = swiper.$wrapperEl,
          slides = swiper.slides,
          swiperWidth = swiper.width,
          swiperHeight = swiper.height,
          rtl = swiper.rtlTranslate,
          swiperSize = swiper.size,
          browser = swiper.browser;
      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl;

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');

          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }

          $cubeShadowEl.css({
            height: swiperWidth + "px"
          });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');

          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;

        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }

        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);

        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }

        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;

        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + round * 4 * swiperSize;
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = 3 * swiperSize + swiperSize * 4 * round;
        }

        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";

        if (progress <= 1 && progress > -1) {
          wrapperRotate = slideIndex * 90 + progress * 90;
          if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
        }

        $slideEl.transform(transform);

        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if (shadowBefore.length === 0) {
            shadowBefore = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
            $slideEl.append(shadowBefore);
          }

          if (shadowAfter.length === 0) {
            shadowAfter = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append(shadowAfter);
          }

          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        }
      }

      $wrapperEl.css({
        '-webkit-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        '-moz-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        '-ms-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        'transform-origin': "50% 50% -" + swiperSize / 2 + "px"
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform("translate3d(0px, " + (swiperWidth / 2 + params.shadowOffset) + "px, " + -swiperWidth / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + params.shadowScale + ")");
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
          var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset = params.shadowOffset;
          $cubeShadowEl.transform("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + (swiperHeight / 2 + offset) + "px, " + -swiperHeight / 2 / scale2 + "px) rotateX(-90deg)");
        }
      }

      var zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
      $wrapperEl.transform("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)");
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el,
          slides = swiper.slides;
      slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    }
  };
  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        cubeEffect: _extends({}, Cube)
      });
    },
    on: {
      beforeInit: function beforeInit(swiper) {
        if (swiper.params.effect !== 'cube') return;
        swiper.classNames.push(swiper.params.containerModifierClass + "cube");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true
        };
        extend$1(swiper.params, overwriteParams);
        extend$1(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate(swiper) {
        if (swiper.params.effect !== 'cube') return;
        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(swiper, duration) {
        if (swiper.params.effect !== 'cube') return;
        swiper.cubeEffect.setTransition(duration);
      }
    }
  };

  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides,
          rtl = swiper.rtlTranslate;

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;

        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }

        var offset = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset;
        var ty = 0;

        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if (shadowBefore.length === 0) {
            shadowBefore = $("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>");
            $slideEl.append(shadowBefore);
          }

          if (shadowAfter.length === 0) {
            shadowAfter = $("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append(shadowAfter);
          }

          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        }

        $slideEl.transform("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides,
          activeIndex = swiper.activeIndex,
          $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false; // eslint-disable-next-line

        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return; // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;

          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  };
  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        flipEffect: _extends({}, Flip)
      });
    },
    on: {
      beforeInit: function beforeInit(swiper) {
        if (swiper.params.effect !== 'flip') return;
        swiper.classNames.push(swiper.params.containerModifierClass + "flip");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        extend$1(swiper.params, overwriteParams);
        extend$1(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate(swiper) {
        if (swiper.params.effect !== 'flip') return;
        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(swiper, duration) {
        if (swiper.params.effect !== 'flip') return;
        swiper.flipEffect.setTransition(duration);
      }
    }
  };

  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width,
          swiperHeight = swiper.height,
          slides = swiper.slides,
          slidesSizesGrid = swiper.slidesSizesGrid;
      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform = swiper.translate;
      var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth; // Each slide offset from center

      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;
        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

        var translateZ = -translate * Math.abs(offsetMultiplier);
        var stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

        if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
          stretch = parseFloat(params.stretch) / 100 * slideSize;
        }

        var translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
        var translateX = isHorizontal ? stretch * offsetMultiplier : 0;
        var scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

        if (Math.abs(translateX) < 0.001) translateX = 0;
        if (Math.abs(translateY) < 0.001) translateY = 0;
        if (Math.abs(translateZ) < 0.001) translateZ = 0;
        if (Math.abs(rotateY) < 0.001) rotateY = 0;
        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        if (Math.abs(scale) < 0.001) scale = 0;
        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(" + scale + ")";
        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
            $slideEl.append($shadowBeforeEl);
          }

          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append($shadowAfterEl);
          }

          if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
        }
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
    }
  };
  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: true
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        coverflowEffect: _extends({}, Coverflow)
      });
    },
    on: {
      beforeInit: function beforeInit(swiper) {
        if (swiper.params.effect !== 'coverflow') return;
        swiper.classNames.push(swiper.params.containerModifierClass + "coverflow");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate(swiper) {
        if (swiper.params.effect !== 'coverflow') return;
        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(swiper, duration) {
        if (swiper.params.effect !== 'coverflow') return;
        swiper.coverflowEffect.setTransition(duration);
      }
    }
  };

  var Thumbs = {
    init: function init() {
      var swiper = this;
      var thumbsParams = swiper.params.thumbs;
      if (swiper.thumbs.initialized) return false;
      swiper.thumbs.initialized = true;
      var SwiperClass = swiper.constructor;

      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        extend$1(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
        extend$1(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
      } else if (isObject$1(thumbsParams.swiper)) {
        swiper.thumbs.swiper = new SwiperClass(extend$1({}, thumbsParams.swiper, {
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          slideToClickedSlide: false
        }));
        swiper.thumbs.swiperCreated = true;
      }

      swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
      return true;
    },
    onThumbClick: function onThumbClick() {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) return;
      var clickedIndex = thumbsSwiper.clickedIndex;
      var clickedSlide = thumbsSwiper.clickedSlide;
      if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
      if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
      var slideToIndex;

      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      } else {
        slideToIndex = clickedIndex;
      }

      if (swiper.params.loop) {
        var currentIndex = swiper.activeIndex;

        if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
          swiper.loopFix(); // eslint-disable-next-line

          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          currentIndex = swiper.activeIndex;
        }

        var prevIndex = swiper.slides.eq(currentIndex).prevAll("[data-swiper-slide-index=\"" + slideToIndex + "\"]").eq(0).index();
        var nextIndex = swiper.slides.eq(currentIndex).nextAll("[data-swiper-slide-index=\"" + slideToIndex + "\"]").eq(0).index();
        if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;
      }

      swiper.slideTo(slideToIndex);
    },
    update: function update(initial) {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) return;
      var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
      var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
      var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;

      if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
        var currentThumbsIndex = thumbsSwiper.activeIndex;
        var newThumbsIndex;
        var direction;

        if (thumbsSwiper.params.loop) {
          if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
            thumbsSwiper.loopFix(); // eslint-disable-next-line

            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
            currentThumbsIndex = thumbsSwiper.activeIndex;
          } // Find actual thumbs index to slide to


          var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll("[data-swiper-slide-index=\"" + swiper.realIndex + "\"]").eq(0).index();
          var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll("[data-swiper-slide-index=\"" + swiper.realIndex + "\"]").eq(0).index();
          if (typeof prevThumbsIndex === 'undefined') newThumbsIndex = nextThumbsIndex;else if (typeof nextThumbsIndex === 'undefined') newThumbsIndex = prevThumbsIndex;else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) newThumbsIndex = currentThumbsIndex;else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) newThumbsIndex = nextThumbsIndex;else newThumbsIndex = prevThumbsIndex;
          direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
        } else {
          newThumbsIndex = swiper.realIndex;
          direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
        }

        if (useOffset) {
          newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
        }

        if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - slidesPerView + 1;
          }

          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      } // Activate thumbs


      var thumbsToActivate = 1;
      var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }

      if (!swiper.params.thumbs.multipleActiveThumbs) {
        thumbsToActivate = 1;
      }

      thumbsToActivate = Math.floor(thumbsToActivate);
      thumbsSwiper.slides.removeClass(thumbActiveClass);

      if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
        for (var i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.$wrapperEl.children("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]").addClass(thumbActiveClass);
        }
      } else {
        for (var _i = 0; _i < thumbsToActivate; _i += 1) {
          thumbsSwiper.slides.eq(swiper.realIndex + _i).addClass(thumbActiveClass);
        }
      }
    }
  };
  var Thumbs$1 = {
    name: 'thumbs',
    params: {
      thumbs: {
        swiper: null,
        multipleActiveThumbs: true,
        autoScrollOffset: 0,
        slideThumbActiveClass: 'swiper-slide-thumb-active',
        thumbsContainerClass: 'swiper-container-thumbs'
      }
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        thumbs: _extends({
          swiper: null,
          initialized: false
        }, Thumbs)
      });
    },
    on: {
      beforeInit: function beforeInit(swiper) {
        var thumbs = swiper.params.thumbs;
        if (!thumbs || !thumbs.swiper) return;
        swiper.thumbs.init();
        swiper.thumbs.update(true);
      },
      slideChange: function slideChange(swiper) {
        if (!swiper.thumbs.swiper) return;
        swiper.thumbs.update();
      },
      update: function update(swiper) {
        if (!swiper.thumbs.swiper) return;
        swiper.thumbs.update();
      },
      resize: function resize(swiper) {
        if (!swiper.thumbs.swiper) return;
        swiper.thumbs.update();
      },
      observerUpdate: function observerUpdate(swiper) {
        if (!swiper.thumbs.swiper) return;
        swiper.thumbs.update();
      },
      setTransition: function setTransition(swiper, duration) {
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) return;
        thumbsSwiper.setTransition(duration);
      },
      beforeDestroy: function beforeDestroy(swiper) {
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) return;

        if (swiper.thumbs.swiperCreated && thumbsSwiper) {
          thumbsSwiper.destroy();
        }
      }
    }
  };

  // Swiper Class
  var components = [Resize, Observer$1, Virtual$1, Keyboard$1, Mousewheel$1, Navigation$1, Pagination$1, Scrollbar$1, Parallax$1, Zoom$1, Lazy$1, Controller$1, A11y$1, History$1, HashNavigation$1, Autoplay$1, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs$1];
  Swiper.use(components);

  return Swiper;

})));
//# sourceMappingURL=swiper-bundle.js.map;
/*! lozad.js - v1.15.0 - 2020-07-24
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2020 Apoorv Saxena; Licensed MIT */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lozad=e()}(this,function(){"use strict";
/**
   * Detect IE browser
   * @const {boolean}
   * @private
   */var u="undefined"!=typeof document&&document.documentMode,f={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=document.createElement("img");u&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(e.alt=t.getAttribute("data-alt")),t.append(e)}if("video"===t.nodeName.toLowerCase()&&!t.getAttribute("data-src")&&t.children){for(var r=t.children,a=void 0,o=0;o<=r.length-1;o++)(a=r[o].getAttribute("data-src"))&&(r[o].src=a);t.load()}t.getAttribute("data-poster")&&(t.poster=t.getAttribute("data-poster")),t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset"));var i=",";if(t.getAttribute("data-background-delimiter")&&(i=t.getAttribute("data-background-delimiter")),t.getAttribute("data-background-image"))t.style.backgroundImage="url('"+t.getAttribute("data-background-image").split(i).join("'),url('")+"')";else if(t.getAttribute("data-background-image-set")){var n=t.getAttribute("data-background-image-set").split(i),d=n[0].substr(0,n[0].indexOf(" "))||n[0];// Substring before ... 1x
d=-1===d.indexOf("url(")?"url("+d+")":d,1===n.length?t.style.backgroundImage=d:t.setAttribute("style",(t.getAttribute("style")||"")+"background-image: "+d+"; background-image: -webkit-image-set("+n+"); background-image: image-set("+n+")")}t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};function A(t){t.setAttribute("data-loaded",!0)}var m=function(t){return"true"===t.getAttribute("data-loaded")},v=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:e.querySelectorAll(t)};return function(){var r,a,o=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=Object.assign({},f,t),i=e.root,n=e.rootMargin,d=e.threshold,u=e.load,g=e.loaded,s=void 0;"undefined"!=typeof window&&window.IntersectionObserver&&(s=new IntersectionObserver((r=u,a=g,function(t,e){t.forEach(function(t){(0<t.intersectionRatio||t.isIntersecting)&&(e.unobserve(t.target),m(t.target)||(r(t.target),A(t.target),a(t.target)))})}),{root:i,rootMargin:n,threshold:d}));for(var c,l=v(o,i),b=0;b<l.length;b++)(c=l[b]).getAttribute("data-placeholder-background")&&(c.style.background=c.getAttribute("data-placeholder-background"));return{observe:function(){for(var t=v(o,i),e=0;e<t.length;e++)m(t[e])||(s?s.observe(t[e]):(u(t[e]),A(t[e]),g(t[e])))},triggerLoad:function(t){m(t)||(u(t),A(t),g(t))},observer:s}}});
;
/* !
* tingle.js
* @author  robin_parisi
* @version 0.15.2
* @url
*/

/* global define,module */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.tingle = factory()
  }
}(this, function () {
  /* ----------------------------------------------------------- */
  /* == modal */
  /* ----------------------------------------------------------- */

  var isBusy = false

  function Modal (options) {
    var defaults = {
      onClose: null,
      onOpen: null,
      beforeOpen: null,
      beforeClose: null,
      stickyFooter: false,
      footer: false,
      cssClass: [],
      closeLabel: 'Close',
      closeMethods: ['overlay', 'button', 'escape']
    }

    // extends config
    this.opts = extend({}, defaults, options)

    // init modal
    this.init()
  }

  Modal.prototype.init = function () {
    if (this.modal) {
      return
    }

    _build.call(this)
    _bindEvents.call(this)

    // insert modal in dom
    document.body.appendChild(this.modal, document.body.firstChild)

    if (this.opts.footer) {
      this.addFooter()
    }

    return this
  }

  Modal.prototype._busy = function (state) {
    isBusy = state
  }

  Modal.prototype._isBusy = function () {
    return isBusy
  }

  Modal.prototype.destroy = function () {
    if (this.modal === null) {
      return
    }

    // restore scrolling
    if (this.isOpen()) {
      this.close(true)
    }

    // unbind all events
    _unbindEvents.call(this)

    // remove modal from dom
    this.modal.parentNode.removeChild(this.modal)

    this.modal = null
  }

  Modal.prototype.isOpen = function () {
    return !!this.modal.classList.contains('tingle-modal--visible')
  }

  Modal.prototype.open = function () {
    if (this._isBusy()) return
    this._busy(true)

    var self = this

    // before open callback
    if (typeof self.opts.beforeOpen === 'function') {
      self.opts.beforeOpen()
    }

    if (this.modal.style.removeProperty) {
      this.modal.style.removeProperty('display')
    } else {
      this.modal.style.removeAttribute('display')
    }

    // prevent double scroll
    this._scrollPosition = window.pageYOffset
    document.body.classList.add('tingle-enabled')
    document.body.style.top = -this._scrollPosition + 'px'

    // sticky footer
    this.setStickyFooter(this.opts.stickyFooter)

    // show modal
    this.modal.classList.add('tingle-modal--visible')

    // onOpen callback
    if (typeof self.opts.onOpen === 'function') {
      self.opts.onOpen.call(self)
    }

    self._busy(false)

    // check if modal is bigger than screen height
    this.checkOverflow()

    return this
  }

  Modal.prototype.close = function (force) {
    if (this._isBusy()) return
    this._busy(true)
    force = force || false

    //  before close
    if (typeof this.opts.beforeClose === 'function') {
      var close = this.opts.beforeClose.call(this)
      if (!close) {
        this._busy(false)
        return
      }
    }

    document.body.classList.remove('tingle-enabled')
    document.body.style.top = null
    window.scrollTo({
      top: this._scrollPosition,
      behavior: 'instant'
    })

    this.modal.classList.remove('tingle-modal--visible')

    // using similar setup as onOpen
    var self = this

    self.modal.style.display = 'none'

    // onClose callback
    if (typeof self.opts.onClose === 'function') {
      self.opts.onClose.call(this)
    }

    // release modal
    self._busy(false)
  }

  Modal.prototype.setContent = function (content) {
    // check type of content : String or Node
    if (typeof content === 'string') {
      this.modalBoxContent.innerHTML = content
    } else {
      this.modalBoxContent.innerHTML = ''
      this.modalBoxContent.appendChild(content)
    }

    if (this.isOpen()) {
      // check if modal is bigger than screen height
      this.checkOverflow()
    }

    return this
  }

  Modal.prototype.getContent = function () {
    return this.modalBoxContent
  }

  Modal.prototype.addFooter = function () {
    // add footer to modal
    _buildFooter.call(this)

    return this
  }

  Modal.prototype.setFooterContent = function (content) {
    // set footer content
    this.modalBoxFooter.innerHTML = content

    return this
  }

  Modal.prototype.getFooterContent = function () {
    return this.modalBoxFooter
  }

  Modal.prototype.setStickyFooter = function (isSticky) {
    // if the modal is smaller than the viewport height, we don't need sticky
    if (!this.isOverflow()) {
      isSticky = false
    }

    if (isSticky) {
      if (this.modalBox.contains(this.modalBoxFooter)) {
        this.modalBox.removeChild(this.modalBoxFooter)
        this.modal.appendChild(this.modalBoxFooter)
        this.modalBoxFooter.classList.add('tingle-modal-box__footer--sticky')
        _recalculateFooterPosition.call(this)
        this.modalBoxContent.style['padding-bottom'] = this.modalBoxFooter.clientHeight + 20 + 'px'
      }
    } else if (this.modalBoxFooter) {
      if (!this.modalBox.contains(this.modalBoxFooter)) {
        this.modal.removeChild(this.modalBoxFooter)
        this.modalBox.appendChild(this.modalBoxFooter)
        this.modalBoxFooter.style.width = 'auto'
        this.modalBoxFooter.style.left = ''
        this.modalBoxContent.style['padding-bottom'] = ''
        this.modalBoxFooter.classList.remove('tingle-modal-box__footer--sticky')
      }
    }

    return this
  }

  Modal.prototype.addFooterBtn = function (label, cssClass, callback) {
    var btn = document.createElement('button')

    // set label
    btn.innerHTML = label

    // bind callback
    btn.addEventListener('click', callback)

    if (typeof cssClass === 'string' && cssClass.length) {
      // add classes to btn
      cssClass.split(' ').forEach(function (item) {
        btn.classList.add(item)
      })
    }

    this.modalBoxFooter.appendChild(btn)

    return btn
  }

  Modal.prototype.resize = function () {
    // eslint-disable-next-line no-console
    console.warn('Resize is deprecated and will be removed in version 1.0')
  }

  Modal.prototype.isOverflow = function () {
    var viewportHeight = window.innerHeight
    var modalHeight = this.modalBox.clientHeight

    return modalHeight >= viewportHeight
  }

  Modal.prototype.checkOverflow = function () {
    // only if the modal is currently shown
    if (this.modal.classList.contains('tingle-modal--visible')) {
      if (this.isOverflow()) {
        this.modal.classList.add('tingle-modal--overflow')
      } else {
        this.modal.classList.remove('tingle-modal--overflow')
      }

      // tODO: remove offset
      // _offset.call(this);
      if (!this.isOverflow() && this.opts.stickyFooter) {
        this.setStickyFooter(false)
      } else if (this.isOverflow() && this.opts.stickyFooter) {
        _recalculateFooterPosition.call(this)
        this.setStickyFooter(true)
      }
    }
  }

  /* ----------------------------------------------------------- */
  /* == private methods */
  /* ----------------------------------------------------------- */

  function closeIcon () {
    return '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.3 9.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3L5 6.4l3.3 3.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L6.4 5l3.3-3.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L5 3.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L3.6 5 .3 8.3c-.4.4-.4 1 0 1.4z" fill="#000" fill-rule="nonzero"/></svg>'
  }

  function _recalculateFooterPosition () {
    if (!this.modalBoxFooter) {
      return
    }
    this.modalBoxFooter.style.width = this.modalBox.clientWidth + 'px'
    this.modalBoxFooter.style.left = this.modalBox.offsetLeft + 'px'
  }

  function _build () {
    // wrapper
    this.modal = document.createElement('div')
    this.modal.classList.add('tingle-modal')

    // remove cusor if no overlay close method
    if (this.opts.closeMethods.length === 0 || this.opts.closeMethods.indexOf('overlay') === -1) {
      this.modal.classList.add('tingle-modal--noOverlayClose')
    }

    this.modal.style.display = 'none'

    // custom class
    this.opts.cssClass.forEach(function (item) {
      if (typeof item === 'string') {
        this.modal.classList.add(item)
      }
    }, this)

    // close btn
    if (this.opts.closeMethods.indexOf('button') !== -1) {
      this.modalCloseBtn = document.createElement('button')
      this.modalCloseBtn.type = 'button'
      this.modalCloseBtn.classList.add('tingle-modal__close')

      this.modalCloseBtnIcon = document.createElement('span')
      this.modalCloseBtnIcon.classList.add('tingle-modal__closeIcon')
      this.modalCloseBtnIcon.innerHTML = closeIcon()

      this.modalCloseBtnLabel = document.createElement('span')
      this.modalCloseBtnLabel.classList.add('tingle-modal__closeLabel')
      this.modalCloseBtnLabel.innerHTML = this.opts.closeLabel

      this.modalCloseBtn.appendChild(this.modalCloseBtnIcon)
      this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)
    }

    // modal
    this.modalBox = document.createElement('div')
    this.modalBox.classList.add('tingle-modal-box')

    // modal box content
    this.modalBoxContent = document.createElement('div')
    this.modalBoxContent.classList.add('tingle-modal-box__content')

    this.modalBox.appendChild(this.modalBoxContent)

    if (this.opts.closeMethods.indexOf('button') !== -1) {
      this.modal.appendChild(this.modalCloseBtn)
    }

    this.modal.appendChild(this.modalBox)
  }

  function _buildFooter () {
    this.modalBoxFooter = document.createElement('div')
    this.modalBoxFooter.classList.add('tingle-modal-box__footer')
    this.modalBox.appendChild(this.modalBoxFooter)
  }

  function _bindEvents () {
    this._events = {
      clickCloseBtn: this.close.bind(this),
      clickOverlay: _handleClickOutside.bind(this),
      resize: this.checkOverflow.bind(this),
      keyboardNav: _handleKeyboardNav.bind(this)
    }

    if (this.opts.closeMethods.indexOf('button') !== -1) {
      this.modalCloseBtn.addEventListener('click', this._events.clickCloseBtn)
    }

    this.modal.addEventListener('mousedown', this._events.clickOverlay)
    window.addEventListener('resize', this._events.resize)
    document.addEventListener('keydown', this._events.keyboardNav)
  }

  function _handleKeyboardNav (event) {
    // escape key
    if (this.opts.closeMethods.indexOf('escape') !== -1 && event.which === 27 && this.isOpen()) {
      this.close()
    }
  }

  function _handleClickOutside (event) {
    // on macOS, click on scrollbar (hidden mode) will trigger close event so we need to bypass this behavior by detecting scrollbar mode
    var scrollbarWidth = this.modal.offsetWidth - this.modal.clientWidth
    var clickedOnScrollbar = event.clientX >= this.modal.offsetWidth - 15 // 15px is macOS scrollbar default width
    var isScrollable = this.modal.scrollHeight !== this.modal.offsetHeight
    if (navigator.platform === 'MacIntel' && scrollbarWidth === 0 && clickedOnScrollbar && isScrollable) {
      return
    }

    // if click is outside the modal
    if (this.opts.closeMethods.indexOf('overlay') !== -1 && !_findAncestor(event.target, 'tingle-modal') &&
        event.clientX < this.modal.clientWidth) {
      this.close()
    }
  }

  function _findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el
  }

  function _unbindEvents () {
    if (this.opts.closeMethods.indexOf('button') !== -1) {
      this.modalCloseBtn.removeEventListener('click', this._events.clickCloseBtn)
    }
    this.modal.removeEventListener('mousedown', this._events.clickOverlay)
    window.removeEventListener('resize', this._events.resize)
    document.removeEventListener('keydown', this._events.keyboardNav)
  }

  /* ----------------------------------------------------------- */
  /* == helpers */
  /* ----------------------------------------------------------- */

  function extend () {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key]
        }
      }
    }
    return arguments[0]
  }

  /* ----------------------------------------------------------- */
  /* == return */
  /* ----------------------------------------------------------- */

  return {
    modal: Modal
  }
}))
;
/*!
 * dist/inputmask
 * <%= pkg.homepage %>
 * Copyright (c) 2010 - <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>
 * Licensed under the <%= pkg.license %> license
 * Version: <%= pkg.version %>
 */
!function webpackUniversalModuleDefinition(root, factory) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = factory(require("jqlite")); else if ("function" == typeof define && define.amd) define([ "jqlite" ], factory); else {
      var a = "object" == typeof exports ? factory(require("jqlite")) : factory(root.jqlite);
      for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i];
  }
}(window, function(__WEBPACK_EXTERNAL_MODULE__9__) {
  return modules = [ function(module) {
      module.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17,"KEY_229":229}');
  }, function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      var escapeRegexRegex = new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ].join("|\\") + ")", "gim");
      __webpack_exports__.a = function(str) {
          return str.replace(escapeRegexRegex, "\\$1");
      };
  }, function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_exports__.a = "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window;
  }, function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      var getPrototypeOf = __webpack_require__(6), keycode = __webpack_require__(0);
      function getLocator(tst, align) {
          var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
          if ("" !== locator) for (;locator.length < align; ) locator += "0";
          return locator;
      }
      function getDecisionTaker(tst) {
          var decisionTaker = tst.locator[tst.alternation];
          return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), 
          void 0 !== decisionTaker ? decisionTaker.toString() : "";
      }
      function getPlaceholder(pos, test, returnPL) {
          var inputmask = this, opts = this.opts, maskset = this.maskset;
          if (test = test || getTest.call(this, pos).match, void 0 !== test.placeholder || !0 === returnPL) return "function" == typeof test.placeholder ? test.placeholder(opts) : test.placeholder;
          if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
          if (-1 < pos && void 0 === maskset.validPositions[pos]) {
              var tests = getTests.call(this, pos), staticAlternations = [], prevTest;
              if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if ("" !== tests[i].match.def && !0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), 
              !0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
          }
          return test.def;
      }
      function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
          var inputmask = this, opts = this.opts, maskset = this.maskset, greedy = opts.greedy;
          clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
          var maskTemplate = [], ndxIntlzr, pos = 0, test, testPos, jitRenderStatic;
          do {
              if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], 
              test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)); else {
                  testPos = getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), test = testPos.match, 
                  ndxIntlzr = testPos.locator.slice();
                  var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
                  jitRenderStatic = jitRenderStatic && test.static && test.def !== opts.groupSeparator && null === test.fn || maskset.validPositions[pos - 1] && test.static && test.def !== opts.groupSeparator && null === test.fn, 
                  jitRenderStatic || !1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking ? maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)) : jitRenderStatic = !1;
              }
              pos++;
          } while ((void 0 === this.maxLength || pos < this.maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);
          return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), 
          opts.greedy = greedy, maskTemplate;
      }
      function getTestTemplate(pos, ndxIntlzr, tstPs) {
          var inputmask = this, maskset = this.maskset;
          return maskset.validPositions[pos] || determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
      }
      function determineTestTemplate(pos, tests) {
          var inputmask = this, opts = this.opts;
          pos = 0 < pos ? pos - 1 : 0;
          for (var altTest = getTest.call(this, pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
              var tst = tests[ndx];
              tstLocator = getLocator(tst, targetLocator.length);
              var distance = Math.abs(tstLocator - targetLocator);
              (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, 
              bestMatch = tst);
          }
          return bestMatch;
      }
      function getTest(pos, tests) {
          var inputmask = this, maskset = this.maskset;
          return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests.call(this, pos))[0];
      }
      function getTests(pos, ndxIntlzr, tstPs) {
          var inputmask = this, $ = this.dependencyLib, maskset = this.maskset, opts = this.opts, el = this.el, maskTokens = maskset.maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = !1, latestMatch, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
          function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
              function handleMatch(match, loopNdx, quantifierRecurse) {
                  function isFirstMatch(latestMatch, tokenGroup) {
                      var firstMatch = 0 === tokenGroup.matches.indexOf(latestMatch);
                      return firstMatch || tokenGroup.matches.every(function(match, ndx) {
                          return !0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), 
                          !firstMatch;
                      }), firstMatch;
                  }
                  function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                      var bestMatch, indexPos;
                      if ((maskset.tests[pos] || maskset.validPositions[pos]) && (maskset.tests[pos] || [ maskset.validPositions[pos] ]).every(function(lmnt, ndx) {
                          if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                          var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation, ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                          return (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, 
                          indexPos = ndxPos), !0;
                      }), bestMatch) {
                          var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation], locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                          return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1);
                      }
                      return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0;
                  }
                  function isSubsetOf(source, target) {
                      function expand(pattern) {
                          for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end; ) expanded.push(String.fromCharCode(start)); else start = pattern.charCodeAt(i), 
                          expanded.push(pattern.charAt(i));
                          return expanded.join("");
                      }
                      return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")));
                  }
                  function staticCanMatchDefinition(source, target) {
                      return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1);
                  }
                  function setMergeLocators(targetMatch, altMatch) {
                      var alternationNdx = targetMatch.alternation, shouldMerge = void 0 === altMatch || alternationNdx === altMatch.alternation && -1 === targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]);
                      if (!shouldMerge && alternationNdx > altMatch.alternation) for (var i = altMatch.alternation; i < alternationNdx; i++) if (targetMatch.locator[i] !== altMatch.locator[i]) {
                          alternationNdx = i, shouldMerge = !0;
                          break;
                      }
                      if (shouldMerge) {
                          targetMatch.mloc = targetMatch.mloc || {};
                          var locNdx = targetMatch.locator[alternationNdx];
                          if (void 0 !== locNdx) {
                              if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), 
                              void 0 !== altMatch) {
                                  for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), 
                                  void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                                  targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
                              }
                              return !0;
                          }
                          targetMatch.alternation = void 0;
                      }
                      return !1;
                  }
                  function isSameLevel(targetMatch, altMatch) {
                      if (targetMatch.locator.length !== altMatch.locator.length) return !1;
                      for (var locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) return !1;
                      return !0;
                  }
                  if (testPos > pos + opts._maxTestPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
                  if (testPos === pos && void 0 === match.matches) return matches.push({
                      match: match,
                      locator: loopNdx.reverse(),
                      cd: cacheDependency,
                      mloc: {}
                  }), !0;
                  if (void 0 !== match.matches) {
                      if (match.isGroup && quantifierRecurse !== match) {
                          if (match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse), 
                          match) return !0;
                      } else if (match.isOptional) {
                          var optionalToken = match, mtchsNdx = matches.length;
                          if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), 
                          match) {
                              if (matches.forEach(function(mtch, ndx) {
                                  mtchsNdx <= ndx && (mtch.match.optionality = !0);
                              }), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
                              insertStop = !0, testPos = pos;
                          }
                      } else if (match.isAlternator) {
                          var alternateToken = match, malternateMatches = [], maltMatches, currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                          if (-1 === altIndex || "string" == typeof altIndex) {
                              var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [], amndx;
                              if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                              if (void 0 !== maskset.excludes[pos]) {
                                  for (var altIndexArrClone = altIndexArr.slice(), i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
                                      var excludeSet = maskset.excludes[pos][i].toString().split(":");
                                      loopNdx.length == excludeSet[1] && altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
                                  }
                                  0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone);
                              }
                              (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                              for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                                  amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), 
                                  alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), 
                                  maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                  for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                      var altMatch = maltMatches[ndx1], dropMatch = !1;
                                      altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, 
                                      setMergeLocators(altMatch);
                                      for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                          var altMatch2 = malternateMatches[ndx2];
                                          if ("string" != typeof altIndex || void 0 !== altMatch.alternation && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString())) {
                                              if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                  dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                                                  break;
                                              }
                                              if (isSubsetOf(altMatch, altMatch2)) {
                                                  setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                  break;
                                              }
                                              if (isSubsetOf(altMatch2, altMatch)) {
                                                  setMergeLocators(altMatch2, altMatch);
                                                  break;
                                              }
                                              if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                                  isSameLevel(altMatch, altMatch2) || void 0 !== el.inputmask.userOptions.keepStatic ? setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, 
                                                  malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch)) : opts.keepStatic = !0;
                                                  break;
                                              }
                                          }
                                      }
                                      dropMatch || malternateMatches.push(altMatch);
                                  }
                              }
                              matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, 
                              match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice();
                          } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                          if (match) return !0;
                      } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                          var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
                          if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup), match) {
                              if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, 
                              latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, 
                              latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                  insertStop = !0, testPos = pos;
                                  break;
                              }
                              return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), 
                              !0;
                          }
                      } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), 
                      match) return !0;
                  } else testPos++;
              }
              for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                  var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                  if (match && testPos === pos) return match;
                  if (pos < testPos) break;
              }
          }
          function mergeLocators(pos, tests) {
              var locator = [];
              return Array.isArray(tests) || (tests = [ tests ]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice(), 
              0 === locator.length && (locator = tests[0].locator.slice())) : tests.forEach(function(tst) {
                  if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i]);
              })), locator;
          }
          if (-1 < pos && (void 0 === inputmask.maxLength || pos < inputmask.maxLength)) {
              if (void 0 === ndxIntlzr) {
                  for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos; ) previousPos--;
                  void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), 
                  cacheDependency = ndxInitializer.join(""), testPos = previousPos);
              }
              if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
              for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                  var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
                  if (match && testPos === pos || pos < testPos) break;
              }
          }
          return 0 !== matches.length && !insertStop || matches.push({
              match: {
                  fn: null,
                  static: !0,
                  optionality: !1,
                  casing: null,
                  def: "",
                  placeholder: ""
              },
              locator: [],
              mloc: {},
              cd: cacheDependency
          }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), 
          maskset.tests[pos]);
      }
      var ua = window.navigator && window.navigator.userAgent || "", ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"), mobile = "ontouchstart" in window, iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
      function applyInputValue(input, value) {
          var inputmask = input ? input.inputmask : this, opts = inputmask.opts;
          input.inputmask.refreshValue = !1, "function" == typeof opts.onBeforeMask && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), 
          value = value.toString().split(""), checkVal(input, !0, !1, value), inputmask.undoValue = getBuffer.call(inputmask).join(""), 
          (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate.call(inputmask).join("") && -1 === getLastValidPosition.call(inputmask) && input.inputmask._valueSet("");
      }
      function clearOptionalTail(buffer) {
          var inputmask = this;
          buffer.length = 0;
          for (var template = getMaskTemplate.call(this, !0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift()); ) buffer.push(lmnt);
          return buffer;
      }
      function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
          var inputmask = input ? input.inputmask : this, maskset = inputmask.maskset, opts = inputmask.opts, $ = inputmask.dependencyLib, inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = void 0, skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
          function isTemplateMatch(ndx, charCodes) {
              for (var targetTemplate = getMaskTemplate.call(inputmask, !0, 0).slice(ndx, seekNext.call(inputmask, ndx)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1]; ) charCodeNdx--;
              var match = 0 === charCodeNdx && !isMask.call(inputmask, ndx) && (getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || !0 === getTest.call(inputmask, ndx).match.static && getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === getTest.call(inputmask, ndx).match.nativeDef && (getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === getTest.call(inputmask, ndx + 1).match.static && getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
              if (!match && 0 < charCodeNdx && !isMask.call(inputmask, ndx, !1, !0)) {
                  var nextPos = seekNext.call(inputmask, ndx);
                  inputmask.caretPos.begin < nextPos && (inputmask.caretPos = {
                      begin: nextPos
                  });
              }
              return match;
          }
          opts.skipOptionalPartCharacter = "", resetMaskSet.call(inputmask), maskset.tests = {}, 
          initialNdx = opts.radixPoint ? determineNewCaretPosition.call(inputmask, {
              begin: 0,
              end: 0
          }).begin : 0, maskset.p = initialNdx, inputmask.caretPos = {
              begin: initialNdx
          };
          var staticMatches = [], prevCaretPos = inputmask.caretPos;
          if (inputValue.forEach(function(charCode, ndx) {
              if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, !0) && !1 === validation_isValid.call(inputmask, ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++; else {
                  var keypress = new $.Event("_checkval");
                  keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
                  var lvp = getLastValidPosition.call(inputmask, void 0, !0);
                  isTemplateMatch(initialNdx, charCodes) ? result = EventHandlers.keypressEvent.call(input || inputmask, keypress, !0, !1, strict, lvp + 1) : (result = EventHandlers.keypressEvent.call(input || inputmask, keypress, !0, !1, strict, inputmask.caretPos.begin), 
                  result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && void 0 === maskset.validPositions[result.pos].alternation && (staticMatches.push(result.pos), 
                  inputmask.isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer.call(inputmask, void 0, getBuffer.call(inputmask), result.forwardPosition, keypress, !1), 
                  inputmask.caretPos = {
                      begin: result.forwardPosition,
                      end: result.forwardPosition
                  }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos;
              }
          }), 0 < staticMatches.length) {
              var sndx, validPos, nextValid = seekNext.call(inputmask, -1, void 0, !1);
              if (!validation_isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length <= nextValid || validation_isComplete.call(inputmask, getBuffer.call(inputmask)) && 0 < staticMatches.length && staticMatches.length !== nextValid && 0 === staticMatches[0]) for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift()); ) {
                  var keypress = new $.Event("_checkval");
                  if (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0), 
                  result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, nextSndx), 
                  result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static) staticMatches.push(result.pos); else if (!result) break;
                  nextSndx++;
              }
          }
          writeOut && writeBuffer.call(inputmask, input, getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type && inputmask.undoValue !== getBuffer.call(inputmask).join("")), 
          opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
      }
      function HandleNativePlaceholder(npt, value) {
          var inputmask = npt ? npt.inputmask : this;
          if (ie) {
              if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
                  var buffer = getBuffer.call(inputmask).slice(), nptValue = npt.inputmask._valueGet();
                  if (nptValue !== value) {
                      var lvp = getLastValidPosition.call(inputmask);
                      -1 === lvp && nptValue === getBufferTemplate.call(inputmask).join("") ? buffer = [] : -1 !== lvp && clearOptionalTail.call(inputmask, buffer), 
                      writeBuffer(npt, buffer);
                  }
              }
          } else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"));
      }
      function inputHandling_unmaskedvalue(input) {
          var inputmask = input ? input.inputmask : this, opts = inputmask.opts, maskset = inputmask.maskset;
          if (input) {
              if (void 0 === input.inputmask) return input.value;
              input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0));
          }
          var umValue = [], vps = maskset.validPositions;
          for (var pndx in vps) vps[pndx] && vps[pndx].match && (1 != vps[pndx].match.static || Array.isArray(maskset.metadata) && !0 !== vps[pndx].generatedInput) && umValue.push(vps[pndx].input);
          var unmaskedValue = 0 === umValue.length ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
          if ("function" == typeof opts.onUnMask) {
              var bufferValue = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join("");
              unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
          }
          return unmaskedValue;
      }
      function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
          var inputmask = input ? input.inputmask : this, opts = inputmask.opts, $ = inputmask.dependencyLib;
          if (event && "function" == typeof opts.onBeforeWrite) {
              var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
              if (result) {
                  if (result.refreshFromBuffer) {
                      var refresh = result.refreshFromBuffer;
                      refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
                      buffer = getBuffer.call(inputmask, !0);
                  }
                  void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
              }
          }
          if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret.call(inputmask, input, caretPos, void 0, void 0, void 0 !== event && "keydown" === event.type && (event.keyCode === keycode.DELETE || event.keyCode === keycode.BACKSPACE)), 
          !0 === triggerEvents)) {
              var $input = $(input), nptVal = input.inputmask._valueGet();
              input.inputmask.skipInputEvent = !0, $input.trigger("input"), setTimeout(function() {
                  nptVal === getBufferTemplate.call(inputmask).join("") ? $input.trigger("cleared") : !0 === validation_isComplete.call(inputmask, buffer) && $input.trigger("complete");
              }, 0);
          }
      }
      var EventHandlers = {
          keydownEvent: function keydownEvent(e) {
              var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib, maskset = inputmask.maskset, input = this, $input = $(input), k = e.keyCode, pos = caret.call(inputmask, input), kdResult = opts.onKeyDown.call(this, e, getBuffer.call(inputmask), pos, opts);
              if (void 0 !== kdResult) return kdResult;
              if (k === keycode.BACKSPACE || k === keycode.DELETE || iphone && k === keycode.BACKSPACE_SAFARI || e.ctrlKey && k === keycode.X && !("oncut" in input)) e.preventDefault(), 
              handleRemove.call(inputmask, input, k, pos), writeBuffer(input, getBuffer.call(inputmask, !0), maskset.p, e, input.inputmask._valueGet() !== getBuffer.call(inputmask).join("")); else if (k === keycode.END || k === keycode.PAGE_DOWN) {
                  e.preventDefault();
                  var caretPos = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
                  caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
              } else k === keycode.HOME && !e.shiftKey || k === keycode.PAGE_UP ? (e.preventDefault(), 
              caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === keycode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, inputmask.undoValue.split("")), 
              $input.trigger("click")) : !0 === opts.tabThrough && k === keycode.TAB ? (!0 === e.shiftKey ? (!0 === getTest.call(inputmask, pos.begin).match.static && (pos.begin = seekNext.call(inputmask, pos.begin)), 
              pos.end = seekPrevious.call(inputmask, pos.begin, !0), pos.begin = seekPrevious.call(inputmask, pos.end, !0)) : (pos.begin = seekNext.call(inputmask, pos.begin, !0), 
              pos.end = seekNext.call(inputmask, pos.begin, !0), pos.end < maskset.maskLength && pos.end--), 
              pos.begin < maskset.maskLength && (e.preventDefault(), caret.call(inputmask, input, pos.begin, pos.end))) : e.shiftKey || opts.insertModeVisual && !1 === opts.insertMode && (k === keycode.RIGHT ? setTimeout(function() {
                  var caretPos = caret.call(inputmask, input);
                  caret.call(inputmask, input, caretPos.begin);
              }, 0) : k === keycode.LEFT && setTimeout(function() {
                  var caretPos_begin = translatePosition.call(inputmask, input.inputmask.caretPos.begin), caretPos_end = translatePosition.call(inputmask, input.inputmask.caretPos.end);
                  inputmask.isRTL ? caret.call(inputmask, input, caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1)) : caret.call(inputmask, input, caretPos_begin - (0 === caretPos_begin ? 0 : 1));
              }, 0));
              inputmask.ignorable = opts.ignorables.includes(k);
          },
          keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
              var inputmask = this.inputmask || this, opts = inputmask.opts, $ = inputmask.dependencyLib, maskset = inputmask.maskset, input = inputmask.el, $input = $(input), k = e.which || e.charCode || e.keyCode;
              if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) return k === keycode.ENTER && inputmask.undoValue !== getBuffer.call(inputmask).join("") && (inputmask.undoValue = getBuffer.call(inputmask).join(""), 
              setTimeout(function() {
                  $input.trigger("change");
              }, 0)), inputmask.skipInputEvent = !0, !0;
              if (k) {
                  44 !== k && 46 !== k || 3 !== e.location || "" === opts.radixPoint || (k = opts.radixPoint.charCodeAt(0));
                  var pos = checkval ? {
                      begin: ndx,
                      end: ndx
                  } : caret.call(inputmask, input), forwardPosition, c = String.fromCharCode(k);
                  maskset.writeOutBuffer = !0;
                  var valResult = validation_isValid.call(inputmask, pos, c, strict, void 0, void 0, void 0, checkval);
                  if (!1 !== valResult && (resetMaskSet.call(inputmask, !0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos), 
                  maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? seekPrevious.call(inputmask, forwardPosition) : forwardPosition, 
                  !1 !== writeOut && (setTimeout(function() {
                      opts.onKeyValidation.call(input, k, valResult);
                  }, 0), maskset.writeOutBuffer && !1 !== valResult)) {
                      var buffer = getBuffer.call(inputmask);
                      writeBuffer(input, buffer, forwardPosition, e, !0 !== checkval);
                  }
                  if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), 
                  valResult;
              }
          },
          keyupEvent: function keyupEvent(e) {
              var inputmask = this.inputmask;
              !inputmask.isComposing || e.keyCode !== keycode.KEY_229 && e.keyCode !== keycode.ENTER || inputmask.$el.trigger("input");
          },
          pasteEvent: function pasteEvent(e) {
              var inputmask = this.inputmask, opts = inputmask.opts, input = this, inputValue = inputmask._valueGet(!0), caretPos = caret.call(inputmask, this), tempValue;
              inputmask.isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
              var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
              if (valueBeforeCaret == (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
              valueAfterCaret == (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
              window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
                  if (!e.clipboardData || !e.clipboardData.getData) return !0;
                  inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
              }
              var pasteValue = inputValue;
              if ("function" == typeof opts.onBeforePaste) {
                  if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
                  pasteValue = pasteValue || inputValue;
              }
              return checkVal(this, !0, !1, pasteValue.toString().split(""), e), e.preventDefault();
          },
          inputFallBackEvent: function inputFallBackEvent(e) {
              var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
              function ieMobileHandler(input, inputValue, caretPos) {
                  if (iemobile) {
                      var inputChar = inputValue.replace(getBuffer.call(inputmask).join(""), "");
                      if (1 === inputChar.length) {
                          var iv = inputValue.split("");
                          iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
                      }
                  }
                  return inputValue;
              }
              function analyseChanges(inputValue, buffer, caretPos) {
                  for (var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split(""), fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, bl, i, action = "", data = [], marker = "~", placeholder; frontPart.length < fpl; ) frontPart.push("~");
                  for (;frontBufferPart.length < fpl; ) frontBufferPart.push("~");
                  for (;backPart.length < bpl; ) backPart.unshift("~");
                  for (;backBufferPart.length < bpl; ) backBufferPart.unshift("~");
                  var newBuffer = frontPart.concat(backPart), oldBuffer = frontBufferPart.concat(backBufferPart);
                  for (i = 0, bl = newBuffer.length; i < bl; i++) switch (placeholder = getPlaceholder.call(inputmask, translatePosition.call(inputmask, i)), 
                  action) {
                    case "insertText":
                      oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1 && data.push(newBuffer[i]), 
                      i = bl;
                      break;

                    case "insertReplacementText":
                      "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                      break;

                    case "deleteContentBackward":
                      "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                      break;

                    default:
                      newBuffer[i] !== oldBuffer[i] && ("~" !== newBuffer[i + 1] && newBuffer[i + 1] !== placeholder && void 0 !== newBuffer[i + 1] || (oldBuffer[i] !== placeholder || "~" !== oldBuffer[i + 1]) && "~" !== oldBuffer[i] ? "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1] ? (action = "insertText", 
                      data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : newBuffer[i] !== placeholder && "~" !== newBuffer[i] && ("~" === newBuffer[i + 1] || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) ? (action = "insertReplacementText", 
                      data.push(newBuffer[i]), caretPos.begin--) : "~" === newBuffer[i] ? (action = "deleteContentBackward", 
                      !isMask.call(inputmask, translatePosition.call(inputmask, i), !0) && oldBuffer[i] !== opts.radixPoint || caretPos.end++) : i = bl : (action = "insertText", 
                      data.push(newBuffer[i]), caretPos.begin--, caretPos.end--));
                      break;
                  }
                  return {
                      action: action,
                      data: data,
                      caret: caretPos
                  };
              }
              var input = this, inputValue = input.inputmask._valueGet(!0), buffer = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join(""), caretPos = caret.call(inputmask, input, void 0, void 0, !0);
              if (buffer !== inputValue) {
                  inputValue = ieMobileHandler(input, inputValue, caretPos);
                  var changes = analyseChanges(inputValue, buffer, caretPos);
                  switch ((input.inputmask.shadowRoot || document).activeElement !== input && input.focus(), 
                  writeBuffer(input, getBuffer.call(inputmask)), caret.call(inputmask, input, caretPos.begin, caretPos.end, !0), 
                  changes.action) {
                    case "insertText":
                    case "insertReplacementText":
                      changes.data.forEach(function(entry, ndx) {
                          var keypress = new $.Event("keypress");
                          keypress.which = entry.charCodeAt(0), inputmask.ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
                      }), setTimeout(function() {
                          inputmask.$el.trigger("keyup");
                      }, 0);
                      break;

                    case "deleteContentBackward":
                      var keydown = new $.Event("keydown");
                      keydown.keyCode = keycode.BACKSPACE, EventHandlers.keydownEvent.call(input, keydown);
                      break;

                    default:
                      applyInputValue(input, inputValue);
                      break;
                  }
                  e.preventDefault();
              }
          },
          compositionendEvent: function compositionendEvent(e) {
              var inputmask = this.inputmask;
              inputmask.isComposing = !1, inputmask.$el.trigger("input");
          },
          setValueEvent: function setValueEvent(e, argument_1, argument_2) {
              var inputmask = this.inputmask, input = this, value = e && e.detail ? e.detail[0] : argument_1;
              void 0 === value && (value = this.inputmask._valueGet(!0)), applyInputValue(this, value), 
              (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && caret.call(inputmask, this, e.detail ? e.detail[1] : argument_2);
          },
          focusEvent: function focusEvent(e) {
              var inputmask = this.inputmask, opts = inputmask.opts, input = this, nptValue = this.inputmask._valueGet();
              opts.showMaskOnFocus && nptValue !== getBuffer.call(inputmask).join("") && writeBuffer(this, getBuffer.call(inputmask), seekNext.call(inputmask, getLastValidPosition.call(inputmask))), 
              !0 !== opts.positionCaretOnTab || !1 !== inputmask.mouseEnter || validation_isComplete.call(inputmask, getBuffer.call(inputmask)) && -1 !== getLastValidPosition.call(inputmask) || EventHandlers.clickEvent.apply(this, [ e, !0 ]), 
              inputmask.undoValue = getBuffer.call(inputmask).join("");
          },
          invalidEvent: function invalidEvent(e) {
              this.inputmask.validationEvent = !0;
          },
          mouseleaveEvent: function mouseleaveEvent() {
              var inputmask = this.inputmask, opts = inputmask.opts, input = this;
              inputmask.mouseEnter = !1, opts.clearMaskOnLostFocus && (this.inputmask.shadowRoot || document).activeElement !== this && HandleNativePlaceholder(this, inputmask.originalPlaceholder);
          },
          clickEvent: function clickEvent(e, tabbed) {
              var inputmask = this.inputmask, input = this;
              if ((this.inputmask.shadowRoot || document).activeElement === this) {
                  var newCaretPosition = determineNewCaretPosition.call(inputmask, caret.call(inputmask, this), tabbed);
                  void 0 !== newCaretPosition && caret.call(inputmask, this, newCaretPosition);
              }
          },
          cutEvent: function cutEvent(e) {
              var inputmask = this.inputmask, maskset = inputmask.maskset, input = this, pos = caret.call(inputmask, this), clipboardData = window.clipboardData || e.clipboardData, clipData = inputmask.isRTL ? getBuffer.call(inputmask).slice(pos.end, pos.begin) : getBuffer.call(inputmask).slice(pos.begin, pos.end);
              clipboardData.setData("text", inputmask.isRTL ? clipData.reverse().join("") : clipData.join("")), 
              document.execCommand && document.execCommand("copy"), handleRemove.call(inputmask, this, keycode.DELETE, pos), 
              writeBuffer(this, getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== getBuffer.call(inputmask).join(""));
          },
          blurEvent: function blurEvent(e) {
              var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib, $input = $(this), input = this;
              if (this.inputmask) {
                  HandleNativePlaceholder(this, inputmask.originalPlaceholder);
                  var nptValue = this.inputmask._valueGet(), buffer = getBuffer.call(inputmask).slice();
                  "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition.call(inputmask) && nptValue === getBufferTemplate.call(inputmask).join("") ? buffer = [] : clearOptionalTail.call(inputmask, buffer)), 
                  !1 === validation_isComplete.call(inputmask, buffer) && (setTimeout(function() {
                      $input.trigger("incomplete");
                  }, 0), opts.clearIncomplete && (resetMaskSet.call(inputmask), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate.call(inputmask).slice())), 
                  writeBuffer(this, buffer, void 0, e)), inputmask.undoValue !== getBuffer.call(inputmask).join("") && (inputmask.undoValue = getBuffer.call(inputmask).join(""), 
                  $input.trigger("change"));
              }
          },
          mouseenterEvent: function mouseenterEvent() {
              var inputmask = this.inputmask, opts = inputmask.opts, input = this;
              inputmask.mouseEnter = !0, (this.inputmask.shadowRoot || document).activeElement !== this && (null == inputmask.originalPlaceholder && this.placeholder !== inputmask.originalPlaceholder && (inputmask.originalPlaceholder = this.placeholder), 
              opts.showMaskOnHover && HandleNativePlaceholder(this, (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("")));
          },
          submitEvent: function submitEvent() {
              var inputmask = this.inputmask, opts = inputmask.opts;
              inputmask.undoValue !== getBuffer.call(inputmask).join("") && inputmask.$el.trigger("change"), 
              opts.clearMaskOnLostFocus && -1 === getLastValidPosition.call(inputmask) && inputmask._valueGet && inputmask._valueGet() === getBufferTemplate.call(inputmask).join("") && inputmask._valueSet(""), 
              opts.clearIncomplete && !1 === validation_isComplete.call(inputmask, getBuffer.call(inputmask)) && inputmask._valueSet(""), 
              opts.removeMaskOnSubmit && (inputmask._valueSet(inputmask.unmaskedvalue(), !0), 
              setTimeout(function() {
                  writeBuffer(inputmask.el, getBuffer.call(inputmask));
              }, 0));
          },
          resetEvent: function resetEvent() {
              var inputmask = this.inputmask;
              inputmask.refreshValue = !0, setTimeout(function() {
                  applyInputValue(inputmask.el, inputmask._valueGet(!0));
              }, 0);
          }
      };
      function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
          var inputmask = this, $ = this.dependencyLib, opts = this.opts, maskset = this.maskset, validPsClone = $.extend(!0, {}, maskset.validPositions), tstClone = $.extend(!0, {}, maskset.tests), lastAlt, alternation, isValidRslt = !1, returnRslt = !1, altPos, prevAltPos, i, validPos, decisionPos, lAltPos = void 0 !== rAltPos ? rAltPos : getLastValidPosition.call(this), nextPos, input, begin, end;
          if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, 
          end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = getTest.call(this, lastAlt), 
          alternation = prevAltPos.alternation; else for (;0 <= lAltPos; lAltPos--) if (altPos = maskset.validPositions[lAltPos], 
          altPos && void 0 !== altPos.alternation) {
              if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
              lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos;
          }
          if (void 0 !== alternation) {
              decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], 
              !0 !== maskPos && maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos) + ":" + prevAltPos.alternation);
              var validInputs = [], resultPos = -1;
              for (i = decisionPos; i < getLastValidPosition.call(this, void 0, !0) + 1; i++) -1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), 
              resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), 
              delete maskset.validPositions[i];
              for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10; ) {
                  for (maskset.tests = {}, resetMaskSet.call(this, !0), isValidRslt = !0, i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || getLastValidPosition.call(this, void 0, !0) + 1, 
                  input = validInputs[i], isValidRslt = validation_isValid.call(this, nextPos, input, !1, fromIsValid, !0)); i++) i === resultPos && (returnRslt = isValidRslt), 
                  1 == maskPos && isValidRslt && (returnRslt = {
                      caretPos: i
                  });
                  if (isValidRslt) break;
                  if (resetMaskSet.call(this), prevAltPos = getTest.call(this, decisionPos), maskset.validPositions = $.extend(!0, {}, validPsClone), 
                  maskset.tests = $.extend(!0, {}, tstClone), !maskset.excludes[decisionPos]) {
                      returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                      break;
                  }
                  var decisionTaker = getDecisionTaker(prevAltPos);
                  if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation)) {
                      returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                      break;
                  }
                  for (maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation), 
                  i = decisionPos; i < getLastValidPosition.call(this, void 0, !0) + 1; i++) delete maskset.validPositions[i];
              }
          }
          return returnRslt && !1 === opts.keepStatic || delete maskset.excludes[decisionPos], 
          returnRslt;
      }
      function casing(elem, test, pos) {
          var opts = this.opts, maskset = this.maskset;
          switch (opts.casing || test.casing) {
            case "upper":
              elem = elem.toUpperCase();
              break;

            case "lower":
              elem = elem.toLowerCase();
              break;

            case "title":
              var posBefore = maskset.validPositions[pos - 1];
              elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(keycode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
              break;

            default:
              if ("function" == typeof opts.casing) {
                  var args = Array.prototype.slice.call(arguments);
                  args.push(maskset.validPositions), elem = opts.casing.apply(this, args);
              }
          }
          return elem;
      }
      function checkAlternationMatch(altArr1, altArr2, na) {
          for (var opts = this.opts, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
          for (var alndx = 0; alndx < altArr1.length; alndx++) if (altArrC.includes(altArr1[alndx])) {
              isMatch = !0;
              break;
          }
          return isMatch;
      }
      function handleRemove(input, k, pos, strict, fromIsValid) {
          var inputmask = this, maskset = this.maskset, opts = this.opts;
          if ((opts.numericInput || this.isRTL) && (k === keycode.BACKSPACE ? k = keycode.DELETE : k === keycode.DELETE && (k = keycode.BACKSPACE), 
          this.isRTL)) {
              var pend = pos.end;
              pos.end = pos.begin, pos.begin = pend;
          }
          var lvp = getLastValidPosition.call(this, void 0, !0), offset;
          if (pos.end >= getBuffer.call(this).length && lvp >= pos.end && (pos.end = lvp + 1), 
          k === keycode.BACKSPACE ? pos.end - pos.begin < 1 && (pos.begin = seekPrevious.call(this, pos.begin)) : k === keycode.DELETE && pos.begin === pos.end && (pos.end = isMask.call(this, pos.end, !0, !0) ? pos.end + 1 : seekNext.call(this, pos.end) + 1), 
          !1 !== (offset = revalidateMask.call(this, pos))) {
              if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== getTest.call(this, pos.begin).match.def.indexOf("|")) {
                  var result = alternate.call(this, !0);
                  if (result) {
                      var newPos = void 0 !== result.caret ? result.caret : result.pos ? seekNext.call(this, result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition.call(this, -1, !0);
                      (k !== keycode.DELETE || pos.begin > newPos) && pos.begin;
                  }
              }
              !0 !== strict && (maskset.p = k === keycode.DELETE ? pos.begin + offset : pos.begin);
          }
      }
      function validation_isComplete(buffer) {
          var inputmask = this, opts = this.opts, maskset = this.maskset;
          if ("function" == typeof opts.isComplete) return opts.isComplete(buffer, opts);
          if ("*" !== opts.repeat) {
              var complete = !1, lrp = determineLastRequiredPosition.call(this, !0), aml = seekPrevious.call(this, lrp.l);
              if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                  complete = !0;
                  for (var i = 0; i <= aml; i++) {
                      var test = getTestTemplate.call(this, i).match;
                      if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== getPlaceholder.call(this, i, test)) {
                          complete = !1;
                          break;
                      }
                  }
              }
              return complete;
          }
      }
      function validation_isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
          var inputmask = this, $ = this.dependencyLib, opts = this.opts, el = inputmask.el, maskset = inputmask.maskset;
          function isSelection(posObj) {
              return inputmask.isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1;
          }
          strict = !0 === strict;
          var maskPos = pos;
          function processCommandObject(commandObj) {
              if (void 0 !== commandObj) {
                  if (void 0 !== commandObj.remove && (Array.isArray(commandObj.remove) || (commandObj.remove = [ commandObj.remove ]), 
                  commandObj.remove.sort(function(a, b) {
                      return b.pos - a.pos;
                  }).forEach(function(lmnt) {
                      revalidateMask.call(inputmask, {
                          begin: lmnt,
                          end: lmnt + 1
                      });
                  }), commandObj.remove = void 0), void 0 !== commandObj.insert && (Array.isArray(commandObj.insert) || (commandObj.insert = [ commandObj.insert ]), 
                  commandObj.insert.sort(function(a, b) {
                      return a.pos - b.pos;
                  }).forEach(function(lmnt) {
                      "" !== lmnt.c && validation_isValid.call(inputmask, lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid);
                  }), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
                      var refresh = commandObj.refreshFromBuffer;
                      refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), 
                      commandObj.refreshFromBuffer = void 0;
                  }
                  void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, 
                  commandObj = !0);
              }
              return commandObj;
          }
          function _isValid(position, c, strict) {
              var rslt = !1;
              return getTests.call(inputmask, position).every(function(tst, ndx) {
                  var test = tst.match;
                  if (getBuffer.call(inputmask, !0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                      c: getPlaceholder.call(inputmask, position, test, !0) || test.def,
                      pos: position
                  }, !1 === rslt) return !0;
                  var elem = void 0 !== rslt.c ? rslt.c : c, validatedPos = position;
                  return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? getPlaceholder.call(inputmask, position, test, !0) || test.def : elem, 
                  rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), 
                  !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c || !1 === revalidateMask.call(inputmask, pos, $.extend({}, tst, {
                      input: casing.call(inputmask, elem, test, validatedPos)
                  }), fromIsValid, validatedPos) && (rslt = !1), !1;
              }), rslt;
          }
          void 0 !== pos.begin && (maskPos = inputmask.isRTL ? pos.end : pos.begin);
          var result = !0, positionsClone = $.extend(!0, {}, maskset.validPositions);
          if (!1 === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && !0 !== fromAlternate && !0 !== fromIsValid) for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) void 0 !== maskset.excludes[i] && (maskset.excludes[i] = void 0, 
          delete maskset.tests[i]);
          if ("function" == typeof opts.preValidation && !0 !== fromIsValid && !0 !== validateOnly && (result = opts.preValidation.call(el, getBuffer.call(inputmask), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate), 
          result = processCommandObject(result)), !0 === result) {
              if (void 0 === inputmask.maxLength || maskPos < inputmask.maxLength) {
                  if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
                      var currentPosValid = maskset.validPositions[maskPos];
                      if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                          if (opts.insertMode || void 0 === maskset.validPositions[seekNext.call(inputmask, maskPos)] || pos.end > maskPos) {
                              var skip = !1;
                              if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[seekNext.call(inputmask, maskPos)] && (result = validation_isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, !0), 
                              !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), 
                              pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !isMask.call(inputmask, maskPos, opts.keepStatic)) for (var nPos = maskPos + 1, snPos = seekNext.call(inputmask, maskPos); nPos <= snPos; nPos++) if (result = _isValid(nPos, c, strict), 
                              !1 !== result) {
                                  result = trackbackPositions.call(inputmask, maskPos, void 0 !== result.pos ? result.pos : nPos) || result, 
                                  maskPos = nPos;
                                  break;
                              }
                          }
                      } else result = {
                          caret: seekNext.call(inputmask, maskPos)
                      };
                  }
              } else result = !1;
              !1 !== result || !opts.keepStatic || !validation_isComplete.call(inputmask, getBuffer.call(inputmask)) && 0 !== maskPos || strict || !0 === fromAlternate ? isSelection(pos) && maskset.tests[maskPos] && 1 < maskset.tests[maskPos].length && opts.keepStatic && !strict && !0 !== fromAlternate && (result = alternate.call(inputmask, !0)) : result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, void 0, pos), 
              !0 === result && (result = {
                  pos: maskPos
              });
          }
          if ("function" == typeof opts.postValidation && !0 !== fromIsValid && !0 !== validateOnly) {
              var postResult = opts.postValidation.call(el, getBuffer.call(inputmask, !0), void 0 !== pos.begin ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval);
              void 0 !== postResult && (result = !0 === postResult ? result : postResult);
          }
          result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (resetMaskSet.call(inputmask, !0), 
          maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions.call(inputmask, void 0, maskPos, !0);
          var endResult = processCommandObject(result);
          return endResult;
      }
      function positionCanMatchDefinition(pos, testDefinition, opts) {
          for (var inputmask = this, maskset = this.maskset, valid = !1, tests = getTests.call(this, pos), tndx = 0; tndx < tests.length; tndx++) {
              if (tests[tndx].match && (!(tests[tndx].match.nativeDef !== testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] || opts.shiftPositions && testDefinition.match.static) || tests[tndx].match.nativeDef === testDefinition.match.nativeDef)) {
                  valid = !0;
                  break;
              }
              if (tests[tndx].match && tests[tndx].match.def === testDefinition.match.nativeDef) {
                  valid = void 0;
                  break;
              }
          }
          return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition.call(this, pos + maskset.jitOffset[pos], testDefinition, opts)), 
          valid;
      }
      function refreshFromBuffer(start, end, buffer) {
          var inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib, el = this.el, i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter, bffr = this.isRTL ? buffer.slice().reverse() : buffer;
          if (opts.skipOptionalPartCharacter = "", !0 === start) resetMaskSet.call(this), 
          maskset.tests = {}, start = 0, end = buffer.length, p = determineNewCaretPosition.call(this, {
              begin: 0,
              end: 0
          }, !1).begin; else {
              for (i = start; i < end; i++) delete maskset.validPositions[i];
              p = start;
          }
          var keypress = new $.Event("keypress");
          for (i = start; i < end; i++) {
              keypress.which = bffr[i].toString().charCodeAt(0), this.ignorable = !1;
              var valResult = EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);
              !1 !== valResult && (p = valResult.forwardPosition);
          }
          opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
      }
      function trackbackPositions(originalPos, newPos, fillOnly) {
          var inputmask = this, maskset = this.maskset, $ = this.dependencyLib;
          if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--) ;
          for (var ps = originalPos; ps < newPos; ps++) if (void 0 === maskset.validPositions[ps] && !isMask.call(this, ps, !0)) {
              var vp = 0 == ps ? getTest.call(this, ps) : maskset.validPositions[ps - 1];
              if (vp) {
                  var tests = getTests.call(this, ps).slice();
                  "" === tests[tests.length - 1].match.def && tests.pop();
                  var bestMatch = determineTestTemplate.call(this, ps, tests), np;
                  if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {
                      input: getPlaceholder.call(this, ps, bestMatch.match, !0) || bestMatch.match.def
                  }), bestMatch.generatedInput = !0, revalidateMask.call(this, ps, bestMatch, !0), 
                  !0 !== fillOnly)) {
                      var cvpInput = maskset.validPositions[newPos].input;
                      return maskset.validPositions[newPos] = void 0, validation_isValid.call(this, newPos, cvpInput, !0, !0);
                  }
              }
          }
      }
      function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
          var inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib;
          function IsEnclosedStatic(pos, valids, selection) {
              var posMatch = valids[pos];
              if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
              var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1], nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
              return prevMatch && nextMatch;
          }
          var offset = 0, begin = void 0 !== pos.begin ? pos.begin : pos, end = void 0 !== pos.end ? pos.end : pos;
          if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), validatedPos = void 0 !== validatedPos ? validatedPos : begin, 
          begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
              var positionsClone = $.extend(!0, {}, maskset.validPositions), lvp = getLastValidPosition.call(this, void 0, !0), i;
              for (maskset.p = begin, i = lvp; begin <= i; i--) delete maskset.validPositions[i], 
              void 0 === validTest && delete maskset.tests[i + 1];
              var valid = !0, j = validatedPos, posMatch = j, t, canMatch;
              for (validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), 
              posMatch++, j++), i = validTest ? end : end - 1; i <= lvp; i++) {
                  if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
                      begin: begin,
                      end: end
                  }))) {
                      for (;"" !== getTest.call(this, posMatch).match.def; ) {
                          if (!1 !== (canMatch = positionCanMatchDefinition.call(this, posMatch, t, opts)) || "+" === t.match.def) {
                              "+" === t.match.def && getBuffer.call(this, !0);
                              var result = validation_isValid.call(this, posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
                              if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid && canMatch) break;
                          } else valid = !1;
                          if (valid) {
                              void 0 === validTest && t.match.static && i === pos.begin && offset++;
                              break;
                          }
                          if (!valid && posMatch > maskset.maskLength) break;
                          posMatch++;
                      }
                      "" == getTest.call(this, posMatch).match.def && (valid = !1), posMatch = j;
                  }
                  if (!valid) break;
              }
              if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), resetMaskSet.call(this, !0), 
              !1;
          } else validTest && getTest.call(this, validatedPos).match.cd === validTest.match.cd && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
          return resetMaskSet.call(this, !0), offset;
      }
      function caret(input, begin, end, notranslate, isDelete) {
          var inputmask = this, opts = this.opts, range;
          if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, 
          end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), 
          range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, 
          end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
          begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), 
          end = begin + range.text.length), {
              begin: notranslate ? begin : translatePosition.call(this, begin),
              end: notranslate ? end : translatePosition.call(this, end)
          };
          if (Array.isArray(begin) && (end = this.isRTL ? begin[0] : begin[1], begin = this.isRTL ? begin[1] : begin[0]), 
          void 0 !== begin.begin && (end = this.isRTL ? begin.begin : begin.end, begin = this.isRTL ? begin.end : begin.begin), 
          "number" == typeof begin) {
              begin = notranslate ? begin : translatePosition.call(this, begin), end = notranslate ? end : translatePosition.call(this, end), 
              end = "number" == typeof end ? end : begin;
              var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
              if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
                  begin: begin,
                  end: end
              }, opts.insertModeVisual && !1 === opts.insertMode && begin === end && (isDelete || end++), 
              input === (input.inputmask.shadowRoot || document).activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end); else if (window.getSelection) {
                  if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
                      var textNode = document.createTextNode("");
                      input.appendChild(textNode);
                  }
                  range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
                  range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
                  range.collapse(!0);
                  var sel = window.getSelection();
                  sel.removeAllRanges(), sel.addRange(range);
              } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), 
              range.moveEnd("character", end), range.moveStart("character", begin), range.select());
          }
      }
      function determineLastRequiredPosition(returnDefinition) {
          var inputmask = this, maskset = this.maskset, $ = this.dependencyLib, buffer = getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0, !0), bl = buffer.length, pos, lvp = getLastValidPosition.call(this), positions = {}, lvTest = maskset.validPositions[lvp], ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0, testPos;
          for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), 
          ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
          var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
          for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && checkAlternationMatch.call(this, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests.call(this, pos)[0].def)) && buffer[pos] === getPlaceholder.call(this, pos, testPos.match)); pos--) bl--;
          return returnDefinition ? {
              l: bl,
              def: positions[bl] ? positions[bl].match : void 0
          } : bl;
      }
      function determineNewCaretPosition(selectedCaret, tabbed) {
          var inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib;
          function doRadixFocus(clickPos) {
              if ("" !== opts.radixPoint && 0 !== opts.digits) {
                  var vps = maskset.validPositions;
                  if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder.call(inputmask, clickPos)) {
                      if (clickPos < seekNext.call(inputmask, -1)) return !0;
                      var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
                      if (-1 !== radixPos) {
                          for (var vp in vps) if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder.call(inputmask, vp)) return !1;
                          return !0;
                      }
                  }
              }
              return !1;
          }
          if (tabbed && (inputmask.isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), 
          selectedCaret.begin === selectedCaret.end) {
              switch (opts.positionCaretOnClick) {
                case "none":
                  break;

                case "select":
                  selectedCaret = {
                      begin: 0,
                      end: getBuffer.call(inputmask).length
                  };
                  break;

                case "ignore":
                  selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
                  break;

                case "radixFocus":
                  if (doRadixFocus(selectedCaret.begin)) {
                      var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
                      selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
                      break;
                  }

                default:
                  var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, !0), lastPosition = seekNext.call(inputmask, -1 !== lvclickPosition || isMask.call(inputmask, 0) ? lvclickPosition : 0);
                  if (clickPosition < lastPosition) selectedCaret.end = selectedCaret.begin = isMask.call(inputmask, clickPosition, !0) || isMask.call(inputmask, clickPosition - 1, !0) ? clickPosition : seekNext.call(inputmask, clickPosition); else {
                      var lvp = maskset.validPositions[lvclickPosition], tt = getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : void 0, lvp), placeholder = getPlaceholder.call(inputmask, lastPosition, tt.match);
                      if ("" !== placeholder && getBuffer.call(inputmask)[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask.call(inputmask, lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                          var newPos = seekNext.call(inputmask, lastPosition);
                          (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos);
                      }
                      selectedCaret.end = selectedCaret.begin = lastPosition;
                  }
              }
              return selectedCaret;
          }
      }
      function getBuffer(noCache) {
          var inputmask = this, maskset = this.maskset;
          return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0), 
          void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer;
      }
      function getBufferTemplate() {
          var inputmask = this, maskset = this.maskset;
          return void 0 === maskset._buffer && (maskset._buffer = getMaskTemplate.call(this, !1, 1), 
          void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer;
      }
      function getLastValidPosition(closestTo, strict, validPositions) {
          var maskset = this.maskset, before = -1, after = -1, valids = validPositions || maskset.validPositions;
          for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
              var psNdx = parseInt(posNdx);
              valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), 
              closestTo <= psNdx && (after = psNdx));
          }
          return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after;
      }
      function isMask(pos, strict, fuzzy) {
          var inputmask = this, maskset = this.maskset, test = getTestTemplate.call(this, pos).match;
          if ("" === test.def && (test = getTest.call(this, pos).match), !0 !== test.static) return test.fn;
          if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
          if (!0 !== strict && -1 < pos) {
              if (fuzzy) {
                  var tests = getTests.call(this, pos);
                  return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
              }
              var testTemplate = determineTestTemplate.call(this, pos, getTests.call(this, pos)), testPlaceHolder = getPlaceholder.call(this, pos, testTemplate.match);
              return testTemplate.match.def !== testPlaceHolder;
          }
          return !1;
      }
      function resetMaskSet(soft) {
          var maskset = this.maskset;
          maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
      }
      function seekNext(pos, newBlock, fuzzy) {
          var inputmask = this;
          void 0 === fuzzy && (fuzzy = !0);
          for (var position = pos + 1; "" !== getTest.call(this, position).match.def && (!0 === newBlock && (!0 !== getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, fuzzy)); ) position++;
          return position;
      }
      function seekPrevious(pos, newBlock) {
          var inputmask = this, position = pos, tests;
          if (position <= 0) return 0;
          for (;0 < --position && (!0 === newBlock && !0 !== getTest.call(this, position).match.newBlockMarker || !0 !== newBlock && !isMask.call(this, position, void 0, !0) && (tests = getTests.call(this, position), 
          tests.length < 2 || 2 === tests.length && "" === tests[1].match.def)); ) ;
          return position;
      }
      function translatePosition(pos) {
          var inputmask = this, opts = this.opts, el = this.el;
          return !this.isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = this._valueGet().length - pos), 
          pos;
      }
      var EventRuler_on = function on(input, eventName, eventHandler) {
          var $ = input.inputmask.dependencyLib, ev = function ev(e) {
              e.originalEvent && (e = e.originalEvent || e, arguments[0] = e);
              var that = this, args, inputmask = that.inputmask, opts = inputmask ? inputmask.opts : void 0, $ = inputmask.dependencyLib;
              if (void 0 === inputmask && "FORM" !== this.nodeName) {
                  var imOpts = $.data(that, "_inputmask_opts");
                  $(that).off(), imOpts && new lib_inputmask(imOpts).mask(that);
              } else {
                  if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === keycode.TAB))) {
                      switch (e.type) {
                        case "input":
                          if (!0 === inputmask.skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) return inputmask.skipInputEvent = !1, 
                          e.preventDefault();
                          break;

                        case "keydown":
                          inputmask.skipKeyPressEvent = !1, inputmask.skipInputEvent = inputmask.isComposing = e.keyCode === keycode.KEY_229;
                          break;

                        case "keyup":
                        case "compositionend":
                          inputmask.isComposing && (inputmask.skipInputEvent = !1);
                          break;

                        case "keypress":
                          if (!0 === inputmask.skipKeyPressEvent) return e.preventDefault();
                          inputmask.skipKeyPressEvent = !0;
                          break;

                        case "click":
                        case "focus":
                          return inputmask.validationEvent ? (inputmask.validationEvent = !1, input.blur(), 
                          HandleNativePlaceholder(input, (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("")), 
                          setTimeout(function() {
                              input.focus();
                          }, 3e3)) : (args = arguments, setTimeout(function() {
                              input.inputmask && eventHandler.apply(that, args);
                          }, 0)), !1;
                      }
                      var returnVal = eventHandler.apply(that, arguments);
                      return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                  }
                  e.preventDefault();
              }
          };
          input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
          [ "submit", "reset" ].includes(eventName) ? null !== input.form && $(input.form).on(eventName, ev.bind(input)) : $(input).on(eventName, ev);
      }, EventRuler_off = function off(input, event) {
          if (input.inputmask && input.inputmask.events) {
              var $ = input.inputmask.dependencyLib, events = input.inputmask.events;
              for (var eventName in event && (events = [], events[event] = input.inputmask.events[event]), 
              events) {
                  for (var evArr = events[eventName]; 0 < evArr.length; ) {
                      var ev = evArr.pop();
                      [ "submit", "reset" ].includes(eventName) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                  }
                  delete input.inputmask.events[eventName];
              }
          }
      };
      function mask_mask() {
          var inputmask = this, opts = this.opts, el = this.el, $ = this.dependencyLib;
          function isElementTypeSupported(input, opts) {
              function patchValueProperty(npt) {
                  var valueGet, valueSet;
                  function patchValhook(type) {
                      if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
                          var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                              return elem.value;
                          }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                              return elem.value = value, elem;
                          };
                          $.valHooks[type] = {
                              get: function get(elem) {
                                  if (elem.inputmask) {
                                      if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                      var result = valhookGet(elem);
                                      return -1 !== getLastValidPosition.call(inputmask, void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                                  }
                                  return valhookGet(elem);
                              },
                              set: function set(elem, value) {
                                  var result = valhookSet(elem, value);
                                  return elem.inputmask && applyInputValue(elem, value), result;
                              },
                              inputmaskpatch: !0
                          };
                      }
                  }
                  function getter() {
                      return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition.call(inputmask) || !0 !== opts.nullable ? (this.inputmask.shadowRoot || document.activeElement) === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? clearOptionalTail.call(inputmask, getBuffer.call(inputmask).slice()).reverse() : clearOptionalTail.call(inputmask, getBuffer.call(inputmask).slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
                  }
                  function setter(value) {
                      valueSet.call(this, value), this.inputmask && applyInputValue(this, value);
                  }
                  function installNativeValueSetFallback(npt) {
                      EventRuler_on(npt, "mouseenter", function() {
                          var input = this, value = this.inputmask._valueGet(!0);
                          value !== (inputmask.isRTL ? getBuffer.call(inputmask).reverse() : getBuffer.call(inputmask)).join("") && applyInputValue(this, value);
                      });
                  }
                  if (!npt.inputmask.__valueGet) {
                      if (!0 !== opts.noValuePatching) {
                          if (Object.getOwnPropertyDescriptor) {
                              var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                              valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
                              valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                  get: getter,
                                  set: setter,
                                  configurable: !0
                              })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
                                  return this.textContent;
                              }, valueSet = function valueSet(value) {
                                  this.textContent = value;
                              }, Object.defineProperty(npt, "value", {
                                  get: getter,
                                  set: setter,
                                  configurable: !0
                              }));
                          } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
                          valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                          npt.__defineSetter__("value", setter));
                          npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                      }
                      npt.inputmask._valueGet = function(overruleRTL) {
                          return inputmask.isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                      }, npt.inputmask._valueSet = function(value, overruleRTL) {
                          valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && inputmask.isRTL ? value.split("").reverse().join("") : value);
                      }, void 0 === valueGet && (valueGet = function valueGet() {
                          return this.value;
                      }, valueSet = function valueSet(value) {
                          this.value = value;
                      }, patchValhook(npt.type), installNativeValueSetFallback(npt));
                  }
              }
              "textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(keycode.ENTER);
              var elementType = input.getAttribute("type"), isSupported = "input" === input.tagName.toLowerCase() && opts.supportsInputType.includes(elementType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
              if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
                  var el = document.createElement("input");
                  el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
              } else isSupported = "partial";
              return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, 
              isSupported;
          }
          EventRuler_off(el);
          var isSupported = isElementTypeSupported(el, opts);
          if (!1 !== isSupported) {
              inputmask.originalPlaceholder = el.placeholder, inputmask.maxLength = void 0 !== el ? el.maxLength : void 0, 
              -1 === inputmask.maxLength && (inputmask.maxLength = void 0), "inputMode" in el && null === el.getAttribute("inputmode") && (el.inputMode = opts.inputmode, 
              el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === [ "cc-number", "cc-exp" ].indexOf(el.autocomplete), 
              iphone && (opts.insertModeVisual = !1), EventRuler_on(el, "submit", EventHandlers.submitEvent), 
              EventRuler_on(el, "reset", EventHandlers.resetEvent), EventRuler_on(el, "blur", EventHandlers.blurEvent), 
              EventRuler_on(el, "focus", EventHandlers.focusEvent), EventRuler_on(el, "invalid", EventHandlers.invalidEvent), 
              EventRuler_on(el, "click", EventHandlers.clickEvent), EventRuler_on(el, "mouseleave", EventHandlers.mouseleaveEvent), 
              EventRuler_on(el, "mouseenter", EventHandlers.mouseenterEvent), EventRuler_on(el, "paste", EventHandlers.pasteEvent), 
              EventRuler_on(el, "cut", EventHandlers.cutEvent), EventRuler_on(el, "complete", opts.oncomplete), 
              EventRuler_on(el, "incomplete", opts.onincomplete), EventRuler_on(el, "cleared", opts.oncleared), 
              !0 !== opts.inputEventOnly && (EventRuler_on(el, "keydown", EventHandlers.keydownEvent), 
              EventRuler_on(el, "keypress", EventHandlers.keypressEvent), EventRuler_on(el, "keyup", EventHandlers.keyupEvent)), 
              (mobile || opts.inputEventOnly) && el.removeAttribute("maxLength"), EventRuler_on(el, "input", EventHandlers.inputFallBackEvent), 
              EventRuler_on(el, "compositionend", EventHandlers.compositionendEvent)), EventRuler_on(el, "setvalue", EventHandlers.setValueEvent), 
              inputmask.undoValue = getBufferTemplate.call(inputmask).join("");
              var activeElement = (el.inputmask.shadowRoot || document).activeElement;
              if ("" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || activeElement === el) {
                  applyInputValue(el, el.inputmask._valueGet(!0), opts);
                  var buffer = getBuffer.call(inputmask).slice();
                  !1 === validation_isComplete.call(inputmask, buffer) && opts.clearIncomplete && resetMaskSet.call(inputmask), 
                  opts.clearMaskOnLostFocus && activeElement !== el && (-1 === getLastValidPosition.call(inputmask) ? buffer = [] : clearOptionalTail.call(inputmask, buffer)), 
                  (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && activeElement === el || "" !== el.inputmask._valueGet(!0)) && writeBuffer(el, buffer), 
                  activeElement === el && caret.call(inputmask, el, seekNext.call(inputmask, getLastValidPosition.call(inputmask)));
              }
          }
      }
      function _typeof(obj) {
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
              return typeof obj;
          } : function _typeof(obj) {
              return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          }, _typeof(obj);
      }
      function extend() {
          var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
          for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
          i++), "object" !== _typeof(target) && "function" != typeof target && (target = {}); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
          copy = options[name], target !== copy && (deep && copy && ("[object Object]" === Object.prototype.toString.call(copy) || (copyIsArray = Array.isArray(copy))) ? (clone = copyIsArray ? (copyIsArray = !1, 
          src && Array.isArray(src) ? src : []) : src && "[object Object]" === Object.prototype.toString.call(src) ? src : {}, 
          target[name] = extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
          return target;
      }
      var global_window = __webpack_require__(2), dependencyLibs_data = function(owner, key, value) {
          if (void 0 === value) return owner.__data ? owner.__data[key] : null;
          owner.__data = owner.__data || {}, owner.__data[key] = value;
      }, external_jqlite_ = __webpack_require__(9), Event;
      function isValidElement(elem) {
          return elem instanceof Element;
      }
      function events_on(events, handler) {
          function addEvent(ev, namespace) {
              elem.addEventListener ? elem.addEventListener(ev, handler, !1) : elem.attachEvent && elem.attachEvent("on" + ev, handler), 
              eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [], 
              eventRegistry[ev][namespace].push(handler);
          }
          if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
              var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
              addEvent(ev, namespace);
          }
          return this;
      }
      function off(events, handler) {
          var eventRegistry, elem;
          function removeEvent(ev, namespace, handler) {
              if (ev in eventRegistry == !0) if (elem.removeEventListener ? elem.removeEventListener(ev, handler, !1) : elem.detachEvent && elem.detachEvent("on" + ev, handler), 
              "global" === namespace) for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1); else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
          }
          function resolveNamespace(ev, namespace) {
              var evts = [], hndx, hndL;
              if (0 < ev.length) if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) evts.push({
                  ev: ev,
                  namespace: namespace && 0 < namespace.length ? namespace : "global",
                  handler: eventRegistry[ev][namespace][hndx]
              }); else evts.push({
                  ev: ev,
                  namespace: namespace && 0 < namespace.length ? namespace : "global",
                  handler: handler
              }); else if (0 < namespace.length) for (var evNdx in eventRegistry) for (var nmsp in eventRegistry[evNdx]) if (nmsp === namespace) if (void 0 === handler) for (hndx = 0, 
              hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) evts.push({
                  ev: evNdx,
                  namespace: nmsp,
                  handler: eventRegistry[evNdx][nmsp][hndx]
              }); else evts.push({
                  ev: evNdx,
                  namespace: nmsp,
                  handler: handler
              });
              return evts;
          }
          if (isValidElement(this[0])) {
              eventRegistry = this[0].eventRegistry, elem = this[0];
              for (var _events = events.split(" "), endx = 0; endx < _events.length; endx++) for (var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]), i = 0, offEventsL = offEvents.length; i < offEventsL; i++) removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
          }
          return this;
      }
      function trigger(events) {
          if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = "string" == typeof events ? events.split(" ") : [ events.type ], endx = 0; endx < _events.length; endx++) {
              var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
              if (void 0 !== document && "global" === namespace) {
                  var evnt, i, params = {
                      bubbles: !0,
                      cancelable: !0,
                      detail: arguments[1]
                  };
                  if (document.createEvent) {
                      try {
                          evnt = new CustomEvent(ev, params);
                      } catch (e) {
                          evnt = document.createEvent("CustomEvent"), evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
                      }
                      events.type && extend(evnt, events), elem.dispatchEvent(evnt);
                  } else evnt = document.createEventObject(), evnt.eventType = ev, evnt.detail = arguments[1], 
                  events.type && extend(evnt, events), elem.fireEvent("on" + evnt.eventType, evnt);
              } else if (void 0 !== eventRegistry[ev]) if (arguments[0] = arguments[0].type ? arguments[0] : inputmask_dependencyLib.Event(arguments[0]), 
              arguments[0].detail = arguments.slice(1), "global" === namespace) for (var nmsp in eventRegistry[ev]) for (i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments); else for (i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments);
          }
          return this;
      }
      "function" == typeof global_window.a.CustomEvent ? Event = global_window.a.CustomEvent : (Event = function Event(event, params) {
          params = params || {
              bubbles: !1,
              cancelable: !1,
              detail: void 0
          };
          var evt = document.createEvent("CustomEvent");
          return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), 
          evt;
      }, Event.prototype = global_window.a.Event.prototype);
      var inputmask_dependencyLib_document = global_window.a.document;
      function DependencyLib(elem) {
          return elem instanceof DependencyLib ? elem : this instanceof DependencyLib ? void (null != elem && elem !== global_window.a && (this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : inputmask_dependencyLib_document.querySelector(elem), 
          void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(elem);
      }
      DependencyLib.prototype = {
          on: events_on,
          off: off,
          trigger: trigger
      }, DependencyLib.extend = extend, DependencyLib.data = dependencyLibs_data, DependencyLib.Event = Event;
      var inputmask_dependencyLib = DependencyLib;
      function generateMaskSet(opts, nocache) {
          var ms;
          function generateMask(mask, metadata, opts) {
              var regexMask = !1, masksetDefinition, maskdefKey;
              if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, 
              mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 
              0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
                  var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                  mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
              }
              return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, 
              !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
                  mask: mask,
                  maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                  validPositions: {},
                  _buffer: void 0,
                  buffer: void 0,
                  tests: {},
                  excludes: {},
                  metadata: metadata,
                  maskLength: void 0,
                  jitOffset: {}
              }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, 
              masksetDefinition = inputmask_dependencyLib.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = inputmask_dependencyLib.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), 
              masksetDefinition;
          }
          if ("function" == typeof opts.mask && (opts.mask = opts.mask(opts)), Array.isArray(opts.mask)) {
              if (1 < opts.mask.length) {
                  null === opts.keepStatic && (opts.keepStatic = !0);
                  var altMask = opts.groupmarker[0];
                  return (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function(msk) {
                      1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), 
                      void 0 !== msk.mask && "function" != typeof msk.mask ? altMask += msk.mask : altMask += msk;
                  }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts);
              }
              opts.mask = opts.mask.pop();
          }
          return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && "function" != typeof opts.mask.mask ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), 
          ms;
      }
      function analyseMask(mask, regexMask, opts) {
          var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), match, m, openenings = [], maskTokens = [], openingToken, currentOpeningToken, alternator, lastMatch, closeRegexGroup = !1;
          function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
              this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, 
              this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
              this.quantifier = {
                  min: 1,
                  max: 1
              };
          }
          function insertTestDefinition(mtoken, element, position) {
              position = void 0 !== position ? position : mtoken.matches.length;
              var prevMatch = mtoken.matches[position - 1];
              if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                  fn: new RegExp(element, opts.casing ? "i" : ""),
                  static: !1,
                  optionality: !1,
                  newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
                  casing: null,
                  def: element,
                  placeholder: void 0,
                  nativeDef: element
              }) : (escaped && (element = element[element.length - 1]), element.split("").forEach(function(lmnt, ndx) {
                  prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                      fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
                      static: !0,
                      optionality: !1,
                      newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static,
                      casing: null,
                      def: opts.staticDefinitionSymbol || lmnt,
                      placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
                      nativeDef: (escaped ? "'" : "") + lmnt
                  });
              })), escaped = !1; else {
                  var maskdef = (opts.definitions ? opts.definitions[element] : void 0) || Inputmask.prototype.definitions[element];
                  maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
                      fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
                          this.test = maskdef.validator;
                      }() : new RegExp("."),
                      static: maskdef.static || !1,
                      optionality: !1,
                      newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                      casing: maskdef.casing,
                      def: maskdef.definitionSymbol || element,
                      placeholder: maskdef.placeholder,
                      nativeDef: element,
                      generated: maskdef.generated
                  }) : (mtoken.matches.splice(position++, 0, {
                      fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
                      static: !0,
                      optionality: !1,
                      newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static,
                      casing: null,
                      def: opts.staticDefinitionSymbol || element,
                      placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                      nativeDef: (escaped ? "'" : "") + element
                  }), escaped = !1);
              }
          }
          function verifyGroupMarker(maskToken) {
              maskToken && maskToken.matches && maskToken.matches.forEach(function(token, ndx) {
                  var nextToken = maskToken.matches[ndx + 1];
                  (void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, 
                  regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), 
                  verifyGroupMarker(token);
              });
          }
          function defaultCase() {
              if (0 < openenings.length) {
                  if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), 
                  currentOpeningToken.isAlternator) {
                      alternator = openenings.pop();
                      for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
                      0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], 
                      currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                  }
              } else insertTestDefinition(currentToken, m);
          }
          function reverseTokens(maskToken) {
              function reverseStatic(st) {
                  return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), 
                  st;
              }
              for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                  var intMatch = parseInt(match);
                  if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                      var qt = maskToken.matches[match];
                      maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                  }
                  void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
              }
              return maskToken;
          }
          function groupify(matches) {
              var groupToken = new MaskToken(!0);
              return groupToken.openGroup = !1, groupToken.matches = matches, groupToken;
          }
          function closeGroup() {
              if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) if (0 < openenings.length) {
                  if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), 
                  currentOpeningToken.isAlternator) {
                      alternator = openenings.pop();
                      for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, 
                      alternator.matches[mndx].alternatorGroup = !1;
                      0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], 
                      currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                  }
              } else currentToken.matches.push(openingToken); else defaultCase();
          }
          function groupQuantifier(matches) {
              var lastMatch = matches.pop();
              return lastMatch.isQuantifier && (lastMatch = groupify([ matches.pop(), lastMatch ])), 
              lastMatch;
          }
          for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask); ) {
              if (m = match[0], regexMask) switch (m.charAt(0)) {
                case "?":
                  m = "{0,1}";
                  break;

                case "+":
                case "*":
                  m = "{" + m + "}";
                  break;

                case "|":
                  if (0 === openenings.length) {
                      var altRegexGroup = groupify(currentToken.matches);
                      altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], 
                      closeRegexGroup = !0;
                  }
                  break;
              }
              if (escaped) defaultCase(); else switch (m.charAt(0)) {
                case "(?=":
                  break;

                case "(?!":
                  break;

                case "(?<=":
                  break;

                case "(?<!":
                  break;

                case opts.escapeChar:
                  escaped = !0, regexMask && defaultCase();
                  break;

                case opts.optionalmarker[1]:
                case opts.groupmarker[1]:
                  closeGroup();
                  break;

                case opts.optionalmarker[0]:
                  openenings.push(new MaskToken(!1, !0));
                  break;

                case opts.groupmarker[0]:
                  openenings.push(new MaskToken(!0));
                  break;

                case opts.quantifiermarker[0]:
                  var quantifier = new MaskToken(!1, !1, !0);
                  m = m.replace(/[{}]/g, "");
                  var mqj = m.split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                  "*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                      min: mq0,
                      max: mq1,
                      jit: mqj[1]
                  };
                  var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
                  if (match = matches.pop(), match.isAlternator) {
                      matches.push(match), matches = match.matches;
                      var groupToken = new MaskToken(!0), tmpMatch = matches.pop();
                      matches.push(groupToken), matches = groupToken.matches, match = tmpMatch;
                  }
                  match.isGroup || (match = groupify([ match ])), matches.push(match), matches.push(quantifier);
                  break;

                case opts.alternatormarker:
                  if (0 < openenings.length) {
                      currentOpeningToken = openenings[openenings.length - 1];
                      var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                      lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches);
                  } else lastMatch = groupQuantifier(currentToken.matches);
                  if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), 
                  lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), 
                  openenings.push(alternator), lastMatch.openGroup) {
                      lastMatch.openGroup = !1;
                      var alternatorGroup = new MaskToken(!0);
                      alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
                  }
                  break;

                default:
                  defaultCase();
              }
          }
          for (closeRegexGroup && closeGroup(); 0 < openenings.length; ) openingToken = openenings.pop(), 
          currentToken.matches.push(openingToken);
          return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), 
          (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
      }
      function inputmask_typeof(obj) {
          return inputmask_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
              return typeof obj;
          } : function _typeof(obj) {
              return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          }, inputmask_typeof(obj);
      }
      var inputmask_document = global_window.a.document, dataKey = "_inputmask_opts";
      function inputmask_Inputmask(alias, options, internal) {
          if (!(this instanceof inputmask_Inputmask)) return new inputmask_Inputmask(alias, options, internal);
          this.dependencyLib = inputmask_dependencyLib, this.el = void 0, this.events = {}, 
          this.maskset = void 0, !0 !== internal && ("[object Object]" === Object.prototype.toString.call(alias) ? options = alias : (options = options || {}, 
          alias && (options.alias = alias)), this.opts = inputmask_dependencyLib.extend(!0, {}, this.defaults, options), 
          this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, 
          resolveAlias(this.opts.alias, options, this.opts)), this.refreshValue = !1, this.undoValue = void 0, 
          this.$el = void 0, this.skipKeyPressEvent = !1, this.skipInputEvent = !1, this.validationEvent = !1, 
          this.ignorable = !1, this.maxLength, this.mouseEnter = !1, this.originalPlaceholder = void 0, 
          this.isComposing = !1;
      }
      function resolveAlias(aliasStr, options, opts) {
          var aliasDefinition = inputmask_Inputmask.prototype.aliases[aliasStr];
          return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
          inputmask_dependencyLib.extend(!0, opts, aliasDefinition), inputmask_dependencyLib.extend(!0, opts, options), 
          !0) : (null === opts.mask && (opts.mask = aliasStr), !1);
      }
      function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
          function importOption(option, optionData) {
              var attrOption = "" === dataAttribute ? option : dataAttribute + "-" + option;
              optionData = void 0 !== optionData ? optionData : npt.getAttribute(attrOption), 
              null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = global_window.a[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
              userOptions[option] = optionData);
          }
          if (!0 === opts.importDataAttributes) {
              var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;
              if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), 
              dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, 
              dataoptions) if ("alias" === p.toLowerCase()) {
                  optionData = dataoptions[p];
                  break;
              }
              for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), 
              opts) {
                  if (dataoptions) for (p in optionData = void 0, dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                      optionData = dataoptions[p];
                      break;
                  }
                  importOption(option, optionData);
              }
          }
          return inputmask_dependencyLib.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), 
          "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), 
          opts.isRTL = !0), Object.keys(userOptions).length;
      }
      inputmask_Inputmask.prototype = {
          dataAttribute: "data-inputmask",
          defaults: {
              _maxTestPos: 500,
              placeholder: "_",
              optionalmarker: [ "[", "]" ],
              quantifiermarker: [ "{", "}" ],
              groupmarker: [ "(", ")" ],
              alternatormarker: "|",
              escapeChar: "\\",
              mask: null,
              regex: null,
              oncomplete: function oncomplete() {},
              onincomplete: function onincomplete() {},
              oncleared: function oncleared() {},
              repeat: 0,
              greedy: !1,
              autoUnmask: !1,
              removeMaskOnSubmit: !1,
              clearMaskOnLostFocus: !0,
              insertMode: !0,
              insertModeVisual: !0,
              clearIncomplete: !1,
              alias: null,
              onKeyDown: function onKeyDown() {},
              onBeforeMask: null,
              onBeforePaste: function onBeforePaste(pastedValue, opts) {
                  return "function" == typeof opts.onBeforeMask ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
              },
              onBeforeWrite: null,
              onUnMask: null,
              showMaskOnFocus: !0,
              showMaskOnHover: !0,
              onKeyValidation: function onKeyValidation() {},
              skipOptionalPartCharacter: " ",
              numericInput: !1,
              rightAlign: !1,
              undoOnEscape: !0,
              radixPoint: "",
              _radixDance: !1,
              groupSeparator: "",
              keepStatic: null,
              positionCaretOnTab: !0,
              tabThrough: !1,
              supportsInputType: [ "text", "tel", "url", "password", "search" ],
              ignorables: [ 8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
              isComplete: null,
              preValidation: null,
              postValidation: null,
              staticDefinitionSymbol: void 0,
              jitMasking: !1,
              nullable: !0,
              inputEventOnly: !1,
              noValuePatching: !1,
              positionCaretOnClick: "lvp",
              casing: null,
              inputmode: "text",
              importDataAttributes: !0,
              shiftPositions: !0
          },
          definitions: {
              9: {
                  validator: "[0-9\uff10-\uff19]",
                  definitionSymbol: "*"
              },
              a: {
                  validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                  definitionSymbol: "*"
              },
              "*": {
                  validator: "[0-9\uff10-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"
              }
          },
          aliases: {},
          masksCache: {},
          get isRTL() {
              return this.opts.isRTL || this.opts.numericInput;
          },
          mask: function mask(elems) {
              var that = this;
              return "string" == typeof elems && (elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems)), 
              elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el, ndx) {
                  var scopedOpts = inputmask_dependencyLib.extend(!0, {}, that.opts);
                  if (importAttributeOptions(el, scopedOpts, inputmask_dependencyLib.extend(!0, {}, that.userOptions), that.dataAttribute)) {
                      var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                      void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, 
                      el.inputmask.remove()), el.inputmask = new inputmask_Inputmask(void 0, void 0, !0), 
                      el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = inputmask_dependencyLib.extend(!0, {}, that.userOptions), 
                      el.inputmask.el = el, el.inputmask.$el = inputmask_dependencyLib(el), el.inputmask.maskset = maskset, 
                      inputmask_dependencyLib.data(el, dataKey, that.userOptions), mask_mask.call(el.inputmask));
                  }
              }), elems && elems[0] && elems[0].inputmask || this;
          },
          option: function option(options, noremask) {
              return "string" == typeof options ? this.opts[options] : "object" === inputmask_typeof(options) ? (inputmask_dependencyLib.extend(this.userOptions, options), 
              this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
          },
          unmaskedvalue: function unmaskedvalue(value) {
              if (this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
              void 0 === this.el || void 0 !== value) {
                  var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
                  checkVal.call(this, void 0, !1, !1, valueBuffer), "function" == typeof this.opts.onBeforeWrite && this.opts.onBeforeWrite.call(this, void 0, getBuffer.call(this), 0, this.opts);
              }
              return inputHandling_unmaskedvalue.call(this, this.el);
          },
          remove: function remove() {
              if (this.el) {
                  inputmask_dependencyLib.data(this.el, dataKey, null);
                  var cv = this.opts.autoUnmask ? inputHandling_unmaskedvalue(this.el) : this._valueGet(this.opts.autoUnmask), valueProperty;
                  cv !== getBufferTemplate.call(this).join("") ? this._valueSet(cv, this.opts.autoUnmask) : this._valueSet(""), 
                  EventRuler_off(this.el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value"), 
                  valueProperty && this.__valueGet && Object.defineProperty(this.el, "value", {
                      get: this.__valueGet,
                      set: this.__valueSet,
                      configurable: !0
                  })) : inputmask_document.__lookupGetter__ && this.el.__lookupGetter__("value") && this.__valueGet && (this.el.__defineGetter__("value", this.__valueGet), 
                  this.el.__defineSetter__("value", this.__valueSet)), this.el.inputmask = void 0;
              }
              return this.el;
          },
          getemptymask: function getemptymask() {
              return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
              getBufferTemplate.call(this).join("");
          },
          hasMaskedValue: function hasMaskedValue() {
              return !this.opts.autoUnmask;
          },
          isComplete: function isComplete() {
              return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
              validation_isComplete.call(this, getBuffer.call(this));
          },
          getmetadata: function getmetadata() {
              if (this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
              Array.isArray(this.maskset.metadata)) {
                  var maskTarget = getMaskTemplate.call(this, !0, 0, !1).join("");
                  return this.maskset.metadata.forEach(function(mtdt) {
                      return mtdt.mask !== maskTarget || (maskTarget = mtdt, !1);
                  }), maskTarget;
              }
              return this.maskset.metadata;
          },
          isValid: function isValid(value) {
              if (this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
              value) {
                  var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
                  checkVal.call(this, void 0, !0, !1, valueBuffer);
              } else value = this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join("");
              for (var buffer = getBuffer.call(this), rl = determineLastRequiredPosition.call(this), lmib = buffer.length - 1; rl < lmib && !isMask.call(this, lmib); lmib--) ;
              return buffer.splice(rl, lmib + 1 - rl), validation_isComplete.call(this, buffer) && value === (this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join(""));
          },
          format: function format(value, metadata) {
              this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
              var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
              checkVal.call(this, void 0, !0, !1, valueBuffer);
              var formattedValue = this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join("");
              return metadata ? {
                  value: formattedValue,
                  metadata: this.getmetadata()
              } : formattedValue;
          },
          setValue: function setValue(value) {
              this.el && inputmask_dependencyLib(this.el).trigger("setvalue", [ value ]);
          },
          analyseMask: analyseMask
      }, inputmask_Inputmask.extendDefaults = function(options) {
          inputmask_dependencyLib.extend(!0, inputmask_Inputmask.prototype.defaults, options);
      }, inputmask_Inputmask.extendDefinitions = function(definition) {
          inputmask_dependencyLib.extend(!0, inputmask_Inputmask.prototype.definitions, definition);
      }, inputmask_Inputmask.extendAliases = function(alias) {
          inputmask_dependencyLib.extend(!0, inputmask_Inputmask.prototype.aliases, alias);
      }, inputmask_Inputmask.format = function(value, options, metadata) {
          return inputmask_Inputmask(options).format(value, metadata);
      }, inputmask_Inputmask.unmask = function(value, options) {
          return inputmask_Inputmask(options).unmaskedvalue(value);
      }, inputmask_Inputmask.isValid = function(value, options) {
          return inputmask_Inputmask(options).isValid(value);
      }, inputmask_Inputmask.remove = function(elems) {
          "string" == typeof elems && (elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems)), 
          elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el) {
              el.inputmask && el.inputmask.remove();
          });
      }, inputmask_Inputmask.setValue = function(elems, value) {
          "string" == typeof elems && (elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems)), 
          elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el) {
              el.inputmask ? el.inputmask.setValue(value) : inputmask_dependencyLib(el).trigger("setvalue", [ value ]);
          });
      }, inputmask_Inputmask.dependencyLib = inputmask_dependencyLib, global_window.a.Inputmask = inputmask_Inputmask;
      var lib_inputmask = __webpack_exports__.default = inputmask_Inputmask;
  }, function(module, exports, __webpack_require__) {
      __webpack_require__(8), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12), 
      module.exports = __webpack_require__(3);
  }, , function(module, exports) {
      function _typeof(obj) {
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
              return typeof obj;
          } : function _typeof(obj) {
              return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          }, _typeof(obj);
      }
      "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function(object) {
          return object.__proto__;
      } : function(object) {
          return object.constructor.prototype;
      });
  }, , function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
      _inputmask__WEBPACK_IMPORTED_MODULE_0__.default.extendDefinitions({
          A: {
              validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
              casing: "upper"
          },
          "&": {
              validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
              casing: "upper"
          },
          "#": {
              validator: "[0-9A-Fa-f]",
              casing: "upper"
          }
      });
      var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
      function ipValidator(chrs, maskset, pos, strict, opts) {
          return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
          -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, 
          ipValidatorRegex.test(chrs);
      }
      _inputmask__WEBPACK_IMPORTED_MODULE_0__.default.extendAliases({
          cssunit: {
              regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
          },
          url: {
              regex: "(https?|ftp)://.*",
              autoUnmask: !1,
              keepStatic: !1
          },
          ip: {
              mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
              definitions: {
                  i: {
                      validator: ipValidator
                  },
                  j: {
                      validator: ipValidator
                  },
                  k: {
                      validator: ipValidator
                  },
                  l: {
                      validator: ipValidator
                  }
              },
              onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                  return maskedValue;
              },
              inputmode: "numeric"
          },
          email: {
              mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
              greedy: !1,
              casing: "lower",
              onBeforePaste: function onBeforePaste(pastedValue, opts) {
                  return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
              },
              definitions: {
                  "*": {
                      validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
                  },
                  "-": {
                      validator: "[0-9A-Za-z-]"
                  }
              },
              onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                  return maskedValue;
              },
              inputmode: "email"
          },
          mac: {
              mask: "##:##:##:##:##:##"
          },
          vin: {
              mask: "V{13}9{4}",
              definitions: {
                  V: {
                      validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                      casing: "upper"
                  }
              },
              clearIncomplete: !0,
              autoUnmask: !0
          },
          ssn: {
              mask: "999-99-9999",
              postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
                  return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(buffer.join(""));
              }
          }
      });
  }, function(module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__9__;
  }, function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3), _keycode_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _keycode_json__WEBPACK_IMPORTED_MODULE_1___namespace = __webpack_require__.t(0, 1), _escapeRegex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
      function _typeof(obj) {
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
              return typeof obj;
          } : function _typeof(obj) {
              return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          }, _typeof(obj);
      }
      var $ = _inputmask__WEBPACK_IMPORTED_MODULE_0__.default.dependencyLib, currentYear = new Date().getFullYear(), formatCode = {
          d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
          dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
              return pad(Date.prototype.getDate.call(this), 2);
          } ],
          ddd: [ "" ],
          dddd: [ "" ],
          m: [ "[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
              return Date.prototype.getMonth.call(this) + 1;
          } ],
          mm: [ "0[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
              return pad(Date.prototype.getMonth.call(this) + 1, 2);
          } ],
          mmm: [ "" ],
          mmmm: [ "" ],
          yy: [ "[0-9]{2}", Date.prototype.setFullYear, "year", function() {
              return pad(Date.prototype.getFullYear.call(this), 2);
          } ],
          yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
              return pad(Date.prototype.getFullYear.call(this), 4);
          } ],
          h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
          hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
              return pad(Date.prototype.getHours.call(this), 2);
          } ],
          hx: [ function(x) {
              return "[0-9]{".concat(x, "}");
          }, Date.prototype.setHours, "hours", function(x) {
              return Date.prototype.getHours;
          } ],
          H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
          HH: [ "0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
              return pad(Date.prototype.getHours.call(this), 2);
          } ],
          Hx: [ function(x) {
              return "[0-9]{".concat(x, "}");
          }, Date.prototype.setHours, "hours", function(x) {
              return function() {
                  return pad(Date.prototype.getHours.call(this), x);
              };
          } ],
          M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
          MM: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function() {
              return pad(Date.prototype.getMinutes.call(this), 2);
          } ],
          s: [ "[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds ],
          ss: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function() {
              return pad(Date.prototype.getSeconds.call(this), 2);
          } ],
          l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
              return pad(Date.prototype.getMilliseconds.call(this), 3);
          } ],
          L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
              return pad(Date.prototype.getMilliseconds.call(this), 2);
          } ],
          t: [ "[ap]" ],
          tt: [ "[ap]m" ],
          T: [ "[AP]" ],
          TT: [ "[AP]M" ],
          Z: [ "" ],
          o: [ "" ],
          S: [ "" ]
      }, formatAlias = {
          isoDate: "yyyy-mm-dd",
          isoTime: "HH:MM:ss",
          isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
          isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
      };
      function formatcode(match) {
          var dynMatches = new RegExp("\\d+$").exec(match[0]);
          if (dynMatches && void 0 !== dynMatches[0]) {
              var fcode = formatCode[match[0][0] + "x"].slice("");
              return fcode[0] = fcode[0](dynMatches[0]), fcode[3] = fcode[3](dynMatches[0]), fcode;
          }
          if (formatCode[match[0]]) return formatCode[match[0]];
      }
      function getTokenizer(opts) {
          if (!opts.tokenizer) {
              var tokens = [], dyntokens = [];
              for (var ndx in formatCode) if (/\.*x$/.test(ndx)) {
                  var dynToken = ndx[0] + "\\d+";
                  -1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken);
              } else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
              opts.tokenizer = "(" + (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.", 
              opts.tokenizer = new RegExp(opts.tokenizer, "g");
          }
          return opts.tokenizer;
      }
      function prefillYear(dateParts, currentResult, opts) {
          if (dateParts.year !== dateParts.rawyear) {
              var crrntyear = currentYear.toString(), enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""), currentYearPart = crrntyear.slice(0, enteredPart.length), currentYearNextPart = crrntyear.slice(enteredPart.length);
              if (2 === enteredPart.length && enteredPart === currentYearPart) {
                  var entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
                  dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime()) && (dateParts.date.setFullYear(currentYear), 
                  dateParts.year = crrntyear, currentResult.insert = [ {
                      pos: currentResult.pos + 1,
                      c: currentYearNextPart[0]
                  }, {
                      pos: currentResult.pos + 2,
                      c: currentYearNextPart[1]
                  } ]);
              }
          }
          return currentResult;
      }
      function isValidDate(dateParts, currentResult, opts) {
          if (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) return currentResult;
          if ("29" == dateParts.day) {
              var tokenMatch = getTokenMatch(currentResult.pos, opts);
              if ("yyyy" === tokenMatch.targetMatch[0] && currentResult.pos - tokenMatch.targetMatchIndex == 2) return currentResult.remove = currentResult.pos + 1, 
              currentResult;
          }
          return !1;
      }
      function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
          if (!result) return result;
          if (opts.min) {
              if (dateParts.rawyear) {
                  var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""), minYear = opts.min.year.substr(0, rawYear.length), maxYear;
                  if (rawYear < minYear) {
                      var tokenMatch = getTokenMatch(result.pos, opts);
                      if (rawYear = dateParts.rawyear.substr(0, result.pos - tokenMatch.targetMatchIndex + 1), 
                      minYear = opts.min.year.substr(0, rawYear.length), minYear <= rawYear) return result.remove = tokenMatch.targetMatchIndex + rawYear.length, 
                      result;
                      if (rawYear = "yyyy" === tokenMatch.targetMatch[0] ? dateParts.rawyear.substr(1, 1) : dateParts.rawyear.substr(0, 1), 
                      minYear = opts.min.year.substr(2, 1), maxYear = opts.max ? opts.max.year.substr(2, 1) : rawYear, 
                      1 === rawYear.length && minYear <= rawYear <= maxYear && !0 !== fromCheckval) return "yyyy" === tokenMatch.targetMatch[0] ? (result.insert = [ {
                          pos: result.pos + 1,
                          c: rawYear,
                          strict: !0
                      } ], result.caret = result.pos + 2, maskset.validPositions[result.pos].input = opts.min.year[1]) : (result.insert = [ {
                          pos: result.pos + 1,
                          c: opts.min.year[1],
                          strict: !0
                      }, {
                          pos: result.pos + 2,
                          c: rawYear,
                          strict: !0
                      } ], result.caret = result.pos + 3, maskset.validPositions[result.pos].input = opts.min.year[0]), 
                      result;
                      result = !1;
                  }
              }
              result && dateParts.year && dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime());
          }
          return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), 
          result;
      }
      function parse(format, dateObjValue, opts, raw) {
          var mask = "", match, fcode;
          for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format); ) if (void 0 === dateObjValue) if (fcode = formatcode(match)) mask += "(" + fcode[0] + ")"; else switch (match[0]) {
            case "[":
              mask += "(";
              break;

            case "]":
              mask += ")?";
              break;

            default:
              mask += Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(match[0]);
          } else if (fcode = formatcode(match)) if (!0 !== raw && fcode[3]) {
              var getFn = fcode[3];
              mask += getFn.call(dateObjValue.date);
          } else fcode[2] ? mask += dateObjValue["raw" + fcode[2]] : mask += match[0]; else mask += match[0];
          return mask;
      }
      function pad(val, len) {
          for (val = String(val), len = len || 2; val.length < len; ) val = "0" + val;
          return val;
      }
      function analyseMask(maskString, format, opts) {
          var dateObj = {
              date: new Date(1, 0, 1)
          }, targetProp, mask = maskString, match, dateOperation;
          function setValue(dateObj, value, opts) {
              dateObj[targetProp] = value.replace(/[^0-9]/g, "0"), dateObj["raw" + targetProp] = value, 
              void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
          }
          if ("string" == typeof mask) {
              for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format); ) {
                  var dynMatches = new RegExp("\\d+$").exec(match[0]), fcode = dynMatches ? match[0][0] + "x" : match[0], value = void 0;
                  if (dynMatches) {
                      var lastIndex = getTokenizer(opts).lastIndex, tokanMatch = getTokenMatch(match.index, opts);
                      getTokenizer(opts).lastIndex = lastIndex, value = mask.slice(0, mask.indexOf(tokanMatch.nextMatch[0]));
                  } else value = mask.slice(0, fcode.length);
                  Object.prototype.hasOwnProperty.call(formatCode, fcode) && (targetProp = formatCode[fcode][2], 
                  dateOperation = formatCode[fcode][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length);
              }
              return dateObj;
          }
          if (mask && "object" === _typeof(mask) && Object.prototype.hasOwnProperty.call(mask, "date")) return mask;
      }
      function importDate(dateObj, opts) {
          return parse(opts.inputFormat, {
              date: dateObj
          }, opts);
      }
      function getTokenMatch(pos, opts) {
          var calcPos = 0, targetMatch, match, matchLength = 0;
          for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat); ) {
              var dynMatches = new RegExp("\\d+$").exec(match[0]);
              if (matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length, calcPos += matchLength, 
              pos <= calcPos) {
                  targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
                  break;
              }
          }
          return {
              targetMatchIndex: calcPos - matchLength,
              nextMatch: match,
              targetMatch: targetMatch
          };
      }
      _inputmask__WEBPACK_IMPORTED_MODULE_0__.default.extendAliases({
          datetime: {
              mask: function mask(opts) {
                  return opts.numericInput = !1, formatCode.S = opts.i18n.ordinalSuffix.join("|"), 
                  opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, 
                  opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, 
                  opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), 
                  opts.regex = parse(opts.inputFormat, void 0, opts), opts.min = analyseMask(opts.min, opts.inputFormat, opts), 
                  opts.max = analyseMask(opts.max, opts.inputFormat, opts), null;
              },
              placeholder: "",
              inputFormat: "isoDateTime",
              displayFormat: void 0,
              outputFormat: void 0,
              min: null,
              max: null,
              skipOptionalPartCharacter: "",
              i18n: {
                  dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                  monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                  ordinalSuffix: [ "st", "nd", "rd", "th" ]
              },
              preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                  if (strict) return !0;
                  if (isNaN(c) && buffer[pos] !== c) {
                      var tokenMatch = getTokenMatch(pos, opts);
                      if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && 1 < tokenMatch.targetMatch[0].length) {
                          var validator = formatCode[tokenMatch.targetMatch[0]][0];
                          if (new RegExp(validator).test("0" + buffer[pos - 1])) return buffer[pos] = buffer[pos - 1], 
                          buffer[pos - 1] = "0", {
                              fuzzy: !0,
                              buffer: buffer,
                              refreshFromBuffer: {
                                  start: pos - 1,
                                  end: pos + 1
                              },
                              pos: pos + 1
                          };
                      }
                  }
                  return !0;
              },
              postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
                  if (strict) return !0;
                  var tokenMatch, validator;
                  if (!1 === currentResult) return tokenMatch = getTokenMatch(pos + 1, opts), tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && 1 < tokenMatch.targetMatch[0].length && void 0 !== formatCode[tokenMatch.targetMatch[0]] && (validator = formatCode[tokenMatch.targetMatch[0]][0], 
                  new RegExp(validator).test("0" + c)) ? {
                      insert: [ {
                          pos: pos,
                          c: "0"
                      }, {
                          pos: pos + 1,
                          c: c
                      } ],
                      pos: pos + 1
                  } : currentResult;
                  if (currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos), 
                  tokenMatch = getTokenMatch(pos, opts), tokenMatch.targetMatch && tokenMatch.targetMatch[0] && void 0 !== formatCode[tokenMatch.targetMatch[0]]) {
                      validator = formatCode[tokenMatch.targetMatch[0]][0];
                      var part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
                      !1 === new RegExp(validator).test(part.join("")) && 2 === tokenMatch.targetMatch[0].length && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1] && (maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0");
                  }
                  var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                  return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = prefillYear(dateParts, result, opts), 
                  result = isValidDate(dateParts, result, opts), result = isDateInRange(dateParts, result, opts, maskset, fromCheckval)), 
                  pos && result && currentResult.pos !== pos ? {
                      buffer: parse(opts.inputFormat, dateParts, opts).split(""),
                      refreshFromBuffer: {
                          start: pos,
                          end: currentResult.pos
                      }
                  } : result;
              },
              onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                  var input = this;
                  e.ctrlKey && e.keyCode === _keycode_json__WEBPACK_IMPORTED_MODULE_1__.RIGHT && (this.inputmask._valueSet(importDate(new Date(), opts)), 
                  $(this).trigger("setvalue"));
              },
              onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                  return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue;
              },
              casing: function casing(elem, test, pos, validPositions) {
                  return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem;
              },
              onBeforeMask: function onBeforeMask(initialValue, opts) {
                  return "[object Date]" === Object.prototype.toString.call(initialValue) && (initialValue = importDate(initialValue, opts)), 
                  initialValue;
              },
              insertMode: !1,
              shiftPositions: !1,
              keepStatic: !1,
              inputmode: "numeric"
          }
      });
  }, function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3), _keycode_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _keycode_json__WEBPACK_IMPORTED_MODULE_1___namespace = __webpack_require__.t(0, 1), _escapeRegex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1), $ = _inputmask__WEBPACK_IMPORTED_MODULE_0__.default.dependencyLib;
      function autoEscape(txt, opts) {
          for (var escapedTxt = "", i = 0; i < txt.length; i++) _inputmask__WEBPACK_IMPORTED_MODULE_0__.default.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
          return escapedTxt;
      }
      function alignDigits(buffer, digits, opts, force) {
          if (0 < buffer.length && 0 < digits && (!opts.digitsOptional || force)) {
              var radixPosition = buffer.indexOf(opts.radixPoint);
              -1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
              for (var i = 1; i <= digits; i++) isFinite(buffer[radixPosition + i]) || (buffer[radixPosition + i] = "0");
          }
          return buffer;
      }
      function findValidator(symbol, maskset) {
          var posNdx = 0;
          if ("+" === symbol) {
              for (posNdx in maskset.validPositions) ;
              posNdx = parseInt(posNdx);
          }
          for (var tstNdx in maskset.tests) if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
          return posNdx;
      }
      function findValid(symbol, maskset) {
          var ret = -1;
          for (var ndx in maskset.validPositions) {
              var tst = maskset.validPositions[ndx];
              if (tst && tst.match.def === symbol) {
                  ret = parseInt(ndx);
                  break;
              }
          }
          return ret;
      }
      function parseMinMaxOptions(opts) {
          void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.groupSeparator), "g"), ""), 
          "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), 
          opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), 
          null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.groupSeparator), "g"), ""), 
          "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), 
          opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), 
          opts.parseMinMaxOptions = "done");
      }
      function genMask(opts) {
          opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
          " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), 
          "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
          var decimalDef = "0", radixPointDef = opts.radixPoint;
          !0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", 
          opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, 
          opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1, 
          radixPointDef = "," === opts.radixPoint ? "?" : "!", "" !== opts.radixPoint && void 0 === opts.definitions[radixPointDef] && (opts.definitions[radixPointDef] = {}, 
          opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]", opts.definitions[radixPointDef].placeholder = opts.radixPoint, 
          opts.definitions[radixPointDef].static = !0, opts.definitions[radixPointDef].generated = !0)) : (opts.__financeInput = !1, 
          opts.numericInput = !0);
          var mask = "[+]", altMask;
          if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? (void 0 === opts.definitions[opts.groupSeparator] && (opts.definitions[opts.groupSeparator] = {}, 
          opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]", 
          opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator, opts.definitions[opts.groupSeparator].static = !0, 
          opts.definitions[opts.groupSeparator].generated = !0), mask += opts._mask(opts)) : mask += "9{+}", 
          void 0 !== opts.digits && 0 !== opts.digits) {
              var dq = opts.digits.toString().split(",");
              isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += radixPointDef + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}", 
              opts.keepStatic = !0) : mask += radixPointDef + decimalDef + "{" + opts.digits + "}");
          }
          return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [ altMask + autoEscape(opts.suffix, opts) + "[-]", mask ]), 
          opts.greedy = !1, parseMinMaxOptions(opts), mask;
      }
      function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
          return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (void 0 === maskset.validPositions[pos - 1] || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) && (pos -= 1), 
          pos;
      }
      function decimalValidator(chrs, maskset, pos, strict, opts) {
          var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1, result = -1 !== radixPos && new RegExp("[0-9\uff11-\uff19]").test(chrs);
          return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
              insert: {
                  pos: radixPos === pos ? radixPos + 1 : radixPos,
                  c: opts.radixPoint
              },
              pos: pos
          } : result;
      }
      function checkForLeadingZeroes(buffer, opts) {
          var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.negationSymbol.front) + "?" : "") + Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.prefix) + ")(.*)(" + Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.suffix) + ("" != opts.negationSymbol.back ? Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")), number = numberMatches ? numberMatches[2] : "", leadingzeroes = !1;
          return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), 
          !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes;
      }
      _inputmask__WEBPACK_IMPORTED_MODULE_0__.default.extendAliases({
          numeric: {
              mask: genMask,
              _mask: function _mask(opts) {
                  return "(" + opts.groupSeparator + "999){+|1}";
              },
              digits: "*",
              digitsOptional: !0,
              enforceDigitsOnBlur: !1,
              radixPoint: ".",
              positionCaretOnClick: "radixFocus",
              _radixDance: !0,
              groupSeparator: "",
              allowMinus: !0,
              negationSymbol: {
                  front: "-",
                  back: ""
              },
              prefix: "",
              suffix: "",
              min: null,
              max: null,
              SetMaxOnOverflow: !1,
              step: 1,
              inputType: "text",
              unmaskAsNumber: !1,
              roundingFN: Math.round,
              inputmode: "numeric",
              shortcuts: {
                  k: "000",
                  m: "000000"
              },
              placeholder: "0",
              greedy: !1,
              rightAlign: !0,
              insertMode: !0,
              autoUnmask: !1,
              skipOptionalPartCharacter: "",
              definitions: {
                  0: {
                      validator: decimalValidator
                  },
                  1: {
                      validator: decimalValidator,
                      definitionSymbol: "9"
                  },
                  "+": {
                      validator: function validator(chrs, maskset, pos, strict, opts) {
                          return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
                      }
                  },
                  "-": {
                      validator: function validator(chrs, maskset, pos, strict, opts) {
                          return opts.allowMinus && chrs === opts.negationSymbol.back;
                      }
                  }
              },
              preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                  if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
                  var pattern;
                  if (pattern = opts.shortcuts && opts.shortcuts[c]) {
                      if (1 < pattern.length) for (var inserts = [], i = 0; i < pattern.length; i++) inserts.push({
                          pos: pos + i,
                          c: pattern[i],
                          strict: !1
                      });
                      return {
                          insert: inserts
                      };
                  }
                  var radixPos = buffer.indexOf(opts.radixPoint), initPos = pos;
                  if (pos = hanndleRadixDance(pos, c, radixPos, maskset, opts), "-" === c || c === opts.negationSymbol.front) {
                      if (!0 !== opts.allowMinus) return !1;
                      var isNegative = !1, front = findValid("+", maskset), back = findValid("-", maskset);
                      return -1 !== front && (isNegative = [ front, back ]), !1 !== isNegative ? {
                          remove: isNegative,
                          caret: initPos
                      } : {
                          insert: [ {
                              pos: findValidator("+", maskset),
                              c: opts.negationSymbol.front,
                              fromIsValid: !0
                          }, {
                              pos: findValidator("-", maskset),
                              c: opts.negationSymbol.back,
                              fromIsValid: void 0
                          } ],
                          caret: initPos + opts.negationSymbol.back.length
                      };
                  }
                  if (strict) return !0;
                  if (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos) return {
                      caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
                  };
                  if (!1 === opts.__financeInput) if (isSelection) {
                      if (opts.digitsOptional) return {
                          rewritePosition: caretPos.end
                      };
                      if (!opts.digitsOptional) {
                          if (caretPos.begin > radixPos && caretPos.end <= radixPos) return c === opts.radixPoint ? {
                              insert: {
                                  pos: radixPos + 1,
                                  c: "0",
                                  fromIsValid: !0
                              },
                              rewritePosition: radixPos
                          } : {
                              rewritePosition: radixPos + 1
                          };
                          if (caretPos.begin < radixPos) return {
                              rewritePosition: caretPos.begin - 1
                          };
                      }
                  } else if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && 0 < opts.digits && "" === this.inputmask.__valueGet.call(this)) return {
                      rewritePosition: radixPos
                  };
                  return {
                      rewritePosition: pos
                  };
              },
              postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
                  if (!1 === currentResult) return currentResult;
                  if (strict) return !0;
                  if (null !== opts.min || null !== opts.max) {
                      var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
                          unmaskAsNumber: !0
                      }));
                      if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length > opts.min.toString().length || unmasked < 0)) return !1;
                      if (null !== opts.max && unmasked > opts.max) return !!opts.SetMaxOnOverflow && {
                          refreshFromBuffer: !0,
                          buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                      };
                  }
                  return currentResult;
              },
              onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                  if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                  var processValue = maskedValue.replace(opts.prefix, "");
                  return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.groupSeparator), "g"), ""), 
                  "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), 
                  opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a.call(this, opts.radixPoint), ".")), 
                  processValue = processValue.replace(new RegExp("^" + Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.negationSymbol.front)), "-"), 
                  processValue = processValue.replace(new RegExp(Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.negationSymbol.back) + "$"), ""), 
                  Number(processValue)) : processValue;
              },
              isComplete: function isComplete(buffer, opts) {
                  var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
                  return maskedValue = maskedValue.replace(new RegExp("^" + Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.negationSymbol.front)), "-"), 
                  maskedValue = maskedValue.replace(new RegExp(Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.negationSymbol.back) + "$"), ""), 
                  maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), 
                  maskedValue = maskedValue.replace(new RegExp(Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), 
                  "," === opts.radixPoint && (maskedValue = maskedValue.replace(Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.radixPoint), ".")), 
                  isFinite(maskedValue);
              },
              onBeforeMask: function onBeforeMask(initialValue, opts) {
                  var radixPoint = opts.radixPoint || ",";
                  isFinite(opts.digits) && (opts.digits = parseInt(opts.digits)), "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
                  var valueParts = initialValue.split(radixPoint), integerPart = valueParts[0].replace(/[^\-0-9]/g, ""), decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "", forceDigits = 1 < valueParts.length;
                  initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
                  var digits = 0;
                  if ("" !== radixPoint && (digits = opts.digitsOptional ? opts.digits < decimalPart.length ? opts.digits : decimalPart.length : opts.digits, 
                  "" !== decimalPart || !opts.digitsOptional)) {
                      var digitsFactor = Math.pow(10, digits || 1);
                      initialValue = initialValue.replace(Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(radixPoint), "."), 
                      isNaN(parseFloat(initialValue)) || (initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits)), 
                      initialValue = initialValue.toString().replace(".", radixPoint);
                  }
                  if (0 === opts.digits && -1 !== initialValue.indexOf(radixPoint) && (initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint))), 
                  null !== opts.min || null !== opts.max) {
                      var numberValue = initialValue.toString().replace(radixPoint, ".");
                      null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint));
                  }
                  return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
              },
              onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
                  function stripBuffer(buffer, stripRadix) {
                      if (!1 !== opts.__financeInput || stripRadix) {
                          var position = buffer.indexOf(opts.radixPoint);
                          -1 !== position && buffer.splice(position, 1);
                      }
                      if ("" !== opts.groupSeparator) for (;-1 !== (position = buffer.indexOf(opts.groupSeparator)); ) buffer.splice(position, 1);
                      return buffer;
                  }
                  var result, leadingzeroes = checkForLeadingZeroes(buffer, opts);
                  if (leadingzeroes) for (var caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1), offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0, i = leadingzeroes[0].length - offset; 0 < i; i--) delete this.maskset.validPositions[caretNdx + i], 
                  delete buffer[caretNdx + i];
                  if (e) switch (e.type) {
                    case "blur":
                    case "checkval":
                      if (null !== opts.min) {
                          var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
                              unmaskAsNumber: !0
                          }));
                          if (null !== opts.min && unmasked < opts.min) return {
                              refreshFromBuffer: !0,
                              buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                          };
                      }
                      if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                          var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.negationSymbol.front) + "?" : "") + Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.prefix) + ")(.*)(" + Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.suffix) + ("" != opts.negationSymbol.back ? Object(_escapeRegex__WEBPACK_IMPORTED_MODULE_2__.a)(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")), number = nmbrMtchs ? nmbrMtchs[2] : "";
                          0 == number && (result = {
                              refreshFromBuffer: !0,
                              buffer: [ 0 ]
                          });
                      } else "" !== opts.radixPoint && buffer[0] === opts.radixPoint && (result && result.buffer ? result.buffer.shift() : (buffer.shift(), 
                      result = {
                          refreshFromBuffer: !0,
                          buffer: stripBuffer(buffer)
                      }));
                      if (opts.enforceDigitsOnBlur) {
                          result = result || {};
                          var bffr = result && result.buffer || buffer.slice().reverse();
                          result.refreshFromBuffer = !0, result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse();
                      }
                  }
                  return result;
              },
              onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                  var $input = $(this), bffr;
                  if (e.ctrlKey) switch (e.keyCode) {
                    case _keycode_json__WEBPACK_IMPORTED_MODULE_1__.UP:
                      return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), 
                      $input.trigger("setvalue"), !1;

                    case _keycode_json__WEBPACK_IMPORTED_MODULE_1__.DOWN:
                      return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), 
                      $input.trigger("setvalue"), !1;
                  }
                  if (!e.shiftKey && (e.keyCode === _keycode_json__WEBPACK_IMPORTED_MODULE_1__.DELETE || e.keyCode === _keycode_json__WEBPACK_IMPORTED_MODULE_1__.BACKSPACE || e.keyCode === _keycode_json__WEBPACK_IMPORTED_MODULE_1__.BACKSPACE_SAFARI) && caretPos.begin !== buffer.length) {
                      if (buffer[e.keyCode === _keycode_json__WEBPACK_IMPORTED_MODULE_1__.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), 
                      "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), 
                      $input.trigger("setvalue", [ bffr.join(""), caretPos.begin ]), !1;
                      if (!0 === opts._radixDance) {
                          var radixPos = buffer.indexOf(opts.radixPoint);
                          if (opts.digitsOptional) {
                              if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [ bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin ]), 
                              !1;
                          } else if (-1 !== radixPos && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === _keycode_json__WEBPACK_IMPORTED_MODULE_1__.DELETE && caretPos.begin === radixPos)) return caretPos.begin !== caretPos.end || e.keyCode !== _keycode_json__WEBPACK_IMPORTED_MODULE_1__.BACKSPACE && e.keyCode !== _keycode_json__WEBPACK_IMPORTED_MODULE_1__.BACKSPACE_SAFARI || caretPos.begin++, 
                          bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1), 
                          bffr = alignDigits(bffr, opts.digits, opts).join(""), $input.trigger("setvalue", [ bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin ]), 
                          !1;
                      }
                  }
              }
          },
          currency: {
              prefix: "",
              groupSeparator: ",",
              alias: "numeric",
              digits: 2,
              digitsOptional: !1
          },
          decimal: {
              alias: "numeric"
          },
          integer: {
              alias: "numeric",
              digits: 0
          },
          percentage: {
              alias: "numeric",
              min: 0,
              max: 100,
              suffix: " %",
              digits: 0,
              allowMinus: !1
          },
          indianns: {
              alias: "numeric",
              _mask: function _mask(opts) {
                  return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
              },
              groupSeparator: ",",
              radixPoint: ".",
              placeholder: "0",
              digits: 2,
              digitsOptional: !1
          }
      });
  }, function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      var _global_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _inputmask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
      function _typeof(obj) {
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
              return typeof obj;
          } : function _typeof(obj) {
              return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          }, _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
      }
      function _inherits(subClass, superClass) {
          if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
          subClass.prototype = Object.create(superClass && superClass.prototype, {
              constructor: {
                  value: subClass,
                  writable: !0,
                  configurable: !0
              }
          }), superClass && _setPrototypeOf(subClass, superClass);
      }
      function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();
          return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                  var NewTarget = _getPrototypeOf(this).constructor;
                  result = Reflect.construct(Super, arguments, NewTarget);
              } else result = Super.apply(this, arguments);
              return _possibleConstructorReturn(this, result);
          };
      }
      function _possibleConstructorReturn(self, call) {
          return !call || "object" !== _typeof(call) && "function" != typeof call ? _assertThisInitialized(self) : call;
      }
      function _assertThisInitialized(self) {
          if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return self;
      }
      function _wrapNativeSuper(Class) {
          var _cache = "function" == typeof Map ? new Map() : void 0;
          return _wrapNativeSuper = function _wrapNativeSuper(Class) {
              if (null === Class || !_isNativeFunction(Class)) return Class;
              if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
              if ("undefined" != typeof _cache) {
                  if (_cache.has(Class)) return _cache.get(Class);
                  _cache.set(Class, Wrapper);
              }
              function Wrapper() {
                  return _construct(Class, arguments, _getPrototypeOf(this).constructor);
              }
              return Wrapper.prototype = Object.create(Class.prototype, {
                  constructor: {
                      value: Wrapper,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), _setPrototypeOf(Wrapper, Class);
          }, _wrapNativeSuper(Class);
      }
      function _construct(Parent, args, Class) {
          return _construct = _isNativeReflectConstruct() ? Reflect.construct : function _construct(Parent, args, Class) {
              var a = [ null ];
              a.push.apply(a, args);
              var Constructor = Function.bind.apply(Parent, a), instance = new Constructor();
              return Class && _setPrototypeOf(instance, Class.prototype), instance;
          }, _construct.apply(null, arguments);
      }
      function _isNativeReflectConstruct() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
              !0;
          } catch (e) {
              return !1;
          }
      }
      function _isNativeFunction(fn) {
          return -1 !== Function.toString.call(fn).indexOf("[native code]");
      }
      function _setPrototypeOf(o, p) {
          return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
              return o.__proto__ = p, o;
          }, _setPrototypeOf(o, p);
      }
      function _getPrototypeOf(o) {
          return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          }, _getPrototypeOf(o);
      }
      var document = _global_window__WEBPACK_IMPORTED_MODULE_0__.a.document;
      if (document && document.head && document.head.attachShadow && _global_window__WEBPACK_IMPORTED_MODULE_0__.a.customElements && void 0 === _global_window__WEBPACK_IMPORTED_MODULE_0__.a.customElements.get("input-mask")) {
          var InputmaskElement = function(_HTMLElement) {
              _inherits(InputmaskElement, _HTMLElement);
              var _super = _createSuper(InputmaskElement);
              function InputmaskElement() {
                  var _this;
                  _classCallCheck(this, InputmaskElement), _this = _super.call(this);
                  var attributeNames = _this.getAttributeNames(), shadow = _this.attachShadow({
                      mode: "closed"
                  }), input = document.createElement("input");
                  for (var attr in input.type = "text", shadow.appendChild(input), attributeNames) Object.prototype.hasOwnProperty.call(attributeNames, attr) && input.setAttribute(attributeNames[attr], _this.getAttribute(attributeNames[attr]));
                  var im = new _inputmask__WEBPACK_IMPORTED_MODULE_1__.default();
                  return im.dataAttribute = "", im.mask(input), input.inputmask.shadowRoot = shadow, 
                  _this;
              }
              return InputmaskElement;
          }(_wrapNativeSuper(HTMLElement));
          _global_window__WEBPACK_IMPORTED_MODULE_0__.a.customElements.define("input-mask", InputmaskElement);
      }
  } ], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
  __webpack_require__.d = function(exports, name, getter) {
      __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
          enumerable: !0,
          get: getter
      });
  }, __webpack_require__.r = function(exports) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module"
      }), Object.defineProperty(exports, "__esModule", {
          value: !0
      });
  }, __webpack_require__.t = function(value, mode) {
      if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
      if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
      var ns = Object.create(null);
      if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
          enumerable: !0,
          value: value
      }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
          return value[key];
      }.bind(null, key));
      return ns;
  }, __webpack_require__.n = function(module) {
      var getter = module && module.__esModule ? function getDefault() {
          return module.default;
      } : function getModuleExports() {
          return module;
      };
      return __webpack_require__.d(getter, "a", getter), getter;
  }, __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 4);
  function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) return installedModules[moduleId].exports;
      var module = installedModules[moduleId] = {
          i: moduleId,
          l: !1,
          exports: {}
      };
      return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
      module.l = !0, module.exports;
  }
  var modules, installedModules;
});;
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
    var typesToPatch = ['DocumentType', 'Element', 'CharacterData'],
        remove = function remove() {
        // The check here seems pointless, since we're not adding this
        // method to the prototypes of any any elements that CAN be the
        // root of the DOM. However, it's required by spec (see point 1 of
        // https://dom.spec.whatwg.org/#dom-childnode-remove) and would
        // theoretically make a difference if somebody .apply()ed this
        // method to the DOM's root node, so let's roll with it.
        if (this.parentNode != null) {
            this.parentNode.removeChild(this);
        }
    };

    for (var i = 0; i < typesToPatch.length; i++) {
        var type = typesToPatch[i];
        if (window[type] && !window[type].prototype.remove) {
            window[type].prototype.remove = remove;
        }
    }
})();
(function (root) {

    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;

    function noop() {}

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
        return function () {
            fn.apply(thisArg, arguments);
        };
    }

    function Promise(fn) {
        if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function') throw new TypeError('not a function');
        this._state = 0;
        this._handled = false;
        this._value = undefined;
        this._deferreds = [];

        doResolve(fn, this);
    }

    function handle(self, deferred) {
        while (self._state === 3) {
            self = self._value;
        }
        if (self._state === 0) {
            self._deferreds.push(deferred);
            return;
        }
        self._handled = true;
        Promise._immediateFn(function () {
            var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
            if (cb === null) {
                (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                return;
            }
            var ret;
            try {
                ret = cb(self._value);
            } catch (e) {
                reject(deferred.promise, e);
                return;
            }
            resolve(deferred.promise, ret);
        });
    }

    function resolve(self, newValue) {
        try {
            // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
            if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
                var then = newValue.then;
                if (newValue instanceof Promise) {
                    self._state = 3;
                    self._value = newValue;
                    finale(self);
                    return;
                } else if (typeof then === 'function') {
                    doResolve(bind(then, newValue), self);
                    return;
                }
            }
            self._state = 1;
            self._value = newValue;
            finale(self);
        } catch (e) {
            reject(self, e);
        }
    }

    function reject(self, newValue) {
        self._state = 2;
        self._value = newValue;
        finale(self);
    }

    function finale(self) {
        if (self._state === 2 && self._deferreds.length === 0) {
            Promise._immediateFn(function () {
                if (!self._handled) {
                    Promise._unhandledRejectionFn(self._value);
                }
            });
        }

        for (var i = 0, len = self._deferreds.length; i < len; i++) {
            handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, promise) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.promise = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
        var done = false;
        try {
            fn(function (value) {
                if (done) return;
                done = true;
                resolve(self, value);
            }, function (reason) {
                if (done) return;
                done = true;
                reject(self, reason);
            });
        } catch (ex) {
            if (done) return;
            done = true;
            reject(self, ex);
        }
    }

    Promise.prototype['catch'] = function (onRejected) {
        return this.then(null, onRejected);
    };

    Promise.prototype.then = function (onFulfilled, onRejected) {
        var prom = new this.constructor(noop);

        handle(this, new Handler(onFulfilled, onRejected, prom));
        return prom;
    };

    Promise.all = function (arr) {
        var args = Array.prototype.slice.call(arr);

        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([]);
            var remaining = args.length;

            function res(i, val) {
                try {
                    if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
                        var then = val.then;
                        if (typeof then === 'function') {
                            then.call(val, function (val) {
                                res(i, val);
                            }, reject);
                            return;
                        }
                    }
                    args[i] = val;
                    if (--remaining === 0) {
                        resolve(args);
                    }
                } catch (ex) {
                    reject(ex);
                }
            }

            for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    };

    Promise.resolve = function (value) {
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
            return value;
        }

        return new Promise(function (resolve) {
            resolve(value);
        });
    };

    Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    };

    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            for (var i = 0, len = values.length; i < len; i++) {
                values[i].then(resolve, reject);
            }
        });
    };

    // Use polyfill for setImmediate for performance gains
    Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
        setImmediate(fn);
    } || function (fn) {
        setTimeoutFunc(fn, 0);
    };

    Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        if (typeof console !== 'undefined' && console) {
            console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
        }
    };

    /**
     * Set the immediate function to execute callbacks
     * @param fn {function} Function to execute
     * @deprecated
     */
    Promise._setImmediateFn = function _setImmediateFn(fn) {
        Promise._immediateFn = fn;
    };

    /**
     * Change the function to execute on unhandled rejection
     * @param {function} fn Function to execute on unhandled rejection
     * @deprecated
     */
    Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
        Promise._unhandledRejectionFn = fn;
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Promise;
    } else if (!root.Promise) {
        root.Promise = Promise;
    }
})(window);

/* global Promise */
(function (window) {
    'use strict';

    if (!window.Promise) {
        window.Promise = Promise;
    }

    var RULE_REQUIRED = 'required',
        RULE_EMAIL = 'email',
        RULE_MINLENGTH = 'minLength',
        RULE_MAXLENGTH = 'maxLength',
        RULE_PASSWORD = 'password',
        RULE_ZIP = 'zip',
        RULE_PHONE = 'phone',
        RULE_REMOTE = 'remote',
        RULE_STRENGTH = 'strength',
        RULE_FUNCTION = 'function';

    var formatParams = function formatParams(params, method) {
        if (typeof params === 'string') {
            return params;
        }

        var letter = method.toLowerCase() === 'post' ? '' : '?';
        if (Array.isArray(params)) {
            return letter + params.map(function (obj) {
                return obj.name + '=' + obj.value;
            }).join('&');
        }
        return letter + Object.keys(params).map(function (key) {
            return key + '=' + params[key];
        }).join('&');
    };

    var ajax = function ajax(options) {
        var url = options.url,
            method = options.method,
            data = options.data,
            debug = options.debug,
            callback = options.callback,
            error = options.error;

        if (debug) {
            callback('test');
            return;
        }

        var async = options.async === false ? false : true;
        var xhr = new XMLHttpRequest();
        var params = formatParams(data, 'get');
        var body = null;

        if (method.toLowerCase() === 'post') {
            body = formatParams(data, 'post');
            params = '';
        }

        xhr.open(method, url + params, async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    callback(this.responseText);
                } else {
                    error && error(this.responseText);
                }
            }
        };
        xhr.send(body);
    };

    var JustValidate = function JustValidate(selector, options) {
        this.options = options || {};
        this.rules = this.options.rules || {};
        this.messages = this.options.messages || undefined;
        this.colorWrong = this.options.colorWrong || '#B81111';
        this.result = {};
        this.elements = [];
        this.tooltip = this.options.tooltip || {};
        this.tooltipFadeOutTime = this.tooltip.fadeOutTime || 5000;
        this.tooltipFadeOutClass = this.tooltip.fadeOutClass || 'just-validate-tooltip-hide';
        this.tooltipSelectorWrap = document.querySelectorAll(this.tooltip.selectorWrap).length ? document.querySelectorAll(this.tooltip.selectorWrap) : document.querySelectorAll('.just-validate-tooltip-container');
        this.bindHandlerKeyup = this.handlerKeyup.bind(this);
        this.submitHandler = this.options.submitHandler || undefined;
        this.invalidFormCallback = this.options.invalidFormCallback || undefined;
        this.promisesRemote = [];
        this.isValidationSuccess = false;
        this.focusWrongField = this.options.focusWrongField || false;
        this.REGEXP = {
            // eslint-disable-next-line max-len
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            zip: /^\d{5}(-\d{4})?$/,
            phone: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
            password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
            strengthPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/
        };
        this.DEFAULT_REMOTE_ERROR = 'Error';
        this.state = {
            tooltipsTimer: null
        };

        this.setForm(document.querySelector(selector));
    };

    JustValidate.prototype = {
        defaultRules: {
            email: {
                required: true,
                email: true
            },
            name: {
                required: true,
                minLength: 3,
                maxLength: 15
            },
            text: {
                required: true,
                maxLength: 300,
                minLength: 5
            },
            password: {
                required: true,
                password: true,
                minLength: 4,
                maxLength: 8
            },
            zip: {
                required: true,
                zip: true
            },
            phone: {
                phone: true
            }
        },

        defaultMessages: {
            required: 'The field is required',
            email: 'Please, type a valid email',
            maxLength: 'The field must contain a maximum of :value characters',
            minLength: 'The field must contain a minimum of :value characters',
            password: 'Password is not valid',
            remote: 'Email already exists',
            strength: 'Password must contents at least one uppercase letter, one lowercase letter and one number',
            function: 'Function returned false'
        },

        /**
         * Keyup handler
         * @param ev
         */
        handlerKeyup: function handlerKeyup(ev) {
            var elem = ev.target,
                item = {
                name: elem.getAttribute('data-validate-field'),
                value: elem.value
            };
            delete this.result[item.name];
            this.validateItem({
                name: item.name,
                value: item.value,
                group: [],
                isKeyupChange: true
            });
            this.renderErrors();
        },

        setterEventListener: function setterEventListener(item, event, handler, type) {
            if (event === 'keyup') {
                handler = this.bindHandlerKeyup;
            }
            switch (type) {
                case 'add':
                    {
                        item.addEventListener(event, handler);
                        break;
                    }
                case 'remove':
                    {
                        item.removeEventListener(event, handler);
                        break;
                    }
            }
        },

        getElementsRealValue: function getElementsRealValue() {
            var $elems = this.$form.querySelectorAll('*'),
                name = void 0,
                result = {};
            for (var i = 0, len = $elems.length; i < len; ++i) {
                name = $elems[i].getAttribute('name');
                if (name) {
                    if ($elems[i].type === 'checkbox') {
                        result[name] = $elems[i].checked;
                        continue;
                    }
                    result[name] = $elems[i].value;
                }
            }
            return result;
        },

        validationFailed: function validationFailed() {
            if (this.invalidFormCallback) {
                this.invalidFormCallback(this.result);
            }

            var $firstErrorField = document.querySelector('.js-validate-error-field');

            if (this.focusWrongField && $firstErrorField && $firstErrorField.focus) {
                $firstErrorField.focus();
            }
        },

        validationSuccess: function validationSuccess() {
            if (Object.keys(this.result).length === 0) {
                this.isValidationSuccess = false;
                if (this.submitHandler) {
                    var realValues = this.getElementsRealValue();
                    this.submitHandler(this.$form, realValues, ajax);
                    return;
                }

                this.$form.submit();
            }
        },

        setForm: function setForm(form) {
            var _this = this;

            this.$form = form;
            this.$form.setAttribute('novalidate', 'novalidate');
            this.$form.addEventListener('submit', function (ev) {
                ev.preventDefault();
                _this.result = [];
                _this.getElements();

                if (!_this.promisesRemote.length) {
                    if (_this.isValidationSuccess) {
                        _this.validationSuccess();
                    } else {
                        _this.validationFailed();
                    }
                    return;
                }

                Promise.all(_this.promisesRemote).then(function () {
                    _this.promisesRemote = [];

                    if (_this.isValidationSuccess) {
                        _this.validationSuccess();
                    } else {
                        _this.validationFailed();
                    }
                });
            });
        },

        isEmail: function isEmail(email) {
            return this.REGEXP.email.test(email);
        },

        isZip: function isZip(zip) {
            return this.REGEXP.zip.test(zip);
        },

        isPhone: function isPhone(phone) {
            return this.REGEXP.phone.test(phone);
        },

        isPassword: function isPassword(password) {
            return this.REGEXP.password.test(password);
        },

        isEmpty: function isEmpty(val) {
            var newVal = val;
            if (val.trim) {
                newVal = val.trim();
            }

            return !newVal;
        },

        checkLengthMax: function checkLengthMax(text, max) {
            return text.length <= max;
        },

        checkLengthMin: function checkLengthMin(text, min) {
            return text.length >= min;
        },

        checkStrengthPass: function checkStrengthPass(password) {
            return this.REGEXP.strengthPass.test(password);
        },

        getElements: function getElements() {
            var _this2 = this;

            var elems = this.$form.querySelectorAll('[data-validate-field]');
            this.elements = [];

            var _loop = function _loop(i, len) {
                var item = elems[i],
                    name = item.getAttribute('data-validate-field'),
                    value = item.value,
                    isElemInGroup = false,
                    group = [];

                if (item.type === 'checkbox') {
                    value = item.checked || '';
                    item.addEventListener('change', function (ev) {
                        var elem = ev.target,
                            item = {
                            name: elem.getAttribute('data-validate-field'),
                            value: elem.checked
                        };

                        delete _this2.result[item.name];
                        _this2.validateItem({
                            name: item.name,
                            value: item.value,
                            group: []
                        });
                        _this2.renderErrors();
                    });
                }

                if (item.type === 'radio') {
                    var findElem = _this2.elements.filter(function (item) {
                        if (item.name === name) {
                            return item;
                        }
                    })[0];

                    if (findElem) {
                        findElem.group.push(item.checked);
                        isElemInGroup = true;
                    } else {
                        group.push(item.checked);
                    }

                    item.addEventListener('change', function (ev) {
                        var elem = ev.target,
                            item = {
                            name: elem.getAttribute('data-validate-field'),
                            value: elem.checked
                        };

                        delete _this2.result[item.name];
                        _this2.validateItem({
                            name: item.name,
                            value: item.value,
                            group: []
                        });
                        _this2.renderErrors();
                    });
                }

                _this2.setterEventListener(item, 'keyup', _this2.handlerKeyup, 'add');

                if (!isElemInGroup) {
                    _this2.elements.push({
                        name: name,
                        value: value,
                        group: group
                    });
                }
            };

            for (var i = 0, len = elems.length; i < len; ++i) {
                _loop(i, len);
            }

            this.validateElements();
        },

        /**
         * Validate Required field
         * @param {string} value Value for validate
         * @returns {boolean} True if validate is OK
         */
        validateRequired: function validateRequired(value) {
            return !this.isEmpty(value);
        },

        /**
         * Validate Email field
         * @param {string} value Value for validate
         * @returns {boolean} True if validate is OK
         */
        validateEmail: function validateEmail(value) {
            return this.isEmail(value);
        },

        /**
         * Validate Phone field
         * @param {string} value Value for validate
         * @returns {boolean} True if validate is OK
         */
        validatePhone: function validatePhone(value) {
            return this.isPhone(value);
        },

        /**
         * Validate field for Min Length
         * @param {string} value Value for validate
         * @param {integer} min
         * @returns {boolean} True if validate is OK
         */
        validateMinLength: function validateMinLength(value, min) {
            return this.checkLengthMin(value, min);
        },

        /**
         * Validate field for Max Length
         * @param {string} value Value for validate
         * @param {integer} max
         * @returns {boolean} True if validate is OK
         */
        validateMaxLength: function validateMaxLength(value, max) {
            return this.checkLengthMax(value, max);
        },

        /**
         * Validate field for strength password
         * @param {string} password Value for validate
         * @returns {boolean} True if validate is OK
         */
        validateStrengthPass: function validateStrengthPass(password) {
            return this.checkStrengthPass(password);
        },

        /**
         * Validate Password field
         * @param {string} value Value for validate
         * @returns {boolean} True if validate is OK
         */
        validatePassword: function validatePassword(value) {
            return this.isPassword(value);
        },

        /**
         * Validate ZIP field
         * @param {string} value Value for validate
         * @returns {boolean} True if validate is OK
         */
        validateZip: function validateZip(value) {
            return this.isZip(value);
        },

        /**
         * Validate for remote check
         * @param value
         * @param name
         * @param {string} url
         * @param {string} successAnswer
         * @returns {boolean} True if validate is OK
         */
        validateRemote: function validateRemote(_ref) {
            var value = _ref.value,
                name = _ref.name,
                url = _ref.url,
                successAnswer = _ref.successAnswer,
                sendParam = _ref.sendParam,
                method = _ref.method;

            return new Promise(function (resolve) {
                ajax({
                    url: url,
                    method: method,
                    data: _defineProperty({}, sendParam, value),
                    async: true,
                    callback: function callback(data) {
                        if (data.toLowerCase() === successAnswer.toLowerCase()) {
                            resolve('ok');
                        }
                        resolve({
                            type: 'incorrect',
                            name: name
                        });
                    },
                    error: function error() {
                        resolve({
                            type: 'error',
                            name: name
                        });
                    }
                });
            });
        },

        generateMessage: function generateMessage(rule, name, value) {
            var messages = this.messages || this.defaultMessages;
            var customMessage = messages[name] && messages[name][rule] || this.messages && typeof this.messages[name] === 'string' && messages[name] ||
            // (messages[name][rule]) ||
            this.defaultMessages[rule] || this.DEFAULT_REMOTE_ERROR;

            if (value) {
                customMessage = customMessage.replace(':value', value.toString());
            }
            this.result[name] = {
                message: customMessage
            };
        },

        validateElements: function validateElements() {
            var _this3 = this;

            this.lockForm();
            this.elements.forEach(function (item) {
                _this3.validateItem({
                    name: item.name,
                    value: item.value,
                    group: item.group
                });
            });

            if (!this.promisesRemote.length) {
                this.renderErrors();
                return;
            }

            Promise.all(this.promisesRemote).then(function (resp) {
                resp.forEach(function (result) {
                    if (result === 'ok') {
                        _this3.renderErrors();
                        return;
                    }
                    if (result.type === 'error') {
                        alert('Server error occured. Please try later.');
                    }
                    _this3.generateMessage(RULE_REMOTE, result.name);
                    _this3.renderErrors();
                });
            });
        },

        validateItem: function validateItem(_ref2) {
            var _this4 = this;

            var name = _ref2.name,
                group = _ref2.group,
                value = _ref2.value,
                isKeyupChange = _ref2.isKeyupChange;

            var rules = this.rules[name] || this.defaultRules[name] || false;

            if (!rules) {
                return;
            }
            for (var rule in rules) {
                var ruleValue = rules[rule];

                if (rule !== RULE_REQUIRED && rule !== RULE_FUNCTION && value == '') {
                    return;
                }
                switch (rule) {
                    case RULE_FUNCTION:
                        {
                            if (typeof ruleValue !== 'function') {
                                break;
                            }
                            if (ruleValue(name, value)) {
                                break;
                            }
                            this.generateMessage(RULE_FUNCTION, name, ruleValue);
                            return;
                        }
                    case RULE_REQUIRED:
                        {
                            if (!ruleValue) {
                                break;
                            }

                            if (group.length) {
                                var isSuccessValidateGroup = false;

                                // At least one item in group
                                group.forEach(function (item) {
                                    if (_this4.validateRequired(item)) {
                                        isSuccessValidateGroup = true;
                                    }
                                });

                                if (isSuccessValidateGroup) {
                                    break;
                                }
                            } else {
                                if (this.validateRequired(value)) {
                                    break;
                                }
                            }

                            this.generateMessage(RULE_REQUIRED, name);
                            return;
                        }

                    case RULE_EMAIL:
                        {
                            if (!ruleValue) {
                                break;
                            }
                            if (this.validateEmail(value)) {
                                break;
                            }
                            this.generateMessage(RULE_EMAIL, name);
                            return;
                        }

                    case RULE_MINLENGTH:
                        {
                            if (!ruleValue) {
                                break;
                            }
                            if (this.validateMinLength(value, ruleValue)) {
                                break;
                            }
                            this.generateMessage(RULE_MINLENGTH, name, ruleValue);
                            return;
                        }

                    case RULE_MAXLENGTH:
                        {
                            if (!ruleValue) {
                                break;
                            }
                            if (this.validateMaxLength(value, ruleValue)) {
                                break;
                            }
                            this.generateMessage(RULE_MAXLENGTH, name, ruleValue);
                            return;
                        }

                    case RULE_PHONE:
                        {
                            if (!ruleValue) {
                                break;
                            }
                            if (this.validatePhone(value)) {
                                break;
                            }
                            this.generateMessage(RULE_PHONE, name);
                            return;
                        }

                    case RULE_PASSWORD:
                        {
                            if (!ruleValue) {
                                break;
                            }
                            if (this.validatePassword(value)) {
                                break;
                            }
                            this.generateMessage(RULE_PASSWORD, name);
                            return;
                        }

                    case RULE_STRENGTH:
                        {
                            if (!ruleValue || (typeof ruleValue === 'undefined' ? 'undefined' : _typeof(ruleValue)) !== 'object') {
                                break;
                            }

                            if (ruleValue.default && this.validateStrengthPass(value)) {
                                break;
                            }

                            if (ruleValue.custom) {
                                var regexp = void 0;

                                try {
                                    regexp = new RegExp(ruleValue.custom);
                                } catch (e) {
                                    regexp = this.REGEXP.strengthPass;

                                    // eslint-disable-next-line no-console
                                    console.error('Custom regexp for strength rule is not valid. Default regexp was used.');
                                }

                                if (regexp.test(value)) {
                                    break;
                                }
                            }
                            this.generateMessage(RULE_STRENGTH, name);
                            return;
                        }

                    case RULE_ZIP:
                        {
                            if (!ruleValue) {
                                break;
                            }
                            if (this.validateZip(value)) {
                                break;
                            }
                            this.generateMessage(RULE_ZIP, name);
                            return;
                        }

                    case RULE_REMOTE:
                        {
                            if (isKeyupChange) {
                                break;
                            }

                            if (!ruleValue) {
                                break;
                            }

                            var url = ruleValue.url,
                                successAnswer = ruleValue.successAnswer,
                                method = ruleValue.method,
                                sendParam = ruleValue.sendParam;

                            var $elem = this.$form.querySelector('input[data-validate-field="' + name + '"]');
                            this.setterEventListener($elem, 'keyup', this.handlerKeyup, 'remove');

                            this.promisesRemote.push(this.validateRemote({
                                name: name,
                                value: value,
                                url: url,
                                method: method,
                                sendParam: sendParam,
                                successAnswer: successAnswer
                            }));
                            return;
                        }
                }
            }
        },

        clearErrors: function clearErrors() {
            var $elems = document.querySelectorAll('.js-validate-error-label');
            for (var i = 0, len = $elems.length; i < len; ++i) {
                $elems[i].remove();
            }

            $elems = document.querySelectorAll('.js-validate-error-field');
            for (var _i = 0, _len = $elems.length; _i < _len; ++_i) {
                $elems[_i].classList.remove('js-validate-error-field');
                $elems[_i].style.border = '';
                $elems[_i].style.color = '';
            }
        },

        renderErrors: function renderErrors() {
            var _this5 = this;

            this.clearErrors();
            this.unlockForm();

            this.isValidationSuccess = false;
            if (Object.keys(this.result).length === 0) {
                this.isValidationSuccess = true;
                return;
            }

            for (var _item in this.result) {
                var message = this.result[_item].message;
                var $elems = this.$form.querySelectorAll('[data-validate-field="' + _item + '"]');

                var $elem = $elems[$elems.length - 1];

                var div = document.createElement('div');

                div.innerHTML = message;
                div.className = 'js-validate-error-label';
                div.setAttribute('style', 'color: ' + this.colorWrong);
                $elem.style.border = '1px solid ' + this.colorWrong;
                $elem.style.color = '' + this.colorWrong;
                $elem.classList.add('js-validate-error-field');

                if ($elem.type === 'checkbox' || $elem.type === 'radio') {
                    var $label = document.querySelector('label[for="' + $elem.getAttribute('id') + '"]');

                    if ($elem.parentNode.tagName.toLowerCase() === 'label') {
                        $elem.parentNode.parentNode.insertBefore(div, null);
                    } else if ($label) {
                        $label.parentNode.insertBefore(div, $label.nextSibling);
                    } else {
                        $elem.parentNode.insertBefore(div, $elem.nextSibling);
                    }
                } else {
                    $elem.parentNode.insertBefore(div, $elem.nextSibling);
                }
            }

            if (!this.tooltipSelectorWrap.length) {
                return;
            }

            this.state.tooltipsTimer = setTimeout(function () {
                _this5.hideTooltips();
            }, this.tooltipFadeOutTime);
        },

        hideTooltips: function hideTooltips() {
            var _this6 = this;

            var $elemsErrorLabel = document.querySelectorAll('.js-validate-error-label');

            $elemsErrorLabel.forEach(function (item) {
                item.classList.add(_this6.tooltipFadeOutClass);
            });

            this.state.tooltipsTimer = null;
        },

        lockForm: function lockForm() {
            var $elems = this.$form.querySelectorAll('input, textarea, button, select');
            for (var i = 0, len = $elems.length; i < len; ++i) {
                $elems[i].setAttribute('disabled', 'disabled');
                $elems[i].style.pointerEvents = 'none';
                $elems[i].style.webitFilter = 'grayscale(100%)';
                $elems[i].style.filter = 'grayscale(100%)';
            }
        },

        unlockForm: function unlockForm() {
            var $elems = this.$form.querySelectorAll('input, textarea, button, select');
            for (var i = 0, len = $elems.length; i < len; ++i) {
                $elems[i].removeAttribute('disabled');
                $elems[i].style.pointerEvents = '';
                $elems[i].style.webitFilter = '';
                $elems[i].style.filter = '';
            }
        }
    };

    window.JustValidate = JustValidate;
})(window);;