/*===============================================================================
			[ INDEX ]
=================================================================================

	Avoid Console
	Slick Slider
	Wowjs
	Waypoint js
	CounterUp
	Mobilemenu
	Animated Headline
	Videopopup
	Calender
	Video Player
	Select 2
	Instafeed Js
	Datepicker
	Fake Loader

=================================================================================
			[ END INDEX ]
================================================================================*/

/* Avoid Console */
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// Place any jQuery/helper plugins in here.

/* Slick Slider */
!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
      ? (module.exports = i(require("jquery")))
      : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  (((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      ((n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0));
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) ((o = t), (t = null));
        else if (t < 0 || t >= s.slideCount) return !1;
        (s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
                ? i(e).insertBefore(s.$slides.eq(t))
                : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
              ? i(e).prependTo(s.$slideTrack)
              : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit());
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      (s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t,
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t,
              )
          : !1 === s.cssTransitions
            ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
              i({ animStart: s.currentLeft }).animate(
                { animStart: e },
                {
                  duration: s.options.speed,
                  easing: s.options.easing,
                  step: function (i) {
                    ((i = Math.ceil(i)),
                      !1 === s.options.vertical
                        ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                          s.$slideTrack.css(o))
                        : ((o[s.animType] = "translate(0px," + i + "px)"),
                          s.$slideTrack.css(o)));
                  },
                  complete: function () {
                    t && t.call();
                  },
                },
              ))
            : (s.applyTransition(),
              (e = Math.ceil(e)),
              !1 === s.options.vertical
                ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
                : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
              s.$slideTrack.css(o),
              t &&
                setTimeout(function () {
                  (s.disableTransition(), t.call());
                }, s.options.speed)));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return (t && null !== t && (t = i(t).not(e.$slider)), t);
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        "object" == typeof t &&
        t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      (!1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t));
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      (i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed,
          )));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        ((o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active"));
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      ((e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0,
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable"));
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        (l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            }));
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
            ? (n = d)
            : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        (null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s],
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s],
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger("breakpoint", [r, l]));
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          ((s =
            0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t));
          break;
        case "next":
          ((s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t));
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          (r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus"));
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      (e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange,
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault,
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition));
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      (e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      (t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current",
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]));
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      ((t[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t));
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              (t.disableTransition(i), e.call());
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing,
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            (++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow));
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          (++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow));
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll,
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
            ? (n.slideOffset +=
                n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
                n.slideWidth)
            : !0 === n.options.centerMode &&
              ((n.slideOffset = 0),
              (n.slideOffset +=
                n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                  ? -1 * o[0].offsetLeft
                  : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;
      )
        (s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow));
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return ((e = n), !1);
            }),
            Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      (i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay()));
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      (e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              (i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + s,
                  }));
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              (i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  }));
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end()));
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      (!0 === e.options.dots &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide,
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      (e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler,
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler,
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler,
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler,
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e),
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e),
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition));
    }),
    (e.prototype.initUI = function () {
      var i = this;
      (!0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show());
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          ((r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              (o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading",
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, e, t]));
            });
          }),
            (r.onerror = function () {
              (e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, e, t]));
            }),
            (r.src = t));
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1),
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          (r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++);
      (e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
            ? e(
                n.$slider
                  .find(".slick-cloned")
                  .slice(0, n.options.slidesToShow),
              )
            : 0 === n.currentSlide &&
              e(
                n.$slider
                  .find(".slick-cloned")
                  .slice(-1 * n.options.slidesToShow),
              ));
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      (i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad());
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      (i.checkResponsive(), i.setPosition());
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        (i.autoPlayClear(), (i.paused = !0));
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        (i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1));
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            (s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad());
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      ((o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1));
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              (s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--);
            (s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings));
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      ((e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0,
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]));
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          ((e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition());
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
                ? --i
                : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        (o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit());
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      (!0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s))));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      (!1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow,
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length,
              ),
            ))
          : !0 === i.options.variableWidth
            ? i.$slideTrack.width(5e3 * i.slideCount)
            : ((i.slideWidth = Math.ceil(i.listWidth)),
              i.$slideTrack.height(
                Math.ceil(
                  i.$slides.first().outerHeight(!0) *
                    i.$slideTrack.children(".slick-slide").length,
                ),
              )));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      (t.$slides.each(function (o, s) {
        ((e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              }));
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 }));
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                (r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--);
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      (i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]));
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      ((i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType));
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        ((e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center"));
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
            ? t.addClass("slick-active").attr("aria-hidden", "false")
            : ((s = n.slideCount % n.options.slidesToShow),
              (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
              n.options.slidesToShow == n.options.slidesToScroll &&
              n.slideCount - i < n.options.slidesToShow
                ? t
                    .slice(o - (n.options.slidesToShow - s), o + s)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : t
                    .slice(o, o + n.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          ((t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned"));
        for (e = 0; e < o + s.slideCount; e += 1)
          ((t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned"));
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      (i || e.autoPlay(), (e.interrupted = i));
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      (s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s));
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                  ? a.slideCount % a.options.slidesToScroll != 0
                    ? 0
                    : o - a.slideCount
                  : o),
            (a.animating = !0),
            a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      (!0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading"));
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o <= 360 && o >= 315
            ? !1 === s.options.rtl
              ? "left"
              : "right"
            : o >= 135 && o <= 225
              ? !1 === s.options.rtl
                ? "right"
                : "left"
              : !0 === s.options.verticalSwiping
                ? o >= 35 && o <= 135
                  ? "down"
                  : "up"
                : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return ((o.scrolling = !1), !1);
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            ((e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0));
            break;
          case "right":
          case "up":
            ((e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1));
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2)),
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2)),
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return ((t.touchObject = {}), !1);
      (void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0));
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      (i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", ""));
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      (e.$slider.trigger("unslick", [e, i]), e.destroy());
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      (Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          i.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
                !1 === i.options.centerMode
              ? (i.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                i.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : i.currentSlide >= i.slideCount - 1 &&
                !0 === i.options.centerMode &&
                (i.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                i.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    }));
});

/* Wowjs */
/*! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/ (function () {
  var a,
    b,
    c,
    d,
    e,
    f = function (a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    },
    g =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  ((b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) ((d = b[c]), null == a[c] && (a[c] = d));
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a,
        );
      }),
      (a.prototype.createEvent = function (a, b, c, d) {
        var e;
        return (
          null == b && (b = !1),
          null == c && (c = !1),
          null == d && (d = null),
          null != document.createEvent
            ? ((e = document.createEvent("CustomEvent")),
              e.initCustomEvent(a, b, c, d))
            : null != document.createEventObject
              ? ((e = document.createEventObject()), (e.eventType = a))
              : (e.eventName = a),
          e
        );
      }),
      (a.prototype.emitEvent = function (a, b) {
        return null != a.dispatchEvent
          ? a.dispatchEvent(b)
          : b in (null != a)
            ? a[b]()
            : "on" + b in (null != a)
              ? a["on" + b]()
              : void 0;
      }),
      (a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener
          ? a.addEventListener(b, c, !1)
          : null != a.attachEvent
            ? a.attachEvent("on" + b, c)
            : (a[b] = c);
      }),
      (a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener
          ? a.removeEventListener(b, c, !1)
          : null != a.detachEvent
            ? a.detachEvent("on" + b, c)
            : delete a[b];
      }),
      (a.prototype.innerHeight = function () {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          ((this.keys = []), (this.values = []));
        }
        return (
          (a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return (this.keys.push(a), this.values.push(b));
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          ("undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content.",
              ));
        }
        return (
          (a.notSupported = !0),
          (a.prototype.observe = function () {}),
          a
        );
      })())),
    (d =
      this.getComputedStyle ||
      function (a, b) {
        return (
          (this.getPropertyValue = function (b) {
            var c;
            return (
              "float" === b && (b = "styleFloat"),
              e.test(b) &&
                b.replace(e, function (a, b) {
                  return b.toUpperCase();
                }),
              (null != (c = a.currentStyle) ? c[b] : void 0) || null
            );
          }),
          this
        );
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function e(a) {
        (null == a && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.resetAnimation = f(this.resetAnimation, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          null != a.scrollContainer &&
            (this.config.scrollContainer = document.querySelector(
              a.scrollContainer,
            )),
          (this.animationNameCache = new c()),
          (this.wowEvent = this.util().createEvent(this.config.boxClass)));
      }
      return (
        (e.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
          scrollContainer: null,
        }),
        (e.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (e.prototype.start = function () {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, c, d, e;
              for (
                d = this.element.querySelectorAll("." + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                ((b = d[a]), e.push(b));
              return e;
            }.call(this)),
            (this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                ((b = d[a]), e.push(b));
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                ((b = e[c]), this.applyStyle(b, !0));
          return (
            this.disabled() ||
              (this.util().addEvent(
                this.config.scrollContainer || window,
                "scroll",
                this.scrollHandler,
              ),
              this.util().addEvent(window, "resize", this.scrollHandler),
              (this.interval = setInterval(this.scrollCallback, 50))),
            this.config.live
              ? new a(
                  (function (a) {
                    return function (b) {
                      var c, d, e, f, g;
                      for (g = [], c = 0, d = b.length; d > c; c++)
                        ((f = b[c]),
                          g.push(
                            function () {
                              var a, b, c, d;
                              for (
                                c = f.addedNodes || [],
                                  d = [],
                                  a = 0,
                                  b = c.length;
                                b > a;
                                a++
                              )
                                ((e = c[a]), d.push(this.doSync(e)));
                              return d;
                            }.call(a),
                          ));
                      return g;
                    };
                  })(this),
                ).observe(document.body, { childList: !0, subtree: !0 })
              : void 0
          );
        }),
        (e.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(
              this.config.scrollContainer || window,
              "scroll",
              this.scrollHandler,
            ),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (e.prototype.sync = function (b) {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (e.prototype.doSync = function (a) {
          var b, c, d, e, f;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll("." + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              ((b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0));
            return f;
          }
        }),
        (e.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = a.className + " " + this.config.animateClass),
            null != this.config.callback && this.config.callback(a),
            this.util().emitEvent(a, this.wowEvent),
            this.util().addEvent(a, "animationend", this.resetAnimation),
            this.util().addEvent(a, "oanimationend", this.resetAnimation),
            this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
            a
          );
        }),
        (e.prototype.applyStyle = function (a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this),
            )
          );
        }),
        (e.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (e.prototype.resetStyle = function () {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            ((a = d[b]), e.push((a.style.visibility = "visible")));
          return e;
        }),
        (e.prototype.resetAnimation = function (a) {
          var b;
          return a.type.toLowerCase().indexOf("animationend") >= 0
            ? ((b = a.target || a.srcElement),
              (b.className = b.className
                .replace(this.config.animateClass, "")
                .trim()))
            : void 0;
        }),
        (e.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (e.prototype.vendors = ["moz", "webkit"]),
        (e.prototype.vendorSet = function (a, b) {
          var c, d, e, f;
          d = [];
          for (c in b)
            ((e = b[c]),
              (a["" + c] = e),
              d.push(
                function () {
                  var b, d, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, d = g.length;
                    d > b;
                    b++
                  )
                    ((f = g[b]),
                      h.push(
                        (a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] =
                          e),
                      ));
                  return h;
                }.call(this),
              ));
          return d;
        }),
        (e.prototype.vendorCSS = function (a, b) {
          var c, e, f, g, h, i;
          for (
            h = d(a),
              g = h.getPropertyCSSValue(b),
              f = this.vendors,
              c = 0,
              e = f.length;
            e > c;
            c++
          )
            ((i = f[c]), (g = g || h.getPropertyCSSValue("-" + i + "-" + b)));
          return g;
        }),
        (e.prototype.animationName = function (a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = d(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (e.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (e.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (e.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (e.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                ((a = d[b]),
                  a && (this.isVisible(a) ? this.show(a) : e.push(a)));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (e.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (e.prototype.isVisible = function (a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f =
              (this.config.scrollContainer &&
                this.config.scrollContainer.scrollTop) ||
              window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (e.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (e.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        e
      );
    })()));
}).call(this);

/* Waypoint js */
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    ((this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = t.Context.findOrCreateByElement(this.options.context)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (i[this.key] = this),
      (e += 1));
  }
  var e = 0,
    i = {};
  ((t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      (this.context.remove(this), this.group.remove(this), delete i[this.key]);
    }),
    (t.prototype.disable = function () {
      return ((this.enabled = !1), this);
    }),
    (t.prototype.enable = function () {
      return (this.context.refresh(), (this.enabled = !0), this);
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.Context.refreshAll();
      for (var e in i) i[e].enabled = !0;
      return this;
    }),
    (t.refreshAll = function () {
      t.Context.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t));
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      ((this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-context-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (o[t.waypointContextKey] = this),
        (i += 1),
        n.windowContext ||
          ((n.windowContext = !0), (n.windowContext = new e(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler());
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    ((e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      ((this.waypoints[e][t.key] = t), this.refresh());
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          (e.handleResize(), (e.didResize = !1));
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          (e.handleScroll(), (e.didScroll = !1));
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s];
            if (null !== a.triggerPoint) {
              var l = o.oldScroll < a.triggerPoint,
                h = o.newScroll >= a.triggerPoint,
                p = l && h,
                u = !l && !h;
              (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
            }
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        (delete this.waypoints[t.axis][t.key], this.checkEmpty());
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
        (this.handleScroll(),
          (t = {
            horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          }));
        for (var r in t) {
          var s = t[r];
          for (var a in this.waypoints[r]) {
            var l,
              h,
              p,
              u,
              c,
              d = this.waypoints[r][a],
              f = d.options.offset,
              w = d.triggerPoint,
              y = 0,
              g = null == w;
            (d.element !== d.element.window &&
              (y = d.adapter.offset()[s.offsetProp]),
              "function" == typeof f
                ? (f = f.apply(d))
                : "string" == typeof f &&
                  ((f = parseFloat(f)),
                  d.options.offset.indexOf("%") > -1 &&
                    (f = Math.ceil((s.contextDimension * f) / 100))),
              (l = s.contextScroll - s.contextOffset),
              (d.triggerPoint = Math.floor(y + l - f)),
              (h = w < s.oldScroll),
              (p = d.triggerPoint >= s.oldScroll),
              (u = h && p),
              (c = !h && !p),
              !g && u
                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                : !g && c
                  ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                  : g &&
                    s.oldScroll >= d.triggerPoint &&
                    (d.queueTrigger(s.forward), (o[d.group.id] = d.group)));
          }
        }
        return (
          n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointContextKey];
      }),
      (window.onload = function () {
        (r && r(), e.refreshAll());
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.Context = e));
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      ((this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this));
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    ((i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i));
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    (e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      },
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t));
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            ("string" == typeof n.context &&
              (n.context = t(this).closest(n.context)[0]),
              i.push(new e(n)));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    (window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto)));
  })());

/* CounterUp */
/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */
!(function (t) {
  "use strict";
  t.fn.counterUp = function (e) {
    var n = t.extend({ time: 400, delay: 10 }, e);
    return this.each(function () {
      var e = t(this),
        u = n,
        a = function () {
          var t = [],
            n = u.time / u.delay,
            a = e.text(),
            r = /[0-9]+,[0-9]+/.test(a);
          a = a.replace(/,/g, "");
          for (
            var o = (/^[0-9]+$/.test(a), /^[0-9]+\.[0-9]+$/.test(a)),
              c = o ? (a.split(".")[1] || []).length : 0,
              s = n;
            s >= 1;
            s--
          ) {
            var d = parseInt((a / n) * s);
            if ((o && (d = parseFloat((a / n) * s).toFixed(c)), r))
              for (; /(\d+)(\d{3})/.test(d.toString()); )
                d = d.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            t.unshift(d);
          }
          (e.data("counterup-nums", t), e.text("0"));
          var i = function () {
            e.data("counterup-nums") &&
              (e.text(e.data("counterup-nums").shift()),
              e.data("counterup-nums").length
                ? setTimeout(e.data("counterup-func"), u.delay)
                : (delete e.data("counterup-nums"),
                  e.data("counterup-nums", null),
                  e.data("counterup-func", null)));
          };
          (e.data("counterup-func", i),
            setTimeout(e.data("counterup-func"), u.delay));
        };
      e.waypoint(a, { offset: "100%", triggerOnce: !0 });
    });
  };
})(jQuery);

/* Animated Headline */
jQuery(document).ready(function (s) {
  function e() {
    (a(s(".cd-headline.letters").find("b")), n(s(".cd-headline")));
  }
  function a(e) {
    e.each(function () {
      var e = s(this),
        a = e.text().split(""),
        n = e.hasClass("is-visible");
      for (i in a)
        (e.parents(".rotate-2").length > 0 && (a[i] = "<em>" + a[i] + "</em>"),
          (a[i] = n
            ? '<i class="in">' + a[i] + "</i>"
            : "<i>" + a[i] + "</i>"));
      var t = a.join("");
      e.html(t).css("opacity", 1);
    });
  }
  function n(i) {
    var e = h;
    i.each(function () {
      var i = s(this);
      if (i.hasClass("loading-bar"))
        ((e = u),
          setTimeout(function () {
            i.find(".cd-words-wrapper").addClass("is-loading");
          }, p));
      else if (i.hasClass("clip")) {
        var a = i.find(".cd-words-wrapper"),
          n = a.width() + 10;
        a.css("width", n);
      } else if (!i.hasClass("type")) {
        var d = i.find(".cd-words-wrapper b"),
          l = 0;
        (d.each(function () {
          var i = s(this).width();
          i > l && (l = i);
        }),
          i.find(".cd-words-wrapper").css("width", l));
      }
      setTimeout(function () {
        t(i.find(".is-visible").eq(0));
      }, e);
    });
  }
  function t(s) {
    var i = o(s);
    if (s.parents(".cd-headline").hasClass("type")) {
      var e = s.parent(".cd-words-wrapper");
      (e.addClass("selected").removeClass("waiting"),
        setTimeout(function () {
          (e.removeClass("selected"),
            s
              .removeClass("is-visible")
              .addClass("is-hidden")
              .children("i")
              .removeClass("in")
              .addClass("out"));
        }, m),
        setTimeout(function () {
          d(i, C);
        }, w));
    } else if (s.parents(".cd-headline").hasClass("letters")) {
      var a = s.children("i").length >= i.children("i").length ? !0 : !1;
      (l(s.find("i").eq(0), s, a, f), r(i.find("i").eq(0), i, a, f));
    } else
      s.parents(".cd-headline").hasClass("clip")
        ? s
            .parents(".cd-words-wrapper")
            .animate({ width: "2px" }, v, function () {
              (c(s, i), d(i));
            })
        : s.parents(".cd-headline").hasClass("loading-bar")
          ? (s.parents(".cd-words-wrapper").removeClass("is-loading"),
            c(s, i),
            setTimeout(function () {
              t(i);
            }, u),
            setTimeout(function () {
              s.parents(".cd-words-wrapper").addClass("is-loading");
            }, p))
          : (c(s, i),
            setTimeout(function () {
              t(i);
            }, h));
  }
  function d(s, i) {
    s.parents(".cd-headline").hasClass("type")
      ? (r(s.find("i").eq(0), s, !1, i),
        s.addClass("is-visible").removeClass("is-hidden"))
      : s.parents(".cd-headline").hasClass("clip") &&
        s
          .parents(".cd-words-wrapper")
          .animate({ width: s.width() + 10 }, v, function () {
            setTimeout(function () {
              t(s);
            }, T);
          });
  }
  function l(i, e, a, n) {
    if (
      (i.removeClass("in").addClass("out"),
      i.is(":last-child")
        ? a &&
          setTimeout(function () {
            t(o(e));
          }, h)
        : setTimeout(function () {
            l(i.next(), e, a, n);
          }, n),
      i.is(":last-child") && s("html").hasClass("no-csstransitions"))
    ) {
      var d = o(e);
      c(e, d);
    }
  }
  function r(s, i, e, a) {
    (s.addClass("in").removeClass("out"),
      s.is(":last-child")
        ? (i.parents(".cd-headline").hasClass("type") &&
            setTimeout(function () {
              i.parents(".cd-words-wrapper").addClass("waiting");
            }, 200),
          e ||
            setTimeout(function () {
              t(i);
            }, h))
        : setTimeout(function () {
            r(s.next(), i, e, a);
          }, a));
  }
  function o(s) {
    return s.is(":last-child") ? s.parent().children().eq(0) : s.next();
  }
  function c(s, i) {
    (s.removeClass("is-visible").addClass("is-hidden"),
      i.removeClass("is-hidden").addClass("is-visible"));
  }
  var h = 2500,
    u = 3800,
    p = u - 3e3,
    f = 50,
    C = 150,
    m = 500,
    w = m + 800,
    v = 600,
    T = 1500;
  e();
});

/* Videopopup */
/*
	Name: YouTubePopUp
	Description: jQuery plugin to display YouTube or Vimeo video in PopUp, responsive and retina, easy to use.
	Version: 1.1.1
	Plugin URL: http://wp-time.com/youtube-popup-jquery-plugin/
	Written By: Qassim Hassan
	Twitter: @QQQHZ
	Websites: wp-time.com | qass.im | wp-plugins.in
	Dual licensed under the MIT and GPL licenses:
		http://www.opensource.org/licenses/mit-license.php
		http://www.gnu.org/licenses/gpl.html
	Copyright (c) 2016 - Qassim Hassan
*/
!(function (o) {
  o.fn.YouTubePopUp = function (e) {
    var u = o.extend({ autoplay: 1 }, e);
    (o(this).on("click", function (e) {
      var a = o(this).attr("href");
      if (a.match(/(youtube.com)/))
        var p = "v=",
          t = 1;
      if (a.match(/(youtu.be)/) || a.match(/(vimeo.com\/)+[0-9]/))
        var p = "/",
          t = 3;
      if (a.match(/(vimeo.com\/)+[a-zA-Z]/))
        var p = "/",
          t = 5;
      var i = a.split(p)[t],
        c = i.replace(/(&)+(.*)/, "");
      if (a.match(/(youtu.be)/) || a.match(/(youtube.com)/))
        var m =
          "https://www.youtube.com/embed/" + c + "?autoplay=" + u.autoplay;
      if (a.match(/(vimeo.com\/)+[0-9]/) || a.match(/(vimeo.com\/)+[a-zA-Z]/))
        var m =
          "https://player.vimeo.com/video/" + c + "?autoplay=" + u.autoplay;
      (o("body").append(
        '<div class="YouTubePopUp-Wrap YouTubePopUp-animation"><div class="YouTubePopUp-Content"><span class="YouTubePopUp-Close"></span><iframe src="' +
          m +
          '" allowfullscreen></iframe></div></div>',
      ),
        o(".YouTubePopUp-Wrap").hasClass("YouTubePopUp-animation") &&
          setTimeout(function () {
            o(".YouTubePopUp-Wrap").removeClass("YouTubePopUp-animation");
          }, 600),
        o(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(function () {
          o(".YouTubePopUp-Wrap")
            .addClass("YouTubePopUp-Hide")
            .delay(515)
            .queue(function () {
              o(this).remove();
            });
        }),
        e.preventDefault());
    }),
      o(document).keyup(function (e) {
        27 == e.keyCode && o(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click();
      }));
  };
})(jQuery);

/* Calender */
if (typeof jQuery == "undefined") {
  throw new Error("jQuery is not loaded");
}
$.fn.zabuto_calendar = function (b) {
  var c = $.extend({}, $.fn.zabuto_calendar_defaults(), b);
  var a = $.fn.zabuto_calendar_language(c.language);
  c = $.extend({}, c, a);
  this.each(function () {
    var i = $(this);
    i.attr(
      "id",
      "zabuto_calendar_" + Math.floor(Math.random() * 99999).toString(36),
    );
    i.data("initYear", c.year);
    i.data("initMonth", c.month);
    i.data("monthLabels", c.month_labels);
    i.data("weekStartsOn", c.weekstartson);
    i.data("navIcons", c.nav_icon);
    i.data("dowLabels", c.dow_labels);
    i.data("showToday", c.today);
    i.data("showDays", c.show_days);
    i.data("showPrevious", c.show_previous);
    i.data("showNext", c.show_next);
    i.data("cellBorder", c.cell_border);
    i.data("jsonData", c.data);
    i.data("ajaxSettings", c.ajax);
    i.data("legendList", c.legend);
    i.data("actionFunction", c.action);
    i.data("actionNavFunction", c.action_nav);
    k();
    function k() {
      var x = parseInt(i.data("initYear"));
      var A = parseInt(i.data("initMonth")) - 1;
      var C = new Date(x, A, 1, 0, 0, 0, 0);
      i.data("initDate", C);
      var D = i.data("cellBorder") === true ? " table-bordered" : "";
      var B = $('<table class="table' + D + '"></table>');
      B = u(i, B, C.getFullYear(), C.getMonth());
      var w = f(i);
      var y = $('<div class="zabuto_calendar"></div>');
      y.append(B);
      y.append(w);
      i.append(y);
      var z = i.data("jsonData");
      if (false !== z) {
        p(i, C.getFullYear(), C.getMonth());
      }
    }
    function u(y, A, x, z) {
      var w = new Date(x, z, 1, 0, 0, 0, 0);
      y.data("currDate", w);
      A.empty();
      A = q(y, A, x, z);
      A = d(y, A);
      A = o(y, A, x, z);
      p(y, x, z);
      return A;
    }
    function f(y) {
      var w = $('<div class="legend" id="' + y.attr("id") + '_legend"></div>');
      var x = y.data("legendList");
      if (typeof x == "object" && x.length > 0) {
        $(x).each(function (C, E) {
          if (typeof E == "object") {
            if ("type" in E) {
              var D = "";
              if ("label" in E) {
                D = E.label;
              }
              switch (E.type) {
                case "text":
                  if (D !== "") {
                    var B = "";
                    if ("badge" in E) {
                      if (typeof E.classname === "undefined") {
                        var F = "badge-event";
                      } else {
                        var F = E.classname;
                      }
                      B =
                        '<span class="badge ' + F + '">' + E.badge + "</span> ";
                    }
                    w.append(
                      '<span class="legend-' +
                        E.type +
                        '">' +
                        B +
                        D +
                        "</span>",
                    );
                  }
                  break;
                case "block":
                  if (D !== "") {
                    D = "<span>" + D + "</span>";
                  }
                  if (typeof E.classname === "undefined") {
                    var A = "event";
                  } else {
                    var A = "event-styled " + E.classname;
                  }
                  w.append(
                    '<span class="legend-' +
                      E.type +
                      '"><ul class="legend"><li class="' +
                      A +
                      '"></li></ul>' +
                      D +
                      "</span>",
                  );
                  break;
                case "list":
                  if (
                    "list" in E &&
                    typeof E.list == "object" &&
                    E.list.length > 0
                  ) {
                    var z = $('<ul class="legend"></ul>');
                    $(E.list).each(function (H, G) {
                      z.append('<li class="' + G + '"></li>');
                    });
                    w.append(z);
                  }
                  break;
                case "spacer":
                  w.append('<span class="legend-' + E.type + '"> </span>');
                  break;
              }
            }
          }
        });
      }
      return w;
    }
    function q(E, D, G, M) {
      var L = E.data("navIcons");
      var A = $(
        '<span><span class="glyphicon glyphicon-chevron-left"></span></span>',
      );
      var Q = $(
        '<span><span class="glyphicon glyphicon-chevron-right"></span></span>',
      );
      if (typeof L === "object") {
        if ("prev" in L) {
          A.html(L.prev);
        }
        if ("next" in L) {
          Q.html(L.next);
        }
      }
      var K = E.data("showPrevious");
      if (typeof K === "number" || K === false) {
        K = n(E.data("showPrevious"), true);
      }
      var w = $('<div class="calendar-month-navigation"></div>');
      w.attr("id", E.attr("id") + "_nav-prev");
      w.data("navigation", "prev");
      if (K !== false) {
        var N = M - 1;
        var F = G;
        if (N == -1) {
          F = F - 1;
          N = 11;
        }
        w.data("to", { year: F, month: N + 1 });
        w.append(A);
        if (typeof E.data("actionNavFunction") === "function") {
          w.click(E.data("actionNavFunction"));
        }
        w.click(function (R) {
          u(E, D, F, N);
        });
      }
      var C = E.data("showNext");
      if (typeof C === "number" || C === false) {
        C = n(E.data("showNext"), false);
      }
      var z = $('<div class="calendar-month-navigation"></div>');
      z.attr("id", E.attr("id") + "_nav-next");
      z.data("navigation", "next");
      if (C !== false) {
        var x = M + 1;
        var P = G;
        if (x == 12) {
          P = P + 1;
          x = 0;
        }
        z.data("to", { year: P, month: x + 1 });
        z.append(Q);
        if (typeof E.data("actionNavFunction") === "function") {
          z.click(E.data("actionNavFunction"));
        }
        z.click(function (R) {
          u(E, D, P, x);
        });
      }
      var B = E.data("monthLabels");
      var J = $("<td></td>").append(w);
      var O = $("<td></td>").append(z);
      var H = $("<span>" + B[M] + " " + G + "</span>");
      H.dblclick(function () {
        var R = E.data("initDate");
        u(E, D, R.getFullYear(), R.getMonth());
      });
      var I = $('<td colspan="5"></td>');
      I.append(H);
      var y = $('<tr class="calendar-month-header"></tr>');
      y.append(J, I, O);
      D.append(y);
      return D;
    }
    function d(z, B) {
      if (z.data("showDays") === true) {
        var w = z.data("weekStartsOn");
        var x = z.data("dowLabels");
        if (w === 0) {
          var A = $.extend([], x);
          var C = new Array(A.pop());
          x = C.concat(A);
        }
        var y = $('<tr class="calendar-dow-header"></tr>');
        $(x).each(function (D, E) {
          y.append("<th>" + E + "</th>");
        });
        B.append(y);
      }
      return B;
    }
    function o(E, D, G, L) {
      var C = E.data("ajaxSettings");
      var F = r(G, L);
      var w = m(G, L);
      var B = h(G, L, 1);
      var N = h(G, L, w);
      var A = 1;
      var z = E.data("weekStartsOn");
      if (z === 0) {
        if (N == 6) {
          F++;
        }
        if (B == 6 && (N == 0 || N == 1 || N == 5)) {
          F--;
        }
        B++;
        if (B == 7) {
          B = 0;
        }
      }
      for (var y = 0; y < F; y++) {
        var x = $('<tr class="calendar-dow"></tr>');
        for (var I = 0; I < 7; I++) {
          if (I < B || A > w) {
            x.append("<td></td>");
          } else {
            var M = E.attr("id") + "_" + j(G, L, A);
            var K = M + "_day";
            var J = $('<div id="' + K + '" class="day" >' + A + "</div>");
            J.data("day", A);
            if (v(G, L, A)) {
              J.addClass("today");
              if (E.data("showToday") === true) {
                J.html('<span class="badge badge-today">' + A + "</span>");
              }
            }
            var H = $('<td id="' + M + '"></td>');
            H.append(J);
            H.data("date", j(G, L, A));
            H.data("hasEvent", false);
            if (typeof E.data("actionFunction") === "function") {
              H.addClass("dow-clickable");
              H.click(function () {
                E.data("selectedDate", $(this).data("date"));
              });
              H.click(E.data("actionFunction"));
            }
            x.append(H);
            A++;
          }
          if (I == 6) {
            B = 0;
          }
        }
        D.append(x);
      }
      return D;
    }
    function g(z, F, E, H) {
      var G = $(
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
      );
      var y = $(
        '<h4 class="modal-title" id="' + z + '_modal_title">' + F + "</h4>",
      );
      var I = $('<div class="modal-header"></div>');
      I.append(G);
      I.append(y);
      var D = $(
        '<div class="modal-body" id="' + z + '_modal_body">' + E + "</div>",
      );
      var C = $('<div class="modal-footer" id="' + z + '_modal_footer"></div>');
      if (typeof H !== "undefined") {
        var x = $("<div>" + H + "</div>");
        C.append(x);
      }
      var A = $('<div class="modal-content"></div>');
      A.append(I);
      A.append(D);
      A.append(C);
      var w = $('<div class="modal-dialog"></div>');
      w.append(A);
      var B = $(
        '<div class="modal fade" id="' +
          z +
          '_modal" tabindex="-1" role="dialog" aria-labelledby="' +
          z +
          '_modal_title" aria-hidden="true"></div>',
      );
      B.append(w);
      B.data("dateId", z);
      B.attr("dateId", z);
      return B;
    }
    function p(y, x, A) {
      var w = y.data("jsonData");
      var z = y.data("ajaxSettings");
      y.data("events", false);
      if (false !== w) {
        return l(y);
      } else {
        if (false !== z) {
          return s(y, x, A);
        }
      }
      return true;
    }
    function l(x) {
      var w = x.data("jsonData");
      x.data("events", w);
      e(x, "json");
      return true;
    }
    function s(x, w, A) {
      var z = x.data("ajaxSettings");
      if (typeof z != "object" || typeof z.url == "undefined") {
        alert("Invalid calendar event settings");
        return false;
      }
      var y = { year: w, month: A + 1 };
      $.ajax({ type: "GET", url: z.url, data: y, dataType: "json" }).done(
        function (B) {
          var C = [];
          $.each(B, function (E, D) {
            C.push(B[E]);
          });
          x.data("events", C);
          e(x, "ajax");
        },
      );
      return true;
    }
    function e(z, y) {
      var x = z.data("jsonData");
      var A = z.data("ajaxSettings");
      var w = z.data("events");
      if (w !== false) {
        $(w).each(function (F, H) {
          var B = z.attr("id") + "_" + H.date;
          var D = $("#" + B);
          var I = $("#" + B + "_day");
          D.data("hasEvent", true);
          if (typeof H.title !== "undefined") {
            D.attr("title", H.title);
          }
          if (typeof H.classname === "undefined") {
            D.addClass("event");
          } else {
            D.addClass("event-styled");
            I.addClass(H.classname);
          }
          if (typeof H.badge !== "undefined" && H.badge !== false) {
            var C = H.badge === true ? "" : " badge-" + H.badge;
            var E = I.data("day");
            I.html('<span class="badge badge-event' + C + '">' + E + "</span>");
          }
          if (typeof H.body !== "undefined") {
            var G = false;
            if (
              y === "json" &&
              typeof H.modal !== "undefined" &&
              H.modal === true
            ) {
              G = true;
            } else {
              if (y === "ajax" && "modal" in A && A.modal === true) {
                G = true;
              }
            }
            if (G === true) {
              D.addClass("event-clickable");
              var J = g(B, H.title, H.body, H.footer);
              $("body").append(J);
              $("#" + B).click(function () {
                $("#" + B + "_modal").modal();
              });
            }
          }
        });
      }
    }
    function v(y, z, x) {
      var A = new Date();
      var w = new Date(y, z, x);
      return w.toDateString() == A.toDateString();
    }
    function j(y, z, x) {
      var w, A;
      A = x < 10 ? "0" + x : x;
      w = z + 1;
      w = w < 10 ? "0" + w : w;
      return y + "-" + w + "-" + A;
    }
    function h(y, z, x) {
      var w = new Date(y, z, x, 0, 0, 0, 0);
      var A = w.getDay();
      if (A == 0) {
        A = 6;
      } else {
        A--;
      }
      return A;
    }
    function m(x, y) {
      var w = 28;
      while (t(x, y + 1, w + 1)) {
        w++;
      }
      return w;
    }
    function r(y, A) {
      var w = m(y, A);
      var C = h(y, A, 1);
      var z = h(y, A, w);
      var B = w;
      var x = C - z;
      if (x > 0) {
        B += x;
      }
      return Math.ceil(B / 7);
    }
    function t(z, w, x) {
      return (
        w > 0 &&
        w < 13 &&
        z > 0 &&
        z < 32768 &&
        x > 0 &&
        x <= new Date(z, w, 0).getDate()
      );
    }
    function n(y, A) {
      if (y === false) {
        y = 0;
      }
      var z = i.data("currDate");
      var x = i.data("initDate");
      var w;
      w = (x.getFullYear() - z.getFullYear()) * 12;
      w -= z.getMonth() + 1;
      w += x.getMonth();
      if (A === true) {
        if (w < parseInt(y) - 1) {
          return true;
        }
      } else {
        if (w >= 0 - parseInt(y)) {
          return true;
        }
      }
      return false;
    }
  });
  return this;
};
$.fn.zabuto_calendar_defaults = function () {
  var a = new Date();
  var c = a.getFullYear();
  var d = a.getMonth() + 1;
  var b = {
    language: false,
    year: c,
    month: d,
    show_previous: true,
    show_next: true,
    cell_border: false,
    today: false,
    show_days: true,
    weekstartson: 1,
    nav_icon: false,
    data: false,
    ajax: false,
    legend: false,
    action: false,
    action_nav: false,
  };
  return b;
};
$.fn.zabuto_calendar_language = function (a) {
  if (typeof a == "undefined" || a === false) {
    a = "en";
  }
  switch (a.toLowerCase()) {
    case "ar":
      return {
        month_labels: [
          "ÙŠÙ†Ø§ÙŠØ±",
          "ÙØ¨Ø±Ø§ÙŠØ±",
          "Ù…Ø§Ø±Ø³",
          "Ø£Ø¨Ø±ÙŠÙ„",
          "Ù…Ø§ÙŠÙˆ",
          "ÙŠÙˆÙ†ÙŠÙˆ",
          "ÙŠÙˆÙ„ÙŠÙˆ",
          "Ø£ØºØ³Ø·Ø³",
          "Ø³Ø¨ØªÙ…Ø¨Ø±",
          "Ø£ÙƒØªÙˆØ¨Ø±",
          "Ù†ÙˆÙÙ…Ø¨Ø±",
          "Ø¯ÙŠØ³Ù…Ø¨Ø±",
        ],
        dow_labels: [
          "Ø£Ø«Ù†ÙŠÙ†",
          "Ø«Ù„Ø§Ø«Ø§Ø¡",
          "Ø§Ø±Ø¨Ø¹Ø§Ø¡",
          "Ø®Ù…ÙŠØ³",
          "Ø¬Ù…Ø¹Ù‡",
          "Ø³Ø¨Øª",
          "Ø£Ø­Ø¯",
        ],
      };
      break;
    case "az":
      return {
        month_labels: [
          "Yanvar",
          "Fevral",
          "Mart",
          "Aprel",
          "May",
          "Ä°yun",
          "Ä°yul",
          "Avqust",
          "Sentyabr",
          "Oktyabr",
          "Noyabr",
          "Dekabr",
        ],
        dow_labels: ["B.e", "Ã‡.A", "Ã‡É™rÅŸ", "C.A", "CÃ¼mÉ™", "ÅžÉ™n", "Baz"],
      };
      break;
    case "cn":
      return {
        month_labels: [
          "ä¸€æœˆ",
          "äºŒæœˆ",
          "ä¸‰æœˆ",
          "å››æœˆ",
          "äº”æœˆ",
          "å…­æœˆ",
          "ä¸ƒæœˆ",
          "å…«æœˆ",
          "ä¹æœˆ",
          "åæœˆ",
          "åä¸€æœˆ",
          "åäºŒæœˆ",
        ],
        dow_labels: [
          "æ˜ŸæœŸä¸€",
          "æ˜ŸæœŸäºŒ",
          "æ˜ŸæœŸä¸‰",
          "æ˜ŸæœŸå››",
          "æ˜ŸæœŸäº”",
          "æ˜ŸæœŸå…­",
          "æ˜ŸæœŸæ—¥",
        ],
      };
      break;
    case "cs":
      return {
        month_labels: [
          "Leden",
          "Ãšnor",
          "BÅ™ezen",
          "Duben",
          "KvÄ›ten",
          "ÄŒerven",
          "ÄŒervenec",
          "Srpen",
          "ZÃ¡Å™Ã­",
          "Å˜Ã­jen",
          "Listopad",
          "Prosinec",
        ],
        dow_labels: ["Po", "Ãšt", "St", "ÄŒt", "PÃ¡", "So", "Ne"],
      };
      break;
    case "de":
      return {
        month_labels: [
          "Januar",
          "Februar",
          "MÃ¤rz",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
        ],
        dow_labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
      };
      break;
    case "en":
      return {
        month_labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        dow_labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      };
      break;
    case "he":
      return {
        month_labels: [
          "×™× ×•××¨",
          "×¤×‘×¨×•××¨",
          "×ž×¨×¥",
          "××¤×¨×™×œ",
          "×ž××™",
          "×™×•× ×™",
          "×™×•×œ×™",
          "××•×’×•×¡×˜",
          "×¡×¤×˜×ž×‘×¨",
          "××•×§×˜×•×‘×¨",
          "× ×•×‘×ž×‘×¨",
          "×“×¦×ž×‘×¨",
        ],
        dow_labels: ["×‘", "×’", "×“", "×”", "×•", "×©", "×"],
      };
      break;
    case "es":
      return {
        month_labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        dow_labels: ["Lu", "Ma", "Mi", "Ju", "Vi", "SÃ¡", "Do"],
      };
      break;
    case "fi":
      return {
        month_labels: [
          "Tammikuu",
          "Helmikuu",
          "Maaliskuu",
          "Huhtikuu",
          "Toukokuu",
          "KesÃ¤kuu",
          "HeinÃ¤kuu",
          "Elokuu",
          "Syyskuu",
          "Lokakuu",
          "Marraskuu",
          "Joulukuu",
        ],
        dow_labels: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
      };
      break;
    case "fr":
      return {
        month_labels: [
          "Janvier",
          "FÃ©vrier",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "AoÃ»t",
          "Septembre",
          "Octobre",
          "Novembre",
          "DÃ©cembre",
        ],
        dow_labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      };
      break;
    case "hu":
      return {
        month_labels: [
          "JanuÃ¡r",
          "FebruÃ¡r",
          "MÃ¡rcius",
          "Ãprilis",
          "MÃ¡jus",
          "JÃºnius",
          "JÃºlius",
          "Augusztus",
          "Szeptember",
          "OktÃ³ber",
          "November",
          "December",
        ],
        dow_labels: ["HÃ©", "Ke", "Sze", "Cs", "PÃ©", "Szo", "Va"],
      };
      break;
    case "id":
      return {
        month_labels: [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ],
        dow_labels: [
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jum'at",
          "Sabtu",
          "Minggu",
        ],
      };
      break;
    case "it":
      return {
        month_labels: [
          "Gennaio",
          "Febbraio",
          "Marzo",
          "Aprile",
          "Maggio",
          "Giugno",
          "Luglio",
          "Agosto",
          "Settembre",
          "Ottobre",
          "Novembre",
          "Dicembre",
        ],
        dow_labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
      };
      break;
    case "jp":
      return {
        month_labels: [
          "1æœˆ",
          "2æœˆ",
          "3æœˆ",
          "4æœˆ",
          "5æœˆ",
          "6æœˆ",
          "7æœˆ",
          "8æœˆ",
          "9æœˆ",
          "10æœˆ",
          "11æœˆ",
          "12æœˆ",
        ],
        dow_labels: ["æœˆ", "ç«", "æ°´", "æœ¨", "é‡‘", "åœŸ", "æ—¥"],
      };
      break;
    case "nl":
      return {
        month_labels: [
          "Januari",
          "Februari",
          "Maart",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Augustus",
          "September",
          "Oktober",
          "November",
          "December",
        ],
        dow_labels: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
      };
      break;
    case "no":
      return {
        month_labels: [
          "Januar",
          "Februar",
          "Mars",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Desember",
        ],
        dow_labels: ["Ma", "Ti", "On", "To", "Fr", "L\u00f8", "S\u00f8"],
      };
      break;
    case "pl":
      return {
        month_labels: [
          "StyczeÅ„",
          "Luty",
          "Marzec",
          "KwiecieÅ„",
          "Maj",
          "Czerwiec",
          "Lipiec",
          "SierpieÅ„",
          "WrzesieÅ„",
          "PaÅºdziernik",
          "Listopad",
          "GrudzieÅ„",
        ],
        dow_labels: ["pon.", "wt.", "Å›r.", "czw.", "pt.", "sob.", "niedz."],
      };
      break;
    case "pt":
      return {
        month_labels: [
          "Janeiro",
          "Fevereiro",
          "Marco",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        dow_labels: ["S", "T", "Q", "Q", "S", "S", "D"],
      };
      break;
    case "ru":
      return {
        month_labels: [
          "Ð¯Ð½Ð²Ð°Ñ€ÑŒ",
          "Ð¤ÐµÐ²Ñ€Ð°Ð»ÑŒ",
          "ÐœÐ°Ñ€Ñ‚",
          "ÐÐ¿Ñ€ÐµÐ»ÑŒ",
          "ÐœÐ°Ð¹",
          "Ð˜ÑŽÐ½ÑŒ",
          "Ð˜ÑŽÐ»ÑŒ",
          "ÐÐ²Ð³ÑƒÑÑ‚",
          "Ð¡ÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ",
          "ÐžÐºÑ‚ÑÐ±Ñ€ÑŒ",
          "ÐÐ¾ÑÐ±Ñ€ÑŒ",
          "Ð”ÐµÐºÐ°Ð±Ñ€ÑŒ",
        ],
        dow_labels: ["ÐŸÐ½", "Ð’Ñ‚", "Ð¡Ñ€", "Ð§Ñ‚", "ÐŸÑ‚", "Ð¡Ð±", "Ð’ÑÐº"],
      };
      break;
    case "se":
      return {
        month_labels: [
          "Januari",
          "Februari",
          "Mars",
          "April",
          "Maj",
          "Juni",
          "Juli",
          "Augusti",
          "September",
          "Oktober",
          "November",
          "December",
        ],
        dow_labels: ["MÃ¥n", "Tis", "Ons", "Tor", "Fre", "LÃ¶r", "SÃ¶n"],
      };
      break;
    case "sk":
      return {
        month_labels: [
          "JanuÃ¡r",
          "FebruÃ¡r",
          "Marec",
          "AprÃ­l",
          "MÃ¡j",
          "JÃºn",
          "JÃºl",
          "August",
          "September",
          "OktÃ³ber",
          "November",
          "December",
        ],
        dow_labels: ["Po", "Ut", "St", "Å t", "Pi", "So", "Ne"],
      };
      break;
    case "tr":
      return {
        month_labels: [
          "Ocak",
          "Åžubat",
          "Mart",
          "Nisan",
          "MayÄ±s",
          "Haziran",
          "Temmuz",
          "AÄŸustos",
          "EylÃ¼l",
          "Ekim",
          "KasÄ±m",
          "AralÄ±k",
        ],
        dow_labels: ["Pts", "SalÄ±", "Ã‡ar", "Per", "Cuma", "Cts", "Paz"],
      };
      break;
    case "ua":
      return {
        month_labels: [
          "Ð¡Ñ–Ñ‡ÐµÐ½ÑŒ",
          "Ð›ÑŽÑ‚Ð¸Ð¹",
          "Ð‘ÐµÑ€ÐµÐ·ÐµÐ½ÑŒ",
          "ÐšÐ²Ñ–Ñ‚ÐµÐ½ÑŒ",
          "Ð¢Ñ€Ð°Ð²ÐµÐ½ÑŒ",
          "Ð§ÐµÑ€Ð²ÐµÐ½ÑŒ",
          "Ð›Ð¸Ð¿ÐµÐ½ÑŒ",
          "Ð¡ÐµÑ€Ð¿ÐµÐ½ÑŒ",
          "Ð’ÐµÑ€ÐµÑÐµÐ½ÑŒ",
          "Ð–Ð¾Ð²Ñ‚ÐµÐ½ÑŒ",
          "Ð›Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´",
          "Ð“Ñ€ÑƒÐ´ÐµÐ½ÑŒ",
        ],
        dow_labels: ["ÐŸÐ½", "Ð’Ñ‚", "Ð¡Ñ€", "Ð§Ñ‚", "ÐŸÑ‚", "Ð¡Ð±", "ÐÐ´"],
      };
      break;
  }
};

/* Video Player */
/*
// Plyr
// plyr.js v2.0.18
// https://github.com/sampotts/plyr
// License: The MIT License (MIT)
// Credits: http://paypal.github.io/accessible-html5-video-player
*/

(!(function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = t(e, document))
    : "function" == typeof define && define.amd
      ? define([], function () {
          return t(e, document);
        })
      : (e.plyr = t(e, document));
})("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";
  function n() {
    var e,
      n,
      r,
      a = navigator.userAgent,
      s = navigator.appName,
      o = "" + parseFloat(navigator.appVersion),
      i = parseInt(navigator.appVersion, 10),
      l = !1,
      u = !1,
      c = !1,
      d = !1;
    return (
      -1 !== navigator.appVersion.indexOf("Windows NT") &&
      -1 !== navigator.appVersion.indexOf("rv:11")
        ? ((l = !0), (s = "IE"), (o = "11"))
        : -1 !== (n = a.indexOf("MSIE"))
          ? ((l = !0), (s = "IE"), (o = a.substring(n + 5)))
          : -1 !== (n = a.indexOf("Chrome"))
            ? ((c = !0), (s = "Chrome"), (o = a.substring(n + 7)))
            : -1 !== (n = a.indexOf("Safari"))
              ? ((d = !0),
                (s = "Safari"),
                (o = a.substring(n + 7)),
                -1 !== (n = a.indexOf("Version")) && (o = a.substring(n + 8)))
              : -1 !== (n = a.indexOf("Firefox"))
                ? ((u = !0), (s = "Firefox"), (o = a.substring(n + 8)))
                : (e = a.lastIndexOf(" ") + 1) < (n = a.lastIndexOf("/")) &&
                  ((s = a.substring(e, n)),
                  (o = a.substring(n + 1)),
                  s.toLowerCase() === s.toUpperCase() &&
                    (s = navigator.appName)),
      -1 !== (r = o.indexOf(";")) && (o = o.substring(0, r)),
      -1 !== (r = o.indexOf(" ")) && (o = o.substring(0, r)),
      (i = parseInt("" + o, 10)),
      isNaN(i) &&
        ((o = "" + parseFloat(navigator.appVersion)),
        (i = parseInt(navigator.appVersion, 10))),
      {
        name: s,
        version: i,
        isIE: l,
        isFirefox: u,
        isChrome: c,
        isSafari: d,
        isIos: /(iPad|iPhone|iPod)/g.test(navigator.platform),
        isIphone: /(iPhone|iPod)/g.test(navigator.userAgent),
        isTouch: "ontouchstart" in t.documentElement,
      }
    );
  }
  function r(e, t) {
    var n = e.media;
    if ("video" === e.type)
      switch (t) {
        case "video/webm":
          return !(
            !n.canPlayType ||
            !n.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, "")
          );
        case "video/mp4":
          return !(
            !n.canPlayType ||
            !n
              .canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
              .replace(/no/, "")
          );
        case "video/ogg":
          return !(
            !n.canPlayType ||
            !n.canPlayType('video/ogg; codecs="theora"').replace(/no/, "")
          );
      }
    else if ("audio" === e.type)
      switch (t) {
        case "audio/mpeg":
          return !(
            !n.canPlayType || !n.canPlayType("audio/mpeg;").replace(/no/, "")
          );
        case "audio/ogg":
          return !(
            !n.canPlayType ||
            !n.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, "")
          );
        case "audio/wav":
          return !(
            !n.canPlayType ||
            !n.canPlayType('audio/wav; codecs="1"').replace(/no/, "")
          );
      }
    return !1;
  }
  function a(e) {
    if (!t.querySelectorAll('script[src="' + e + '"]').length) {
      var n = t.createElement("script");
      n.src = e;
      var r = t.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(n, r);
    }
  }
  function s(e, t) {
    return Array.prototype.indexOf && -1 !== e.indexOf(t);
  }
  function o(e, t, n) {
    return e.replace(
      new RegExp(t.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"),
      n,
    );
  }
  function i(e, t) {
    e.length || (e = [e]);
    for (var n = e.length - 1; n >= 0; n--) {
      var r = n > 0 ? t.cloneNode(!0) : t,
        a = e[n],
        s = a.parentNode,
        o = a.nextSibling;
      return (r.appendChild(a), o ? s.insertBefore(r, o) : s.appendChild(r), r);
    }
  }
  function l(e) {
    e && e.parentNode.removeChild(e);
  }
  function u(e, t) {
    e.insertBefore(t, e.firstChild);
  }
  function c(e, t) {
    for (var n in t) e.setAttribute(n, L["boolean"](t[n]) && t[n] ? "" : t[n]);
  }
  function d(e, n, r) {
    var a = t.createElement(e);
    (c(a, r), u(n, a));
  }
  function p(e) {
    return e.replace(".", "");
  }
  function m(e, t, n) {
    if (e)
      if (e.classList) e.classList[n ? "add" : "remove"](t);
      else {
        var r = (" " + e.className + " ")
          .replace(/\s+/g, " ")
          .replace(" " + t + " ", "");
        e.className = r + (n ? " " + t : "");
      }
  }
  function f(e, t) {
    return e
      ? e.classList
        ? e.classList.contains(t)
        : new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className)
      : !1;
  }
  function y(e, n) {
    var r = Element.prototype,
      a =
        r.matches ||
        r.webkitMatchesSelector ||
        r.mozMatchesSelector ||
        r.msMatchesSelector ||
        function (e) {
          return -1 !== [].indexOf.call(t.querySelectorAll(e), this);
        };
    return a.call(e, n);
  }
  function b(e, t, n, r, a) {
    (n &&
      g(
        e,
        t,
        function (t) {
          n.apply(e, [t]);
        },
        a,
      ),
      g(
        e,
        t,
        function (t) {
          r.apply(e, [t]);
        },
        a,
      ));
  }
  function v(e, t, n, r, a) {
    var s = t.split(" ");
    if ((L["boolean"](a) || (a = !1), e instanceof NodeList))
      for (var o = 0; o < e.length; o++)
        e[o] instanceof Node &&
          v(e[o], arguments[1], arguments[2], arguments[3]);
    else
      for (var i = 0; i < s.length; i++)
        e[r ? "addEventListener" : "removeEventListener"](s[i], n, a);
  }
  function g(e, t, n, r) {
    e && v(e, t, n, !0, r);
  }
  function h(e, t, n, r) {
    e && v(e, t, n, !1, r);
  }
  function k(e, t, n, r) {
    if (e && t) {
      L["boolean"](n) || (n = !1);
      var a = new CustomEvent(t, { bubbles: n, detail: r });
      e.dispatchEvent(a);
    }
  }
  function w(e, t) {
    return e
      ? ((t = L["boolean"](t) ? t : !e.getAttribute("aria-pressed")),
        e.setAttribute("aria-pressed", t),
        t)
      : void 0;
  }
  function x(e, t) {
    return 0 === e || 0 === t || isNaN(e) || isNaN(t)
      ? 0
      : ((e / t) * 100).toFixed(2);
  }
  function T() {
    var e = arguments;
    if (e.length) {
      if (1 === e.length) return e[0];
      for (
        var t = Array.prototype.shift.call(e), n = e.length, r = 0;
        n > r;
        r++
      ) {
        var a = e[r];
        for (var s in a)
          a[s] && a[s].constructor && a[s].constructor === Object
            ? ((t[s] = t[s] || {}), T(t[s], a[s]))
            : (t[s] = a[s]);
      }
      return t;
    }
  }
  function S(e) {
    var t = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    return e.match(t) ? RegExp.$2 : e;
  }
  function E(e) {
    var t = /^.*(vimeo.com\/|video\/)(\d+).*/;
    return e.match(t) ? RegExp.$2 : e;
  }
  function _() {
    var e = {
        supportsFullScreen: !1,
        isFullScreen: function () {
          return !1;
        },
        requestFullScreen: function () {},
        cancelFullScreen: function () {},
        fullScreenEventName: "",
        element: null,
        prefix: "",
      },
      n = "webkit o moz ms khtml".split(" ");
    if (L.undefined(t.cancelFullScreen))
      for (var r = 0, a = n.length; a > r; r++) {
        if (
          ((e.prefix = n[r]), !L.undefined(t[e.prefix + "CancelFullScreen"]))
        ) {
          e.supportsFullScreen = !0;
          break;
        }
        if (!L.undefined(t.msExitFullscreen) && t.msFullscreenEnabled) {
          ((e.prefix = "ms"), (e.supportsFullScreen = !0));
          break;
        }
      }
    else e.supportsFullScreen = !0;
    return (
      e.supportsFullScreen &&
        ((e.fullScreenEventName =
          "ms" === e.prefix
            ? "MSFullscreenChange"
            : e.prefix + "fullscreenchange"),
        (e.isFullScreen = function (e) {
          switch ((L.undefined(e) && (e = t.body), this.prefix)) {
            case "":
              return t.fullscreenElement === e;
            case "moz":
              return t.mozFullScreenElement === e;
            default:
              return t[this.prefix + "FullscreenElement"] === e;
          }
        }),
        (e.requestFullScreen = function (e) {
          return (
            L.undefined(e) && (e = t.body),
            "" === this.prefix
              ? e.requestFullScreen()
              : e[
                  this.prefix +
                    ("ms" === this.prefix
                      ? "RequestFullscreen"
                      : "RequestFullScreen")
                ]()
          );
        }),
        (e.cancelFullScreen = function () {
          return "" === this.prefix
            ? t.cancelFullScreen()
            : t[
                this.prefix +
                  ("ms" === this.prefix ? "ExitFullscreen" : "CancelFullScreen")
              ]();
        }),
        (e.element = function () {
          return "" === this.prefix
            ? t.fullscreenElement
            : t[this.prefix + "FullscreenElement"];
        })),
      e
    );
  }
  function C(v, C) {
    function I(e, t, n, r) {
      k(e, t, n, T({}, r, { plyr: Xe }));
    }
    function R(t, n) {
      C.debug &&
        e.console &&
        ((n = Array.prototype.slice.call(n)),
        L.string(C.logPrefix) && C.logPrefix.length && n.unshift(C.logPrefix),
        console[t].apply(console, n));
    }
    function V() {
      return {
        url: C.iconUrl,
        absolute:
          0 === C.iconUrl.indexOf("http") ||
          ($e.browser.isIE && !e.svg4everybody),
      };
    }
    function q() {
      var e = [],
        t = V(),
        n = (t.absolute ? "" : t.url) + "#" + C.iconPrefix;
      return (
        s(C.controls, "play-large") &&
          e.push(
            '<button type="button" data-plyr="play" class="plyr__play-large">',
            '<svg><use xlink:href="' + n + '-play" /></svg>',
            '<span class="plyr__sr-only">' + C.i18n.play + "</span>",
            "</button>",
          ),
        e.push('<div class="plyr__controls">'),
        s(C.controls, "restart") &&
          e.push(
            '<button type="button" data-plyr="restart">',
            '<svg><use xlink:href="' + n + '-restart" /></svg>',
            '<span class="plyr__sr-only">' + C.i18n.restart + "</span>",
            "</button>",
          ),
        s(C.controls, "rewind") &&
          e.push(
            '<button type="button" data-plyr="rewind">',
            '<svg><use xlink:href="' + n + '-rewind" /></svg>',
            '<span class="plyr__sr-only">' + C.i18n.rewind + "</span>",
            "</button>",
          ),
        s(C.controls, "play") &&
          e.push(
            '<button type="button" data-plyr="play">',
            '<svg><use xlink:href="' + n + '-play" /></svg>',
            '<span class="plyr__sr-only">' + C.i18n.play + "</span>",
            "</button>",
            '<button type="button" data-plyr="pause">',
            '<svg><use xlink:href="' + n + '-pause" /></svg>',
            '<span class="plyr__sr-only">' + C.i18n.pause + "</span>",
            "</button>",
          ),
        s(C.controls, "fast-forward") &&
          e.push(
            '<button type="button" data-plyr="fast-forward">',
            '<svg><use xlink:href="' + n + '-fast-forward" /></svg>',
            '<span class="plyr__sr-only">' + C.i18n.forward + "</span>",
            "</button>",
          ),
        s(C.controls, "progress") &&
          (e.push(
            '<span class="plyr__progress">',
            '<label for="seek{id}" class="plyr__sr-only">Seek</label>',
            '<input id="seek{id}" class="plyr__progress--seek" type="range" min="0" max="100" step="0.1" value="0" data-plyr="seek">',
            '<progress class="plyr__progress--played" max="100" value="0" role="presentation"></progress>',
            '<progress class="plyr__progress--buffer" max="100" value="0">',
            "<span>0</span>% " + C.i18n.buffered,
            "</progress>",
          ),
          C.tooltips.seek && e.push('<span class="plyr__tooltip">00:00</span>'),
          e.push("</span>")),
        s(C.controls, "current-time") &&
          e.push(
            '<span class="plyr__time">',
            '<span class="plyr__sr-only">' + C.i18n.currentTime + "</span>",
            '<span class="plyr__time--current">00:00</span>',
            "</span>",
          ),
        s(C.controls, "duration") &&
          e.push(
            '<span class="plyr__time">',
            '<span class="plyr__sr-only">' + C.i18n.duration + "</span>",
            '<span class="plyr__time--duration">00:00</span>',
            "</span>",
          ),
        s(C.controls, "mute") &&
          e.push(
            '<button type="button" data-plyr="mute">',
            '<svg class="icon--muted"><use xlink:href="' +
              n +
              '-muted" /></svg>',
            '<svg><use xlink:href="' + n + '-volume" /></svg>',
            '<span class="plyr__sr-only">' + C.i18n.toggleMute + "</span>",
            "</button>",
          ),
        s(C.controls, "volume") &&
          e.push(
            '<span class="plyr__volume">',
            '<label for="volume{id}" class="plyr__sr-only">' +
              C.i18n.volume +
              "</label>",
            '<input id="volume{id}" class="plyr__volume--input" type="range" min="' +
              C.volumeMin +
              '" max="' +
              C.volumeMax +
              '" value="' +
              C.volume +
              '" data-plyr="volume">',
            '<progress class="plyr__volume--display" max="' +
              C.volumeMax +
              '" value="' +
              C.volumeMin +
              '" role="presentation"></progress>',
            "</span>",
          ),
        s(C.controls, "captions") &&
          e.push(
            '<button type="button" data-plyr="captions">',
            '<svg class="icon--captions-on"><use xlink:href="' +
              n +
              '-captions-on" /></svg>',
            '<svg><use xlink:href="' + n + '-captions-off" /></svg>',
            '<span class="plyr__sr-only">' + C.i18n.toggleCaptions + "</span>",
            "</button>",
          ),
        s(C.controls, "fullscreen") &&
          e.push(
            '<button type="button" data-plyr="fullscreen">',
            '<svg class="icon--exit-fullscreen"><use xlink:href="' +
              n +
              '-exit-fullscreen" /></svg>',
            '<svg><use xlink:href="' + n + '-enter-fullscreen" /></svg>',
            '<span class="plyr__sr-only">' +
              C.i18n.toggleFullscreen +
              "</span>",
            "</button>",
          ),
        e.push("</div>"),
        e.join("")
      );
    }
    function D() {
      if (
        $e.supported.full &&
        ("audio" !== $e.type || C.fullscreen.allowAudio) &&
        C.fullscreen.enabled
      ) {
        var e = P.supportsFullScreen;
        (e || (C.fullscreen.fallback && !$())
          ? (Ge((e ? "Native" : "Fallback") + " fullscreen enabled"),
            e || m($e.container, C.classes.fullscreen.fallback, !0),
            m($e.container, C.classes.fullscreen.enabled, !0))
          : Ge("Fullscreen not supported and fallback disabled"),
          $e.buttons && $e.buttons.fullscreen && w($e.buttons.fullscreen, !1),
          J());
      }
    }
    function H() {
      if ("video" === $e.type) {
        (X(C.selectors.captions) ||
          $e.videoContainer.insertAdjacentHTML(
            "afterbegin",
            '<div class="' + p(C.selectors.captions) + '"></div>',
          ),
          ($e.usingTextTracks = !1),
          $e.media.textTracks && ($e.usingTextTracks = !0));
        for (var e, t = "", n = $e.media.childNodes, r = 0; r < n.length; r++)
          "track" === n[r].nodeName.toLowerCase() &&
            ((e = n[r].kind),
            ("captions" === e || "subtitles" === e) &&
              (t = n[r].getAttribute("src")));
        if (
          (($e.captionExists = !0),
          "" === t
            ? (($e.captionExists = !1), Ge("No caption track found"))
            : Ge("Caption track found; URI: " + t),
          $e.captionExists)
        ) {
          for (var a = $e.media.textTracks, s = 0; s < a.length; s++)
            a[s].mode = "hidden";
          if (
            (Y($e),
            (($e.browser.isIE && $e.browser.version >= 10) ||
              ($e.browser.isFirefox && $e.browser.version >= 31)) &&
              (Ge(
                "Detected browser with known TextTrack issues - using manual fallback",
              ),
              ($e.usingTextTracks = !1)),
            $e.usingTextTracks)
          ) {
            Ge("TextTracks supported");
            for (var o = 0; o < a.length; o++) {
              var i = a[o];
              ("captions" === i.kind || "subtitles" === i.kind) &&
                g(i, "cuechange", function () {
                  this.activeCues[0] && "text" in this.activeCues[0]
                    ? U(this.activeCues[0].getCueAsHTML())
                    : U();
                });
            }
          } else if (
            (Ge("TextTracks not supported so rendering captions manually"),
            ($e.currentCaption = ""),
            ($e.captions = []),
            "" !== t)
          ) {
            var l = new XMLHttpRequest();
            ((l.onreadystatechange = function () {
              if (4 === l.readyState)
                if (200 === l.status) {
                  var e,
                    t = [],
                    n = l.responseText,
                    r = "\r\n";
                  (-1 === n.indexOf(r + r) &&
                    (r = -1 !== n.indexOf("\r\r") ? "\r" : "\n"),
                    (t = n.split(r + r)));
                  for (var a = 0; a < t.length; a++) {
                    ((e = t[a]), ($e.captions[a] = []));
                    var s = e.split(r),
                      o = 0;
                    (-1 === s[o].indexOf(":") && (o = 1),
                      ($e.captions[a] = [s[o], s[o + 1]]));
                  }
                  ($e.captions.shift(),
                    Ge("Successfully loaded the caption file via AJAX"));
                } else
                  Ke(
                    C.logPrefix +
                      "There was a problem loading the caption file via AJAX",
                  );
            }),
              l.open("get", t, !0),
              l.send());
          }
        } else m($e.container, C.classes.captions.enabled);
      }
    }
    function U(e) {
      var n = X(C.selectors.captions),
        r = t.createElement("span");
      ((n.innerHTML = ""),
        L.undefined(e) && (e = ""),
        L.string(e) ? (r.innerHTML = e.trim()) : r.appendChild(e),
        n.appendChild(r));
      n.offsetHeight;
    }
    function W(e) {
      function t(e, t) {
        var n = [];
        n = e.split(" --> ");
        for (var r = 0; r < n.length; r++)
          n[r] = n[r].replace(/(\d+:\d+:\d+\.\d+).*/, "$1");
        return a(n[t]);
      }
      function n(e) {
        return t(e, 0);
      }
      function r(e) {
        return t(e, 1);
      }
      function a(e) {
        if (null === e || void 0 === e) return 0;
        var t,
          n = [],
          r = [];
        return (
          (n = e.split(",")),
          (r = n[0].split(":")),
          (t =
            Math.floor(60 * r[0] * 60) +
            Math.floor(60 * r[1]) +
            Math.floor(r[2]))
        );
      }
      if (
        !$e.usingTextTracks &&
        "video" === $e.type &&
        $e.supported.full &&
        (($e.subcount = 0),
        (e = L.number(e) ? e : $e.media.currentTime),
        $e.captions[$e.subcount])
      ) {
        for (; r($e.captions[$e.subcount][0]) < e.toFixed(1); )
          if (($e.subcount++, $e.subcount > $e.captions.length - 1)) {
            $e.subcount = $e.captions.length - 1;
            break;
          }
        $e.media.currentTime.toFixed(1) >= n($e.captions[$e.subcount][0]) &&
        $e.media.currentTime.toFixed(1) <= r($e.captions[$e.subcount][0])
          ? (($e.currentCaption = $e.captions[$e.subcount][1]),
            U($e.currentCaption))
          : U();
      }
    }
    function Y() {
      if ($e.buttons.captions) {
        m($e.container, C.classes.captions.enabled, !0);
        var e = $e.storage.captionsEnabled;
        (L["boolean"](e) || (e = C.captions.defaultActive),
          e &&
            (m($e.container, C.classes.captions.active, !0),
            w($e.buttons.captions, !0)));
      }
    }
    function B(e) {
      return $e.container.querySelectorAll(e);
    }
    function X(e) {
      return B(e)[0];
    }
    function $() {
      try {
        return e.self !== e.top;
      } catch (t) {
        return !0;
      }
    }
    function J() {
      function e(e) {
        9 === e.which &&
          $e.isFullscreen &&
          (e.target !== r || e.shiftKey
            ? e.target === n && e.shiftKey && (e.preventDefault(), r.focus())
            : (e.preventDefault(), n.focus()));
      }
      var t = B("input:not([disabled]), button:not([disabled])"),
        n = t[0],
        r = t[t.length - 1];
      g($e.container, "keydown", e);
    }
    function z(e, t) {
      if (L.string(t)) d(e, $e.media, { src: t });
      else if (t.constructor === Array)
        for (var n = t.length - 1; n >= 0; n--) d(e, $e.media, t[n]);
    }
    function G() {
      if (C.loadSprite) {
        var e = V();
        e.absolute
          ? (Ge(
              "AJAX loading absolute SVG sprite" +
                ($e.browser.isIE ? " (due to IE)" : ""),
            ),
            F(e.url, "sprite-plyr"))
          : Ge("Sprite will be used as external resource directly");
      }
      var n = C.html;
      (Ge("Injecting custom controls"),
        n || (n = q()),
        (n = o(n, "{seektime}", C.seekTime)),
        (n = o(n, "{id}", Math.floor(1e4 * Math.random()))),
        C.title && (n = o(n, "{title}", C.title)));
      var r;
      if (
        (L.string(C.selectors.controls.container) &&
          (r = t.querySelector(C.selectors.controls.container)),
        L.htmlElement(r) || (r = $e.container),
        r.insertAdjacentHTML("beforeend", n),
        C.tooltips.controls)
      )
        for (
          var a = B(
              [
                C.selectors.controls.wrapper,
                " ",
                C.selectors.labels,
                " .",
                C.classes.hidden,
              ].join(""),
            ),
            s = a.length - 1;
          s >= 0;
          s--
        ) {
          var i = a[s];
          (m(i, C.classes.hidden, !1), m(i, C.classes.tooltip, !0));
        }
    }
    function K() {
      try {
        return (
          ($e.controls = X(C.selectors.controls.wrapper)),
          ($e.buttons = {}),
          ($e.buttons.seek = X(C.selectors.buttons.seek)),
          ($e.buttons.play = B(C.selectors.buttons.play)),
          ($e.buttons.pause = X(C.selectors.buttons.pause)),
          ($e.buttons.restart = X(C.selectors.buttons.restart)),
          ($e.buttons.rewind = X(C.selectors.buttons.rewind)),
          ($e.buttons.forward = X(C.selectors.buttons.forward)),
          ($e.buttons.fullscreen = X(C.selectors.buttons.fullscreen)),
          ($e.buttons.mute = X(C.selectors.buttons.mute)),
          ($e.buttons.captions = X(C.selectors.buttons.captions)),
          ($e.progress = {}),
          ($e.progress.container = X(C.selectors.progress.container)),
          ($e.progress.buffer = {}),
          ($e.progress.buffer.bar = X(C.selectors.progress.buffer)),
          ($e.progress.buffer.text =
            $e.progress.buffer.bar &&
            $e.progress.buffer.bar.getElementsByTagName("span")[0]),
          ($e.progress.played = X(C.selectors.progress.played)),
          ($e.progress.tooltip =
            $e.progress.container &&
            $e.progress.container.querySelector("." + C.classes.tooltip)),
          ($e.volume = {}),
          ($e.volume.input = X(C.selectors.volume.input)),
          ($e.volume.display = X(C.selectors.volume.display)),
          ($e.duration = X(C.selectors.duration)),
          ($e.currentTime = X(C.selectors.currentTime)),
          ($e.seekTime = B(C.selectors.seekTime)),
          !0
        );
      } catch (e) {
        return (
          Ke("It looks like there is a problem with your controls HTML"),
          Z(!0),
          !1
        );
      }
    }
    function Q() {
      m(
        $e.container,
        C.selectors.container.replace(".", ""),
        $e.supported.full,
      );
    }
    function Z(e) {
      e && s(C.types.html5, $e.type)
        ? $e.media.setAttribute("controls", "")
        : $e.media.removeAttribute("controls");
    }
    function ee(e) {
      var t = C.i18n.play;
      if (
        (L.string(C.title) &&
          C.title.length &&
          ((t += ", " + C.title),
          $e.container.setAttribute("aria-label", C.title)),
        $e.supported.full && $e.buttons.play)
      )
        for (var n = $e.buttons.play.length - 1; n >= 0; n--)
          $e.buttons.play[n].setAttribute("aria-label", t);
      L.htmlElement(e) &&
        e.setAttribute("title", C.i18n.frameTitle.replace("{title}", C.title));
    }
    function te() {
      var t = null;
      (($e.storage = {}),
        j.supported &&
          C.storage.enabled &&
          (e.localStorage.removeItem("plyr-volume"),
          (t = e.localStorage.getItem(C.storage.key)),
          t &&
            (/^\d+(\.\d+)?$/.test(t)
              ? ne({ volume: parseFloat(t) })
              : ($e.storage = JSON.parse(t)))));
    }
    function ne(t) {
      j.supported &&
        C.storage.enabled &&
        (T($e.storage, t),
        e.localStorage.setItem(C.storage.key, JSON.stringify($e.storage)));
    }
    function re() {
      if (!$e.media) return void Ke("No media element found!");
      if (
        $e.supported.full &&
        (m($e.container, C.classes.type.replace("{0}", $e.type), !0),
        s(C.types.embed, $e.type) &&
          m($e.container, C.classes.type.replace("{0}", "video"), !0),
        m($e.container, C.classes.stopped, C.autoplay),
        m($e.container, C.classes.isIos, $e.browser.isIos),
        m($e.container, C.classes.isTouch, $e.browser.isTouch),
        "video" === $e.type)
      ) {
        var e = t.createElement("div");
        (e.setAttribute("class", C.classes.videoWrapper),
          i($e.media, e),
          ($e.videoContainer = e));
      }
      s(C.types.embed, $e.type) && ae();
    }
    function ae() {
      var n,
        r = t.createElement("div"),
        s = $e.type + "-" + Math.floor(1e4 * Math.random());
      switch ($e.type) {
        case "youtube":
          n = S($e.embedId);
          break;
        case "vimeo":
          n = E($e.embedId);
          break;
        default:
          n = $e.embedId;
      }
      for (var o = B('[id^="' + $e.type + '-"]'), i = o.length - 1; i >= 0; i--)
        l(o[i]);
      if (
        (m($e.media, C.classes.videoWrapper, !0),
        m($e.media, C.classes.embedWrapper, !0),
        "youtube" === $e.type)
      )
        ($e.media.appendChild(r),
          r.setAttribute("id", s),
          L.object(e.YT)
            ? oe(n, r)
            : (a(C.urls.youtube.api),
              (e.onYouTubeReadyCallbacks = e.onYouTubeReadyCallbacks || []),
              e.onYouTubeReadyCallbacks.push(function () {
                oe(n, r);
              }),
              (e.onYouTubeIframeAPIReady = function () {
                e.onYouTubeReadyCallbacks.forEach(function (e) {
                  e();
                });
              })));
      else if ("vimeo" === $e.type)
        if (
          ($e.supported.full ? $e.media.appendChild(r) : (r = $e.media),
          r.setAttribute("id", s),
          L.object(e.Vimeo))
        )
          ie(n, r);
        else {
          a(C.urls.vimeo.api);
          var u = e.setInterval(function () {
            L.object(e.Vimeo) && (e.clearInterval(u), ie(n, r));
          }, 50);
        }
      else if ("soundcloud" === $e.type) {
        var d = t.createElement("iframe");
        ((d.loaded = !1),
          g(d, "load", function () {
            d.loaded = !0;
          }),
          c(d, {
            src:
              "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/" +
              n,
            id: s,
          }),
          r.appendChild(d),
          $e.media.appendChild(r),
          e.SC || a(C.urls.soundcloud.api));
        var p = e.setInterval(function () {
          e.SC && d.loaded && (e.clearInterval(p), le.call(d));
        }, 50);
      }
    }
    function se() {
      ($e.supported.full && (Ye(), Be()), ee(X("iframe")));
    }
    function oe(t, n) {
      $e.embed = new e.YT.Player(n.id, {
        videoId: t,
        playerVars: {
          autoplay: C.autoplay ? 1 : 0,
          controls: $e.supported.full ? 0 : 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: C.captions.defaultActive ? 1 : 0,
          cc_lang_pref: "en",
          wmode: "transparent",
          modestbranding: 1,
          disablekb: 1,
          origin: "*",
        },
        events: {
          onError: function (e) {
            I($e.container, "error", !0, { code: e.data, embed: e.target });
          },
          onReady: function (t) {
            var n = t.target;
            (($e.media.play = function () {
              (n.playVideo(), ($e.media.paused = !1));
            }),
              ($e.media.pause = function () {
                (n.pauseVideo(), ($e.media.paused = !0));
              }),
              ($e.media.stop = function () {
                (n.stopVideo(), ($e.media.paused = !0));
              }),
              ($e.media.duration = n.getDuration()),
              ($e.media.paused = !0),
              ($e.media.currentTime = 0),
              ($e.media.muted = n.isMuted()),
              "function" == typeof n.getVideoData &&
                (C.title = n.getVideoData().title),
              $e.supported.full &&
                $e.media.querySelector("iframe").setAttribute("tabindex", "-1"),
              se(),
              I($e.media, "timeupdate"),
              I($e.media, "durationchange"),
              e.clearInterval(Je.buffering),
              (Je.buffering = e.setInterval(function () {
                (($e.media.buffered = n.getVideoLoadedFraction()),
                  (null === $e.media.lastBuffered ||
                    $e.media.lastBuffered < $e.media.buffered) &&
                    I($e.media, "progress"),
                  ($e.media.lastBuffered = $e.media.buffered),
                  1 === $e.media.buffered &&
                    (e.clearInterval(Je.buffering),
                    I($e.media, "canplaythrough")));
              }, 200)));
          },
          onStateChange: function (t) {
            var n = t.target;
            switch ((e.clearInterval(Je.playing), t.data)) {
              case 0:
                (($e.media.paused = !0), I($e.media, "ended"));
                break;
              case 1:
                (($e.media.paused = !1),
                  $e.media.seeking && I($e.media, "seeked"),
                  ($e.media.seeking = !1),
                  I($e.media, "play"),
                  I($e.media, "playing"),
                  (Je.playing = e.setInterval(function () {
                    (($e.media.currentTime = n.getCurrentTime()),
                      I($e.media, "timeupdate"));
                  }, 100)),
                  $e.media.duration !== n.getDuration() &&
                    (($e.media.duration = n.getDuration()),
                    I($e.media, "durationchange")));
                break;
              case 2:
                (($e.media.paused = !0), I($e.media, "pause"));
            }
            I($e.container, "statechange", !1, { code: t.data });
          },
        },
      });
    }
    function ie(n, r) {
      function a(e) {
        return Object.keys(e)
          .map(function (t) {
            return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
          })
          .join("&");
      }
      var s = {
          loop: C.loop,
          autoplay: C.autoplay,
          byline: !1,
          portrait: !1,
          title: !1,
          speed: !0,
          transparent: 0,
        },
        o = a(s),
        i = t.createElement("iframe"),
        l = "https://player.vimeo.com/video/" + n + "?" + o;
      (i.setAttribute("src", l),
        i.setAttribute("allowfullscreen", ""),
        r.appendChild(i),
        ($e.embed = new e.Vimeo.Player(i)),
        ($e.media.play = function () {
          ($e.embed.play(), ($e.media.paused = !1));
        }),
        ($e.media.pause = function () {
          ($e.embed.pause(), ($e.media.paused = !0));
        }),
        ($e.media.stop = function () {
          ($e.embed.stop(), ($e.media.paused = !0));
        }),
        ($e.media.paused = !0),
        ($e.media.currentTime = 0),
        se(),
        $e.embed.getCurrentTime().then(function (e) {
          (($e.media.currentTime = e), I($e.media, "timeupdate"));
        }),
        $e.embed.getDuration().then(function (e) {
          (($e.media.duration = e), I($e.media, "durationchange"));
        }),
        $e.embed.on("loaded", function () {
          L.htmlElement($e.embed.element) &&
            $e.supported.full &&
            $e.embed.element.setAttribute("tabindex", "-1");
        }),
        $e.embed.on("play", function () {
          (($e.media.paused = !1), I($e.media, "play"), I($e.media, "playing"));
        }),
        $e.embed.on("pause", function () {
          (($e.media.paused = !0), I($e.media, "pause"));
        }),
        $e.embed.on("timeupdate", function (e) {
          (($e.media.seeking = !1),
            ($e.media.currentTime = e.seconds),
            I($e.media, "timeupdate"));
        }),
        $e.embed.on("progress", function (e) {
          (($e.media.buffered = e.percent),
            I($e.media, "progress"),
            1 === parseInt(e.percent) && I($e.media, "canplaythrough"));
        }),
        $e.embed.on("seeked", function () {
          (($e.media.seeking = !1), I($e.media, "seeked"), I($e.media, "play"));
        }),
        $e.embed.on("ended", function () {
          (($e.media.paused = !0), I($e.media, "ended"));
        }));
    }
    function le() {
      (($e.embed = e.SC.Widget(this)),
        $e.embed.bind(e.SC.Widget.Events.READY, function () {
          (($e.media.play = function () {
            ($e.embed.play(), ($e.media.paused = !1));
          }),
            ($e.media.pause = function () {
              ($e.embed.pause(), ($e.media.paused = !0));
            }),
            ($e.media.stop = function () {
              ($e.embed.seekTo(0), $e.embed.pause(), ($e.media.paused = !0));
            }),
            ($e.media.paused = !0),
            ($e.media.currentTime = 0),
            $e.embed.getDuration(function (e) {
              (($e.media.duration = e / 1e3), se());
            }),
            $e.embed.getPosition(function (e) {
              (($e.media.currentTime = e), I($e.media, "timeupdate"));
            }),
            $e.embed.bind(e.SC.Widget.Events.PLAY, function () {
              (($e.media.paused = !1),
                I($e.media, "play"),
                I($e.media, "playing"));
            }),
            $e.embed.bind(e.SC.Widget.Events.PAUSE, function () {
              (($e.media.paused = !0), I($e.media, "pause"));
            }),
            $e.embed.bind(e.SC.Widget.Events.PLAY_PROGRESS, function (e) {
              (($e.media.seeking = !1),
                ($e.media.currentTime = e.currentPosition / 1e3),
                I($e.media, "timeupdate"));
            }),
            $e.embed.bind(e.SC.Widget.Events.LOAD_PROGRESS, function (e) {
              (($e.media.buffered = e.loadProgress),
                I($e.media, "progress"),
                1 === parseInt(e.loadProgress) &&
                  I($e.media, "canplaythrough"));
            }),
            $e.embed.bind(e.SC.Widget.Events.FINISH, function () {
              (($e.media.paused = !0), I($e.media, "ended"));
            }));
        }));
    }
    function ue() {
      "play" in $e.media && $e.media.play();
    }
    function ce() {
      "pause" in $e.media && $e.media.pause();
    }
    function de(e) {
      return (L["boolean"](e) || (e = $e.media.paused), e ? ue() : ce(), e);
    }
    function pe(e) {
      (L.number(e) || (e = C.seekTime), fe($e.media.currentTime - e));
    }
    function me(e) {
      (L.number(e) || (e = C.seekTime), fe($e.media.currentTime + e));
    }
    function fe(e) {
      var t = 0,
        n = $e.media.paused,
        r = ye();
      (L.number(e)
        ? (t = e)
        : L.object(e) &&
          s(["input", "change"], e.type) &&
          (t = (e.target.value / e.target.max) * r),
        0 > t ? (t = 0) : t > r && (t = r),
        Pe(t));
      try {
        $e.media.currentTime = t.toFixed(4);
      } catch (a) {}
      if (s(C.types.embed, $e.type)) {
        switch ($e.type) {
          case "youtube":
            $e.embed.seekTo(t);
            break;
          case "vimeo":
            $e.embed.setCurrentTime(t.toFixed(0));
            break;
          case "soundcloud":
            $e.embed.seekTo(1e3 * t);
        }
        (n && ce(),
          I($e.media, "timeupdate"),
          ($e.media.seeking = !0),
          I($e.media, "seeking"));
      }
      (Ge("Seeking to " + $e.media.currentTime + " seconds"), W(t));
    }
    function ye() {
      var e = parseInt(C.duration),
        t = 0;
      return (
        null === $e.media.duration ||
          isNaN($e.media.duration) ||
          (t = $e.media.duration),
        isNaN(e) ? t : e
      );
    }
    function be() {
      (m($e.container, C.classes.playing, !$e.media.paused),
        m($e.container, C.classes.stopped, $e.media.paused),
        Oe($e.media.paused));
    }
    function ve() {
      M = { x: e.pageXOffset || 0, y: e.pageYOffset || 0 };
    }
    function ge() {
      e.scrollTo(M.x, M.y);
    }
    function he(e) {
      if ("audio" !== $e.type) {
        var n = P.supportsFullScreen;
        if (n) {
          if (!e || e.type !== P.fullScreenEventName)
            return (
              P.isFullScreen($e.container)
                ? P.cancelFullScreen()
                : (ve(), P.requestFullScreen($e.container)),
              void ($e.isFullscreen = P.isFullScreen($e.container))
            );
          $e.isFullscreen = P.isFullScreen($e.container);
        } else
          (($e.isFullscreen = !$e.isFullscreen),
            (t.body.style.overflow = $e.isFullscreen ? "hidden" : ""));
        (m($e.container, C.classes.fullscreen.active, $e.isFullscreen),
          J($e.isFullscreen),
          $e.buttons &&
            $e.buttons.fullscreen &&
            w($e.buttons.fullscreen, $e.isFullscreen),
          I(
            $e.container,
            $e.isFullscreen ? "enterfullscreen" : "exitfullscreen",
            !0,
          ),
          !$e.isFullscreen && n && ge());
      }
    }
    function ke(e) {
      if (
        (L["boolean"](e) || (e = !$e.media.muted),
        w($e.buttons.mute, e),
        ($e.media.muted = e),
        0 === $e.media.volume && we(C.volume),
        s(C.types.embed, $e.type))
      ) {
        switch ($e.type) {
          case "youtube":
            $e.embed[$e.media.muted ? "mute" : "unMute"]();
            break;
          case "vimeo":
          case "soundcloud":
            $e.embed.setVolume(
              $e.media.muted ? 0 : parseFloat(C.volume / C.volumeMax),
            );
        }
        I($e.media, "volumechange");
      }
    }
    function we(e) {
      var t = C.volumeMax,
        n = C.volumeMin;
      if (
        (L.undefined(e) && (e = $e.storage.volume),
        (null === e || isNaN(e)) && (e = C.volume),
        e > t && (e = t),
        n > e && (e = n),
        ($e.media.volume = parseFloat(e / t)),
        $e.volume.display && ($e.volume.display.value = e),
        s(C.types.embed, $e.type))
      ) {
        switch ($e.type) {
          case "youtube":
            $e.embed.setVolume(100 * $e.media.volume);
            break;
          case "vimeo":
          case "soundcloud":
            $e.embed.setVolume($e.media.volume);
        }
        I($e.media, "volumechange");
      }
      0 === e ? ($e.media.muted = !0) : $e.media.muted && e > 0 && ke();
    }
    function xe(e) {
      var t = $e.media.muted ? 0 : $e.media.volume * C.volumeMax;
      (L.number(e) || (e = C.volumeStep), we(t + e));
    }
    function Te(e) {
      var t = $e.media.muted ? 0 : $e.media.volume * C.volumeMax;
      (L.number(e) || (e = C.volumeStep), we(t - e));
    }
    function Se() {
      var e = $e.media.muted ? 0 : $e.media.volume * C.volumeMax;
      ($e.supported.full &&
        ($e.volume.input && ($e.volume.input.value = e),
        $e.volume.display && ($e.volume.display.value = e)),
        ne({ volume: e }),
        m($e.container, C.classes.muted, 0 === e),
        $e.supported.full && $e.buttons.mute && w($e.buttons.mute, 0 === e));
    }
    function Ee(e) {
      $e.supported.full &&
        $e.buttons.captions &&
        (L["boolean"](e) ||
          (e =
            -1 === $e.container.className.indexOf(C.classes.captions.active)),
        ($e.captionsEnabled = e),
        w($e.buttons.captions, $e.captionsEnabled),
        m($e.container, C.classes.captions.active, $e.captionsEnabled),
        I(
          $e.container,
          $e.captionsEnabled ? "captionsenabled" : "captionsdisabled",
          !0,
        ),
        ne({ captionsEnabled: $e.captionsEnabled }));
    }
    function _e(e) {
      var t = "waiting" === e.type;
      (clearTimeout(Je.loading),
        (Je.loading = setTimeout(
          function () {
            (m($e.container, C.classes.loading, t), Oe(t));
          },
          t ? 250 : 0,
        )));
    }
    function Ce(e) {
      if ($e.supported.full) {
        var t = $e.progress.played,
          n = 0,
          r = ye();
        if (e)
          switch (e.type) {
            case "timeupdate":
            case "seeking":
              if ($e.controls.pressed) return;
              ((n = x($e.media.currentTime, r)),
                "timeupdate" === e.type &&
                  $e.buttons.seek &&
                  ($e.buttons.seek.value = n));
              break;
            case "playing":
            case "progress":
              ((t = $e.progress.buffer),
                (n = (function () {
                  var e = $e.media.buffered;
                  return e && e.length
                    ? x(e.end(0), r)
                    : L.number(e)
                      ? 100 * e
                      : 0;
                })()));
          }
        Fe(t, n);
      }
    }
    function Fe(e, t) {
      if ($e.supported.full) {
        if ((L.undefined(t) && (t = 0), L.undefined(e))) {
          if (!$e.progress || !$e.progress.buffer) return;
          e = $e.progress.buffer;
        }
        L.htmlElement(e)
          ? (e.value = t)
          : e && (e.bar && (e.bar.value = t), e.text && (e.text.innerHTML = t));
      }
    }
    function Ae(e, t) {
      if (t) {
        (isNaN(e) && (e = 0),
          ($e.secs = parseInt(e % 60)),
          ($e.mins = parseInt((e / 60) % 60)),
          ($e.hours = parseInt((e / 60 / 60) % 60)));
        var n = parseInt((ye() / 60 / 60) % 60) > 0;
        (($e.secs = ("0" + $e.secs).slice(-2)),
          ($e.mins = ("0" + $e.mins).slice(-2)),
          (t.innerHTML = (n ? $e.hours + ":" : "") + $e.mins + ":" + $e.secs));
      }
    }
    function Ie() {
      if ($e.supported.full) {
        var e = ye() || 0;
        (!$e.duration &&
          C.displayDuration &&
          $e.media.paused &&
          Ae(e, $e.currentTime),
          $e.duration && Ae(e, $e.duration),
          Me());
      }
    }
    function Ne(e) {
      (Ae($e.media.currentTime, $e.currentTime),
        (e && "timeupdate" === e.type && $e.media.seeking) || Ce(e));
    }
    function Pe(e) {
      L.number(e) || (e = 0);
      var t = ye(),
        n = x(e, t);
      ($e.progress && $e.progress.played && ($e.progress.played.value = n),
        $e.buttons && $e.buttons.seek && ($e.buttons.seek.value = n));
    }
    function Me(e) {
      var t = ye();
      if (C.tooltips.seek && $e.progress.container && 0 !== t) {
        var n = $e.progress.container.getBoundingClientRect(),
          r = 0,
          a = C.classes.tooltip + "--visible";
        if (e) r = (100 / n.width) * (e.pageX - n.left);
        else {
          if (!f($e.progress.tooltip, a)) return;
          r = $e.progress.tooltip.style.left.replace("%", "");
        }
        (0 > r ? (r = 0) : r > 100 && (r = 100),
          Ae((t / 100) * r, $e.progress.tooltip),
          ($e.progress.tooltip.style.left = r + "%"),
          e &&
            s(["mouseenter", "mouseleave"], e.type) &&
            m($e.progress.tooltip, a, "mouseenter" === e.type));
      }
    }
    function Oe(t) {
      if (C.hideControls && "audio" !== $e.type) {
        var n = 0,
          r = !1,
          a = t,
          o = f($e.container, C.classes.loading);
        if (
          (L["boolean"](t) ||
            (t && t.type
              ? ((r = "enterfullscreen" === t.type),
                (a = s(
                  ["mousemove", "touchstart", "mouseenter", "focus"],
                  t.type,
                )),
                s(["mousemove", "touchmove"], t.type) && (n = 2e3),
                "focus" === t.type && (n = 3e3))
              : (a = f($e.container, C.classes.hideControls))),
          e.clearTimeout(Je.hover),
          a || $e.media.paused || o)
        ) {
          if (
            (m($e.container, C.classes.hideControls, !1), $e.media.paused || o)
          )
            return;
          $e.browser.isTouch && (n = 3e3);
        }
        (a && $e.media.paused) ||
          (Je.hover = e.setTimeout(function () {
            ((!$e.controls.pressed && !$e.controls.hover) || r) &&
              m($e.container, C.classes.hideControls, !0);
          }, n));
      }
    }
    function Le(e) {
      if (!L.undefined(e)) return void je(e);
      var t;
      switch ($e.type) {
        case "youtube":
          t = $e.embed.getVideoUrl();
          break;
        case "vimeo":
          $e.embed.getVideoUrl.then(function (e) {
            t = e;
          });
          break;
        case "soundcloud":
          $e.embed.getCurrentSound(function (e) {
            t = e.permalink_url;
          });
          break;
        default:
          t = $e.media.currentSrc;
      }
      return t || "";
    }
    function je(e) {
      function n() {
        if (
          (($e.embed = null),
          l($e.media),
          "video" === $e.type && $e.videoContainer && l($e.videoContainer),
          $e.container && $e.container.removeAttribute("class"),
          "type" in e && (($e.type = e.type), "video" === $e.type))
        ) {
          var n = e.sources[0];
          "type" in n && s(C.types.embed, n.type) && ($e.type = n.type);
        }
        switch ((($e.supported = A($e.type)), $e.type)) {
          case "video":
            $e.media = t.createElement("video");
            break;
          case "audio":
            $e.media = t.createElement("audio");
            break;
          case "youtube":
          case "vimeo":
          case "soundcloud":
            (($e.media = t.createElement("div")),
              ($e.embedId = e.sources[0].src));
        }
        (u($e.container, $e.media),
          L["boolean"](e.autoplay) && (C.autoplay = e.autoplay),
          s(C.types.html5, $e.type) &&
            (C.crossorigin && $e.media.setAttribute("crossorigin", ""),
            C.autoplay && $e.media.setAttribute("autoplay", ""),
            "poster" in e && $e.media.setAttribute("poster", e.poster),
            C.loop && $e.media.setAttribute("loop", "")),
          m($e.container, C.classes.fullscreen.active, $e.isFullscreen),
          m($e.container, C.classes.captions.active, $e.captionsEnabled),
          Q(),
          s(C.types.html5, $e.type) && z("source", e.sources),
          re(),
          s(C.types.html5, $e.type) &&
            ("tracks" in e && z("track", e.tracks), $e.media.load()),
          (s(C.types.html5, $e.type) ||
            (s(C.types.embed, $e.type) && !$e.supported.full)) &&
            (Ye(), Be()),
          (C.title = e.title),
          ee());
      }
      return L.object(e) && "sources" in e && e.sources.length
        ? (m($e.container, C.classes.ready, !1),
          ce(),
          Pe(),
          Fe(),
          He(),
          void Ue(n, !1))
        : void Ke("Invalid source format");
    }
    function Re(e) {
      "video" === $e.type && $e.media.setAttribute("poster", e);
    }
    function Ve() {
      m(X("." + C.classes.tabFocus), C.classes.tabFocus, !1);
    }
    function qe() {
      function n() {
        var e = de(),
          t = $e.buttons[e ? "play" : "pause"],
          n = $e.buttons[e ? "pause" : "play"];
        if ((n && (n = n.length > 1 ? n[n.length - 1] : n[0]), n)) {
          var r = f(t, C.classes.tabFocus);
          setTimeout(function () {
            (n.focus(),
              r &&
                (m(t, C.classes.tabFocus, !1), m(n, C.classes.tabFocus, !0)));
          }, 100);
        }
      }
      function r() {
        var e = t.activeElement;
        return (e = e && e !== t.body ? t.querySelector(":focus") : null);
      }
      function a(e) {
        return e.keyCode ? e.keyCode : e.which;
      }
      function o(e) {
        for (var t in $e.buttons) {
          var n = $e.buttons[t];
          if (L.nodeList(n))
            for (var r = 0; r < n.length; r++)
              m(n[r], C.classes.tabFocus, n[r] === e);
          else m(n, C.classes.tabFocus, n === e);
        }
      }
      function i(e) {
        function t() {
          var e = $e.media.duration;
          L.number(e) && fe((e / 10) * (n - 48));
        }
        var n = a(e),
          r = "keydown" === e.type,
          o = r && n === u;
        if (L.number(n))
          if (r) {
            var i = [
              48, 49, 50, 51, 52, 53, 54, 56, 57, 32, 75, 38, 40, 77, 39, 37,
              70, 67,
            ];
            switch ((s(i, n) && (e.preventDefault(), e.stopPropagation()), n)) {
              case 48:
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
                o || t();
                break;
              case 32:
              case 75:
                o || de();
                break;
              case 38:
                xe();
                break;
              case 40:
                Te();
                break;
              case 77:
                o || ke();
                break;
              case 39:
                me();
                break;
              case 37:
                pe();
                break;
              case 70:
                he();
                break;
              case 67:
                o || Ee();
            }
            (!P.supportsFullScreen && $e.isFullscreen && 27 === n && he(),
              (u = n));
          } else u = null;
      }
      var l = $e.browser.isIE ? "change" : "input";
      if (C.keyboardShorcuts.focused) {
        var u = null;
        (C.keyboardShorcuts.global &&
          g(e, "keydown keyup", function (e) {
            var t = a(e),
              n = r(),
              o = [48, 49, 50, 51, 52, 53, 54, 56, 57, 75, 77, 70, 67],
              l = N().length;
            1 !== l ||
              !s(o, t) ||
              (L.htmlElement(n) && y(n, C.selectors.editable)) ||
              i(e);
          }),
          g($e.container, "keydown keyup", i));
      }
      (g(e, "keyup", function (e) {
        var t = a(e),
          n = r();
        9 === t && o(n);
      }),
        g(t.body, "click", Ve));
      for (var c in $e.buttons) {
        var d = $e.buttons[c];
        g(d, "blur", function () {
          m(d, "tab-focus", !1);
        });
      }
      (b($e.buttons.play, "click", C.listeners.play, n),
        b($e.buttons.pause, "click", C.listeners.pause, n),
        b($e.buttons.restart, "click", C.listeners.restart, fe),
        b($e.buttons.rewind, "click", C.listeners.rewind, pe),
        b($e.buttons.forward, "click", C.listeners.forward, me),
        b($e.buttons.seek, l, C.listeners.seek, fe),
        b($e.volume.input, l, C.listeners.volume, function () {
          we($e.volume.input.value);
        }),
        b($e.buttons.mute, "click", C.listeners.mute, ke),
        b($e.buttons.fullscreen, "click", C.listeners.fullscreen, he),
        b($e.container, "dblclick", C.listeners.fullscreen, he),
        P.supportsFullScreen && g(t, P.fullScreenEventName, he),
        b($e.buttons.captions, "click", C.listeners.captions, Ee),
        g($e.progress.container, "mouseenter mouseleave mousemove", Me),
        C.hideControls &&
          (g(
            $e.container,
            "mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen",
            Oe,
          ),
          g($e.controls, "mouseenter mouseleave", function (e) {
            $e.controls.hover = "mouseenter" === e.type;
          }),
          g(
            $e.controls,
            "mousedown mouseup touchstart touchend touchcancel",
            function (e) {
              $e.controls.pressed = s(["mousedown", "touchstart"], e.type);
            },
          ),
          g($e.controls, "focus blur", Oe, !0)),
        g($e.volume.input, "wheel", function (e) {
          e.preventDefault();
          var t = e.webkitDirectionInvertedFromDevice,
            n = C.volumeStep / 5;
          ((e.deltaY < 0 || e.deltaX > 0) && (t ? Te(n) : xe(n)),
            (e.deltaY > 0 || e.deltaX < 0) && (t ? xe(n) : Te(n)));
        }));
    }
    function De() {
      if (
        (g($e.media, "timeupdate seeking", Ne),
        g($e.media, "timeupdate", W),
        g($e.media, "durationchange loadedmetadata", Ie),
        g($e.media, "ended", function () {
          "video" === $e.type &&
            C.showPosterOnEnd &&
            ("video" === $e.type && U(), fe(), $e.media.load());
        }),
        g($e.media, "progress playing", Ce),
        g($e.media, "volumechange", Se),
        g($e.media, "play pause ended", be),
        g($e.media, "waiting canplay seeked", _e),
        C.clickToPlay && "audio" !== $e.type)
      ) {
        var e = X("." + C.classes.videoWrapper);
        if (!e) return;
        ((e.style.cursor = "pointer"),
          g(e, "click", function () {
            (C.hideControls && $e.browser.isTouch && !$e.media.paused) ||
              ($e.media.paused ? ue() : $e.media.ended ? (fe(), ue()) : ce());
          }));
      }
      (C.disableContextMenu &&
        g($e.media, "contextmenu", function (e) {
          e.preventDefault();
        }),
        g(
          $e.media,
          C.events.concat(["keyup", "keydown"]).join(" "),
          function (e) {
            I($e.container, e.type, !0);
          },
        ));
    }
    function He() {
      if (s(C.types.html5, $e.type)) {
        for (
          var e = $e.media.querySelectorAll("source"), t = 0;
          t < e.length;
          t++
        )
          l(e[t]);
        ($e.media.setAttribute("src", C.blankUrl),
          $e.media.load(),
          Ge("Cancelled network requests"));
      }
    }
    function Ue(n, r) {
      function a() {
        (clearTimeout(Je.cleanUp),
          L["boolean"](r) || (r = !0),
          L["function"](n) && n.call(ze),
          r &&
            (($e.init = !1),
            $e.container.parentNode.replaceChild(ze, $e.container),
            ($e.container = null),
            (t.body.style.overflow = ""),
            h(t.body, "click", Ve),
            I(ze, "destroyed", !0)));
      }
      if (!$e.init) return null;
      switch ($e.type) {
        case "youtube":
          (e.clearInterval(Je.buffering),
            e.clearInterval(Je.playing),
            $e.embed.destroy(),
            a());
          break;
        case "vimeo":
          ($e.embed.unload().then(a), (Je.cleanUp = e.setTimeout(a, 200)));
          break;
        case "video":
        case "audio":
          (Z(!0), a());
      }
    }
    function We() {
      if ($e.init) return null;
      if (((P = _()), ($e.browser = n()), L.htmlElement($e.media))) {
        te();
        var e = v.tagName.toLowerCase();
        ("div" === e
          ? (($e.type = v.getAttribute("data-type")),
            ($e.embedId = v.getAttribute("data-video-id")),
            v.removeAttribute("data-type"),
            v.removeAttribute("data-video-id"))
          : (($e.type = e),
            (C.crossorigin = null !== v.getAttribute("crossorigin")),
            (C.autoplay = C.autoplay || null !== v.getAttribute("autoplay")),
            (C.loop = C.loop || null !== v.getAttribute("loop"))),
          ($e.supported = A($e.type)),
          $e.supported.basic &&
            (($e.container = i(v, t.createElement("div"))),
            $e.container.setAttribute("tabindex", 0),
            Q(),
            Ge("" + $e.browser.name + " " + $e.browser.version),
            re(),
            (s(C.types.html5, $e.type) ||
              (s(C.types.embed, $e.type) && !$e.supported.full)) &&
              (Ye(), Be(), ee()),
            ($e.init = !0)));
      }
    }
    function Ye() {
      if (!$e.supported.full)
        return (
          Ke("Basic support only", $e.type),
          l(X(C.selectors.controls.wrapper)),
          l(X(C.selectors.buttons.play)),
          void Z(!0)
        );
      var e = !B(C.selectors.controls.wrapper).length;
      (e && G(),
        K() && (e && qe(), De(), Z(), D(), H(), we(), Se(), Ne(), be(), Ie()));
    }
    function Be() {
      (e.setTimeout(function () {
        I($e.media, "ready");
      }, 0),
        m($e.media, O.classes.setup, !0),
        m($e.container, C.classes.ready, !0),
        ($e.media.plyr = Xe),
        C.autoplay && ue());
    }
    var Xe,
      $e = this,
      Je = {};
    $e.media = v;
    var ze = v.cloneNode(!0),
      Ge = function () {
        R("log", arguments);
      },
      Ke = function () {
        R("warn", arguments);
      };
    return (
      Ge("Config", C),
      (Xe = {
        getOriginal: function () {
          return ze;
        },
        getContainer: function () {
          return $e.container;
        },
        getEmbed: function () {
          return $e.embed;
        },
        getMedia: function () {
          return $e.media;
        },
        getType: function () {
          return $e.type;
        },
        getDuration: ye,
        getCurrentTime: function () {
          return $e.media.currentTime;
        },
        getVolume: function () {
          return $e.media.volume;
        },
        isMuted: function () {
          return $e.media.muted;
        },
        isReady: function () {
          return f($e.container, C.classes.ready);
        },
        isLoading: function () {
          return f($e.container, C.classes.loading);
        },
        isPaused: function () {
          return $e.media.paused;
        },
        on: function (e, t) {
          return (g($e.container, e, t), this);
        },
        play: ue,
        pause: ce,
        stop: function () {
          (ce(), fe());
        },
        restart: fe,
        rewind: pe,
        forward: me,
        seek: fe,
        source: Le,
        poster: Re,
        setVolume: we,
        togglePlay: de,
        toggleMute: ke,
        toggleCaptions: Ee,
        toggleFullscreen: he,
        toggleControls: Oe,
        isFullscreen: function () {
          return $e.isFullscreen || !1;
        },
        support: function (e) {
          return r($e, e);
        },
        destroy: Ue,
      }),
      We(),
      $e.init ? Xe : null
    );
  }
  function F(e, n) {
    var r = new XMLHttpRequest();
    if (!L.string(n) || !L.htmlElement(t.querySelector("#" + n))) {
      var a = t.createElement("div");
      (a.setAttribute("hidden", ""),
        L.string(n) && a.setAttribute("id", n),
        t.body.insertBefore(a, t.body.childNodes[0]),
        "withCredentials" in r &&
          (r.open("GET", e, !0),
          (r.onload = function () {
            a.innerHTML = r.responseText;
          }),
          r.send()));
    }
  }
  function A(e) {
    var r = n(),
      a = r.isIE && r.version <= 9,
      s = r.isIos,
      o = r.isIphone,
      i = !!t.createElement("audio").canPlayType,
      l = !!t.createElement("video").canPlayType,
      u = !1,
      c = !1;
    switch (e) {
      case "video":
        ((u = l), (c = u && !a && !o));
        break;
      case "audio":
        ((u = i), (c = u && !a));
        break;
      case "vimeo":
        ((u = !0), (c = !a && !s));
        break;
      case "youtube":
        ((u = !0), (c = !a && !s), s && !o && r.version >= 10 && (c = !0));
        break;
      case "soundcloud":
        ((u = !0), (c = !a && !o));
        break;
      default:
        ((u = i && l), (c = u && !a));
    }
    return { basic: u, full: c };
  }
  function I(e, n) {
    function r(e, t) {
      f(t, O.classes.hook) || a.push({ target: e, media: t });
    }
    var a = [],
      s = [],
      o = [O.selectors.html5, O.selectors.embed].join(",");
    if (
      (L.string(e)
        ? (e = t.querySelectorAll(e))
        : L.htmlElement(e)
          ? (e = [e])
          : L.nodeList(e) ||
            L.array(e) ||
            L.string(e) ||
            (L.undefined(n) && L.object(e) && (n = e),
            (e = t.querySelectorAll(o))),
      L.nodeList(e) && (e = Array.prototype.slice.call(e)),
      !A().basic || !e.length)
    )
      return !1;
    for (var i = 0; i < e.length; i++) {
      var l = e[i],
        u = l.querySelectorAll(o);
      if (u.length) for (var c = 0; c < u.length; c++) r(l, u[c]);
      else y(l, o) && r(l, l);
    }
    return (
      a.forEach(function (e) {
        var t = e.target,
          r = e.media,
          a = !1;
        r === t && (a = !0);
        var o = {};
        try {
          o = JSON.parse(t.getAttribute("data-plyr"));
        } catch (i) {}
        var l = T({}, O, n, o);
        if (!l.enabled) return null;
        var u = new C(r, l);
        if (L.object(u)) {
          if (l.debug) {
            var c = l.events.concat([
              "setup",
              "statechange",
              "enterfullscreen",
              "exitfullscreen",
              "captionsenabled",
              "captionsdisabled",
            ]);
            g(u.getContainer(), c.join(" "), function (e) {
              console.log(
                [l.logPrefix, "event:", e.type].join(" "),
                e.detail.plyr,
              );
            });
          }
          (k(u.getContainer(), "setup", !0, { plyr: u }), s.push(u));
        }
      }),
      s
    );
  }
  function N(e) {
    if (
      (L.string(e) ? (e = t.querySelector(e)) : L.undefined(e) && (e = t.body),
      L.htmlElement(e))
    ) {
      var n = e.querySelectorAll("." + O.classes.setup),
        r = [];
      return (
        Array.prototype.slice.call(n).forEach(function (e) {
          L.object(e.plyr) && r.push(e.plyr);
        }),
        r
      );
    }
    return [];
  }
  var P,
    M = { x: 0, y: 0 },
    O = {
      enabled: !0,
      debug: !1,
      autoplay: !1,
      loop: !1,
      seekTime: 10,
      volume: 10,
      volumeMin: 0,
      volumeMax: 10,
      volumeStep: 1,
      duration: null,
      displayDuration: !0,
      loadSprite: !0,
      iconPrefix: "plyr",
      iconUrl: "https://cdn.plyr.io/2.0.18/plyr.svg",
      blankUrl: "https://cdn.plyr.io/static/blank.mp4",
      clickToPlay: !0,
      hideControls: !0,
      showPosterOnEnd: !1,
      disableContextMenu: !0,
      keyboardShorcuts: { focused: !0, global: !1 },
      tooltips: { controls: !1, seek: !0 },
      selectors: {
        html5: "video, audio",
        embed: "[data-type]",
        editable: "input, textarea, select, [contenteditable]",
        container: ".plyr",
        controls: { container: null, wrapper: ".plyr__controls" },
        labels: "[data-plyr]",
        buttons: {
          seek: '[data-plyr="seek"]',
          play: '[data-plyr="play"]',
          pause: '[data-plyr="pause"]',
          restart: '[data-plyr="restart"]',
          rewind: '[data-plyr="rewind"]',
          forward: '[data-plyr="fast-forward"]',
          mute: '[data-plyr="mute"]',
          captions: '[data-plyr="captions"]',
          fullscreen: '[data-plyr="fullscreen"]',
        },
        volume: {
          input: '[data-plyr="volume"]',
          display: ".plyr__volume--display",
        },
        progress: {
          container: ".plyr__progress",
          buffer: ".plyr__progress--buffer",
          played: ".plyr__progress--played",
        },
        captions: ".plyr__captions",
        currentTime: ".plyr__time--current",
        duration: ".plyr__time--duration",
      },
      classes: {
        setup: "plyr--setup",
        ready: "plyr--ready",
        videoWrapper: "plyr__video-wrapper",
        embedWrapper: "plyr__video-embed",
        type: "plyr--{0}",
        stopped: "plyr--stopped",
        playing: "plyr--playing",
        muted: "plyr--muted",
        loading: "plyr--loading",
        hover: "plyr--hover",
        tooltip: "plyr__tooltip",
        hidden: "plyr__sr-only",
        hideControls: "plyr--hide-controls",
        isIos: "plyr--is-ios",
        isTouch: "plyr--is-touch",
        captions: {
          enabled: "plyr--captions-enabled",
          active: "plyr--captions-active",
        },
        fullscreen: {
          enabled: "plyr--fullscreen-enabled",
          fallback: "plyr--fullscreen-fallback",
          active: "plyr--fullscreen-active",
        },
        tabFocus: "tab-focus",
      },
      captions: { defaultActive: !1 },
      fullscreen: { enabled: !0, fallback: !0, allowAudio: !1 },
      storage: { enabled: !0, key: "plyr" },
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "fullscreen",
      ],
      i18n: {
        restart: "Restart",
        rewind: "Rewind {seektime} secs",
        play: "Play",
        pause: "Pause",
        forward: "Forward {seektime} secs",
        played: "played",
        buffered: "buffered",
        currentTime: "Current time",
        duration: "Duration",
        volume: "Volume",
        toggleMute: "Toggle Mute",
        toggleCaptions: "Toggle Captions",
        toggleFullscreen: "Toggle Fullscreen",
        frameTitle: "Player for {title}",
      },
      types: {
        embed: ["youtube", "vimeo", "soundcloud"],
        html5: ["video", "audio"],
      },
      urls: {
        vimeo: { api: "https://player.vimeo.com/api/player.js" },
        youtube: { api: "https://www.youtube.com/iframe_api" },
        soundcloud: { api: "https://w.soundcloud.com/player/api.js" },
      },
      listeners: {
        seek: null,
        play: null,
        pause: null,
        restart: null,
        rewind: null,
        forward: null,
        mute: null,
        volume: null,
        captions: null,
        fullscreen: null,
      },
      events: [
        "ready",
        "ended",
        "progress",
        "stalled",
        "playing",
        "waiting",
        "canplay",
        "canplaythrough",
        "loadstart",
        "loadeddata",
        "loadedmetadata",
        "timeupdate",
        "volumechange",
        "play",
        "pause",
        "error",
        "seeking",
        "seeked",
        "emptied",
      ],
      logPrefix: "[Plyr]",
    },
    L = {
      object: function (e) {
        return null !== e && "object" == typeof e;
      },
      array: function (e) {
        return null !== e && "object" == typeof e && e.constructor === Array;
      },
      number: function (e) {
        return (
          null !== e &&
          (("number" == typeof e && !isNaN(e - 0)) ||
            ("object" == typeof e && e.constructor === Number))
        );
      },
      string: function (e) {
        return (
          null !== e &&
          ("string" == typeof e ||
            ("object" == typeof e && e.constructor === String))
        );
      },
      boolean: function (e) {
        return null !== e && "boolean" == typeof e;
      },
      nodeList: function (e) {
        return null !== e && e instanceof NodeList;
      },
      htmlElement: function (e) {
        return null !== e && e instanceof HTMLElement;
      },
      function: function (e) {
        return null !== e && "function" == typeof e;
      },
      undefined: function (e) {
        return null !== e && "undefined" == typeof e;
      },
    },
    j = {
      supported: (function () {
        try {
          e.localStorage.setItem("___test", "OK");
          var t = e.localStorage.getItem("___test");
          return (e.localStorage.removeItem("___test"), "OK" === t);
        } catch (n) {
          return !1;
        }
        return !1;
      })(),
    };
  return { setup: I, supported: A, loadSprite: F, get: N };
}),
  (function () {
    function e(e, t) {
      t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
      var n = document.createEvent("CustomEvent");
      return (n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n);
    }
    "function" != typeof window.CustomEvent &&
      ((e.prototype = window.Event.prototype), (window.CustomEvent = e));
  })());

/* Select 2 */
/*! Select2 4.0.6-rc.1 | https://github.com/select2/select2/blob/master/LICENSE.md */ !(function (
  a,
) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof module && module.exports
      ? (module.exports = function (b, c) {
          return (
            void 0 === c &&
              (c =
                "undefined" != typeof window
                  ? require("jquery")
                  : require("jquery")(b)),
            a(c),
            c
          );
        })
      : a(jQuery);
})(function (a) {
  var b = (function () {
      if (a && a.fn && a.fn.select2 && a.fn.select2.amd)
        var b = a.fn.select2.amd;
      var b;
      return (
        (function () {
          if (!b || !b.requirejs) {
            b ? (c = b) : (b = {});
            var a, c, d;
            (!(function (b) {
              function e(a, b) {
                return v.call(a, b);
              }
              function f(a, b) {
                var c,
                  d,
                  e,
                  f,
                  g,
                  h,
                  i,
                  j,
                  k,
                  l,
                  m,
                  n,
                  o = b && b.split("/"),
                  p = t.map,
                  q = (p && p["*"]) || {};
                if (a) {
                  for (
                    a = a.split("/"),
                      g = a.length - 1,
                      t.nodeIdCompat &&
                        x.test(a[g]) &&
                        (a[g] = a[g].replace(x, "")),
                      "." === a[0].charAt(0) &&
                        o &&
                        ((n = o.slice(0, o.length - 1)), (a = n.concat(a))),
                      k = 0;
                    k < a.length;
                    k++
                  )
                    if ("." === (m = a[k])) (a.splice(k, 1), (k -= 1));
                    else if (".." === m) {
                      if (
                        0 === k ||
                        (1 === k && ".." === a[2]) ||
                        ".." === a[k - 1]
                      )
                        continue;
                      k > 0 && (a.splice(k - 1, 2), (k -= 2));
                    }
                  a = a.join("/");
                }
                if ((o || q) && p) {
                  for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                    if (((d = c.slice(0, k).join("/")), o))
                      for (l = o.length; l > 0; l -= 1)
                        if ((e = p[o.slice(0, l).join("/")]) && (e = e[d])) {
                          ((f = e), (h = k));
                          break;
                        }
                    if (f) break;
                    !i && q && q[d] && ((i = q[d]), (j = k));
                  }
                  (!f && i && ((f = i), (h = j)),
                    f && (c.splice(0, h, f), (a = c.join("/"))));
                }
                return a;
              }
              function g(a, c) {
                return function () {
                  var d = w.call(arguments, 0);
                  return (
                    "string" != typeof d[0] && 1 === d.length && d.push(null),
                    o.apply(b, d.concat([a, c]))
                  );
                };
              }
              function h(a) {
                return function (b) {
                  return f(b, a);
                };
              }
              function i(a) {
                return function (b) {
                  r[a] = b;
                };
              }
              function j(a) {
                if (e(s, a)) {
                  var c = s[a];
                  (delete s[a], (u[a] = !0), n.apply(b, c));
                }
                if (!e(r, a) && !e(u, a)) throw new Error("No " + a);
                return r[a];
              }
              function k(a) {
                var b,
                  c = a ? a.indexOf("!") : -1;
                return (
                  c > -1 &&
                    ((b = a.substring(0, c)),
                    (a = a.substring(c + 1, a.length))),
                  [b, a]
                );
              }
              function l(a) {
                return a ? k(a) : [];
              }
              function m(a) {
                return function () {
                  return (t && t.config && t.config[a]) || {};
                };
              }
              var n,
                o,
                p,
                q,
                r = {},
                s = {},
                t = {},
                u = {},
                v = Object.prototype.hasOwnProperty,
                w = [].slice,
                x = /\.js$/;
              ((p = function (a, b) {
                var c,
                  d = k(a),
                  e = d[0],
                  g = b[1];
                return (
                  (a = d[1]),
                  e && ((e = f(e, g)), (c = j(e))),
                  e
                    ? (a = c && c.normalize ? c.normalize(a, h(g)) : f(a, g))
                    : ((a = f(a, g)),
                      (d = k(a)),
                      (e = d[0]),
                      (a = d[1]),
                      e && (c = j(e))),
                  { f: e ? e + "!" + a : a, n: a, pr: e, p: c }
                );
              }),
                (q = {
                  require: function (a) {
                    return g(a);
                  },
                  exports: function (a) {
                    var b = r[a];
                    return void 0 !== b ? b : (r[a] = {});
                  },
                  module: function (a) {
                    return { id: a, uri: "", exports: r[a], config: m(a) };
                  },
                }),
                (n = function (a, c, d, f) {
                  var h,
                    k,
                    m,
                    n,
                    o,
                    t,
                    v,
                    w = [],
                    x = typeof d;
                  if (
                    ((f = f || a),
                    (t = l(f)),
                    "undefined" === x || "function" === x)
                  ) {
                    for (
                      c =
                        !c.length && d.length
                          ? ["require", "exports", "module"]
                          : c,
                        o = 0;
                      o < c.length;
                      o += 1
                    )
                      if (((n = p(c[o], t)), "require" === (k = n.f)))
                        w[o] = q.require(a);
                      else if ("exports" === k)
                        ((w[o] = q.exports(a)), (v = !0));
                      else if ("module" === k) h = w[o] = q.module(a);
                      else if (e(r, k) || e(s, k) || e(u, k)) w[o] = j(k);
                      else {
                        if (!n.p) throw new Error(a + " missing " + k);
                        (n.p.load(n.n, g(f, !0), i(k), {}), (w[o] = r[k]));
                      }
                    ((m = d ? d.apply(r[a], w) : void 0),
                      a &&
                        (h && h.exports !== b && h.exports !== r[a]
                          ? (r[a] = h.exports)
                          : (m === b && v) || (r[a] = m)));
                  } else a && (r[a] = d);
                }),
                (a =
                  c =
                  o =
                    function (a, c, d, e, f) {
                      if ("string" == typeof a)
                        return q[a] ? q[a](c) : j(p(a, l(c)).f);
                      if (!a.splice) {
                        if (((t = a), t.deps && o(t.deps, t.callback), !c))
                          return;
                        c.splice ? ((a = c), (c = d), (d = null)) : (a = b);
                      }
                      return (
                        (c = c || function () {}),
                        "function" == typeof d && ((d = e), (e = f)),
                        e
                          ? n(b, a, c, d)
                          : setTimeout(function () {
                              n(b, a, c, d);
                            }, 4),
                        o
                      );
                    }),
                (o.config = function (a) {
                  return o(a);
                }),
                (a._defined = r),
                (d = function (a, b, c) {
                  if ("string" != typeof a)
                    throw new Error(
                      "See almond README: incorrect module build, no module name",
                    );
                  (b.splice || ((c = b), (b = [])),
                    e(r, a) || e(s, a) || (s[a] = [a, b, c]));
                }),
                (d.amd = { jQuery: !0 }));
            })(),
              (b.requirejs = a),
              (b.require = c),
              (b.define = d));
          }
        })(),
        b.define("almond", function () {}),
        b.define("jquery", [], function () {
          var b = a || $;
          return (
            null == b &&
              console &&
              console.error &&
              console.error(
                "Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page.",
              ),
            b
          );
        }),
        b.define("select2/utils", ["jquery"], function (a) {
          function b(a) {
            var b = a.prototype,
              c = [];
            for (var d in b) {
              "function" == typeof b[d] && "constructor" !== d && c.push(d);
            }
            return c;
          }
          var c = {};
          ((c.Extend = function (a, b) {
            function c() {
              this.constructor = a;
            }
            var d = {}.hasOwnProperty;
            for (var e in b) d.call(b, e) && (a[e] = b[e]);
            return (
              (c.prototype = b.prototype),
              (a.prototype = new c()),
              (a.__super__ = b.prototype),
              a
            );
          }),
            (c.Decorate = function (a, c) {
              function d() {
                var b = Array.prototype.unshift,
                  d = c.prototype.constructor.length,
                  e = a.prototype.constructor;
                (d > 0 &&
                  (b.call(arguments, a.prototype.constructor),
                  (e = c.prototype.constructor)),
                  e.apply(this, arguments));
              }
              function e() {
                this.constructor = d;
              }
              var f = b(c),
                g = b(a);
              ((c.displayName = a.displayName), (d.prototype = new e()));
              for (var h = 0; h < g.length; h++) {
                var i = g[h];
                d.prototype[i] = a.prototype[i];
              }
              for (
                var j = function (a) {
                    var b = function () {};
                    (a in d.prototype) && (b = d.prototype[a]);
                    var e = c.prototype[a];
                    return function () {
                      return (
                        Array.prototype.unshift.call(arguments, b),
                        e.apply(this, arguments)
                      );
                    };
                  },
                  k = 0;
                k < f.length;
                k++
              ) {
                var l = f[k];
                d.prototype[l] = j(l);
              }
              return d;
            }));
          var d = function () {
            this.listeners = {};
          };
          ((d.prototype.on = function (a, b) {
            ((this.listeners = this.listeners || {}),
              a in this.listeners
                ? this.listeners[a].push(b)
                : (this.listeners[a] = [b]));
          }),
            (d.prototype.trigger = function (a) {
              var b = Array.prototype.slice,
                c = b.call(arguments, 1);
              ((this.listeners = this.listeners || {}),
                null == c && (c = []),
                0 === c.length && c.push({}),
                (c[0]._type = a),
                a in this.listeners &&
                  this.invoke(this.listeners[a], b.call(arguments, 1)),
                "*" in this.listeners &&
                  this.invoke(this.listeners["*"], arguments));
            }),
            (d.prototype.invoke = function (a, b) {
              for (var c = 0, d = a.length; c < d; c++) a[c].apply(this, b);
            }),
            (c.Observable = d),
            (c.generateChars = function (a) {
              for (var b = "", c = 0; c < a; c++) {
                b += Math.floor(36 * Math.random()).toString(36);
              }
              return b;
            }),
            (c.bind = function (a, b) {
              return function () {
                a.apply(b, arguments);
              };
            }),
            (c._convertData = function (a) {
              for (var b in a) {
                var c = b.split("-"),
                  d = a;
                if (1 !== c.length) {
                  for (var e = 0; e < c.length; e++) {
                    var f = c[e];
                    ((f = f.substring(0, 1).toLowerCase() + f.substring(1)),
                      f in d || (d[f] = {}),
                      e == c.length - 1 && (d[f] = a[b]),
                      (d = d[f]));
                  }
                  delete a[b];
                }
              }
              return a;
            }),
            (c.hasScroll = function (b, c) {
              var d = a(c),
                e = c.style.overflowX,
                f = c.style.overflowY;
              return (
                (e !== f || ("hidden" !== f && "visible" !== f)) &&
                ("scroll" === e ||
                  "scroll" === f ||
                  d.innerHeight() < c.scrollHeight ||
                  d.innerWidth() < c.scrollWidth)
              );
            }),
            (c.escapeMarkup = function (a) {
              var b = {
                "\\": "&#92;",
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#47;",
              };
              return "string" != typeof a
                ? a
                : String(a).replace(/[&<>"'\/\\]/g, function (a) {
                    return b[a];
                  });
            }),
            (c.appendMany = function (b, c) {
              if ("1.7" === a.fn.jquery.substr(0, 3)) {
                var d = a();
                (a.map(c, function (a) {
                  d = d.add(a);
                }),
                  (c = d));
              }
              b.append(c);
            }),
            (c.__cache = {}));
          var e = 0;
          return (
            (c.GetUniqueElementId = function (a) {
              var b = a.getAttribute("data-select2-id");
              return (
                null == b &&
                  (a.id
                    ? ((b = a.id), a.setAttribute("data-select2-id", b))
                    : (a.setAttribute("data-select2-id", ++e),
                      (b = e.toString()))),
                b
              );
            }),
            (c.StoreData = function (a, b, d) {
              var e = c.GetUniqueElementId(a);
              (c.__cache[e] || (c.__cache[e] = {}), (c.__cache[e][b] = d));
            }),
            (c.GetData = function (b, d) {
              var e = c.GetUniqueElementId(b);
              return d
                ? c.__cache[e] && null != c.__cache[e][d]
                  ? c.__cache[e][d]
                  : a(b).data(d)
                : c.__cache[e];
            }),
            (c.RemoveData = function (a) {
              var b = c.GetUniqueElementId(a);
              null != c.__cache[b] && delete c.__cache[b];
            }),
            c
          );
        }),
        b.define("select2/results", ["jquery", "./utils"], function (a, b) {
          function c(a, b, d) {
            ((this.$element = a),
              (this.data = d),
              (this.options = b),
              c.__super__.constructor.call(this));
          }
          return (
            b.Extend(c, b.Observable),
            (c.prototype.render = function () {
              var b = a(
                '<ul class="select2-results__options" role="tree"></ul>',
              );
              return (
                this.options.get("multiple") &&
                  b.attr("aria-multiselectable", "true"),
                (this.$results = b),
                b
              );
            }),
            (c.prototype.clear = function () {
              this.$results.empty();
            }),
            (c.prototype.displayMessage = function (b) {
              var c = this.options.get("escapeMarkup");
              (this.clear(), this.hideLoading());
              var d = a(
                  '<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>',
                ),
                e = this.options.get("translations").get(b.message);
              (d.append(c(e(b.args))),
                (d[0].className += " select2-results__message"),
                this.$results.append(d));
            }),
            (c.prototype.hideMessages = function () {
              this.$results.find(".select2-results__message").remove();
            }),
            (c.prototype.append = function (a) {
              this.hideLoading();
              var b = [];
              if (null == a.results || 0 === a.results.length)
                return void (
                  0 === this.$results.children().length &&
                  this.trigger("results:message", { message: "noResults" })
                );
              a.results = this.sort(a.results);
              for (var c = 0; c < a.results.length; c++) {
                var d = a.results[c],
                  e = this.option(d);
                b.push(e);
              }
              this.$results.append(b);
            }),
            (c.prototype.position = function (a, b) {
              b.find(".select2-results").append(a);
            }),
            (c.prototype.sort = function (a) {
              return this.options.get("sorter")(a);
            }),
            (c.prototype.highlightFirstItem = function () {
              var a = this.$results.find(
                  ".select2-results__option[aria-selected]",
                ),
                b = a.filter("[aria-selected=true]");
              (b.length > 0
                ? b.first().trigger("mouseenter")
                : a.first().trigger("mouseenter"),
                this.ensureHighlightVisible());
            }),
            (c.prototype.setClasses = function () {
              var c = this;
              this.data.current(function (d) {
                var e = a.map(d, function (a) {
                  return a.id.toString();
                });
                c.$results
                  .find(".select2-results__option[aria-selected]")
                  .each(function () {
                    var c = a(this),
                      d = b.GetData(this, "data"),
                      f = "" + d.id;
                    (null != d.element && d.element.selected) ||
                    (null == d.element && a.inArray(f, e) > -1)
                      ? c.attr("aria-selected", "true")
                      : c.attr("aria-selected", "false");
                  });
              });
            }),
            (c.prototype.showLoading = function (a) {
              this.hideLoading();
              var b = this.options.get("translations").get("searching"),
                c = { disabled: !0, loading: !0, text: b(a) },
                d = this.option(c);
              ((d.className += " loading-results"), this.$results.prepend(d));
            }),
            (c.prototype.hideLoading = function () {
              this.$results.find(".loading-results").remove();
            }),
            (c.prototype.option = function (c) {
              var d = document.createElement("li");
              d.className = "select2-results__option";
              var e = { role: "treeitem", "aria-selected": "false" };
              (c.disabled &&
                (delete e["aria-selected"], (e["aria-disabled"] = "true")),
                null == c.id && delete e["aria-selected"],
                null != c._resultId && (d.id = c._resultId),
                c.title && (d.title = c.title),
                c.children &&
                  ((e.role = "group"),
                  (e["aria-label"] = c.text),
                  delete e["aria-selected"]));
              for (var f in e) {
                var g = e[f];
                d.setAttribute(f, g);
              }
              if (c.children) {
                var h = a(d),
                  i = document.createElement("strong");
                i.className = "select2-results__group";
                a(i);
                this.template(c, i);
                for (var j = [], k = 0; k < c.children.length; k++) {
                  var l = c.children[k],
                    m = this.option(l);
                  j.push(m);
                }
                var n = a("<ul></ul>", {
                  class:
                    "select2-results__options select2-results__options--nested",
                });
                (n.append(j), h.append(i), h.append(n));
              } else this.template(c, d);
              return (b.StoreData(d, "data", c), d);
            }),
            (c.prototype.bind = function (c, d) {
              var e = this,
                f = c.id + "-results";
              (this.$results.attr("id", f),
                c.on("results:all", function (a) {
                  (e.clear(),
                    e.append(a.data),
                    c.isOpen() && (e.setClasses(), e.highlightFirstItem()));
                }),
                c.on("results:append", function (a) {
                  (e.append(a.data), c.isOpen() && e.setClasses());
                }),
                c.on("query", function (a) {
                  (e.hideMessages(), e.showLoading(a));
                }),
                c.on("select", function () {
                  c.isOpen() && (e.setClasses(), e.highlightFirstItem());
                }),
                c.on("unselect", function () {
                  c.isOpen() && (e.setClasses(), e.highlightFirstItem());
                }),
                c.on("open", function () {
                  (e.$results.attr("aria-expanded", "true"),
                    e.$results.attr("aria-hidden", "false"),
                    e.setClasses(),
                    e.ensureHighlightVisible());
                }),
                c.on("close", function () {
                  (e.$results.attr("aria-expanded", "false"),
                    e.$results.attr("aria-hidden", "true"),
                    e.$results.removeAttr("aria-activedescendant"));
                }),
                c.on("results:toggle", function () {
                  var a = e.getHighlightedResults();
                  0 !== a.length && a.trigger("mouseup");
                }),
                c.on("results:select", function () {
                  var a = e.getHighlightedResults();
                  if (0 !== a.length) {
                    var c = b.GetData(a[0], "data");
                    "true" == a.attr("aria-selected")
                      ? e.trigger("close", {})
                      : e.trigger("select", { data: c });
                  }
                }),
                c.on("results:previous", function () {
                  var a = e.getHighlightedResults(),
                    b = e.$results.find("[aria-selected]"),
                    c = b.index(a);
                  if (!(c <= 0)) {
                    var d = c - 1;
                    0 === a.length && (d = 0);
                    var f = b.eq(d);
                    f.trigger("mouseenter");
                    var g = e.$results.offset().top,
                      h = f.offset().top,
                      i = e.$results.scrollTop() + (h - g);
                    0 === d
                      ? e.$results.scrollTop(0)
                      : h - g < 0 && e.$results.scrollTop(i);
                  }
                }),
                c.on("results:next", function () {
                  var a = e.getHighlightedResults(),
                    b = e.$results.find("[aria-selected]"),
                    c = b.index(a),
                    d = c + 1;
                  if (!(d >= b.length)) {
                    var f = b.eq(d);
                    f.trigger("mouseenter");
                    var g =
                        e.$results.offset().top + e.$results.outerHeight(!1),
                      h = f.offset().top + f.outerHeight(!1),
                      i = e.$results.scrollTop() + h - g;
                    0 === d
                      ? e.$results.scrollTop(0)
                      : h > g && e.$results.scrollTop(i);
                  }
                }),
                c.on("results:focus", function (a) {
                  a.element.addClass("select2-results__option--highlighted");
                }),
                c.on("results:message", function (a) {
                  e.displayMessage(a);
                }),
                a.fn.mousewheel &&
                  this.$results.on("mousewheel", function (a) {
                    var b = e.$results.scrollTop(),
                      c = e.$results.get(0).scrollHeight - b + a.deltaY,
                      d = a.deltaY > 0 && b - a.deltaY <= 0,
                      f = a.deltaY < 0 && c <= e.$results.height();
                    d
                      ? (e.$results.scrollTop(0),
                        a.preventDefault(),
                        a.stopPropagation())
                      : f &&
                        (e.$results.scrollTop(
                          e.$results.get(0).scrollHeight - e.$results.height(),
                        ),
                        a.preventDefault(),
                        a.stopPropagation());
                  }),
                this.$results.on(
                  "mouseup",
                  ".select2-results__option[aria-selected]",
                  function (c) {
                    var d = a(this),
                      f = b.GetData(this, "data");
                    if ("true" === d.attr("aria-selected"))
                      return void (e.options.get("multiple")
                        ? e.trigger("unselect", { originalEvent: c, data: f })
                        : e.trigger("close", {}));
                    e.trigger("select", { originalEvent: c, data: f });
                  },
                ),
                this.$results.on(
                  "mouseenter",
                  ".select2-results__option[aria-selected]",
                  function (c) {
                    var d = b.GetData(this, "data");
                    (e
                      .getHighlightedResults()
                      .removeClass("select2-results__option--highlighted"),
                      e.trigger("results:focus", {
                        data: d,
                        element: a(this),
                      }));
                  },
                ));
            }),
            (c.prototype.getHighlightedResults = function () {
              return this.$results.find(
                ".select2-results__option--highlighted",
              );
            }),
            (c.prototype.destroy = function () {
              this.$results.remove();
            }),
            (c.prototype.ensureHighlightVisible = function () {
              var a = this.getHighlightedResults();
              if (0 !== a.length) {
                var b = this.$results.find("[aria-selected]"),
                  c = b.index(a),
                  d = this.$results.offset().top,
                  e = a.offset().top,
                  f = this.$results.scrollTop() + (e - d),
                  g = e - d;
                ((f -= 2 * a.outerHeight(!1)),
                  c <= 2
                    ? this.$results.scrollTop(0)
                    : (g > this.$results.outerHeight() || g < 0) &&
                      this.$results.scrollTop(f));
              }
            }),
            (c.prototype.template = function (b, c) {
              var d = this.options.get("templateResult"),
                e = this.options.get("escapeMarkup"),
                f = d(b, c);
              null == f
                ? (c.style.display = "none")
                : "string" == typeof f
                  ? (c.innerHTML = e(f))
                  : a(c).append(f);
            }),
            c
          );
        }),
        b.define("select2/keys", [], function () {
          return {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46,
          };
        }),
        b.define(
          "select2/selection/base",
          ["jquery", "../utils", "../keys"],
          function (a, b, c) {
            function d(a, b) {
              ((this.$element = a),
                (this.options = b),
                d.__super__.constructor.call(this));
            }
            return (
              b.Extend(d, b.Observable),
              (d.prototype.render = function () {
                var c = a(
                  '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>',
                );
                return (
                  (this._tabindex = 0),
                  null != b.GetData(this.$element[0], "old-tabindex")
                    ? (this._tabindex = b.GetData(
                        this.$element[0],
                        "old-tabindex",
                      ))
                    : null != this.$element.attr("tabindex") &&
                      (this._tabindex = this.$element.attr("tabindex")),
                  c.attr("title", this.$element.attr("title")),
                  c.attr("tabindex", this._tabindex),
                  (this.$selection = c),
                  c
                );
              }),
              (d.prototype.bind = function (a, b) {
                var d = this,
                  e = (a.id, a.id + "-results");
                ((this.container = a),
                  this.$selection.on("focus", function (a) {
                    d.trigger("focus", a);
                  }),
                  this.$selection.on("blur", function (a) {
                    d._handleBlur(a);
                  }),
                  this.$selection.on("keydown", function (a) {
                    (d.trigger("keypress", a),
                      a.which === c.SPACE && a.preventDefault());
                  }),
                  a.on("results:focus", function (a) {
                    d.$selection.attr(
                      "aria-activedescendant",
                      a.data._resultId,
                    );
                  }),
                  a.on("selection:update", function (a) {
                    d.update(a.data);
                  }),
                  a.on("open", function () {
                    (d.$selection.attr("aria-expanded", "true"),
                      d.$selection.attr("aria-owns", e),
                      d._attachCloseHandler(a));
                  }),
                  a.on("close", function () {
                    (d.$selection.attr("aria-expanded", "false"),
                      d.$selection.removeAttr("aria-activedescendant"),
                      d.$selection.removeAttr("aria-owns"),
                      d.$selection.focus(),
                      window.setTimeout(function () {
                        d.$selection.focus();
                      }, 0),
                      d._detachCloseHandler(a));
                  }),
                  a.on("enable", function () {
                    d.$selection.attr("tabindex", d._tabindex);
                  }),
                  a.on("disable", function () {
                    d.$selection.attr("tabindex", "-1");
                  }));
              }),
              (d.prototype._handleBlur = function (b) {
                var c = this;
                window.setTimeout(function () {
                  document.activeElement == c.$selection[0] ||
                    a.contains(c.$selection[0], document.activeElement) ||
                    c.trigger("blur", b);
                }, 1);
              }),
              (d.prototype._attachCloseHandler = function (c) {
                a(document.body).on("mousedown.select2." + c.id, function (c) {
                  var d = a(c.target),
                    e = d.closest(".select2");
                  a(".select2.select2-container--open").each(function () {
                    (a(this),
                      this != e[0] &&
                        b.GetData(this, "element").select2("close"));
                  });
                });
              }),
              (d.prototype._detachCloseHandler = function (b) {
                a(document.body).off("mousedown.select2." + b.id);
              }),
              (d.prototype.position = function (a, b) {
                b.find(".selection").append(a);
              }),
              (d.prototype.destroy = function () {
                this._detachCloseHandler(this.container);
              }),
              (d.prototype.update = function (a) {
                throw new Error(
                  "The `update` method must be defined in child classes.",
                );
              }),
              d
            );
          },
        ),
        b.define(
          "select2/selection/single",
          ["jquery", "./base", "../utils", "../keys"],
          function (a, b, c, d) {
            function e() {
              e.__super__.constructor.apply(this, arguments);
            }
            return (
              c.Extend(e, b),
              (e.prototype.render = function () {
                var a = e.__super__.render.call(this);
                return (
                  a.addClass("select2-selection--single"),
                  a.html(
                    '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>',
                  ),
                  a
                );
              }),
              (e.prototype.bind = function (a, b) {
                var c = this;
                e.__super__.bind.apply(this, arguments);
                var d = a.id + "-container";
                (this.$selection
                  .find(".select2-selection__rendered")
                  .attr("id", d)
                  .attr("role", "textbox")
                  .attr("aria-readonly", "true"),
                  this.$selection.attr("aria-labelledby", d),
                  this.$selection.on("mousedown", function (a) {
                    1 === a.which && c.trigger("toggle", { originalEvent: a });
                  }),
                  this.$selection.on("focus", function (a) {}),
                  this.$selection.on("blur", function (a) {}),
                  a.on("focus", function (b) {
                    a.isOpen() || c.$selection.focus();
                  }));
              }),
              (e.prototype.clear = function () {
                var a = this.$selection.find(".select2-selection__rendered");
                (a.empty(), a.removeAttr("title"));
              }),
              (e.prototype.display = function (a, b) {
                var c = this.options.get("templateSelection");
                return this.options.get("escapeMarkup")(c(a, b));
              }),
              (e.prototype.selectionContainer = function () {
                return a("<span></span>");
              }),
              (e.prototype.update = function (a) {
                if (0 === a.length) return void this.clear();
                var b = a[0],
                  c = this.$selection.find(".select2-selection__rendered"),
                  d = this.display(b, c);
                (c.empty().append(d), c.attr("title", b.title || b.text));
              }),
              e
            );
          },
        ),
        b.define(
          "select2/selection/multiple",
          ["jquery", "./base", "../utils"],
          function (a, b, c) {
            function d(a, b) {
              d.__super__.constructor.apply(this, arguments);
            }
            return (
              c.Extend(d, b),
              (d.prototype.render = function () {
                var a = d.__super__.render.call(this);
                return (
                  a.addClass("select2-selection--multiple"),
                  a.html('<ul class="select2-selection__rendered"></ul>'),
                  a
                );
              }),
              (d.prototype.bind = function (b, e) {
                var f = this;
                (d.__super__.bind.apply(this, arguments),
                  this.$selection.on("click", function (a) {
                    f.trigger("toggle", { originalEvent: a });
                  }),
                  this.$selection.on(
                    "click",
                    ".select2-selection__choice__remove",
                    function (b) {
                      if (!f.options.get("disabled")) {
                        var d = a(this),
                          e = d.parent(),
                          g = c.GetData(e[0], "data");
                        f.trigger("unselect", { originalEvent: b, data: g });
                      }
                    },
                  ));
              }),
              (d.prototype.clear = function () {
                var a = this.$selection.find(".select2-selection__rendered");
                (a.empty(), a.removeAttr("title"));
              }),
              (d.prototype.display = function (a, b) {
                var c = this.options.get("templateSelection");
                return this.options.get("escapeMarkup")(c(a, b));
              }),
              (d.prototype.selectionContainer = function () {
                return a(
                  '<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>',
                );
              }),
              (d.prototype.update = function (a) {
                if ((this.clear(), 0 !== a.length)) {
                  for (var b = [], d = 0; d < a.length; d++) {
                    var e = a[d],
                      f = this.selectionContainer(),
                      g = this.display(e, f);
                    (f.append(g),
                      f.attr("title", e.title || e.text),
                      c.StoreData(f[0], "data", e),
                      b.push(f));
                  }
                  var h = this.$selection.find(".select2-selection__rendered");
                  c.appendMany(h, b);
                }
              }),
              d
            );
          },
        ),
        b.define("select2/selection/placeholder", ["../utils"], function (a) {
          function b(a, b, c) {
            ((this.placeholder = this.normalizePlaceholder(
              c.get("placeholder"),
            )),
              a.call(this, b, c));
          }
          return (
            (b.prototype.normalizePlaceholder = function (a, b) {
              return ("string" == typeof b && (b = { id: "", text: b }), b);
            }),
            (b.prototype.createPlaceholder = function (a, b) {
              var c = this.selectionContainer();
              return (
                c.html(this.display(b)),
                c
                  .addClass("select2-selection__placeholder")
                  .removeClass("select2-selection__choice"),
                c
              );
            }),
            (b.prototype.update = function (a, b) {
              var c = 1 == b.length && b[0].id != this.placeholder.id;
              if (b.length > 1 || c) return a.call(this, b);
              this.clear();
              var d = this.createPlaceholder(this.placeholder);
              this.$selection.find(".select2-selection__rendered").append(d);
            }),
            b
          );
        }),
        b.define(
          "select2/selection/allowClear",
          ["jquery", "../keys", "../utils"],
          function (a, b, c) {
            function d() {}
            return (
              (d.prototype.bind = function (a, b, c) {
                var d = this;
                (a.call(this, b, c),
                  null == this.placeholder &&
                    this.options.get("debug") &&
                    window.console &&
                    console.error &&
                    console.error(
                      "Select2: The `allowClear` option should be used in combination with the `placeholder` option.",
                    ),
                  this.$selection.on(
                    "mousedown",
                    ".select2-selection__clear",
                    function (a) {
                      d._handleClear(a);
                    },
                  ),
                  b.on("keypress", function (a) {
                    d._handleKeyboardClear(a, b);
                  }));
              }),
              (d.prototype._handleClear = function (a, b) {
                if (!this.options.get("disabled")) {
                  var d = this.$selection.find(".select2-selection__clear");
                  if (0 !== d.length) {
                    b.stopPropagation();
                    var e = c.GetData(d[0], "data"),
                      f = this.$element.val();
                    this.$element.val(this.placeholder.id);
                    var g = { data: e };
                    if ((this.trigger("clear", g), g.prevented))
                      return void this.$element.val(f);
                    for (var h = 0; h < e.length; h++)
                      if (
                        ((g = { data: e[h] }),
                        this.trigger("unselect", g),
                        g.prevented)
                      )
                        return void this.$element.val(f);
                    (this.$element.trigger("change"),
                      this.trigger("toggle", {}));
                  }
                }
              }),
              (d.prototype._handleKeyboardClear = function (a, c, d) {
                d.isOpen() ||
                  (c.which != b.DELETE && c.which != b.BACKSPACE) ||
                  this._handleClear(c);
              }),
              (d.prototype.update = function (b, d) {
                if (
                  (b.call(this, d),
                  !(
                    this.$selection.find(".select2-selection__placeholder")
                      .length > 0 || 0 === d.length
                  ))
                ) {
                  var e = a(
                    '<span class="select2-selection__clear">&times;</span>',
                  );
                  (c.StoreData(e[0], "data", d),
                    this.$selection
                      .find(".select2-selection__rendered")
                      .prepend(e));
                }
              }),
              d
            );
          },
        ),
        b.define(
          "select2/selection/search",
          ["jquery", "../utils", "../keys"],
          function (a, b, c) {
            function d(a, b, c) {
              a.call(this, b, c);
            }
            return (
              (d.prototype.render = function (b) {
                var c = a(
                  '<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>',
                );
                ((this.$searchContainer = c), (this.$search = c.find("input")));
                var d = b.call(this);
                return (this._transferTabIndex(), d);
              }),
              (d.prototype.bind = function (a, d, e) {
                var f = this;
                (a.call(this, d, e),
                  d.on("open", function () {
                    f.$search.trigger("focus");
                  }),
                  d.on("close", function () {
                    (f.$search.val(""),
                      f.$search.removeAttr("aria-activedescendant"),
                      f.$search.trigger("focus"));
                  }),
                  d.on("enable", function () {
                    (f.$search.prop("disabled", !1), f._transferTabIndex());
                  }),
                  d.on("disable", function () {
                    f.$search.prop("disabled", !0);
                  }),
                  d.on("focus", function (a) {
                    f.$search.trigger("focus");
                  }),
                  d.on("results:focus", function (a) {
                    f.$search.attr("aria-activedescendant", a.id);
                  }),
                  this.$selection.on(
                    "focusin",
                    ".select2-search--inline",
                    function (a) {
                      f.trigger("focus", a);
                    },
                  ),
                  this.$selection.on(
                    "focusout",
                    ".select2-search--inline",
                    function (a) {
                      f._handleBlur(a);
                    },
                  ),
                  this.$selection.on(
                    "keydown",
                    ".select2-search--inline",
                    function (a) {
                      if (
                        (a.stopPropagation(),
                        f.trigger("keypress", a),
                        (f._keyUpPrevented = a.isDefaultPrevented()),
                        a.which === c.BACKSPACE && "" === f.$search.val())
                      ) {
                        var d = f.$searchContainer.prev(
                          ".select2-selection__choice",
                        );
                        if (d.length > 0) {
                          var e = b.GetData(d[0], "data");
                          (f.searchRemoveChoice(e), a.preventDefault());
                        }
                      }
                    },
                  ));
                var g = document.documentMode,
                  h = g && g <= 11;
                (this.$selection.on(
                  "input.searchcheck",
                  ".select2-search--inline",
                  function (a) {
                    if (h)
                      return void f.$selection.off(
                        "input.search input.searchcheck",
                      );
                    f.$selection.off("keyup.search");
                  },
                ),
                  this.$selection.on(
                    "keyup.search input.search",
                    ".select2-search--inline",
                    function (a) {
                      if (h && "input" === a.type)
                        return void f.$selection.off(
                          "input.search input.searchcheck",
                        );
                      var b = a.which;
                      b != c.SHIFT &&
                        b != c.CTRL &&
                        b != c.ALT &&
                        b != c.TAB &&
                        f.handleSearch(a);
                    },
                  ));
              }),
              (d.prototype._transferTabIndex = function (a) {
                (this.$search.attr(
                  "tabindex",
                  this.$selection.attr("tabindex"),
                ),
                  this.$selection.attr("tabindex", "-1"));
              }),
              (d.prototype.createPlaceholder = function (a, b) {
                this.$search.attr("placeholder", b.text);
              }),
              (d.prototype.update = function (a, b) {
                var c = this.$search[0] == document.activeElement;
                if (
                  (this.$search.attr("placeholder", ""),
                  a.call(this, b),
                  this.$selection
                    .find(".select2-selection__rendered")
                    .append(this.$searchContainer),
                  this.resizeSearch(),
                  c)
                ) {
                  this.$element.find("[data-select2-tag]").length
                    ? this.$element.focus()
                    : this.$search.focus();
                }
              }),
              (d.prototype.handleSearch = function () {
                if ((this.resizeSearch(), !this._keyUpPrevented)) {
                  var a = this.$search.val();
                  this.trigger("query", { term: a });
                }
                this._keyUpPrevented = !1;
              }),
              (d.prototype.searchRemoveChoice = function (a, b) {
                (this.trigger("unselect", { data: b }),
                  this.$search.val(b.text),
                  this.handleSearch());
              }),
              (d.prototype.resizeSearch = function () {
                this.$search.css("width", "25px");
                var a = "";
                if ("" !== this.$search.attr("placeholder"))
                  a = this.$selection
                    .find(".select2-selection__rendered")
                    .innerWidth();
                else {
                  a = 0.75 * (this.$search.val().length + 1) + "em";
                }
                this.$search.css("width", a);
              }),
              d
            );
          },
        ),
        b.define("select2/selection/eventRelay", ["jquery"], function (a) {
          function b() {}
          return (
            (b.prototype.bind = function (b, c, d) {
              var e = this,
                f = [
                  "open",
                  "opening",
                  "close",
                  "closing",
                  "select",
                  "selecting",
                  "unselect",
                  "unselecting",
                  "clear",
                  "clearing",
                ],
                g = [
                  "opening",
                  "closing",
                  "selecting",
                  "unselecting",
                  "clearing",
                ];
              (b.call(this, c, d),
                c.on("*", function (b, c) {
                  if (-1 !== a.inArray(b, f)) {
                    c = c || {};
                    var d = a.Event("select2:" + b, { params: c });
                    (e.$element.trigger(d),
                      -1 !== a.inArray(b, g) &&
                        (c.prevented = d.isDefaultPrevented()));
                  }
                }));
            }),
            b
          );
        }),
        b.define("select2/translation", ["jquery", "require"], function (a, b) {
          function c(a) {
            this.dict = a || {};
          }
          return (
            (c.prototype.all = function () {
              return this.dict;
            }),
            (c.prototype.get = function (a) {
              return this.dict[a];
            }),
            (c.prototype.extend = function (b) {
              this.dict = a.extend({}, b.all(), this.dict);
            }),
            (c._cache = {}),
            (c.loadPath = function (a) {
              if (!(a in c._cache)) {
                var d = b(a);
                c._cache[a] = d;
              }
              return new c(c._cache[a]);
            }),
            c
          );
        }),
        b.define("select2/diacritics", [], function () {
          return {
            "Ⓐ": "A",
            Ａ: "A",
            À: "A",
            Á: "A",
            Â: "A",
            Ầ: "A",
            Ấ: "A",
            Ẫ: "A",
            Ẩ: "A",
            Ã: "A",
            Ā: "A",
            Ă: "A",
            Ằ: "A",
            Ắ: "A",
            Ẵ: "A",
            Ẳ: "A",
            Ȧ: "A",
            Ǡ: "A",
            Ä: "A",
            Ǟ: "A",
            Ả: "A",
            Å: "A",
            Ǻ: "A",
            Ǎ: "A",
            Ȁ: "A",
            Ȃ: "A",
            Ạ: "A",
            Ậ: "A",
            Ặ: "A",
            Ḁ: "A",
            Ą: "A",
            Ⱥ: "A",
            Ɐ: "A",
            Ꜳ: "AA",
            Æ: "AE",
            Ǽ: "AE",
            Ǣ: "AE",
            Ꜵ: "AO",
            Ꜷ: "AU",
            Ꜹ: "AV",
            Ꜻ: "AV",
            Ꜽ: "AY",
            "Ⓑ": "B",
            Ｂ: "B",
            Ḃ: "B",
            Ḅ: "B",
            Ḇ: "B",
            Ƀ: "B",
            Ƃ: "B",
            Ɓ: "B",
            "Ⓒ": "C",
            Ｃ: "C",
            Ć: "C",
            Ĉ: "C",
            Ċ: "C",
            Č: "C",
            Ç: "C",
            Ḉ: "C",
            Ƈ: "C",
            Ȼ: "C",
            Ꜿ: "C",
            "Ⓓ": "D",
            Ｄ: "D",
            Ḋ: "D",
            Ď: "D",
            Ḍ: "D",
            Ḑ: "D",
            Ḓ: "D",
            Ḏ: "D",
            Đ: "D",
            Ƌ: "D",
            Ɗ: "D",
            Ɖ: "D",
            Ꝺ: "D",
            Ǳ: "DZ",
            Ǆ: "DZ",
            ǲ: "Dz",
            ǅ: "Dz",
            "Ⓔ": "E",
            Ｅ: "E",
            È: "E",
            É: "E",
            Ê: "E",
            Ề: "E",
            Ế: "E",
            Ễ: "E",
            Ể: "E",
            Ẽ: "E",
            Ē: "E",
            Ḕ: "E",
            Ḗ: "E",
            Ĕ: "E",
            Ė: "E",
            Ë: "E",
            Ẻ: "E",
            Ě: "E",
            Ȅ: "E",
            Ȇ: "E",
            Ẹ: "E",
            Ệ: "E",
            Ȩ: "E",
            Ḝ: "E",
            Ę: "E",
            Ḙ: "E",
            Ḛ: "E",
            Ɛ: "E",
            Ǝ: "E",
            "Ⓕ": "F",
            Ｆ: "F",
            Ḟ: "F",
            Ƒ: "F",
            Ꝼ: "F",
            "Ⓖ": "G",
            Ｇ: "G",
            Ǵ: "G",
            Ĝ: "G",
            Ḡ: "G",
            Ğ: "G",
            Ġ: "G",
            Ǧ: "G",
            Ģ: "G",
            Ǥ: "G",
            Ɠ: "G",
            Ꞡ: "G",
            Ᵹ: "G",
            Ꝿ: "G",
            "Ⓗ": "H",
            Ｈ: "H",
            Ĥ: "H",
            Ḣ: "H",
            Ḧ: "H",
            Ȟ: "H",
            Ḥ: "H",
            Ḩ: "H",
            Ḫ: "H",
            Ħ: "H",
            Ⱨ: "H",
            Ⱶ: "H",
            Ɥ: "H",
            "Ⓘ": "I",
            Ｉ: "I",
            Ì: "I",
            Í: "I",
            Î: "I",
            Ĩ: "I",
            Ī: "I",
            Ĭ: "I",
            İ: "I",
            Ï: "I",
            Ḯ: "I",
            Ỉ: "I",
            Ǐ: "I",
            Ȉ: "I",
            Ȋ: "I",
            Ị: "I",
            Į: "I",
            Ḭ: "I",
            Ɨ: "I",
            "Ⓙ": "J",
            Ｊ: "J",
            Ĵ: "J",
            Ɉ: "J",
            "Ⓚ": "K",
            Ｋ: "K",
            Ḱ: "K",
            Ǩ: "K",
            Ḳ: "K",
            Ķ: "K",
            Ḵ: "K",
            Ƙ: "K",
            Ⱪ: "K",
            Ꝁ: "K",
            Ꝃ: "K",
            Ꝅ: "K",
            Ꞣ: "K",
            "Ⓛ": "L",
            Ｌ: "L",
            Ŀ: "L",
            Ĺ: "L",
            Ľ: "L",
            Ḷ: "L",
            Ḹ: "L",
            Ļ: "L",
            Ḽ: "L",
            Ḻ: "L",
            Ł: "L",
            Ƚ: "L",
            Ɫ: "L",
            Ⱡ: "L",
            Ꝉ: "L",
            Ꝇ: "L",
            Ꞁ: "L",
            Ǉ: "LJ",
            ǈ: "Lj",
            "Ⓜ": "M",
            Ｍ: "M",
            Ḿ: "M",
            Ṁ: "M",
            Ṃ: "M",
            Ɱ: "M",
            Ɯ: "M",
            "Ⓝ": "N",
            Ｎ: "N",
            Ǹ: "N",
            Ń: "N",
            Ñ: "N",
            Ṅ: "N",
            Ň: "N",
            Ṇ: "N",
            Ņ: "N",
            Ṋ: "N",
            Ṉ: "N",
            Ƞ: "N",
            Ɲ: "N",
            Ꞑ: "N",
            Ꞥ: "N",
            Ǌ: "NJ",
            ǋ: "Nj",
            "Ⓞ": "O",
            Ｏ: "O",
            Ò: "O",
            Ó: "O",
            Ô: "O",
            Ồ: "O",
            Ố: "O",
            Ỗ: "O",
            Ổ: "O",
            Õ: "O",
            Ṍ: "O",
            Ȭ: "O",
            Ṏ: "O",
            Ō: "O",
            Ṑ: "O",
            Ṓ: "O",
            Ŏ: "O",
            Ȯ: "O",
            Ȱ: "O",
            Ö: "O",
            Ȫ: "O",
            Ỏ: "O",
            Ő: "O",
            Ǒ: "O",
            Ȍ: "O",
            Ȏ: "O",
            Ơ: "O",
            Ờ: "O",
            Ớ: "O",
            Ỡ: "O",
            Ở: "O",
            Ợ: "O",
            Ọ: "O",
            Ộ: "O",
            Ǫ: "O",
            Ǭ: "O",
            Ø: "O",
            Ǿ: "O",
            Ɔ: "O",
            Ɵ: "O",
            Ꝋ: "O",
            Ꝍ: "O",
            Ƣ: "OI",
            Ꝏ: "OO",
            Ȣ: "OU",
            "Ⓟ": "P",
            Ｐ: "P",
            Ṕ: "P",
            Ṗ: "P",
            Ƥ: "P",
            Ᵽ: "P",
            Ꝑ: "P",
            Ꝓ: "P",
            Ꝕ: "P",
            "Ⓠ": "Q",
            Ｑ: "Q",
            Ꝗ: "Q",
            Ꝙ: "Q",
            Ɋ: "Q",
            "Ⓡ": "R",
            Ｒ: "R",
            Ŕ: "R",
            Ṙ: "R",
            Ř: "R",
            Ȑ: "R",
            Ȓ: "R",
            Ṛ: "R",
            Ṝ: "R",
            Ŗ: "R",
            Ṟ: "R",
            Ɍ: "R",
            Ɽ: "R",
            Ꝛ: "R",
            Ꞧ: "R",
            Ꞃ: "R",
            "Ⓢ": "S",
            Ｓ: "S",
            ẞ: "S",
            Ś: "S",
            Ṥ: "S",
            Ŝ: "S",
            Ṡ: "S",
            Š: "S",
            Ṧ: "S",
            Ṣ: "S",
            Ṩ: "S",
            Ș: "S",
            Ş: "S",
            Ȿ: "S",
            Ꞩ: "S",
            Ꞅ: "S",
            "Ⓣ": "T",
            Ｔ: "T",
            Ṫ: "T",
            Ť: "T",
            Ṭ: "T",
            Ț: "T",
            Ţ: "T",
            Ṱ: "T",
            Ṯ: "T",
            Ŧ: "T",
            Ƭ: "T",
            Ʈ: "T",
            Ⱦ: "T",
            Ꞇ: "T",
            Ꜩ: "TZ",
            "Ⓤ": "U",
            Ｕ: "U",
            Ù: "U",
            Ú: "U",
            Û: "U",
            Ũ: "U",
            Ṹ: "U",
            Ū: "U",
            Ṻ: "U",
            Ŭ: "U",
            Ü: "U",
            Ǜ: "U",
            Ǘ: "U",
            Ǖ: "U",
            Ǚ: "U",
            Ủ: "U",
            Ů: "U",
            Ű: "U",
            Ǔ: "U",
            Ȕ: "U",
            Ȗ: "U",
            Ư: "U",
            Ừ: "U",
            Ứ: "U",
            Ữ: "U",
            Ử: "U",
            Ự: "U",
            Ụ: "U",
            Ṳ: "U",
            Ų: "U",
            Ṷ: "U",
            Ṵ: "U",
            Ʉ: "U",
            "Ⓥ": "V",
            Ｖ: "V",
            Ṽ: "V",
            Ṿ: "V",
            Ʋ: "V",
            Ꝟ: "V",
            Ʌ: "V",
            Ꝡ: "VY",
            "Ⓦ": "W",
            Ｗ: "W",
            Ẁ: "W",
            Ẃ: "W",
            Ŵ: "W",
            Ẇ: "W",
            Ẅ: "W",
            Ẉ: "W",
            Ⱳ: "W",
            "Ⓧ": "X",
            Ｘ: "X",
            Ẋ: "X",
            Ẍ: "X",
            "Ⓨ": "Y",
            Ｙ: "Y",
            Ỳ: "Y",
            Ý: "Y",
            Ŷ: "Y",
            Ỹ: "Y",
            Ȳ: "Y",
            Ẏ: "Y",
            Ÿ: "Y",
            Ỷ: "Y",
            Ỵ: "Y",
            Ƴ: "Y",
            Ɏ: "Y",
            Ỿ: "Y",
            "Ⓩ": "Z",
            Ｚ: "Z",
            Ź: "Z",
            Ẑ: "Z",
            Ż: "Z",
            Ž: "Z",
            Ẓ: "Z",
            Ẕ: "Z",
            Ƶ: "Z",
            Ȥ: "Z",
            Ɀ: "Z",
            Ⱬ: "Z",
            Ꝣ: "Z",
            "ⓐ": "a",
            ａ: "a",
            ẚ: "a",
            à: "a",
            á: "a",
            â: "a",
            ầ: "a",
            ấ: "a",
            ẫ: "a",
            ẩ: "a",
            ã: "a",
            ā: "a",
            ă: "a",
            ằ: "a",
            ắ: "a",
            ẵ: "a",
            ẳ: "a",
            ȧ: "a",
            ǡ: "a",
            ä: "a",
            ǟ: "a",
            ả: "a",
            å: "a",
            ǻ: "a",
            ǎ: "a",
            ȁ: "a",
            ȃ: "a",
            ạ: "a",
            ậ: "a",
            ặ: "a",
            ḁ: "a",
            ą: "a",
            ⱥ: "a",
            ɐ: "a",
            ꜳ: "aa",
            æ: "ae",
            ǽ: "ae",
            ǣ: "ae",
            ꜵ: "ao",
            ꜷ: "au",
            ꜹ: "av",
            ꜻ: "av",
            ꜽ: "ay",
            "ⓑ": "b",
            ｂ: "b",
            ḃ: "b",
            ḅ: "b",
            ḇ: "b",
            ƀ: "b",
            ƃ: "b",
            ɓ: "b",
            "ⓒ": "c",
            ｃ: "c",
            ć: "c",
            ĉ: "c",
            ċ: "c",
            č: "c",
            ç: "c",
            ḉ: "c",
            ƈ: "c",
            ȼ: "c",
            ꜿ: "c",
            ↄ: "c",
            "ⓓ": "d",
            ｄ: "d",
            ḋ: "d",
            ď: "d",
            ḍ: "d",
            ḑ: "d",
            ḓ: "d",
            ḏ: "d",
            đ: "d",
            ƌ: "d",
            ɖ: "d",
            ɗ: "d",
            ꝺ: "d",
            ǳ: "dz",
            ǆ: "dz",
            "ⓔ": "e",
            ｅ: "e",
            è: "e",
            é: "e",
            ê: "e",
            ề: "e",
            ế: "e",
            ễ: "e",
            ể: "e",
            ẽ: "e",
            ē: "e",
            ḕ: "e",
            ḗ: "e",
            ĕ: "e",
            ė: "e",
            ë: "e",
            ẻ: "e",
            ě: "e",
            ȅ: "e",
            ȇ: "e",
            ẹ: "e",
            ệ: "e",
            ȩ: "e",
            ḝ: "e",
            ę: "e",
            ḙ: "e",
            ḛ: "e",
            ɇ: "e",
            ɛ: "e",
            ǝ: "e",
            "ⓕ": "f",
            ｆ: "f",
            ḟ: "f",
            ƒ: "f",
            ꝼ: "f",
            "ⓖ": "g",
            ｇ: "g",
            ǵ: "g",
            ĝ: "g",
            ḡ: "g",
            ğ: "g",
            ġ: "g",
            ǧ: "g",
            ģ: "g",
            ǥ: "g",
            ɠ: "g",
            ꞡ: "g",
            ᵹ: "g",
            ꝿ: "g",
            "ⓗ": "h",
            ｈ: "h",
            ĥ: "h",
            ḣ: "h",
            ḧ: "h",
            ȟ: "h",
            ḥ: "h",
            ḩ: "h",
            ḫ: "h",
            ẖ: "h",
            ħ: "h",
            ⱨ: "h",
            ⱶ: "h",
            ɥ: "h",
            ƕ: "hv",
            "ⓘ": "i",
            ｉ: "i",
            ì: "i",
            í: "i",
            î: "i",
            ĩ: "i",
            ī: "i",
            ĭ: "i",
            ï: "i",
            ḯ: "i",
            ỉ: "i",
            ǐ: "i",
            ȉ: "i",
            ȋ: "i",
            ị: "i",
            į: "i",
            ḭ: "i",
            ɨ: "i",
            ı: "i",
            "ⓙ": "j",
            ｊ: "j",
            ĵ: "j",
            ǰ: "j",
            ɉ: "j",
            "ⓚ": "k",
            ｋ: "k",
            ḱ: "k",
            ǩ: "k",
            ḳ: "k",
            ķ: "k",
            ḵ: "k",
            ƙ: "k",
            ⱪ: "k",
            ꝁ: "k",
            ꝃ: "k",
            ꝅ: "k",
            ꞣ: "k",
            "ⓛ": "l",
            ｌ: "l",
            ŀ: "l",
            ĺ: "l",
            ľ: "l",
            ḷ: "l",
            ḹ: "l",
            ļ: "l",
            ḽ: "l",
            ḻ: "l",
            ſ: "l",
            ł: "l",
            ƚ: "l",
            ɫ: "l",
            ⱡ: "l",
            ꝉ: "l",
            ꞁ: "l",
            ꝇ: "l",
            ǉ: "lj",
            "ⓜ": "m",
            ｍ: "m",
            ḿ: "m",
            ṁ: "m",
            ṃ: "m",
            ɱ: "m",
            ɯ: "m",
            "ⓝ": "n",
            ｎ: "n",
            ǹ: "n",
            ń: "n",
            ñ: "n",
            ṅ: "n",
            ň: "n",
            ṇ: "n",
            ņ: "n",
            ṋ: "n",
            ṉ: "n",
            ƞ: "n",
            ɲ: "n",
            ŉ: "n",
            ꞑ: "n",
            ꞥ: "n",
            ǌ: "nj",
            "ⓞ": "o",
            ｏ: "o",
            ò: "o",
            ó: "o",
            ô: "o",
            ồ: "o",
            ố: "o",
            ỗ: "o",
            ổ: "o",
            õ: "o",
            ṍ: "o",
            ȭ: "o",
            ṏ: "o",
            ō: "o",
            ṑ: "o",
            ṓ: "o",
            ŏ: "o",
            ȯ: "o",
            ȱ: "o",
            ö: "o",
            ȫ: "o",
            ỏ: "o",
            ő: "o",
            ǒ: "o",
            ȍ: "o",
            ȏ: "o",
            ơ: "o",
            ờ: "o",
            ớ: "o",
            ỡ: "o",
            ở: "o",
            ợ: "o",
            ọ: "o",
            ộ: "o",
            ǫ: "o",
            ǭ: "o",
            ø: "o",
            ǿ: "o",
            ɔ: "o",
            ꝋ: "o",
            ꝍ: "o",
            ɵ: "o",
            ƣ: "oi",
            ȣ: "ou",
            ꝏ: "oo",
            "ⓟ": "p",
            ｐ: "p",
            ṕ: "p",
            ṗ: "p",
            ƥ: "p",
            ᵽ: "p",
            ꝑ: "p",
            ꝓ: "p",
            ꝕ: "p",
            "ⓠ": "q",
            ｑ: "q",
            ɋ: "q",
            ꝗ: "q",
            ꝙ: "q",
            "ⓡ": "r",
            ｒ: "r",
            ŕ: "r",
            ṙ: "r",
            ř: "r",
            ȑ: "r",
            ȓ: "r",
            ṛ: "r",
            ṝ: "r",
            ŗ: "r",
            ṟ: "r",
            ɍ: "r",
            ɽ: "r",
            ꝛ: "r",
            ꞧ: "r",
            ꞃ: "r",
            "ⓢ": "s",
            ｓ: "s",
            ß: "s",
            ś: "s",
            ṥ: "s",
            ŝ: "s",
            ṡ: "s",
            š: "s",
            ṧ: "s",
            ṣ: "s",
            ṩ: "s",
            ș: "s",
            ş: "s",
            ȿ: "s",
            ꞩ: "s",
            ꞅ: "s",
            ẛ: "s",
            "ⓣ": "t",
            ｔ: "t",
            ṫ: "t",
            ẗ: "t",
            ť: "t",
            ṭ: "t",
            ț: "t",
            ţ: "t",
            ṱ: "t",
            ṯ: "t",
            ŧ: "t",
            ƭ: "t",
            ʈ: "t",
            ⱦ: "t",
            ꞇ: "t",
            ꜩ: "tz",
            "ⓤ": "u",
            ｕ: "u",
            ù: "u",
            ú: "u",
            û: "u",
            ũ: "u",
            ṹ: "u",
            ū: "u",
            ṻ: "u",
            ŭ: "u",
            ü: "u",
            ǜ: "u",
            ǘ: "u",
            ǖ: "u",
            ǚ: "u",
            ủ: "u",
            ů: "u",
            ű: "u",
            ǔ: "u",
            ȕ: "u",
            ȗ: "u",
            ư: "u",
            ừ: "u",
            ứ: "u",
            ữ: "u",
            ử: "u",
            ự: "u",
            ụ: "u",
            ṳ: "u",
            ų: "u",
            ṷ: "u",
            ṵ: "u",
            ʉ: "u",
            "ⓥ": "v",
            ｖ: "v",
            ṽ: "v",
            ṿ: "v",
            ʋ: "v",
            ꝟ: "v",
            ʌ: "v",
            ꝡ: "vy",
            "ⓦ": "w",
            ｗ: "w",
            ẁ: "w",
            ẃ: "w",
            ŵ: "w",
            ẇ: "w",
            ẅ: "w",
            ẘ: "w",
            ẉ: "w",
            ⱳ: "w",
            "ⓧ": "x",
            ｘ: "x",
            ẋ: "x",
            ẍ: "x",
            "ⓨ": "y",
            ｙ: "y",
            ỳ: "y",
            ý: "y",
            ŷ: "y",
            ỹ: "y",
            ȳ: "y",
            ẏ: "y",
            ÿ: "y",
            ỷ: "y",
            ẙ: "y",
            ỵ: "y",
            ƴ: "y",
            ɏ: "y",
            ỿ: "y",
            "ⓩ": "z",
            ｚ: "z",
            ź: "z",
            ẑ: "z",
            ż: "z",
            ž: "z",
            ẓ: "z",
            ẕ: "z",
            ƶ: "z",
            ȥ: "z",
            ɀ: "z",
            ⱬ: "z",
            ꝣ: "z",
            Ά: "Α",
            Έ: "Ε",
            Ή: "Η",
            Ί: "Ι",
            Ϊ: "Ι",
            Ό: "Ο",
            Ύ: "Υ",
            Ϋ: "Υ",
            Ώ: "Ω",
            ά: "α",
            έ: "ε",
            ή: "η",
            ί: "ι",
            ϊ: "ι",
            ΐ: "ι",
            ό: "ο",
            ύ: "υ",
            ϋ: "υ",
            ΰ: "υ",
            ω: "ω",
            ς: "σ",
          };
        }),
        b.define("select2/data/base", ["../utils"], function (a) {
          function b(a, c) {
            b.__super__.constructor.call(this);
          }
          return (
            a.Extend(b, a.Observable),
            (b.prototype.current = function (a) {
              throw new Error(
                "The `current` method must be defined in child classes.",
              );
            }),
            (b.prototype.query = function (a, b) {
              throw new Error(
                "The `query` method must be defined in child classes.",
              );
            }),
            (b.prototype.bind = function (a, b) {}),
            (b.prototype.destroy = function () {}),
            (b.prototype.generateResultId = function (b, c) {
              var d = b.id + "-result-";
              return (
                (d += a.generateChars(4)),
                null != c.id
                  ? (d += "-" + c.id.toString())
                  : (d += "-" + a.generateChars(4)),
                d
              );
            }),
            b
          );
        }),
        b.define(
          "select2/data/select",
          ["./base", "../utils", "jquery"],
          function (a, b, c) {
            function d(a, b) {
              ((this.$element = a),
                (this.options = b),
                d.__super__.constructor.call(this));
            }
            return (
              b.Extend(d, a),
              (d.prototype.current = function (a) {
                var b = [],
                  d = this;
                (this.$element.find(":selected").each(function () {
                  var a = c(this),
                    e = d.item(a);
                  b.push(e);
                }),
                  a(b));
              }),
              (d.prototype.select = function (a) {
                var b = this;
                if (((a.selected = !0), c(a.element).is("option")))
                  return (
                    (a.element.selected = !0),
                    void this.$element.trigger("change")
                  );
                if (this.$element.prop("multiple"))
                  this.current(function (d) {
                    var e = [];
                    ((a = [a]), a.push.apply(a, d));
                    for (var f = 0; f < a.length; f++) {
                      var g = a[f].id;
                      -1 === c.inArray(g, e) && e.push(g);
                    }
                    (b.$element.val(e), b.$element.trigger("change"));
                  });
                else {
                  var d = a.id;
                  (this.$element.val(d), this.$element.trigger("change"));
                }
              }),
              (d.prototype.unselect = function (a) {
                var b = this;
                if (this.$element.prop("multiple")) {
                  if (((a.selected = !1), c(a.element).is("option")))
                    return (
                      (a.element.selected = !1),
                      void this.$element.trigger("change")
                    );
                  this.current(function (d) {
                    for (var e = [], f = 0; f < d.length; f++) {
                      var g = d[f].id;
                      g !== a.id && -1 === c.inArray(g, e) && e.push(g);
                    }
                    (b.$element.val(e), b.$element.trigger("change"));
                  });
                }
              }),
              (d.prototype.bind = function (a, b) {
                var c = this;
                ((this.container = a),
                  a.on("select", function (a) {
                    c.select(a.data);
                  }),
                  a.on("unselect", function (a) {
                    c.unselect(a.data);
                  }));
              }),
              (d.prototype.destroy = function () {
                this.$element.find("*").each(function () {
                  b.RemoveData(this);
                });
              }),
              (d.prototype.query = function (a, b) {
                var d = [],
                  e = this;
                (this.$element.children().each(function () {
                  var b = c(this);
                  if (b.is("option") || b.is("optgroup")) {
                    var f = e.item(b),
                      g = e.matches(a, f);
                    null !== g && d.push(g);
                  }
                }),
                  b({ results: d }));
              }),
              (d.prototype.addOptions = function (a) {
                b.appendMany(this.$element, a);
              }),
              (d.prototype.option = function (a) {
                var d;
                (a.children
                  ? ((d = document.createElement("optgroup")),
                    (d.label = a.text))
                  : ((d = document.createElement("option")),
                    void 0 !== d.textContent
                      ? (d.textContent = a.text)
                      : (d.innerText = a.text)),
                  void 0 !== a.id && (d.value = a.id),
                  a.disabled && (d.disabled = !0),
                  a.selected && (d.selected = !0),
                  a.title && (d.title = a.title));
                var e = c(d),
                  f = this._normalizeItem(a);
                return ((f.element = d), b.StoreData(d, "data", f), e);
              }),
              (d.prototype.item = function (a) {
                var d = {};
                if (null != (d = b.GetData(a[0], "data"))) return d;
                if (a.is("option"))
                  d = {
                    id: a.val(),
                    text: a.text(),
                    disabled: a.prop("disabled"),
                    selected: a.prop("selected"),
                    title: a.prop("title"),
                  };
                else if (a.is("optgroup")) {
                  d = {
                    text: a.prop("label"),
                    children: [],
                    title: a.prop("title"),
                  };
                  for (
                    var e = a.children("option"), f = [], g = 0;
                    g < e.length;
                    g++
                  ) {
                    var h = c(e[g]),
                      i = this.item(h);
                    f.push(i);
                  }
                  d.children = f;
                }
                return (
                  (d = this._normalizeItem(d)),
                  (d.element = a[0]),
                  b.StoreData(a[0], "data", d),
                  d
                );
              }),
              (d.prototype._normalizeItem = function (a) {
                (a !== Object(a) && (a = { id: a, text: a }),
                  (a = c.extend({}, { text: "" }, a)));
                var b = { selected: !1, disabled: !1 };
                return (
                  null != a.id && (a.id = a.id.toString()),
                  null != a.text && (a.text = a.text.toString()),
                  null == a._resultId &&
                    a.id &&
                    null != this.container &&
                    (a._resultId = this.generateResultId(this.container, a)),
                  c.extend({}, b, a)
                );
              }),
              (d.prototype.matches = function (a, b) {
                return this.options.get("matcher")(a, b);
              }),
              d
            );
          },
        ),
        b.define(
          "select2/data/array",
          ["./select", "../utils", "jquery"],
          function (a, b, c) {
            function d(a, b) {
              var c = b.get("data") || [];
              (d.__super__.constructor.call(this, a, b),
                this.addOptions(this.convertToOptions(c)));
            }
            return (
              b.Extend(d, a),
              (d.prototype.select = function (a) {
                var b = this.$element.find("option").filter(function (b, c) {
                  return c.value == a.id.toString();
                });
                (0 === b.length && ((b = this.option(a)), this.addOptions(b)),
                  d.__super__.select.call(this, a));
              }),
              (d.prototype.convertToOptions = function (a) {
                function d(a) {
                  return function () {
                    return c(this).val() == a.id;
                  };
                }
                for (
                  var e = this,
                    f = this.$element.find("option"),
                    g = f
                      .map(function () {
                        return e.item(c(this)).id;
                      })
                      .get(),
                    h = [],
                    i = 0;
                  i < a.length;
                  i++
                ) {
                  var j = this._normalizeItem(a[i]);
                  if (c.inArray(j.id, g) >= 0) {
                    var k = f.filter(d(j)),
                      l = this.item(k),
                      m = c.extend(!0, {}, j, l),
                      n = this.option(m);
                    k.replaceWith(n);
                  } else {
                    var o = this.option(j);
                    if (j.children) {
                      var p = this.convertToOptions(j.children);
                      b.appendMany(o, p);
                    }
                    h.push(o);
                  }
                }
                return h;
              }),
              d
            );
          },
        ),
        b.define(
          "select2/data/ajax",
          ["./array", "../utils", "jquery"],
          function (a, b, c) {
            function d(a, b) {
              ((this.ajaxOptions = this._applyDefaults(b.get("ajax"))),
                null != this.ajaxOptions.processResults &&
                  (this.processResults = this.ajaxOptions.processResults),
                d.__super__.constructor.call(this, a, b));
            }
            return (
              b.Extend(d, a),
              (d.prototype._applyDefaults = function (a) {
                var b = {
                  data: function (a) {
                    return c.extend({}, a, { q: a.term });
                  },
                  transport: function (a, b, d) {
                    var e = c.ajax(a);
                    return (e.then(b), e.fail(d), e);
                  },
                };
                return c.extend({}, b, a, !0);
              }),
              (d.prototype.processResults = function (a) {
                return a;
              }),
              (d.prototype.query = function (a, b) {
                function d() {
                  var d = f.transport(
                    f,
                    function (d) {
                      var f = e.processResults(d, a);
                      (e.options.get("debug") &&
                        window.console &&
                        console.error &&
                        ((f && f.results && c.isArray(f.results)) ||
                          console.error(
                            "Select2: The AJAX results did not return an array in the `results` key of the response.",
                          )),
                        b(f));
                    },
                    function () {
                      ("status" in d && (0 === d.status || "0" === d.status)) ||
                        e.trigger("results:message", {
                          message: "errorLoading",
                        });
                    },
                  );
                  e._request = d;
                }
                var e = this;
                null != this._request &&
                  (c.isFunction(this._request.abort) && this._request.abort(),
                  (this._request = null));
                var f = c.extend({ type: "GET" }, this.ajaxOptions);
                ("function" == typeof f.url &&
                  (f.url = f.url.call(this.$element, a)),
                  "function" == typeof f.data &&
                    (f.data = f.data.call(this.$element, a)),
                  this.ajaxOptions.delay && null != a.term
                    ? (this._queryTimeout &&
                        window.clearTimeout(this._queryTimeout),
                      (this._queryTimeout = window.setTimeout(
                        d,
                        this.ajaxOptions.delay,
                      )))
                    : d());
              }),
              d
            );
          },
        ),
        b.define("select2/data/tags", ["jquery"], function (a) {
          function b(b, c, d) {
            var e = d.get("tags"),
              f = d.get("createTag");
            void 0 !== f && (this.createTag = f);
            var g = d.get("insertTag");
            if (
              (void 0 !== g && (this.insertTag = g),
              b.call(this, c, d),
              a.isArray(e))
            )
              for (var h = 0; h < e.length; h++) {
                var i = e[h],
                  j = this._normalizeItem(i),
                  k = this.option(j);
                this.$element.append(k);
              }
          }
          return (
            (b.prototype.query = function (a, b, c) {
              function d(a, f) {
                for (var g = a.results, h = 0; h < g.length; h++) {
                  var i = g[h],
                    j = null != i.children && !d({ results: i.children }, !0);
                  if (
                    (i.text || "").toUpperCase() ===
                      (b.term || "").toUpperCase() ||
                    j
                  )
                    return !f && ((a.data = g), void c(a));
                }
                if (f) return !0;
                var k = e.createTag(b);
                if (null != k) {
                  var l = e.option(k);
                  (l.attr("data-select2-tag", !0),
                    e.addOptions([l]),
                    e.insertTag(g, k));
                }
                ((a.results = g), c(a));
              }
              var e = this;
              if ((this._removeOldTags(), null == b.term || null != b.page))
                return void a.call(this, b, c);
              a.call(this, b, d);
            }),
            (b.prototype.createTag = function (b, c) {
              var d = a.trim(c.term);
              return "" === d ? null : { id: d, text: d };
            }),
            (b.prototype.insertTag = function (a, b, c) {
              b.unshift(c);
            }),
            (b.prototype._removeOldTags = function (b) {
              this._lastTag;
              this.$element.find("option[data-select2-tag]").each(function () {
                this.selected || a(this).remove();
              });
            }),
            b
          );
        }),
        b.define("select2/data/tokenizer", ["jquery"], function (a) {
          function b(a, b, c) {
            var d = c.get("tokenizer");
            (void 0 !== d && (this.tokenizer = d), a.call(this, b, c));
          }
          return (
            (b.prototype.bind = function (a, b, c) {
              (a.call(this, b, c),
                (this.$search =
                  b.dropdown.$search ||
                  b.selection.$search ||
                  c.find(".select2-search__field")));
            }),
            (b.prototype.query = function (b, c, d) {
              function e(b) {
                var c = g._normalizeItem(b);
                if (
                  !g.$element.find("option").filter(function () {
                    return a(this).val() === c.id;
                  }).length
                ) {
                  var d = g.option(c);
                  (d.attr("data-select2-tag", !0),
                    g._removeOldTags(),
                    g.addOptions([d]));
                }
                f(c);
              }
              function f(a) {
                g.trigger("select", { data: a });
              }
              var g = this;
              c.term = c.term || "";
              var h = this.tokenizer(c, this.options, e);
              (h.term !== c.term &&
                (this.$search.length &&
                  (this.$search.val(h.term), this.$search.focus()),
                (c.term = h.term)),
                b.call(this, c, d));
            }),
            (b.prototype.tokenizer = function (b, c, d, e) {
              for (
                var f = d.get("tokenSeparators") || [],
                  g = c.term,
                  h = 0,
                  i =
                    this.createTag ||
                    function (a) {
                      return { id: a.term, text: a.term };
                    };
                h < g.length;
              ) {
                var j = g[h];
                if (-1 !== a.inArray(j, f)) {
                  var k = g.substr(0, h),
                    l = a.extend({}, c, { term: k }),
                    m = i(l);
                  null != m
                    ? (e(m), (g = g.substr(h + 1) || ""), (h = 0))
                    : h++;
                } else h++;
              }
              return { term: g };
            }),
            b
          );
        }),
        b.define("select2/data/minimumInputLength", [], function () {
          function a(a, b, c) {
            ((this.minimumInputLength = c.get("minimumInputLength")),
              a.call(this, b, c));
          }
          return (
            (a.prototype.query = function (a, b, c) {
              if (
                ((b.term = b.term || ""),
                b.term.length < this.minimumInputLength)
              )
                return void this.trigger("results:message", {
                  message: "inputTooShort",
                  args: {
                    minimum: this.minimumInputLength,
                    input: b.term,
                    params: b,
                  },
                });
              a.call(this, b, c);
            }),
            a
          );
        }),
        b.define("select2/data/maximumInputLength", [], function () {
          function a(a, b, c) {
            ((this.maximumInputLength = c.get("maximumInputLength")),
              a.call(this, b, c));
          }
          return (
            (a.prototype.query = function (a, b, c) {
              if (
                ((b.term = b.term || ""),
                this.maximumInputLength > 0 &&
                  b.term.length > this.maximumInputLength)
              )
                return void this.trigger("results:message", {
                  message: "inputTooLong",
                  args: {
                    maximum: this.maximumInputLength,
                    input: b.term,
                    params: b,
                  },
                });
              a.call(this, b, c);
            }),
            a
          );
        }),
        b.define("select2/data/maximumSelectionLength", [], function () {
          function a(a, b, c) {
            ((this.maximumSelectionLength = c.get("maximumSelectionLength")),
              a.call(this, b, c));
          }
          return (
            (a.prototype.query = function (a, b, c) {
              var d = this;
              this.current(function (e) {
                var f = null != e ? e.length : 0;
                if (
                  d.maximumSelectionLength > 0 &&
                  f >= d.maximumSelectionLength
                )
                  return void d.trigger("results:message", {
                    message: "maximumSelected",
                    args: { maximum: d.maximumSelectionLength },
                  });
                a.call(d, b, c);
              });
            }),
            a
          );
        }),
        b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) {
          function c(a, b) {
            ((this.$element = a),
              (this.options = b),
              c.__super__.constructor.call(this));
          }
          return (
            b.Extend(c, b.Observable),
            (c.prototype.render = function () {
              var b = a(
                '<span class="select2-dropdown"><span class="select2-results"></span></span>',
              );
              return (
                b.attr("dir", this.options.get("dir")),
                (this.$dropdown = b),
                b
              );
            }),
            (c.prototype.bind = function () {}),
            (c.prototype.position = function (a, b) {}),
            (c.prototype.destroy = function () {
              this.$dropdown.remove();
            }),
            c
          );
        }),
        b.define(
          "select2/dropdown/search",
          ["jquery", "../utils"],
          function (a, b) {
            function c() {}
            return (
              (c.prototype.render = function (b) {
                var c = b.call(this),
                  d = a(
                    '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>',
                  );
                return (
                  (this.$searchContainer = d),
                  (this.$search = d.find("input")),
                  c.prepend(d),
                  c
                );
              }),
              (c.prototype.bind = function (b, c, d) {
                var e = this;
                (b.call(this, c, d),
                  this.$search.on("keydown", function (a) {
                    (e.trigger("keypress", a),
                      (e._keyUpPrevented = a.isDefaultPrevented()));
                  }),
                  this.$search.on("input", function (b) {
                    a(this).off("keyup");
                  }),
                  this.$search.on("keyup input", function (a) {
                    e.handleSearch(a);
                  }),
                  c.on("open", function () {
                    (e.$search.attr("tabindex", 0),
                      e.$search.focus(),
                      window.setTimeout(function () {
                        e.$search.focus();
                      }, 0));
                  }),
                  c.on("close", function () {
                    (e.$search.attr("tabindex", -1),
                      e.$search.val(""),
                      e.$search.blur());
                  }),
                  c.on("focus", function () {
                    c.isOpen() || e.$search.focus();
                  }),
                  c.on("results:all", function (a) {
                    if (null == a.query.term || "" === a.query.term) {
                      e.showSearch(a)
                        ? e.$searchContainer.removeClass("select2-search--hide")
                        : e.$searchContainer.addClass("select2-search--hide");
                    }
                  }));
              }),
              (c.prototype.handleSearch = function (a) {
                if (!this._keyUpPrevented) {
                  var b = this.$search.val();
                  this.trigger("query", { term: b });
                }
                this._keyUpPrevented = !1;
              }),
              (c.prototype.showSearch = function (a, b) {
                return !0;
              }),
              c
            );
          },
        ),
        b.define("select2/dropdown/hidePlaceholder", [], function () {
          function a(a, b, c, d) {
            ((this.placeholder = this.normalizePlaceholder(
              c.get("placeholder"),
            )),
              a.call(this, b, c, d));
          }
          return (
            (a.prototype.append = function (a, b) {
              ((b.results = this.removePlaceholder(b.results)),
                a.call(this, b));
            }),
            (a.prototype.normalizePlaceholder = function (a, b) {
              return ("string" == typeof b && (b = { id: "", text: b }), b);
            }),
            (a.prototype.removePlaceholder = function (a, b) {
              for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
                var e = b[d];
                this.placeholder.id === e.id && c.splice(d, 1);
              }
              return c;
            }),
            a
          );
        }),
        b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) {
          function b(a, b, c, d) {
            ((this.lastParams = {}),
              a.call(this, b, c, d),
              (this.$loadingMore = this.createLoadingMore()),
              (this.loading = !1));
          }
          return (
            (b.prototype.append = function (a, b) {
              (this.$loadingMore.remove(),
                (this.loading = !1),
                a.call(this, b),
                this.showLoadingMore(b) &&
                  this.$results.append(this.$loadingMore));
            }),
            (b.prototype.bind = function (b, c, d) {
              var e = this;
              (b.call(this, c, d),
                c.on("query", function (a) {
                  ((e.lastParams = a), (e.loading = !0));
                }),
                c.on("query:append", function (a) {
                  ((e.lastParams = a), (e.loading = !0));
                }),
                this.$results.on("scroll", function () {
                  var b = a.contains(
                    document.documentElement,
                    e.$loadingMore[0],
                  );
                  if (!e.loading && b) {
                    e.$results.offset().top + e.$results.outerHeight(!1) + 50 >=
                      e.$loadingMore.offset().top +
                        e.$loadingMore.outerHeight(!1) && e.loadMore();
                  }
                }));
            }),
            (b.prototype.loadMore = function () {
              this.loading = !0;
              var b = a.extend({}, { page: 1 }, this.lastParams);
              (b.page++, this.trigger("query:append", b));
            }),
            (b.prototype.showLoadingMore = function (a, b) {
              return b.pagination && b.pagination.more;
            }),
            (b.prototype.createLoadingMore = function () {
              var b = a(
                  '<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>',
                ),
                c = this.options.get("translations").get("loadingMore");
              return (b.html(c(this.lastParams)), b);
            }),
            b
          );
        }),
        b.define(
          "select2/dropdown/attachBody",
          ["jquery", "../utils"],
          function (a, b) {
            function c(b, c, d) {
              ((this.$dropdownParent =
                d.get("dropdownParent") || a(document.body)),
                b.call(this, c, d));
            }
            return (
              (c.prototype.bind = function (a, b, c) {
                var d = this,
                  e = !1;
                (a.call(this, b, c),
                  b.on("open", function () {
                    (d._showDropdown(),
                      d._attachPositioningHandler(b),
                      e ||
                        ((e = !0),
                        b.on("results:all", function () {
                          (d._positionDropdown(), d._resizeDropdown());
                        }),
                        b.on("results:append", function () {
                          (d._positionDropdown(), d._resizeDropdown());
                        })));
                  }),
                  b.on("close", function () {
                    (d._hideDropdown(), d._detachPositioningHandler(b));
                  }),
                  this.$dropdownContainer.on("mousedown", function (a) {
                    a.stopPropagation();
                  }));
              }),
              (c.prototype.destroy = function (a) {
                (a.call(this), this.$dropdownContainer.remove());
              }),
              (c.prototype.position = function (a, b, c) {
                (b.attr("class", c.attr("class")),
                  b.removeClass("select2"),
                  b.addClass("select2-container--open"),
                  b.css({ position: "absolute", top: -999999 }),
                  (this.$container = c));
              }),
              (c.prototype.render = function (b) {
                var c = a("<span></span>"),
                  d = b.call(this);
                return (c.append(d), (this.$dropdownContainer = c), c);
              }),
              (c.prototype._hideDropdown = function (a) {
                this.$dropdownContainer.detach();
              }),
              (c.prototype._attachPositioningHandler = function (c, d) {
                var e = this,
                  f = "scroll.select2." + d.id,
                  g = "resize.select2." + d.id,
                  h = "orientationchange.select2." + d.id,
                  i = this.$container.parents().filter(b.hasScroll);
                (i.each(function () {
                  b.StoreData(this, "select2-scroll-position", {
                    x: a(this).scrollLeft(),
                    y: a(this).scrollTop(),
                  });
                }),
                  i.on(f, function (c) {
                    var d = b.GetData(this, "select2-scroll-position");
                    a(this).scrollTop(d.y);
                  }),
                  a(window).on(f + " " + g + " " + h, function (a) {
                    (e._positionDropdown(), e._resizeDropdown());
                  }));
              }),
              (c.prototype._detachPositioningHandler = function (c, d) {
                var e = "scroll.select2." + d.id,
                  f = "resize.select2." + d.id,
                  g = "orientationchange.select2." + d.id;
                (this.$container.parents().filter(b.hasScroll).off(e),
                  a(window).off(e + " " + f + " " + g));
              }),
              (c.prototype._positionDropdown = function () {
                var b = a(window),
                  c = this.$dropdown.hasClass("select2-dropdown--above"),
                  d = this.$dropdown.hasClass("select2-dropdown--below"),
                  e = null,
                  f = this.$container.offset();
                f.bottom = f.top + this.$container.outerHeight(!1);
                var g = { height: this.$container.outerHeight(!1) };
                ((g.top = f.top), (g.bottom = f.top + g.height));
                var h = { height: this.$dropdown.outerHeight(!1) },
                  i = {
                    top: b.scrollTop(),
                    bottom: b.scrollTop() + b.height(),
                  },
                  j = i.top < f.top - h.height,
                  k = i.bottom > f.bottom + h.height,
                  l = { left: f.left, top: g.bottom },
                  m = this.$dropdownParent;
                "static" === m.css("position") && (m = m.offsetParent());
                var n = m.offset();
                ((l.top -= n.top),
                  (l.left -= n.left),
                  c || d || (e = "below"),
                  k || !j || c ? !j && k && c && (e = "below") : (e = "above"),
                  ("above" == e || (c && "below" !== e)) &&
                    (l.top = g.top - n.top - h.height),
                  null != e &&
                    (this.$dropdown
                      .removeClass(
                        "select2-dropdown--below select2-dropdown--above",
                      )
                      .addClass("select2-dropdown--" + e),
                    this.$container
                      .removeClass(
                        "select2-container--below select2-container--above",
                      )
                      .addClass("select2-container--" + e)),
                  this.$dropdownContainer.css(l));
              }),
              (c.prototype._resizeDropdown = function () {
                var a = { width: this.$container.outerWidth(!1) + "px" };
                (this.options.get("dropdownAutoWidth") &&
                  ((a.minWidth = a.width),
                  (a.position = "relative"),
                  (a.width = "auto")),
                  this.$dropdown.css(a));
              }),
              (c.prototype._showDropdown = function (a) {
                (this.$dropdownContainer.appendTo(this.$dropdownParent),
                  this._positionDropdown(),
                  this._resizeDropdown());
              }),
              c
            );
          },
        ),
        b.define("select2/dropdown/minimumResultsForSearch", [], function () {
          function a(b) {
            for (var c = 0, d = 0; d < b.length; d++) {
              var e = b[d];
              e.children ? (c += a(e.children)) : c++;
            }
            return c;
          }
          function b(a, b, c, d) {
            ((this.minimumResultsForSearch = c.get("minimumResultsForSearch")),
              this.minimumResultsForSearch < 0 &&
                (this.minimumResultsForSearch = 1 / 0),
              a.call(this, b, c, d));
          }
          return (
            (b.prototype.showSearch = function (b, c) {
              return (
                !(a(c.data.results) < this.minimumResultsForSearch) &&
                b.call(this, c)
              );
            }),
            b
          );
        }),
        b.define("select2/dropdown/selectOnClose", ["../utils"], function (a) {
          function b() {}
          return (
            (b.prototype.bind = function (a, b, c) {
              var d = this;
              (a.call(this, b, c),
                b.on("close", function (a) {
                  d._handleSelectOnClose(a);
                }));
            }),
            (b.prototype._handleSelectOnClose = function (b, c) {
              if (c && null != c.originalSelect2Event) {
                var d = c.originalSelect2Event;
                if ("select" === d._type || "unselect" === d._type) return;
              }
              var e = this.getHighlightedResults();
              if (!(e.length < 1)) {
                var f = a.GetData(e[0], "data");
                (null != f.element && f.element.selected) ||
                  (null == f.element && f.selected) ||
                  this.trigger("select", { data: f });
              }
            }),
            b
          );
        }),
        b.define("select2/dropdown/closeOnSelect", [], function () {
          function a() {}
          return (
            (a.prototype.bind = function (a, b, c) {
              var d = this;
              (a.call(this, b, c),
                b.on("select", function (a) {
                  d._selectTriggered(a);
                }),
                b.on("unselect", function (a) {
                  d._selectTriggered(a);
                }));
            }),
            (a.prototype._selectTriggered = function (a, b) {
              var c = b.originalEvent;
              (c && c.ctrlKey) ||
                this.trigger("close", {
                  originalEvent: c,
                  originalSelect2Event: b,
                });
            }),
            a
          );
        }),
        b.define("select2/i18n/en", [], function () {
          return {
            errorLoading: function () {
              return "The results could not be loaded.";
            },
            inputTooLong: function (a) {
              var b = a.input.length - a.maximum,
                c = "Please delete " + b + " character";
              return (1 != b && (c += "s"), c);
            },
            inputTooShort: function (a) {
              return (
                "Please enter " +
                (a.minimum - a.input.length) +
                " or more characters"
              );
            },
            loadingMore: function () {
              return "Loading more results…";
            },
            maximumSelected: function (a) {
              var b = "You can only select " + a.maximum + " item";
              return (1 != a.maximum && (b += "s"), b);
            },
            noResults: function () {
              return "No results found";
            },
            searching: function () {
              return "Searching…";
            },
          };
        }),
        b.define(
          "select2/defaults",
          [
            "jquery",
            "require",
            "./results",
            "./selection/single",
            "./selection/multiple",
            "./selection/placeholder",
            "./selection/allowClear",
            "./selection/search",
            "./selection/eventRelay",
            "./utils",
            "./translation",
            "./diacritics",
            "./data/select",
            "./data/array",
            "./data/ajax",
            "./data/tags",
            "./data/tokenizer",
            "./data/minimumInputLength",
            "./data/maximumInputLength",
            "./data/maximumSelectionLength",
            "./dropdown",
            "./dropdown/search",
            "./dropdown/hidePlaceholder",
            "./dropdown/infiniteScroll",
            "./dropdown/attachBody",
            "./dropdown/minimumResultsForSearch",
            "./dropdown/selectOnClose",
            "./dropdown/closeOnSelect",
            "./i18n/en",
          ],
          function (
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y,
            z,
            A,
            B,
            C,
          ) {
            function D() {
              this.reset();
            }
            return (
              (D.prototype.apply = function (l) {
                if (
                  ((l = a.extend(!0, {}, this.defaults, l)),
                  null == l.dataAdapter)
                ) {
                  if (
                    (null != l.ajax
                      ? (l.dataAdapter = o)
                      : null != l.data
                        ? (l.dataAdapter = n)
                        : (l.dataAdapter = m),
                    l.minimumInputLength > 0 &&
                      (l.dataAdapter = j.Decorate(l.dataAdapter, r)),
                    l.maximumInputLength > 0 &&
                      (l.dataAdapter = j.Decorate(l.dataAdapter, s)),
                    l.maximumSelectionLength > 0 &&
                      (l.dataAdapter = j.Decorate(l.dataAdapter, t)),
                    l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)),
                    (null == l.tokenSeparators && null == l.tokenizer) ||
                      (l.dataAdapter = j.Decorate(l.dataAdapter, q)),
                    null != l.query)
                  ) {
                    var C = b(l.amdBase + "compat/query");
                    l.dataAdapter = j.Decorate(l.dataAdapter, C);
                  }
                  if (null != l.initSelection) {
                    var D = b(l.amdBase + "compat/initSelection");
                    l.dataAdapter = j.Decorate(l.dataAdapter, D);
                  }
                }
                if (
                  (null == l.resultsAdapter &&
                    ((l.resultsAdapter = c),
                    null != l.ajax &&
                      (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)),
                    null != l.placeholder &&
                      (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)),
                    l.selectOnClose &&
                      (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))),
                  null == l.dropdownAdapter)
                ) {
                  if (l.multiple) l.dropdownAdapter = u;
                  else {
                    var E = j.Decorate(u, v);
                    l.dropdownAdapter = E;
                  }
                  if (
                    (0 !== l.minimumResultsForSearch &&
                      (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)),
                    l.closeOnSelect &&
                      (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)),
                    null != l.dropdownCssClass ||
                      null != l.dropdownCss ||
                      null != l.adaptDropdownCssClass)
                  ) {
                    var F = b(l.amdBase + "compat/dropdownCss");
                    l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F);
                  }
                  l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y);
                }
                if (null == l.selectionAdapter) {
                  if (
                    (l.multiple
                      ? (l.selectionAdapter = e)
                      : (l.selectionAdapter = d),
                    null != l.placeholder &&
                      (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)),
                    l.allowClear &&
                      (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)),
                    l.multiple &&
                      (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)),
                    null != l.containerCssClass ||
                      null != l.containerCss ||
                      null != l.adaptContainerCssClass)
                  ) {
                    var G = b(l.amdBase + "compat/containerCss");
                    l.selectionAdapter = j.Decorate(l.selectionAdapter, G);
                  }
                  l.selectionAdapter = j.Decorate(l.selectionAdapter, i);
                }
                if ("string" == typeof l.language)
                  if (l.language.indexOf("-") > 0) {
                    var H = l.language.split("-"),
                      I = H[0];
                    l.language = [l.language, I];
                  } else l.language = [l.language];
                if (a.isArray(l.language)) {
                  var J = new k();
                  l.language.push("en");
                  for (var K = l.language, L = 0; L < K.length; L++) {
                    var M = K[L],
                      N = {};
                    try {
                      N = k.loadPath(M);
                    } catch (a) {
                      try {
                        ((M = this.defaults.amdLanguageBase + M),
                          (N = k.loadPath(M)));
                      } catch (a) {
                        l.debug &&
                          window.console &&
                          console.warn &&
                          console.warn(
                            'Select2: The language file for "' +
                              M +
                              '" could not be automatically loaded. A fallback will be used instead.',
                          );
                        continue;
                      }
                    }
                    J.extend(N);
                  }
                  l.translations = J;
                } else {
                  var O = k.loadPath(this.defaults.amdLanguageBase + "en"),
                    P = new k(l.language);
                  (P.extend(O), (l.translations = P));
                }
                return l;
              }),
              (D.prototype.reset = function () {
                function b(a) {
                  function b(a) {
                    return l[a] || a;
                  }
                  return a.replace(/[^\u0000-\u007E]/g, b);
                }
                function c(d, e) {
                  if ("" === a.trim(d.term)) return e;
                  if (e.children && e.children.length > 0) {
                    for (
                      var f = a.extend(!0, {}, e), g = e.children.length - 1;
                      g >= 0;
                      g--
                    ) {
                      null == c(d, e.children[g]) && f.children.splice(g, 1);
                    }
                    return f.children.length > 0 ? f : c(d, f);
                  }
                  var h = b(e.text).toUpperCase(),
                    i = b(d.term).toUpperCase();
                  return h.indexOf(i) > -1 ? e : null;
                }
                this.defaults = {
                  amdBase: "./",
                  amdLanguageBase: "./i18n/",
                  closeOnSelect: !0,
                  debug: !1,
                  dropdownAutoWidth: !1,
                  escapeMarkup: j.escapeMarkup,
                  language: C,
                  matcher: c,
                  minimumInputLength: 0,
                  maximumInputLength: 0,
                  maximumSelectionLength: 0,
                  minimumResultsForSearch: 0,
                  selectOnClose: !1,
                  sorter: function (a) {
                    return a;
                  },
                  templateResult: function (a) {
                    return a.text;
                  },
                  templateSelection: function (a) {
                    return a.text;
                  },
                  theme: "default",
                  width: "resolve",
                };
              }),
              (D.prototype.set = function (b, c) {
                var d = a.camelCase(b),
                  e = {};
                e[d] = c;
                var f = j._convertData(e);
                a.extend(!0, this.defaults, f);
              }),
              new D()
            );
          },
        ),
        b.define(
          "select2/options",
          ["require", "jquery", "./defaults", "./utils"],
          function (a, b, c, d) {
            function e(b, e) {
              if (
                ((this.options = b),
                null != e && this.fromElement(e),
                (this.options = c.apply(this.options)),
                e && e.is("input"))
              ) {
                var f = a(this.get("amdBase") + "compat/inputData");
                this.options.dataAdapter = d.Decorate(
                  this.options.dataAdapter,
                  f,
                );
              }
            }
            return (
              (e.prototype.fromElement = function (a) {
                var c = ["select2"];
                (null == this.options.multiple &&
                  (this.options.multiple = a.prop("multiple")),
                  null == this.options.disabled &&
                    (this.options.disabled = a.prop("disabled")),
                  null == this.options.language &&
                    (a.prop("lang")
                      ? (this.options.language = a.prop("lang").toLowerCase())
                      : a.closest("[lang]").prop("lang") &&
                        (this.options.language = a
                          .closest("[lang]")
                          .prop("lang"))),
                  null == this.options.dir &&
                    (a.prop("dir")
                      ? (this.options.dir = a.prop("dir"))
                      : a.closest("[dir]").prop("dir")
                        ? (this.options.dir = a.closest("[dir]").prop("dir"))
                        : (this.options.dir = "ltr")),
                  a.prop("disabled", this.options.disabled),
                  a.prop("multiple", this.options.multiple),
                  d.GetData(a[0], "select2Tags") &&
                    (this.options.debug &&
                      window.console &&
                      console.warn &&
                      console.warn(
                        'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.',
                      ),
                    d.StoreData(a[0], "data", d.GetData(a[0], "select2Tags")),
                    d.StoreData(a[0], "tags", !0)),
                  d.GetData(a[0], "ajaxUrl") &&
                    (this.options.debug &&
                      window.console &&
                      console.warn &&
                      console.warn(
                        "Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2.",
                      ),
                    a.attr("ajax--url", d.GetData(a[0], "ajaxUrl")),
                    d.StoreData(a[0], "ajax-Url", d.GetData(a[0], "ajaxUrl"))));
                var e = {};
                e =
                  b.fn.jquery &&
                  "1." == b.fn.jquery.substr(0, 2) &&
                  a[0].dataset
                    ? b.extend(!0, {}, a[0].dataset, d.GetData(a[0]))
                    : d.GetData(a[0]);
                var f = b.extend(!0, {}, e);
                f = d._convertData(f);
                for (var g in f)
                  b.inArray(g, c) > -1 ||
                    (b.isPlainObject(this.options[g])
                      ? b.extend(this.options[g], f[g])
                      : (this.options[g] = f[g]));
                return this;
              }),
              (e.prototype.get = function (a) {
                return this.options[a];
              }),
              (e.prototype.set = function (a, b) {
                this.options[a] = b;
              }),
              e
            );
          },
        ),
        b.define(
          "select2/core",
          ["jquery", "./options", "./utils", "./keys"],
          function (a, b, c, d) {
            var e = function (a, d) {
              (null != c.GetData(a[0], "select2") &&
                c.GetData(a[0], "select2").destroy(),
                (this.$element = a),
                (this.id = this._generateId(a)),
                (d = d || {}),
                (this.options = new b(d, a)),
                e.__super__.constructor.call(this));
              var f = a.attr("tabindex") || 0;
              (c.StoreData(a[0], "old-tabindex", f), a.attr("tabindex", "-1"));
              var g = this.options.get("dataAdapter");
              this.dataAdapter = new g(a, this.options);
              var h = this.render();
              this._placeContainer(h);
              var i = this.options.get("selectionAdapter");
              ((this.selection = new i(a, this.options)),
                (this.$selection = this.selection.render()),
                this.selection.position(this.$selection, h));
              var j = this.options.get("dropdownAdapter");
              ((this.dropdown = new j(a, this.options)),
                (this.$dropdown = this.dropdown.render()),
                this.dropdown.position(this.$dropdown, h));
              var k = this.options.get("resultsAdapter");
              ((this.results = new k(a, this.options, this.dataAdapter)),
                (this.$results = this.results.render()),
                this.results.position(this.$results, this.$dropdown));
              var l = this;
              (this._bindAdapters(),
                this._registerDomEvents(),
                this._registerDataEvents(),
                this._registerSelectionEvents(),
                this._registerDropdownEvents(),
                this._registerResultsEvents(),
                this._registerEvents(),
                this.dataAdapter.current(function (a) {
                  l.trigger("selection:update", { data: a });
                }),
                a.addClass("select2-hidden-accessible"),
                a.attr("aria-hidden", "true"),
                this._syncAttributes(),
                c.StoreData(a[0], "select2", this),
                a.data("select2", this));
            };
            return (
              c.Extend(e, c.Observable),
              (e.prototype._generateId = function (a) {
                var b = "";
                return (
                  (b =
                    null != a.attr("id")
                      ? a.attr("id")
                      : null != a.attr("name")
                        ? a.attr("name") + "-" + c.generateChars(2)
                        : c.generateChars(4)),
                  (b = b.replace(/(:|\.|\[|\]|,)/g, "")),
                  (b = "select2-" + b)
                );
              }),
              (e.prototype._placeContainer = function (a) {
                a.insertAfter(this.$element);
                var b = this._resolveWidth(
                  this.$element,
                  this.options.get("width"),
                );
                null != b && a.css("width", b);
              }),
              (e.prototype._resolveWidth = function (a, b) {
                var c =
                  /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                if ("resolve" == b) {
                  var d = this._resolveWidth(a, "style");
                  return null != d ? d : this._resolveWidth(a, "element");
                }
                if ("element" == b) {
                  var e = a.outerWidth(!1);
                  return e <= 0 ? "auto" : e + "px";
                }
                if ("style" == b) {
                  var f = a.attr("style");
                  if ("string" != typeof f) return null;
                  for (
                    var g = f.split(";"), h = 0, i = g.length;
                    h < i;
                    h += 1
                  ) {
                    var j = g[h].replace(/\s/g, ""),
                      k = j.match(c);
                    if (null !== k && k.length >= 1) return k[1];
                  }
                  return null;
                }
                return b;
              }),
              (e.prototype._bindAdapters = function () {
                (this.dataAdapter.bind(this, this.$container),
                  this.selection.bind(this, this.$container),
                  this.dropdown.bind(this, this.$container),
                  this.results.bind(this, this.$container));
              }),
              (e.prototype._registerDomEvents = function () {
                var b = this;
                (this.$element.on("change.select2", function () {
                  b.dataAdapter.current(function (a) {
                    b.trigger("selection:update", { data: a });
                  });
                }),
                  this.$element.on("focus.select2", function (a) {
                    b.trigger("focus", a);
                  }),
                  (this._syncA = c.bind(this._syncAttributes, this)),
                  (this._syncS = c.bind(this._syncSubtree, this)),
                  this.$element[0].attachEvent &&
                    this.$element[0].attachEvent(
                      "onpropertychange",
                      this._syncA,
                    ));
                var d =
                  window.MutationObserver ||
                  window.WebKitMutationObserver ||
                  window.MozMutationObserver;
                null != d
                  ? ((this._observer = new d(function (c) {
                      (a.each(c, b._syncA), a.each(c, b._syncS));
                    })),
                    this._observer.observe(this.$element[0], {
                      attributes: !0,
                      childList: !0,
                      subtree: !1,
                    }))
                  : this.$element[0].addEventListener &&
                    (this.$element[0].addEventListener(
                      "DOMAttrModified",
                      b._syncA,
                      !1,
                    ),
                    this.$element[0].addEventListener(
                      "DOMNodeInserted",
                      b._syncS,
                      !1,
                    ),
                    this.$element[0].addEventListener(
                      "DOMNodeRemoved",
                      b._syncS,
                      !1,
                    ));
              }),
              (e.prototype._registerDataEvents = function () {
                var a = this;
                this.dataAdapter.on("*", function (b, c) {
                  a.trigger(b, c);
                });
              }),
              (e.prototype._registerSelectionEvents = function () {
                var b = this,
                  c = ["toggle", "focus"];
                (this.selection.on("toggle", function () {
                  b.toggleDropdown();
                }),
                  this.selection.on("focus", function (a) {
                    b.focus(a);
                  }),
                  this.selection.on("*", function (d, e) {
                    -1 === a.inArray(d, c) && b.trigger(d, e);
                  }));
              }),
              (e.prototype._registerDropdownEvents = function () {
                var a = this;
                this.dropdown.on("*", function (b, c) {
                  a.trigger(b, c);
                });
              }),
              (e.prototype._registerResultsEvents = function () {
                var a = this;
                this.results.on("*", function (b, c) {
                  a.trigger(b, c);
                });
              }),
              (e.prototype._registerEvents = function () {
                var a = this;
                (this.on("open", function () {
                  a.$container.addClass("select2-container--open");
                }),
                  this.on("close", function () {
                    a.$container.removeClass("select2-container--open");
                  }),
                  this.on("enable", function () {
                    a.$container.removeClass("select2-container--disabled");
                  }),
                  this.on("disable", function () {
                    a.$container.addClass("select2-container--disabled");
                  }),
                  this.on("blur", function () {
                    a.$container.removeClass("select2-container--focus");
                  }),
                  this.on("query", function (b) {
                    (a.isOpen() || a.trigger("open", {}),
                      this.dataAdapter.query(b, function (c) {
                        a.trigger("results:all", { data: c, query: b });
                      }));
                  }),
                  this.on("query:append", function (b) {
                    this.dataAdapter.query(b, function (c) {
                      a.trigger("results:append", { data: c, query: b });
                    });
                  }),
                  this.on("keypress", function (b) {
                    var c = b.which;
                    a.isOpen()
                      ? c === d.ESC || c === d.TAB || (c === d.UP && b.altKey)
                        ? (a.close(), b.preventDefault())
                        : c === d.ENTER
                          ? (a.trigger("results:select", {}),
                            b.preventDefault())
                          : c === d.SPACE && b.ctrlKey
                            ? (a.trigger("results:toggle", {}),
                              b.preventDefault())
                            : c === d.UP
                              ? (a.trigger("results:previous", {}),
                                b.preventDefault())
                              : c === d.DOWN &&
                                (a.trigger("results:next", {}),
                                b.preventDefault())
                      : (c === d.ENTER ||
                          c === d.SPACE ||
                          (c === d.DOWN && b.altKey)) &&
                        (a.open(), b.preventDefault());
                  }));
              }),
              (e.prototype._syncAttributes = function () {
                (this.options.set("disabled", this.$element.prop("disabled")),
                  this.options.get("disabled")
                    ? (this.isOpen() && this.close(),
                      this.trigger("disable", {}))
                    : this.trigger("enable", {}));
              }),
              (e.prototype._syncSubtree = function (a, b) {
                var c = !1,
                  d = this;
                if (
                  !a ||
                  !a.target ||
                  "OPTION" === a.target.nodeName ||
                  "OPTGROUP" === a.target.nodeName
                ) {
                  if (b)
                    if (b.addedNodes && b.addedNodes.length > 0)
                      for (var e = 0; e < b.addedNodes.length; e++) {
                        var f = b.addedNodes[e];
                        f.selected && (c = !0);
                      }
                    else
                      b.removedNodes && b.removedNodes.length > 0 && (c = !0);
                  else c = !0;
                  c &&
                    this.dataAdapter.current(function (a) {
                      d.trigger("selection:update", { data: a });
                    });
                }
              }),
              (e.prototype.trigger = function (a, b) {
                var c = e.__super__.trigger,
                  d = {
                    open: "opening",
                    close: "closing",
                    select: "selecting",
                    unselect: "unselecting",
                    clear: "clearing",
                  };
                if ((void 0 === b && (b = {}), a in d)) {
                  var f = d[a],
                    g = { prevented: !1, name: a, args: b };
                  if ((c.call(this, f, g), g.prevented))
                    return void (b.prevented = !0);
                }
                c.call(this, a, b);
              }),
              (e.prototype.toggleDropdown = function () {
                this.options.get("disabled") ||
                  (this.isOpen() ? this.close() : this.open());
              }),
              (e.prototype.open = function () {
                this.isOpen() || this.trigger("query", {});
              }),
              (e.prototype.close = function () {
                this.isOpen() && this.trigger("close", {});
              }),
              (e.prototype.isOpen = function () {
                return this.$container.hasClass("select2-container--open");
              }),
              (e.prototype.hasFocus = function () {
                return this.$container.hasClass("select2-container--focus");
              }),
              (e.prototype.focus = function (a) {
                this.hasFocus() ||
                  (this.$container.addClass("select2-container--focus"),
                  this.trigger("focus", {}));
              }),
              (e.prototype.enable = function (a) {
                (this.options.get("debug") &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.',
                  ),
                  (null != a && 0 !== a.length) || (a = [!0]));
                var b = !a[0];
                this.$element.prop("disabled", b);
              }),
              (e.prototype.data = function () {
                this.options.get("debug") &&
                  arguments.length > 0 &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.',
                  );
                var a = [];
                return (
                  this.dataAdapter.current(function (b) {
                    a = b;
                  }),
                  a
                );
              }),
              (e.prototype.val = function (b) {
                if (
                  (this.options.get("debug") &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.',
                    ),
                  null == b || 0 === b.length)
                )
                  return this.$element.val();
                var c = b[0];
                (a.isArray(c) &&
                  (c = a.map(c, function (a) {
                    return a.toString();
                  })),
                  this.$element.val(c).trigger("change"));
              }),
              (e.prototype.destroy = function () {
                (this.$container.remove(),
                  this.$element[0].detachEvent &&
                    this.$element[0].detachEvent(
                      "onpropertychange",
                      this._syncA,
                    ),
                  null != this._observer
                    ? (this._observer.disconnect(), (this._observer = null))
                    : this.$element[0].removeEventListener &&
                      (this.$element[0].removeEventListener(
                        "DOMAttrModified",
                        this._syncA,
                        !1,
                      ),
                      this.$element[0].removeEventListener(
                        "DOMNodeInserted",
                        this._syncS,
                        !1,
                      ),
                      this.$element[0].removeEventListener(
                        "DOMNodeRemoved",
                        this._syncS,
                        !1,
                      )),
                  (this._syncA = null),
                  (this._syncS = null),
                  this.$element.off(".select2"),
                  this.$element.attr(
                    "tabindex",
                    c.GetData(this.$element[0], "old-tabindex"),
                  ),
                  this.$element.removeClass("select2-hidden-accessible"),
                  this.$element.attr("aria-hidden", "false"),
                  c.RemoveData(this.$element[0]),
                  this.$element.removeData("select2"),
                  this.dataAdapter.destroy(),
                  this.selection.destroy(),
                  this.dropdown.destroy(),
                  this.results.destroy(),
                  (this.dataAdapter = null),
                  (this.selection = null),
                  (this.dropdown = null),
                  (this.results = null));
              }),
              (e.prototype.render = function () {
                var b = a(
                  '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>',
                );
                return (
                  b.attr("dir", this.options.get("dir")),
                  (this.$container = b),
                  this.$container.addClass(
                    "select2-container--" + this.options.get("theme"),
                  ),
                  c.StoreData(b[0], "element", this.$element),
                  b
                );
              }),
              e
            );
          },
        ),
        b.define("jquery-mousewheel", ["jquery"], function (a) {
          return a;
        }),
        b.define(
          "jquery.select2",
          [
            "jquery",
            "jquery-mousewheel",
            "./select2/core",
            "./select2/defaults",
            "./select2/utils",
          ],
          function (a, b, c, d, e) {
            if (null == a.fn.select2) {
              var f = ["open", "close", "destroy"];
              a.fn.select2 = function (b) {
                if ("object" == typeof (b = b || {}))
                  return (
                    this.each(function () {
                      var d = a.extend(!0, {}, b);
                      new c(a(this), d);
                    }),
                    this
                  );
                if ("string" == typeof b) {
                  var d,
                    g = Array.prototype.slice.call(arguments, 1);
                  return (
                    this.each(function () {
                      var a = e.GetData(this, "select2");
                      (null == a &&
                        window.console &&
                        console.error &&
                        console.error(
                          "The select2('" +
                            b +
                            "') method was called on an element that is not using Select2.",
                        ),
                        (d = a[b].apply(a, g)));
                    }),
                    a.inArray(b, f) > -1 ? this : d
                  );
                }
                throw new Error("Invalid arguments for Select2: " + b);
              };
            }
            return (
              null == a.fn.select2.defaults && (a.fn.select2.defaults = d),
              c
            );
          },
        ),
        { define: b.define, require: b.require }
      );
    })(),
    c = b.require("jquery.select2");
  return ((a.fn.select2.amd = b), c);
});

/* Datepicker */

/**
 * jQuery DatePicker
 * @author biohzrdmx <github.com/biohzrdmx>
 * @version 1.0
 * @requires jQuery 1.8+
 * @license MIT
 */
!(function (e) {
  ((e.datePicker = {
    strings: {
      monthsFull: [
        "January",
        "Febraury",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      daysFull: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      daysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      messageLocked: "The day you have just selected is not available",
    },
    defaults: {
      formatDate: function (a) {
        return (
          e.datePicker.utils.pad(a.getDate(), 2) +
          "/" +
          e.datePicker.utils.pad(a.getMonth() + 1, 2) +
          "/" +
          a.getFullYear()
        );
      },
      parseDate: function (e) {
        var a = new Date(),
          t = e.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        return (t && 4 == t.length && (a = new Date(t[3], t[2] - 1, t[1])), a);
      },
      selectDate: function (e) {
        return !0;
      },
      limitCenturies: !0,
      closeOnPick: !0,
    },
    utils: {
      firstDay: function (e, a) {
        return new Date(e, a, 1).getDay();
      },
      daysInMonth: function (e, a) {
        return new Date(e, ++a, 0).getDate();
      },
      buildDecadePicker: function (a, t) {
        e.datePicker;
        var r = e('<div class="decades"></div>'),
          n = 100 * Math.floor(a / 100) - 10,
          d = e.datePicker.defaults.limitCenturies,
          s =
            '<div class="row header"><a href="#" class="prev' +
            (d && n < 1900 ? " disabled" : "") +
            '"><span class="arrow"></span></a><a href="#" class="century" data-century="' +
            (n + 10) +
            '">' +
            (n + 1) +
            "-" +
            (n + 100) +
            '</a><a href="#" class="next' +
            (d && 1990 == n ? " disabled" : "") +
            '"><span class="arrow"></span></a></div>';
        r.append(s);
        for (var l = 0, c = "", i = 0, o = 0; o < 3; o++) {
          for (var u = e('<div class="row"></div>'), h = 0; h < 4; h++)
            if (
              ((l = h + 4 * o),
              (c = 0 == l ? " grayed prev" : 11 == l ? " grayed next" : ""),
              (i = n + 10 * l),
              d && (i < 1900 || i > 2090))
            ) {
              f = e(
                '<a href="" class="cell large double decade blank">&nbsp;</a>',
              );
              u.append(f);
            } else {
              t >= i && t <= i + 9 && (c += " selected");
              var f = e(
                '<a href="#" data-year="' +
                  i +
                  '" class="cell large double decade' +
                  c +
                  '"><span>' +
                  i +
                  "- " +
                  (i + 9) +
                  "</span></a>",
              );
              u.append(f);
            }
          r.append(u);
        }
        return r;
      },
      buildYearPicker: function (a, t) {
        e.datePicker;
        var r = e('<div class="years"></div>'),
          n = 10 * Math.floor(a / 10) - 1,
          d = e.datePicker.defaults.limitCenturies,
          s =
            '<div class="row header"><a href="#" class="prev' +
            (d && 1899 == n ? " disabled" : "") +
            '"><span class="arrow"></span></a><a href="#" class="decade" data-decade="' +
            (n + 1) +
            '">' +
            (n + 1) +
            "-" +
            (n + 10) +
            '</a><a href="#" class="next' +
            (d && 2089 == n ? " disabled" : "") +
            '"><span class="arrow"></span></a></div>';
        r.append(s);
        for (var l = 0, c = "", i = 0, o = 0; o < 3; o++) {
          for (var u = e('<div class="row"></div>'), h = 0; h < 4; h++)
            if (
              ((l = h + 4 * o),
              (c = 0 == l ? " grayed prev" : 11 == l ? " grayed next" : ""),
              (i = n + l),
              d && (i < 1900 || i > 2099))
            ) {
              f = e('<a href="" class="cell large year blank">&nbsp;</a>');
              u.append(f);
            } else {
              i == t && (c += " selected");
              var f = e(
                '<a href="#" data-year="' +
                  i +
                  '" class="cell large year' +
                  c +
                  '">' +
                  i +
                  "</a>",
              );
              u.append(f);
            }
          r.append(u);
        }
        return r;
      },
      buildMonthPicker: function (a, t) {
        var r = e.datePicker,
          n = e('<div class="months"></div>'),
          d = e.datePicker.defaults.limitCenturies,
          s =
            '<div class="row header"><a href="#" class="prev' +
            (d && 1900 == a ? " disabled" : "") +
            '"><span class="arrow"></span></a><a href="#" class="year" data-year="' +
            a +
            '">' +
            a +
            '</a><a href="#" class="next' +
            (d && 2099 == a ? " disabled" : "") +
            '"><span class="arrow"></span></a></div>';
        n.append(s);
        for (var l = 0, c = "", i = 0; i < 3; i++) {
          for (var o = e('<div class="row"></div>'), u = 0; u < 4; u++) {
            ((c = ""), (l = u + 4 * i) == t && (c += " selected"));
            var h = e(
              '<a href="#" data-year="' +
                a +
                '" data-month="' +
                l +
                '" class="cell large month' +
                c +
                '">' +
                r.strings.monthsShort[l] +
                "</a>",
            );
            o.append(h);
          }
          n.append(o);
        }
        return n;
      },
      buildCalendar: function (a, t, r) {
        var n = e.datePicker,
          d = e('<div class="calendar"></div>'),
          s = new Date(),
          a = a || s.getFullYear(),
          t = t >= 0 ? t : s.getMonth(),
          l = new Date(a, t, 1),
          c = e.datePicker.defaults.limitCenturies;
        l.setDate(l.getDate() - 1);
        var i = l.getDate(),
          o = this.daysInMonth(a, t),
          u = this.firstDay(a, t),
          h = 1 - u;
        0 == u && (h -= 7);
        var f =
          '<div class="row header"><a href="#" class="prev' +
          (c && 1900 == a && 0 == t ? " disabled" : "") +
          '"><span class="arrow"></span></a><a href="#" class="month" data-year="' +
          a +
          '" data-month="' +
          t +
          '">' +
          n.strings.monthsFull[t] +
          " " +
          a +
          '</a><a href="#" class="next' +
          (c && 2099 == a && 11 == t ? " disabled" : "") +
          '"><span class="arrow"></span></a></div>';
        d.append(f);
        for (var p = e('<div class="row days"></div>'), v = 0; v < 7; v++)
          p.append('<div class="cell">' + n.strings.daysShort[v] + "</div>");
        d.append(p);
        for (v = 0; v < 6; v++) {
          for (var m = e('<div class="row week"></div>'), y = 0; y < 7; y++) {
            var k = h <= 0 ? i + h : h > o ? h - o : h,
              g = h <= 0 ? " grayed prev" : h > o ? " grayed next" : "";
            c &&
            ((1900 == a && 0 == t && h < 1) || (2099 == a && 11 == t && h > o))
              ? (m.append('<a href="#" class="cell day blank">&nbsp;</a>'), h++)
              : (h == s.getDate() &&
                  t == s.getMonth() &&
                  a == s.getFullYear() &&
                  (g += " today"),
                h == r.getDate() &&
                  t == r.getMonth() &&
                  a == r.getFullYear() &&
                  (g += " selected"),
                m.append('<a href="#" class="cell day' + g + '">' + k + "</a>"),
                h++);
          }
          d.append(m);
        }
        return d;
      },
      pad: function (e, a) {
        for (var t = e + ""; t.length < a; ) t = "0" + t;
        return t;
      },
    },
    show: function (a) {
      var t = e.extend(!0, {}, e.datePicker.defaults, a),
        r = null,
        n = new Date();
      t.element &&
        ("string" == typeof t.element && (t.element = e(t.element)),
        (n = t.parseDate(t.element.val())));
      var d = {
          day: n.getDate(),
          month: n.getMonth(),
          year: n.getFullYear(),
          decade: n.getFullYear(),
        },
        s = e.datePicker.utils.buildCalendar(d.year, d.month, n),
        l = e.datePicker.utils.buildMonthPicker(d.year, d.month),
        c = e.datePicker.utils.buildYearPicker(d.year, d.year),
        i = e.datePicker.utils.buildDecadePicker(d.year, d.year);
      if (
        ((r = e(
          '<div class="datepicker"><span class="tip"></span></div>',
        )).append(s),
        r.append(l),
        r.append(c),
        r.append(i),
        e.datePicker.hide(!0),
        t.element)
      ) {
        var o = t.element.offset();
        r.css({
          left: o.left + "px",
          top: o.top + t.element.outerHeight(!0) + 15 + "px",
        });
      }
      (r.hide(),
        e("body").append(r),
        r.fadeIn(150),
        r.on("click", ".calendar .day", function (a) {
          a.preventDefault();
          var r = e(this),
            s = r.closest(".calendar");
          if (!r.hasClass("blank")) {
            (s.find(".selected").removeClass("selected"),
              r.addClass("selected"),
              (d.day = parseInt(r.text()) || 1),
              r.hasClass("grayed") &&
                (r.hasClass("prev")
                  ? ((d.year -= 0 == d.month ? 1 : 0),
                    (d.month = d.month > 0 ? d.month - 1 : 11))
                  : r.hasClass("next") &&
                    ((d.year += 11 == d.month ? 1 : 0),
                    (d.month = d.month < 11 ? d.month + 1 : 0))));
            var l = new Date();
            if ((l.setFullYear(d.year, d.month, d.day), t.selectDate(l))) {
              n.setFullYear(d.year, d.month, d.day);
              var c = t.formatDate(n);
              (e(t.element).val(c),
                t.closeOnPick && !r.hasClass("grayed") && e.datePicker.hide());
            }
          }
        }),
        r.on("click", ".calendar .month", function (a) {
          a.preventDefault();
          var t = e(this).closest(".calendar"),
            n = r.children(".months"),
            s = e.datePicker.utils.buildMonthPicker(d.year, d.month);
          (n.replaceWith(s),
            (n = s),
            t.fadeOut(150, function () {
              n.fadeIn(150);
            }));
        }),
        r.on("click", ".calendar .prev", function (a) {
          a.preventDefault();
          var t = e(this),
            r = t.closest(".calendar"),
            s = r.find(".month"),
            l = s.data("month"),
            c = s.data("year");
          t.hasClass("disabled") ||
            ((l -= 1) < 0 && ((l = 11), c--),
            (d.month = l),
            (d.year = c),
            (replacement = e.datePicker.utils.buildCalendar(c, l, n)),
            replacement.hide(),
            r.after(replacement),
            r.fadeOut(150, function () {
              (r.detach(), replacement.fadeIn(150));
            }));
        }),
        r.on("click", ".calendar .next", function (a) {
          a.preventDefault();
          var t = e(this),
            r = t.closest(".calendar"),
            s = r.find(".month"),
            l = s.data("month"),
            c = s.data("year");
          t.hasClass("disabled") ||
            ((l += 1) > 11 && ((l = 0), c++),
            (d.month = l),
            (d.year = c),
            (replacement = e.datePicker.utils.buildCalendar(c, l, n)),
            replacement.hide(),
            r.after(replacement),
            r.fadeOut(150, function () {
              (r.detach(), replacement.fadeIn(150));
            }));
        }),
        r.on("click", ".months .month", function (a) {
          a.preventDefault();
          var t = e(this),
            s = t.closest(".months"),
            l = t.data("month"),
            c = t.data("year"),
            i = r.children(".calendar"),
            o = null;
          t.hasClass("blank") ||
            (s.find(".selected").removeClass("selected"),
            t.addClass("selected"),
            (d.month = l),
            (o = e.datePicker.utils.buildCalendar(c, l, n)).hide(),
            i.replaceWith(o),
            s.fadeOut(150, function () {
              o.fadeIn(150);
            }));
        }),
        r.on("click", ".months .prev", function (a) {
          a.preventDefault();
          var t = e(this),
            r = t.closest(".months"),
            n = r.find(".year").data("year");
          t.hasClass("disabled") ||
            ((n -= 1),
            (d.year = n),
            (replacement = e.datePicker.utils.buildMonthPicker(n, d.month)),
            replacement.hide(),
            r.after(replacement),
            r.fadeOut(150, function () {
              (r.detach(), replacement.fadeIn(150));
            }));
        }),
        r.on("click", ".months .next", function (a) {
          a.preventDefault();
          var t = e(this),
            r = t.closest(".months"),
            n = r.find(".year").data("year");
          t.hasClass("disabled") ||
            ((n += 1),
            (d.year = n),
            (replacement = e.datePicker.utils.buildMonthPicker(n, d.month)),
            replacement.hide(),
            r.after(replacement),
            r.fadeOut(150, function () {
              (r.detach(), replacement.fadeIn(150));
            }));
        }),
        r.on("click", ".months .year", function (a) {
          a.preventDefault();
          var t = e(this).closest(".months"),
            n = r.children(".years"),
            s = e.datePicker.utils.buildYearPicker(d.decade, d.year);
          (n.replaceWith(s),
            (n = s),
            t.fadeOut(150, function () {
              n.fadeIn(150);
            }));
        }),
        r.on("click", ".years .year", function (a) {
          a.preventDefault();
          var t = e(this),
            n = t.closest(".years"),
            s = t.data("year"),
            l = r.children(".months"),
            c = null;
          t.hasClass("blank") ||
            t.hasClass("next") ||
            t.hasClass("prev") ||
            (n.find(".selected").removeClass("selected"),
            t.addClass("selected"),
            (d.year = s),
            (d.decade = s),
            (c = e.datePicker.utils.buildMonthPicker(s, d.month)).hide(),
            l.replaceWith(c),
            n.fadeOut(150, function () {
              c.fadeIn(150);
            }));
        }),
        r.on("click", ".years .prev", function (a) {
          a.preventDefault();
          var t = e(this),
            r = t.closest(".years"),
            n = r.find(".decade").data("decade");
          t.hasClass("disabled") ||
            ((n -= 10),
            (d.decade = n),
            (replacement = e.datePicker.utils.buildYearPicker(n, d.year)),
            replacement.hide(),
            r.after(replacement),
            r.fadeOut(150, function () {
              (r.detach(), replacement.fadeIn(150));
            }));
        }),
        r.on("click", ".years .next", function (a) {
          a.preventDefault();
          var t = e(this),
            r = t.closest(".years"),
            n = r.find(".decade").data("decade");
          t.hasClass("disabled") ||
            ((n += 10),
            (d.decade = n),
            (replacement = e.datePicker.utils.buildYearPicker(n, d.year)),
            replacement.hide(),
            r.after(replacement),
            r.fadeOut(150, function () {
              (r.detach(), replacement.fadeIn(150));
            }));
        }),
        r.on("click", ".years .decade", function (a) {
          a.preventDefault();
          var t = e(this).closest(".years"),
            n = r.children(".decades");
          t.fadeOut(150, function () {
            n.fadeIn(150);
          });
        }),
        r.on("click", ".decades .decade", function (a) {
          a.preventDefault();
          var t = e(this),
            n = t.data("year"),
            s = t.closest(".decades"),
            l = r.children(".years"),
            c = null;
          t.hasClass("blank") ||
            t.hasClass("next") ||
            t.hasClass("prev") ||
            (s.find(".selected").removeClass("selected"),
            t.addClass("selected"),
            (c = e.datePicker.utils.buildYearPicker(n, d.year)).hide(),
            l.replaceWith(c),
            s.fadeOut(150, function () {
              c.fadeIn(150);
            }));
        }),
        r.on("click", ".decades .prev", function (a) {
          a.preventDefault();
          var t = e(this),
            r = t.closest(".decades"),
            n = r.find(".century").data("century");
          t.hasClass("disabled") ||
            ((n -= 100),
            (replacement = e.datePicker.utils.buildDecadePicker(n, d.decade)),
            replacement.hide(),
            r.after(replacement),
            r.fadeOut(150, function () {
              (r.detach(), replacement.fadeIn(150));
            }));
        }),
        r.on("click", ".decades .next", function (a) {
          a.preventDefault();
          var t = e(this),
            r = t.closest(".decades"),
            n = r.find(".century").data("century");
          t.hasClass("disabled") ||
            ((n += 100),
            (replacement = e.datePicker.utils.buildDecadePicker(n, d.decade)),
            replacement.hide(),
            r.after(replacement),
            r.fadeOut(150, function () {
              (r.detach(), replacement.fadeIn(150));
            }));
        }),
        r.on("click", ".decades .century", function (e) {
          e.preventDefault();
        }),
        e(document).on("mouseup", function (a) {
          r.is(a.target) ||
            0 !== r.has(a.target).length ||
            (e(document).off("mouseup"), e.datePicker.hide());
        }));
    },
    hide: function (a) {
      var a = a || !1,
        t = e(".datepicker");
      a ? t.remove() : t.fadeOut(150, t.remove);
    },
  }),
    (e.fn.datePicker = function (a) {
      if (!this.length) return this;
      e.extend(!0, {}, e.datePicker.defaults, a);
      return (
        this.each(function () {
          var a = e(this),
            t = a.parent().find("[data-toggle=datepicker]"),
            r = a.data("locked");
          r = !!r && r.split(";");
          var n = function (a) {
            var t = !0,
              n =
                e.datePicker.utils.pad(a.getDate(), 2) +
                "/" +
                e.datePicker.utils.pad(a.getMonth() + 1, 2) +
                "/" +
                a.getFullYear();
            if (r.length)
              for (var d = 0; d < r.length; d++)
                if (r[d] == n) {
                  ("function" == typeof e.alert
                    ? (e.alert = e.datePicker.strings.messageLocked)
                    : alert(e.datePicker.strings.messageLocked),
                    (t = !1));
                  break;
                }
            return t;
          };
          t.length
            ? t.on("click", function (t) {
                (t.preventDefault(),
                  e(".datepicker:visible").length
                    ? e.datePicker.hide()
                    : e.datePicker.show({ element: a, selectDate: n }));
              })
            : a.on("click", function () {
                e.datePicker.show({ element: a, selectDate: n });
              });
        }),
        this
      );
    }),
    e("[data-select=datepicker]").each(function () {
      e(this).datePicker();
    }));
})(jQuery);

/* Fake Loader */
/*
 *JAVASCRIPT "FakeLoader.js"
 *Version:    1.1.0 - 2014
 *author:     João Pereira
 *website:    http://www.joaopereira.pt
 *Licensed MIT
 */
!(function (i) {
  function s() {
    var s = i(window).width(),
      c = i(window).height(),
      d = i(".fl").outerWidth(),
      e = i(".fl").outerHeight();
    i(".fl").css({
      position: "absolute",
      left: s / 2 - d / 2,
      top: c / 2 - e / 2,
    });
  }
  ((i.fn.fakeLoader = function (c) {
    var d = i.extend(
        {
          timeToHide: 1200,
          pos: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          zIndex: "999",
          bgColor: "#2ecc71",
          spinner: "spinner7",
          imagePath: "",
        },
        c,
      ),
      e =
        '<div class="fl spinner1"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>',
      l =
        '<div class="fl spinner2"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>',
      n =
        '<div class="fl spinner3"><div class="dot1"></div><div class="dot2"></div></div>',
      v = '<div class="fl spinner4"></div>',
      a =
        '<div class="fl spinner5"><div class="cube1"></div><div class="cube2"></div></div>',
      r =
        '<div class="fl spinner6"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>',
      t =
        '<div class="fl spinner7"><div class="circ1"></div><div class="circ2"></div><div class="circ3"></div><div class="circ4"></div></div>',
      o = i(this),
      h = {
        position: d.pos,
        width: d.width,
        height: d.height,
        top: d.top,
        left: d.left,
      };
    return (
      o.css(h),
      o.each(function () {
        var i = d.spinner;
        switch (i) {
          case "spinner1":
            o.html(e);
            break;
          case "spinner2":
            o.html(l);
            break;
          case "spinner3":
            o.html(n);
            break;
          case "spinner4":
            o.html(v);
            break;
          case "spinner5":
            o.html(a);
            break;
          case "spinner6":
            o.html(r);
            break;
          case "spinner7":
            o.html(t);
            break;
          default:
            o.html(e);
        }
        ("" != d.imagePath &&
          o.html('<div class="fl"><img src="' + d.imagePath + '"></div>'),
          s());
      }),
      setTimeout(function () {
        i(o).fadeOut();
      }, d.timeToHide),
      this.css({ backgroundColor: d.bgColor, zIndex: d.zIndex })
    );
  }),
    i(window).on("load", function () {
      (s(),
        i(window).resize(function () {
          s();
        }));
    }));
})(jQuery);
