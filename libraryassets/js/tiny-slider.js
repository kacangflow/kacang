var tns = (function () {
  Object.keys ||
    (Object.keys = function (t) {
      var e = [];
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
      return e;
    }),
    "remove" in Element.prototype ||
      (Element.prototype.remove = function () {
        this.parentNode && this.parentNode.removeChild(this);
      });
  var t = window,
    e =
      t.requestAnimationFrame ||
      t.webkitRequestAnimationFrame ||
      t.mozRequestAnimationFrame ||
      t.msRequestAnimationFrame ||
      function (t) {
        return setTimeout(t, 16);
      },
    n = window,
    i =
      n.cancelAnimationFrame ||
      n.mozCancelAnimationFrame ||
      function (t) {
        clearTimeout(t);
      };
  function a() {
    for (var t, e, n, i = arguments[0] || {}, a = 1, r = arguments.length; a < r; a++) if (null !== (t = arguments[a])) for (e in t) i !== (n = t[e]) && void 0 !== n && (i[e] = n);
    return i;
  }
  function r(t) {
    return 0 <= ["true", "false"].indexOf(t) ? JSON.parse(t) : t;
  }
  function o(t, e, n, i) {
    if (i)
      try {
        t.setItem(e, n);
      } catch (t) {}
    return n;
  }
  function u() {
    var t = document,
      e = t.body;
    return e || ((e = t.createElement("body")).fake = !0), e;
  }
  var l = document.documentElement;
  function s(t) {
    var e = "";
    return t.fake && ((e = l.style.overflow), (t.style.background = ""), (t.style.overflow = l.style.overflow = "hidden"), l.appendChild(t)), e;
  }
  function c(t, e) {
    t.fake && (t.remove(), (l.style.overflow = e), l.offsetHeight);
  }
  function f(t, e, n, i) {
    "insertRule" in t ? t.insertRule(e + "{" + n + "}", i) : t.addRule(e, n, i);
  }
  function d(t) {
    return ("insertRule" in t ? t.cssRules : t.rules).length;
  }
  function v(t, e, n) {
    for (var i = 0, a = t.length; i < a; i++) e.call(n, t[i], i);
  }
  var p = "classList" in document.createElement("_"),
    h = p
      ? function (t, e) {
          return t.classList.contains(e);
        }
      : function (t, e) {
          return 0 <= t.className.indexOf(e);
        },
    m = p
      ? function (t, e) {
          h(t, e) || t.classList.add(e);
        }
      : function (t, e) {
          h(t, e) || (t.className += " " + e);
        },
    y = p
      ? function (t, e) {
          h(t, e) && t.classList.remove(e);
        }
      : function (t, e) {
          h(t, e) && (t.className = t.className.replace(e, ""));
        };
  function g(t, e) {
    return t.hasAttribute(e);
  }
  function x(t, e) {
    return t.getAttribute(e);
  }
  function b(t) {
    return void 0 !== t.item;
  }
  function C(t, e) {
    if (((t = b(t) || t instanceof Array ? t : [t]), "[object Object]" === Object.prototype.toString.call(e))) for (var n = t.length; n--; ) for (var i in e) t[n].setAttribute(i, e[i]);
  }
  function w(t, e) {
    t = b(t) || t instanceof Array ? t : [t];
    for (var n = (e = e instanceof Array ? e : [e]).length, i = t.length; i--; ) for (var a = n; a--; ) t[i].removeAttribute(e[a]);
  }
  function M(t) {
    for (var e = [], n = 0, i = t.length; n < i; n++) e.push(t[n]);
    return e;
  }
  function T(t, e) {
    "none" !== t.style.display && (t.style.display = "none");
  }
  function E(t, e) {
    "none" === t.style.display && (t.style.display = "");
  }
  function N(t) {
    return "none" !== window.getComputedStyle(t).display;
  }
  function A(t) {
    if ("string" == typeof t) {
      var e = [t],
        n = t.charAt(0).toUpperCase() + t.substr(1);
      ["Webkit", "Moz", "ms", "O"].forEach(function (i) {
        ("ms" === i && "transform" !== t) || e.push(i + n);
      }),
        (t = e);
    }
    for (var i = document.createElement("fakeelement"), a = (t.length, 0); a < t.length; a++) {
      var r = t[a];
      if (void 0 !== i.style[r]) return r;
    }
    return !1;
  }
  function L(t, e) {
    var n = !1;
    return /^Webkit/.test(t) ? (n = "webkit" + e + "End") : /^O/.test(t) ? (n = "o" + e + "End") : t && (n = e.toLowerCase() + "end"), n;
  }
  var B = !1;
  try {
    var S = Object.defineProperty({}, "passive", {
      get: function () {
        B = !0;
      },
    });
    window.addEventListener("test", null, S);
  } catch (t) {}
  var O = !!B && { passive: !0 };
  function D(t, e, n) {
    for (var i in e) {
      var a = 0 <= ["touchstart", "touchmove"].indexOf(i) && !n && O;
      t.addEventListener(i, e[i], a);
    }
  }
  function H(t, e) {
    for (var n in e) {
      var i = 0 <= ["touchstart", "touchmove"].indexOf(n) && O;
      t.removeEventListener(n, e[n], i);
    }
  }
  function k() {
    return {
      topics: {},
      on: function (t, e) {
        (this.topics[t] = this.topics[t] || []), this.topics[t].push(e);
      },
      off: function (t, e) {
        if (this.topics[t])
          for (var n = 0; n < this.topics[t].length; n++)
            if (this.topics[t][n] === e) {
              this.topics[t].splice(n, 1);
              break;
            }
      },
      emit: function (t, e) {
        (e.type = t),
          this.topics[t] &&
            this.topics[t].forEach(function (n) {
              n(e, t);
            });
      },
    };
  }
  var R = function (t) {
    t = a(
      {
        container: ".slider",
        mode: "carousel",
        axis: "horizontal",
        items: 1,
        gutter: 0,
        edgePadding: 0,
        fixedWidth: !1,
        autoWidth: !1,
        viewportMax: !1,
        slideBy: 1,
        center: !1,
        controls: !0,
        controlsPosition: "top",
        controlsText: ["prev", "next"],
        controlsContainer: !1,
        prevButton: !1,
        nextButton: !1,
        nav: !0,
        navPosition: "top",
        navContainer: !1,
        navAsThumbnails: !1,
        arrowKeys: !1,
        speed: 300,
        autoplay: !1,
        autoplayPosition: "top",
        autoplayTimeout: 5e3,
        autoplayDirection: "forward",
        autoplayText: ["start", "stop"],
        autoplayHoverPause: !1,
        autoplayButton: !1,
        autoplayButtonOutput: !0,
        autoplayResetOnVisibility: !0,
        animateIn: "tns-fadeIn",
        animateOut: "tns-fadeOut",
        animateNormal: "tns-normal",
        animateDelay: !1,
        loop: !0,
        rewind: !1,
        autoHeight: !1,
        responsive: !1,
        lazyload: !1,
        lazyloadSelector: ".tns-lazy-img",
        touch: !0,
        mouseDrag: !1,
        swipeAngle: 15,
        nested: !1,
        preventActionWhenRunning: !1,
        preventScrollOnTouch: !1,
        freezable: !0,
        onInit: !1,
        useLocalStorage: !0,
      },
      t || {}
    );
    var n = document,
      l = window,
      p = { ENTER: 13, SPACE: 32, LEFT: 37, RIGHT: 39 },
      b = {},
      B = t.useLocalStorage;
    if (B) {
      var S = navigator.userAgent,
        O = new Date();
      try {
        (b = l.localStorage) ? (b.setItem(O, O), (B = b.getItem(O) == O), b.removeItem(O)) : (B = !1), B || (b = {});
      } catch (S) {
        B = !1;
      }
      B &&
        (b.tnsApp &&
          b.tnsApp !== S &&
          ["tC", "tPL", "tMQ", "tTf", "t3D", "tTDu", "tTDe", "tADu", "tADe", "tTE", "tAE"].forEach(function (t) {
            b.removeItem(t);
          }),
        (localStorage.tnsApp = S));
    }
    var I,
      P,
      z,
      W,
      F,
      q,
      j,
      V = b.tC
        ? r(b.tC)
        : o(
            b,
            "tC",
            (function () {
              var t = document,
                e = u(),
                n = s(e),
                i = t.createElement("div"),
                a = !1;
              e.appendChild(i);
              try {
                for (var r, o = "(10px * 10)", l = ["calc" + o, "-moz-calc" + o, "-webkit-calc" + o], f = 0; f < 3; f++)
                  if (((r = l[f]), (i.style.width = r), 100 === i.offsetWidth)) {
                    a = r.replace(o, "");
                    break;
                  }
              } catch (t) {}
              return e.fake ? c(e, n) : i.remove(), a;
            })(),
            B
          ),
      G = b.tPL
        ? r(b.tPL)
        : o(
            b,
            "tPL",
            (function () {
              var t,
                e = document,
                n = u(),
                i = s(n),
                a = e.createElement("div"),
                r = e.createElement("div"),
                o = "";
              (a.className = "tns-t-subp2"), (r.className = "tns-t-ct");
              for (var l = 0; l < 70; l++) o += "<div></div>";
              return (r.innerHTML = o), a.appendChild(r), n.appendChild(a), (t = Math.abs(a.getBoundingClientRect().left - r.children[67].getBoundingClientRect().left) < 2), n.fake ? c(n, i) : a.remove(), t;
            })(),
            B
          ),
      Q = b.tMQ
        ? r(b.tMQ)
        : o(
            b,
            "tMQ",
            ((P = document),
            (W = s((z = u()))),
            (F = P.createElement("div")),
            (j = "@media all and (min-width:1px){.tns-mq-test{position:absolute}}"),
            ((q = P.createElement("style")).type = "text/css"),
            (F.className = "tns-mq-test"),
            z.appendChild(q),
            z.appendChild(F),
            q.styleSheet ? (q.styleSheet.cssText = j) : q.appendChild(P.createTextNode(j)),
            (I = window.getComputedStyle ? window.getComputedStyle(F).position : F.currentStyle.position),
            z.fake ? c(z, W) : F.remove(),
            "absolute" === I),
            B
          ),
      X = b.tTf ? r(b.tTf) : o(b, "tTf", A("transform"), B),
      Y = b.t3D
        ? r(b.t3D)
        : o(
            b,
            "t3D",
            (function (t) {
              if (!t) return !1;
              if (!window.getComputedStyle) return !1;
              var e,
                n = document,
                i = u(),
                a = s(i),
                r = n.createElement("p"),
                o = 9 < t.length ? "-" + t.slice(0, -9).toLowerCase() + "-" : "";
              return (o += "transform"), i.insertBefore(r, null), (r.style[t] = "translate3d(1px,1px,1px)"), (e = window.getComputedStyle(r).getPropertyValue(o)), i.fake ? c(i, a) : r.remove(), void 0 !== e && 0 < e.length && "none" !== e;
            })(X),
            B
          ),
      K = b.tTDu ? r(b.tTDu) : o(b, "tTDu", A("transitionDuration"), B),
      J = b.tTDe ? r(b.tTDe) : o(b, "tTDe", A("transitionDelay"), B),
      U = b.tADu ? r(b.tADu) : o(b, "tADu", A("animationDuration"), B),
      _ = b.tADe ? r(b.tADe) : o(b, "tADe", A("animationDelay"), B),
      Z = b.tTE ? r(b.tTE) : o(b, "tTE", L(K, "Transition"), B),
      $ = b.tAE ? r(b.tAE) : o(b, "tAE", L(U, "Animation"), B),
      tt = l.console && "function" == typeof l.console.warn,
      et = ["container", "controlsContainer", "prevButton", "nextButton", "navContainer", "autoplayButton"],
      nt = {};
    if (
      (et.forEach(function (e) {
        if ("string" == typeof t[e]) {
          var i = t[e],
            a = n.querySelector(i);
          if (((nt[e] = i), !a || !a.nodeName)) return void (tt && console.warn("Can't find", t[e]));
          t[e] = a;
        }
      }),
      !(t.container.children.length < 1))
    ) {
      var it = t.responsive,
        at = t.nested,
        rt = "carousel" === t.mode;
      if (it) {
        0 in it && ((t = a(t, it[0])), delete it[0]);
        var ot = {};
        for (var ut in it) {
          var lt = it[ut];
          (lt = "number" == typeof lt ? { items: lt } : lt), (ot[ut] = lt);
        }
        (it = ot), (ot = null);
      }
      if (
        (rt ||
          (function t(e) {
            for (var n in e) rt || ("slideBy" === n && (e[n] = "page"), "edgePadding" === n && (e[n] = !1), "autoHeight" === n && (e[n] = !1)), "responsive" === n && t(e[n]);
          })(t),
        !rt)
      ) {
        (t.axis = "horizontal"), (t.slideBy = "page"), (t.edgePadding = !1);
        var st = t.animateIn,
          ct = t.animateOut,
          ft = t.animateDelay,
          dt = t.animateNormal;
      }
      var vt,
        pt,
        ht = "horizontal" === t.axis,
        mt = n.createElement("div"),
        yt = n.createElement("div"),
        gt = t.container,
        xt = gt.parentNode,
        bt = gt.outerHTML,
        Ct = gt.children,
        wt = Ct.length,
        Mt = In(),
        Tt = !1;
      it && ni(), rt && (gt.className += " tns-vpfix");
      var Et,
        Nt,
        At,
        Lt,
        Bt,
        St,
        Ot,
        Dt = t.autoWidth,
        Ht = Fn("fixedWidth"),
        kt = Fn("edgePadding"),
        Rt = Fn("gutter"),
        It = zn(),
        Pt = Fn("center"),
        zt = Dt ? 1 : Math.floor(Fn("items")),
        Wt = Fn("slideBy"),
        Ft = t.viewportMax || t.fixedWidthViewportWidth,
        qt = Fn("arrowKeys"),
        jt = Fn("speed"),
        Vt = t.rewind,
        Gt = !Vt && t.loop,
        Qt = Fn("autoHeight"),
        Xt = Fn("controls"),
        Yt = Fn("controlsText"),
        Kt = Fn("nav"),
        Jt = Fn("touch"),
        Ut = Fn("mouseDrag"),
        _t = Fn("autoplay"),
        Zt = Fn("autoplayTimeout"),
        $t = Fn("autoplayText"),
        te = Fn("autoplayHoverPause"),
        ee = Fn("autoplayResetOnVisibility"),
        ne = ((Ot = document.createElement("style")), document.querySelector("head").appendChild(Ot), Ot.sheet ? Ot.sheet : Ot.styleSheet),
        ie = t.lazyload,
        ae = (t.lazyloadSelector, []),
        re = Gt
          ? ((Bt = (function () {
              if (Dt || (Ht && !Ft)) return wt - 1;
              var e = Ht ? "fixedWidth" : "items",
                n = [];
              if (((Ht || t[e] < wt) && n.push(t[e]), it))
                for (var i in it) {
                  var a = it[i][e];
                  a && (Ht || a < wt) && n.push(a);
                }
              return n.length || n.push(0), Math.ceil(Ht ? Ft / Math.min.apply(null, n) : Math.max.apply(null, n));
            })()),
            (St = rt ? Math.ceil((5 * Bt - wt) / 2) : 4 * Bt - wt),
            (St = Math.max(Bt, St)),
            Wn("edgePadding") ? St + 1 : St)
          : 0,
        oe = rt ? wt + 2 * re : wt + re,
        ue = !((!Ht && !Dt) || Gt),
        le = Ht ? Bi() : null,
        se = !rt || !Gt,
        ce = ht ? "left" : "top",
        fe = "",
        de = "",
        ve = Ht
          ? function () {
              return Pt && !Gt ? wt - 1 : Math.ceil(-le / (Ht + Rt));
            }
          : Dt
          ? function () {
              for (var t = oe; t--; ) if (Et[t] >= -le) return t;
            }
          : function () {
              return Pt && rt && !Gt ? wt - 1 : Gt || rt ? Math.max(0, oe - Math.ceil(zt)) : oe - 1;
            },
        pe = Hn(Fn("startIndex")),
        he = pe,
        me = (Dn(), 0),
        ye = Dt ? null : ve(),
        ge = t.preventActionWhenRunning,
        xe = t.swipeAngle,
        be = !xe || "?",
        Ce = !1,
        we = t.onInit,
        Me = new k(),
        Te = " tns-slider tns-" + t.mode,
        Ee = gt.id || ((Lt = window.tnsId), (window.tnsId = Lt ? Lt + 1 : 1), "tns" + window.tnsId),
        Ne = Fn("disable"),
        Ae = !1,
        Le = t.freezable,
        Be = !(!Le || Dt) && ei(),
        Se = !1,
        Oe = {
          click: zi,
          keydown: function (t) {
            t = Xi(t);
            var e = [p.LEFT, p.RIGHT].indexOf(t.keyCode);
            0 <= e && (0 === e ? Ze.disabled || zi(t, -1) : $e.disabled || zi(t, 1));
          },
        },
        De = {
          click: function (t) {
            if (Ce) {
              if (ge) return;
              Ii();
            }
            for (var e = Yi((t = Xi(t))); e !== an && !g(e, "data-nav"); ) e = e.parentNode;
            if (g(e, "data-nav")) {
              var n = (ln = Number(x(e, "data-nav"))),
                i = Ht || Dt ? (n * wt) / on : n * zt;
              Pi(Fe ? n : Math.min(Math.ceil(i), wt - 1), t), sn === n && (hn && Vi(), (ln = -1));
            }
          },
          keydown: function (t) {
            t = Xi(t);
            var e = n.activeElement;
            if (g(e, "data-nav")) {
              var i = [p.LEFT, p.RIGHT, p.ENTER, p.SPACE].indexOf(t.keyCode),
                a = Number(x(e, "data-nav"));
              0 <= i && (0 === i ? 0 < a && Qi(nn[a - 1]) : 1 === i ? a < on - 1 && Qi(nn[a + 1]) : Pi((ln = a), t));
            }
          },
        },
        He = {
          mouseover: function () {
            hn && (Fi(), (mn = !0));
          },
          mouseout: function () {
            mn && (Wi(), (mn = !1));
          },
        },
        ke = {
          visibilitychange: function () {
            n.hidden ? hn && (Fi(), (gn = !0)) : gn && (Wi(), (gn = !1));
          },
        },
        Re = {
          keydown: function (t) {
            t = Xi(t);
            var e = [p.LEFT, p.RIGHT].indexOf(t.keyCode);
            0 <= e && zi(t, 0 === e ? -1 : 1);
          },
        },
        Ie = { touchstart: _i, touchmove: Zi, touchend: $i, touchcancel: $i },
        Pe = { mousedown: _i, mousemove: Zi, mouseup: $i, mouseleave: $i },
        ze = Wn("controls"),
        We = Wn("nav"),
        Fe = !!Dt || t.navAsThumbnails,
        qe = Wn("autoplay"),
        je = Wn("touch"),
        Ve = Wn("mouseDrag"),
        Ge = "tns-slide-active",
        Qe = "tns-complete",
        Xe = {
          load: function (t) {
            fi(Yi(t));
          },
          error: function (t) {
            var e;
            (e = Yi(t)), m(e, "failed"), di(e);
          },
        },
        Ye = "force" === t.preventScrollOnTouch;
      if (ze)
        var Ke,
          Je,
          Ue = t.controlsContainer,
          _e = t.controlsContainer ? t.controlsContainer.outerHTML : "",
          Ze = t.prevButton,
          $e = t.nextButton,
          tn = t.prevButton ? t.prevButton.outerHTML : "",
          en = t.nextButton ? t.nextButton.outerHTML : "";
      if (We)
        var nn,
          an = t.navContainer,
          rn = t.navContainer ? t.navContainer.outerHTML : "",
          on = Dt ? wt : ea(),
          un = 0,
          ln = -1,
          sn = Rn(),
          cn = sn,
          fn = "tns-nav-active",
          dn = "Carousel Page ",
          vn = " (Current Slide)";
      if (qe)
        var pn,
          hn,
          mn,
          yn,
          gn,
          xn = "forward" === t.autoplayDirection ? 1 : -1,
          bn = t.autoplayButton,
          Cn = t.autoplayButton ? t.autoplayButton.outerHTML : "",
          wn = ["<span class='tns-visually-hidden'>", " animation</span>"];
      if (je || Ve)
        var Mn,
          Tn,
          En = {},
          Nn = {},
          An = !1,
          Ln = ht
            ? function (t, e) {
                return t.x - e.x;
              }
            : function (t, e) {
                return t.y - e.y;
              };
      Dt || On(Ne || Be),
        X && ((ce = X), (fe = "translate"), Y ? ((fe += ht ? "3d(" : "3d(0px, "), (de = ht ? ", 0px, 0px)" : ", 0px)")) : ((fe += ht ? "X(" : "Y("), (de = ")"))),
        rt && (gt.className = gt.className.replace("tns-vpfix", "")),
        (function () {
          (Wn("gutter"),
          (mt.className = "tns-outer"),
          (yt.className = "tns-inner"),
          (mt.id = Ee + "-ow"),
          (yt.id = Ee + "-iw"),
          "" === gt.id && (gt.id = Ee),
          (Te += G || Dt ? " tns-subpixel" : " tns-no-subpixel"),
          (Te += V ? " tns-calc" : " tns-no-calc"),
          Dt && (Te += " tns-autowidth"),
          (Te += " tns-" + t.axis),
          (gt.className += Te),
          rt ? (((vt = n.createElement("div")).id = Ee + "-mw"), (vt.className = "tns-ovh"), mt.appendChild(vt), vt.appendChild(yt)) : mt.appendChild(yt),
          Qt) && ((vt || yt).className += " tns-ah");
          if (
            (xt.insertBefore(mt, gt),
            yt.appendChild(gt),
            v(Ct, function (t, e) {
              m(t, "tns-item"), t.id || (t.id = Ee + "-item" + e), !rt && dt && m(t, dt), C(t, { "aria-hidden": "true", tabindex: "-1" });
            }),
            re)
          ) {
            for (var e = n.createDocumentFragment(), i = n.createDocumentFragment(), a = re; a--; ) {
              var r = a % wt,
                o = Ct[r].cloneNode(!0);
              if ((w(o, "id"), i.insertBefore(o, i.firstChild), rt)) {
                var u = Ct[wt - 1 - r].cloneNode(!0);
                w(u, "id"), e.appendChild(u);
              }
            }
            gt.insertBefore(e, gt.firstChild), gt.appendChild(i), (Ct = gt.children);
          }
        })(),
        (function () {
          if (!rt)
            for (var e = pe, n = pe + Math.min(wt, zt); e < n; e++) {
              var i = Ct[e];
              (i.style.left = (100 * (e - pe)) / zt + "%"), m(i, st), y(i, dt);
            }
          if (
            (ht &&
              (G || Dt
                ? (f(ne, "#" + Ee + " > .tns-item", "font-size:" + l.getComputedStyle(Ct[0]).fontSize + ";", d(ne)), f(ne, "#" + Ee, "font-size:0;", d(ne)))
                : rt &&
                  v(Ct, function (t, e) {
                    var n;
                    t.style.marginLeft = ((n = e), V ? V + "(" + 100 * n + "% / " + oe + ")" : (100 * n) / oe + "%");
                  })),
            Q)
          ) {
            if (K) {
              var a = vt && t.autoHeight ? Xn(t.speed) : "";
              f(ne, "#" + Ee + "-mw", a, d(ne));
            }
            (a = qn(t.edgePadding, t.gutter, t.fixedWidth, t.speed, t.autoHeight)),
              f(ne, "#" + Ee + "-iw", a, d(ne)),
              rt && ((a = ht && !Dt ? "width:" + jn(t.fixedWidth, t.gutter, t.items) + ";" : ""), K && (a += Xn(jt)), f(ne, "#" + Ee, a, d(ne))),
              (a = ht && !Dt ? Vn(t.fixedWidth, t.gutter, t.items) : ""),
              t.gutter && (a += Gn(t.gutter)),
              rt || (K && (a += Xn(jt)), U && (a += Yn(jt))),
              a && f(ne, "#" + Ee + " > .tns-item", a, d(ne));
          } else {
            yi(), (yt.style.cssText = qn(kt, Rt, Ht, Qt)), rt && ht && !Dt && (gt.style.width = jn(Ht, Rt, zt));
            a = ht && !Dt ? Vn(Ht, Rt, zt) : "";
            Rt && (a += Gn(Rt)), a && f(ne, "#" + Ee + " > .tns-item", a, d(ne));
          }
          if (it && Q)
            for (var r in it) {
              r = parseInt(r);
              var o = it[r],
                u = ((a = ""), ""),
                s = "",
                c = "",
                p = "",
                h = Dt ? null : Fn("items", r),
                g = Fn("fixedWidth", r),
                x = Fn("speed", r),
                b = Fn("edgePadding", r),
                C = Fn("autoHeight", r),
                w = Fn("gutter", r);
              K && vt && Fn("autoHeight", r) && "speed" in o && (u = "#" + Ee + "-mw{" + Xn(x) + "}"),
                ("edgePadding" in o || "gutter" in o) && (s = "#" + Ee + "-iw{" + qn(b, w, g, x, C) + "}"),
                rt && ht && !Dt && ("fixedWidth" in o || "items" in o || (Ht && "gutter" in o)) && (c = "width:" + jn(g, w, h) + ";"),
                K && "speed" in o && (c += Xn(x)),
                c && (c = "#" + Ee + "{" + c + "}"),
                ("fixedWidth" in o || (Ht && "gutter" in o) || (!rt && "items" in o)) && (p += Vn(g, w, h)),
                "gutter" in o && (p += Gn(w)),
                !rt && "speed" in o && (K && (p += Xn(x)), U && (p += Yn(x))),
                p && (p = "#" + Ee + " > .tns-item{" + p + "}"),
                (a = u + s + c + p) && ne.insertRule("@media (min-width: " + r / 16 + "em) {" + a + "}", ne.cssRules.length);
            }
        })(),
        Kn();
      var Bn = Gt
          ? rt
            ? function () {
                var t = me,
                  e = ye;
                (t += Wt), (e -= Wt), kt ? ((t += 1), (e -= 1)) : Ht && (It + Rt) % (Ht + Rt) && (e -= 1), re && (e < pe ? (pe -= wt) : pe < t && (pe += wt));
              }
            : function () {
                if (ye < pe) for (; me + wt <= pe; ) pe -= wt;
                else if (pe < me) for (; pe <= ye - wt; ) pe += wt;
              }
          : function () {
              pe = Math.max(me, Math.min(ye, pe));
            },
        Sn = rt
          ? function () {
              var t, e, n, i, a, r, o, u, l, s, c;
              Ai(gt, ""),
                K || !jt
                  ? (Di(), (jt && N(gt)) || Ii())
                  : ((t = gt),
                    (e = ce),
                    (n = fe),
                    (i = de),
                    (a = Si()),
                    (r = jt),
                    (o = Ii),
                    (u = Math.min(r, 10)),
                    (l = 0 <= a.indexOf("%") ? "%" : "px"),
                    (a = a.replace(l, "")),
                    (s = Number(t.style[e].replace(n, "").replace(i, "").replace(l, ""))),
                    (c = ((a - s) / r) * u),
                    setTimeout(function a() {
                      (r -= u), (s += c), (t.style[e] = n + s + l + i), 0 < r ? setTimeout(a, u) : o();
                    }, u)),
                ht || ta();
            }
          : function () {
              ae = [];
              var t = {};
              (t[Z] = t[$] = Ii), H(Ct[he], t), D(Ct[pe], t), Hi(he, st, ct, !0), Hi(pe, dt, st), (Z && $ && jt && N(gt)) || Ii();
            };
      return {
        version: "2.9.2",
        getInfo: ia,
        events: Me,
        goTo: Pi,
        play: function () {
          _t && !hn && (ji(), (yn = !1));
        },
        pause: function () {
          hn && (Vi(), (yn = !0));
        },
        isOn: Tt,
        updateSliderHeight: xi,
        refresh: Kn,
        destroy: function () {
          if (((ne.disabled = !0), ne.ownerNode && ne.ownerNode.remove(), H(l, { resize: $n }), qt && H(n, Re), Ue && H(Ue, Oe), an && H(an, De), H(gt, He), H(gt, ke), bn && H(bn, { click: Gi }), _t && clearInterval(pn), rt && Z)) {
            var e = {};
            (e[Z] = Ii), H(gt, e);
          }
          Jt && H(gt, Ie), Ut && H(gt, Pe);
          var i = [bt, _e, tn, en, rn, Cn];
          for (var a in (et.forEach(function (e, n) {
            var a = "container" === e ? mt : t[e];
            if ("object" == typeof a) {
              var r = !!a.previousElementSibling && a.previousElementSibling,
                o = a.parentNode;
              (a.outerHTML = i[n]), (t[e] = r ? r.nextElementSibling : o.firstElementChild);
            }
          }),
          (et =
            st =
            ct =
            ft =
            dt =
            ht =
            mt =
            yt =
            gt =
            xt =
            bt =
            Ct =
            wt =
            pt =
            Mt =
            Dt =
            Ht =
            kt =
            Rt =
            It =
            zt =
            Wt =
            Ft =
            qt =
            jt =
            Vt =
            Gt =
            Qt =
            ne =
            ie =
            Et =
            ae =
            re =
            oe =
            ue =
            le =
            se =
            ce =
            fe =
            de =
            ve =
            pe =
            he =
            me =
            ye =
            xe =
            be =
            Ce =
            we =
            Me =
            Te =
            Ee =
            Ne =
            Ae =
            Le =
            Be =
            Se =
            Oe =
            De =
            He =
            ke =
            Re =
            Ie =
            Pe =
            ze =
            We =
            Fe =
            qe =
            je =
            Ve =
            Ge =
            Qe =
            Xe =
            Nt =
            Xt =
            Yt =
            Ue =
            _e =
            Ze =
            $e =
            Ke =
            Je =
            Kt =
            an =
            rn =
            nn =
            on =
            un =
            ln =
            sn =
            cn =
            fn =
            dn =
            vn =
            _t =
            Zt =
            xn =
            $t =
            te =
            bn =
            Cn =
            ee =
            wn =
            pn =
            hn =
            mn =
            yn =
            gn =
            En =
            Nn =
            Mn =
            An =
            Tn =
            Ln =
            Jt =
            Ut =
              null),
          this))
            "rebuild" !== a && (this[a] = null);
          Tt = !1;
        },
        rebuild: function () {
          return R(a(t, nt));
        },
      };
    }
    function On(t) {
      t && (Xt = Kt = Jt = Ut = qt = _t = te = ee = !1);
    }
    function Dn() {
      for (var t = rt ? pe - re : pe; t < 0; ) t += wt;
      return (t % wt) + 1;
    }
    function Hn(t) {
      return (t = t ? Math.max(0, Math.min(Gt ? wt - 1 : wt - zt, t)) : 0), rt ? t + re : t;
    }
    function kn(t) {
      for (null == t && (t = pe), rt && (t -= re); t < 0; ) t += wt;
      return Math.floor(t % wt);
    }
    function Rn() {
      var t,
        e = kn();
      return (t = Fe ? e : Ht || Dt ? Math.ceil(((e + 1) * on) / wt - 1) : Math.floor(e / zt)), !Gt && rt && pe === ye && (t = on - 1), t;
    }
    function In() {
      return l.innerWidth || n.documentElement.clientWidth || n.body.clientWidth;
    }
    function Pn(t) {
      return "top" === t ? "afterbegin" : "beforeend";
    }
    function zn() {
      var t = kt ? 2 * kt - Rt : 0;
      return (
        (function t(e) {
          var i,
            a,
            r = n.createElement("div");
          return e.appendChild(r), (a = (i = r.getBoundingClientRect()).right - i.left), r.remove(), a || t(e.parentNode);
        })(xt) - t
      );
    }
    function Wn(e) {
      if (t[e]) return !0;
      if (it) for (var n in it) if (it[n][e]) return !0;
      return !1;
    }
    function Fn(e, n) {
      if ((null == n && (n = Mt), "items" === e && Ht)) return Math.floor((It + Rt) / (Ht + Rt)) || 1;
      var i = t[e];
      if (it) for (var a in it) n >= parseInt(a) && e in it[a] && (i = it[a][e]);
      return "slideBy" === e && "page" === i && (i = Fn("items")), rt || ("slideBy" !== e && "items" !== e) || (i = Math.floor(i)), i;
    }
    function qn(t, e, n, i, a) {
      var r = "";
      if (void 0 !== t) {
        var o = t;
        e && (o -= e), (r = ht ? "margin: 0 " + o + "px 0 " + t + "px;" : "margin: " + t + "px 0 " + o + "px 0;");
      } else if (e && !n) {
        var u = "-" + e + "px";
        r = "margin: 0 " + (ht ? u + " 0 0" : "0 " + u + " 0") + ";";
      }
      return !rt && a && K && i && (r += Xn(i)), r;
    }
    function jn(t, e, n) {
      return t ? (t + e) * oe + "px" : V ? V + "(" + 100 * oe + "% / " + n + ")" : (100 * oe) / n + "%";
    }
    function Vn(t, e, n) {
      var i;
      if (t) i = t + e + "px";
      else {
        rt || (n = Math.floor(n));
        var a = rt ? oe : n;
        i = V ? V + "(100% / " + a + ")" : 100 / a + "%";
      }
      return (i = "width:" + i), "inner" !== at ? i + ";" : i + " !important;";
    }
    function Gn(t) {
      var e = "";
      return !1 !== t && (e = (ht ? "padding-" : "margin-") + (ht ? "right" : "bottom") + ": " + t + "px;"), e;
    }
    function Qn(t, e) {
      var n = t.substring(0, t.length - e).toLowerCase();
      return n && (n = "-" + n + "-"), n;
    }
    function Xn(t) {
      return Qn(K, 18) + "transition-duration:" + t / 1e3 + "s;";
    }
    function Yn(t) {
      return Qn(U, 17) + "animation-duration:" + t / 1e3 + "s;";
    }
    function Kn() {
      if (Wn("autoHeight") || Dt || !ht) {
        var t = gt.querySelectorAll("img");
        v(t, function (t) {
          var e = t.src;
          e && e.indexOf("data:image") < 0 ? (D(t, Xe), (t.src = ""), (t.src = e), m(t, "loading")) : ie || fi(t);
        }),
          e(function () {
            hi(M(t), function () {
              Nt = !0;
            });
          }),
          !Dt && ht && (t = vi(pe, Math.min(pe + zt - 1, oe - 1))),
          ie
            ? Jn()
            : e(function () {
                hi(M(t), Jn);
              });
      } else rt && Oi(), _n(), Zn();
    }
    function Jn() {
      if (Dt) {
        var t = Gt ? pe : wt - 1;
        !(function e() {
          Ct[t - 1].getBoundingClientRect().right.toFixed(2) === Ct[t].getBoundingClientRect().left.toFixed(2)
            ? Un()
            : setTimeout(function () {
                e();
              }, 16);
        })();
      } else Un();
    }
    function Un() {
      (ht && !Dt) || (bi(), Dt ? ((le = Bi()), Le && (Be = ei()), (ye = ve()), On(Ne || Be)) : ta()), rt && Oi(), _n(), Zn();
    }
    function _n() {
      if (
        (Ci(),
        mt.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + li() + "</span>  of " + wt + "</div>"),
        (At = mt.querySelector(".tns-liveregion .current")),
        qe)
      ) {
        var e = _t ? "stop" : "start";
        bn ? C(bn, { "data-action": e }) : t.autoplayButtonOutput && (mt.insertAdjacentHTML(Pn(t.autoplayPosition), '<button data-action="' + e + '">' + wn[0] + e + wn[1] + $t[0] + "</button>"), (bn = mt.querySelector("[data-action]"))),
          bn && D(bn, { click: Gi }),
          _t && (ji(), te && D(gt, He), ee && D(gt, ke));
      }
      if (We) {
        if (an)
          C(an, { "aria-label": "Carousel Pagination" }),
            v((nn = an.children), function (t, e) {
              C(t, { "data-nav": e, tabindex: "-1", "aria-label": dn + (e + 1), "aria-controls": Ee });
            });
        else {
          for (var n = "", i = Fe ? "" : 'style="display:none"', a = 0; a < wt; a++) n += '<button data-nav="' + a + '" tabindex="-1" aria-controls="' + Ee + '" ' + i + ' aria-label="' + dn + (a + 1) + '"></button>';
          (n = '<div class="tns-nav" aria-label="Carousel Pagination">' + n + "</div>"), mt.insertAdjacentHTML(Pn(t.navPosition), n), (an = mt.querySelector(".tns-nav")), (nn = an.children);
        }
        if ((na(), K)) {
          var r = K.substring(0, K.length - 18).toLowerCase(),
            o = "transition: all " + jt / 1e3 + "s";
          r && (o = "-" + r + "-" + o), f(ne, "[aria-controls^=" + Ee + "-item]", o, d(ne));
        }
        C(nn[sn], { "aria-label": dn + (sn + 1) + vn }), w(nn[sn], "tabindex"), m(nn[sn], fn), D(an, De);
      }
      ze &&
        (Ue ||
          (Ze && $e) ||
          (mt.insertAdjacentHTML(
            Pn(t.controlsPosition),
            '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' +
              Ee +
              '">' +
              Yt[0] +
              '</button><button data-controls="next" tabindex="-1" aria-controls="' +
              Ee +
              '">' +
              Yt[1] +
              "</button></div>"
          ),
          (Ue = mt.querySelector(".tns-controls"))),
        (Ze && $e) || ((Ze = Ue.children[0]), ($e = Ue.children[1])),
        t.controlsContainer && C(Ue, { "aria-label": "Carousel Navigation", tabindex: "0" }),
        (t.controlsContainer || (t.prevButton && t.nextButton)) && C([Ze, $e], { "aria-controls": Ee, tabindex: "-1" }),
        (t.controlsContainer || (t.prevButton && t.nextButton)) && (C(Ze, { "data-controls": "prev" }), C($e, { "data-controls": "next" })),
        (Ke = Mi(Ze)),
        (Je = Mi($e)),
        Ni(),
        Ue ? D(Ue, Oe) : (D(Ze, Oe), D($e, Oe))),
        ii();
    }
    function Zn() {
      if (rt && Z) {
        var e = {};
        (e[Z] = Ii), D(gt, e);
      }
      Jt && D(gt, Ie, t.preventScrollOnTouch),
        Ut && D(gt, Pe),
        qt && D(n, Re),
        "inner" === at
          ? Me.on("outerResized", function () {
              ti(), Me.emit("innerLoaded", ia());
            })
          : (it || Ht || Dt || Qt || !ht) && D(l, { resize: $n }),
        Qt && ("outer" === at ? Me.on("innerLoaded", pi) : Ne || pi()),
        ci(),
        Ne ? oi() : Be && ri(),
        Me.on("indexChanged", mi),
        "inner" === at && Me.emit("innerLoaded", ia()),
        "function" == typeof we && we(ia()),
        (Tt = !0);
    }
    function $n(t) {
      e(function () {
        ti(Xi(t));
      });
    }
    function ti(e) {
      if (Tt) {
        "outer" === at && Me.emit("outerResized", ia(e)), (Mt = In());
        var i,
          a = pt,
          r = !1;
        it && (ni(), (i = a !== pt) && Me.emit("newBreakpointStart", ia(e)));
        var o,
          u,
          l,
          s,
          c = zt,
          p = Ne,
          h = Be,
          g = qt,
          x = Xt,
          b = Kt,
          C = Jt,
          w = Ut,
          M = _t,
          N = te,
          A = ee,
          L = pe;
        if (i) {
          var B = Ht,
            S = Qt,
            O = Yt,
            k = Pt,
            R = $t;
          if (!Q)
            var I = Rt,
              P = kt;
        }
        if (
          ((qt = Fn("arrowKeys")),
          (Xt = Fn("controls")),
          (Kt = Fn("nav")),
          (Jt = Fn("touch")),
          (Pt = Fn("center")),
          (Ut = Fn("mouseDrag")),
          (_t = Fn("autoplay")),
          (te = Fn("autoplayHoverPause")),
          (ee = Fn("autoplayResetOnVisibility")),
          i &&
            ((Ne = Fn("disable")),
            (Ht = Fn("fixedWidth")),
            (jt = Fn("speed")),
            (Qt = Fn("autoHeight")),
            (Yt = Fn("controlsText")),
            ($t = Fn("autoplayText")),
            (Zt = Fn("autoplayTimeout")),
            Q || ((kt = Fn("edgePadding")), (Rt = Fn("gutter")))),
          On(Ne),
          (It = zn()),
          (ht && !Dt) || Ne || (bi(), ht || (ta(), (r = !0))),
          (Ht || Dt) && ((le = Bi()), (ye = ve())),
          (i || Ht) && ((zt = Fn("items")), (Wt = Fn("slideBy")), (u = zt !== c) && (Ht || Dt || (ye = ve()), Bn())),
          i &&
            Ne !== p &&
            (Ne
              ? oi()
              : (function () {
                  if (Ae) {
                    if (((ne.disabled = !1), (gt.className += Te), Oi(), Gt)) for (var t = re; t--; ) rt && E(Ct[t]), E(Ct[oe - t - 1]);
                    if (!rt)
                      for (var e = pe, n = pe + wt; e < n; e++) {
                        var i = Ct[e],
                          a = e < pe + zt ? st : dt;
                        (i.style.left = (100 * (e - pe)) / zt + "%"), m(i, a);
                      }
                    ai(), (Ae = !1);
                  }
                })()),
          Le &&
            (i || Ht || Dt) &&
            (Be = ei()) !== h &&
            (Be
              ? (Di(Si(Hn(0))), ri())
              : ((function () {
                  if (Se) {
                    if ((kt && Q && (yt.style.margin = ""), re)) for (var t = "tns-transparent", e = re; e--; ) rt && y(Ct[e], t), y(Ct[oe - e - 1], t);
                    ai(), (Se = !1);
                  }
                })(),
                (r = !0))),
          On(Ne || Be),
          _t || (te = ee = !1),
          qt !== g && (qt ? D(n, Re) : H(n, Re)),
          Xt !== x && (Xt ? (Ue ? E(Ue) : (Ze && E(Ze), $e && E($e))) : Ue ? T(Ue) : (Ze && T(Ze), $e && T($e))),
          Kt !== b && (Kt ? E(an) : T(an)),
          Jt !== C && (Jt ? D(gt, Ie, t.preventScrollOnTouch) : H(gt, Ie)),
          Ut !== w && (Ut ? D(gt, Pe) : H(gt, Pe)),
          _t !== M && (_t ? (bn && E(bn), hn || yn || ji()) : (bn && T(bn), hn && Vi())),
          te !== N && (te ? D(gt, He) : H(gt, He)),
          ee !== A && (ee ? D(n, ke) : H(n, ke)),
          i)
        ) {
          if (((Ht === B && Pt === k) || (r = !0), Qt !== S && (Qt || (yt.style.height = "")), Xt && Yt !== O && ((Ze.innerHTML = Yt[0]), ($e.innerHTML = Yt[1])), bn && $t !== R)) {
            var z = _t ? 1 : 0,
              W = bn.innerHTML,
              F = W.length - R[z].length;
            W.substring(F) === R[z] && (bn.innerHTML = W.substring(0, F) + $t[z]);
          }
        } else Pt && (Ht || Dt) && (r = !0);
        if (
          ((u || (Ht && !Dt)) && ((on = ea()), na()),
          (o = pe !== L) ? (Me.emit("indexChanged", ia()), (r = !0)) : u ? o || mi() : (Ht || Dt) && (ci(), Ci(), ui()),
          u &&
            !rt &&
            (function () {
              for (var t = pe + Math.min(wt, zt), e = oe; e--; ) {
                var n = Ct[e];
                pe <= e && e < t ? (m(n, "tns-moving"), (n.style.left = (100 * (e - pe)) / zt + "%"), m(n, st), y(n, dt)) : n.style.left && ((n.style.left = ""), m(n, dt), y(n, st)), y(n, ct);
              }
              setTimeout(function () {
                v(Ct, function (t) {
                  y(t, "tns-moving");
                });
              }, 300);
            })(),
          !Ne && !Be)
        ) {
          if (i && !Q && ((Qt === autoheightTem && jt === speedTem) || yi(), (kt === P && Rt === I) || (yt.style.cssText = qn(kt, Rt, Ht, jt, Qt)), ht)) {
            rt && (gt.style.width = jn(Ht, Rt, zt));
            var q = Vn(Ht, Rt, zt) + Gn(Rt);
            (s = d((l = ne)) - 1), "deleteRule" in l ? l.deleteRule(s) : l.removeRule(s), f(ne, "#" + Ee + " > .tns-item", q, d(ne));
          }
          Qt && pi(), r && (Oi(), (he = pe));
        }
        i && Me.emit("newBreakpointEnd", ia(e));
      }
    }
    function ei() {
      if (!Ht && !Dt) return wt <= (Pt ? zt - (zt - 1) / 2 : zt);
      var t = Ht ? (Ht + Rt) * wt : Et[wt],
        e = kt ? It + 2 * kt : It + Rt;
      return Pt && (e -= Ht ? (It - Ht) / 2 : (It - (Et[pe + 1] - Et[pe] - Rt)) / 2), t <= e;
    }
    function ni() {
      for (var t in ((pt = 0), it)) (t = parseInt(t)) <= Mt && (pt = t);
    }
    function ii() {
      !_t && bn && T(bn), !Kt && an && T(an), Xt || (Ue ? T(Ue) : (Ze && T(Ze), $e && T($e)));
    }
    function ai() {
      _t && bn && E(bn), Kt && an && E(an), Xt && (Ue ? E(Ue) : (Ze && E(Ze), $e && E($e)));
    }
    function ri() {
      if (!Se) {
        if ((kt && (yt.style.margin = "0px"), re)) for (var t = "tns-transparent", e = re; e--; ) rt && m(Ct[e], t), m(Ct[oe - e - 1], t);
        ii(), (Se = !0);
      }
    }
    function oi() {
      if (!Ae) {
        if (((ne.disabled = !0), (gt.className = gt.className.replace(Te.substring(1), "")), w(gt, ["style"]), Gt)) for (var t = re; t--; ) rt && T(Ct[t]), T(Ct[oe - t - 1]);
        if (((ht && rt) || w(yt, ["style"]), !rt))
          for (var e = pe, n = pe + wt; e < n; e++) {
            var i = Ct[e];
            w(i, ["style"]), y(i, st), y(i, dt);
          }
        ii(), (Ae = !0);
      }
    }
    function ui() {
      var t = li();
      At.innerHTML !== t && (At.innerHTML = t);
    }
    function li() {
      var t = si(),
        e = t[0] + 1,
        n = t[1] + 1;
      return e === n ? e + "" : e + " to " + n;
    }
    function si(t) {
      null == t && (t = Si());
      var e,
        n,
        i,
        a = pe;
      if ((Pt || kt ? (Dt || Ht) && ((n = -(parseFloat(t) + kt)), (i = n + It + 2 * kt)) : Dt && ((n = Et[pe]), (i = n + It)), Dt))
        Et.forEach(function (t, r) {
          r < oe && ((Pt || kt) && t <= n + 0.5 && (a = r), 0.5 <= i - t && (e = r));
        });
      else {
        if (Ht) {
          var r = Ht + Rt;
          Pt || kt ? ((a = Math.floor(n / r)), (e = Math.ceil(i / r - 1))) : (e = a + Math.ceil(It / r) - 1);
        } else if (Pt || kt) {
          var o = zt - 1;
          if ((Pt ? ((a -= o / 2), (e = pe + o / 2)) : (e = pe + o), kt)) {
            var u = (kt * zt) / It;
            (a -= u), (e += u);
          }
          (a = Math.floor(a)), (e = Math.ceil(e));
        } else e = a + zt - 1;
        (a = Math.max(a, 0)), (e = Math.min(e, oe - 1));
      }
      return [a, e];
    }
    function ci() {
      ie &&
        !Ne &&
        vi.apply(null, si()).forEach(function (t) {
          if (!h(t, Qe)) {
            var e = {};
            (e[Z] = function (t) {
              t.stopPropagation();
            }),
              D(t, e),
              D(t, Xe),
              (t.src = x(t, "data-src"));
            var n = x(t, "data-srcset");
            n && (t.srcset = n), m(t, "loading");
          }
        });
    }
    function fi(t) {
      m(t, "loaded"), di(t);
    }
    function di(t) {
      m(t, "tns-complete"), y(t, "loading"), H(t, Xe);
    }
    function vi(t, e) {
      for (var n = []; t <= e; )
        v(Ct[t].querySelectorAll("img"), function (t) {
          n.push(t);
        }),
          t++;
      return n;
    }
    function pi() {
      var t = vi.apply(null, si());
      e(function () {
        hi(t, xi);
      });
    }
    function hi(t, n) {
      return Nt
        ? n()
        : (t.forEach(function (e, n) {
            h(e, Qe) && t.splice(n, 1);
          }),
          t.length
            ? void e(function () {
                hi(t, n);
              })
            : n());
    }
    function mi() {
      ci(),
        Ci(),
        ui(),
        Ni(),
        (function () {
          if (Kt && ((sn = 0 <= ln ? ln : Rn()), (ln = -1), sn !== cn)) {
            var t = nn[cn],
              e = nn[sn];
            C(t, { tabindex: "-1", "aria-label": dn + (cn + 1) }), y(t, fn), C(e, { "aria-label": dn + (sn + 1) + vn }), w(e, "tabindex"), m(e, fn), (cn = sn);
          }
        })();
    }
    function yi() {
      rt && Qt && (vt.style[K] = jt / 1e3 + "s");
    }
    function gi(t, e) {
      for (var n = [], i = t, a = Math.min(t + e, oe); i < a; i++) n.push(Ct[i].offsetHeight);
      return Math.max.apply(null, n);
    }
    function xi() {
      var t = Qt ? gi(pe, zt) : gi(re, wt),
        e = vt || yt;
      e.style.height !== t && (e.style.height = t + "px");
    }
    function bi() {
      Et = [0];
      var t = ht ? "left" : "top",
        e = ht ? "right" : "bottom",
        n = Ct[0].getBoundingClientRect()[t];
      v(Ct, function (i, a) {
        a && Et.push(i.getBoundingClientRect()[t] - n), a === oe - 1 && Et.push(i.getBoundingClientRect()[e] - n);
      });
    }
    function Ci() {
      var t = si(),
        e = t[0],
        n = t[1];
      v(Ct, function (t, i) {
        e <= i && i <= n ? g(t, "aria-hidden") && (w(t, ["aria-hidden", "tabindex"]), m(t, Ge)) : g(t, "aria-hidden") || (C(t, { "aria-hidden": "true", tabindex: "-1" }), y(t, Ge));
      });
    }
    function wi(t) {
      return t.nodeName.toLowerCase();
    }
    function Mi(t) {
      return "button" === wi(t);
    }
    function Ti(t) {
      return "true" === t.getAttribute("aria-disabled");
    }
    function Ei(t, e, n) {
      t ? (e.disabled = n) : e.setAttribute("aria-disabled", n.toString());
    }
    function Ni() {
      if (Xt && !Vt && !Gt) {
        var t = Ke ? Ze.disabled : Ti(Ze),
          e = Je ? $e.disabled : Ti($e),
          n = pe <= me,
          i = !Vt && ye <= pe;
        n && !t && Ei(Ke, Ze, !0), !n && t && Ei(Ke, Ze, !1), i && !e && Ei(Je, $e, !0), !i && e && Ei(Je, $e, !1);
      }
    }
    function Ai(t, e) {
      K && (t.style[K] = e);
    }
    function Li(t) {
      return null == t && (t = pe), Dt ? (It - (kt ? Rt : 0) - (Et[t + 1] - Et[t] - Rt)) / 2 : Ht ? (It - Ht) / 2 : (zt - 1) / 2;
    }
    function Bi() {
      var t = It + (kt ? Rt : 0) - (Ht ? (Ht + Rt) * oe : Et[oe]);
      return Pt && !Gt && (t = Ht ? -(Ht + Rt) * (oe - 1) - Li() : Li(oe - 1) - Et[oe - 1]), 0 < t && (t = 0), t;
    }
    function Si(t) {
      var e;
      if ((null == t && (t = pe), ht && !Dt))
        if (Ht) (e = -(Ht + Rt) * t), Pt && (e += Li());
        else {
          var n = X ? oe : zt;
          Pt && (t -= Li()), (e = (100 * -t) / n);
        }
      else (e = -Et[t]), Pt && Dt && (e += Li());
      return ue && (e = Math.max(e, le)), e + (!ht || Dt || Ht ? "px" : "%");
    }
    function Oi(t) {
      Ai(gt, "0s"), Di(t);
    }
    function Di(t) {
      null == t && (t = Si()), (gt.style[ce] = fe + t + de);
    }
    function Hi(t, e, n, i) {
      var a = t + zt;
      Gt || (a = Math.min(a, oe));
      for (var r = t; r < a; r++) {
        var o = Ct[r];
        i || (o.style.left = (100 * (r - pe)) / zt + "%"), ft && J && (o.style[J] = o.style[_] = (ft * (r - t)) / 1e3 + "s"), y(o, e), m(o, n), i && ae.push(o);
      }
    }
    function ki(t, e) {
      se && Bn(), (pe !== he || e) && (Me.emit("indexChanged", ia()), Me.emit("transitionStart", ia()), Qt && pi(), hn && t && 0 <= ["click", "keydown"].indexOf(t.type) && Vi(), (Ce = !0), Sn());
    }
    function Ri(t) {
      return t.toLowerCase().replace(/-/g, "");
    }
    function Ii(t) {
      if (rt || Ce) {
        if ((Me.emit("transitionEnd", ia(t)), !rt && 0 < ae.length))
          for (var e = 0; e < ae.length; e++) {
            var n = ae[e];
            (n.style.left = ""), _ && J && ((n.style[_] = ""), (n.style[J] = "")), y(n, ct), m(n, dt);
          }
        if (!t || (!rt && t.target.parentNode === gt) || (t.target === gt && Ri(t.propertyName) === Ri(ce))) {
          if (!se) {
            var i = pe;
            Bn(), pe !== i && (Me.emit("indexChanged", ia()), Oi());
          }
          "inner" === at && Me.emit("innerLoaded", ia()), (Ce = !1), (he = pe);
        }
      }
    }
    function Pi(t, e) {
      if (!Be)
        if ("prev" === t) zi(e, -1);
        else if ("next" === t) zi(e, 1);
        else {
          if (Ce) {
            if (ge) return;
            Ii();
          }
          var n = kn(),
            i = 0;
          if (
            ("first" === t ? (i = -n) : "last" === t ? (i = rt ? wt - zt - n : wt - 1 - n) : ("number" != typeof t && (t = parseInt(t)), isNaN(t) || (e || (t = Math.max(0, Math.min(wt - 1, t))), (i = t - n))), !rt && i && Math.abs(i) < zt)
          ) {
            var a = 0 < i ? 1 : -1;
            i += me <= pe + i - wt ? wt * a : 2 * wt * a * -1;
          }
          (pe += i), rt && Gt && (pe < me && (pe += wt), ye < pe && (pe -= wt)), kn(pe) !== kn(he) && ki(e);
        }
    }
    function zi(t, e) {
      if (Ce) {
        if (ge) return;
        Ii();
      }
      var n;
      if (!e) {
        for (var i = Yi((t = Xi(t))); i !== Ue && [Ze, $e].indexOf(i) < 0; ) i = i.parentNode;
        var a = [Ze, $e].indexOf(i);
        0 <= a && ((n = !0), (e = 0 === a ? -1 : 1));
      }
      if (Vt) {
        if (pe === me && -1 === e) return void Pi("last", t);
        if (pe === ye && 1 === e) return void Pi("first", t);
      }
      e && ((pe += Wt * e), Dt && (pe = Math.floor(pe)), ki(n || (t && "keydown" === t.type) ? t : null));
    }
    function Wi() {
      (pn = setInterval(function () {
        zi(null, xn);
      }, Zt)),
        (hn = !0);
    }
    function Fi() {
      clearInterval(pn), (hn = !1);
    }
    function qi(t, e) {
      C(bn, { "data-action": t }), (bn.innerHTML = wn[0] + t + wn[1] + e);
    }
    function ji() {
      Wi(), bn && qi("stop", $t[1]);
    }
    function Vi() {
      Fi(), bn && qi("start", $t[0]);
    }
    function Gi() {
      hn ? (Vi(), (yn = !0)) : (ji(), (yn = !1));
    }
    function Qi(t) {
      t.focus();
    }
    function Xi(t) {
      return Ki((t = t || l.event)) ? t.changedTouches[0] : t;
    }
    function Yi(t) {
      return t.target || l.event.srcElement;
    }
    function Ki(t) {
      return 0 <= t.type.indexOf("touch");
    }
    function Ji(t) {
      t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
    }
    function Ui() {
      return (r = Nn.y - En.y), (o = Nn.x - En.x), (e = Math.atan2(r, o) * (180 / Math.PI)), (i = !1), 90 - (n = xe) <= (a = Math.abs(90 - Math.abs(e))) ? (i = "horizontal") : a <= n && (i = "vertical"), i === t.axis;
      var e, n, i, a, r, o;
    }
    function _i(t) {
      if (Ce) {
        if (ge) return;
        Ii();
      }
      _t && hn && Fi(), (An = !0), Tn && (i(Tn), (Tn = null));
      var e = Xi(t);
      Me.emit(Ki(t) ? "touchStart" : "dragStart", ia(t)), !Ki(t) && 0 <= ["img", "a"].indexOf(wi(Yi(t))) && Ji(t), (Nn.x = En.x = e.clientX), (Nn.y = En.y = e.clientY), rt && ((Mn = parseFloat(gt.style[ce].replace(fe, ""))), Ai(gt, "0s"));
    }
    function Zi(t) {
      if (An) {
        var n = Xi(t);
        (Nn.x = n.clientX),
          (Nn.y = n.clientY),
          rt
            ? Tn ||
              (Tn = e(function () {
                !(function t(n) {
                  if (be) {
                    if (
                      (i(Tn),
                      An &&
                        (Tn = e(function () {
                          t(n);
                        })),
                      "?" === be && (be = Ui()),
                      be)
                    ) {
                      !Ye && Ki(n) && (Ye = !0);
                      try {
                        n.type && Me.emit(Ki(n) ? "touchMove" : "dragMove", ia(n));
                      } catch (t) {}
                      var a = Mn,
                        r = Ln(Nn, En);
                      if (!ht || Ht || Dt) (a += r), (a += "px");
                      else (a += X ? (r * zt * 100) / ((It + Rt) * oe) : (100 * r) / (It + Rt)), (a += "%");
                      gt.style[ce] = fe + a + de;
                    }
                  } else An = !1;
                })(t);
              }))
            : ("?" === be && (be = Ui()), be && (Ye = !0)),
          Ye && t.preventDefault();
      }
    }
    function $i(n) {
      if (An) {
        Tn && (i(Tn), (Tn = null)), rt && Ai(gt, ""), (An = !1);
        var a = Xi(n);
        (Nn.x = a.clientX), (Nn.y = a.clientY);
        var r = Ln(Nn, En);
        if (Math.abs(r)) {
          if (!Ki(n)) {
            var o = Yi(n);
            D(o, {
              click: function t(e) {
                Ji(e), H(o, { click: t });
              },
            });
          }
          rt
            ? (Tn = e(function () {
                if (ht && !Dt) {
                  var t = (-r * zt) / (It + Rt);
                  (t = 0 < r ? Math.floor(t) : Math.ceil(t)), (pe += t);
                } else {
                  var e = -(Mn + r);
                  if (e <= 0) pe = me;
                  else if (e >= Et[oe - 1]) pe = ye;
                  else for (var i = 0; i < oe && e >= Et[i]; ) e > Et[(pe = i)] && r < 0 && (pe += 1), i++;
                }
                ki(n, r), Me.emit(Ki(n) ? "touchEnd" : "dragEnd", ia(n));
              }))
            : be && zi(n, 0 < r ? -1 : 1);
        }
      }
      "auto" === t.preventScrollOnTouch && (Ye = !1), xe && (be = "?"), _t && !hn && Wi();
    }
    function ta() {
      (vt || yt).style.height = Et[pe + zt] - Et[pe] + "px";
    }
    function ea() {
      var t = Ht ? ((Ht + Rt) * wt) / It : wt / zt;
      return Math.min(Math.ceil(t), wt);
    }
    function na() {
      if (Kt && !Fe && on !== un) {
        var t = un,
          e = on,
          n = E;
        for (on < un && ((t = on), (e = un), (n = T)); t < e; ) n(nn[t]), t++;
        un = on;
      }
    }
    function ia(t) {
      return {
        container: gt,
        slideItems: Ct,
        navContainer: an,
        navItems: nn,
        controlsContainer: Ue,
        hasControls: ze,
        prevButton: Ze,
        nextButton: $e,
        items: zt,
        slideBy: Wt,
        cloneCount: re,
        slideCount: wt,
        slideCountNew: oe,
        index: pe,
        indexCached: he,
        displayIndex: Dn(),
        navCurrentIndex: sn,
        navCurrentIndexCached: cn,
        pages: on,
        pagesCached: un,
        sheet: ne,
        isOn: Tt,
        event: t || {},
      };
    }
    tt && console.warn("No slides found in", t.container);
  };
  return R;
})();
