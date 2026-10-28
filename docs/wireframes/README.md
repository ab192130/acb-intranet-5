# ACB Intranet — lo-fi vayr-freymlər

Dörd məhsulun (My Work OS, Projects, Xəritə, Knowledge, People) kağız-qələm səviyyəsində
eskizləri. Məqsəd dizaynı "göstərmək" deyil — **struktur və axın barədə qərar çıxarmaq**.

## Necə açmaq

`docs/wireframes/index.html` faylını brauzerdə aç (iki dəfə klik). Build yoxdur, server
lazım deyil, internet lazım deyil — rough.js və Kalam şrifti `vendor/` içində lokaldır.

PDF üçün: `Ctrl+P` → "Save as PDF" (hər ekran ayrı səhifədə).

## Fayl strukturu

```
docs/wireframes/
  index.html    səhifə + 10 ekranın kodu (inline <script>) + annotasiyalar
  core.js       ortaq DSL: hand-drawn primitivlər + qlobal shell  ← reuse edilir
  README.md     bu fayl
  vendor/       rough.js + kalam.css + Kalam woff2 (latin / latin-ext)
```

`index.html` tək fayldır: ekranların kodu içindədir, ona görə birbaşa paylaşıla bilər.
`core.js` isə **ayrı qalır** — yeni prototip səhifələri eyni vizual dili ondan götürür.

## core.js-i başqa səhifədə işlətmək

```html
<link rel="stylesheet" href="vendor/kalam.css">   <!-- və ya öz @font-face-lərin -->
<script src="vendor/rough.js"></script>
<script src="core.js"></script>
<svg viewBox="0 0 1440 900" width="1440" height="900" id="s"></svg>
<script>
  var f = new WF.Frame(document.getElementById('s'));
  WF.shell(f, { crumb: 'Yeni ekran', active: 1 });
  f.card(348, 120, 600, 240, 'Başlıq', 'Redaktə');
  f.plines(368, 170, 560, 3, 24);
</script>
```

`core.js` qlobal `WF` obyekti verir: `WF.Frame`, `WF.shell`, `WF.C` (rənglər), `WF.W/H`.

## Ekran əlavə etmək

1. `index.html` içindəki inline `<script>`-də `frames.yeni_ad = function (f) { ... }` yaz.
2. Gövdədə `<svg class="frame" viewBox="0 0 1440 900" data-frame="yeni_ad"></svg>` qoy.
3. Altına `<ol class="notes">` ilə annotasiyaları yaz — nömrələr avtomatikdir.

Əsas primitivlər: `rect`, `rrect`, `circle`, `line`, `text`, `pline(s)`, `card`, `chip`,
`btn`, `input`, `av`, `avstack`, `check`, `arrow`, `anno`, `annoS`, `chev`.

## Vizual dil

| Element | Dəyər |
|---|---|
| Kanvas | 1440 × 900 |
| Kağız | `#fbfaf5` |
| Mürəkkəb | `#33302b` (ikinci `#6d675d`, solğun `#a9a294`) |
| Doldurma | `#efece2` / `#e2ded1` |
| Vurğu | `#a4512f` — yalnız primary hərəkət və annotasiya |
| Şrift | Kalam 400 / 700 |
| Ölçülər | 10.5 / 12.5 / 15 / 24 / 30 |
| Radius | 5–6 px (çip və düymələr 16–22) |

Rəng, ikon dəsti, animasiya və real data **qəsdən yoxdur** — lo-fi mərhələsində
bunlar müzakirəni yayındırır.

## Annotasiya konvensiyası

- `f.anno(n, x, y, tx, ty)` — böyük nömrə (r=11), istəyə bağlı dashed leader xətti ilə.
- `f.annoS(n, x, y)` — kiçik nömrə (r=8), başlıq/sətir yanında inline marker.
- Hər nömrə `index.html`-dəki `<ol class="notes">` siyahısında izah olunur.
  Ekranda izahsız nömrə qalmamalıdır.

## Tək ekranı PNG kimi çıxarmaq

`index.html#<frame>` rejimi yalnız həmin ekranı 1440 × 900 full-bleed göstərir:

```powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "file:///C:/.../docs/wireframes/index.html#board"
& $chrome --headless=new --disable-gpu --hide-scrollbars `
  --window-size=1440,900 --user-data-dir="$env:TEMP\wf" `
  --screenshot="board.png" $url
```

`#` dəyərləri: `today`, `plan`, `project`, `board`, `workitem`, `map`, `doc`,
`datadict`, `people`, `person`.
