/* frames-c.js : Xəritə + Knowledge (sənəd, data dictionary) */
(function () {
  'use strict';
  var WF = window.WF, C = WF.C;
  var frames = WF.frames;

  function knowledgeSidebar(f) {
    f.line(324, WF.TOP, 324, WF.H, { color: C.line, sw: 1.2 });
    f.text(100, 108, 'Bilik bazası', { size: 15, weight: 700 });
    f.rrect(288, 92, 24, 24, 5, { fill: C.fill, stroke: C.line, rough: 0.7 });
    f.text(300, 110, '+', { size: 15, anchor: 'middle' });
    f.rrect(88, 214, 224, 30, 5, { fill: C.fill2, stroke: 'none', rough: 0.6 });

    f.chev(96, 160, 'down', 5);
    f.text(108, 165, 'Use case-lər', { size: 13, weight: 700 });
    f.text(136, 199, 'UC-01 Ödəniş axını', { size: 12.5, color: C.ink2 });
    f.text(136, 233, 'UC-04 Refund axını', { size: 12.5, weight: 700 });

    f.chev(96, 268, 'down', 5);
    f.text(108, 273, 'Data dictionary', { size: 13, weight: 700 });
    f.text(136, 307, 'payment_tx', { size: 12.5, color: C.ink2 });
    f.text(136, 341, 'refund', { size: 12.5, color: C.ink2 });

    f.chev(96, 376, 'right', 5);
    f.text(108, 381, 'Sənədlər (6)', { size: 13, weight: 700 });
    f.chev(96, 414, 'right', 5);
    f.text(108, 419, 'Arxiv (12)', { size: 12.5, color: C.faint });

    f.rrect(100, 700, 200, 36, 5, { fill: 'none', stroke: C.line, dash: [5, 4], rough: 0.8 });
    f.text(200, 723, '+ Yeni resurs', { size: 12.5, anchor: 'middle', color: C.ink2 });
  }

  /* ============================== 6. XƏRİTƏ ============================== */
  frames.map = function (f) {
    WF.shell(f, { crumb: 'Xəritə', active: 4 });

    f.text(100, 122, 'Xəritə', { size: 26, weight: 700 });
    f.text(100, 148, 'Ödəniş gateway · 8 node · dərinlik 2', { size: 12.5, color: C.ink2 });

    f.chip(430, 100, 'Layihə', { h: 28, w: 74, size: 12 });
    f.chip(512, 100, 'Work item', { h: 28, w: 96, size: 12 });
    f.chip(616, 100, 'Resurs', { h: 28, w: 74, size: 12, active: true });
    f.chip(1044, 100, 'Dərinlik: 2 ▾', { h: 28, w: 116, size: 12 });
    f.chip(1168, 100, 'Yalnız asılılıqlar', { h: 28, w: 158, size: 12 });

    f.rrect(100, 176, 1010, 660, 6, { fill: C.white, stroke: C.line });

    function node(cx, cy, w, h, label, tag, o) {
      o = o || {};
      f.rrect(cx - w / 2, cy - h / 2, w, h, 6, {
        fill: o.fill || C.fill, stroke: o.stroke || C.ink2, sw: o.sw || 1.4, rough: 0.9
      });
      f.text(cx, cy + 5, label, { size: o.size || 12.5, anchor: 'middle', weight: 700 });
      if (tag) f.text(cx - w / 2 + 8, cy - h / 2 + 14, tag, { size: 9, color: C.faint });
    }

    /* hierarchy (solid) */
    f.line(500, 398, 500, 280, { color: C.ink2, sw: 1.4 });
    f.line(440, 414, 352, 320, { color: C.ink2, sw: 1.4 });
    f.line(605, 428, 690, 420, { color: C.ink2, sw: 1.4 });
    /* dependencies (dashed) */
    f.arrow(430, 452, 380, 534, { dash: [6, 5] });
    f.arrow(405, 572, 480, 608, { dash: [6, 5] });
    f.arrow(760, 446, 722, 674, { dash: [6, 5] });
    f.arrow(818, 438, 884, 476, { dash: [6, 5] });
    /* the cycle */
    f.arrow(886, 494, 828, 456, { dash: [6, 5], color: C.accent });

    node(500, 430, 210, 64, 'Ödəniş gateway', 'LAYİHƏ', { fill: C.fill2, size: 13.5 });
    node(500, 250, 190, 56, '3DS inteqrasiyası', 'ALT LAYİHƏ');
    node(270, 300, 160, 56, 'Risk modeli', 'ALT LAYİHƏ');
    node(760, 420, 140, 48, 'ACB-142', 'WORK ITEM', { stroke: C.ink, sw: 2.1 });
    node(930, 500, 140, 48, 'ACB-151', 'WORK ITEM');
    node(330, 560, 150, 48, 'UC-04 Refund', 'RESURS');
    node(560, 620, 160, 48, 'DD payment_tx', 'RESURS');
    node(700, 700, 140, 48, 'ACB-160', 'WORK ITEM');

    f.text(872, 430, 'dövr', { size: 10.5, color: C.accent, weight: 700 });

    /* legend */
    f.rrect(120, 742, 360, 74, 5, { fill: C.white, stroke: C.line, rough: 0.7 });
    f.annoS(1, 142, 762);
    f.line(164, 762, 206, 762, { color: C.ink2, sw: 1.4 });
    f.text(216, 766, 'iyerarxiya (parent/child)', { size: 10.5, color: C.ink2 });
    f.annoS(2, 142, 784);
    f.line(164, 784, 206, 784, { color: C.ink2, sw: 1.4, dash: [6, 5] });
    f.text(216, 788, 'asılılıq (blocks / relates)', { size: 10.5, color: C.ink2 });
    f.annoS(3, 142, 806);
    f.line(164, 806, 206, 806, { color: C.accent, sw: 1.4, dash: [6, 5] });
    f.text(216, 810, 'dövr — xəbərdarlıq', { size: 10.5, color: C.accent });

    /* zoom */
    f.text(1076, 812, '−   100%   +', { size: 12, color: C.ink2, anchor: 'end' });

    /* inspector */
    f.rrect(1130, 176, 210, 660, 6, { fill: C.white });
    f.text(1150, 206, 'Seçilmiş node', { size: 11, color: C.faint });
    f.text(1150, 236, 'ACB-142', { size: 17, weight: 700 });
    f.chip(1150, 248, 'Work item', { h: 22, w: 84, size: 10.5 });
    f.chip(1242, 248, 'İcrada', { h: 22, w: 62, size: 10.5 });
    f.line(1150, 286, 1320, 286, { color: C.line, dash: [4, 5], sw: 1 });
    f.text(1150, 310, 'Bağlı node-lar (4)', { size: 11.5, weight: 700 });
    [['↑ parent', 'Ödəniş gateway'], ['→ bloklayır', 'ACB-151'], ['← bloklanır', 'ACB-108'],
     ['⌐ istinad', 'UC-04 Refund']].forEach(function (r, k) {
      var ry = 338 + k * 44;
      f.text(1150, ry, r[0], { size: 9.5, color: C.faint });
      f.text(1150, ry + 16, r[1], { size: 12 });
    });
    f.btn(1150, 526, 170, 'Kontekstdə aç', { h: 34, size: 12 });
    f.btn(1150, 568, 170, 'Fokusla', { h: 34, size: 12, kind: 'ghost' });
    f.line(1150, 620, 1320, 620, { color: C.line, dash: [4, 5], sw: 1 });
    f.text(1150, 646, 'Qeyd', { size: 11.5, weight: 700 });
    f.plines(1150, 664, 170, 3, 18, { sw: 1.3 });

    f.anno(4, 1030, 114, 1054, 114);
  };

  /* ======================= 7. RESURS — SƏNƏD ======================= */
  frames.doc = function (f) {
    WF.shell(f, { crumb: 'Bilik', active: 2 });
    knowledgeSidebar(f);

    f.text(348, 92, 'Bilik / Use case-lər / UC-04', { size: 12, color: C.faint });
    f.text(348, 132, 'UC-04 · Refund axını', { size: 24, weight: 700 });
    f.av(358, 162, 10, 'SƏ');
    f.text(374, 167, 'S. Əliyeva · sahib', { size: 12, color: C.ink2 });
    f.chip(556, 148, 'Use case', { h: 24, w: 78, size: 11 });
    f.chip(642, 148, 'v7', { h: 24, w: 40, size: 11 });
    f.text(700, 167, '3 gün əvvəl yenilənib', { size: 11.5, color: C.faint });

    /* body */
    f.text(348, 208, 'Aktorlar', { size: 14, weight: 700 });
    f.text(348, 232, 'Müştəri, dəstək əməkdaşı, ödəniş servisi', { size: 12.5, color: C.ink2 });

    f.text(348, 276, 'İlkin şərtlər', { size: 14, weight: 700 });
    f.plines(348, 300, 620, 2, 22);

    f.text(348, 360, 'Əsas axın', { size: 14, weight: 700 });
    [0, 1, 2, 3].forEach(function (i) {
      var ny = 392 + i * 30;
      f.text(348, ny, String(i + 1) + '.', { size: 12, color: C.faint });
      f.pline(372, ny - 4, 560 - i * 24);
    });

    f.text(348, 528, 'Alternativ axın', { size: 14, weight: 700 });
    f.plines(348, 552, 620, 2, 22);

    f.text(348, 612, 'Əlaqəli data', { size: 14, weight: 700 });
    f.chip(348, 626, 'payment_tx', { h: 26, w: 100, size: 11.5 });
    f.chip(458, 626, 'refund', { h: 26, w: 74, size: 11.5 });

    f.text(348, 700, 'Şərhlər (3)', { size: 13, weight: 700 });
    f.plines(348, 722, 620, 2, 22, { sw: 1.3 });

    /* right column */
    f.rrect(1052, 182, 288, 300, 6, { fill: C.white });
    f.text(1074, 212, 'Əlaqəli resurslar', { size: 14, weight: 700 });
    [['istinad edir', 'DD · payment_tx'], ['asılıdır', 'ACB-142'],
     ['valideyn', 'UC-01 Ödəniş axını'], ['istifadə edir', 'Risk modeli']].forEach(function (r, k) {
      var ry = 244 + k * 58;
      f.text(1074, ry, r[0], { size: 9.5, color: C.faint });
      f.text(1074, ry + 18, r[1], { size: 12.5 });
      if (k < 3) f.line(1074, ry + 32, 1318, ry + 32, { color: C.line, dash: [4, 5], sw: 1 });
    });

    f.rrect(1052, 498, 288, 244, 6, { fill: C.white });
    f.text(1074, 528, 'Versiyalar', { size: 14, weight: 700 });
    [['v7', '3 gün əvvəl', 'SƏ'], ['v6', '2 həftə əvvəl', 'RQ'], ['v5', '1 ay əvvəl', 'SƏ']].forEach(function (v, k) {
      var vy = 560 + k * 46;
      f.chip(1074, vy - 15, v[0], { h: 22, w: 34, size: 10.5 });
      f.text(1120, vy, v[1], { size: 11.5 });
      f.text(1318, vy, v[2], { size: 10.5, color: C.faint, anchor: 'end' });
    });
    f.btn(1074, 700, 244, 'Müqayisə et', { h: 30, size: 11.5, kind: 'ghost' });

    f.annoS(1, 522, 88);
    f.annoS(2, 1040, 208);
    f.annoS(3, 1040, 520);
  };

  /* ====================== 8. DATA DICTIONARY ====================== */
  frames.datadict = function (f) {
    WF.shell(f, { crumb: 'Bilik', active: 2 });
    knowledgeSidebar(f);

    f.text(348, 92, 'Bilik / Data dictionary / payment_tx', { size: 12, color: C.faint });
    f.text(348, 132, 'payment_tx', { size: 24, weight: 700 });
    f.chip(510, 114, 'Data dictionary', { h: 24, w: 118, size: 11 });
    f.chip(638, 114, 'v3', { h: 24, w: 40, size: 11 });
    f.btn(1146, 108, 194, 'Sahə əlavə et', { kind: 'primary', h: 38 });

    f.input(348, 164, 300, 'Sahə axtar…', { h: 34 });
    f.chip(664, 168, '6 sahə', { h: 26, w: 66, size: 11.5 });
    f.text(746, 186, 'Son dəyişiklik: 5 gün əvvəl', { size: 11.5, color: C.faint });

    f.rrect(348, 214, 752, 448, 6, { fill: C.white });
    var cols = [['Sahə', 372], ['Tip', 560], ['Məcburi', 690], ['Mənbə', 792], ['Təsvir', 944]];
    cols.forEach(function (c) {
      f.text(c[1], 246, c[0], { size: 11, color: C.faint, weight: 700 });
    });
    f.line(368, 258, 1080, 258, { color: C.ink2, sw: 1.4 });

    var rows = [
      ['tx_id', 'uuid', '✓', 'POS', 'Unikal əməliyyat identifikatoru'],
      ['amount', 'numeric', '✓', 'POS', 'Məbləğ, minor units (qəpik)'],
      ['currency', 'char(3)', '✓', 'POS', 'ISO 4217 valyuta kodu'],
      ['status', 'enum', '✓', 'Gateway', 'created / captured / refunded'],
      ['created_at', 'timestamp', '✓', 'Gateway', 'Yaradılma anı (UTC)'],
      ['idempotency_key', 'text', '—', 'Client', 'Təkrar sorğuların bloklanması']
    ];
    rows.forEach(function (r, k) {
      var ry = 288 + k * 64;
      if (k) f.line(368, ry - 22, 1080, ry - 22, { color: C.line, dash: [4, 6], sw: 1 });
      f.text(372, ry, r[0], { size: 12.5, weight: 700 });
      f.text(560, ry, r[1], { size: 12, color: C.ink2 });
      f.text(690, ry, r[2], { size: 12, color: r[2] === '✓' ? C.ink : C.faint });
      f.text(792, ry, r[3], { size: 12, color: C.ink2 });
      f.text(944, ry, r[4], { size: 12, color: C.ink2 });
    });

    f.text(368, 700, '+ Sətir əlavə et', { size: 12, color: C.faint });

    /* right panel */
    f.rrect(1128, 214, 212, 448, 6, { fill: C.white });
    f.text(1148, 244, 'Bu sahəni istifadə edir', { size: 11.5, weight: 700 });
    f.text(1148, 264, 'tx_id', { size: 11, color: C.faint });
    [['UC-04', 'Refund axını'], ['ACB-142', '3DS redirect'], ['API kontraktı', 'v2']].forEach(function (r, k) {
      var ry = 296 + k * 50;
      f.text(1148, ry, r[0], { size: 12, weight: 700 });
      f.text(1148, ry + 16, r[1], { size: 10.5, color: C.faint });
    });
    f.line(1148, 452, 1320, 452, { color: C.line, dash: [4, 5], sw: 1 });
    f.text(1148, 478, 'Dəyişikliklər', { size: 11.5, weight: 700 });
    [['v3', 'currency əlavə edildi'], ['v2', 'idempotency_key']].forEach(function (r, k) {
      var ry = 506 + k * 46;
      f.chip(1148, ry - 14, r[0], { h: 20, w: 32, size: 10 });
      f.text(1190, ry, r[1], { size: 10.5, color: C.ink2 });
    });
    f.text(1148, 640, 'Sahə səviyyəsində', { size: 10.5, color: C.faint });

    f.annoS(1, 1004, 242);
    f.annoS(2, 1116, 244);
  };
})();
