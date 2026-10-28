/* frames-d.js : People — kataloq + profil */
(function () {
  'use strict';
  var WF = window.WF, C = WF.C;
  var frames = WF.frames;

  /* =========================== 9. KATALOQ =========================== */
  frames.people = function (f) {
    WF.shell(f, { crumb: 'İnsanlar', active: 3 });

    f.text(100, 120, 'İnsanlar', { size: 28, weight: 700 });
    f.chip(238, 98, '68', { h: 24, w: 42, size: 11.5 });

    f.input(620, 96, 360, 'Ad, vəzifə, bacarıq axtar…', { h: 36 });
    f.chip(1040, 100, 'Şöbə ▾', { h: 28, w: 88, size: 12 });
    f.chip(1136, 100, 'Rol ▾', { h: 28, w: 74, size: 12 });
    f.chip(1218, 100, 'Sistemdə aktiv', { h: 28, w: 122, size: 12 });

    /* two-tier scope: whole company vs department */
    f.rrect(100, 148, 280, 32, 16, { fill: C.fill, stroke: C.line, rough: 0.7 });
    f.rrect(100, 148, 140, 32, 16, { fill: C.ink, stroke: C.ink, rough: 0.7 });
    f.text(170, 169, 'Şirkət 68', { size: 12, anchor: 'middle', color: C.white, weight: 700 });
    f.text(310, 169, 'Departament 20', { size: 12, anchor: 'middle', color: C.ink2 });

    /* table */
    f.rrect(100, 206, 1240, 504, 6, { fill: C.white });
    var cols = [['Ad', 130], ['Vəzifə', 400], ['Şöbə', 620], ['Nə üçün yazmalı', 820], ['Layihə', 1096], ['Son aktiv', 1246]];
    cols.forEach(function (c) { f.text(c[1], 240, c[0], { size: 11, color: C.faint, weight: 700 }); });
    f.line(120, 252, 1320, 252, { color: C.ink2, sw: 1.4 });

    var rows = [
      ['BA', 'Burhan Ağazadə', 'burhan@acb.az', 'Product Engineer', 'Departament', 'Sistem sahibi, prioritetlər', '6', 'bu gün'],
      ['SƏ', 'Sevil Əliyeva', 'sevil@acb.az', 'Project Lead', 'Ödəniş', 'Layihə statusu, bloklar', '3', '2 saat'],
      ['AM', 'Anar Məmmədov', 'anar@acb.az', 'Departament rəhbəri', 'Departament', 'Təsdiq, büdcə, eskalasiya', '—', 'bu gün'],
      ['NH', 'Nigar Həsənli', 'nigar@acb.az', 'QA Engineer', 'Ödəniş', 'Test, bug triaj', '2', 'dünən'],
      ['RQ', 'Rəşad Quliyev', 'rashad@acb.az', 'Business Analyst', 'Data', 'Tələblər, use case', '2', 'dünən'],
      ['EC', 'Elvin Cəfərov', 'elvin@acb.az', 'Backend Developer', 'Ödəniş', '3DS, gateway inteqrasiyası', '3', '3 gün'],
      ['LN', 'Leyla Nəsirova', 'leyla@acb.az', 'Product Designer', 'Məhsul', 'UX, prototip, dizayn sistemi', '1', '5 gün'],
      ['Tİ', 'Tural İsmayılov', 'tural@acb.az', 'DevOps', 'İnfra', 'Deploy, mühit, monitorinq', '1', '1 həftə']
    ];
    rows.forEach(function (r, k) {
      var ty = 252 + k * 56;
      f.av(148, ty + 28, 14, r[0]);
      f.text(172, ty + 23, r[1], { size: 13 });
      f.text(172, ty + 40, r[2], { size: 10, color: C.faint });
      f.text(400, ty + 32, r[3], { size: 12, color: C.ink2 });
      f.text(620, ty + 32, r[4], { size: 12, color: C.ink2 });
      f.text(820, ty + 32, r[5], { size: 12 });
      f.text(1096, ty + 32, r[6], { size: 12, color: C.ink2 });
      f.text(1246, ty + 32, r[7], { size: 11.5, color: C.faint });
      if (k < 7) f.line(120, ty + 56, 1320, ty + 56, { color: C.line, dash: [4, 6], sw: 1 });
    });

    f.text(100, 744, '68 nəfər · 20 sistem istifadəçisi · kataloqu 2 nəfər saxlayır', { size: 11.5, color: C.faint });
    f.text(1320, 744, '1  2  3  ›', { size: 12, color: C.ink2, anchor: 'end' });

    f.annoS(1, 392, 164);
    f.annoS(2, 928, 234);
    f.annoS(3, 1312, 234);
  };

  /* ============================ 10. PROFİL ============================ */
  frames.person = function (f) {
    WF.shell(f, { crumb: 'İnsanlar / B. Ağazadə', active: 3 });

    f.text(100, 94, '← İnsanlar', { size: 12, color: C.ink2 });
    f.av(150, 168, 38, 'BA');
    f.text(208, 158, 'Burhan Ağazadə', { size: 26, weight: 700 });
    f.text(208, 184, 'Product Engineer · Departament', { size: 13.5, color: C.ink2 });
    f.chip(208, 196, 'Sistemdə aktiv', { h: 26, w: 122, size: 11.5 });
    f.chip(340, 196, '6 layihə', { h: 26, w: 82, size: 11.5 });

    f.text(1152, 150, 'Profil son yoxlanıldı: 12 okt', { size: 11, color: C.faint, anchor: 'end' });
    f.btn(1236, 166, 104, 'Redaktə et', { h: 32, size: 11.5, kind: 'ghost' });

    /* left column */
    f.card(100, 240, 520, 150, 'Nə ilə məşğuldur');
    f.plines(120, 286, 480, 3, 24);

    f.card(100, 406, 520, 150, 'Nə üçün müraciət etməli');
    f.chip(120, 444, '3DS / ödəniş axını', { h: 26, w: 150, size: 11 });
    f.chip(280, 444, 'Sistem prioritetləri', { h: 26, w: 158, size: 11 });
    f.chip(120, 480, 'Data modeli', { h: 26, w: 104, size: 11 });
    f.text(120, 532, 'Bu sahələrdə qərar verən şəxs.', { size: 11, color: C.faint });

    f.card(100, 572, 520, 130, 'Bacarıqlar');
    f.chip(120, 606, 'Product', { h: 26, w: 82, size: 11 });
    f.chip(210, 606, 'Systems design', { h: 26, w: 124, size: 11 });
    f.chip(342, 606, 'Payment domain', { h: 26, w: 134, size: 11 });
    f.chip(120, 642, 'SQL', { h: 26, w: 56, size: 11 });
    f.chip(184, 642, 'Figma', { h: 26, w: 66, size: 11 });

    /* right column */
    f.card(640, 240, 700, 210, 'Layihələr (3)', 'Hamısı');
    [['Ödəniş gateway', 'Lead', ['SƏ', 'BA', 'NH']],
     ['3DS inteqrasiyası', 'Contributor', ['BA', 'EC']],
     ['Data platform', 'Contributor', ['RQ', 'Tİ']]].forEach(function (p, k) {
      var py = 306 + k * 54;
      f.text(660, py, p[0], { size: 13 });
      f.chip(880, py - 15, p[1], { h: 22, w: p[1] === 'Lead' ? 52 : 84, size: 10 });
      f.avstack(1180, py - 6, p[2], 9);
      if (k < 2) f.line(660, py + 24, 1320, py + 24, { color: C.line, dash: [4, 6], sw: 1 });
    });

    f.card(640, 466, 700, 210, 'Açıq işlər (4)', 'Hamısı');
    [['ACB-142', '3DS redirect döngüsü', 'İcrada', '30 okt'],
     ['ACB-160', 'Refund API kontraktı', 'Todo', '2 noy'],
     ['ACB-155', 'Webhook imzası', 'Review', '4 noy']].forEach(function (w, k) {
      var wy = 532 + k * 54;
      f.text(660, wy, w[0], { size: 11, color: C.faint });
      f.text(730, wy, w[1], { size: 12.5 });
      f.chip(1060, wy - 15, w[2], { h: 22, w: 62, size: 10 });
      f.text(1320, wy, w[3], { size: 11, color: C.faint, anchor: 'end' });
      if (k < 2) f.line(660, wy + 24, 1320, wy + 24, { color: C.line, dash: [4, 6], sw: 1 });
    });

    f.text(640, 720, 'Hesabı olmayan 48 nəfər də kataloqdadır — Person ≠ User.', { size: 11, color: C.faint });

    f.annoS(1, 436, 208);
    f.annoS(2, 1012, 150);
    f.annoS(3, 782, 268);
  };
})();
