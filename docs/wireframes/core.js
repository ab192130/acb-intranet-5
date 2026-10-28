/* ==========================================================================
   ACB Intranet — lo-fi wireframes
   core.js : primitives, hand-drawn DSL, global shell
   rough.js + Kalam. Grayscale + one accent (#a4512f) for primary/annotation.
   Every frame is 1440x900, drawn into <svg data-frame="...">.
   ========================================================================== */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var W = 1440, H = 900, RAIL = 76, TOP = 60;

  var C = {
    ink: '#33302b', ink2: '#6d675d', faint: '#a9a294', line: '#c9c4b6',
    fill: '#efece2', fill2: '#e2ded1', accent: '#a4512f', accentBg: '#f0ded4',
    white: '#fffef9'
  };

  var FONT = "'Kalam','Segoe Print','Comic Sans MS',cursive";

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* Kalam is a fairly wide hand font; 0.495 is a good average advance. */
  function tw(s, size) { return String(s).length * size * 0.495; }

  function rrPath(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    return 'M' + (x + r) + ' ' + y +
      'L' + (x + w - r) + ' ' + y +
      'Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) +
      'L' + (x + w) + ' ' + (y + h - r) +
      'Q' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) +
      'L' + (x + r) + ' ' + (y + h) +
      'Q' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) +
      'L' + x + ' ' + (y + r) +
      'Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + 'Z';
  }

  function Frame(svg) {
    this.svg = svg;
    this.rc = rough.svg(svg);
    this.g = el('g', {}, svg);
  }

  Frame.prototype.add = function (node) { this.g.appendChild(node); return node; };

  /* ---- shapes ---- */

  Frame.prototype.rect = function (x, y, w, h, o) {
    o = o || {};
    var opts = {
      roughness: o.rough == null ? 1.05 : o.rough,
      bowing: o.bowing == null ? 1.1 : o.bowing,
      stroke: o.stroke === undefined ? C.ink : o.stroke,
      strokeWidth: o.sw == null ? 1.5 : o.sw,
      fill: o.fill,
      fillStyle: 'solid',
      fillWeight: 1.1
    };
    if (o.dash) opts.strokeLineDash = o.dash;
    if (opts.stroke === 'none') delete opts.stroke;
    return this.add(this.rc.rectangle(x, y, w, h, opts));
  };

  Frame.prototype.rrect = function (x, y, w, h, r, o) {
    o = o || {};
    var opts = {
      roughness: o.rough == null ? 0.95 : o.rough,
      bowing: 1,
      stroke: o.stroke === undefined ? C.ink : o.stroke,
      strokeWidth: o.sw == null ? 1.4 : o.sw,
      fill: o.fill,
      fillStyle: 'solid',
      fillWeight: 1.1
    };
    if (o.dash) opts.strokeLineDash = o.dash;
    if (opts.stroke === 'none') delete opts.stroke;
    return this.add(this.rc.path(rrPath(x, y, w, h, r), opts));
  };

  Frame.prototype.circle = function (x, y, d, o) {
    o = o || {};
    var opts = {
      roughness: o.rough == null ? 0.9 : o.rough,
      stroke: o.stroke === undefined ? C.ink : o.stroke,
      strokeWidth: o.sw == null ? 1.4 : o.sw,
      fill: o.fill,
      fillStyle: 'solid',
      fillWeight: 1.1
    };
    if (o.dash) opts.strokeLineDash = o.dash;
    return this.add(this.rc.circle(x, y, d, opts));
  };

  Frame.prototype.line = function (x1, y1, x2, y2, o) {
    o = o || {};
    var opts = {
      roughness: o.rough == null ? 0.9 : o.rough,
      bowing: 0.8,
      stroke: o.color || C.line,
      strokeWidth: o.sw == null ? 1.3 : o.sw
    };
    if (o.dash) opts.strokeLineDash = o.dash;
    return this.add(this.rc.line(x1, y1, x2, y2, opts));
  };

  Frame.prototype.plainRect = function (x, y, w, h, fill, op) {
    return this.add(el('rect', { x: x, y: y, width: w, height: h, fill: fill, opacity: op == null ? 1 : op }, this.g));
  };

  Frame.prototype.dot = function (x, y, r, fill) {
    return this.add(el('circle', { cx: x, cy: y, r: r, fill: fill || C.ink }, this.g));
  };

  /* ---- text ---- */

  Frame.prototype.text = function (x, y, str, o) {
    o = o || {};
    var t = el('text', {
      x: x, y: y,
      'font-family': FONT,
      'font-size': o.size || 14,
      'font-weight': o.weight || 400,
      fill: o.color || C.ink,
      'text-anchor': o.anchor || 'start',
      'letter-spacing': o.ls || 0,
      opacity: o.opacity == null ? 1 : o.opacity
    }, this.g);
    if (o.rot) t.setAttribute('transform', 'rotate(' + o.rot + ' ' + x + ' ' + y + ')');
    t.textContent = str;
    return t;
  };

  /* wavy placeholder line — lo-fi stand-in for body copy */
  Frame.prototype.pline = function (x, y, w, o) {
    o = o || {};
    var step = 10, amp = o.amp == null ? 1.7 : o.amp, d = 'M' + x + ' ' + y;
    for (var i = step; i <= w; i += step) {
      d += ' q ' + (step / 2) + ' ' + ((i / step) % 2 ? amp : -amp) + ' ' + step + ' 0';
    }
    return this.add(el('path', {
      d: d, fill: 'none', stroke: o.color || C.faint,
      'stroke-width': o.sw == null ? 1.5 : o.sw, 'stroke-linecap': 'round'
    }, this.g));
  };

  Frame.prototype.plines = function (x, y, w, count, gap, o) {
    o = o || {};
    for (var i = 0; i < count; i++) {
      var lw = i === count - 1 ? w * (o.last || 0.62) : w * (1 - (i % 3) * 0.035);
      this.pline(x, y + i * (gap || 22), lw, o);
    }
  };

  /* ---- components ---- */

  Frame.prototype.card = function (x, y, w, h, title, hint, o) {
    o = o || {};
    this.rrect(x, y, w, h, 6, { fill: o.fill === undefined ? C.white : o.fill });
    if (title) this.text(x + 20, y + 28, title, { size: o.tsize || 15, weight: 700 });
    if (hint) this.text(x + w - 18, y + 27, hint, { size: 12, color: C.ink2, anchor: 'end' });
  };

  Frame.prototype.chip = function (x, y, label, o) {
    o = o || {};
    var h = o.h || 24;
    var w = o.w || (tw(label, o.size || 12) + 24);
    this.rrect(x, y, w, h, h / 2, {
      fill: o.active ? C.ink : (o.fill || C.fill),
      stroke: o.active ? C.ink : C.line,
      rough: 0.8, sw: 1.2
    });
    this.text(x + w / 2, y + h / 2 + (o.size || 12) * 0.36, label, {
      size: o.size || 12, anchor: 'middle',
      color: o.active ? C.white : (o.color || C.ink2),
      weight: o.weight || 400
    });
    return w;
  };

  Frame.prototype.btn = function (x, y, w, label, o) {
    o = o || {};
    var h = o.h || 36, primary = o.kind === 'primary';
    this.rrect(x, y, w, h, 5, {
      fill: primary ? C.accent : (o.kind === 'ghost' ? 'none' : C.fill),
      stroke: primary ? C.accent : C.ink, rough: 0.9, sw: 1.3
    });
    this.text(x + w / 2, y + h / 2 + (o.size || 13) * 0.36, label, {
      size: o.size || 13, weight: 700, anchor: 'middle',
      color: primary ? C.white : C.ink
    });
  };

  Frame.prototype.input = function (x, y, w, ph, o) {
    o = o || {};
    var h = o.h || 36;
    this.rrect(x, y, w, h, 5, { fill: o.fill || C.fill, stroke: C.line, rough: 0.8, sw: 1.2 });
    this.circle(x + 18, y + h / 2, 11, { stroke: C.faint, sw: 1.3 });
    this.line(x + 22, y + h / 2 + 4, x + 26, y + h / 2 + 8, { color: C.faint, sw: 1.3 });
    this.text(x + 34, y + h / 2 + 4.5, ph, { size: 12.5, color: C.faint });
  };

  Frame.prototype.av = function (x, y, r, initials, o) {
    o = o || {};
    this.circle(x, y, r * 2, { fill: o.fill || C.fill2, stroke: C.ink2, sw: 1.1, rough: 0.7 });
    this.text(x, y + r * 0.34, initials, {
      size: Math.max(9, r * 0.78), anchor: 'middle', color: C.ink2, weight: 700
    });
  };

  Frame.prototype.avstack = function (x, y, names, r) {
    r = r || 11;
    var self = this;
    names.forEach(function (n, i) {
      self.av(x + i * (r * 1.8), y, r, n, {});
    });
    return x + names.length * (r * 1.8);
  };

  Frame.prototype.check = function (x, y, on, s) {
    s = s || 14;
    this.rrect(x, y, s, s, 3, { fill: on ? C.ink : 'none', stroke: C.ink2, sw: 1.2, rough: 0.6 });
    if (on) {
      this.line(x + 3, y + s * 0.55, x + s * 0.42, y + s - 3, { color: C.white, sw: 1.6 });
      this.line(x + s * 0.42, y + s - 3, x + s - 2.5, y + 3, { color: C.white, sw: 1.6 });
    }
  };

  Frame.prototype.anno = function (n, x, y, tx, ty) {
    if (tx != null) this.line(x, y, tx, ty, { color: C.accent, dash: [4, 4], sw: 1.1 });
    this.circle(x, y, 22, { fill: C.accent, stroke: C.accent, rough: 0.7, sw: 1 });
    this.text(x, y + 4.6, String(n), { size: 13, weight: 700, anchor: 'middle', color: C.white });
  };

  /* inline footnote marker (fits next to a 13px label) */
  Frame.prototype.annoS = function (n, x, y) {
    this.circle(x, y, 16, { fill: C.accent, stroke: C.accent, rough: 0.7, sw: 1 });
    this.text(x, y + 3.4, String(n), { size: 10, weight: 700, anchor: 'middle', color: C.white });
  };

  Frame.prototype.chev = function (x, y, dir, s) {
    s = s || 5;
    if (dir === 'right') this.line(x - s / 2, y - s, x + s / 2, y, { color: C.ink2, sw: 1.3 }),
      this.line(x + s / 2, y, x - s / 2, y + s, { color: C.ink2, sw: 1.3 });
    else this.line(x - s, y - s / 2, x, y + s / 2, { color: C.ink2, sw: 1.3 }),
      this.line(x, y + s / 2, x + s, y - s / 2, { color: C.ink2, sw: 1.3 });
  };

  /* dependency arrow: hand-drawn shaft + head */
  Frame.prototype.arrow = function (x1, y1, x2, y2, o) {
    o = o || {};
    this.line(x1, y1, x2, y2, { color: o.color || C.ink2, dash: o.dash || [6, 5], sw: 1.3 });
    var a = Math.atan2(y2 - y1, x2 - x1), s = 7;
    this.line(x2, y2, x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45), { color: o.color || C.ink2, sw: 1.3 });
    this.line(x2, y2, x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45), { color: o.color || C.ink2, sw: 1.3 });
  };

  /* ---- global shell: left rail + top bar ---- */

  var NAV = [
    { label: 'Bugün', icon: 'sun' },
    { label: 'Layihə', icon: 'grid' },
    { label: 'Bilik', icon: 'doc' },
    { label: 'İnsan', icon: 'people' },
    { label: 'Xəritə', icon: 'map' }
  ];

  function navIcon(f, kind, cx, cy) {
    var s = 9;
    if (kind === 'sun') {
      f.circle(cx, cy, 15, { sw: 1.3, rough: 0.7 });
      f.dot(cx, cy, 2.2);
    } else if (kind === 'grid') {
      f.rect(cx - s - 1, cy - s - 1, s, s, { rough: 0.6, sw: 1.2 });
      f.rect(cx + 1, cy - s - 1, s, s, { rough: 0.6, sw: 1.2 });
      f.rect(cx - s - 1, cy + 1, s, s, { rough: 0.6, sw: 1.2 });
      f.rect(cx + 1, cy + 1, s, s, { rough: 0.6, sw: 1.2 });
    } else if (kind === 'doc') {
      f.rect(cx - 8, cy - 10, 16, 20, { rough: 0.6, sw: 1.2 });
      f.line(cx - 4, cy - 3, cx + 4, cy - 3, { sw: 1.1 });
      f.line(cx - 4, cy + 2, cx + 2, cy + 2, { sw: 1.1 });
    } else if (kind === 'people') {
      f.circle(cx - 3, cy - 3, 9, { sw: 1.2, rough: 0.7 });
      f.circle(cx + 5, cy - 1, 6, { sw: 1.1, rough: 0.7, stroke: C.faint });
      f.line(cx - 8, cy + 9, cx + 2, cy + 9, { sw: 1.2 });
    } else if (kind === 'map') {
      f.circle(cx - 7, cy + 5, 7, { sw: 1.2, rough: 0.7 });
      f.circle(cx + 7, cy - 6, 7, { sw: 1.2, rough: 0.7 });
      f.line(cx - 3, cy + 2, cx + 3, cy - 3, { sw: 1.1, dash: [3, 3] });
    }
  }

  function shell(f, opts) {
    opts = opts || {};
    f.line(RAIL, 0, RAIL, H, { color: C.line, sw: 1.2 });
    f.line(RAIL, TOP, W, TOP, { color: C.line, sw: 1.2 });

    /* logo */
    f.rrect(22, 16, 32, 32, 8, { fill: C.ink, stroke: C.ink });
    f.text(38, 39, '◈', { size: 15, anchor: 'middle', color: C.white });

    /* nav */
    var active = opts.active || 0;
    for (var i = 0; i < NAV.length; i++) {
      var cy = 104 + i * 62;
      if (i === active) f.rrect(14, cy - 20, 48, 52, 8, { fill: C.fill2, stroke: 'none', rough: 0.6 });
      navIcon(f, NAV[i].icon, 38, cy);
      f.text(38, cy + 28, NAV[i].label, {
        size: 10.5, anchor: 'middle',
        color: i === active ? C.ink : C.faint,
        weight: i === active ? 700 : 400
      });
    }
    f.line(30, 452, 46, 452, { color: C.line });
    f.circle(38, 486, 15, { sw: 1.2, rough: 0.7 });
    f.dot(38, 486, 2.4, C.faint);
    f.av(38, 830, 13, 'BA');

    /* top bar */
    f.text(100, 37, opts.crumb || '', { size: 13, color: C.ink2 });
    if (opts.search !== false) f.input(760, 13, 380, 'Axtar: iş, sənəd, insan…', { h: 34 });
    f.btn(1156, 13, 108, '+ Yarat', { kind: 'primary', h: 34, size: 12.5 });
    f.circle(1300, 30, 22, { sw: 1.2, rough: 0.7 });
    f.circle(1300, 30, 5, { fill: C.accent, stroke: C.accent, sw: 0 });
    f.av(1346, 30, 13, 'BA');
  }

  window.WF = {
    W: W, H: H, RAIL: RAIL, TOP: TOP, C: C, FONT: FONT,
    Frame: Frame, shell: shell, el: el, tw: tw, rrPath: rrPath,
    NAV: NAV, navIcon: navIcon,
    /* registry — pages register their own frames here; core.js creates it
       so any page can run standalone without a frames-*.js bootstrap. */
    frames: {}
  };
})();
