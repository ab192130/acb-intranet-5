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
    else if (dir === 'up') this.line(x - s, y + s / 2, x, y - s / 2, { color: C.ink2, sw: 1.3 }),
      this.line(x, y - s / 2, x + s, y + s / 2, { color: C.ink2, sw: 1.3 });
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
    var header = opts.header !== false;
    f.line(RAIL, 0, RAIL, H, { color: C.line, sw: 1.2 });
    if (header) f.line(RAIL, TOP, W, TOP, { color: C.line, sw: 1.2 });

    /* logo */
    f.rrect(22, 16, 32, 32, 8, { fill: C.ink, stroke: C.ink });
    f.text(38, 39, '◈', { size: 15, anchor: 'middle', color: C.white });

    /* headerless mode: cmdk trigger under the logo */
    if (!header) {
      f.rrect(18, 56, 40, 40, 8, { fill: C.fill, stroke: C.line, rough: 0.7 });
      f.circle(38, 74, 12, { stroke: C.ink2, sw: 1.3, rough: 0.7 });
      f.line(44, 80, 49, 85, { color: C.ink2, sw: 1.3 });
      f.text(38, 91, '⌘K', { size: 8, anchor: 'middle', color: C.faint });
    }

    /* nav */
    var active = opts.active || 0;
    for (var i = 0; i < NAV.length; i++) {
      var cy = (header ? 104 : 124) + i * 62;
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
    if (header) {
      f.text(100, 37, opts.crumb || '', { size: 13, color: C.ink2 });
      if (opts.search !== false) f.input(760, 13, 380, 'Axtar: iş, sənəd, insan…', { h: 34 });
      f.btn(1156, 13, 108, '+ Yarat', { kind: 'primary', h: 34, size: 12.5 });
      f.circle(1300, 30, 22, { sw: 1.2, rough: 0.7 });
      f.circle(1300, 30, 5, { fill: C.accent, stroke: C.accent, sw: 0 });
      f.av(1346, 30, 13, 'BA');
    }
  }

  /* ---- shadcn-style component layer, drawn with the same rough.js DSL ----
     All geometry is crisp (rough:0); copy stays Kalam. The layer is opt-in:
     existing lo-fi frames keep using the primitives above. */
  var UI = {};

  UI.C = {
    bg: C.white, fg: C.ink, muted: C.fill, mutedFg: C.ink2, border: C.line,
    primary: C.ink, primaryFg: C.white, destructive: C.accent, destructiveFg: C.white,
    ring: C.faint
  };

  UI.label = function (f, x, y, text) {
    f.text(x, y, String(text).toUpperCase(), { size: 10.5, weight: 700, color: C.faint, ls: 1.2 });
  };

  UI.button = function (f, x, y, w, label, o) {
    o = o || {};
    var h = o.h || (o.size === 'sm' ? 32 : o.size === 'lg' ? 40 : 36);
    var fs = o.fs || (o.size === 'sm' ? 12 : o.size === 'lg' ? 13.5 : 13);
    var v = o.variant || 'default';
    var fill = UI.C.primary, stroke = UI.C.primary, color = UI.C.primaryFg;
    if (v === 'secondary') { fill = C.fill; stroke = C.fill; color = C.ink; }
    else if (v === 'outline') { fill = 'none'; stroke = C.line; color = C.ink; }
    else if (v === 'ghost') { fill = 'none'; stroke = 'none'; color = C.ink; }
    else if (v === 'destructive') { fill = UI.C.destructive; stroke = UI.C.destructive; color = UI.C.destructiveFg; }
    else if (v === 'link') { fill = 'none'; stroke = 'none'; color = C.ink; }
    if (o.disabled) { fill = C.fill; stroke = C.line; color = C.faint; }
    if (v !== 'link' && v !== 'ghost') f.rrect(x, y, w, h, 6, { fill: fill, stroke: stroke, sw: 1.1, rough: 0.8 });
    f.text(x + w / 2, y + h / 2 + fs * 0.36, label, {
      size: fs, weight: 700, anchor: 'middle', color: color
    });
    if (v === 'link') {
      var lw = tw(label, fs);
      f.line(x + (w - lw) / 2, y + h - 4, x + (w + lw) / 2, y + h - 4, { color: o.disabled ? C.faint : C.ink, sw: 1.1 });
    }
    if (o.focus) f.rrect(x - 3, y - 3, w + 6, h + 6, 8, {
      fill: 'none', stroke: C.faint, sw: 1.2, dash: [3, 3], rough: 0.8
    });
    return { w: w, h: h };
  };

  UI.badge = function (f, x, y, label, o) {
    o = o || {};
    var v = o.variant || 'default', h = o.h || 22, fs = o.fs || 10.5;
    var w = o.w || (tw(label, fs) + 20);
    var fill = UI.C.primary, stroke = UI.C.primary, color = UI.C.primaryFg;
    if (v === 'secondary') { fill = C.fill; stroke = C.fill; color = C.ink2; }
    else if (v === 'outline') { fill = 'none'; stroke = C.line; color = C.ink2; }
    else if (v === 'destructive') { fill = UI.C.destructive; stroke = UI.C.destructive; color = UI.C.destructiveFg; }
    f.rrect(x, y, w, h, h / 2, { fill: fill, stroke: stroke, sw: 1, rough: 0.8 });
    f.text(x + w / 2, y + h / 2 + fs * 0.36, label, {
      size: fs, weight: 700, anchor: 'middle', color: color
    });
    return w;
  };

  UI.input = function (f, x, y, w, o) {
    o = o || {};
    var h = o.h || 36, fs = o.fs || 12.5, top = y;
    if (o.label) { f.text(x, y + 12, o.label, { size: 12, weight: 700 }); top = y + 24; }
    f.rrect(x, top, w, h, 6, {
      fill: C.white, stroke: o.error ? C.accent : C.line, sw: 1.1, rough: 0.8
    });
    var val = o.value != null ? o.value : (o.placeholder || '');
    f.text(x + 12, top + h / 2 + fs * 0.36, val, {
      size: fs, color: o.value != null ? C.ink : C.faint
    });
    if (o.hint) f.text(x, top + h + 16, o.hint, { size: 11, color: o.error ? C.accent : C.faint });
    return top + h + (o.hint ? 24 : 0) - y;
  };

  UI.select = function (f, x, y, w, o) {
    o = o || {};
    var h = o.h || 36, fs = 12.5, top = y;
    if (o.label) { f.text(x, y + 12, o.label, { size: 12, weight: 700 }); top = y + 24; }
    f.rrect(x, top, w, h, 6, { fill: C.white, stroke: C.line, sw: 1.1, rough: 0.8 });
    f.text(x + 12, top + h / 2 + fs * 0.36, o.value || o.placeholder || '', {
      size: fs, color: o.value ? C.ink : C.faint
    });
    f.chev(x + w - 14, top + h / 2, 'down', 4.5);
    if (o.hint) f.text(x, top + h + 16, o.hint, { size: 11, color: C.faint });
    return top + h + (o.hint ? 24 : 0) - y;
  };

  UI.textarea = function (f, x, y, w, o) {
    o = o || {};
    var h = o.h || 84, fs = 12.5, top = y;
    if (o.label) { f.text(x, y + 12, o.label, { size: 12, weight: 700 }); top = y + 24; }
    f.rrect(x, top, w, h, 6, { fill: C.white, stroke: C.line, sw: 1.1, rough: 0.8 });
    f.text(x + 12, top + 22, o.placeholder || '', { size: fs, color: C.faint });
    if (o.hint) f.text(x, top + h + 16, o.hint, { size: 11, color: C.faint });
    return top + h + (o.hint ? 24 : 0) - y;
  };

  UI.checkbox = function (f, x, y, label, checked) {
    var s = 16;
    f.rrect(x, y, s, s, 3, {
      fill: checked ? C.ink : C.white, stroke: checked ? C.ink : C.line, sw: 1.1, rough: 0.8
    });
    if (checked) {
      f.line(x + 4, y + s * 0.55, x + s * 0.42, y + s - 4, { color: C.white, sw: 1.8 });
      f.line(x + s * 0.42, y + s - 4, x + s - 3, y + 4, { color: C.white, sw: 1.8 });
    }
    f.text(x + s + 9, y + s / 2 + 4.5, label, { size: 12.5, color: C.ink });
    return s;
  };

  UI.radio = function (f, x, y, label, checked) {
    f.circle(x + 8, y + 8, 16, {
      fill: C.white, stroke: checked ? C.ink : C.line, sw: 1.2, rough: 0.8
    });
    if (checked) f.dot(x + 8, y + 8, 4, C.ink);
    f.text(x + 24, y + 12.5, label, { size: 12.5, color: C.ink });
    return 16;
  };

  UI.switch = function (f, x, y, label, on) {
    var w = 36, h = 20;
    f.rrect(x, y, w, h, 10, {
      fill: on ? C.ink : C.fill2, stroke: on ? C.ink : C.line, sw: 1, rough: 0.8
    });
    f.dot(x + (on ? w - 10 : 10), y + h / 2, 7, C.white);
    f.text(x + w + 10, y + 13, label, { size: 12.5, color: C.ink });
    return w;
  };

  UI.avatarGroup = function (f, x, y, names, r) {
    r = r || 11;
    names.forEach(function (n, i) {
      var cx = x + i * (r * 1.7);
      f.dot(cx, y, r + 2, C.white);
      f.av(cx, y, r, n);
    });
    return x + names.length * (r * 1.7);
  };

  UI.tabs = function (f, x, y, items, active, o) {
    o = o || {};
    var h = o.h || 36, pad = o.pad == null ? 4 : o.pad, gap = o.gap == null ? 4 : o.gap;
    var fs = o.size || 12.5, ip = o.itemPad == null ? 14 : o.itemPad;
    var widths = items.map(function (label) { return tw(label, fs) + ip * 2; });
    var total = pad * 2 + gap * (items.length - 1);
    widths.forEach(function (w) { total += w; });
    f.rrect(x, y, total, h, 9, { fill: C.fill, stroke: C.fill, rough: 0.8 });
    var cx = x + pad;
    items.forEach(function (label, i) {
      if (i === active) f.rrect(cx, y + pad, widths[i], h - pad * 2, 7, {
        fill: C.white, stroke: C.line, sw: 0.9, rough: 0.8
      });
      f.text(cx + widths[i] / 2, y + h / 2 + fs * 0.36, label, {
        size: fs, weight: i === active ? 700 : 400,
        anchor: 'middle', color: i === active ? C.ink : C.ink2
      });
      cx += widths[i] + gap;
    });
    return { w: total, h: h, widths: widths };
  };

  UI.card = function (f, x, y, w, h, title, desc) {
    f.rrect(x, y, w, h, 8, { fill: C.white, stroke: C.line, sw: 1.1, rough: 0.8 });
    if (title) f.text(x + 24, y + 34, title, { size: 15, weight: 700 });
    if (desc) f.text(x + 24, y + 56, desc, { size: 11.5, color: C.ink2 });
    return { x: x, y: y, w: w, h: h, bodyY: y + (title ? 84 : 24) };
  };

  UI.alert = function (f, x, y, w, h, title, text, o) {
    o = o || {};
    var danger = o.variant === 'destructive';
    f.rrect(x, y, w, h, 6, {
      fill: C.white, stroke: danger ? C.accent : C.line, sw: 1.1, rough: 0.8
    });
    f.circle(x + 18, y + 22, 12, { stroke: danger ? C.accent : C.ink2, sw: 1.2, rough: 0.7 });
    f.text(x + 18, y + 26, '!', { size: 10, weight: 700, anchor: 'middle', color: danger ? C.accent : C.ink2 });
    f.text(x + 34, y + 26, title, { size: 12.5, weight: 700, color: danger ? C.accent : C.ink });
    f.text(x + 34, y + 46, text, { size: 11.5, color: C.ink2 });
    return h;
  };

  UI.breadcrumb = function (f, x, y, items) {
    var cx = x;
    items.forEach(function (item, i) {
      var last = i === items.length - 1;
      f.text(cx, y, item, { size: 12, color: last ? C.ink : C.ink2, weight: last ? 700 : 400 });
      cx += tw(item, 12) + 6;
      if (!last) {
        f.chev(cx + 5, y - 4, 'right', 4);
        cx += 18;
      }
    });
    return cx - x;
  };

  UI.menu = function (f, x, y, w, items) {
    var rowH = 32, pad = 6, h = pad * 2;
    items.forEach(function (it) { h += it.type === 'sep' ? 9 : rowH; });
    f.rrect(x, y, w, h, 6, { fill: C.white, stroke: C.line, sw: 1.1, rough: 0.8 });
    var cy = y + pad;
    items.forEach(function (it) {
      if (it.type === 'sep') {
        f.line(x + 8, cy + 4, x + w - 8, cy + 4, { color: C.line, sw: 1 });
        cy += 9;
        return;
      }
      f.text(x + 12, cy + 21, it.label, { size: 12, color: it.danger ? C.accent : C.ink });
      if (it.shortcut) f.text(x + w - 12, cy + 21, it.shortcut, {
        size: 10, color: C.faint, anchor: 'end'
      });
      cy += rowH;
    });
    return h;
  };

  UI.dialog = function (f, x, y, w, h, title, desc, o) {
    o = o || {};
    f.rrect(x, y, w, h, 8, {
      fill: C.fill, stroke: C.line, sw: 1.1, dash: [6, 5], rough: 0.8
    });
    var dx = x + 32, dy = y + 32, dw = w - 64, dh = h - 64;
    f.rrect(dx, dy, dw, dh, 8, { fill: C.white, stroke: C.line, sw: 1.2, rough: 0.8 });
    f.text(dx + 24, dy + 34, title, { size: 15, weight: 700 });
    f.text(dx + 24, dy + 56, desc, { size: 11.5, color: C.ink2 });
    f.plines(dx + 24, dy + 84, dw - 48, 2, 18, { last: 0.7 });
    var bw = 96, bh = 32, by = dy + dh - 44;
    f.rrect(dx + dw - 24 - bw, by, bw, bh, 6, {
      fill: o.danger ? C.accent : C.ink, stroke: o.danger ? C.accent : C.ink, sw: 1, rough: 0.8
    });
    f.text(dx + dw - 24 - bw / 2, by + 20, o.confirm || 'Təsdiq', {
      size: 11.5, weight: 700, anchor: 'middle', color: C.white
    });
    f.rrect(dx + dw - 34 - bw * 2, by, bw, bh, 6, {
      fill: 'none', stroke: C.line, sw: 1.1, rough: 0.8
    });
    f.text(dx + dw - 34 - bw * 1.5, by + 20, o.cancel || 'Ləğv et', {
      size: 11.5, anchor: 'middle', color: C.ink
    });
    return h;
  };

  UI.table = function (f, x, y, w, cols, rows, o) {
    o = o || {};
    var headH = o.headH || 38, rowH = o.rowH || 46;
    var widths = cols.map(function (c) { return c.w || (w / cols.length); });
    var h = headH + rows.length * rowH;
    f.rrect(x, y, w, h, 6, { fill: C.white, stroke: C.line, sw: 1.1, rough: 0.8 });
    var cx = x;
    cols.forEach(function (c, i) {
      f.text(cx + 14, y + 24, c.label, { size: 10.5, weight: 700, color: C.faint, ls: 1 });
      cx += widths[i];
    });
    f.line(x, y + headH, x + w, y + headH, { color: C.line, sw: 1.1 });
    rows.forEach(function (row, r) {
      var ry = y + headH + r * rowH;
      if (r) f.line(x, ry, x + w, ry, { color: C.line, sw: 1 });
      var cx2 = x;
      row.forEach(function (cell, i) {
        if (cell && typeof cell === 'object') {
          if (cell.badge) {
            UI.badge(f, cx2 + 14, ry + (rowH - 22) / 2, cell.badge.label, { variant: cell.badge.variant });
          } else if (cell.user) {
            f.av(cx2 + 22, ry + rowH / 2, 9, cell.user.initials);
            f.text(cx2 + 38, ry + rowH / 2 + 4.5, cell.user.name, { size: 11.5 });
          }
        } else {
          f.text(cx2 + 14, ry + rowH / 2 + 4.5, cell || '', { size: 11.5, color: C.ink2 });
        }
        cx2 += widths[i];
      });
    });
    return h;
  };

  UI.progress = function (f, x, y, w, value, o) {
    var h = (o && o.h) || 8;
    f.rrect(x, y, w, h, h / 2, { fill: C.fill, stroke: C.fill, rough: 0.4 });
    var bw = Math.max(1, Math.min(1, value) * w);
    f.rrect(x, y, bw, h, h / 2, { fill: C.ink, stroke: C.ink, rough: 0.4 });
    return h;
  };

  UI.skeleton = function (f, x, y, w, h) {
    h = h || 12;
    f.rrect(x, y, w, h, h / 2, { fill: C.fill, stroke: C.fill, rough: 0.4 });
    return h;
  };

  UI.separator = function (f, x, y, w) {
    f.line(x, y, x + w, y, { color: C.line, sw: 1 });
  };

  UI.tooltip = function (f, x, y, label) {
    var fs = 10.5, w = tw(label, fs) + 20, h = 26;
    f.rrect(x, y, w, h, 5, { fill: C.ink, stroke: C.ink, sw: 1, rough: 0.8 });
    f.text(x + w / 2, y + h / 2 + fs * 0.36, label, {
      size: fs, anchor: 'middle', color: C.white
    });
    f.line(x + w / 2 - 5, y + h, x + w / 2, y + h + 6, { color: C.ink, sw: 1.2 });
    f.line(x + w / 2 + 5, y + h, x + w / 2, y + h + 6, { color: C.ink, sw: 1.2 });
    return { w: w, h: h };
  };

  UI.accordion = function (f, x, y, w, items, open) {
    var rowH = 42, bodyH = 54, h = 0;
    items.forEach(function (it, i) { h += rowH + (i === open ? bodyH : 0); });
    f.rrect(x, y, w, h, 6, { fill: C.white, stroke: C.line, sw: 1.1, rough: 0.8 });
    var cy = y;
    items.forEach(function (it, i) {
      if (i) f.line(x, cy, x + w, cy, { color: C.line, sw: 1 });
      f.text(x + 16, cy + 26, it.title, { size: 12.5, weight: i === open ? 700 : 400 });
      f.chev(x + w - 18, cy + 21, i === open ? 'up' : 'down', 4.5);
      cy += rowH;
      if (i === open) {
        f.plines(x + 16, cy + 12, w - 32, 2, 16, { last: 0.7 });
        cy += bodyH;
      }
    });
    return h;
  };

  window.WF = {
    W: W, H: H, RAIL: RAIL, TOP: TOP, C: C, FONT: FONT,
    Frame: Frame, shell: shell, el: el, tw: tw, rrPath: rrPath,
    NAV: NAV, navIcon: navIcon, ui: UI,
    /* registry — pages register their own frames here; core.js creates it
       so any page can run standalone without a frames-*.js bootstrap. */
    frames: {}
  };
})();
