/* Sahə illüstrasiyaları — modules.html kartları və sahə səhifələrinin örtüyü.
   Frames ilə eyni rough.js DSL-i (core.js → WF.Frame) işlədilir ki, kartlar
   deck-in əl çəkməsi dilində danışsın. Hər illüstrasiyada bir accent var. */
(function () {
  'use strict';
  var WF = window.WF;
  if (!WF) return;
  var C = WF.C;

  function poly(f, pts, o) {
    o = o || {};
    f.add(f.rc.polygon(pts, {
      roughness: o.rough == null ? 1.05 : o.rough,
      bowing: 1,
      stroke: o.stroke || C.ink,
      strokeWidth: o.sw == null ? 1.4 : o.sw,
      fill: o.fill || 'none',
      fillStyle: 'solid'
    }));
  }

  var ART = {

    /* A. İş icrası — layihə ağacı → iş siyahısı */
    work: function (f) {
      f.rrect(24, 36, 150, 74, 8, { fill: C.fill, stroke: C.ink, sw: 1.5 });
      f.line(44, 62, 128, 62, { color: C.ink, sw: 2.4 });
      f.pline(44, 82, 104, { color: C.ink2 });
      f.pline(44, 96, 76, { color: C.faint });

      f.rrect(52, 126, 102, 40, 8, { fill: C.fill2, stroke: C.ink2, sw: 1.3 });
      f.line(68, 148, 122, 148, { color: C.ink2, sw: 1.8 });
      f.pline(68, 160, 70, { color: C.faint });
      f.line(99, 110, 99, 126, { color: C.line, sw: 1.3 });

      var rows = [46, 82, 118, 154];
      for (var i = 0; i < rows.length; i++) {
        var y = rows[i], on = i === 1;
        f.circle(222, y + 9, 15, on
          ? { stroke: C.accent, sw: 1.8 }
          : { stroke: C.ink2, sw: 1.2 });
        if (on) f.dot(222, y + 9, 3, C.accent);
        f.pline(244, y + 6, i === 0 ? 120 : 132 - i * 8, { color: on ? C.ink : C.ink2 });
        if (i < rows.length - 1) f.line(210, y + 27, 392, y + 27, { color: C.line, sw: 1 });
      }

      f.arrow(174, 91, 204, 91, { color: C.ink2, dash: [], sw: 1.3 });
    },

    /* B. İnsan və təşkilat — orq strukturu + profil kartı */
    people: function (f) {
      f.av(120, 44, 19, 'HR');
      f.circle(120, 44, 50, { stroke: C.accent, sw: 1.5, dash: [5, 5] });

      f.line(120, 69, 120, 94, { color: C.line, sw: 1.3 });
      f.line(58, 94, 182, 94, { color: C.line, sw: 1.3 });
      f.line(58, 94, 58, 126, { color: C.line, sw: 1.3 });
      f.line(120, 94, 120, 126, { color: C.line, sw: 1.3 });
      f.line(182, 94, 182, 126, { color: C.line, sw: 1.3 });

      f.av(58, 140, 14, 'AK');
      f.av(120, 140, 14, 'MN');
      f.av(182, 140, 14, 'SR');

      f.rrect(268, 48, 124, 108, 8, { fill: C.fill, stroke: C.ink, sw: 1.5 });
      f.av(292, 78, 13, 'KA');
      f.pline(292, 106, 78, { color: C.ink2 });
      f.pline(292, 120, 60, { color: C.faint });
      f.rrect(288, 128, 72, 18, 9, { fill: C.fill2, stroke: C.line, sw: 1.2 });
      f.line(300, 137, 348, 137, { color: C.faint, sw: 1.4 });

      f.arrow(200, 44, 262, 60, { color: C.faint, sw: 1.2 });
    },

    /* C. Bilik — sənəd + tipli istinadlar + data cədvəli */
    knowledge: function (f) {
      f.rrect(24, 28, 132, 144, 8, { fill: C.fill, stroke: C.ink, sw: 1.5 });
      f.line(44, 54, 132, 54, { color: C.ink, sw: 2.4 });
      f.pline(44, 78, 92, { color: C.ink2 });
      f.pline(44, 92, 84, { color: C.ink2 });
      f.pline(44, 106, 64, { color: C.faint });

      f.rrect(44, 126, 72, 22, 11, { fill: C.fill2, stroke: C.accent, sw: 1.5 });
      f.dot(57, 137, 2.5, C.accent);
      f.line(65, 137, 104, 137, { color: C.accent, sw: 1.4 });

      f.rrect(210, 40, 96, 26, 13, { fill: C.fill, stroke: C.ink2, sw: 1.3 });
      f.line(226, 53, 290, 53, { color: C.ink2, sw: 1.4 });
      f.rrect(210, 80, 78, 26, 13, { fill: C.fill, stroke: C.ink2, sw: 1.3 });
      f.line(226, 93, 270, 93, { color: C.faint, sw: 1.4 });

      f.arrow(160, 88, 202, 63, { color: C.faint, sw: 1.2 });

      f.rrect(196, 126, 160, 50, 6, { fill: C.fill, stroke: C.ink2, sw: 1.3 });
      f.line(196, 142, 356, 142, { color: C.line, sw: 1.2 });
      f.line(244, 126, 244, 176, { color: C.line, sw: 1.1 });
      f.line(300, 126, 300, 176, { color: C.line, sw: 1.1 });
      f.line(206, 134, 232, 134, { color: C.ink2, sw: 1.8 });
      f.dot(206, 158, 2, C.faint);
      f.dot(254, 158, 2, C.faint);
    },

    /* D. Buraxılış — mərhələlər, gate və milestone */
    delivery: function (f) {
      f.line(28, 100, 392, 100, { color: C.line, sw: 1.2 });

      [{ x: 28 }, { x: 132 }, { x: 300 }].forEach(function (b) {
        f.rrect(b.x, 76, 64, 48, 8, { fill: C.fill, stroke: C.ink, sw: 1.4 });
        f.line(b.x + 16, 96, b.x + 50, 96, { color: C.ink2, sw: 1.8 });
        f.pline(b.x + 16, 108, 28, { color: C.faint });
      });

      poly(f, [[248, 72], [276, 100], [248, 128], [220, 100]],
        { stroke: C.accent, sw: 1.8 });
      f.dot(248, 100, 3, C.accent);

      f.arrow(94, 100, 214, 100, { color: C.ink2, dash: [], sw: 1.4 });
      f.arrow(280, 100, 296, 100, { color: C.ink2, dash: [], sw: 1.4 });

      f.line(380, 100, 380, 52, { color: C.ink2, sw: 1.4 });
      poly(f, [[380, 52], [404, 61], [380, 70]],
        { fill: C.fill2, stroke: C.ink2, sw: 1.3, rough: 0.9 });
    },

    /* E. Platform — axın qrafı + səlahiyyət lensi */
    platform: function (f) {
      f.circle(164, 62, 84, { stroke: C.ink2, sw: 1.2, dash: [5, 5] });
      f.line(164, 14, 164, 20, { color: C.ink2, sw: 1.2 });
      f.line(114, 62, 122, 62, { color: C.ink2, sw: 1.2 });
      f.line(206, 62, 214, 62, { color: C.ink2, sw: 1.2 });

      f.rrect(24, 44, 82, 44, 8, { fill: C.fill, stroke: C.ink, sw: 1.4 });
      f.pline(40, 64, 50, { color: C.ink2 });
      f.pline(40, 78, 34, { color: C.faint });

      f.rrect(262, 40, 100, 44, 8, { fill: C.fill, stroke: C.ink, sw: 1.4 });
      f.pline(278, 60, 66, { color: C.ink2 });
      f.pline(278, 74, 44, { color: C.faint });

      f.rrect(128, 132, 96, 44, 8, { fill: C.fill, stroke: C.ink, sw: 1.4 });
      f.pline(144, 152, 62, { color: C.ink2 });
      f.pline(144, 166, 40, { color: C.faint });

      f.line(106, 66, 142, 63, { color: C.ink2, sw: 1.3 });
      f.line(184, 62, 258, 62, { color: C.ink2, sw: 1.3 });
      f.arrow(66, 88, 140, 132, { color: C.ink2, dash: [], sw: 1.3 });
      f.arrow(164, 84, 172, 128, { color: C.ink2, sw: 1.2 });

      f.circle(164, 62, 40, { stroke: C.accent, sw: 1.8 });
      f.dot(164, 62, 3, C.accent);
    }
  };

  function draw(svg) {
    var key = svg.getAttribute('data-art');
    if (!ART[key] || svg.getAttribute('data-drawn') === '1') return;
    svg.setAttribute('data-drawn', '1');
    ART[key](new WF.Frame(svg));
  }

  function boot() {
    var nodes = document.querySelectorAll('svg[data-art]');
    for (var i = 0; i < nodes.length; i++) draw(nodes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
