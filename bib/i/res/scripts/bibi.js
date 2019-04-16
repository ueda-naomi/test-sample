/*!
 *                                                                                                                                (℠)
 *  # BiB/i
 *
 *  - "EPUB Reader on Your Web Site."
 *  - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 *  - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 *
 *  ## Components:
 *  1. Native Promise Only ... Copyright (c) Kyle Simpson - https://github.com/getify/native-promise-only (Licensed under the MIT license.)
 *  2. easing.js ... Copyright (c) Dan Rogers - https://github.com/danro/easing-js (Licensed under the MIT license.)
 *  3. sML ... Copyright (c) Satoru MATSUSHIMA - https://github.com/satorumurmur/sML (Licensed under the MIT license.)
 *  4. BiB/i (heart)
 *
 */
/*! Native Promise Only
    v0.8.0-a (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
! function(e, t, n) {
  t[e] = t[e] || n(), "undefined" != typeof module && module.exports ? module.exports = t[e] : "function" == typeof define && define.amd && define(function() {
    return t[e]
  })
}("Promise", "undefined" != typeof global ? global : this, function() {
  "use strict";

  function e(e, t) {
    p.add(e, t), u || (u = g(p.drain))
  }

  function t(e) {
    var t, n = typeof e;
    return null == e || "object" != n && "function" != n || (t = e.then), "function" == typeof t && t
  }

  function n() {
    for (var e = 0; e < this.chain.length; e++) i(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
    this.chain.length = 0
  }

  function i(e, n, i) {
    var a, o;
    try {
      n === !1 ? i.reject(e.msg) : (a = n === !0 ? e.msg : n.call(void 0, e.msg), a === i.promise ? i.reject(TypeError("Promise-chain cycle")) : (o = t(a)) ? o.call(a, i.resolve, i.reject) : i.resolve(a))
    } catch (r) {
      i.reject(r)
    }
  }

  function a(i) {
    var r, l = this;
    if (!l.triggered) {
      l.triggered = !0, l.def && (l = l.def);
      try {
        (r = t(i)) ? e(function() {
          var e = new s(l);
          try {
            r.call(i, function() {
              a.apply(e, arguments)
            }, function() {
              o.apply(e, arguments)
            })
          } catch (t) {
            o.call(e, t)
          }
        }): (l.msg = i, l.state = 1, l.chain.length > 0 && e(n, l))
      } catch (d) {
        o.call(new s(l), d)
      }
    }
  }

  function o(t) {
    var i = this;
    i.triggered || (i.triggered = !0, i.def && (i = i.def), i.msg = t, i.state = 2, i.chain.length > 0 && e(n, i))
  }

  function r(e, t, n, i) {
    for (var a = 0; a < t.length; a++) ! function(a) {
      e.resolve(t[a]).then(function(e) {
        n(a, e)
      }, i)
    }(a)
  }

  function s(e) {
    this.def = e, this.triggered = !1
  }

  function l(e) {
    this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
  }

  function d(t) {
    if ("function" != typeof t) throw TypeError("Not a function");
    if (0 !== this.__NPO__) throw TypeError("Not a promise");
    this.__NPO__ = 1;
    var i = new l(this);
    this.then = function(t, a) {
      var o = {
        success: "function" != typeof t || t,
        failure: "function" == typeof a && a
      };
      return o.promise = new this.constructor(function(e, t) {
        if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
        o.resolve = e, o.reject = t
      }), i.chain.push(o), 0 !== i.state && e(n, i), o.promise
    }, this["catch"] = function(e) {
      return this.then(void 0, e)
    };
    try {
      t.call(void 0, function(e) {
        a.call(i, e)
      }, function(e) {
        o.call(i, e)
      })
    } catch (r) {
      o.call(i, r)
    }
  }
  var c, u, p, f = Object.prototype.toString,
    g = "undefined" != typeof setImmediate ? function(e) {
      return setImmediate(e)
    } : setTimeout;
  try {
    Object.defineProperty({}, "x", {}), c = function(e, t, n, i) {
      return Object.defineProperty(e, t, {
        value: n,
        writable: !0,
        configurable: i !== !1
      })
    }
  } catch (h) {
    c = function(e, t, n) {
      return e[t] = n, e
    }
  }
  p = function() {
    function e(e, t) {
      this.fn = e, this.self = t, this.next = void 0
    }
    var t, n, i;
    return {
      add: function(a, o) {
        i = new e(a, o), n ? n.next = i : t = i, n = i, i = void 0
      },
      drain: function() {
        var e = t;
        for (t = n = u = void 0; e;) e.fn.call(e.self), e = e.next
      }
    }
  }();
  var m = c({}, "constructor", d, !1);
  return d.prototype = m, c(m, "__NPO__", 0, !1), c(d, "resolve", function(e) {
    var t = this;
    return e && "object" == typeof e && 1 === e.__NPO__ ? e : new t(function(t, n) {
      if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
      t(e)
    })
  }), c(d, "reject", function(e) {
    return new this(function(t, n) {
      if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
      n(e)
    })
  }), c(d, "all", function(e) {
    var t = this;
    return "[object Array]" != f.call(e) ? t.reject(TypeError("Not an array")) : 0 === e.length ? t.resolve([]) : new t(function(n, i) {
      if ("function" != typeof n || "function" != typeof i) throw TypeError("Not a function");
      var a = e.length,
        o = Array(a),
        s = 0;
      r(t, e, function(e, t) {
        o[e] = t, ++s === a && n(o)
      }, i)
    })
  }), c(d, "race", function(e) {
    var t = this;
    return "[object Array]" != f.call(e) ? t.reject(TypeError("Not an array")) : new t(function(n, i) {
      if ("function" != typeof n || "function" != typeof i) throw TypeError("Not a function");
      r(t, e, function(e, t) {
        n(t)
      }, i)
    })
  }), d
}),
/*!
// --------------------------------------------------
// easing.js v0.5.4
// Generic set of easing functions with AMD support
// https://github.com/danro/easing-js
// This code may be freely distributed under the MIT license
// http://danro.mit-license.org/
// --------------------------------------------------
// All functions adapted from Thomas Fuchs & Jeremy Kahn
// Easing Equations (c) 2003 Robert Penner, BSD license
// https://raw.github.com/danro/easing-js/master/LICENSE
// --------------------------------------------------
*/
function(e, t) {
  "function" == typeof define ? define(t) : "undefined" != typeof module ? module.exports = t : this[e] = t
}("easing", {
  easeInQuad: function(e) {
    return Math.pow(e, 2)
  },
  easeOutQuad: function(e) {
    return -(Math.pow(e - 1, 2) - 1)
  },
  easeInOutQuad: function(e) {
    return (e /= .5) < 1 ? .5 * Math.pow(e, 2) : -.5 * ((e -= 2) * e - 2)
  },
  easeInCubic: function(e) {
    return Math.pow(e, 3)
  },
  easeOutCubic: function(e) {
    return Math.pow(e - 1, 3) + 1
  },
  easeInOutCubic: function(e) {
    return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2)
  },
  easeInQuart: function(e) {
    return Math.pow(e, 4)
  },
  easeOutQuart: function(e) {
    return -(Math.pow(e - 1, 4) - 1)
  },
  easeInOutQuart: function(e) {
    return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
  },
  easeInQuint: function(e) {
    return Math.pow(e, 5)
  },
  easeOutQuint: function(e) {
    return Math.pow(e - 1, 5) + 1
  },
  easeInOutQuint: function(e) {
    return (e /= .5) < 1 ? .5 * Math.pow(e, 5) : .5 * (Math.pow(e - 2, 5) + 2)
  },
  easeInSine: function(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1
  },
  easeOutSine: function(e) {
    return Math.sin(e * (Math.PI / 2))
  },
  easeInOutSine: function(e) {
    return -.5 * (Math.cos(Math.PI * e) - 1)
  },
  easeInExpo: function(e) {
    return 0 === e ? 0 : Math.pow(2, 10 * (e - 1))
  },
  easeOutExpo: function(e) {
    return 1 === e ? 1 : -Math.pow(2, -10 * e) + 1
  },
  easeInOutExpo: function(e) {
    return 0 === e ? 0 : 1 === e ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (-Math.pow(2, -10 * --e) + 2)
  },
  easeInCirc: function(e) {
    return -(Math.sqrt(1 - e * e) - 1)
  },
  easeOutCirc: function(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2))
  },
  easeInOutCirc: function(e) {
    return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
  },
  easeOutBounce: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
  },
  easeInBack: function(e) {
    var t = 1.70158;
    return e * e * ((t + 1) * e - t)
  },
  easeOutBack: function(e) {
    var t = 1.70158;
    return (e -= 1) * e * ((t + 1) * e + t) + 1
  },
  easeInOutBack: function(e) {
    var t = 1.70158;
    return (e /= .5) < 1 ? .5 * (e * e * (((t *= 1.525) + 1) * e - t)) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
  },
  elastic: function(e) {
    return -1 * Math.pow(4, -8 * e) * Math.sin((6 * e - 1) * (2 * Math.PI) / 2) + 1
  },
  swingFromTo: function(e) {
    var t = 1.70158;
    return (e /= .5) < 1 ? .5 * (e * e * (((t *= 1.525) + 1) * e - t)) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
  },
  swingFrom: function(e) {
    var t = 1.70158;
    return e * e * ((t + 1) * e - t)
  },
  swingTo: function(e) {
    var t = 1.70158;
    return (e -= 1) * e * ((t + 1) * e + t) + 1
  },
  bounce: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
  },
  bouncePast: function(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : e < 2.5 / 2.75 ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
  },
  easeFromTo: function(e) {
    return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
  },
  easeFrom: function(e) {
    return Math.pow(e, 4)
  },
  easeTo: function(e) {
    return Math.pow(e, .25)
  }
}),
/*!
 *                                                                                                                         (℠)
 *  sML JavaScript Library
 *
 *  - "I'm a Simple and Middling Library."
 *  - Copyright (c) Satoru MATSUSHIMA - https://github.com/satorumurmur/sML
 *  - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 *
 */
sML = function() {
    var e = "0.999.47",
      t = 201704101657,
      n = function(e) {
        var t = "string" == typeof e ? [n.create.apply(this, arguments)] : e.length ? e : [e];
        if (window.__proto__) t.__proto__ = n.SML;
        else
          for (var i in n.SML) t[i] = n.SML[i];
        return t
      };
    n.version = e, n.build = t;
    var i = navigator.userAgent,
      a = function(e, t) {
        var n = parseFloat(i.replace(new RegExp("^.*" + e + "[ :\\/]?(\\d+([\\._]\\d+)?).*$"), t ? t : "$1").replace(/_/g, "."));
        return isNaN(n) ? void 0 : n
      };
    return n.OperatingSystem = n.OS = function(e) {
      return /iP(hone|ad|od( touch)?);/.test(i) ? e.iOS = a("CPU (iP(hone|ad|od( touch)?) )?OS", "$4") : /OS X 10[\._]\d/.test(i) ? e.macOS = a("OS X ") : /Windows Phone( OS)? \d/.test(i) ? e.WindowsPhone = a("Windows Phone OS") || a("Windows Phone") : /Windows( NT)? \d/.test(i) ? e.Windows = function(e) {
        return e >= 10 ? e : e >= 6.3 ? 8.1 : e >= 6.2 ? 8 : e >= 6.1 ? 7 : e
      }(a("Windows NT") || a("Windows")) : /Android \d/.test(i) ? e.Android = a("Android") : /CrOS/.test(i) ? e.Chrome = !0 : /X11;/.test(i) ? e.Linux = !0 : /Firefox/.test(i) && (e.Firefox = !0), e
    }({}), n.UserAgent = n.UA = function(e) {
      /Gecko\/\d/.test(i) ? (e.Gecko = a("rv"), /Firefox\/\d/.test(i) && (e.Firefox = a("Firefox"))) : /Edge\/\d/.test(i) ? e.Edge = a("Edge") : /Chrome\/\d/.test(i) ? (e.Blink = a("Chrome") || !0, /OPR\/\d/.test(i) ? e.Opera = a("OPR") : /Silk\/\d/.test(i) ? e.Silk = a("Silk") : e.Chrome = e.Blink) : /AppleWebKit\/\d/.test(i) ? (e.WebKit = a("AppleWebKit"), /CriOS \d/.test(i) ? e.Chrome = a("CriOS") : /FxiOS \d/.test(i) ? e.Firefox = a("FxiOS") : /Version\/\d/.test(i) && (e.Safari = a("Version"))) : /Trident\/\d/.test(i) && (e.Trident = a("Trident"), e.InternetExplorer = a("rv") || a("MSIE"));
      try {
        e.Flash = parseFloat(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin.description.replace(/^.+?([\d\.]+).*$/, "$1"))
      } catch (t) {}
      return e
    }({}), n.Environments = n.Env = function(e) {
      return ["OS", "UA"].forEach(function(t) {
        for (var i in n[t]) "Flash" != i && n[t][i] && e.push(i)
      }), e
    }([]), n.log = function() {
      try {
        console.log.apply(console, arguments)
      } catch (e) {}
    }, n.write = function() {
      document.open();
      for (var e = 0, t = arguments.length; e < t; e++) document.write(arguments[e]);
      document.close()
    }, n.Fill = {
      Prefixes: ["webkit", "moz", "MS", "ms", "o"],
      carePrefix: function(e, t) {
        if (t in e) return e[t];
        t = t[0].toUpperCase() + t.slice(1);
        for (var n = "", i = 0, a = this.Prefixes.length; i < a; i++)
          if (n = this.Prefixes[i] + t, n in e) return e[n]
      }
    }, n.UA.InternetExplorer <= 9 && ("undefined" == typeof window.console && (window.console = {}), "function" != typeof window.console.log && (window.console.log = function() {})), window.requestAnimationFrame = n.Fill.carePrefix(window, "requestAnimationFrame") || function(e) {
      setTimeout(e, 1e3 / 60)
    }, (!window.CustomEvent || "function" != typeof window.CustomEvent && window.CustomEvent.toString().indexOf("CustomEventConstructor") === -1) && (window.CustomEvent = function(e, t) {
      t = t || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
    }, window.CustomEvent.prototype = window.Event.prototype), n.Event = {
      add: function(e, t) {
        for (var n in t) e.addEventListener(n, t[n], !1);
        return e
      },
      remove: function(e, t) {
        for (var n in t) e.removeEventListener(n, t[n]);
        return e
      },
      preventDefault: function(e) {
        e.preventDefault()
      },
      stopPropagation: function(e) {
        e.stopPropagation()
      },
      OnResizeFont: {
        RegularFunctions: [],
        onZoomInFunctions: [],
        onZoomOutFunctions: [],
        addEventListener: function(e, t) {
          t && t > 0 ? this.onZoomInFunctions.push(e) : t && t < 0 ? this.onZoomOutFunctions.push(e) : this.RegularFunctions.push(e)
        },
        detect: function(e, t) {
          if (!e) var e = document.body;
          if (!t) var t = 200;
          this.checker = e, this.timer = setInterval(function() {
            var e = n.Coord.getElementSize(n.onResizeFont.checker).h;
            if (n.onResizeFont.prevHeight && n.onResizeFont.prevHeight != e) {
              var t = n.onResizeFont.RegularFunctions;
              n.onResizeFont.prevHeight && n.onResizeFont.prevHeight < e ? t = t.concat(n.onResizeFont.onZoomInFunctions) : n.onResizeFont.prevHeight && n.onResizeFont.prevHeight > e && (t = t.concat(n.onResizeFont.onZoomOutFunctions));
              for (var i = 0, a = t.length; i < a; i++) t[i]()
            }
            n.onResizeFont.prevHeight = e
          }, t)
        },
        stopDetect: function() {
          this.timer && clearTimeout(this.timer)
        }
      }
    }, n.addEventListener = n.Event.add, n.removeEventListener = n.Event.remove, n.Timers = {
      setTimeout: function() {
        var e = Array.prototype.shift.call(arguments),
          t = Array.prototype.shift.call(arguments);
        return Array.prototype.unshift.call(arguments, e), Array.prototype.unshift.call(arguments, t), setTimeout.apply(window, arguments)
      },
      setInterval: function() {
        var e = Array.prototype.shift.call(arguments),
          t = Array.prototype.shift.call(arguments);
        return Array.prototype.unshift.call(arguments, e), Array.prototype.unshift.call(arguments, t), setInterval.apply(window, arguments)
      }
    }, n.setTimeout = n.Timers.setTimeout, n.setInterval = n.Timers.setInterval, n.Drawer = {
      draw: function(e, t) {
        e.ToBeDrawn || (requestAnimationFrame(function() {
          t.apply(e, arguments), e.ToBeDrawn = !1
        }), e.ToBeDrawn = !0)
      }
    }, n.draw = n.Drawer.draw, n.set = n.edit = function(e, t, i) {
      for (var a in t) "on" != a && "extraHTML" != a && (/^data-/.test(a) ? e.setAttribute(a, t[a]) : e[a] = t[a]);
      return t && (t.extraHTML && (e.innerHTML = e.innerHTML + t.extraHTML), t.on && n.Event.add(e, t.on), i && n.CSS.set(e, i)), e
    }, n.create = function(e, t, i) {
      return n.set(document.createElement(e), t, i)
    }, n.changeClass = n.changeClassName = function(e, t) {
      return t ? e.className = t : e.removeAttribute("class"), e.className
    }, n.addClass = n.addClassName = function(e, t) {
      if ("string" != typeof t) return e.className;
      if (t = t.trim().replace(/ +/g, " "), !t) return e.className;
      if (e.className) {
        if ((" " + e.className + " ").indexOf(" " + t + " ") > -1) return e.className;
        t = e.className + " " + t
      }
      return n.changeClass(e, t)
    }, n.removeClass = n.removeClassName = function(e, t) {
      return e.className ? "string" != typeof t ? e.className : (t = t.trim().replace(/ +/g, " ")) ? (" " + e.className + " ").indexOf(" " + t + " ") < 0 ? e.className : (t = (" " + e.className + " ").replace(" " + t + " ", " ").trim().replace(/ +/g, " "), n.changeClass(e, t)) : e.className : ""
    }, n.replaceClass = n.replaceClassName = function(e, t, i) {
      return n.removeClass(e, t), n.addClass(e, i)
    }, n.appendChildren = function(e, t) {
      t.length || (t = [t]);
      for (var n = 0, i = t.length; n < i; n++) e.appendChild(t[n]);
      return t
    }, n.deleteElement = function(e) {
      e.parentNode && e.parentNode.removeChild(e), e.innerHTML = "", e = null, delete e
    }, n.hatch = function() {
      for (var e = "", t = 0, n = arguments.length; t < n; t++) e += arguments[t];
      var i = document.createElement("div"),
        a = document.createDocumentFragment();
      i.innerHTML = e;
      for (var t = 0, n = i.childNodes.length; t < n; t++) a.appendChild(i.firstChild);
      return a
    }, n.cloneObject = function(e) {
      var t = function() {};
      return t.prototype = e, new t
    }, n.CSS = {
      Prefix: n.UA.WebKit || n.UA.Blink ? "Webkit" : n.UA.Gecko ? "Moz" : n.UA.Trident ? "ms" : "",
      TransitionEnd: n.UA.WebKit || n.UA.Blink ? "webkitTransitionEnd" : n.UA.Gecko ? "transitionend" : n.UA.Trident ? "MSTransitionEnd" : "",
      AnimationEnd: n.UA.WebKit || n.UA.Blink ? "webkitAnimationEnd" : n.UA.Gecko ? "animationend" : n.UA.Trident ? "MSAnimationEnd" : "",
      Catalogue: [],
      getSFO: function(e) {
        for (var t = 0, n = this.Catalogue.length; t < n; t++)
          if (this.Catalogue[t].Element == e) return this.Catalogue[t];
        return this.Catalogue[this.Catalogue.push({
          Element: e
        }) - 1]
      },
      getComputedStyle: function(e, t) {
        var n = e.currentStyle || document.defaultView.getComputedStyle(e, t ? t : "");
        return n
      },
      StyleSheets: [],
      getStyleSheet: function(e) {
        for (var t = 0, n = this.StyleSheets.length; t < n; t++)
          if (this.StyleSheets[t].StyleFor == e) return this.StyleSheets[t].StyleSheet;
        var i = e.createElement("style");
        return i.appendChild(e.createTextNode("")), e.getElementsByTagName("head")[0].appendChild(i), this.StyleSheets.push({
          StyleFor: e,
          StyleSheet: i.sheet
        }), i.sheet
      },
      appendRule: function(e, t, n) {
        if (!e || !t) return null;
        n = n ? n : document;
        var i = this.getStyleSheet(n);
        if (!i) return null;
        if ("function" == typeof e.join && (e = e.join(", ")), "function" == typeof t.join) t = t.join(" ");
        else if ("object" == typeof t) {
          var a = [];
          for (var o in t) a.push(o.trim() + ": " + t[o].replace(/;?\s*$/, "").trim() + ";");
          t = a.join(" ")
        }
        return i.insertRule(e + "{" + t + "}", i.cssRules.length)
      },
      deleteRule: function(e, t) {
        var n = this.getStyleSheet(t ? t : document);
        if (n) return n.deleteRule(e)
      },
      setProperty: function(e, t, n) {
        return e && t ? (/^(animation|background(-s|S)ize|box|break|column|filter|flow|hyphens|region|shape|transform|transition|writing)/.test(t) ? e.style[this.Prefix + t.replace(/(-|^)([a-z])/g, function(e, t, n) {
          return n ? n.toUpperCase() : ""
        })] = n : "float" == t && (t = "cssFloat"), e.style[t] = n, e) : e
      },
      addTransitionEndListener: function(e, t) {
        "function" == typeof t && (e.sMLTransitionEndListener = t, e.addEventListener(this.TransitionEnd, e.sMLTransitionEndListener))
      },
      removeTransitionEndListener: function(e) {
        "function" == typeof e.sMLTransitionEndListener && (e.removeEventListener(this.TransitionEnd, e.sMLTransitionEndListener), delete e.sMLTransitionEndListener)
      },
      set: function(e, t, n) {
        if (!e || "object" != typeof t) return e;
        if (this.removeTransitionEndListener(e), "function" == typeof n && (this.removeTransitionEndListener(e), this.addTransitionEndListener(e, n)), t instanceof Array) t.forEach(function(t) {
          t = t.split(":");
          var n = t.shift().trim(),
            i = t.join("").replace(/;\s*$/, "").trim();
          this.setProperty(e, n, i)
        });
        else {
          for (var i in t) /^transition/.test(i) && (this.setProperty(e, i, t[i]), delete t[i]);
          for (var i in t) this.setProperty(e, i, t[i])
        }
        return e
      },
      getRGB: function(e) {
        for (var t = e.replace(/rgb\(([\d\., ]+)\)/, "$1").replace(/\s/g, "").split(","), n = 0, i = t.length; n < i; n++) t[n] = parseInt(t[n]);
        return t
      },
      getRGBA: function(e) {
        for (var t = e.replace(/rgba?\(([\d\., ]+)\)/, "$1").replace(/\s/g, "").split(","), n = 0, i = t.length; n < i; n++) t[n] = parseInt(t[n]);
        return t[3] || (t[3] = 1), t
      }
    }, n.style = n.css = function(e, t, i) {
      return n.CSS.set(e, t, i)
    }, n.appendStyleRule = n.appendCSSRule = function(e, t, i) {
      return n.CSS.appendRule(e, t, i)
    }, n.deleteStyleRule = n.deleteCSSRule = function(e, t) {
      return n.CSS.deleteRule(e, t)
    }, n.Easing = "object" == typeof window.easing ? window.easing : {}, n.Easing.linear = function(e) {
      return e
    }, n.Easing.getEaser = function(e) {
      return function(t) {
        return t + e / 100 * (1 - t) * t
      }
    }, n.Transition = {
      set: function(e, t) {
        return t || (t = {}), e.sMLTransition && clearTimeout(e.sMLTransition.Timer), e.sMLTransition = {
          Element: e,
          CurrentFrame: 0,
          Frames: t.Frames ? t.Frams : 10,
          TimePerFrame: t.TimePerFrame ? t.TimePerFrame : 10,
          Easing: t.Easing ? t.Easing : void 0,
          EasingX: t.EasingX ? t.EasingX : void 0,
          before: "function" == typeof t.before ? t.before : void 0,
          among: "function" == typeof t.among ? t.among : void 0,
          after: "function" == typeof t.after ? t.after : void 0,
          callback: "function" == typeof t.callback ? t.callback : void 0,
          getNext: function(e, t, n, i) {
            var a = 1,
              o = this.CurrentFrame / this.Frames;
            if (!n && this.Easing) var n = this.Easing;
            if (!i && this.EasingX) var i = this.EasingX;
            return a = n ? 0 == i ? o + n / (100 * Math.PI) * Math.sin(Math.PI * o) : i ? (100 + i * n) * o / (2 * i * n * o + 100 - i * n) : o + n / 100 * (1 - o) * o : o, e + (t - e) * a
          },
          getNextColor: function(e, t, n, i) {
            3 == e.length && 4 == t.length ? e[3] = 1 : 4 == e.length && 3 == t.length && (t[3] = 1);
            for (var a = [], o = 0, r = e.length; o < r; o++) a[o] = Math.round(this.getNext(e[o], t[o]));
            return a
          },
          begin: function() {
            this.before && this.before.call(e, e.sMLTransition),
              function() {
                this.CurrentFrame++ != this.Frames ? (this.among && this.among.call(e, e.sMLTransition), this.Timer = setTimeout(arguments.callee, this.TimePerFrame)) : (this.after && this.after.call(e, e.sMLTransition), this.callback && this.callback.call(e, e.sMLTransition))
              }()
          }
        }, e.sMLTransition
      }
    }, n.transition = function(e, t) {
      n.Transition.set(e, t).begin()
    }, n.Coord = {
      getXY: function(e, t) {
        return {
          X: e,
          x: e,
          Y: t,
          y: t
        }
      },
      getWH: function(e, t) {
        return {
          Width: e,
          width: e,
          W: e,
          w: e,
          Height: t,
          height: t,
          H: t,
          h: t
        }
      },
      getXYTRBLCMWH: function(e, t, n, i, a, o, r, s, l, d) {
        return {
          X: e,
          x: e,
          Y: t,
          y: t,
          Top: n,
          top: n,
          T: n,
          t: n,
          Right: i,
          right: i,
          R: i,
          r: i,
          Bottom: a,
          bottom: a,
          B: a,
          b: a,
          Left: o,
          left: o,
          L: o,
          l: o,
          Center: r,
          center: r,
          C: r,
          c: r,
          Middle: s,
          middle: s,
          M: s,
          m: s,
          Width: l,
          width: l,
          W: l,
          w: l,
          Height: d,
          height: d,
          H: d,
          h: d
        }
      },
      getScreenSize: function() {
        return this.getWH(screen.availWidth, screen.availHeight)
      },
      getScrollSize: function(e) {
        return e && e != window && e != document || (e = document.documentElement), this.getWH(e.scrollWidth, e.scrollHeight)
      },
      getOffsetSize: function(e) {
        return e && e != window || (e = document.documentElement), e == document ? this.getScrollSize(document.documentElement) : this.getWH(e.offsetWidth, e.offsetHeight)
      },
      getClientSize: function(e) {
        return e && e != window || (e = document.documentElement), e == document ? this.getScrollSize(document.documentElement) : this.getWH(e.clientWidth, e.clientHeight)
      },
      getDocumentSize: function() {
        return this.getScrollSize(document.documentElement)
      },
      getWindowSize: function() {
        return this.getOffsetSize(document.documentElement)
      },
      getElementSize: function(e) {
        return this.getOffsetSize(e)
      },
      getWindowCoord: function(e) {
        return this.getXY(window.screenLeft || window.screenX, window.screenTop || window.screenY)
      },
      getElementCoord: function(e, t) {
        var n = t && t.RtL,
          i = e.offsetLeft,
          a = e.offsetTop;
        for (n && (i = i + e.offsetWidth - this.getOffsetSize(document.documentElement).W); e.offsetParent;) e = e.offsetParent, i += e.offsetLeft, a += e.offsetTop;
        return this.getXY(i, a)
      },
      getScrollCoord: function(e) {
        return e && e != window ? this.getXY(e.scrollLeft, e.scrollTop) : this.getXY(window.scrollX || window.pageXOffset || document.documentElement.scrollLeft, window.scrollY || window.pageYOffset || document.documentElement.scrollTop)
      },
      getScrollLimitCoord: function(e, t) {
        var n = t && t.RtL;
        e && e != window || (e = document.documentElement);
        var i = this.getScrollSize(e),
          a = this.getClientSize(e);
        return this.getXY((i.W - a.W) * (n ? -1 : 1), i.H - a.H)
      },
      getEventCoord: function(e) {
        return e ? this.getXY(e.pageX, e.pageY) : this.getXY(0, 0)
      },
      getCoord: function(e, t) {
        if (t && t.RtL) return this.getCoord_RtL(e);
        if (e == screen) var n = this.getScreenSize(),
          i = {
            X: 0,
            Y: 0
          },
          a = {
            X: n.W,
            Y: n.H
          };
        else if (e == window) var n = this.getOffsetSize(document.documentElement),
          i = this.getScrollCoord(),
          a = {
            X: i.X + n.W,
            Y: i.Y + n.H
          };
        else if (e == document) var n = this.getScrollSize(document.documentElement),
          i = {
            X: 0,
            Y: 0
          },
          a = {
            X: n.W,
            Y: n.H
          };
        else {
          if (!e.tagName) return {};
          var n = this.getOffsetSize(e),
            i = this.getElementCoord(e),
            a = {
              X: i.X + n.W,
              Y: i.Y + n.H
            }
        }
        return this.getXYTRBLCMWH(i.X, i.Y, i.Y, a.X, a.Y, i.X, Math.round((i.X + a.X) / 2), Math.round((i.Y + a.Y) / 2), n.W, n.H)
      },
      getCoord_RtL: function(e) {
        if (e == screen) var t = this.getScreenSize(),
          n = {
            X: t.W,
            Y: 0
          },
          i = {
            X: 0,
            Y: t.H
          };
        else if (e == window) var t = this.getOffsetSize(document.documentElement),
          n = this.getScrollCoord(),
          i = {
            X: n.X - t.W,
            Y: n.Y + t.H
          };
        else if (e == document) var t = this.getScrollSize(document.documentElement),
          n = {
            X: 0,
            Y: 0
          },
          i = {
            X: t.W,
            Y: t.H
          };
        else {
          if (!e.tagName) return {};
          var t = this.getElementSize(e),
            n = this.getElementCoord(e, 1),
            i = {
              X: n.X - t.W,
              Y: n.Y + t.H
            }
        }
        return this.getXYTRBLCMWH(n.X, n.Y, n.Y, n.X, i.Y, i.X, Math.round((i.X + n.X) / 2), Math.round((n.Y + i.Y) / 2), t.W, t.H)
      }
    }, n.getCoord = function() {
      return n.Coord.getCoord.apply(n.Coord, arguments)
    }, n.Scroller = {
      distillSetting: function(e, t) {
        var i = {};
        if (e instanceof HTMLElement) i.Target = n.Coord.getElementCoord(e);
        else if ("number" == typeof e) i.Target = {
          X: void 0,
          Y: e
        };
        else {
          if (!e) return !1;
          i.Target = {
            X: e.X,
            Y: e.Y
          }
        }
        return i.Frame = e.Frame && e.Frame instanceof HTMLElement ? e.Frame : window, i.scrollTo = i.Frame && i.Frame instanceof HTMLElement ? function(e, t) {
          i.Frame.scrollLeft = e, i.Frame.scrollTop = t
        } : window.scrollTo, i.Start = n.Coord.getScrollCoord(i.Frame), i.Start.Time = (new Date).getTime(), "number" != typeof i.Target.X && (i.Target.X = i.Start.X), "number" != typeof i.Target.Y && (i.Target.Y = i.Start.Y), t || (t = {}), i.Duration = "number" == typeof t.Duration && t.Duration >= 0 ? t.Duration : 100, i.ease = function() {
          switch (typeof t.Easing) {
            case "function":
              return t.Easing;
            case "string":
              return n.Easing[t.Easing] ? n.Easing[t.Easing] : n.Easing.linear;
            case "number":
              return n.Easing.getEaser(t.Easing)
          }
          return n.Easing.linear
        }(), i.before = "function" == typeof t.before ? t.before : function() {}, i.among = "function" == typeof t.among ? t.among : function() {}, i.after = "function" == typeof t.after ? t.after : function() {}, i.callback = "function" == typeof t.callback ? t.callback : function() {}, i.canceled = "function" == typeof t.canceled ? t.canceled : function() {}, i.ForceScroll = t.ForceScroll, i
      },
      scrollTo: function(e, t) {
        return this.Setting = this.distillSetting(e, t), !!this.Setting && void this.scrollTo_begin()
      },
      scrollTo_begin: function() {
        clearTimeout(this.Timer), this.Setting.ForceScroll ? this.preventUserScrolling() : this.addScrollCancelation(), this.Setting.before(), this.scrollTo_among()
      },
      scrollTo_among: function() {
        var e = this.Setting.Duration ? ((new Date).getTime() - this.Setting.Start.Time) / this.Setting.Duration : 1;
        return e >= 1 ? this.scrollTo_end() : (e = this.Setting.ease(e), this.Setting.scrollTo(Math.round(this.Setting.Start.X + (this.Setting.Target.X - this.Setting.Start.X) * e), Math.round(this.Setting.Start.Y + (this.Setting.Target.Y - this.Setting.Start.Y) * e)), this.Setting.among(), void(this.Timer = setTimeout(function() {
          n.Scroller.scrollTo_among()
        }, 10)))
      },
      scrollTo_end: function() {
        this.Setting.scrollTo(this.Setting.Target.X, this.Setting.Target.Y), this.Setting.after(), this.Setting.callback(), this.Setting.ForceScroll ? n.Scroller.allowUserScrolling() : n.Scroller.removeScrollCancelation(), delete this.Setting
      },
      cancelScrolling: function() {
        clearTimeout(n.Scroller.Timer), n.Scroller.Setting.canceled(), delete n.Scroller.Setting, n.Scroller.removeScrollCancelation()
      },
      addScrollCancelation: function() {
        ["keydown", "mousedown", "wheel"].forEach(function(e) {
          document.addEventListener(e, n.Scroller.cancelScrolling)
        })
      },
      removeScrollCancelation: function() {
        ["keydown", "mousedown", "wheel"].forEach(function(e) {
          document.removeEventListener(e, n.Scroller.cancelScrolling)
        })
      },
      preventUserScrolling: function() {
        ["keydown", "mousedown", "wheel"].forEach(function(e) {
          document.addEventListener(e, n.Scroller.preventDefault)
        })
      },
      allowUserScrolling: function() {
        ["keydown", "mousedown", "wheel"].forEach(function(e) {
          document.removeEventListener(e, n.Scroller.preventDefault)
        })
      },
      preventDefault: function(e) {
        return e.preventDefault()
      }
    }, n.scrollTo = function() {
      n.Scroller.scrollTo.apply(n.Scroller, arguments)
    }, n.Ajax = {
      open: function(e) {
        if (!e || "string" != typeof e.URI || "function" != typeof e.onsuccess) return !1;
        var t = new XMLHttpRequest;
        e.Query || (e.Query = null), e.Auth || (e.Auth = ["", ""]), e.MimeType || (e.MimeType = null), e.onsuccess || (e.onsuccess = function() {}), e.onfailed || (e.onfailed = function() {
          n.each(arguments, function() {
            n.log(this + "")
          })
        }), e.ontimeout || (e.ontimeout = e.onfailed), e.Async !== !1 && (e.Async = !0), e.Method = e.Method && /^POST$/i.test(e.Method) ? "POST" : "GET";
        var i = "";
        if (e.Query)
          for (var a in e.Query) i += "&" + a + "=" + encodeURIComponent(e.Query[a]);
        return i && ("GET" == e.method ? (e.URI = e.URI + (e.URI.indexOf("?") > 0 ? i : i.replace(/^&/, "?")), i = null) : "POST" == e.Method && (i = i.replace(/^&/, ""))), t.sMLAjaxTimeout = 0, t.sMLAjaxTimeoutTimer = setTimeout(function() {
          t.sMLAjaxTimeout = 1, e.ontimeout("sML.AJAX.get Timeout: " + e.URI)
        }, 1e4), e.onstate4 = function(n, i) {
          t.sMLAjaxTimeout || (clearTimeout(t.sMLAjaxTimeoutTimer), 200 == t.status || 0 == t.status ? e.onsuccess(n, i) : e.onfailed("sML.AJAX.get Failed: (" + t.status + ") " + URL), delete t)
        }, t.onreadystatechange = function() {
          switch (this.readyState) {
            case 4:
              return e.onstate4.call(this, this.responseText, this.responseXML)
          }
        }, e.MimeType && t.overrideMimeType(e.MimeType), t.open(e.Method, e.URI, e.Async, e.Auth[0], e.Auth[1]), "POST" == e.Method && t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), t.send(i), t
      }
    }, n.ajax = n.Ajax.open, n.Location = {
      RE: new RegExp("^((([a-z]+)://([^/\\?#]+))(/[^\\?#]*))(\\?[^\\?#]*)?(#[^#]*)?$"),
      getFile: function(e) {
        return (e ? e : location.href).replace(this.RE, "$1")
      },
      getOrigin: function(e) {
        return (e ? e : location.href).replace(this.RE, "$2")
      },
      getProtocol: function(e) {
        return (e ? e : location.href).replace(this.RE, "$3")
      },
      getHost: function(e) {
        return (e ? e : location.href).replace(this.RE, "$4")
      },
      getPathname: function(e) {
        return (e ? e : location.href).replace(this.RE, "$5")
      },
      getSearch: function(e) {
        return (e ? e : location.href).replace(this.RE, "$6")
      },
      getHash: function(e) {
        return (e ? e : location.href).replace(this.RE, "$7")
      },
      getDirectory: function(e) {
        return this.getFile(e).replace(/\/[^\/]*$/, "")
      },
      getId: function(e) {
        return this.getHash(e).replace("#", "")
      },
      getQueries: function(e) {
        var t = (e ? e : location.href).split("?");
        if (2 != t.length) return {};
        for (var n = {}, i = t[1].replace(/#.*$/, "").split("&"), a = 0, o = i.length; a < o; a++)
          if (i[a]) {
            var r = i[a].split("=");
            r.length < 2 ? r[1] = null : r.length > 2 && (r[1] = i[a].replace(r[0] + "=", "")), n[r[0]] = r[1]
          }
        return n
      },
      isIndexFile: function(e) {
        return /index\.(x?html?|php|cgi|[ja]spx?)$/.test(this.getPathname(e))
      },
      isSameFile: function(e, t) {
        return this.getFile(e) == (t ? this.getOrigin(t) : location.protocol + "//" + location.host + location.pathname)
      },
      isSameOrigin: function(e, t) {
        return this.getOrigin(e) == (t ? this.getOrigin(t) : location.protocol + "//" + location.host)
      },
      isSameProtocol: function(e, t) {
        return this.getProtocol(e) == (t ? this.getProtocol(t) : location.protocol)
      },
      isSameHost: function(e, t) {
        return this.getHost(e) == (t ? this.getHost(t) : location.host)
      },
      isSameHash: function(e, t) {
        return this.getHash(e) == (t ? this.getHash(t) : location.hash)
      },
      isSameDirectory: function(e, t) {
        return this.getDirectory(e) == (t ? this.getDirectory(t) : (location.protocol + "//" + location.host + location.pathname).replace(/\/[^\/]*$/, ""))
      },
      isSameId: function(e, t) {
        return this.getId(e) == (t ? this.getId(t) : location.hash.replace("#", ""))
      }
    }, n.getQueries = n.Location.getQueries, n.Cookies = {
      read: function(e) {
        if ("string" != typeof e || !e) return "";
        e = encodeURIComponent(e);
        for (var t = document.cookie.split("; "), n = "", i = 0, a = t.length; i < a; i++)
          if (t[i].substr(0, e.length + 1) == e + "=") {
            n = t[i].substr(e.length + 1, t[i].length);
            break
          }
        return decodeURIComponent(n)
      },
      write: function(e, t, n) {
        if ("string" != typeof e || !e) return !1;
        if ("string" != typeof t) return !1;
        "object" != typeof n && (n = {}), e = encodeURIComponent(e), t = encodeURIComponent(t), n.Path = "string" == typeof n.Path ? n.Path : location.pathname.replace(/[^\/]+$/, ""), n.Expires = "number" == typeof n.Expires ? n.Expires : 864e5;
        var i = new Date;
        return document.cookie = [e + "=" + t, "path=" + n.Path, "expires=" + i.toGMTString(i.setTime(i.getTime() + n.Expires))].join("; "), document.cookie
      }
    }, n.JSON = {
      parse: function(e) {
        try {
          return JSON.parse(e)
        } catch (t) {
          return {}
        }
      },
      stringify: function(e) {
        try {
          return JSON.stringify(e)
        } catch (t) {
          return ""
        }
      }
    }, n.each = function(e, t, n, i) {
      for (var a = n ? n : 0, o = i ? i + 1 : e.length; a < o && t.call(e[a], a, e) !== !1; a++);
      return e
    }, Array.prototype.includes || (Array.prototype.includes = function(e) {
      for (var t = 0, n = this.length; t < n; t++)
        if (this[t] == e) return !0
    }), n.Math = {
      sum: function() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++) {
          var i = 0;
          "number" == typeof arguments[t] ? i = arguments[t] : "string" == typeof arguments[t] && (i = arguments[t].length), e += i
        }
        return e
      },
      random: function(e, t) {
        return isNaN(e) && isNaN(t) ? (e = 0, t = 1) : isNaN(e) ? e = 0 : isNaN(t) && (t = 0), e = Math.min(e, t), t = Math.max(e, t), Math.floor(Math.random() * (t - e + 1)) + e
      }
    }, n.String = {
      pad: function(e, t, n) {
        if (e += "", "number" == typeof e && (e += ""), "number" == typeof t && (t += ""), "string" != typeof e || "string" != typeof t || "number" != typeof n || n < 1 || e.length >= n) return e;
        for (; e.length < n;) e = t + e;
        return e.slice(-n)
      },
      insertZeroWidthSpace: function(e) {
        return e.replace(/(?=\w)/g, "&#x200B;")
      },
      replace: function(e, t) {
        return t instanceof Array || (t = [t]), t.forEach(function(t) {
          t instanceof Array && 2 == t.length && ("string" == typeof t[0] || t[0] instanceof RegExp) && "string" == typeof t[1] && e.replace(t[0], t[1])
        }), e
      }
    }, n.getLength = function(e) {
      if ("object" == typeof e) {
        if (e instanceof Array) return e.length;
        var t = 0;
        for (var n in e) t++;
        return t
      }
      return "string" == typeof e ? e.length : "number" == typeof e ? ("" + e).length : null
    }, n.Range = {
      getRange: function(e, t) {
        if (!e) return null;
        t || (t = e.Start.Node.ownerDocument);
        var n = t.createRange();
        return n.setStart(e.Start.Node, "number" == typeof e.Start.Index ? e.Start.Index : e.Start.Node.textContent.indexOf(e.Start.Text)), n.setEnd(e.End.Node, "number" == typeof e.End.Index ? e.End.Index : e.End.Node.textContent.indexOf(e.End.Text) + e.End.Text.length), n
      },
      flat: function(e) {
        return e.replace(/[\r\n]/g, "")
      },
      escape: function(e) {
        return this.flat(e).replace(/([\(\)\{\}\[\]\,\.\-\+\*\?\!\:\^\$\/\\])/g, "\\$1")
      },
      distill: function(e, t, n) {
        for (var i = "", a = t; a <= n; a++) i += e[a];
        return i
      },
      find: function(e, t) {
        if (t || (t = document.body), "string" != typeof e || !e || this.flat(t.textContent).indexOf(e) < 0) return null;
        if (3 == t.nodeType) return {
          Start: {
            Node: t,
            Text: e
          },
          End: {
            Node: t,
            Text: e
          }
        };
        for (var n = [], i = 0, a = t.childNodes.length - 1, o = "", r = {}, s = 0; s <= a; s++) {
          if (this.flat(t.childNodes[s].textContent).indexOf(e) >= 0) return this.find(e, t.childNodes[s]);
          n.push(t.childNodes[s].textContent)
        }
        for (o = this.distill(n, i + 1, a); o && this.flat(o).indexOf(e) >= 0;) i++, o = this.distill(n, i + 1, a);
        var l = t.childNodes[i],
          d = 0,
          c = l.textContent.length - 1,
          u = "";
        for (o = this.distill(l.textContent, d, c); this.flat(o) && !new RegExp("^" + this.escape(o)).test(e);) d++, o = this.distill(l.textContent, d, c);
        for (u = this.flat(o); 3 != l.nodeType;) r = this.find(u, l), l = r.Start.Node, u = r.Start.Text;
        for (o = this.distill(n, i, a - 1); o && this.flat(o).indexOf(e) >= 0;) a--, o = this.distill(n, i, a - 1);
        var p = t.childNodes[a],
          f = 0,
          g = p.textContent.length - 1,
          h = "";
        for (o = this.distill(p.textContent, f, g); this.flat(o) && !new RegExp(this.escape(o) + "$").test(e);) g--, o = this.distill(p.textContent, f, g);
        for (h = this.flat(o); 3 != p.nodeType;) r = this.find(h, p), p = r.End.Node, h = r.End.Text;
        return {
          Start: {
            Node: l,
            Text: u
          },
          End: {
            Node: p,
            Text: h
          }
        }
      }
    }, n.Selection = {
      selectRange: function(e) {
        if (!e) return null;
        var t = window.getSelection();
        return t.removeAllRanges(), t.addRange(e), e
      },
      getSelectedText: n.UA.InternetExplorer < 9 ? function() {
        var e = "" + document.selection.createRange().text;
        return e ? e : ""
      } : function() {
        var e = "" + window.getSelection();
        return e ? e : ""
      }
    }, n.getSelection = function() {
      return n.Selection.getSelectedText()
    }, n.select = function(e, t) {
      return n.Selection.selectRange(n.Range.getRange(e, t))
    }, n.find = function(e, t) {
      return n.Selection.selectRange(n.Range.getRange(n.Range.find(e, t)))
    }, n.Fullscreen = {
      Enabled: function(e) {
        return e.fullscreenEnabled || e.webkitFullscreenEnabled || e.mozFullScreenEnabled || e.msFullscreenEnabled
      }(document),
      request: function(e) {
        var t = function(t) {
          return function(n) {
            return n || (n = e), n[t]()
          }
        };
        return e.requestFullscreen ? t("requestFullscreen") : e.webkitRequestFullscreen ? t("webkitRequestFullscreen") : e.mozRequestFullScreen ? t("mozRequestFullScreen") : e.msRequestFullscreen ? t("msRequestFullscreen") : function() {
          return !1
        }
      }(document.documentElement),
      exit: function(e) {
        var t = function(t) {
          return function(n) {
            return n || (n = e), n[t]()
          }
        };
        return e.exitFullscreen ? t("exitFullscreen") : e.webkitExitFullscreen ? t("webkitExitFullscreen") : e.mozCancelFullScreen ? t("mozCancelFullScreen") : e.msExitFullscreen ? t("msExitFullscreen") : function() {
          return !1
        }
      }(document),
      getElement: function(e) {
        var t = function(t) {
          return function(n) {
            return n || (n = e), n[t]
          }
        };
        return "undefined" != typeof e.fullscreenElement ? t("fullscreenElement") : "undefined" != typeof e.webkitFullscreenElement ? t("webkitFullscreenElement") : "undefined" != typeof e.mozFullscreenElement ? t("mozFullscreenElement") : "undefined" != typeof e.msFullscreenElement ? t("msFullscreenElement") : function() {
          return null
        }
      }(document)
    }, n.requestFullscreen = n.Fullscreen.request, n.exitFullscreen = n.Fullscreen.exit, n.getFullscreenElement = n.Fullscreen.getElement, n.SML = {
      each: function(e) {
        return n.each(this, e), this
      },
      set: function(e, t) {
        return this.each(function() {
          var i = this;
          n.set(i, e, t)
        })
      },
      style: function(e) {
        return this.each(function() {
          var t = this;
          n.style(t, e)
        })
      },
      appendChild: function(e) {
        return this.each(function() {
          var t = this;
          n.each(e, function() {
            t.appendChild(this)
          })
        })
      },
      preppendChild: function(e) {
        return this.each(function() {
          var e = this;
          n.each(Es, function() {
            e.insertBefore(this, S.firstChild)
          })
        })
      },
      insertBefore: function(e, t) {
        return this.each(function() {
          var e = this;
          n.each(Es, function() {
            e.insertBefore(this, t)
          })
        })
      },
      insertAfter: function(e, t) {
        return this.each(function() {
          var e = this;
          n.each(Es, function() {
            e.insertBefore(this, t.nextSibling)
          })
        })
      },
      addClass: function(e) {
        return this.each(function() {
          var t = this;
          n.addClass(t, e)
        })
      },
      removeClass: function(e) {
        return this.each(function() {
          var t = this;
          n.removeClass(t, e)
        })
      },
      replaceClass: function(e, t) {
        return this.each(function() {
          var i = this;
          n.replaceClass(i, e, t)
        })
      }
    }, window.addEventListener("unload", function() {
      window.sML = null, delete window.sML
    }), n
  }(),
  /*!
   *                                                                                                                                (℠)
   *  ## BiB/i (heart)
   *  - "Heart of BiB/i"
   *
   */
  Bibi = {
    version: "0.999.9-r8",
    build: 201804031815,
    href: "http://bibi.epub.link"
  }, document.addEventListener("DOMContentLoaded", function() {
    setTimeout(Bibi.welcome, 0)
  }), Bibi.welcome = function() {
    O.stamp("Welcome!"), O.log("Welcome! - BiB/i v" + Bibi.version + " (" + Bibi.build + ") - [ja] " + Bibi.href + " - [en] https://github.com/satorumurmur/bibi", "-0"), E.dispatch("bibi:says-welcome"), O.RequestedURL = location.href, O.BookURL = O.Origin + location.pathname + location.search, O.Language = function() {
      return "string" != typeof navigator.language ? "en" : "ja" == navigator.language.split("-")[0] ? "ja" : "en"
    }(), O.contentWindow = window, O.contentDocument = document, O.HTML = document.documentElement, O.HTML.className = sML.Environments.join(" ") + " bibi welcome", O.Head = document.head, O.Body = document.body, O.Info = document.getElementById("bibi-info"), O.Title = document.getElementsByTagName("title")[0], sML.OS.iOS || sML.OS.Android ? (O.Mobile = !0, O.HTML.className = O.HTML.className + " Touch", sML.OS.iOS && (O.Head.appendChild(sML.create("meta", {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    })), O.Head.appendChild(sML.create("meta", {
      name: "apple-mobile-web-app-status-bar-style",
      content: "white"
    }))), O.resize = "orientationchange", O.pointerdown = "touchstart", O.pointermove = "touchmove", O.pointerup = "touchend") : (O.Mobile = !1, O.resize = "resize", sML.UA.InternetExplorer || sML.UA.Edge ? (O.pointerdown = "pointerdown", O.pointermove = "pointermove", O.pointerup = "pointerup", O.pointerover = "pointerover", O.pointerout = "pointerout") : (O.pointerdown = "mousedown", O.pointermove = "mousemove", O.pointerup = "mouseup", O.pointerover = "mouseover", O.pointerout = "mouseout")), setTimeout(Bibi.initialize, 0)
  }, Bibi.initialize = function() {
    if (R.initialize(), I.initialize(), O.NotCompatible = sML.UA.InternetExplorer < 11, O.NotCompatible) {
      var e = {
        en: "<span>I'm so Sorry....</span> <span>Your Browser Is</span> <span>Not Compatible with BiB/i.</span>",
        ja: "<span>ごめんなさい……</span> <span>お使いのブラウザでは、</span><span>ビビは動きません。</span>"
      };
      return I.Veil.ByeBye = I.Veil.appendChild(sML.create("p", {
        id: "bibi-veil-byebye",
        innerHTML: ['<span lang="en">', e.en, "</span>", '<span lang="ja">', e.ja, "</span>"].join("").replace(/(BiB\/i|ビビ)/g, '<a href="' + Bibi.href + '" target="_blank">$1</a>')
      })), I.note("(Your Browser Is Not Compatible)", 99999999999), O.log(e.en.replace(/<[^>]*>/g, ""), "-*"), E.dispatch("bibi:says-byebye"), sML.removeClass(O.HTML, "welcome"), !1
    }
    I.note("Welcome!"), X.initialize(), P.initialize(), U.initialize();
    var t = new Promise(function(e, t) {
      return P.X.length ? X.loadFilesInPreset().then(e) : e()
    });
    if (window.parent == window) O.WindowEmbedded = 0, O.WindowEmbeddedDetail = "Direct Opened: " + O.Origin + location.pathname + location.search, O.HTML.className = O.HTML.className + " window-not-embedded";
    else {
      O.WindowEmbedded = -1, O.HTML.className = O.HTML.className + " window-embedded";
      try {
        (location.host == parent.location.host || parent.location.href) && (O.WindowEmbedded = 1, O.WindowEmbeddedDetail = "Embedded in: " + O.getOrigin(parent) + parent.location.pathname + parent.location.search, O.ParentHolder = window.parent.document.getElementById(U["parent-holder-id"]))
      } catch (n) {}
      O.WindowEmbedded == -1 && (O.WindowEmbeddedDetail = "Embedded in: Unreachable Parent")
    }
    O.WindowEmbedded && !O.ParentHolder || !(O.Body.requestFullscreen || O.Body.webkitRequestFullscreen || O.Body.mozRequestFullScreen || O.Body.msRequestFullscreen) ? O.HTML.className = O.HTML.className + " fullscreen-not-enabled" : (O.FullscreenEnabled = !0, O.FullscreenElement = O.ParentHolder ? O.ParentHolder.Bibi.Frame : O.HTML, O.FullscreenDocument = O.ParentHolder ? window.parent.document : document, O.HTML.className = O.HTML.className + " fullscreen-enabled"), O.WritingModeProperty = function() {
      var e = getComputedStyle(O.HTML);
      return /^(vertical|horizontal)-/.test(e["-webkit-writing-mode"]) ? "-webkit-writing-mode" : /^(vertical|horizontal)-/.test(e["writing-mode"]) || sML.UA.InternetExplorer ? "writing-mode" : void 0
    }();
    var i = sML.appendStyleRule("div#bibi-vtc", "position: absolute; left: -100px; top: -100px; width: 100px; height: 100px; -webkit-writing-mode: vertical-rl; -ms-writing-mode: tb-rl; writing-mode: vertical-rl;"),
      a = document.body.appendChild(sML.create("div", {
        id: "bibi-vtc"
      }));
    a.Child = a.appendChild(sML.create("p", {
      innerHTML: "aAあ亜"
    })), a.Child.offsetWidth < a.Child.offsetHeight ? (O.HTML.className = O.HTML.className + " vertical-text-enabled", O.VerticalTextEnabled = !0) : (O.HTML.className = O.HTML.className + " vertical-text-not-enabled", O.VerticalTextEnabled = !1), O.DefaultFontSize = Math.min(a.Child.offsetWidth, a.Child.offsetHeight), document.body.removeChild(a), delete a, sML.deleteStyleRule(i), O.Scrollbars = {
      Width: window.innerWidth - O.HTML.offsetWidth,
      Height: window.innerHeight - O.HTML.offsetHeight
    }, S.initialize(), sML.removeClass(O.HTML, "welcome"), t.then(function() {
      E.add("bibi:commands:move-by", function(e) {
        R.moveBy(e)
      }), E.add("bibi:commands:scroll-by", function(e) {
        R.scrollBy(e)
      }), E.add("bibi:commands:focus-on", function(e) {
        R.focusOn(e)
      }), E.add("bibi:commands:change-view", function(e) {
        R.changeView(e)
      }), window.addEventListener("message", M.gate, !1), Bibi.ready()
    })
  }, Bibi.ready = function() {
    sML.addClass(O.HTML, "ready"), E.add("bibi:readied", function() {
      U.book ? (sML.removeClass(O.HTML, "ready"), L.loadBook({
        Path: (/^([\w\d]+:)?\/\//.test(U.book) ? "" : P.bookshelf + "/") + U.book
      })) : X.Unzipper && window.File && !O.Mobile ? I.Veil.Catcher.dropOrClick() : O.WindowEmbedded ? I.note("Tell me EPUB name via embedding tag.", 99999999999) : I.note("Tell me EPUB name via URI.", 99999999999)
    }), setTimeout(function() {
      E.dispatch("bibi:readied")
    }, O.Mobile ? 999 : 1), O.ReadiedURL = location.href
  }, B = {}, B.initialize = function() {
    O.applyTo(B, {
      Title: "",
      Creator: "",
      Publisher: "",
      Language: "",
      WritingMode: "",
      Unzipped: !1,
      Path: "",
      PathDelimiter: "",
      Mimetype: {
        Path: "mimetype"
      },
      Container: {
        Path: "META-INF/container.xml"
      },
      Package: {
        Path: "",
        Dir: "",
        Metadata: {
          identifier: "",
          title: "",
          creators: [],
          publishers: [],
          languages: []
        },
        Manifest: {
          items: {},
          nav: {},
          "toc-ncx": {},
          "cover-image": {},
          Files: {}
        },
        Spine: {
          itemrefs: []
        }
      },
      Files: {},
      FileDigit: 0
    })
  }, L = {}, L.wait = function() {
    return new Promise(function(e) {
      L.wait.resolve = function() {
        e(), delete L.wait.resolve
      }, O.Busy = !1, sML.removeClass(O.HTML, "busy"), sML.addClass(O.HTML, "waiting"), E.dispatch("bibi:waits"), O.log("(waiting)", "-*"), I.note("")
    }).then(function() {
      O.Busy = !0, sML.addClass(O.HTML, "busy"), sML.removeClass(O.HTML, "waiting"), I.note("Loading...")
    })
  }, L.play = function() {
    return S["start-in-new-window"] ? window.open(location.href) : (L.Played = !0, L.wait.resolve(), void E.dispatch("bibi:played"))
  }, L.loadBook = function(e) {
    return B.initialize(), R.reset(), L.Preprocessed = !1, L.Loaded = !1, O.Busy = !0, sML.addClass(O.HTML, "busy"), sML.addClass(O.HTML, "loading"), I.note("Loading..."), O.log("Initializing Book...", "*:"), new Promise(function(t, n) {
      if (L.loadBook.resolve = function() {
          t.apply(L.loadBook, arguments), delete L.loadBook.resolve, delete L.loadBook.reject
        }, L.loadBook.reject = function() {
          n.apply(L.loadBook, arguments), delete L.loadBook.resolve, delete L.loadBook.reject, I.Veil.Cover.className = ""
        }, e.Path) {
        if (!P["trustworthy-origins"].includes(e.Path.replace(/^([\w\d]+:\/\/[^\/]+).*$/, "$1"))) return L.loadBook.reject("The Origin of the Path of the Book Is Not Allowed.");
        B.Path = e.Path, O.download(B.Path + "/" + B.Container.Path).then(function() {
          B.Unzipped = !0, O.log("EPUB: " + B.Path + " (Unzipped Online Folder)", "-*"), L.loadBook.resolve()
        })["catch"](function() {
          return X.Unzipper ? void X.Unzipper.loadBookData({
            Path: B.Path
          }) : L.loadBook.reject("Unzipper Extension Is Required to Open a Zipped EPUB.")
        })
      } else if (e.Data) {
        if (!e.Data.size || "string" != typeof e.Data.name) return L.loadBook.reject("EPUB File Is Not Valid.");
        B.Path = "[Local] " + e.Data.name, X.Unzipper.loadBookData({
          Data: e.Data
        })
      } else L.loadBook.reject("Something Troubled...")
    }).then(function() {
      B.PathDelimiter = B.Unzipped ? "/" : " > ", O.log("Book Initialized.", "/*"), L.loadContainer()
    })["catch"](function(e) {
      return I.note(e, 99999999999, "ErrorOccured"), O.error(e), !1
    })
  }, L.loadContainer = function() {
    O.log("Loading Container XML: " + B.Path + B.PathDelimiter + B.Container.Path + " ...", "*:"), O.openDocument(B.Container.Path).then(L.processContainer).then(L.onLoadContainer)
  }, L.processContainer = function(e) {
    B.Package.Path = e.getElementsByTagName("rootfile")[0].getAttribute("full-path"), B.Package.Dir = B.Package.Path.replace(/\/?[^\/]+$/, "")
  }, L.onLoadContainer = function() {
    O.log("Container XML Loaded.", "/*"), L.loadPackageDocument()
  }, L.loadPackageDocument = function() {
    O.log("Loading Package Document: " + B.Path + B.PathDelimiter + B.Package.Path + " ...", "*:"), O.openDocument(B.Package.Path).then(L.processPackageDocument).then(L.onLoadPackageDocument)
  }, L.processPackageDocument = function(e) {
    var t = e.getElementsByTagName("metadata")[0],
      n = e.getElementsByTagName("manifest")[0],
      i = e.getElementsByTagName("spine")[0],
      a = n.getElementsByTagName("item"),
      o = i.getElementsByTagName("itemref");
    if (a.length <= 0) return O.error('"' + B.Package.Path + '" has no <item> in <manifest>.');
    if (o.length <= 0) return O.error('"' + B.Package.Path + '" has no <itemref> in <spine>.');
    var r = {
      dc: t.getAttribute("xmlns:dc")
    };
    sML.each(t.getElementsByTagName("meta"), function() {
      if (!this.getAttribute("refines")) {
        if (this.getAttribute("property")) {
          var e = this.getAttribute("property").replace(/^dcterms:/, "");
          /^(identifier|title)$/.test(e) ? B.Package.Metadata[e] = this.textContent : /^(creator|publisher|language)$/.test(e) ? B.Package.Metadata[e + "s"].push(this.textContent) : B.Package.Metadata[e] || (B.Package.Metadata[e] = this.textContent)
        }
        this.getAttribute("name") && this.getAttribute("content") && (B.Package.Metadata[this.getAttribute("name")] = this.getAttribute("content"))
      }
    }), B.Package.Metadata.identifier || sML.each(e.getElementsByTagNameNS(r.dc, "identifier"), function() {
      return B.Package.Metadata.identifier = this.textContent, !1
    }), B.Package.Metadata.identifier || (B.Package.Metadata.identifier = Date.now()), B.Package.Metadata.title || sML.each(e.getElementsByTagNameNS(r.dc, "title"), function() {
      return B.Package.Metadata.title = this.textContent, !1
    }), B.Package.Metadata.creators.length || sML.each(e.getElementsByTagNameNS(r.dc, "creator"), function() {
      B.Package.Metadata.creators.push(this.textContent)
    }), B.Package.Metadata.publishers.length || sML.each(e.getElementsByTagNameNS(r.dc, "publisher"), function() {
      B.Package.Metadata.publishers.push(this.textContent)
    }), B.Package.Metadata.languages.length || sML.each(e.getElementsByTagNameNS(r.dc, "language"), function() {
      B.Package.Metadata.languages.push(this.textContent)
    }), B.Package.Metadata.languages.length || (B.Package.Metadata.languages[0] = "en"), B.Package.Metadata.cover || (B.Package.Metadata.cover = ""), B.Package.Metadata["rendition:layout"] || (B.Package.Metadata["rendition:layout"] = "reflowable"), B.Package.Metadata["rendition:orientation"] || (B.Package.Metadata["rendition:orientation"] = "auto"), B.Package.Metadata["rendition:spread"] || (B.Package.Metadata["rendition:spread"] = "auto"), "auto" == B.Package.Metadata["rendition:orientation"] && (B.Package.Metadata["rendition:orientation"] = "portrait"), "auto" == B.Package.Metadata["rendition:spread"] && (B.Package.Metadata["rendition:spread"] = "landscape"), delete e;
    var s = i.getAttribute("toc");
    sML.each(a, function() {
      var e = {
        id: this.getAttribute("id") || "",
        href: this.getAttribute("href") || "",
        "media-type": this.getAttribute("media-type") || "",
        properties: this.getAttribute("properties") || "",
        fallback: this.getAttribute("fallback") || ""
      };
      e.id && e.href && (B.Package.Manifest.items[e.id] = e, e.Path = O.getPath(B.Package.Dir, e.href), B.Package.Manifest.Files[e.Path] = "", function(t) {
        / nav /.test(t) && (B.Package.Manifest.nav.Path = e.Path), / cover-image /.test(t) && (B.Package.Manifest["cover-image"].Path = e.Path)
      }(" " + e.properties + " "), s && e.id == s && (B.Package.Manifest["toc-ncx"].Path = O.getPath(B.Package.Dir, e.href)))
    }), B.Package.Spine["page-progression-direction"] = i.getAttribute("page-progression-direction"), B.Package.Spine["page-progression-direction"] && /^(ltr|rtl)$/.test(B.Package.Spine["page-progression-direction"]) || (B.Package.Spine["page-progression-direction"] = "ltr"), B.PPD = B.Package.Spine["page-progression-direction"];
    var l = [/(page-spread)-(.+)/, /(rendition:layout)-(.+)/, /(rendition:orientation)-(.+)/, /(rendition:spread)-(.+)/, /(rendition:page-spread)-(.+)/, /(bibi:[a-z]+)-(.+)/];
    if (sML.each(o, function(e) {
        var t = {
          idref: this.getAttribute("idref") || "",
          linear: this.getAttribute("linear") || "",
          properties: this.getAttribute("properties") || "",
          "page-spread": "",
          "rendition:layout": B.Package.Metadata["rendition:layout"],
          "rendition:orientation": B.Package.Metadata["rendition:orientation"],
          "rendition:spread": B.Package.Metadata["rendition:spread"]
        };
        "no" != t.linear && (t.linear = "yes"), t.properties = t.properties.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ").split(" "), l.forEach(function(e) {
          t.properties.forEach(function(n) {
            if (e.test(n)) return t[n.replace(e, "$1")] = n.replace(e, "$2").replace("rendition:", ""), !1
          })
        }), t["rendition:page-spread"] && (t["page-spread"] = t["rendition:page-spread"]), t["rendition:page-spread"] = t["page-spread"], t.viewport = {
          content: null,
          width: null,
          height: null
        }, t.viewBox = {
          content: null,
          width: null,
          height: null
        }, B.Package.Spine.itemrefs.push(t)
      }), B.ID = B.Package.Metadata.identifier, B.Title = B.Package.Metadata.title, B.Creator = B.Package.Metadata.creators.join(", "), B.Publisher = B.Package.Metadata.publishers.join(", "), B.Language = B.Package.Metadata.languages[0].split("-")[0], /^(zho?|chi|kor?|ja|jpn)$/.test(B.Language) ? B.WritingMode = "rtl" == B.PPD ? "tb-rl" : "lr-tb" : /^(aze?|ara?|ui?g|urd?|kk|kaz|ka?s|ky|kir|kur?|sn?d|ta?t|pu?s|bal|pan?|fas?|per|ber|msa?|may|yid?|heb?|arc|syr|di?v)$/.test(B.Language) ? B.WritingMode = "rl-tb" : /^(mo?n)$/.test(B.Language) ? B.WritingMode = "tb-lr" : B.WritingMode = "lr-tb", B.Title) {
      var d = [B.Title];
      B.Creator && d.push(B.Creator), B.Publisher && d.push(B.Publisher), d = d.join(" - ").replace(/&amp;?/gi, "&").replace(/&lt;?/gi, "<").replace(/&gt;?/gi, ">"), O.Title.innerHTML = "", O.Title.appendChild(document.createTextNode(d + " | " + (S["website-name-in-title"] ? S["website-name-in-title"] : "BiB/i")))
    }
    var c = [];
    B.Title && c.push(B.Title), B.Creator && c.push(B.Creator), B.Publisher && c.push(B.Publisher), c.push('Language: "' + B.Language + '"'), O.log(c.join(" / "), "-*");
    var u = [];
    if (u.push('rendition:layout: "' + B.Package.Metadata["rendition:layout"] + '"'), u.push('rendition:orientation: "' + B.Package.Metadata["rendition:orientation"] + '"'), u.push('rendition:spread: "' + B.Package.Metadata["rendition:spread"] + '"'), u.push('page-progression-direction: "' + B.Package.Spine["page-progression-direction"] + '"'), O.log(u.join(" / "), "-*"), S["use-cookie"]) {
      var p = O.Cookie.remember(O.RootPath),
        f = O.Cookie.remember(B.ID);
      p && !U["reader-view-mode"] && p.RVM && (S["reader-view-mode"] = p.RVM), f && !U.to && f.Position && (S.to = f.Position)
    }
    S.update()
  }, L.onLoadPackageDocument = function() {
    E.dispatch("bibi:loaded-package-document"), O.log("Package Document Loaded.", "/*"), L.createCover(), L.prepareSpine(), L.loadNavigation().then(function() {
      E.dispatch("bibi:prepared"), S.autostart || L.Played ? L.loadItemsInSpreads() : L.wait().then(function() {
        L.loadItemsInSpreads()
      })
    })
  }, L.createCover = function() {
    O.log("Creating Cover...", "*:"), I.Veil.Cover.Info.innerHTML = I.Panel.BookInfo.Cover.Info.innerHTML = "", B.Package.Manifest["cover-image"].Path && (R.CoverImage.Path = B.Package.Manifest["cover-image"].Path), I.Veil.Cover.Info.innerHTML = I.Panel.BookInfo.Cover.Info.innerHTML = function() {
      var e = [];
      return B.Title && e.push("<strong>" + B.Title + "</strong>"), B.Creator && e.push("<em>" + B.Creator + "</em>"), B.Publisher && e.push("<span>" + B.Publisher + "</span>"), e.join(" ")
    }(), R.CoverImage.Path ? (O.log("Cover Image: " + B.Path + B.PathDelimiter + R.CoverImage.Path, "-*"), sML.create("img", {
      load: function() {
        var e = this;
        e.src = B.Files[R.CoverImage.Path] ? O.getDataURI(R.CoverImage.Path, B.Files[R.CoverImage.Path]) : B.Path + "/" + R.CoverImage.Path, e.timeout = setTimeout(function() {
          e.ontimeout()
        }, 5e3)
      },
      onload: function() {
        return !this.TimedOut && (clearTimeout(this.timeout), sML.style(I.Veil.Cover, {
          backgroundImage: "url(" + this.src + ")"
        }), I.Panel.BookInfo.Cover.insertBefore(this, I.Panel.BookInfo.Cover.Info), void(I.Veil.Cover.className = I.Panel.BookInfo.Cover.className = "with-cover-image"))
      },
      ontimeout: function() {
        this.TimedOut = !0, I.Veil.Cover.className = I.Panel.BookInfo.Cover.className = "without-cover-image"
      }
    }).load()) : (O.log("No Cover Image.", "-*"), I.Veil.Cover.className = I.Panel.BookInfo.Cover.className = "without-cover-image"), O.log("Cover Created.", "/*"), E.dispatch("bibi:created-cover", R.CoverImage.Path)
  }, L.prepareSpine = function(e) {
    if (O.log("Preparing Spine...", "*:"), "rtl" == B.PPD) var t = "right",
      n = "left";
    else var t = "left",
      n = "right";
    B.FileDigit = (B.Package.Spine.itemrefs.length + "").length, B.FileDigit < 3 && (B.FileDigit = 3), "function" != typeof e && (e = function() {
      return sML.create("iframe", {
        scrolling: "no",
        allowtransparency: "true"
      })
    }), sML.each(B.Package.Spine.itemrefs, function() {
      var i = this,
        a = R.Items.length,
        o = e(this);
      if (sML.addClass(o, "item"), o.ItemRef = i, o.Path = O.getPath(B.Package.Dir, B.Package.Manifest.items[i.idref].href), o.Dir = o.Path.replace(/\/?[^\/]+$/, ""), R.AllItems.push(o), "yes" != i.linear) return R.NonLinearItems.push(o);
      R.Items.push(o);
      var r, s;
      if ("center" == i["page-spread"]) o.IsSpreadCenter = !0;
      else if (i["page-spread"] == t) o.IsSpreadPairBefore = !0;
      else if (i["page-spread"] == n && a > 0) {
        o.IsSpreadPairAfter = !0;
        var l = R.Items[a - 1];
        l.IsSpreadPairBefore && (l.SpreadPair = o, o.SpreadPair = l, s = l.Spread, r = s.SpreadBox)
      }
      o.SpreadPair || (r = R.Main.Book.appendChild(sML.create("div", {
        className: "spread-box"
      })), s = r.appendChild(sML.create("div", {
        className: "spread"
      })), s.SpreadBox = r, s.Items = [], s.Pages = [], s.SpreadIndex = R.Spreads.length, R.Spreads.push(s));
      var d = s.appendChild(sML.create("div", {
        className: "item-box"
      }));
      o.Spread = s, o.ItemBox = d, o.Pages = [], o.ItemIndexInSpread = s.Items.length, o.ItemIndex = a, o.id = "item-" + sML.String.pad(o.ItemIndex + 1, 0, B.FileDigit), s.Items.push(o), [r, s, d, o].forEach(function(e) {
        e.RenditionLayout = i["rendition:layout"], e.PrePaginated = "pre-paginated" == e.RenditionLayout, sML.addClass(e, i["rendition:layout"])
      }), [d, o].forEach(function(e) {
        i["page-spread"] && sML.addClass(e, "page-spread-" + i["page-spread"]), i["bibi:layout"] && sML.addClass(e, "layout-" + i["bibi:layout"])
      })
    }), O.log(R.Items.length + " Item" + (R.Items.length > 1 ? "s" : "") + " in " + R.Spreads.length + " Spread" + (R.Spreads.length > 1 ? "s" : ""), "-*"), O.log("Spine Prepared.", "/*")
  }, L.loadNavigation = function() {
    return B.Package.Manifest.nav.Path ? (I.Panel.BookInfo.Navigation.Path = B.Package.Manifest.nav.Path, I.Panel.BookInfo.Navigation.Type = "Navigation Document") : B.Package.Manifest["toc-ncx"].Path && (I.Panel.BookInfo.Navigation.Path = B.Package.Manifest["toc-ncx"].Path, I.Panel.BookInfo.Navigation.Type = "TOC-NCX"), new Promise(function(e, t) {
      return I.Panel.BookInfo.Navigation.Type ? (O.log("Loading Navigation: " + B.Path + B.PathDelimiter + I.Panel.BookInfo.Navigation.Path + " ...", "*:"), void O.openDocument(I.Panel.BookInfo.Navigation.Path).then(function(t) {
        I.Panel.BookInfo.Navigation.innerHTML = "";
        var n = document.createDocumentFragment();
        if ("Navigation Document" == I.Panel.BookInfo.Navigation.Type) sML.each(t.querySelectorAll("nav"), function() {
          switch (this.getAttribute("epub:type")) {
            case "toc":
              sML.addClass(this, "bibi-nav-toc");
              break;
            case "landmarks":
              sML.addClass(this, "bibi-nav-landmarks");
              break;
            case "page-list":
              sML.addClass(this, "bibi-nav-page-list")
          }
          sML.each(this.querySelectorAll("*"), function() {
            this.removeAttribute("style")
          }), n.appendChild(this)
        });
        else {
          var i = function(e) {
            for (var t = e.childNodes, n = void 0, i = t.length, a = 0; a < i; a++)
              if (1 == t[a].nodeType && /^navPoint$/i.test(t[a].tagName)) {
                var o = t[a],
                  r = (o.getElementsByTagName("navLabel")[0], o.getElementsByTagName("content")[0]),
                  s = o.getElementsByTagName("text")[0];
                n || (n = document.createElement("ul"));
                var l = sML.create("li", {
                  id: o.getAttribute("id")
                });
                l.setAttribute("playorder", o.getAttribute("playorder"));
                var d = sML.create("a", {
                  href: r.getAttribute("src"),
                  innerHTML: s.innerHTML.trim()
                });
                n.appendChild(l).appendChild(d);
                var c = arguments.callee(o);
                c && l.appendChild(c)
              }
            return n
          }(t.getElementsByTagName("navMap")[0]);
          i && n.appendChild(document.createElement("nav")).appendChild(i)
        }
        I.Panel.BookInfo.Navigation.appendChild(n), I.Panel.BookInfo.Navigation.Body = I.Panel.BookInfo.Navigation, delete n, delete t, L.postprocessItem.coordinateLinkages(I.Panel.BookInfo.Navigation, "InNav"), R.resetNavigation(), O.log("Navigation Loaded.", "/*"), e()
      })) : (O.log("No Navigation Document or TOC-NCX.", "-*"), e())
    }).then(function() {
      E.dispatch("bibi:loaded-navigation", I.Panel.BookInfo.Navigation.Path)
    })
  }, L.loadItemsInSpreads = function() {
    O.stamp("Load Items in Spreads"), O.log("Loading " + R.Items.length + " Item" + (R.Items.length > 1 ? "s" : "") + " in " + R.Spreads.length + " Spread" + (R.Spreads.length > 1 ? "s" : "") + "...", "*:"), R.resetStage(), L.LoadedItems = 0, L.LoadedSpreads = 0, R.ToBeLaidOutLater = !1, L.listenResizingWhileLoading = function() {
      R.ToBeLaidOutLater = !0
    }, window.addEventListener("resize", L.listenResizingWhileLoading), L.preprocessResources().then(function() {
      R.Spreads.forEach(L.loadSpread)
    })
  }, L.preprocessResources = function() {
    return new Promise(function(e, t) {
      if (B.Unzipped) {
        var n = function() {
          return sML.UA.Gecko || sML.UA.Edge ? /\.(xhtml|xml|html?|css)$/ : S["preprocess-html-always"] ? /\.(xhtml|xml|html?)$/ : null
        }();
        if (!n) return e();
        var i = 0;
        for (var a in B.Package.Manifest.Files) n.test(a) && (B.Files[a] = "", i++);
        if (!i) return e();
        var o = 0;
        for (var a in B.Files) ! function(t) {
          O.download(B.Path + "/" + t).then(function(n) {
            if (B.Files[t] = n.responseText, o++, o >= i) return e("ToPreprocess")
          })
        }(a)
      } else {
        for (var a in B.Files) "undefined" == typeof B.Package.Manifest.Files[a] && (B.Files[a] = "");
        e("ToPreprocess")
      }
    }).then(function(e) {
      if (e) {
        for (var t in L.preprocessResources.Settings) L.preprocessResources.Settings[t].init && L.preprocessResources.Settings[t].init();
        E.dispatch("bibi:is-going-to:preprocess-resources");
        var n = [];
        ["CSS", "SVG", "HTML"].forEach(function(e) {
          var t = 0;
          for (var i in B.Files) L.preprocessResources.Settings[e].FileExtensionRE.test(i) && (L.preprocessResources.preprocessFile(i, L.preprocessResources.Settings[e]), t++);
          t && n.push(t + " " + e + (t >= 2 ? "s" : ""))
        }), n.length && O.log("Preprocessed " + n.join(", "), "-*"), L.Preprocessed = !0, E.dispatch("bibi:preprocessed-resources")
      }
    })
  }, L.preprocessResources.preprocessFile = function(e, t) {
    if (B.Files[e].Preprocessed) return B.Files[e];
    var n = B.Files[e];
    if (!B.Files[e] || !t.FileExtensionRE.test(e)) return n;
    if (t.ReplaceRules && t.ReplaceRules.forEach(function(e) {
        e && (n = n.replace(e[0], e[1]))
      }), t.NestingRE) {
      var i = n.match(t.NestingRE);
      i && i.forEach(function(i) {
        var a = O.getPath(e.replace(/[^\/]+$/, ""), i.replace(t.NestingRE, "$2"));
        B.Files[a] && (n = n.replace(i, i.replace(t.NestingRE, "$1" + O.getDataURI(a, L.preprocessResources.preprocessFile(a, t)) + "$3")))
      })
    }
    return n = L.preprocessResources.replaceResourceRefferences(e, n, t), B.Files[e] = n.replace(/[\r\n]+/gm, "\n").trim(), B.Files[e].Preprocessed = !0, B.Files[e]
  }, L.preprocessResources.Settings = {
    CSS: {
      FileExtensionRE: /\.css$/,
      ReplaceRules: [
        [/\/\*[.\s\S]*?\*\/|[^\{\}]+\{\s*\}/gm, ""],
        [/(-(epub|webkit)-)?column-count\s*:\s*1\s*([;\}])/g, "$1column-count: auto$4"]
      ],
      NestingRE: /(@import\s*(?:url\()?["']?)(?!(?:https?|data):)(.+?\.css)(['"]?(?:\))?\s*;)/g,
      ResAttributesAndExtensions: {
        url: "gif|png|jpe?g|svg|ttf|otf|woff"
      },
      getResMatchRE: function() {
        return /url\(["']?(?!(?:https?|data):)(.+?)['"]?\)/g
      },
      init: function() {
        if (!sML.UA.WebKit && !sML.UA.Blink) {
          if (this.ReplaceRules.push([/-(epub|webkit)-/g, ""]), sML.UA.Gecko) return this.ReplaceRules.push([/text-combine-horizontal:\s*([^;\}]+)\s*([;\}])/g, "text-combine-upright: $1$2"]), void this.ReplaceRules.push([/text-combine:\s*horizontal\s*([;\}])/g, "text-combine-upright: all$1"]);
          sML.UA.Edge && (this.ReplaceRules.push([/text-combine-(upright|horizontal)\s*:\s*([^;\}\s]+)\s*([;\}])/g, "text-combine-horizontal: $2; text-combine-upright: $2$3"]), this.ReplaceRules.push([/text-combine\s*:\s*horizontal\s*([;\}])/g, "text-combine-horizontal: all; text-combine-upright: all$1"])), sML.UA.InternetExplorer && (this.ReplaceRules.push([/writing-mode\s*:\s*vertical-rl\s*([;\}])/g, "writing-mode: tb-rl$1"]), this.ReplaceRules.push([/writing-mode\s*:\s*vertical-lr\s*([;\}])/g, "writing-mode: tb-lr$1"]), this.ReplaceRules.push([/writing-mode\s*:\s*horizontal-tb\s*([;\}])/g, "writing-mode: lr-tb$1"]), this.ReplaceRules.push([/text-combine-(upright|horizontal)\s*:\s*([^;\}\s]+)\s*([;\}])/g, "-ms-text-combine-horizontal: $2$3"]), this.ReplaceRules.push([/text-combine\s*:\s*horizontal\s*([;\}])/g, "-ms-text-combine-horizontal: all$1"])), /^(zho?|chi|kor?|ja|jpn)$/.test(B.Language) && this.ReplaceRules.push([/text-align\s*:\s*justify\s*([;\}])/g, "text-align: justify; text-justify: inter-ideograph$1"])
        }
      }
    },
    SVG: {
      FileExtensionRE: /\.svg$/,
      ReplaceRules: [
        [/<!--\s+[.\s\S]*?\s+-->/gm, ""]
      ],
      NestingRE: /(<img\s+(?:\w+\s*=\s*["'].*?['"]\s+)*src\s*=\s*["'])(?!(?:https?|data):)(.+?\.svg?)(['"][^>]*>)/g,
      ResAttributesAndExtensions: {
        href: "css",
        src: "gif|png|jpe?g|js",
        "xlink:href": "gif|png|jpe?g"
      }
    },
    HTML: {
      FileExtensionRE: /\.(xhtml|xml|html?)$/,
      ReplaceRules: [
        [/<!--\s+[.\s\S]*?\s+-->/gm, ""]
      ],
      NestingRE: /(<iframe\s+(?:\w+\s*=\s*["'].*?['"]\s+)*src\s*=\s*["'])(?!(?:https?|data):)(.+?\.(xhtml|xml|html?))(['"][^>]*>)/g,
      ResAttributesAndExtensions: {
        href: "css",
        src: "gif|png|jpe?g|svg|js|mp[34]|m4[av]|webm",
        "xlink:href": "gif|png|jpe?g"
      }
    }
  }, L.preprocessResources.replaceResourceRefferences = function(e, t, n) {
    if (!(t && e && n && n.ResAttributesAndExtensions)) return t;
    "function" != typeof n.getResMatchRE && (n.getResMatchRE = function(e) {
      return new RegExp("<\\??[a-zA-Z1-6:-]+[^>]*? " + e + '[ \t]*=[ \t]*[\'"](?!(?:https?|data):)([^"]+?)[\'"]', "g")
    });
    var i = e.replace(/\/?[^\/]+$/, "");
    for (var a in n.ResAttributesAndExtensions) {
      var o = n.getResMatchRE(a),
        r = t.match(o);
      if (r) {
        var s = new RegExp("." + n.ResAttributesAndExtensions[a] + "$", "i");
        r.forEach(function(e) {
          var n = e.replace(o, "$1"),
            a = O.getPath(i, (/^(\.*\/+|#)/.test(n) ? "" : "./") + n),
            r = a.split("#"),
            l = r[0];
          s.test(l) && (t = B.Files[l] ? t.replace(e, e.replace(n, O.getDataURI(l, B.Files[l]) + (r[1] ? "#" + r[1] : ""))) : t.replace(e, e.replace(n, B.Path + "/" + a)))
        })
      }
    }
    return t
  }, L.loadSpread = function(e) {
    e.Loaded = !1, e.LoadedItems = 0, e.Items.forEach(L.loadItem)
  }, L.loadItem = function(e) {
    O.log(sML.String.pad(e.ItemIndex + 1, 0, B.FileDigit) + "/" + sML.String.pad(R.Items.length, 0, B.FileDigit) + " - " + (e.Path ? B.Path + B.PathDelimiter + e.Path : "... Not Found."), "-*"), e.Loaded = !1, e.TimeCard = {}, e.stamp = function(t) {
      O.stamp(t, e.TimeCard)
    };
    var t = e.Path;
    if (/\.(xhtml|xml|html?)$/i.test(t)) B.Files[t] ? (L.loadItem.writeItemHTML(e, B.Files[t]), setTimeout(L.postprocessItem, 0, e)) : (e.src = B.Path + "/" + t, e.onload = function() {
      setTimeout(L.postprocessItem, 0, e)
    }, e.ItemBox.appendChild(e));
    else if (/\.(svg)$/i.test(t))
      if (e.IsSVG = !0, B.Files[t]) L.loadItem.writeItemHTML(e, !1, "", B.Files[t].replace(/<\?xml-stylesheet (.+?)[ \t]?\?>/g, '<link rel="stylesheet" $1 />'));
      else {
        var n = B.Path + "/" + t;
        O.download(n).then(function(t) {
          L.loadItem.writeItemHTML(e, !1, '<base href="' + n + '" />', t.responseText.replace(/<\?xml-stylesheet (.+?)[ \t]?\?>/g, '<link rel="stylesheet" $1 />'))
        })
      }
    else /\.(gif|jpe?g|png)$/i.test(t) ? (e.IsBitmap = !0, L.loadItem.writeItemHTML(e, !1, "", '<img alt="" src="' + (B.Files[t] ? O.getDataURI(t, B.Files[t]) : B.Path + "/" + t) + '" />')) : /\.(pdf)$/i.test(t) && (e.IsPDF = !0, L.loadItem.writeItemHTML(e, !1, "", '<iframe src="' + (B.Files[t] ? O.getDataURI(t, B.Files[t]) : B.Path + "/" + t) + '" />'))
  }, L.loadItem.writeItemHTML = function(e, t, n, i) {
    e.ItemBox.appendChild(e), e.contentDocument.open(), e.contentDocument.write(t ? t.replace(/^<\?.+?\?>/, "") : ["<!DOCTYPE html>", "<html>", "<head>" + n + "</head>", '<body onload="setTimeout(function() { parent.L.postprocessItem(parent.R.Items[' + e.ItemIndex + "]); document.body.removeAttribute('onload'); return false; }, 0);\">" + i + "</body>", "</html>"].join("")), e.contentDocument.close()
  }, L.postprocessItem = function(e) {
    if (e.stamp("Postprocess"), e.PostprocessTrialCount = e.PostprocessTrialCount || 1, !e.contentDocument.documentElement || !e.contentDocument.head || !e.contentDocument.body) return e.PostprocessTrialCount > 10 ? O.error("Faled to load an Item: " + e.Path) : setTimeout(function() {
      e.PostprocessTrialCount++, L.postprocessItem(e)
    }, 100);
    e.HTML = e.contentDocument.documentElement, e.Head = e.contentDocument.head, e.Body = e.contentDocument.body, e.HTML.Item = e.Head.Item = e.Body.Item = e;
    var t = e.HTML.getAttribute("xml:lang"),
      n = e.HTML.getAttribute("lang");
    t || n ? t ? n || e.HTML.setAttribute("lang", t) : e.HTML.setAttribute("xml:lang", n) : (e.HTML.setAttribute("xml:lang", B.Language), e.HTML.setAttribute("lang", B.Language)), sML.addClass(e.HTML, sML.Environments.join(" ")), sML.each(e.Body.querySelectorAll("link"), function() {
      e.Head.appendChild(this)
    }), S["epub-additional-stylesheet"] && e.Head.appendChild(sML.create("link", {
      rel: "stylesheet",
      href: S["epub-additional-stylesheet"]
    })), S["epub-additional-script"] && e.Head.appendChild(sML.create("script", {
      src: S["epub-additional-script"]
    })), e.StyleSheets = [], sML.appendStyleRule("html", "-webkit-text-size-adjust: 100%;", e.contentDocument), sML.each(e.HTML.querySelectorAll("link, style"), function() {
      if (/^link$/i.test(this.tagName)) {
        if (!/^(alternate )?stylesheet$/.test(this.rel)) return;
        if ((sML.UA.Safari || sML.OS.iOS) && "alternate stylesheet" == this.rel) return
      }
      e.StyleSheets.push(this)
    }), e.BibiProperties = {};
    var i = e.HTML.getAttribute("data-bibi-properties");
    i && i.replace(/[\s\t\r\n]+/g, " ").split(" ").forEach(function(t) {
      t && (e.BibiProperties[t] = !0)
    });
    var a = e.contentDocument.querySelectorAll("body>*");
    if (a && a.length) {
      for (var o = 0, r = a.length, s = 0; s < r; s++) /^(script|style)$/i.test(a[s].tagName) || o++;
      1 == o && (/^svg$/i.test(e.Body.firstElementChild.tagName) ? (e.Outsourcing = !0, e.ImageItem = !0, e.SingleSVGOnlyItem = !0) : /^img$/i.test(e.Body.firstElementChild.tagName) ? (e.Outsourcing = !0, e.ImageItem = !0, e.SingleIMGOnlyItem = !0) : /^iframe$/i.test(e.Body.firstElementChild.tagName) ? (e.Outsourcing = !0, e.FrameItem = !0, e.SingleFrameOnlyItem = !0) : O.getElementInnerText(e.Body) || (e.Body.querySelectorAll("img, svg, video, audio").length - e.Body.querySelectorAll("svg img, video img, audio img").length == 1 ? (e.Outsourcing = !0, e.ImageItem = !0) : 1 == e.Body.getElementsByTagName("iframe").length && (e.Outsourcing = !0, e.FrameItem = !0)))
    }
    E.dispatch("bibi:is-going-to:postprocess-item-content", e), L.postprocessItem.processSVGs(e), L.postprocessItem.defineViewport(e), L.postprocessItem.coordinateLinkages(e), new Promise(function(t, n) {
      e.CSSLoadingTimerID = setInterval(function() {
        e.contentDocument.styleSheets.length < e.StyleSheets.length || (clearInterval(e.CSSLoadingTimerID), L.postprocessItem.patchStyles(e), t())
      }, 100)
    }).then(function() {
      E.dispatch("bibi:postprocessed-item-content", e), E.dispatch("bibi:postprocessed-item", e), L.onLoadItem(e)
    })
  }, L.postprocessItem.processSVGs = function(e) {
    sML.UA.InternetExplorer && sML.each(e.Body.getElementsByTagName("svg"), function() {
      var e = this.getElementsByTagName("image");
      if (1 == e.length) {
        var t = e[0];
        t.getAttribute("width") && t.getAttribute("height") && (this.setAttribute("width", t.getAttribute("width")), this.setAttribute("height", t.getAttribute("height")))
      }
    })
  }, L.postprocessItem.defineViewport = function(e) {
    var t = e.ItemRef;
    if (sML.each(e.Head.getElementsByTagName("meta"), function() {
        if ("viewport" == this.name && (t.viewport.content = this.getAttribute("content"), t.viewport.content)) {
          var e = 1 * t.viewport.content.replace(/^.*?width=([^\, ]+).*$/, "$1"),
            n = 1 * t.viewport.content.replace(/^.*?height=([^\, ]+).*$/, "$1");
          isNaN(e) || isNaN(n) || (t.viewport.width = e, t.viewport.height = n)
        }
      }), "pre-paginated" == t["rendition:layout"] && !(t.viewport.width * t.viewport.height)) {
      var n = e.Body.firstElementChild;
      if (e.SingleSVGOnlyItem) {
        if (n.getAttribute("viewBox")) {
          t.viewBox.content = n.getAttribute("viewBox");
          var i = t.viewBox.content.split(" ");
          if (4 == i.length) {
            var a = 1 * i[2] - 1 * i[0],
              o = 1 * i[3] - 1 * i[1];
            a && o && ("100%" != n.getAttribute("width") && n.setAttribute("width", "100%"), "100%" != n.getAttribute("height") && n.setAttribute("height", "100%"), t.viewport.width = t.viewBox.width = a, t.viewport.height = t.viewBox.height = o)
          }
        }
      } else e.SingleIMGOnlyItem && (t.viewport.width = parseInt(getComputedStyle(n).width), t.viewport.height = parseInt(getComputedStyle(n).height))
    }
  }, L.postprocessItem.coordinateLinkages = function(e, t) {
    var n = e.Path,
      i = e.Body;
    sML.each(i.getElementsByTagName("a"), function(e) {
      var i = this;
      t && (i.NavANumber = e + 1, i.addEventListener(O.pointerdown, function(e) {
        e.stopPropagation()
      }), i.addEventListener(O.pointerup, function(e) {
        e.stopPropagation()
      }));
      var a = i.getAttribute("href");
      if (!a) return void(t && (i.addEventListener("click", function(e) {
        return e.preventDefault(), e.stopPropagation(), !1
      }), sML.addClass(i, "bibi-bookinfo-inactive-link")));
      if (/^[a-zA-Z]+:/.test(a)) {
        if (a.split("#")[0] != location.href.split("#")[0]) return i.setAttribute("target", i.getAttribute("target") || "_blank");
        var o = a.split("#")[1];
        a = o ? "#" + o : R.Items[0].Path
      }
      var r = O.getPath(n.replace(/\/?([^\/]+)$/, ""), (/^\.*\/+/.test(a) ? "" : "./") + (/^#/.test(a) ? n.replace(/^.+?([^\/]+)$/, "$1") : "") + a),
        s = r.split("#"),
        l = s[0] ? s[0] : n,
        d = s[1] ? s[1] : "";
      R.Items.forEach(function(e) {
        if (l == e.Path) return i.setAttribute("data-bibi-original-href", a), i.setAttribute("href", "bibi://" + B.Path.replace(/^\w+:\/\//, "") + B.PathDelimiter + r), i.InNav = t, i.Destination = {
          Item: e,
          ElementSelector: d ? "#" + d : void 0
        }, void L.postprocessItem.coordinateLinkages.setJump(i)
      }), d && /^epubcfi\(.+\)$/.test(d) && (i.setAttribute("data-bibi-original-href", a), X.EPUBCFI ? (i.setAttribute("href", "bibi://" + B.Path.replace(/^\w+:\/\//, "") + B.PathDelimiter + "#" + d), i.InNav = t, i.Destination = X.EPUBCFI.getDestination(d), L.postprocessItem.coordinateLinkages.setJump(i)) : (i.removeAttribute("href"), i.addEventListener("click", function() {
        return !1
      }), O.Mobile || (i.addEventListener(O.pointerover, function() {
        return I.Help.show("(This link uses EPUBCFI. BiB/i needs the extension.)"), !1
      }), i.addEventListener(O.pointerout, function() {
        return I.Help.hide(), !1
      })))), t && typeof S.nav == e + 1 && i.Destination && (S.to = i.Destination)
    })
  }, L.postprocessItem.coordinateLinkages.setJump = function(e) {
    e.addEventListener("click", function(t) {
      if (t.preventDefault(), t.stopPropagation(), e.Destination) {
        var n = L.Opened ? function() {
          E.dispatch("bibi:commands:focus-on", {
            Destination: e.Destination,
            Duration: 0
          })
        } : function() {
          return S["start-in-new-window"] ? window.open(location.href + (location.hash ? "," : "#") + "pipi(nav:" + e.NavANumber + ")") : (S.to = e.Destination, void L.play())
        };
        e.InNav ? I.Panel.toggle({
          callback: n
        }) : n()
      }
      return !1
    })
  }, L.postprocessItem.patchStyles = function(e) {
    if (!L.Preprocessed)
      if (sML.UA.InternetExplorer) {
        if (!B.Unzipped) return !1;
        var t = /^(zho?|chi|kor?|ja|jpn)$/.test(B.Language);
        O.editCSSRules(e.contentDocument, function(e) {
          /(-(epub|webkit)-)?writing-mode: vertical-rl; /.test(e.cssText) && (e.style.writingMode = "tb-rl"), /(-(epub|webkit)-)?writing-mode: vertical-lr; /.test(e.cssText) && (e.style.writingMode = "tb-lr"), /(-(epub|webkit)-)?writing-mode: horizontal-tb; /.test(e.cssText) && (e.style.writingMode = "lr-tb"), /(-(epub|webkit)-)?(text-combine-upright|text-combine-horizontal): all; /.test(e.cssText) && (e.style.msTextCombineHorizontal = "all"), t && / text-align: justify; /.test(e.cssText) && (e.style.textJustify = "inter-ideograph")
        })
      } else O.editCSSRules(e.contentDocument, function(e) {
        /(-(epub|webkit)-)?column-count: 1; /.test(e.cssText) && (e.style.columnCount = e.style.webkitColumnCount = e.style.epubColumnCount = "auto")
      });
    sML.UA.Gecko && Array.prototype.forEach.call(e.Body.getElementsByTagName("a"), function(e) {
      var t = getComputedStyle(e);
      /^vertical-/.test(t.writingMode) && ("overline" == t.textDecoration ? e.style.textDecoration = "underline" : "underline" == t.textDecoration && (e.style.textDecoration = "overline"))
    });
    var n = getComputedStyle(e.HTML),
      i = getComputedStyle(e.Body);
    n[O.WritingModeProperty] != i[O.WritingModeProperty] && sML.style(e.HTML, {
      "writing-mode": i[O.WritingModeProperty]
    }), e.HTML.WritingMode = O.getWritingMode(e.HTML), sML.addClass(e.HTML, "writing-mode-" + e.HTML.WritingMode), /-rl$/.test(e.HTML.WritingMode) && (i.marginLeft != i.marginRight ? e.Body.style.marginLeft = i.marginRight : /-lr$/.test(e.HTML.WritingMode) && (i.marginRight != i.marginLeft ? e.Body.style.marginRight = i.marginLeft : i.marginBottom != i.marginTop && (e.Body.style.marginBottom = i.marginTop))), e.HTML.style && (sML.style(e.ItemBox, L.postprocessItem.patchStyles.getBackgroundStyle(e.HTML)), e.HTML.style.background = "transparent"), e.Body.style && (sML.style(e, L.postprocessItem.patchStyles.getBackgroundStyle(e.Body)), e.Body.style.background = "transparent"), sML.each(e.Body.getElementsByTagName("img"), function() {
      this.Bibi = {
        DefaultStyle: {
          margin: this.style.margin ? this.style.margin : "",
          width: this.style.width ? this.style.width : "",
          height: this.style.height ? this.style.height : "",
          "vertical-align": this.style.verticalAlign ? this.style.verticalAlign : "",
          "page-break-before": this.style.pageBreakBefore ? this.style.pageBreakBefore : "",
          "page-break-after": this.style.pageBreakAfter ? this.style.pageBreakAfter : ""
        }
      }
    })
  }, L.postprocessItem.patchStyles.getBackgroundStyle = function(e) {
    var t = getComputedStyle(e);
    return {
      backgroundColor: t.backgroundColor,
      backgroundImage: t.backgroundImage,
      backgroundRepeat: t.backgroundRepeat,
      backgroundPosition: t.backgroundPosition,
      backgroundSize: t.backgroundSize
    }
  }, L.onLoadItem = function(e) {
    e.Loaded = !0, L.LoadedItems++, e.ImageItem && (sML.addClass(e.ItemBox, "image-item-box"), sML.addClass(e, "image-item")), E.dispatch("bibi:loaded-item", e), e.stamp("Loaded");
    var t = e.Spread;
    t.LoadedItems++, t.LoadedItems == t.Items.length && L.onLoadSpread(t), I.note("Loading... (" + L.LoadedItems + "/" + R.Items.length + " Items Loaded.)")
  }, L.onLoadSpread = function(e) {
    L.LoadedSpreads++, e.ImageSpread = !0, e.Items.forEach(function(t) {
      t.ImageItem || (e.ImageSpread = !1)
    }), e.ImageSpread && (sML.addClass(e.SpreadBox, "image-spread-box"), sML.addClass(e, "image-spread")), E.dispatch("bibi:loaded-spread", e), R.ToBeLaidOutLater || R.resetSpread(e), L.LoadedSpreads == R.Spreads.length && L.onLoadItemsInSpreads()
  }, L.onLoadItemsInSpreads = function() {
    B.Files = {}, R.resetPages(), O.stamp("Items in Spreads Loaded"), O.log(R.Items.length + " Item" + (R.Items.length > 1 ? "s" : "") + " in " + R.Spreads.length + " Spread" + (R.Spreads.length > 1 ? "s" : "") + " Loaded.", "/*"), E.dispatch("bibi:loaded-items"), E.dispatch("bibi:loaded-spreads"), E.dispatch("bibi:loaded-items-in-spreads"), L.onLoadBook()
  }, L.onLoadBook = function() {
    L.Loaded = !0, O.Busy = !1, sML.removeClass(O.HTML, "busy"), sML.removeClass(O.HTML, "loading"), O.stamp("Book Loaded"), E.dispatch("bibi:loaded-book"), L.open()
  }, L.open = function() {
    window.removeEventListener("resize", L.listenResizingWhileLoading), delete L.listenResizingWhileLoading, R.updateOrientation(), R.layOut({
      Destination: function() {
        if (S.to) {
          var e = R.focusOn.hatchDestination(S.to);
          if (e) return e
        }
        return "head"
      }()
    }), R.getCurrent(), E.dispatch("bibi:laid-out:for-the-first-time"), setTimeout(function() {
      I.Veil && I.Veil.close(), setTimeout(function() {
        I.Menu && I.Menu.close(), I.Slider && I.Slider.close()
      }, 888), document.body.click(), L.Opened = !0, I.note(""), E.dispatch("bibi:opened"), O.stamp("Enjoy"), O.log("Enjoy Readings!", "-0")
    }, 1)
  }, R = {}, R.initialize = function() {
    R.Main = O.Body.insertBefore(sML.create("div", {
      id: "bibi-main",
      Transformation: {
        Scale: 1,
        Translation: {
          X: 0,
          Y: 0
        }
      }
    }), O.Body.firstElementChild), R.Sub = O.Body.insertBefore(sML.create("div", {
      id: "bibi-sub"
    }), R.Main.nextSibling), R.Main.Book = R.Main.appendChild(sML.create("div", {
      id: "bibi-main-book"
    })), R.reset(), E.add("bibi:scrolled", function() {
      R.getCurrent(), S["use-cookie"] && R.Current.Page && O.Cookie.eat(B.ID, {
        Position: {
          SpreadIndex: R.Current.Pages.StartPage.Spread.SpreadIndex,
          PageProgressInSpread: R.Current.Pages.StartPage.PageIndexInSpread / R.Current.Pages.StartPage.Spread.Pages.length
        }
      })
    }), E.add("bibi:resized", function() {
      R.layOut({
        Reset: !0,
        Setting: Option && Option.Setting ? Option.Setting : void 0
      })
    }), O.HTML.addEventListener(O.pointermove, R.onpointermove), E.add("bibi:loaded-item", function(e) {
      e.HTML.addEventListener(O.pointermove, R.onpointermove)
    }), I.observeTap(O.HTML), O.HTML.addTapEventListener("tap", R.ontap), O.HTML.addEventListener(O.pointerdown, R.onpointerdown), O.HTML.addEventListener(O.pointerup, R.onpointerup), E.add("bibi:loaded-item", function(e) {
      I.observeTap(e.HTML), e.HTML.addTapEventListener("tap", R.ontap), e.HTML.addEventListener(O.pointerdown, R.onpointerdown), e.HTML.addEventListener(O.pointerup, R.onpointerup)
    })
  }, R.reset = function() {
    R.Started = !1, R.AllItems = [], R.NonLinearItems = [], R.Spreads = [], R.Items = [], R.Pages = [], R.CoverImage = {
      Path: ""
    }, R.Current = {}, R.Main.Book.innerHTML = R.Sub.innerHTML = ""
  }, R.resetStage = function() {
    R.Stage = {}, R.Columned = !1, R.Main.Book.style.padding = R.Main.Book.style.width = R.Main.Book.style.height = "", R.Stage.Width = O.Body.clientWidth, R.Stage.Height = O.Body.clientHeight, /FBAN/.test(navigator.userAgent) && (R.Stage.Height = window.innerHeight, O.HTML.style.height = window.innerHeight + "px", window.scrollTo(0, 0)), S["use-full-height"] ? sML.addClass(O.HTML, "book-full-height") : (sML.removeClass(O.HTML, "book-full-height"), R.Stage.Height -= I.Menu.Height), "paged" == S.RVM ? (I.Slider && (R.Stage.Height -= O.Scrollbars.Height), R.Stage.PageGap = R.Main.Book.style["padding" + S.BASE.S] = R.Main.Book.style["padding" + S.BASE.E] = 0) : (R.Stage[S.SIZE.B] -= O.Scrollbars[S.SIZE.B] + 2 * S["spread-margin"], R.Stage.PageGap = S["spread-gap"], R.Main.Book.style["padding" + S.BASE.S] = S["spread-margin"] + "px", R.Main.Book.style["padding" + S.BASE.E] = S["spread-margin"] + "px"), R.Stage.Orientation = R.Stage.Width / R.Stage.Height > 1.4 ? "landscape" : "portrait", R.Stage.BunkoLength = Math.floor(R.Stage[S.SIZE.B] * R.DefaultPageRatio[S.AXIS.L] / R.DefaultPageRatio[S.AXIS.B]), S["book-background"] && (O.HTML.style.background = S["book-background"])
  }, R.resetSpread = function(e) {
    O.stamp("Reset Spread " + e.SpreadIndex + " Start"), E.dispatch("bibi:is-going-to:reset-spread", e), e.Items.forEach(function(e) {
      R.resetItem(e)
    });
    var t = e.SpreadBox;
    if (t.style["margin" + S.BASE.B] = t.style["margin" + S.BASE.A] = "", t.style["margin" + S.BASE.E] = t.style["margin" + S.BASE.S] = "auto", t.style.padding = t.style.width = t.style.height = "", "reflowable" == e.RenditionLayout || "reflowable" == S.BRL && "vertical" == S.SLA)
      if (2 == e.Items.length)
        if (R.Stage.Width > e.Items[0].ItemBox.offsetWidth + e.Items[1].ItemBox.offsetWidth) var n = e.Items[0].ItemBox.offsetWidth + e.Items[1].ItemBox.offsetWidth,
          i = Math.max(e.Items[0].ItemBox.offsetHeight, e.Items[1].ItemBox.style.offsetHeight);
        else var n = Math.max(e.Items[0].ItemBox.offsetWidth, e.Items[1].ItemBox.offsetWidth),
          i = e.Items[0].ItemBox.offsetHeight + e.Items[1].ItemBox.offsetHeight;
    else var n = e.Items[0].ItemBox.offsetWidth,
      i = e.Items[0].ItemBox.offsetHeight;
    else if (2 == e.Items.length) var n = e.Items[0].ItemBox.offsetWidth + e.Items[1].ItemBox.offsetWidth,
      i = Math.max(e.Items[0].ItemBox.offsetHeight, e.Items[1].ItemBox.style.offsetHeight);
    else var n = e.Items[0].ItemBox.offsetWidth * ("left" == e.Items[0].ItemRef["page-spread"] || "right" == e.Items[0].ItemRef["page-spread"] ? 2 : 1),
      i = e.Items[0].ItemBox.offsetHeight;
    t.style.width = Math.ceil(n) + "px", t.style.height = Math.ceil(i) + "px", e.style["border-radius"] = S["spread-border-radius"], e.style["box-shadow"] = S["spread-box-shadow"], E.dispatch("bibi:reset-spread", e), O.stamp("Reset Spread " + e.SpreadIndex + " End")
  }, R.DefaultPageRatio = {
    X: 103,
    Y: 148
  }, R.resetItem = function(e) {
    O.stamp("Reset Item " + e.ItemIndex + " Start"), O.stamp("Reset Start", e.TimeCard), E.dispatch("bibi:is-going-to:reset-item", e), e.Reset = !1, e.Pages = [], e.scrolling = "no", e.Spreaded = !1, e.style.margin = e.style.padding = e.style.width = e.style.height = "", e.HTML.style[S.SIZE.b] = e.HTML.style[S.SIZE.l] = "", sML.style(e.HTML, {
      "transform-origin": "",
      transformOrigin: "",
      transform: "",
      "column-width": "",
      "column-gap": "",
      "column-rule": ""
    }), e.Columned = !1, e.ColumnBreadth = 0, e.ColumnLength = 0, e.ColumnGap = 0, e.PrePaginated ? R.resetItem.asPrePaginatedItem(e) : e.Outsourcing ? R.resetItem.asReflowableOutsourcingItem(e) : R.resetItem.asReflowableItem(e), e.Reset = !0, E.dispatch("bibi:reset-item", e), O.stamp("Reset End", e.TimeCard), O.stamp("Reset Item " + e.ItemIndex + " End")
  }, R.resetItem.asReflowableItem = function(e) {
    var t = (e.ItemIndex, e.ItemRef),
      n = e.ItemBox,
      i = e.Spread,
      a = R.Stage[S.SIZE.B],
      o = R.Stage[S.SIZE.L],
      r = R.Stage.PageGap;
    /fill/.test(t["bibi:layout"]) || (a -= S["item-padding-" + S.BASE.s] + S["item-padding-" + S.BASE.e], o -= S["item-padding-" + S.BASE.b] + S["item-padding-" + S.BASE.a], r += S["item-padding-" + S.BASE.b] + S["item-padding-" + S.BASE.a], e.style["padding-" + S.BASE.b] = S["item-padding-" + S.BASE.b] + "px", e.style["padding-" + S.BASE.a] = S["item-padding-" + S.BASE.a] + "px", e.style["padding-" + S.BASE.s] = S["item-padding-" + S.BASE.s] + "px", e.style["padding-" + S.BASE.e] = S["item-padding-" + S.BASE.e] + "px");
    var s = a,
      l = o;
    if (!S["single-page-always"] && /-tb$/.test(B.WritingMode) && "horizontal" == S.SLA && !/fill-spread/.test(t["bibi:layout"])) {
      var d = Math.floor(s * R.DefaultPageRatio[S.AXIS.L] / R.DefaultPageRatio[S.AXIS.B]),
        c = Math.floor((o - r) / 2);
      c >= d && (e.Spreaded = !0, l = c)
    }
    e.style[S.SIZE.b] = s + "px", e.style[S.SIZE.l] = l + "px", R.resetItem.asReflowableItem.adjustContent(e, s, l, r);
    var u = sML.UA.InternetExplorer ? e.Body["client" + S.SIZE.L] : e.HTML["scroll" + S.SIZE.L],
      p = Math.ceil((u + r) / (l + r));
    u = (l + r) * p - r, e.style[S.SIZE.l] = u + "px", sML.UA.InternetExplorer && (e.HTML.style[S.SIZE.l] = "100%");
    var f = s,
      g = u + ("paged" == S.RVM && e.Spreaded && p % 2 ? r + l : 0);
    /fill/.test(t["bibi:layout"]) || (f += S["item-padding-" + S.BASE.s] + S["item-padding-" + S.BASE.e], g += S["item-padding-" + S.BASE.b] + S["item-padding-" + S.BASE.a]), n.style[S.SIZE.b] = f + "px", n.style[S.SIZE.l] = g + "px";
    for (var h = 0; h < p; h++) {
      var m = n.appendChild(sML.create("span", {
        className: "page"
      }));
      /fill/.test(t["bibi:layout"]) || (m.style["padding" + S.BASE.B] = S["item-padding-" + S.BASE.b] + "px", m.style["padding" + S.BASE.A] = S["item-padding-" + S.BASE.a] + "px", m.style["padding" + S.BASE.S] = S["item-padding-" + S.BASE.s] + "px", m.style["padding" + S.BASE.E] = S["item-padding-" + S.BASE.e] + "px"), m.style[S.SIZE.b] = s + "px", m.style[S.SIZE.l] = l + "px", m.style[S.BASE.b] = (l + r) * h + "px", m.Item = e, m.Spread = i, m.PageIndexInItem = e.Pages.length, e.Pages.push(m)
    }
    return e
  }, R.resetItem.asReflowableItem.adjustContent = function(e, t, n, i) {
    E.dispatch("bibi:is-going-to:adjust-content", e);
    var a = sML.appendStyleRule("*", "word-wrap: break-word;", e.contentDocument);
    R.resetItem.asReflowableItem.adjustContent.fitImages(e, t, n), R.resetItem.asReflowableItem.adjustContent.columify(e, t, n, i), S["page-breaking"] && R.resetItem.asReflowableItem.adjustContent.breakPages(e, t), sML.deleteStyleRule(a, e.contentDocument), E.dispatch("bibi:adjusted-content", e)
  }, R.resetItem.asReflowableItem.adjustContent.fitImages = function(e, t, n) {
    sML.each(e.Body.getElementsByTagName("img"), function() {
      if (this.Bibi && this.Bibi.DefaultStyle) {
        this.style.width = this.Bibi.DefaultStyle.width, this.style.height = this.Bibi.DefaultStyle.height;
        var i = parseFloat(getComputedStyle(this)[S.SIZE.b]),
          a = parseFloat(getComputedStyle(this)[S.SIZE.l]),
          o = Math.floor(Math.min(parseFloat(getComputedStyle(e.Body)[S.SIZE.b]), t)),
          r = Math.floor(Math.min(parseFloat(getComputedStyle(e.Body)[S.SIZE.l]), n));
        (i > o || a > r) && (this.style[S.SIZE.b] = Math.floor(parseFloat(getComputedStyle(this)[S.SIZE.b]) * Math.min(o / i, r / a)) + "px", this.style[S.SIZE.l] = "auto")
      }
    })
  }, R.resetItem.asReflowableItem.adjustContent.columify = function(e, t, n, i) {
    ("paged" == S.RVM || e.HTML["offset" + S.SIZE.B] > t) && (R.Columned = e.Columned = !0, e.ColumnBreadth = t, e.ColumnLength = n, e.ColumnGap = i, e.HTML.style[S.SIZE.b] = t + "px", e.HTML.style[S.SIZE.l] = n + "px", sML.style(e.HTML, {
      "column-fill": "auto",
      "column-width": e.ColumnLength + "px",
      "column-gap": e.ColumnGap + "px",
      "column-rule": ""
    }))
  }, R.resetItem.asReflowableItem.adjustContent.breakPages = function(e, t) {
    var n;
    n = e.Body["offset" + S.SIZE.B] <= t ? ["vertical" == S.SLA ? "Top" : "Left", window["inner" + S.SIZE.L], S.SIZE.L, S.SIZE.l, S.BASE.a] : ["vertical" == S.SLA ? "Left" : "Top", t, S.SIZE.B, S.SIZE.b, S.BASE.e], sML.each(e.contentDocument.querySelectorAll("html>body *"), function() {
      var e = getComputedStyle(this);
      if ("always" == e.pageBreakBefore || "always" == e.pageBreakAfter) {
        this.BibiPageBreakerBefore && (this.BibiPageBreakerBefore.style[n[3]] = ""), this.BibiPageBreakerAfter && (this.BibiPageBreakerAfter.style[n[3]] = "");
        for (var t = this, i = t["offset" + n[0]], a = 0; t.offsetParent;) t = t.offsetParent, i += t["offset" + n[0]];
        "rtl" == S.SLD && (i = window.innerWidth + i * -1 - this["offset" + n[2]]), "always" == e.pageBreakBefore && (this.BibiPageBreakerBefore || (this.BibiPageBreakerBefore = this.parentNode.insertBefore(sML.create("span", {
          className: "bibi-page-breaker-before"
        }, {
          display: "block"
        }), this)), a = n[1] - i % n[1], a == n[1] && (a = 0), this.BibiPageBreakerBefore.style[n[3]] = a + "px"), "always" == e.pageBreakAfter && (i += a + this["offset" + n[2]], this.style["margin-" + n[4]] = 0, this.BibiPageBreakerAfter || (this.BibiPageBreakerAfter = this.parentNode.insertBefore(sML.create("span", {
          className: "bibi-page-breaker-after"
        }, {
          display: "block"
        }), this.nextSibling)), a = n[1] - i % n[1], a == n[1] && (a = 0), this.BibiPageBreakerAfter.style[n[3]] = a + "px")
      }
    })
  }, R.resetItem.asReflowableOutsourcingItem = function(e, t) {
    var n = (e.ItemIndex, e.ItemRef),
      i = e.ItemBox,
      a = e.Spread;
    e.style.margin = "auto", e.style.padding = 0;
    var o = R.Stage[S.SIZE.B],
      r = R.Stage[S.SIZE.L],
      s = o,
      l = r;
    if (!S["single-page-always"] && "horizontal" == S.SLA && !/fill-spread/.test(n["bibi:layout"])) {
      var d = Math.floor(s * R.DefaultPageRatio[S.AXIS.L] / R.DefaultPageRatio[S.AXIS.B]),
        c = Math.floor((r - R.Stage.PageGap) / 2);
      c > d && (e.Spreaded = !0, l = c)
    }
    if (e.style[S.SIZE.b] = i.style[S.SIZE.b] = s + "px", e.style[S.SIZE.l] = i.style[S.SIZE.l] = l + "px", e.ImageItem) {
      if (e.HTML["scroll" + S.SIZE.B] <= s && e.HTML["scroll" + S.SIZE.L] <= l) {
        var u = getComputedStyle(e.Body);
        e.style.width = e.Body.offsetWidth + parseFloat(u.marginLeft) + parseFloat(u.marginRight) + "px"
      } else {
        if ("ttb" == S.SLD && e.HTML["scroll" + S.SIZE.B] > s || "horizontal" == S.SLA && e.HTML["scroll" + S.SIZE.L] > l) var p = /rl/.test(e.HTML.WritingMode) ? "100% 0" : "0 0";
        else var p = "50% 0";
        var f = Math.floor(100 * Math.min(s / e.HTML["scroll" + S.SIZE.B], l / e.HTML["scroll" + S.SIZE.L])) / 100;
        sML.style(e.HTML, {
          "transform-origin": p,
          transform: "scale(" + f + ")"
        })
      }
      sML.each(e.Body.getElementsByTagName("img"), function() {
        var e = this;
        e.style.maxWidth = "none", setTimeout(function() {
          e.style.maxWidth = ""
        }, 0)
      })
    } else if (e.FrameItem) {
      var g = e.Body.getElementsByTagName("iframe")[0];
      g.style[S.SIZE.b] = g.style[S.SIZE.l] = "100%"
    }
    var h = i.appendChild(sML.create("span", {
      className: "page"
    }));
    return h.style[S.SIZE.b] = s + "px", h.style[S.SIZE.l] = l + "px", h.style[S.BASE.b] = 0, h.Item = e, h.Spread = a, h.PageIndexInItem = e.Pages.length, e.Pages.push(h), e
  }, R.resetItem.asPrePaginatedItem = function(e) {
    var t = (e.ItemIndex, e.ItemRef),
      n = e.ItemBox,
      i = e.Spread;
    e.HTML.style.margin = e.HTML.style.padding = e.Body.style.margin = e.Body.style.padding = 0;
    var a = R.Stage[S.SIZE.B],
      o = R.Stage[S.SIZE.L],
      r = a,
      s = o;
    if (e.style.padding = 0, e.Scale) {
      var l = e.Scale;
      delete e.Scale
    } else {
      var l = 1;
      if ("pre-paginated" == S.BRL && "vertical" == S.SLA || R.Stage.Orientation == t["rendition:spread"] || "both" == t["rendition:spread"]) {
        var d = {
          Width: t.viewport.width,
          Height: t.viewport.height
        };
        e.SpreadPair ? d.Width += e.SpreadPair.ItemRef.viewport.width : "right" != t["page-spread"] && "left" != t["page-spread"] || (d.Width += d.Width), l = Math.min(r / d[S.SIZE.B], s / d[S.SIZE.L])
      } else l = Math.min(r / t.viewport[S.SIZE.b], s / t.viewport[S.SIZE.l]);
      e.SpreadPair && (e.SpreadPair.Scale = l)
    }
    var c = 1 / l;
    s = Math.floor(t.viewport[S.SIZE.l] * l), r = Math.floor(t.viewport[S.SIZE.b] * (s / t.viewport[S.SIZE.l])), n.style[S.SIZE.l] = s + "px", n.style[S.SIZE.b] = r + "px", e.style[S.SIZE.l] = s * c + "px", e.style[S.SIZE.b] = r * c + "px";
    var u = /rl/.test(e.HTML.WritingMode) ? "100% 0" : "0 0";
    sML.style(e.HTML, {
      width: t.viewport.width + "px",
      height: t.viewport.height + "px",
      "transform-origin": u,
      transformOrigin: u,
      transform: "scale(" + l * c + ")"
    }), sML.style(e, {
      "transform-origin": "0 0",
      transformOrigin: "0 0",
      transform: "scale(" + 1 / c + ")"
    });
    var p = n.appendChild(sML.create("span", {
      className: "page"
    }));
    return "right" == t["page-spread"] ? p.style.right = 0 : p.style.left = 0, p.style[S.SIZE.b] = r + "px", p.style[S.SIZE.l] = s + "px", p.Item = e, p.Spread = i, p.PageIndexInItem = e.Pages.length, e.Pages.push(p), e
  }, R.resetPages = function() {
    return R.Pages.forEach(function(e) {
      e.parentNode.removeChild(e), delete e
    }), R.Pages = [], R.Spreads.forEach(function(e) {
      e.Pages = [], e.Items.forEach(function(t) {
        t.Pages.forEach(function(t) {
          t.PageIndexInSpread = e.Pages.length, e.Pages.push(t), t.PageIndex = R.Pages.length, R.Pages.push(t), t.id = "page-" + sML.String.pad(t.PageIndex + 1, 0, B.FileDigit)
        })
      })
    }), R.Pages
  }, R.resetNavigation = function() {}, R.layOutSpread = function(e) {
    O.stamp("Lay Out Spread " + e.SpreadIndex + " Start"), E.dispatch("bibi:is-going-to:lay-out-spread", e);
    var t = e.SpreadBox;
    if (t.style.padding = "", t.PaddingBefore = t.PaddingAfter = 0, "horizontal" == S.SLA && t.offsetHeight < R.Stage[S.SIZE.B]) {
      var n = Math.floor((R.Stage[S.SIZE.B] - t.offsetHeight) / 2),
        i = R.Stage[S.SIZE.B] - (n + t.offsetHeight);
      t.style.paddingTop = n + "px", t.style.paddingBottom = i + "px"
    }
    if ("pre-paginated" == S.BRL) {
      if (R.Stage[S.SIZE.L] >= t["offset" + S.SIZE.L]) t.PaddingBefore = t.PaddingAfter = Math.ceil((R.Stage[S.SIZE.L] - t["offset" + S.SIZE.L]) / 2);
      else {
        var a = e.Items[0];
        R.Stage[S.SIZE.L] >= a["offset" + S.SIZE.L] && (t.PaddingBefore = Math.ceil((R.Stage[S.SIZE.L] - a["offset" + S.SIZE.L]) / 2));
        var o = e.Items[e.Items.length - 1];
        R.Stage[S.SIZE.L] >= o["offset" + S.SIZE.L] && (t.PaddingAfter = Math.ceil((R.Stage[S.SIZE.L] - o["offset" + S.SIZE.L]) / 2))
      }
      if (0 != e.SpreadIndex) {
        var r = R.Spreads[e.SpreadIndex - 1].SpreadBox;
        t.PaddingBefore = t.PaddingBefore - r.PaddingAfter, t.PaddingBefore < I.Menu.offsetHeight && (t.PaddingBefore = I.Menu.offsetHeight)
      }
    } else "paged" == S.RVM ? 0 == e.SpreadIndex || (t.PaddingBefore = R.Stage.PageGap) : (0 == e.SpreadIndex ? t.PaddingBefore = Math.floor((R.Stage[S.SIZE.L] - t["offset" + S.SIZE.L]) / 2) : t.PaddingBefore = R.Stage.PageGap, e.SpreadIndex == R.Spreads.length - 1 && (t.PaddingAfter = Math.ceil((R.Stage[S.SIZE.L] - t["offset" + S.SIZE.L]) / 2)));
    t.PaddingBefore > 0 && (t.style["padding" + S.BASE.B] = t.PaddingBefore + "px"), t.PaddingAfter > 0 && (t.style["padding" + S.BASE.A] = t.PaddingAfter + "px");
    var s = 0;
    R.Spreads.forEach(function(e) {
      s += e.SpreadBox["offset" + S.SIZE.L]
    }), R.Main.Book.style[S.SIZE.b] = "", R.Main.Book.style[S.SIZE.l] = s + "px", E.dispatch("bibi:laid-out-spread", e), O.stamp("Lay Out Spread " + e.SpreadIndex + " End")
  }, R.layOut = function(e) {
    if (e || (e = {}), R.LayingOut) return !1;
    if (R.LayingOut = !0, O.log("Laying out...", "*:"), O.stamp("Lay Out Start"), E.dispatch("bibi:is-going-to:lay-out", e), window.removeEventListener(O.resize, R.onresize), R.Main.removeEventListener("scroll", R.onscroll), O.Busy = !0, sML.addClass(O.HTML, "busy"), sML.addClass(O.HTML, "laying-out"), e.NoNotification || I.note("Laying Out..."), !e.Destination) {
      R.getCurrent();
      var t = R.Current.Pages.StartPage;
      e.Destination = {
        SpreadIndex: t.Spread.SpreadIndex,
        PageProgressInSpread: t.PageIndexInSpread / t.Spread.Pages.length
      }
    }
    e.Setting && S.update(e.Setting), O.log(['reader-view-mode: "' + S.RVM + '"', 'spread-layout-direction: "' + S.SLD + '"', 'apparent-reading-direction: "' + S.ARD + '"'].join(" / "), "-*"), "function" == typeof e.before && e.before(), (e.Reset || R.ToBeLaidOutLater) && (R.ToBeLaidOutLater = !1, R.resetStage(), R.Spreads.forEach(function(e) {
      R.resetSpread(e)
    }), R.resetPages(), R.resetNavigation()), R.Spreads.forEach(function(e) {
      R.layOutSpread(e)
    }), R.Columned = !1;
    for (var n = R.Items.length, i = 0; i < n; i++) {
      var a = R.Items[i].HTML.style;
      if (a["-webkit-column-width"] || a["-moz-column-width"] || a["-ms-column-width"] || a["column-width"]) {
        R.Columned = !0;
        break
      }
    }
    E.dispatch("bibi:commands:focus-on", {
      Destination: e.Destination,
      Duration: 0
    }), O.Busy = !1, sML.removeClass(O.HTML, "busy"), sML.removeClass(O.HTML, "laying-out"), e.NoNotification || I.note(""), window.addEventListener(O.resize, R.onresize), R.Main.addEventListener("scroll", R.onscroll), R.LayingOut = !1, "function" == typeof e.callback && e.callback(), E.dispatch("bibi:laid-out"), O.stamp("Lay Out End"), O.log("Laid out.", "/*")
  }, R.updateOrientation = function() {
    var e = R.Orientation;
    if ("undefined" != typeof window.orientation) R.Orientation = 0 == window.orientation || 180 == window.orientation ? "portrait" : "landscape";
    else {
      var t = window.innerWidth - ("vertical" == S.SLA ? O.Scrollbars.Width : 0),
        n = window.innerHeight - ("horizontal" == S.SLA ? O.Scrollbars.Height : 0);
      R.Orientation = t / n < 1.4 ? "portrait" : "landscape"
    }
    R.Orientation != e && (E.dispatch("bibi:changes-orientation", R.Orientation), sML.removeClass(O.HTML, "orientation-" + e), sML.addClass(O.HTML, "orientation-" + R.Orientation), E.dispatch("bibi:changed-orientation", R.Orientation))
  }, R.onscroll = function(e) {
    L.Opened && (R.Scrolling || (sML.addClass(O.HTML, "scrolling"), R.Scrolling = !0, e.BibiScrollingBegun = !0), E.dispatch("bibi:scrolls", e), clearTimeout(R.Timer_onscrolled), R.Timer_onscrolled = setTimeout(function() {
      R.Scrolling = !1, sML.removeClass(O.HTML, "scrolling"), E.dispatch("bibi:scrolled", e)
    }, 123))
  }, R.onresize = function(e) {
    L.Opened && (R.Resizing || sML.addClass(O.HTML, "resizing"), R.Resizing = !0, E.dispatch("bibi:resizes", e), clearTimeout(R.Timer_afterresized), clearTimeout(R.Timer_onresized), R.Timer_onresized = setTimeout(function() {
      O.Busy = !0, sML.addClass(O.HTML, "busy"), R.updateOrientation(), R.Timer_afterresized = setTimeout(function() {
        E.dispatch("bibi:resized", e), O.Busy = !1, R.Resizing = !1, sML.removeClass(O.HTML, "busy"), sML.removeClass(O.HTML, "resizing")
      }, 100)
    }, O.Mobile ? 444 : 222))
  }, R.ontap = function(e) {
    E.dispatch("bibi:taps", e), E.dispatch("bibi:tapped", e)
  }, R.onpointerdown = function(e) {
    E.dispatch("bibi:downs-pointer", e), R.PointerIsDowned = !0, E.dispatch("bibi:downed-pointer", e)
  }, R.onpointerup = function(e) {
    E.dispatch("bibi:ups-pointer", e), R.PointerIsDowned = !1, E.dispatch("bibi:upped-pointer", e)
  }, R.onpointermove = function(e) {
    var t = O.getBibiEventCoord(e),
      n = R.onpointermove.PreviousCoord;
    n.X != t.X || n.Y != t.Y ? E.dispatch("bibi:moved-pointer", e) : E.dispatch("bibi:stopped-pointer", e), R.onpointermove.PreviousCoord = t
  }, R.onpointermove.PreviousCoord = {
    X: 0,
    Y: 0
  }, R.onwheel = function(e) {
    if (e.preventDefault(), Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      var t = {},
        n = R.onwheel.PreviousWheels,
        i = n.length;
      t.Distance = (e.deltaX < 0 ? -1 : 1) * ("rtl" == S.ARD ? -1 : 1), t.Delta = Math.abs(e.deltaX), n[i - 1] ? t.Distance != n[i - 1].Distance ? (t.Accel = 1, i >= 3 && n[i - 2].Distance != t.Distance && n[i - 3].Distance != t.Distance && (t.Wheeled = "reverse")) : t.Delta > n[i - 1].Delta ? (t.Accel = 1, i >= 3 && n[i - 1].Accel == -1 && n[i - 2].Accel == -1 && n[i - 3].Accel == -1 && (t.Wheeled = "serial")) : t.Delta < n[i - 1].Delta ? t.Accel = -1 : t.Accel = n[i - 1].Accel : (t.Accel = 1, t.Wheeled = "start"), t.Wheeled && (e.BibiSwiperWheel = t, E.dispatch("bibi:wheeled", e)), i >= 3 && n.shift(), n.push(t)
    }
    clearTimeout(R.onwheel.Timer_stop), R.onwheel.Timer_stop = setTimeout(function() {
      R.onwheel.PreviousWheels = []
    }, 192)
  }, R.onwheel.PreviousWheels = [], R.changeView = function(e) {
    return !(S["fix-reader-view-mode"] || "string" != typeof e || S.RVM == e || !/^(paged|horizontal|vertical)$/.test(e)) && (L.Opened ? (I.Panel.close(), I.SubPanels.forEach(function(e) {
      e.close()
    }), I.Menu.close(), I.Slider && I.Slider.close(), O.Busy = !0, sML.addClass(O.HTML, "busy"), setTimeout(function() {
      "paged" != e && R.Spreads.forEach(function(e) {
        e.style.opacity = ""
      }), R.layOut({
        Reset: !0,
        Setting: {
          "reader-view-mode": e
        },
        callback: function() {
          E.dispatch("bibi:changed-view", e), sML.removeClass(O.HTML, "busy"), O.Busy = !1
        }
      })
    }, 888)) : (S.update({
      "reader-view-mode": e
    }), L.play()), void(S["use-cookie"] && O.Cookie.eat(O.RootPath, {
      RVM: e
    })))
  }, R.getFrameState = function() {
    return {
      Coord: sML.Coord.getScrollCoord(R.Main),
      Size: sML.Coord.getClientSize(R.Main)
    }
  }, R.getCurrentPages = function() {
    var e = R.getFrameState(),
      t = e.Coord,
      n = e.Size;
    t = {
      Left: t.X,
      Right: t.X + n.Width,
      Top: t.Y,
      Bottom: t.Y + n.Height
    }, t.Before = t[S.BASE.B], t.After = t[S.BASE.A];
    var i = [],
      a = [],
      o = [],
      r = 0,
      s = !1;
    R.Pages.forEach(function(e, n) {
      if (!s) {
        var l = sML.getCoord(e);
        l.Before = l[S.BASE.B], l.After = l[S.BASE.A];
        var d = Math.min(t.After * S.AXIS.PM, l.After * S.AXIS.PM) - Math.max(t.Before * S.AXIS.PM, l.Before * S.AXIS.PM),
          c = d <= 0 || !l[S.SIZE.L] || isNaN(d) ? 0 : Math.round(d / l[S.SIZE.L] * 100);
        c <= 0 ? i.length && (s = !0) : c > r ? (i = [e], a = [c], o = [R.getCurrentPages.getStatus(c, l, t)], r = c) : c == r && (i.push(e), a.push(c), o.push(R.getCurrentPages.getStatus(c, l, t)))
      }
    });
    var l = {
      Ratio: a,
      Status: o,
      StartPage: i[0],
      StartPageRatio: a[0],
      StartPageStatus: o[0],
      EndPage: i[i.length - 1],
      EndPageRatio: a[a.length - 1],
      EndPageStatus: o[o.length - 1]
    };
    for (var d in l) i[d] = l[d];
    return i
  }, R.getCurrentPages.getStatus = function(e, t, n) {
    if (e >= 100) return "including";
    var i = [];
    window["inner" + S.SIZE.L] < t[S.SIZE.L] && i.push("oversize");
    var a = n.Before,
      o = n.After;
    return a * S.AXIS.PM < t.Before * S.AXIS.PM && i.push("entering"), a * S.AXIS.PM == t.Before * S.AXIS.PM && i.push("entered"), o * S.AXIS.PM == t.After * S.AXIS.PM && i.push("passsing"), o * S.AXIS.PM > t.After * S.AXIS.PM && i.push("passed"), i.join(" ")
  }, R.getCurrent = function() {
    return R.Current.Pages = R.getCurrentPages(), R.Current.Page = R.Current.Pages.EndPage, R.Current.Percent = Math.floor((R.Current.Pages.EndPage.PageIndex + 1) / R.Pages.length * 100), R.classifyCurrent(), R.Current
  }, R.classifyCurrent = function() {
    R.Spreads.forEach(function(e) {
      e.IsCurrent = !1, e.Items.forEach(function(t) {
        t.IsCurrent = !1, t.Pages.forEach(function(n) {
          n.IsCurrent = !1, R.Current.Pages.forEach(function(i) {
            n == i && (n.IsCurrent = !0, t.IsCurrent = !0, e.IsCurrent = !0)
          }), n.IsCurrent ? sML.replaceClass(n, "not-current", "current") : sML.replaceClass(n, "current", "not-current")
        }), t.IsCurrent ? [t, t.ItemBox].forEach(function(e) {
          sML.replaceClass(e, "not-current", "current")
        }) : [t, t.ItemBox].forEach(function(e) {
          sML.replaceClass(e, "current", "not-current")
        })
      }), e.IsCurrent ? [e, e.SpreadBox].forEach(function(e) {
        sML.replaceClass(e, "not-current", "current")
      }) : [e, e.SpreadBox].forEach(function(e) {
        sML.replaceClass(e, "current", "not-current")
      })
    })
  }, R.focusOn = function(e) {
    if (R.Moving) return !1;
    if (!e) return !1;
    if ("number" == typeof e && (e = {
        Destination: e
      }), e.Destination = R.focusOn.hatchDestination(e.Destination), !e.Destination) return !1;
    E.dispatch("bibi:is-going-to:focus-on", e), R.Moving = !0;
    var t = 0;
    "reflowable" == S["book-rendition-layout"] ? "head" == e.Destination.Edge ? t = "rtl" != S.SLD ? 0 : R.Main.Book["offset" + [S.SIZE.L]] - sML.Coord.getClientSize(R.Main)[S.SIZE.L] : "foot" == e.Destination.Edge ? t = "rtl" == S.SLD ? 0 : R.Main.Book["offset" + [S.SIZE.L]] - sML.Coord.getClientSize(R.Main)[S.SIZE.L] : (t = O.getElementCoord(e.Destination.Page)[S.AXIS.L], "after" == e.Destination.Side && (t += (e.Destination.Page["offset" + S.SIZE.L] - R.Stage[S.SIZE.L]) * S.AXIS.PM), "rtl" == S.SLD && (t += e.Destination.Page.offsetWidth - R.Stage.Width)) : R.Stage[S.SIZE.L] > e.Destination.Page.Spread["offset" + S.SIZE.L] ? (t = O.getElementCoord(e.Destination.Page.Spread)[S.AXIS.L], t -= Math.floor((R.Stage[S.SIZE.L] - e.Destination.Page.Spread["offset" + S.SIZE.L]) / 2)) : (t = O.getElementCoord(e.Destination.Page)[S.AXIS.L], R.Stage[S.SIZE.L] > e.Destination.Page["offset" + S.SIZE.L] && (t -= Math.floor((R.Stage[S.SIZE.L] - e.Destination.Page["offset" + S.SIZE.L]) / 2))), "number" == typeof e.Destination.TextNodeIndex && R.selectTextLocation(e.Destination);
    var n = R.focusOn.getScrollTarget(t);
    return sML.scrollTo(n, {
      ForceScroll: !0,
      Duration: "paged" == S.RVM ? 0 : e.Duration,
      callback: function() {
        R.getCurrent(), R.Moving = !1, e.callback && e.callback(e), E.dispatch("bibi:focused-on", e)
      }
    }), !0
  }, R.focusOn.hatchDestination = function(e) {
    return e ? ("number" == typeof e || "string" == typeof e && /^\d+$/.test(e) ? e = R.getBibiToDestination(e) : "string" == typeof e ? "head" == e || "foot" == e ? e = {
      Edge: e
    } : X.EPUBCFI && (e = X.EPUBCFI.getDestination(e)) : e.tagName && (e = "number" == typeof e.PageIndex ? {
      Page: e
    } : "number" == typeof e.ItemIndex ? {
      Item: e
    } : "number" == typeof e.SpreadIndex ? {
      Spread: e
    } : {
      Element: e
    }), e.Page && !e.Page.parentElement && delete e.Page, e.Item && !e.Item.parentElement && delete e.Item, e.Spread && !e.Spread.parentElement && delete e.Spread, e.Element && !e.Element.parentElement && delete e.Element, "string" == typeof e.Edge ? "head" == e.Edge ? e.Page = R.Pages[0] : (e.Page = R.Pages[R.Pages.length - 1], e.Edge = "foot") : (e.Element || (e.Item || ("number" == typeof e.ItemIndexInAll ? e.Item = R.AllItems[e.ItemIndexInAll] : "number" == typeof e.ItemIndex ? e.Item = R.Items[e.ItemIndex] : (e.Spread || "number" != typeof e.SpreadIndex || (e.Spread = R.Spreads[e.SpreadIndex]), e.Spread && ("number" == typeof e.PageIndexInSpread ? e.Page = e.Spread.Pages[e.PageIndexInSpread] : "number" == typeof e.ItemIndexInSpread ? e.Item = e.Spread.Items[e.ItemIndexInSpread] : e.Item = e.Spread.Items[0]))), e.Item && "string" == typeof e.ElementSelector && (e.Element = e.Item.contentDocument.querySelector(e.ElementSelector))), e.Element ? e.Page = R.focusOn.getNearestPageOfElement(e.Element) : e.Page || (e.Spread && ("number" == typeof e.PageIndexInSpread ? e.Page = e.Spread.Pages[e.PageIndexInSpread] : "number" == typeof e.PageProgressInSpread && (e.Page = e.Spread.Pages[Math.floor(e.Spread.Pages.length * e.PageProgressInSpread)])), !e.Page && e.Item && (e.Page = e.Item.Pages[0]))), e.Page ? (e.Item = e.Page.Item, e.Spread = e.Page.Spread, e) : null) : null
  }, R.focusOn.getNearestPageOfElement = function(e) {
    var t = e.ownerDocument.body.Item;
    if (!t) return R.Pages[0];
    if (t.Columned) {
      sML.style(t.HTML, {
        "column-width": ""
      });
      var n = O.getElementCoord(e)[S.AXIS.B];
      "rtl" == S.PPD && "vertical" == S.SLA && (n = t.offsetWidth - (S["item-padding-left"] + S["item-padding-right"]) - n - e.offsetWidth), sML.style(t.HTML, {
        "column-width": t.ColumnLength + "px"
      });
      var i = t.Pages[Math.ceil(n / t.ColumnBreadth - 1)]
    } else {
      var n = O.getElementCoord(e)[S.AXIS.L];
      "rtl" == S.SLD && "horizontal" == S.SLA && (n = t.HTML.offsetWidth - n - e.offsetWidth);
      for (var i = t.Pages[0], a = t.Pages.length, o = 0; o < a; o++)
        if (n -= t.Pages[o]["offset" + S.SIZE.L], n <= 0) {
          i = t.Pages[o];
          break
        }
    }
    return i
  }, R.focusOn.getScrollTarget = function(e) {
    var t = {
      Frame: R.Main,
      X: 0,
      Y: 0
    };
    return t[S.AXIS.L] = e, t
  }, R.selectTextLocation = function(e) {
    if ("number" == typeof e.TextNodeIndex) {
      var t = e.Element.childNodes[e.TextNodeIndex];
      if (t && t.textContent) {
        var n = {
          Start: {
            Node: t,
            Index: 0
          },
          End: {
            Node: t,
            Index: t.textContent.length
          }
        };
        if (e.TermStep)
          if (e.TermStep.Preceding || e.TermStep.Following) {
            if (n.Start.Index = e.TermStep.Index, n.End.Index = e.TermStep.Index, e.TermStep.Preceding && (n.Start.Index -= e.TermStep.Preceding.length), e.TermStep.Following && (n.End.Index += e.TermStep.Following.length), n.Start.Index < 0 || t.textContent.length < n.End.Index) return;
            if (t.textContent.substr(n.Start.Index, n.End.Index - n.Start.Index) != e.TermStep.Preceding + e.TermStep.Following) return;
          } else if (e.TermStep.Side && "a" == e.TermStep.Side) {
          for (n.Start.Node = t.parentNode.firstChild; n.Start.Node.childNodes.length;) n.Start.Node = n.Start.Node.firstChild;
          n.End.Index = e.TermStep.Index - 1
        } else {
          for (n.Start.Index = e.TermStep.Index, n.End.Node = t.parentNode.lastChild; n.End.Node.childNodes.length;) n.End.Node = n.End.Node.lastChild;
          n.End.Index = n.End.Node.textContent.length
        }
        return sML.select(n)
      }
    }
  }, R.moveBy = function(e) {
    if (R.Moving || !L.Opened) return !1;
    if (!e) return !1;
    if ("number" == typeof e && (e = {
        Distance: e
      }), !e.Distance || "number" != typeof e.Distance) return !1;
    if (e.Distance *= 1, 0 == e.Distance || isNaN(e.Distance)) return !1;
    e.Distance = e.Distance < 0 ? -1 : 1, E.dispatch("bibi:is-going-to:move-by", e);
    var t = "",
      n = "";
    e.Distance > 0 ? (t = "EndPage", n = "before") : (t = "StartPage", n = "after"), R.getCurrent();
    var i = R.Current.Pages[t],
      a = R.Columned || "pre-paginated" == S.BRL || i.Item.PrePaginated || i.Item.Outsourcing || 1 == i.Item.Pages.length || e.Distance < 0 && 0 == i.PageIndexInItem || e.Distance > 0 && i.PageIndexInItem == i.Item.Pages.length - 1,
      o = e.callback;
    if (e.callback = function(e) {
        "function" == typeof o && o(e), E.dispatch("bibi:moved-by", e)
      }, a) {
      var r = R.Current.Pages[t + "Status"],
        s = R.Current.Pages[t + "Ratio"];
      /(oversize)/.test(r) ? e.Distance > 0 ? s >= 90 ? n = "before" : /entering/.test(r) ? (n = "before", e.Distance = 0) : /entered/.test(r) && (n = "after", e.Distance = 0) : s >= 90 ? n = "after" : /passing/.test(r) ? (n = "before", e.Distance = 0) : /passed/.test(r) && (n = "after", e.Distance = 0) : e.Distance > 0 ? /enter/.test(r) && (n = "before", e.Distance = 0) : /pass/.test(r) && (n = "after", e.Distance = 0);
      var l = i.PageIndex + e.Distance;
      l < 0 ? l = 0 : l > R.Pages.length - 1 && (l = R.Pages.length - 1);
      var d = R.Pages[l];
      "pre-paginated" == S.BRL && d.Item.SpreadPair && "horizontal" == S.SLA && R.Stage[S.SIZE.L] > d.Spread["offset" + S.SIZE.L] && (e.Distance < 0 && 0 == d.PageIndexInSpread && (d = d.Spread.Pages[1]), e.Distance > 0 && 1 == d.PageIndexInSpread && (d = d.Spread.Pages[0])), e.Destination = {
        Page: d,
        Side: n
      }, E.dispatch("bibi:commands:focus-on", e)
    } else E.dispatch("bibi:commands:scroll-by", e);
    return !0
  }, R.scrollBy = function(e) {
    if (!e) return !1;
    if ("number" == typeof e && (e = {
        Distance: e
      }), !e.Distance || "number" != typeof e.Distance) return !1;
    E.dispatch("bibi:is-going-to:scroll-by", e), R.Moving = !0;
    var t = {
        Frame: R.Main,
        X: 0,
        Y: 0
      },
      n = sML.Coord.getScrollCoord(R.Main);
    switch (S.SLD) {
      case "ttb":
        t.Y = n.Y + (R.Stage.Height + R.Stage.PageGap) * e.Distance;
        break;
      case "ltr":
        t.X = n.X + (R.Stage.Width + R.Stage.PageGap) * e.Distance;
        break;
      case "rtl":
        t.X = n.X + (R.Stage.Width + R.Stage.PageGap) * e.Distance * -1
    }
    return sML.scrollTo(t, {
      ForceScroll: !0,
      Duration: "paged" == S.RVM ? 0 : e.Duration,
      callback: function() {
        R.getCurrent(), R.Moving = !1, e.callback && e.callback(e), E.dispatch("bibi:scrolled-by", e)
      }
    }), !0
  }, R.getBibiToDestination = function(e) {
    if ("number" == typeof e && (e = "" + e), "string" != typeof e || !/^[1-9][0-9]*(-[1-9][0-9]*(\.[1-9][0-9]*)*)?$/.test(e)) return null;
    var t = "",
      n = e.split("-"),
      i = parseInt(n[0]) - 1,
      a = n[1] ? n[1] : null;
    return a && a.split(".").forEach(function(e) {
      t += ">*:nth-child(" + e + ")"
    }), {
      BibitoString: e,
      ItemIndexInAll: i,
      ElementSelector: t ? "body" + t : void 0
    }
  }, I = {}, I.initialize = function() {
    I.createNotifier(), I.createVeil(), E.bind("bibi:readied", function() {
      I.createPanel(), I.createMenu(), I.createHelp(), I.createPoweredBy()
    }), E.bind("bibi:prepared", function() {
      I.createNombre(), I.createSlider(), I.createArrows(), I.createKeyListener(), I.createSwiper(), I.createSpinner()
    })
  }, I.note = function(e, t, n) {
    clearTimeout(I.note.Timer), e ? I.note.Time = "number" == typeof t ? t : O.Busy ? 9999 : 2222 : I.note.Time = 0, I.Notifier && (I.Notifier.Board.innerHTML = "<p" + (n ? ' class="error"' : "") + ">" + e + "</p>", sML.addClass(O.HTML, "notifier-shown"), I.note.Timer = setTimeout(function() {
      sML.removeClass(O.HTML, "notifier-shown")
    }, I.note.Time)), O.Mobile || (O.statusClearer && clearTimeout(O.statusClearer), window.status = "BiB/i: " + e, O.statusClearer = setTimeout(function() {
      window.status = ""
    }, I.note.Time))
  }, I.createNotifier = function() {
    I.Notifier = O.Body.appendChild(sML.create("div", {
      id: "bibi-notifier"
    })), I.Notifier.Board = I.Notifier.appendChild(sML.create("div", {
      id: "bibi-notifier-board"
    })), E.dispatch("bibi:created-notifier")
  }, I.createVeil = function() {
    I.Veil = I.setToggleAction(O.Body.appendChild(sML.create("div", {
      id: "bibi-veil"
    })), {
      onopened: function() {
        sML.addClass(O.HTML, "veil-opened"), sML.removeClass(this, "closed")
      },
      onclosed: function() {
        sML.addClass(this, "closed"), sML.removeClass(O.HTML, "veil-opened")
      }
    }), I.Veil.open(), I.Veil.Cover = I.Veil.appendChild(sML.create("div", {
      id: "bibi-veil-cover"
    })), I.Veil.Cover.Info = I.Veil.Cover.appendChild(sML.create("p", {
      id: "bibi-veil-cover-info"
    }));
    var e = (O.Mobile ? "Tap" : "Click") + " to Open";
    I.Veil.PlayButton = I.Veil.appendChild(sML.create("p", {
      id: "bibi-veil-play",
      title: e,
      innerHTML: '<span class="non-visual">' + e + "</span>",
      play: function(e) {
        e.stopPropagation(), L.play(), E.dispatch("bibi:played:by-button")
      },
      hide: function() {
        this.removeEventListener("click", I.Veil.PlayButton.play), sML.style(this, {
          opacity: 0,
          cursor: "default"
        })
      }
    })), I.Veil.PlayButton.addEventListener("click", I.Veil.PlayButton.play), E.add("bibi:played", function() {
      I.Veil.PlayButton.hide()
    }), E.dispatch("bibi:created-veil")
  }, I.createPanel = function() {
    I.Panel = O.Body.appendChild(sML.create("div", {
      id: "bibi-panel"
    })), I.setToggleAction(I.Panel, {
      onopened: function(e) {
        sML.addClass(O.HTML, "panel-opened"), E.dispatch("bibi:opened-panel")
      },
      onclosed: function(e) {
        sML.removeClass(O.HTML, "panel-opened"), E.dispatch("bibi:closed-panel")
      }
    }), E.add("bibi:commands:open-panel", function(e) {
      I.Panel.open(e)
    }), E.add("bibi:commands:close-panel", function(e) {
      I.Panel.close(e)
    }), E.add("bibi:commands:toggle-panel", function(e) {
      I.Panel.toggle(e)
    }),I.setFeedback(I.Panel, {
      StopPropagation: !0
    }), I.Panel.addTapEventListener("tapped", function() {
      E.dispatch("bibi:commands:toggle-panel")
    }), sML.appendStyleRule("html.page-rtl div#bibi-panel:after", "bottom: " + O.Scrollbars.Height + "px;"), I.Panel.BookInfo = I.Panel.appendChild(sML.create("div", {
      id: "bibi-panel-bookinfo"
    })), I.Panel.BookInfo.Box = I.Panel.BookInfo.appendChild(sML.create("div", {
      id: "bibi-panel-bookinfo-box"
    })), I.Panel.BookInfo.Navigation = I.Panel.BookInfo.Box.appendChild(sML.create("div", {
      id: "bibi-panel-bookinfo-navigation"
    })), I.Panel.BookInfo.Cover = I.Panel.BookInfo.Box.appendChild(sML.create("div", {
      id: "bibi-panel-bookinfo-cover"
    })), I.Panel.BookInfo.Cover.Info = I.Panel.BookInfo.Cover.appendChild(sML.create("p", {
      id: "bibi-panel-bookinfo-cover-info"
    })), I.SubPanels = [], I.createPanel.createShade(), E.dispatch("bibi:created-panel")
  }, I.createPanel.createShade = function() {
    I.Shade = O.Body.appendChild(sML.create("div", {
      id: "bibi-shade",
      open: function() {
        sML.addClass(O.HTML, "shade-opened"), clearTimeout(I.Timer_openShade), clearTimeout(I.Timer_closeShade), I.Timer_openShade = setTimeout(function() {
          sML.addClass(O.HTML, "shade-visible")
        }, 0)
      },
      close: function() {
        sML.removeClass(O.HTML, "shade-visible"), clearTimeout(I.Timer_openShade), clearTimeout(I.Timer_closeShade), I.Timer_closeShade = setTimeout(function() {
          sML.removeClass(O.HTML, "shade-opened")
        }, 150)
      }
    })), I.observeTap(I.Shade, {
      StopPropagation: !0
    }), I.Shade.addTapEventListener("tapped", function() {
      I.SubPanels.forEach(function(e) {
        e.close()
      }), I.Panel.close()
    })
  }, I.createMenu = function() {
    S["use-menubar"] || sML.addClass(O.HTML, "without-menubar"), I.Menu = O.Body.appendChild(sML.create("div", {
      id: "bibi-menu",
      on: {
        click: function(e) {
          e.stopPropagation()
        }
      }
    })), I.Menu.Height = I.Menu.offsetHeight, I.setHoverActions(I.Menu), I.setToggleAction(I.Menu, {
      onopened: function() {
        sML.addClass(O.HTML, "menu-opened"), E.dispatch("bibi:opened-menu")
      },
      onclosed: function() {
        sML.removeClass(O.HTML, "menu-opened"), E.dispatch("bibi:closed-menu")
      }
    }), E.add("bibi:closed-slider", function() {
      I.Menu.close()
    }), E.add("bibi:commands:open-menu", function(e) {
      I.Menu.open(e)
    }), E.add("bibi:commands:close-menu", function(e) {
      I.Menu.close(e)
    }), E.add("bibi:commands:toggle-menu", function(e) {
      I.Menu.toggle(e)
    }), E.add("bibi:scrolls", function() {
      clearTimeout(I.Menu.Timer_cool), I.Menu.Hot || sML.addClass(I.Menu, "hot"), I.Menu.Hot = !0, I.Menu.Timer_cool = setTimeout(function() {
        I.Menu.Hot = !1, sML.removeClass(I.Menu, "hot")
      }, 1234)
    }), O.Mobile || E.add("bibi:moved-pointer", function(e) {
      if (I.isPointerStealth()) return !1;
      var t = O.getBibiEvent(e);
      clearTimeout(I.Menu.Timer_close), t.Coord.Y < 1.5 * I.Menu.offsetHeight ? E.dispatch("bibi:hovers", e, I.Menu) : I.Menu.Hover && (I.Menu.Timer_close = setTimeout(function() {
        E.dispatch("bibi:unhovers", e, I.Menu)
      }, 123))
    }), E.add("bibi:tapped", function(e) {
      if (I.isPointerStealth()) return !1;
      var t = O.getBibiEvent(e);
      if ("horizontal" == S.RVM) {
        if (t.Coord.Y > window.innerHeight - O.Scrollbars.Height) return !1
      } else if ("vertical" == S.RVM && t.Coord.X > window.innerWidth - O.Scrollbars.Width) return !1;
      if (t.Target.tagName) {
        if (/bibi-slider/.test(t.Target.className + t.Target.id)) return !1;
        if (O.isAnchorContent(t.Target)) return !1
      }
      switch (S.ARD) {
        case "ttb":
          return "middle" == t.Division.Y && E.dispatch("bibi:commands:toggle-menu");
        default:
          return "center" == t.Division.X && E.dispatch("bibi:commands:toggle-menu")
      }
    }),I.Menu.L = I.Menu.appendChild(sML.create("div", {
      id: "bibi-menu-l"
    })),I.Menu.R = I.Menu.appendChild(sML.create("div", {
      id: "bibi-menu-r"
    })), sML.appendStyleRule(["html.view-vertical div#bibi-menu"].join(", "), "width: calc(100% - " + O.Scrollbars.Width + "px);"), sML.appendStyleRule(["html.view-vertical.panel-opened div#bibi-menu", "html.view-vertical.subpanel-opened div#bibi-menu"].join(", "), "width: 100%; padding-right: " + O.Scrollbars.Width + "px;"), I.createMenu.createPanelSwitch(), I.createMenu.SettingMenuComponents = [], S["fix-reader-view-mode"] || I.createMenu.SettingMenuComponents.push("ViewModeButtons"), O.WindowEmbedded && I.createMenu.SettingMenuComponents.push("NewWindowButton"), O.FullscreenEnabled && !O.Mobile && I.createMenu.SettingMenuComponents.push("FullscreenButton"), S["website-href"] && /^https?:\/\/[^\/]+/.test(S["website-href"]) && S["website-name-in-menu"] && I.createMenu.SettingMenuComponents.push("WebsiteLink"), S["remove-bibi-website-link"] || I.createMenu.SettingMenuComponents.push("BibiWebsiteLink"), I.createMenu.SettingMenuComponents.length && I.createMenu.createSettingMenu(), E.dispatch("bibi:created-menu")
  }, I.createMenu.createPanelSwitch = function() {
    E.add("bibi:opened-panel", function() {
      I.setUIState(I.PanelSwitch, "active")
    }), E.add("bibi:closed-panel", function() {
      I.setUIState(I.PanelSwitch, "")
    }), E.add("bibi:started", function() {
      sML.style(I.PanelSwitch, {
        display: "block"
      })
    })
  }, I.createMenu.createSettingMenu = function() {
    I.Menu.Config = {}, I.Menu.Config.Button = I.createButtonGroup({
      Area: I.Menu.R,
      Sticky: !0
    }).addButton({
      Type: "toggle",
      Labels: {
        "default": {
          "default": "Setting",
          ja: "設定を変更"
        },
        active: {
          "default": "Close Setting-Menu",
          ja: "設定メニューを閉じる"
        }
      },
      Help: !0,
      Icon: '<span class="bibi-icon bibi-icon-setting"></span>'
    }), I.Menu.Config.SubPanel = I.createSubPanel({
      Opener: I.Menu.Config.Button,
      id: "bibi-subpanel_change-view"
    }), I.createMenu.SettingMenuComponents.includes("ViewModeButtons") && I.createMenu.createSettingMenu.createViewModeSection(), (I.createMenu.SettingMenuComponents.includes("NewWindowButton") || I.createMenu.SettingMenuComponents.includes("FullscreenButton")) && I.createMenu.createSettingMenu.createWindowSection(), (I.createMenu.SettingMenuComponents.includes("WebsiteLink") || I.createMenu.SettingMenuComponents.includes("BibiWebsiteLink")) && I.createMenu.createSettingMenu.createLinkageSection()
  }, I.createMenu.createSettingMenu.createViewModeSection = function() {
    var e = {};
    e.Item = '<span class="bibi-shape bibi-shape-item"></span>', e.Spread = '<span class="bibi-shape bibi-shape-spread">' + e.Item + e.Item + "</span>";
    var t = {};
    t.paged = '<span class="bibi-icon bibi-icon-view-paged"><span class="bibi-shape bibi-shape-spreads bibi-shape-spreads-paged">' + e.Spread + e.Spread + e.Spread + "</span></span>", t.horizontal = '<span class="bibi-icon bibi-icon-view-horizontal"><span class="bibi-shape bibi-shape-spreads bibi-shape-spreads-horizontal">' + e.Spread + e.Spread + e.Spread + "</span></span>", t.vertical = '<span class="bibi-icon bibi-icon-view-vertical"><span class="bibi-shape bibi-shape-spreads bibi-shape-spreads-vertical">' + e.Spread + e.Spread + e.Spread + "</span></span>";
    var n = function() {
      R.changeView(this.Value)
    };
    I.Menu.Config.SubPanel.ViewModeSection = I.Menu.Config.SubPanel.addSection({
      Labels: {
        "default": {
          "default": "Choose Layout",
          ja: "レイアウトを選択"
        }
      },
      ButtonGroup: {
        Buttons: [{
          Type: "radio",
          Labels: {
            "default": {
              "default": '<span class="non-visual-in-label">Layout:</span> Each Page <small>(Flip with ' + (O.Mobile ? "Tap/Swipe" : "Click/Wheel") + ")</small>",
              ja: "ページ単位表示<small>（" + (O.Mobile ? "タップ／スワイプ" : "クリック／ホイール") + "で移動）</small>"
            }
          },
          Notes: !0,
          Icon: t.paged,
          Value: "paged",
          action: n
        }, {
          Type: "radio",
          Labels: {
            "default": {
              "default": '<span class="non-visual-in-label">Layout:</span> All Pages <small>(Horizontal Scroll)</small>',
              ja: "全ページ表示<small>（横スクロール移動）</small>"
            }
          },
          Notes: !0,
          Icon: t.horizontal,
          Value: "horizontal",
          action: n
        }, {
          Type: "radio",
          Labels: {
            "default": {
              "default": '<span class="non-visual-in-label">Layout:</span> All Pages <small>(Vertical Scroll)</small>',
              ja: "全ページ表示<small>（縦スクロール移動）</small>"
            }
          },
          Notes: !0,
          Icon: t.vertical,
          Value: "vertical",
          action: n
        }]
      }
    }), E.add("bibi:updated-settings", function() {
      I.Menu.Config.SubPanel.ViewModeSection.ButtonGroup.Buttons.forEach(function(e) {
        I.setUIState(e, e.Value == S.RVM ? "active" : "default")
      })
    })
  }, I.createMenu.createSettingMenu.createWindowSection = function() {
    var e = [];
    I.createMenu.SettingMenuComponents.includes("NewWindowButton") && e.push({
      Type: "link",
      Labels: {
        "default": {
          "default": "Open in New Window",
          ja: "あたらしいウィンドウで開く"
        }
      },
      Icon: '<span class="bibi-icon bibi-icon-open-newwindow"></span>',
      href: O.RequestedURL,
      target: "_blank"
    }), I.createMenu.SettingMenuComponents.includes("FullscreenButton") && e.push({
      Type: "toggle",
      Labels: {
        "default": {
          "default": "Enter Fullscreen",
          ja: "フルスクリーンモード"
        },
        active: {
          "default": "Exit Fullscreen",
          ja: "フルスクリーンモード解除"
        }
      },
      Icon: '<span class="bibi-icon bibi-icon-toggle-fullscreen"></span>',
      action: function() {
        O.FullscreenElement.Fullscreen ? sML.exitFullscreen(O.FullscreenDocument) : sML.requestFullscreen(O.FullscreenElement), O.FullscreenElement.Fullscreen ? (O.FullscreenElement.Fullscreen = !1, E.dispatch("bibi:exited-fullscreen"), sML.removeClass(O.HTML, "fullscreen")) : (O.FullscreenElement.Fullscreen = !0, E.dispatch("bibi:requested-fullscreen"), sML.addClass(O.HTML, "fullscreen"))
      }
    }), I.Menu.Config.SubPanel.WindowSection = I.Menu.Config.SubPanel.addSection({
      Labels: {
        "default": {
          "default": "Window Operation",
          ja: "ウィンドウ操作"
        }
      },
      ButtonGroup: {
        Buttons: e
      }
    })
  }, I.createMenu.createSettingMenu.createLinkageSection = function() {
    var e = [];
    I.createMenu.SettingMenuComponents.includes("WebsiteLink") && e.push({
      Type: "link",
      Labels: {
        "default": {
          "default": S["website-name-in-menu"].replace(/&/gi, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;")
        }
      },
      Icon: '<span class="bibi-icon bibi-icon-open-newwindow"></span>',
      href: S["website-href"],
      target: "_blank"
    })},I.createButtonGroup = function(e) {
    if (!e || "object" != typeof e || !e.Area || !e.Area.tagName) return null;
    "string" == typeof e.className && e.className || delete e.className, "string" == typeof e.id && e.id || delete e.id;
    var t = ["bibi-buttongroup"];
    e.Tiled && t.push("bibi-buttongroup-tiled"), e.Sticky && t.push("sticky"), e.className = t.join(" "), e.IsButtonGroup = !0;
    var n = e.Area.appendChild(sML.create("ul", e));
    return n.addButton = I.createButtonGroup.addButton, n.Buttons instanceof Array && n.Buttons.forEach(function(e, t) {
      n.addButton(e, t)
    }), n
  }, I.createButtonGroup.addButton = function(e, t) {
    if (!e || "object" != typeof e) return null;
    if (e.ButtonGroup || (e.ButtonGroup = this), !e.ButtonGroup.IsButtonGroup) return null;
    "string" == typeof e.className && e.className || delete e.className, "string" == typeof e.id && e.id || delete e.id, e.Type = "string" == typeof e.Type && /^(normal|toggle|radio|link)$/.test(e.Type) ? e.Type : "normal", e.className = "bibi-button bibi-button-" + e.Type + (e.className ? " " + e.className : ""), "undefined" == typeof e.Icon || e.Icon.tagName || ("string" == typeof e.Icon && e.Icon ? e.Icon = sML.hatch(e.Icon) : delete e.Icon), e.IsBibiButton = !0;
    var n = e.ButtonGroup.appendChild(sML.create("li", {
      className: "bibi-buttonbox bibi-buttonbox-" + e.Type
    })).appendChild(sML.create("string" == typeof e.href ? "a" : "span", e));
    return n.Icon && (n.IconBox = n.appendChild(sML.create("span", {
      className: "bibi-button-iconbox"
    })), n.IconBox.appendChild(n.Icon), n.Icon = n.IconBox.firstChild, n.IconBox.Button = n.Icon.Button = n), n.Label = n.appendChild(sML.create("span", {
      className: "bibi-button-label"
    })), I.setFeedback(n, {
      Help: e.Help,
      StopPropagation: !0,
      PreventDefault: !n.href
    }), n.ButtonGroup.Busy = !1, n.Busy = !1, n.isAvailable = function() {
      return !n.Busy && !n.ButtonGroup.Busy
    }, "function" == typeof n.execute && (n.action = n.execute), "function" == typeof n.action && n.addTapEventListener("tapped", function(e) {
      return !!n.isAvailable() && void n.action.apply(n, arguments)
    }), n.ButtonGroup.Buttons instanceof Array || (n.ButtonGroup.Buttons = []), "number" == typeof t ? n.ButtonGroup.Buttons[t] = n : n.ButtonGroup.Buttons.push(n), n
  }, I.createSubPanel = function(e) {
    e || (e = {}), "string" == typeof e.className && e.className || delete e.className, "string" == typeof e.id && e.id || delete e.id, e.className = "bibi-subpanel" + (e.className ? " " + e.className : ""), e.Sections = [];
    var t = O.Body.appendChild(sML.create("div", e));
    return t.addEventListener(O.pointerdown, function(e) {
      e.stopPropagation()
    }), t.addEventListener(O.pointerup, function(e) {
      e.stopPropagation()
    }), I.setToggleAction(t, {
      onopened: function(n) {
        I.SubPanels.forEach(function(e) {
          e != t && e.close({
            ForAnotherSubPanel: !0
          })
        }), sML.addClass(this, "opened"), sML.addClass(O.HTML, "subpanel-opened"), I.Shade.open(), t.Opener && (t.Bit.adjust(t.Opener), I.setUIState(t.Opener, "active")), e.onopened && e.onopened.apply(t, arguments)
      },
      onclosed: function(n) {
        sML.removeClass(this, "opened"), n && n.ForAnotherSubPanel || (sML.removeClass(O.HTML, "subpanel-opened"), I.Shade.close()), t.Opener && I.setUIState(t.Opener, "default"), e.onclosed && e.onclosed.apply(t, arguments)
      }
    }), t.Opener && t.Opener.addTapEventListener("tapped", function() {
      t.toggle()
    }), E.add("bibi:opened-panel", function() {
      t.close()
    }), E.add("bibi:closed-panel", function() {
      t.close()
    }), t.Bit = t.appendChild(sML.create("span", {
      className: "bibi-subpanel-bit",
      SubPanel: t,
      adjust: function(e) {
        if (e) {
          var t = O.getElementCoord(e).X + e.offsetWidth / 2 - O.getElementCoord(this.SubPanel).X;
          sML.style(this.SubPanel, {
            transformOrigin: t + "px 0"
          }), sML.style(this.SubPanel.Bit, {
            left: t + "px"
          })
        }
      }
    })), I.SubPanels.push(t), t.addSection = I.createSubPanel.addSection, t
  }, I.createSubPanel.addSection = function(e) {
    e || (e = {}), e.className = "bibi-subpanel-section";
    var t = sML.create("div", e);
    return t.Labels && (t.Labels = I.distillLabels(t.Labels), t.appendChild(sML.create("div", {
      className: "bibi-hgroup"
    })).appendChild(sML.create("p", {
      className: "bibi-h"
    })).appendChild(sML.create("span", {
      className: "bibi-h-label",
      innerHTML: t.Labels["default"][O.Language]
    }))), t.Notes && t.Notes.forEach(function(e) {
      if (e.Position && "before" != e.Position) {
        if ("after" == e.Position) {
          t.PGroup_After || (t.PGroup_After = sML.create("div", {
            className: "bibi-pgroup bibi-pgroup_after"
          }));
          var n = t.PGroup_After
        }
      } else {
        t.PGroup_Before || (t.PGroup_Before = sML.create("div", {
          className: "bibi-pgroup bibi-pgroup_before"
        }));
        var n = t.PGroup_Before
      }
      e = I.distillLabels(e), n.appendChild(sML.create("p", {
        className: "bibi-p",
        innerHTML: e["default"][O.Language]
      }))
    }), t.PGroup_Before && t.appendChild(t.PGroup_Before), t.addButtonGroup = I.createSubPanel.addSection.addButtonGroup, t.ButtonGroup && t.addButtonGroup(t.ButtonGroup), this.appendChild(t), this.Sections.push(t), t.PGroup_After && t.appendChild(t.PGroup_After), t
  }, I.createSubPanel.addSection.addButtonGroup = function(e) {
    if (e) return e.Area = this, this.ButtonGroup = I.createButtonGroup(e), this.ButtonGroup
  }, I.createHelp = function() {
    I.Help = O.Body.appendChild(sML.create("div", {
      id: "bibi-help"
    })), I.Help.Message = I.Help.appendChild(sML.create("p", {
      className: "hidden",
      id: "bibi-help-message"
    })), I.Help.show = function(e) {
      clearTimeout(I.Help.Timer_deactivate1), clearTimeout(I.Help.Timer_deactivate2), sML.addClass(I.Help, "active"), I.Help.Message.innerHTML = e, setTimeout(function() {
        sML.addClass(I.Help, "shown")
      }, 0)
    }, I.Help.hide = function() {
      I.Help.Timer_deactivate1 = setTimeout(function() {
        sML.removeClass(I.Help, "shown"), I.Help.Timer_deactivate2 = setTimeout(function() {
          sML.removeClass(I.Help, "active")
        }, 200)
      }, 100)
    }, sML.appendStyleRule(["html.view-paged div#bibi-help", "html.view-horizontal div#bibi-help", "html.page-rtl.panel-opened div#bibi-help"].join(", "), "bottom: " + O.Scrollbars.Height + "px;")
  }, I.createPoweredBy = function() {
    I.PoweredBy = O.Body.appendChild(sML.create("div", {
      id: "bibi-poweredby",
      innerHTML: ["<p>", '<a href="' + Bibi.href + '" target="_blank" title="BiB/i | Official Website">', "<span>BiB/i</span>", '<img class="bibi-logo-white" alt="" src="' + O.RootPath + 'res/images/bibi-logo_white.png" />', '<img class="bibi-logo-black" alt="" src="' + O.RootPath + 'res/images/bibi-logo_black.png" />', "</a>", "</p>"].join("")
    })), sML.appendStyleRule(["html.view-paged div#bibi-poweredby", "html.view-horizontal div#bibi-poweredby", "html.page-rtl.panel-opened div#bibi-poweredby"].join(", "), "bottom: " + O.Scrollbars.Height + "px;")
  }, I.createNombre = function() {
    S["use-nombre"] && (I.Nombre = O.Body.appendChild(sML.create("div", {
      id: "bibi-nombre",
      show: function() {
        clearTimeout(I.Nombre.Timer_hot), clearTimeout(I.Nombre.Timer_vanish), sML.addClass(I.Nombre, "active"), I.Nombre.Timer_hot = setTimeout(function() {
          sML.addClass(I.Nombre, "hot")
        }, 10)
      },
      hide: function() {
        clearTimeout(I.Nombre.Timer_hot), clearTimeout(I.Nombre.Timer_vanish), sML.removeClass(I.Nombre, "hot"), I.Nombre.Timer_vanish = setTimeout(function() {
          sML.removeClass(I.Nombre, "active")
        }, 255)
      },
      progress: function(e) {
        clearTimeout(I.Nombre.Timer_hide), e && e.Pages || (e = R.getCurrent()), "number" != typeof e.Percent && (e.Percent = Math.floor((e.Pages.EndPage.PageIndex + 1) / R.Pages.length * 100)), R.Current.Page && (I.Nombre.Current.innerHTML = function() {
          var t = e.Pages.StartPage.PageIndex + 1;
          return e.Pages.StartPage != e.Pages.EndPage && (t += '<span class="delimiter">-</span>' + (e.Pages.EndPage.PageIndex + 1)), t
        }(), I.Nombre.Delimiter.innerHTML = "/", I.Nombre.Total.innerHTML = R.Pages.length, I.Nombre.Percent.innerHTML = "(" + e.Percent + '<span class="unit">%</span>)', I.Nombre.show(), I.Nombre.Timer_hide = setTimeout(I.Nombre.hide, 1234))
      }
    })), I.Nombre.Current = I.Nombre.appendChild(sML.create("span", {
      id: "bibi-nombre-current"
    })), I.Nombre.Delimiter = I.Nombre.appendChild(sML.create("span", {
      id: "bibi-nombre-delimiter"
    })), I.Nombre.Total = I.Nombre.appendChild(sML.create("span", {
      id: "bibi-nombre-total"
    })), I.Nombre.Percent = I.Nombre.appendChild(sML.create("span", {
      id: "bibi-nombre-percent"
    })), E.add("bibi:scrolls", I.Nombre.progress), E.add("bibi:resized", I.Nombre.progress), E.add("bibi:opened", function() {
      setTimeout(I.Nombre.progress, 321)
    }), S["use-slider"] && sML.appendStyleRule("html.view-paged div#bibi-nombre", "bottom: " + (O.Scrollbars.Height + 2) + "px;"), sML.appendStyleRule("html.view-horizontal div#bibi-nombre", "bottom: " + (O.Scrollbars.Height + 2) + "px;"), sML.appendStyleRule("html.view-vertical div#bibi-nombre", "right: " + (O.Scrollbars.Height + 2) + "px;"), E.dispatch("bibi:created-nombre"))
  }, I.createSlider = function() {
    S["use-slider"] && (I.Slider = O.Body.appendChild(sML.create("div", {
      id: "bibi-slider",
      reset: function() {
        "ttb" == S.ARD ? (I.Slider.SIZE = {
          L: "Height",
          l: "height"
        }, I.Slider.AXIS = {
          b: "top",
          OB: "Top",
          ob: "top",
          XY: "Y"
        }) : "rtl" == S.ARD ? (I.Slider.SIZE = {
          L: "Width",
          l: "width"
        }, I.Slider.AXIS = {
          b: "right",
          OB: "Left",
          ob: "left",
          XY: "X"
        }) : (I.Slider.SIZE = {
          L: "Width",
          l: "width"
        }, I.Slider.AXIS = {
          b: "left",
          OB: "Left",
          ob: "left",
          XY: "X"
        }), I.Slider.Spreads.innerHTML = "", I.Slider.Pages.innerHTML = "", R.Spreads.forEach(function(e, t) {
          var n = I.Slider.Spreads.appendChild(sML.create("div", {
            id: "bibi-slider-spreadbit-" + (t + 1)
          }));
          n.style[I.Slider.SIZE.l] = 1 / R.Pages.length * e.Pages.length * 100 + "%", n.style[I.Slider.AXIS.b] = 100 / R.Pages.length * e.Pages[0].PageIndex + "%"
        }), R.Pages.forEach(function(e, t) {
          var n = I.Slider.Pages.appendChild(sML.create("div", {
            id: "bibi-slider-pagebit-" + (t + 1)
          }));
          n.style[I.Slider.SIZE.l] = 1 / R.Pages.length * 100 + "%", n.style[I.Slider.AXIS.b] = 100 / R.Pages.length * t + "%", n.PageNumber = t + 1, I.Nombre && (n.addEventListener(O.pointerover, function() {
            I.Slider.Sliding || (clearTimeout(I.Slider.Timer_PageBitPointerOut), I.Nombre.progress({
              Pages: {
                StartPage: R.Pages[t],
                EndPage: R.Pages[t]
              }
            }))
          }), n.addEventListener(O.pointerout, function() {
            I.Slider.Sliding || (I.Slider.Timer_PageBitPointerOut = setTimeout(function() {
              clearTimeout(I.Nombre.Timer_hide), I.Nombre.hide()
            }, 200))
          })), n.Labels = {
            "default": {
              "default": "Slider Page"
            }
          }, I.setFeedback(n)
        })
      },
      progress: function() {
        if (!I.Slider.Sliding) {
          var e = I.Slider.Current;
          e.style.top = e.style.right = e.style.bottom = e.style.left = e.style.width = e.style.height = "", e.className = R.Current.Pages.length > 1 ? "two-pages" : "", "paged" == S.RVM || "active" == I.Slider.UIState ? (e.style[I.Slider.SIZE.l] = 100 / R.Pages.length * R.Current.Pages.length + "%", e.style[I.Slider.AXIS.b] = R.Current.Pages.StartPage.PageIndex / R.Pages.length * 100 + "%") : (e.style[I.Slider.SIZE.l] = R.Main["offset" + I.Slider.SIZE.L] / R.Main["scroll" + I.Slider.SIZE.L] * 100 + "%", e.style[I.Slider.AXIS.ob] = R.Main["scroll" + I.Slider.AXIS.OB] / R.Main["scroll" + I.Slider.SIZE.L] * 100 + "%")
        }
      },
      flip: function() {
        var e = I.Slider.Status.CurrentCoord - I.Slider.Status.StartCoord,
          t = I.Slider.Status.StartPageIndex + Math.round(R.Pages.length * (e / I.Slider["offset" + I.Slider.SIZE.L] * ("ttb" != S.ARD && "rtl" == S.PPD ? -1 : 1)));
        t < 0 ? t = 0 : t > R.Pages.length - 1 && (t = R.Pages.length - 1);
        var n = R.Pages[t];
        n != R.Current.Pages.StartPage && n != R.Current.Pages.EndPage && E.dispatch("bibi:commands:focus-on", {
          Destination: n,
          Duration: 0
        }), I.Slider.Sliding ? sML.style(I.Slider.Current, {
          transform: "translate" + I.Slider.AXIS.XY + "(" + e + "px)"
        }) : (sML.style(I.Slider.Current, {
          transform: ""
        }), I.Slider.progress())
      },
      slide: function(e) {
        var t = [I.Slider["offset" + I.Slider.AXIS.OB], I.Slider["offset" + I.Slider.AXIS.OB] + I.Slider["offset" + I.Slider.SIZE.L]],
          n = O.getBibiEventCoord(e)[I.Slider.AXIS.XY];
        n < t[0] ? n = t[0] : n > t[1] && (n = t[1]), I.Slider.Status.CurrentCoord = n, I.Slider.flip()
      },
      startSliding: function(e) {
        e.target && e.target.id && /^bibi-slider-/.test(e.target.id) && (e.preventDefault(), I.Slider.Sliding = !0, I.Slider.Status = {
          StartPageIndex: R.Current.Pages.StartPage.PageIndex,
          StartCoord: e.target == I.Slider.Current ? O.getBibiEventCoord(e)[I.Slider.AXIS.XY] : I.Slider["offset" + I.Slider.AXIS.OB] + I.Slider.Current["offset" + I.Slider.AXIS.OB] + I.Slider.Current["offset" + I.Slider.SIZE.L] / 2
        }, I.Slider.Status.CurrentCoord = I.Slider.Status.StartCoord, clearTimeout(I.Slider.Timer_endSliding), sML.addClass(O.HTML, "slider-sliding"), E.add("bibi:moved-pointer", I.Slider.slide))
      },
      endSliding: function(e) {
        I.Slider.Sliding && (I.Slider.Sliding = !1, E.remove("bibi:moved-pointer", I.Slider.slide), I.Slider.Status.CurrentCoord = O.getBibiEventCoord(e)[I.Slider.AXIS.XY], I.Slider.flip(), I.Slider.Timer_endSliding = setTimeout(function() {
          sML.removeClass(O.HTML, "slider-sliding")
        }, 125))
      },
      activate: function() {
        I.Nombre && (I.Slider.Current.addEventListener(O.pointerover, I.Nombre.show), I.Slider.Current.addEventListener(O.pointerout, I.Nombre.hide)), O.HTML.addEventListener(O.pointerdown, I.Slider.startSliding), R.Items.concat(O).forEach(function(e) {
          e.HTML.addEventListener(O.pointerup, I.Slider.endSliding)
        }), E.add("bibi:scrolls", I.Slider.progress), I.Slider.progress()
      },
      deactivate: function() {
        I.Nombre && (I.Slider.Current.removeEventListener(O.pointerover, I.Nombre.show), I.Slider.Current.removeEventListener(O.pointerout, I.Nombre.hide)), O.HTML.removeEventListener(O.pointerdown, I.Slider.startSliding), R.Items.concat(O).forEach(function(e) {
          e.HTML.removeEventListener(O.pointerup, I.Slider.endSliding)
        }), E.remove("bibi:scrolls", I.Slider.progress)
      }
    })), I.Slider.Spreads = I.Slider.appendChild(sML.create("div", {
      id: "bibi-slider-spreads"
    })), I.Slider.Pages = I.Slider.appendChild(sML.create("div", {
      id: "bibi-slider-pages"
    })), I.Slider.CurrentPages = I.Slider.appendChild(sML.create("div", {
      id: "bibi-slider-currentpages"
    })), I.Slider.Current = I.Slider.CurrentPages.appendChild(sML.create("div", {
      id: "bibi-slider-currentpagebits"
    })), I.Slider.Current.Labels = {
      "default": {
        "default": "Slider Current"
      }
    }, I.setFeedback(I.Slider.Current), I.setToggleAction(I.Slider, {
      onopened: function() {
        I.Slider.progress(), sML.addClass(O.HTML, "slider-opened"), E.dispatch("bibi:opened-slider")
      },
      onclosed: function() {
        I.Slider.progress(), sML.removeClass(O.HTML, "slider-opened"), E.dispatch("bibi:closed-slider")
      }
    }), E.add("bibi:commands:open-slider", function(e) {
      I.Slider.open(e)
    }), E.add("bibi:commands:close-slider", function(e) {
      I.Slider.close(e)
    }), E.add("bibi:commands:toggle-slider", function(e) {
      I.Slider.toggle(e)
    }), E.add("bibi:tapped", function(e) {
      if (!L.Opened) return !1;
      if (I.isPointerStealth()) return !1;
      var t = O.getBibiEvent(e);
      if (t.Target.tagName) {
        if (/bibi-slider/.test(t.Target.id)) return !1;
        if (O.isAnchorContent(t.Target)) return !1;
        if ("horizontal" == S.RVM && t.Coord.Y > window.innerHeight - O.Scrollbars.Height) return !1
      }
      switch (S.ARD) {
        case "ttb":
          return "middle" == t.Division.Y && E.dispatch("bibi:commands:toggle-slider");
        default:
          return "center" == t.Division.X && E.dispatch("bibi:commands:toggle-slider")
      }
    }), E.add("bibi:opened", I.Slider.activate), E.add("bibi:laid-out", I.Slider.reset), E.add("bibi:closed-panel", I.Slider.close), sML.appendStyleRule(["html.view-paged div#bibi-slider", "html.view-horizontal div#bibi-slider"].join(", "), "height: " + O.Scrollbars.Height + "px;"), sML.appendStyleRule(["html.view-vertical div#bibi-slider"].join(", "), "width: " + O.Scrollbars.Width + "px;"), E.dispatch("bibi:created-slider"))
  }, I.createArrows = function() {
    S["use-arrows"] && (I.Arrows = {
      update: function() {
        "vertical" == S.RVM ? (I.Arrows.top = I.Arrows.Back, I.Arrows.bottom = I.Arrows.Forward, I.Arrows.left = I.Arrows.right = void 0) : ("ltr" == S.PPD ? (I.Arrows.left = I.Arrows.Back, I.Arrows.right = I.Arrows.Forward) : (I.Arrows.right = I.Arrows.Back, I.Arrows.left = I.Arrows.Forward), I.Arrows.top = I.Arrows.bottom = void 0)
      },
      navigate: function() {
        setTimeout(function() {
          R.getCurrent(), [I.Arrows.Back, I.Arrows.Forward].forEach(function(e) {
            e.isAvailable() && sML.addClass(e, "glowing")
          }), setTimeout(function() {
            [I.Arrows.Back, I.Arrows.Forward].forEach(function(e) {
              sML.removeClass(e, "glowing")
            })
          }, 1234)
        }, 400)
      },
      check: function() {
        [I.Arrows.Back, I.Arrows.Forward].forEach(function(e) {
          e.isAvailable() ? sML.replaceClass(e, "unavailable", "available") : sML.replaceClass(e, "available", "unavailable")
        })
      },
      areAvailable: function(e) {
        if (!L.Opened) return !1;
        if (I.Panel && "active" == I.Panel.UIState) return !1;
        if (I.Menu && e.Coord.Y < 1.5 * I.Menu.offsetHeight) return !1;
        if ("vertical" == S.RVM) {
          if (e.Coord.X > window.innerWidth - O.Scrollbars.Width) return !1
        } else if ("horizontal" == S.RVM) {
          if (e.Coord.Y > window.innerHeight - O.Scrollbars.Height) return !1
        } else if (I.Slider && e.Coord.Y > window.innerHeight - I.Slider.offsetHeight) return !1;
        return e.Target.ownerDocument.documentElement != O.HTML ? !O.isAnchorContent(e.Target) : e.Target == O.HTML || e.Target == O.Body || (!!/^(bibi-main|bibi-arrow|bibi-help|bibi-poweredby)/.test(e.Target.id) || !!/^(spread|item)/.test(e.Target.className))
      }
    }, sML.addClass(O.HTML, "arrows-active"), I.Arrows.Back = I.Arrows.back = O.Body.appendChild(sML.create("div", {
      id: "bibi-arrow-back",
      Distance: -1,
      Labels: {
        "default": {
          "default": "Back",
          ja: "戻る"
        }
      },
      isAvailable: function() {
        return L.Opened && (R.Current.Pages.StartPage != R.Pages[0] || 100 != R.Current.Pages.StartPageRatio)
      }
    })), I.Arrows.Forward = I.Arrows.forward = O.Body.appendChild(sML.create("div", {
      id: "bibi-arrow-forward",
      Distance: 1,
      Labels: {
        "default": {
          "default": "Forward",
          ja: "進む"
        }
      },
      isAvailable: function() {
        return L.Opened && (R.Current.Pages.EndPage != R.Pages[R.Pages.length - 1] || 100 != R.Current.Pages.EndPageRatio)
      }
    })), I.Arrows.Back.Pair = I.Arrows.Forward, I.Arrows.Forward.Pair = I.Arrows.Back, [I.Arrows.Back, I.Arrows.Forward].forEach(function(e) {
      I.setFeedback(e), e.addTapEventListener("tap", function(t) {
        L.Opened && E.dispatch("bibi:commands:move-by", {
          Distance: e.Distance
        })
      }), e.showHelp = e.hideHelp = function() {}
    }), O.Mobile || (E.add("bibi:moved-pointer", function(e) {
      if (!L.Opened) return !1;
      if (I.isPointerStealth()) return !1;
      var t = O.getBibiEvent(e);
      if (I.Arrows.areAvailable(t)) {
        var n = "vertical" == S.RVM ? t.Division.Y : t.Division.X;
        if (I.Arrows[n] && I.Arrows[n].isAvailable()) return E.dispatch("bibi:hovers", e, I.Arrows[n]), E.dispatch("bibi:unhovers", e, I.Arrows[n].Pair), void t.Target.ownerDocument.documentElement.setAttribute("data-bibi-cursor", n)
      }
      E.dispatch("bibi:unhovers", e, I.Arrows.Back), E.dispatch("bibi:unhovers", e, I.Arrows.Forward), R.Items.concat(O).forEach(function(e) {
        e.HTML.removeAttribute("data-bibi-cursor")
      })
    }), E.add("bibi:opened", function() {
      R.Items.concat(O).forEach(function(e) {
        sML.each(e.Body.querySelectorAll("img"), function() {
          this.addEventListener(O.pointerdown, O.preventDefault)
        })
      })
    })), E.add("bibi:tapped", function(e) {
      if (!L.Opened) return !1;
      if (I.isPointerStealth()) return !1;
      var t = O.getBibiEvent(e);
      if (/^bibi-arrow-/.test(t.Target.id)) return !1;
      if (!I.Arrows.areAvailable(t)) return !1;
      var n = "vertical" == S.RVM ? t.Division.Y : t.Division.X;
      I.Arrows[n] && I.Arrows[n].isAvailable() && (E.dispatch("bibi:taps", e, I.Arrows[n]), E.dispatch("bibi:tapped", e, I.Arrows[n]))
    }), E.add("bibi:commands:move-by", function(e) {
      if (!L.Opened) return !1;
      if (!e || !e.Distance) return !1;
      var t = "";
      switch (e.Distance) {
        case -1:
          t = "back";
          break;
        case 1:
          t = "forward"
      }
      return t && I.Arrows[t] ? E.dispatch("bibi:tapped", null, I.Arrows[t]) : void 0
    }), E.add("bibi:loaded-item", function(e) {
      sML.appendStyleRule("html[data-bibi-cursor]", "cursor: pointer;", e.contentDocument)
    }), E.add("bibi:opened", function() {
      I.Arrows.update(), I.Arrows.check(), I.Arrows.navigate()
    }), E.add("bibi:updated-settings", function() {
      I.Arrows.update()
    }), E.add("bibi:changed-view", function() {
      I.Arrows.navigate()
    }), E.add("bibi:scrolled", function() {
      I.Arrows.check()
    }), E.dispatch("bibi:created-arrows"))
  }, I.createKeyListener = function() {
    S["use-keys"] && (I.KeyListener = {
      ActiveKeys: {},
      KeyCodes: {
        keydown: {},
        keyup: {},
        keypress: {}
      },
      updateKeyCodes: function(e, t) {
        "function" != typeof e.join && (e = [e]), "function" == typeof t && (t = t()), e.forEach(function(e) {
          I.KeyListener.KeyCodes[e] = sML.edit(I.KeyListener.KeyCodes[e], t)
        })
      },
      MovingParameters: {
        Space: 1,
        "Page Up": -1,
        "Page Down": 1,
        End: "foot",
        Home: "head",
        SPACE: -1,
        "PAGE UP": "head",
        "PAGE DOWN": "foot",
        END: "foot",
        HOME: "head"
      },
      updateMovingParameters: function() {
        switch (S.ARD) {
          case "ttb":
            return sML.edit(I.KeyListener.MovingParameters, {
              "Up Arrow": -1,
              "Right Arrow": 0,
              "Down Arrow": 1,
              "Left Arrow": 0,
              "UP ARROW": "head",
              "RIGHT ARROW": "",
              "DOWN ARROW": "foot",
              "LEFT ARROW": ""
            });
          case "ltr":
            return sML.edit(I.KeyListener.MovingParameters, {
              "Up Arrow": 0,
              "Right Arrow": 1,
              "Down Arrow": 0,
              "Left Arrow": -1,
              "UP ARROW": "",
              "RIGHT ARROW": "foot",
              "DOWN ARROW": "",
              "LEFT ARROW": "head"
            });
          case "rtl":
            return sML.edit(I.KeyListener.MovingParameters, {
              "Up Arrow": 0,
              "Right Arrow": -1,
              "Down Arrow": 0,
              "Left Arrow": 1,
              "UP ARROW": "",
              "RIGHT ARROW": "head",
              "DOWN ARROW": "",
              "LEFT ARROW": "foot"
            });
          default:
            return sML.edit(I.KeyListener.MovingParameters, {
              "Up Arrow": 0,
              "Right Arrow": 0,
              "Down Arrow": 0,
              "Left Arrow": 0,
              "UP ARROW": "",
              "RIGHT ARROW": "",
              "DOWN ARROW": "",
              "LEFT ARROW": ""
            })
        }
      },
      getBibiKeyName: function(e) {
        var t = I.KeyListener.KeyCodes[e.type][e.keyCode];
        return t ? t : ""
      },
      onEvent: function(e) {
        return !!L.Opened && (e.BibiKeyName = I.KeyListener.getBibiKeyName(e), e.BibiModifierKeys = [], e.shiftKey && e.BibiModifierKeys.push("Shift"), e.ctrlKey && e.BibiModifierKeys.push("Control"), e.altKey && e.BibiModifierKeys.push("Alt"), e.metaKey && e.BibiModifierKeys.push("Meta"), e.BibiKeyName && e.preventDefault(), !0)
      },
      onkeydown: function(e) {
        return !!I.KeyListener.onEvent(e) && (e.BibiKeyName && (I.KeyListener.ActiveKeys[e.BibiKeyName] ? E.dispatch("bibi:is-holding-key", e) : I.KeyListener.ActiveKeys[e.BibiKeyName] = Date.now()), void E.dispatch("bibi:downs-key", e))
      },
      onkeyup: function(e) {
        return !!I.KeyListener.onEvent(e) && (I.KeyListener.ActiveKeys[e.BibiKeyName] && Date.now() - I.KeyListener.ActiveKeys[e.BibiKeyName] < 300 && (E.dispatch("bibi:touches-key", e), E.dispatch("bibi:touched-key", e)), e.BibiKeyName && I.KeyListener.ActiveKeys[e.BibiKeyName] && delete I.KeyListener.ActiveKeys[e.BibiKeyName], void E.dispatch("bibi:ups-key", e))
      },
      onkeypress: function(e) {
        return !!I.KeyListener.onEvent(e) && void E.dispatch("bibi:presses-key", e)
      },
      observe: function() {
        [O].concat(R.Items).forEach(function(e) {
          ["keydown", "keyup", "keypress"].forEach(function(t) {
            e.contentDocument.addEventListener(t, I.KeyListener["on" + t], !1)
          })
        })
      },
      tryMoving: function(e) {
        if (!e.BibiKeyName) return !1;
        var t = I.KeyListener.MovingParameters[e.shiftKey ? e.BibiKeyName.toUpperCase() : e.BibiKeyName];
        return !!t && (e.preventDefault(), void("number" == typeof t ? E.dispatch("bibi:commands:move-by", {
          Distance: t
        }) : "string" == typeof t && E.dispatch("bibi:commands:focus-on", {
          Destination: t
        })))
      }
    }, I.KeyListener.updateKeyCodes(["keydown", "keyup", "keypress"], {
      32: "Space"
    }), I.KeyListener.updateKeyCodes(["keydown", "keyup"], {
      33: "Page Up",
      34: "Page Down",
      35: "End",
      36: "Home",
      37: "Left Arrow",
      38: "Up Arrow",
      39: "Right Arrow",
      40: "Down Arrow"
    }), E.add("bibi:updated-settings", function() {
      I.KeyListener.updateMovingParameters()
    }), E.add("bibi:opened", function() {
      I.KeyListener.updateMovingParameters(), I.KeyListener.observe()
    }), E.add("bibi:touched-key", function(e) {
      I.KeyListener.tryMoving(e)
    }), E.dispatch("bibi:created-keylistener"))
  }, I.createSwiper = function() {
    S["use-swipe"] && (I.Swiper = {
      update: function() {
        return "paged" == S.RVM ? this.open() : this.close(), this.State
      },
      activateElement: function(e) {
        e.addEventListener("touchstart", I.Swiper.ontouchstart), e.addEventListener("touchmove", I.Swiper.ontouchmove), e.addEventListener("touchend", I.Swiper.ontouchend), O.Mobile || (e.addEventListener("wheel", R.onwheel), sML.each(e.querySelectorAll("img"), function() {
          this.addEventListener(O.pointerdown, O.preventDefault)
        }))
      },
      deactivateElement: function(e) {
        e.removeEventListener("touchstart", I.Swiper.ontouchstart), e.removeEventListener("touchmove", I.Swiper.ontouchmove), e.removeEventListener("touchend", I.Swiper.ontouchend), O.Mobile || (e.removeEventListener("wheel", R.onwheel), sML.each(e.querySelectorAll("img"), function() {
          this.removeEventListener(O.pointerdown, O.preventDefault)
        }))
      },
      ontouchstart: function(e) {
        var t = O.getBibiEventCoord(e);
        I.Swiper.TouchStartedOn = {
          X: t.X,
          Y: t.Y,
          T: e.timeStamp
        }
      },
      ontouchmove: function(e) {
        1 == e.touches.length && document.body.clientWidth / window.innerWidth <= 1 && e.preventDefault()
      },
      ontouchend: function(e) {
        if (I.Swiper.TouchStartedOn) {
          if (document.body.clientWidth / window.innerWidth <= 1 && e.timeStamp - I.Swiper.TouchStartedOn.T <= 300) {
            var t = O.getBibiEventCoord(e),
              n = t.X - I.Swiper.TouchStartedOn.X,
              i = t.Y - I.Swiper.TouchStartedOn.Y;
            if (Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2)) >= 10) {
              var a = 180 * Math.atan2(i ? i * -1 : 0, n) / Math.PI,
                o = "",
                r = "";
              120 >= a && a >= 60 ? (o = "bottom", r = "top") : 30 >= a && a >= -30 ? (o = "left", r = "right") : -60 >= a && a >= -120 ? (o = "top", r = "bottom") : (-150 >= a || a >= 150) && (o = "right", r = "left"), I.Arrows[o] && I.Arrows[o].isAvailable() && E.dispatch("bibi:commands:move-by", {
                Distance: I.Arrows[o].Distance
              })
            }
          }
          delete I.Swiper.TouchStartedOn
        }
      },
      onwheeled: function(e) {
        e.BibiSwiperWheel && (clearTimeout(I.Swiper.onwheeled.Timer_cooldown), I.Swiper.onwheeled.Timer_cooldown = setTimeout(function() {
          I.Swiper.onwheeled.hot = !1
        }, 248), I.Swiper.onwheeled.hot || (I.Swiper.onwheeled.hot = !0, E.dispatch("bibi:commands:move-by", {
          Distance: e.BibiSwiperWheel.Distance
        })))
      }
    }, I.setToggleAction(I.Swiper, {
      onopened: function() {
        sML.addClass(O.HTML, "swipe-active"), O.Mobile || E.add("bibi:wheeled", I.Swiper.onwheeled), I.Swiper.activateElement(R.Main), R.Items.forEach(function(e) {
          I.Swiper.activateElement(e.HTML)
        })
      },
      onclosed: function() {
        sML.removeClass(O.HTML, "swipe-active"), O.Mobile || E.remove("bibi:wheeled", I.Swiper.onwheeled), I.Swiper.deactivateElement(R.Main), R.Items.forEach(function(e) {
          I.Swiper.deactivateElement(e.HTML)
        })
      }
    }), E.add("bibi:laid-out:for-the-first-time", function() {
      I.Swiper.update(), E.add("bibi:updated-settings", function() {
        I.Swiper.update()
      })
    }), E.add("bibi:commands:activate-swipe", function() {
      I.Swiper.open()
    }), E.add("bibi:commands:deactivate-swipe", function() {
      I.Swiper.close()
    }), E.add("bibi:commands:toggle-swipe", function() {
      I.Swiper.toggle()
    }), E.dispatch("bibi:created-swiper"))
  }, I.createSpinner = function() {
    I.Spinner = O.Body.appendChild(sML.create("div", {
      id: "bibi-spinner"
    }));
    for (var e = 1; e <= 12; e++) I.Spinner.appendChild(document.createElement("span"));
    E.dispatch("bibi:created-spinner")
  }, I.setToggleAction = function(e, t) {
    return t || (t = {}), sML.edit(e, {
      UIState: "default",
      open: function(n) {
        return n || (n = {}), "default" == e.UIState ? (I.setUIState(e, "active"), t.onopened && t.onopened.apply(e, arguments)) : n.CallbackTime = 0, e.callback(n), e.UIState
      },
      close: function(n) {
        return n || (n = {}), "active" == e.UIState ? (I.setUIState(e, "default"), t.onclosed && t.onclosed.apply(e, arguments)) : n.CallbackTime = 0, e.callback(n), e.UIState
      },
      toggle: function(t) {
        return "default" == e.UIState ? e.open(t) : e.close(t)
      },
      callback: function(t) {
        t && "function" == typeof t.callback && setTimeout(function() {
          t.callback.call(e)
        }, "number" == typeof t.CallbackTime ? t.CallbackTime : 250)
      }
    })
  }, I.distillLabels = function(e) {
    "object" == typeof e && e || (e = {});
    for (var t in e) e[t] = I.distillLabels.distillLanguage(e[t]);
    return e["default"] || (e["default"] = I.distillLabels.distillLanguage()), !e.active && e["default"] && (e.active = e["default"]), !e.disabled && e["default"] && (e.disabled = e["default"]), e
  }, I.distillLabels.distillLanguage = function(e) {
    return "object" == typeof e && e || (e = {
      "default": e
    }), "string" != typeof e["default"] && ("string" == typeof e.en ? e["default"] = e.en : "string" == typeof e[O.Language] ? e["default"] = e[O.Language] : e["default"] = ""), "string" != typeof e[O.Language] && ("string" == typeof e["default"] ? e[O.Language] = e["default"] : "string" == typeof e.en ? e[O.Language] = e.en : e[O.Language] = ""), e
  }, I.observeHover = function(e) {
    return e.addEventListener(O.pointerover, function(t) {
      E.dispatch("bibi:hovers", t, e)
    }), e.addEventListener(O.pointerout, function(t) {
      E.dispatch("bibi:unhovers", t, e)
    }), e
  }, I.setHoverActions = function(e) {
    return E.add("bibi:hovers", function(t) {
      return e.Hover ? e : e.isAvailable && !e.isAvailable(t) ? e : (e.Hover = !0, sML.addClass(e, "hover"), e.showHelp && e.showHelp(), e)
    }, e), E.add("bibi:unhovers", function(t) {
      return e.Hover ? (e.Hover = !1, sML.removeClass(e, "hover"), e.hideHelp && e.hideHelp(), e) : e
    }, e), e
  }, I.observeTap = function(e, t) {
    return t || (t = {}), e.addTapEventListener || (e.addTapEventListener = function(t, n) {
      return "tap" == t && (t = "taps"), E.add("bibi:" + t, function(t) {
        return n.call(e, t)
      }, e), e
    }, e.addEventListener(O.pointerdown, function(n) {
      clearTimeout(e.Timer_tap), e.TouchStart = {
        Time: Date.now(),
        Event: n,
        Coord: O.getBibiEventCoord(n)
      }, e.Timer_tap = setTimeout(function() {
        delete e.TouchStart
      }, 333), t.PreventDefault && n.preventDefault(), t.StopPropagation && n.stopPropagation()
    }), e.addEventListener(O.pointerup, function(n) {
      if (e.TouchStart) {
        if (Date.now() - e.TouchStart.Time < 300) {
          var i = O.getBibiEventCoord(n);
          Math.abs(i.X - e.TouchStart.Coord.X) < 5 && Math.abs(i.Y - e.TouchStart.Coord.Y) < 5 && (E.dispatch("bibi:taps", e.TouchStart.Event, e), E.dispatch("bibi:tapped", e.TouchStart.Event, e))
        }
        delete e.TouchStart
      }
      t.PreventDefault && n.preventDefault(), t.StopPropagation && n.stopPropagation()
    })), e
  }, I.setTapAction = function(e) {
    var t = function() {
      switch (e.Type) {
        case "toggle":
          return function(t) {
            return "disabled" != e.UIState && void I.setUIState(e, "default" == e.UIState ? "active" : "default")
          };
        case "radio":
          return function(t) {
            return "disabled" != e.UIState && (e.ButtonGroup.Buttons.forEach(function(t) {
              t != e && I.setUIState(t, "")
            }), void I.setUIState(e, "active"))
          };
        default:
          return function(t) {
            return "disabled" != e.UIState && (I.setUIState(e, "active"), clearTimeout(e.Timer_deactivate), void(e.Timer_deactivate = setTimeout(function() {
              I.setUIState(e, "")
            }, 200)))
          }
      }
    }();
    return e.addTapEventListener("tapped", function(n) {
      return e.isAvailable && !e.isAvailable(n) ? e : "radio" == e.Type && "active" == e.UIState ? e : "disabled" == e.UIState ? e : (t.call(e, n), e.hideHelp && e.hideHelp(), e.note && e.note(), e)
    }), e
  }, I.setFeedback = function(e, t) {
    return t || (t = {}), e.Labels = I.distillLabels(e.Labels), e.Labels && (t.Help && (e.showHelp = function() {
      return I.Help && e.Labels[e.UIState] && I.Help.show(e.Labels[e.UIState][O.Language]), e
    }, e.hideHelp = function() {
      return I.Help && I.Help.hide(), e
    }), e.Notes && (e.note = function() {
      return e.Labels[e.UIState] && setTimeout(function() {
        I.note(e.Labels[e.UIState][O.Language])
      }, 0), e
    })), O.Mobile || I.observeHover(e), I.setHoverActions(e), I.observeTap(e, t), I.setTapAction(e), e.addTapEventListener("tap", function(t) {
      return !(e.isAvailable && !e.isAvailable()) && void E.dispatch("bibi:is-going-to:tap:ui", e)
    }), e.addTapEventListener("tapped", function(t) {
      E.dispatch("bibi:tapped:ui", e)
    }), I.setUIState(e, "default"), e
  }, I.setUIState = function(e, t) {
    if (t || (t = "default"), e.PreviousUIState = e.UIState, t != e.UIState) return e.UIState = t, e.tagName && (e.Labels && e.Labels[e.UIState] && e.Labels[e.UIState][O.Language] && (e.title = e.Labels[e.UIState][O.Language].replace(/<[^>]+>/g, ""), e.Label && (e.Label.innerHTML = e.Labels[e.UIState][O.Language])), sML.replaceClass(e, e.PreviousUIState, e.UIState)), e.UIState
  }, I.isPointerStealth = function() {
    var e = !1;
    return I.isPointerStealth.Checkers.forEach(function(t) {
      t() && (e = !0)
    }), e
  }, I.isPointerStealth.Checkers = [], I.isPointerStealth.addChecker = function(e) {
    "function" != typeof e || I.isPointerStealth.Checkers.includes(e) || I.isPointerStealth.Checkers.push(e)
  }, P = {}, P.initialize = function() {
    O.applyTo(P, Bibi.Preset), O.SettingTypes.Boolean.forEach(function(e) {
      P[e] !== !0 && (P[e] = !1)
    }), O.SettingTypes.YesNo.forEach(function(e) {
      "string" == typeof P[e] ? P[e] = /^(yes|no|mobile|desktop)$/.test(P[e]) ? P[e] : "no" : P[e] = P[e] ? "yes" : "no"
    }), O.SettingTypes.Integer.forEach(function(e) {
      P[e] = "number" != typeof P[e] || P[e] < 0 ? 0 : Math.round(P[e])
    }), O.SettingTypes.Number.forEach(function(e) {
      "number" != typeof P[e] && (P[e] = 0)
    }), /^(horizontal|vertical|paged)$/.test(P["reader-view-mode"]) || (P["reader-view-mode"] = "paged"), /^([\w\d]+:)?\/\//.test(P.bookshelf) || (/^\//.test(P.bookshelf) ? P.bookshelf = O.Origin + P.bookshelf : P.bookshelf = O.getPath(location.href.split("?")[0].replace(/[^\/]*$/, "") + P.bookshelf), P.bookshelf = P.bookshelf.replace(/\/$/, "")), P["trustworthy-origins"] instanceof Array || (P["trustworthy-origins"] = []), P["trustworthy-origins"].includes(O.Origin) || P["trustworthy-origins"].unshift(O.Origin);
    var e = [];
    P.extensions.forEach(function(t) {
      "string" == typeof t.name && t.name && "Bibi" != t.name && "string" == typeof t.src && t.src && (t.FileIndexInPreset = e.length, e.push(t))
    }), P.X = P.extensions = e
  }, U = {}, U.initialize = function() {
    var e = U.parseQuery(location.search),
      t = U.parseHash(location.hash);
    U.book = function() {
      var t = e.book ? e.book : O.Body.getAttribute("data-bibi-book");
      if ("string" == typeof t) return t = decodeURIComponent(t).replace(/\/+$/, ""), /^([\w\d]+:)?\/\//.test(t) && /^\/\//.test(t) && (t = location.protocol + t), t
    }();
    var n = function(e) {
      return "string" != typeof e ? {} : void e.replace(" ", "").split(",").forEach(function(e) {
        if (e = e.split(":"), e[0]) {
          if (e[1]) switch (e[0]) {
            case "parent-title":
            case "parent-uri":
            case "parent-origin":
            case "parent-pipi-path":
            case "parent-bibi-label":
            case "parent-holder-id":
              e[1] = U.decode(e[1]);
              break;
            case "reader-view-mode":
              /^(horizontal|vertical|paged)$/.test(e[1]) || (e[1] = void 0);
              break;
            case "to":
              e[1] = R.getBibiToDestination(e[1]);
              break;
            case "nav":
              e[1] = /^[1-9]\d*$/.test(e[1]) ? 1 * e[1] : void 0;
              break;
            case "preset":
              break;
            default:
              O.SettingTypes.YesNo.includes(e[0]) ? "true" == e[1] ? e[1] = "yes" : "false" == e[1] ? e[1] = "no" : /^(yes|no|mobile|desktop)$/.test(e[1]) || (e[1] = void 0) : e[0] = void 0
          } else switch (e[0]) {
            case "horizontal":
            case "vertical":
            case "paged":
              e[1] = e[0], e[0] = "reader-view-mode";
              break;
            default:
              O.SettingTypes.YesNo.includes(e[0]) ? e[1] = "yes" : e[0] = void 0
          }
          e[0] && (e[1] || "string" == typeof e[1] || "number" == typeof e[1]) && (U[e[0]] = e[1])
        }
      })
    };
    t.bibi && n(t.bibi), t.pipi && (n(t.pipi), U["parent-origin"] && U["parent-origin"] != O.Origin && P["trustworthy-origins"].push(U["parent-origin"]), history.replaceState && history.replaceState(null, null, location.href.replace(/[\,#]pipi\([^\)]*\)$/g, ""))), t.epubcfi && (U.epubcfi = t.epubcfi, E.add("bibi:readied", function() {
      X.EPUBCFI && (S.to = U.to = X.EPUBCFI.getDestination(t.epubcfi))
    }))
  }, U.decode = function(e) {
    return decodeURIComponent(e.replace("_BibiKakkoClose_", ")").replace("_BibiKakkoOpen_", "("))
  }, U.parseQuery = function(e) {
    if ("string" != typeof e) return {};
    e = e.replace(/^\?/, "");
    var t = {};
    return e.split("&").forEach(function(e) {
      e = e.split("="), /^[a-z]+$/.test(e[0]) && (t[e[0]] = e[1])
    }), t
  }, U.parseHash = function(e) {
    if ("string" != typeof e) return {};
    e = e.replace(/^#/, "");
    var t = {},
      n = 0,
      i = function() {
        for (var i = n, a = "";
          /[a-z_]/.test(e.charAt(n));) n++;
        if ("(" != e.charAt(n)) return {};
        for (a = e.substr(i, n - 1 - i + 1), n++;
          ")" != e.charAt(n);) n++;
        a && (t[a] = e.substr(i, n - i + 1).replace(/^[a-z_]+\(/, "").replace(/\)$/, "")), n++
      };
    for (i();
      "," == e.charAt(n);) n++, i();
    return t
  }, S = {}, S.initialize = function() {
    for (var e in S) "function" != typeof S[e] && delete S[e];
    O.applyTo(S, P), O.applyTo(S, U), delete S.book, delete S.bookshelf, O.SettingTypes.YesNo.forEach(function(e) {
      S[e] = S.decideYesNo(e)
    }), S.autostart = !S.wait && (!O.WindowEmbedded || S.autostart), S["start-in-new-window"] = S["start-in-new-window"] && O.WindowEmbedded
  }, S.decideYesNo = function(e) {
    return S[e] === !0 || "yes" == S[e] || "mobile" == S[e] && O.Mobile || "desktop" == S[e] && !O.Mobile
  }, S.update = function(e) {
    var t = S.BRL,
      n = S.RVM,
      i = S.PPD,
      a = S.SLA,
      o = S.SLD,
      r = S.ARD;
    if ("object" == typeof e)
      for (var s in e) "function" != typeof S[s] && (S[s] = e[s]);
    S.BRL = S["book-rendition-layout"] = B.Package.Metadata["rendition:layout"], S.BWM = S["book-writing-mode"] = /^tb/.test(B.WritingMode) && !O.VerticalTextEnabled ? "lr-tb" : B.WritingMode, S.FontFamilyStyleIndex && sML.deleteStyleRule(S.FontFamilyStyleIndex), S["ui-font-family"] && (S.FontFamilyStyleIndex = sML.appendStyleRule("html", "font-family: " + S["ui-font-family"] + " !important;")), S.RVM = S["reader-view-mode"], "reflowable" == S.BRL ? "tb-rl" == S.BWM ? (S.PPD = S["page-progression-direction"] = "rtl", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "vertical" : S.RVM) : "tb-lr" == S.BWM ? (S.PPD = S["page-progression-direction"] = "ltr", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "vertical" : S.RVM) : "rl-tb" == S.BWM ? (S.PPD = S["page-progression-direction"] = "rtl", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "horizontal" : S.RVM) : (S.PPD = S["page-progression-direction"] = "ltr", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "horizontal" : S.RVM) : (S.PPD = S["page-progression-direction"] = "rtl" == B.PPD ? "rtl" : "ltr", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "horizontal" : S.RVM), S.SLD = S["spread-layout-direction"] = "vertical" == S.SLA ? "ttb" : S.PPD, S.ARD = S["apparent-reading-direction"] = "vertical" == S.RVM ? "ttb" : S.PPD, "horizontal" == S.SLA ? (S.SIZE = {
      b: "height",
      B: "Height",
      l: "width",
      L: "Width",
      w: "length",
      W: "Length",
      h: "breadth",
      H: "Breadth"
    }, "ltr" == S.PPD ? (S.AXIS = {
      B: "Y",
      L: "X",
      PM: 1
    }, S.BASE = {
      b: "left",
      B: "Left",
      a: "right",
      A: "Right",
      s: "top",
      S: "Top",
      e: "bottom",
      E: "Bottom",
      c: "middle",
      m: "center"
    }) : (S.AXIS = {
      B: "Y",
      L: "X",
      PM: -1
    }, S.BASE = {
      b: "right",
      B: "Right",
      a: "left",
      A: "Left",
      s: "top",
      S: "Top",
      e: "bottom",
      E: "Bottom",
      c: "middle",
      m: "center"
    })) : (S.SIZE = {
      b: "width",
      B: "Width",
      l: "height",
      L: "Height",
      w: "breadth",
      W: "Breadth",
      h: "length",
      H: "Length"
    }, S.AXIS = {
      B: "X",
      L: "Y",
      PM: 1
    }, "ltr" == S.PPD ? S.BASE = {
      b: "top",
      B: "Top",
      a: "bottom",
      A: "Bottom",
      s: "left",
      S: "Left",
      e: "right",
      E: "Right",
      c: "center",
      m: "middle"
    } : S.BASE = {
      b: "top",
      B: "Top",
      a: "bottom",
      A: "Bottom",
      s: "right",
      S: "Right",
      e: "left",
      E: "Left",
      c: "center",
      m: "middle"
    }), t != S.BRL && sML.replaceClass(O.HTML, "book-" + t, "book-" + S.BRL), n != S.RVM && sML.replaceClass(O.HTML, "view-" + n, "view-" + S.RVM), i != S.PPD && sML.replaceClass(O.HTML, "page-" + i, "page-" + S.PPD), a != S.SLA && sML.replaceClass(O.HTML, "spread-" + a, "spread-" + S.SLA), o != S.SLD && sML.replaceClass(O.HTML, "spread-" + o, "spread-" + S.SLD), r != S.ARD && sML.replaceClass(O.HTML, "appearance-" + r, "appearance-" + S.ARD), E.dispatch("bibi:updated-settings", S)
  }, O = {}, O.log = function(e, t) {
    sML.UA.Gecko && "string" == typeof e && (e = e.replace(/(https?:\/\/)/g, ""));
    var n = "BiB/i: ";
    switch (t) {
      case "-x":
        break;
      case "*:":
        t = O.log.Depth + ":";
        break;
      case "/*":
        t = "/" + (O.log.Depth - 1);
        break;
      default:
        t = "-" + O.log.Depth
    }
    switch (t) {
      case "-x":
        return n += "[ERROR] ", void console.info(n + e);
      case "-0":
        return n += "━━ ", void console.info(n + e);
      case "-1":
        n += " - ", O.log.Depth = 1;
        break;
      case "1:":
        n += "┌ ", O.log.Depth = 2;
        break;
      case "-2":
        n += "│ - ", O.log.Depth = 2;
        break;
      case "2:":
        n += "│┌ ", O.log.Depth = 3;
        break;
      case "-3":
        n += "││ - ", O.log.Depth = 3;
        break;
      case "3:":
        n += "││┌ ", O.log.Depth = 4;
        break;
      case "-4":
        n += "│││ - ", O.log.Depth = 4;
        break;
      case "4:":
        n += "│││┌ ", O.log.Depth = 5;
        break;
      case "-5":
        n += "││││ - ", O.log.Depth = 5;
        break;
      case "5:":
        n += "││││┌ ", O.log.Depth = 6;
        break;
      case "-6":
        n += "│││││ - ", O.log.Depth = 6;
        break;
      case "/5":
        n += "││││└ ", O.log.Depth = 5;
        break;
      case "/4":
        n += "│││└ ", O.log.Depth = 4;
        break;
      case "/3":
        n += "││└ ", O.log.Depth = 3;
        break;
      case "/2":
        n += "│└ ", O.log.Depth = 2;
        break;
      case "/1":
        n += "└ ", O.log.Depth = 1
    }
    console.log(n + e)
  }, O.log.Depth = 1, parent && parent != window && (O.log = function() {
    return !1
  }), O.error = function(e) {
    O.Busy = !1, sML.removeClass(O.HTML, "busy"), sML.removeClass(O.HTML, "loading"), sML.removeClass(O.HTML, "waiting"), E.dispatch("bibi:x_x", e), O.log(e, "-x")
  }, O.applyTo = function(e, t) {
    for (var n in t) "function" != typeof e[n] && "function" != typeof t[n] && (e[n] = t[n])
  }, O.download = function(e, t) {
    return new Promise(function(n, i) {
      var a = new XMLHttpRequest;
      t && a.overrideMimeType(t), a.open("GET", e, !0), a.onloadend = function() {
        200 === a.status ? n(a) : i(a)
      }, a.send(null)
    })
  }, O.parseDocument = function(e, t) {
    return (new DOMParser).parseFromString(t, /\.(xml|opf|ncx)$/i.test(e) ? "text/xml" : "text/html")
  }, O.openDocument = function(e) {
    return B.Unzipped ? O.download(B.Path + "/" + e).then(function(t) {
      return O.parseDocument(e, t.responseText)
    })["catch"](function(e) {
      O.error("XHR HTTP status: " + e.status + ' "' + e.responseURL + '"')
    }) : Promise.resolve().then(function() {
      return O.parseDocument(e, B.Files[e])
    })
  }, O.editCSSRules = function() {
    var e, t;
    "function" == typeof arguments[0] ? (e = arguments[1], t = arguments[0]) : "function" == typeof arguments[1] && (e = arguments[0], t = arguments[1]), e || (e = document), e.styleSheets && "function" == typeof t && sML.each(e.styleSheets, function() {
      var e = this;
      if (e.cssRules)
        for (var n = e.cssRules.length, i = 0; i < n; i++) {
          var a = this.cssRules[i];
          a.cssRules ? arguments.callee.call(a) : a.styleSheet ? arguments.callee.call(a.styleSheet) : t(a)
        }
    })
  }, O.appendStyleSheetLink = function(e, t) {
    if (!e || !e.href) return !1;
    t || (t = document);
    var n = t.createElement("link");
    return n.rel = "stylesheet", "string" == typeof e.className && (n.className = e.className), "string" == typeof e.id && (n.id = e.id), "string" == typeof e.media && (n.media = e.media), n.href = e.href, t.head.appendChild(n)
  }, O.isBin = function(e) {
    return !!/(^|\.)(gif|jpe?g|png|ttf|otf|woff|mp[g34]|m4[av]|ogg|webm|pdf)$/i.test(e)
  }, O.getDataURI = function(e, t) {
    for (var n in O.ContentTypes)
      if (new RegExp("(^|.)" + n + "$", "i").test(e)) return "data:" + O.ContentTypes[n] + ";base64," + (O.isBin(e) ? btoa(t) : btoa(unescape(encodeURIComponent(t))));
    return ""
  }, O.getWritingMode = function(e) {
    var t = getComputedStyle(e);
    return O.WritingModeProperty ? /^vertical-/.test(t[O.WritingModeProperty]) ? ("rtl" == t.direction ? "bt" : "tb") + "-" + (/-lr$/.test(t[O.WritingModeProperty]) ? "lr" : "rl") : /^horizontal-/.test(t[O.WritingModeProperty]) ? ("rtl" == t.direction ? "rl" : "lr") + "-" + (/-bt$/.test(t[O.WritingModeProperty]) ? "bt" : "tb") : /^(lr|rl|tb|bt)-/.test(t[O.WritingModeProperty]) ? t[O.WritingModeProperty] : void 0 : "rtl" == t.direction ? "rl-tb" : "lr-tb"
  }, O.getElementInnerText = function(e) {
    var t = "InnerText",
      n = document.createElement("div");
    return n.innerHTML = e.innerHTML.replace(/ (src(set)?|source|(xlink:)?href)=/g, " data-$1="), sML.each(n.querySelectorAll("svg"), function() {
      this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("video"), function() {
      this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("audio"), function() {
      this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("img"), function() {
      this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("script"), function() {
      this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("style"), function() {
      this.parentNode.removeChild(this)
    }), "undefined" != typeof n.textContent ? t = n.textContent : "undefined" != typeof n.innerText && (t = n.innerText), t.replace(/[\r\n\s\t ]/g, "")
  }, O.getElementCoord = function(e) {
    for (var t = {
        X: e.offsetLeft,
        Y: e.offsetTop
      }; e.offsetParent;) e = e.offsetParent, t.X += e.offsetLeft, t.Y += e.offsetTop;
    return t
  }, O.getPath = function() {
    var e = "",
      t = arguments[0];
    if (2 == arguments.length && /^[\w\d]+:\/\//.test(arguments[1])) t = arguments[1];
    else
      for (var n = arguments.length, i = 1; i < n; i++) t += "/" + arguments[i];
    for (t.replace(/^([a-zA-Z]+:\/\/[^\/]+)?\/*(.*)$/, function() {
        e = arguments[1], t = arguments[2]
      });
      /([^:\/])\/{2,}/.test(t);) t = t.replace(/([^:\/])\/{2,}/g, "$1/");
    for (;
      /\/\.\//.test(t);) t = t.replace(/\/\.\//g, "/");
    for (;
      /[^\/]+\/\.\.\//.test(t);) t = t.replace(/[^\/]+\/\.\.\//g, "");
    return t = t.replace(/^(\.\/)+/g, ""), e && (t = e + "/" + t), t
  }, O.isAnchorContent = function(e) {
    for (; e;) {
      if (/^a$/i.test(e.tagName)) return !0;
      e = e.parentElement
    }
    return !1
  }, O.stamp = function(e, t) {
    t || (t = O.TimeCard);
    var n = O.TimeCard.getHMS(O.TimeCard.getElapsed());
    t[n] && (e = t[n] + " -&- " + e), t[n] = e
  }, O.stopPropagation = function(e) {
    return e.stopPropagation(), !1
  }, O.preventDefault = function(e) {
    return e.preventDefault(), !1
  }, O.getBibiEventCoord = function(e) {
    var t = {
      X: 0,
      Y: 0
    };
    if (/^touch/.test(e.type) ? (t.X = e.changedTouches[0].pageX, t.Y = e.changedTouches[0].pageY) : (t.X = e.pageX, t.Y = e.pageY), e.target.ownerDocument.documentElement == O.HTML) t.X -= O.Body.scrollLeft, t.Y -= O.Body.scrollTop;
    else {
      var n = e.target.ownerDocument.documentElement.Item;
      ItemCoord = O.getElementCoord(n), n.PrePaginated || n.Outsourcing || (ItemCoord.X += S["item-padding-left"], ItemCoord.Y += S["item-padding-top"]), t.X = (t.X + ItemCoord.X - R.Main.scrollLeft) * R.Main.Transformation.Scale + R.Main.Transformation.Translation.X, t.Y = (t.Y + ItemCoord.Y - R.Main.scrollTop) * R.Main.Transformation.Scale + R.Main.Transformation.Translation.Y
    }
    return t
  }, O.getBibiEvent = function(e) {
    if (!e) return {};
    var t = O.getBibiEventCoord(e),
      n = S["flipper-width"],
      i = {
        X: t.X / window.innerWidth,
        Y: t.Y / window.innerHeight
      };
    if (n < 1) var a = r = n,
      o = s = 1 - n;
    else var a = n / window.innerWidth,
      r = n / window.innerHeight,
      o = 1 - a,
      s = 1 - r;
    var l = {
      X: "",
      Y: ""
    };
    return i.X < a ? l.X = "left" : o < i.X ? l.X = "right" : l.X = "center", i.Y < r ? l.Y = "top" : s < i.Y ? l.Y = "bottom" : l.Y = "middle", {
      Target: e.target,
      Coord: t,
      Ratio: i,
      Division: l
    }
  }, O.TimeCard = {
    Origin: Date.now(),
    getElapsed: function(e) {
      return (e ? e : Date.now()) - O.TimeCard.Origin
    },
    getHMS: function(e) {
      return [e / 1e3 / 60 / 60, e / 1e3 / 60 % 60, e / 1e3 % 60].map(function(e) {
        return sML.String.pad(Math.floor(e), 0, 2)
      }).join(":")
    }
  }, O.getOrigin = function(e) {
    var t = (e ? e : window).location;
    return t.origin || t.protocol + "//" + (t.host || t.hostname + (t.port ? ":" + t.port : ""))
  }, O.Origin = O.getOrigin(), O.Path = function() {
    if (document.currentScript) return document.currentScript.src;
    var e = document.getElementsByTagName("script");
    return e[e.length - 1].src
  }(), O.RootPath = O.Path.replace(/\/res\/scripts\/.+$/, "/"), O.Cookie = {
    remember: function(e) {
      var t = JSON.parse(sML.Cookies.read("bibi") || "{}");
      return "string" == typeof e && e ? t[e] : t
    },
    eat: function(e, t, n) {
      if ("string" != typeof e || !e) return !1;
      if ("object" != typeof t) return !1;
      var i = this.remember();
      "object" != typeof i[e] && (i[e] = {});
      for (var a in t) {
        var o = t[a];
        "function" != typeof o && (i[e][a] = o)
      }
      n || (n = {}), n.Path = location.pathname.replace(/[^\/]+$/, ""), n.Expires || (n.Expires = S["cookie-expires"]), sML.Cookies.write("bibi", JSON.stringify(i), n)
    }
  }, O.ContentTypes = {
    gif: "image/gif",
    png: "image/png",
    "jpe?g": "image/jpeg",
    svg: "image/svg+xml",
    mp4: "video/mp4",
    webm: "video/webm",
    mp3: "audio/mpeg",
    mp4: "audio/mp4",
    ttf: "font/truetype",
    otf: "font/opentype",
    woff: "font/woff",
    css: "text/css",
    js: "text/javascript",
    "html?": "text/html",
    xhtml: "application/xhtml+xml",
    xml: "application/xml",
    pdf: "application/pdf"
  }, O.SettingTypes = {
    YesNo: ["fix-reader-view-mode", "single-page-always", "wait", "autostart", "start-in-new-window", "use-full-height", "use-menubar", "use-nombre", "use-slider", "use-arrows", "use-keys", "use-swipe", "use-cookie", "preprocess-html-always"],
    Integer: ["spread-gap", "spread-margin", "item-padding-left", "item-padding-right", "item-padding-top", "item-padding-bottom"],
    Number: ["cookie-expires", "flipper-width"],
    Boolean: ["remove-bibi-website-link", "page-breaking"]
  }, E = {}, E.add = function(e, t, n) {
    return !("string" != typeof e || !/^bibi:/.test(e) || "function" != typeof t) && (t.bibiEventListener || (t.bibiEventListener = function(e) {
      return t.call(document, e.detail)
    }), (n ? n : document).addEventListener(e, t.bibiEventListener, !1), t)
  }, E.remove = function(e, t, n) {
    return !("string" != typeof e || !/^bibi:/.test(e) || "function" != typeof t || "function" != typeof t.bibiEventListener) && ((n ? n : document).removeEventListener(e, t.bibiEventListener), t)
  }, E.bind = function(e, t, n) {
    return !("string" != typeof e || !/^bibi:/.test(e) || "function" != typeof t) && (n = n ? n : document, n.BibiBindedEventListeners || (n.BibiBindedEventListeners = {}), n.BibiBindedEventListeners[e] instanceof Array || (n.BibiBindedEventListeners[e] = []), n.BibiBindedEventListeners[e] = n.BibiBindedEventListeners[e].filter(function(e) {
      return e != t
    }), n.BibiBindedEventListeners[e].push(t), n.BibiBindedEventListeners[e].length - 1)
  }, E.unbind = function(e, t, n) {
    if ("string" != typeof e) return !1;
    if (n = n ? n : document, !(n.BibiBindedEventListeners && n.BibiBindedEventListeners[e] instanceof Array)) return !1;
    if ("undefined" == typeof t) return delete n.BibiBindedEventListeners[e], 0;
    if ("number" == typeof t) {
      if ("function" != typeof n.BibiBindedEventListeners[e][t]) return !1;
      t = n.BibiBindedEventListeners[e][t]
    }
    return n.BibiBindedEventListeners[e] = n.BibiBindedEventListeners[e].filter(function(e) {
      return e != t
    }), n.BibiBindedEventListeners[e].length
  }, E.dispatch = function(e, t, n) {
    return "string" == typeof e && (n = n ? n : document, n.BibiBindedEventListeners && n.BibiBindedEventListeners[e] instanceof Array && n.BibiBindedEventListeners[e].forEach(function(e) {
      "function" == typeof e && e.call(n, t)
    }), n.dispatchEvent(new CustomEvent(e, {
      detail: t
    })))
  }, M = {}, M.post = function(e, t) {
    return !!O.WindowEmbedded && (!("string" != typeof e || !e) && ("string" == typeof t && t || (t = "*"), window.parent.postMessage(e, t)))
  }, M.receive = function(e) {
    try {
      if (e = JSON.parse(e), "object" != typeof e || !e) return !1;
      for (var t in e) /^bibi:commands:/.test(t) && E.dispatch(t, e[t]);
      return !0
    } catch (n) {}
    return !1
  }, M.gate = function(e) {
    if (e && e.data)
      for (var t = S["trustworthy-origins"].length, n = 0; n < t; n++)
        if (S["trustworthy-origins"][n] == e.origin) return M.receive(e.data)
  }, X = {}, X.initialize = function() {
    X.Files = {}, X.Presets = {}, X.Loaded = [], X.Added = []
  }, X.loadFilesInPreset = function() {
    return new Promise(function(e, t) {
      O.log("Loading Extension File" + (P.X.length > 1 ? "s" : "") + "...", "*:");
      var n = function(t) {
        if (X.Files[t.name]) return O.log('"name" of Extension File "' + t.name + '" is already taken.', "-*"), n(P.X[t.FileIndexInPreset + 1]), !1;
        X.Files[t.name] = t, X.Presets[t.name] = P.X[t.name] = {};
        for (var i in t) P.X[t.name][i] = t[i];
        document.head.appendChild(sML.create("script", {
          className: "bibi-extension-script",
          id: "bibi-extension-script_" + t.name,
          name: t.name,
          src: t.src,
          onload: function() {
            if (X.Loaded.push(t), t.FileIndexInPreset + 1 == P.X.length) {
              if (X.Added.length) {
                var i = "";
                X.Added.forEach(function(e) {
                  i += ", " + e.name
                }), i = i.replace(/^, /, ""), O.log("Extension" + (X.Added.length > 1 ? "s" : "") + ": " + i, "-*")
              }
              return O.log("Extension File" + (X.Loaded.length > 1 ? "s" : "") + " Loaded.", "/*"), e()
            }
            n(P.X[t.FileIndexInPreset + 1])
          }
        }))
      };
      n(P.X[0])
    })
  }, X.add = function(e) {
    return e && "object" == typeof e ? "string" == typeof e.name && e.name ? X[e.name] ? (O.log('Extension name "' + e.name + '" is reserved or already taken.', "-*"), function() {
      return !1
    }) : ("string" != typeof e.description && (e.decription = void 0), "string" != typeof e.author && (e.author = void 0), "string" != typeof e.version && (e.version = void 0), "number" != typeof e.build && (e.build = void 0), X.Extensions instanceof Array || (X.Extensions = []), X.Extensions.push(e), X[e.name] = e, X[e.name].Options = {}, X.Added.push(e), function(t) {
      return "function" == typeof t && E.bind("bibi:readied", function() {
          return t.call(e)
        }),
        function(t) {
          return "function" == typeof t && E.bind("bibi:prepared", function() {
              return t.call(e)
            }),
            function(t) {
              "function" == typeof t && E.bind("bibi:opened", function() {
                return t.call(e)
              })
            }
        }
    }) : (O.log("Extension name is invalid.", "-*"), function() {
      return !1
    }) : function() {
      return !1
    }
  }, Bibi.x = X.add;
