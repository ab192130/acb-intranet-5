# ACB Intranet — lo-fi vayr-freymlər

Dörd məhsulun (My Work OS, Projects, Xəritə, Knowledge, People) kağız-qələm səviyyəsində
eskizləri. Məqsəd dizaynı "göstərmək" deyil — **struktur və axın barədə qərar çıxarmaq**.

## Necə açmaq

`index.html` faylını brauzerdə aç (iki dəfə klik). Build yoxdur, server lazım deyil,
internet lazım deyil — rough.js və Kalam şrifti `vendor/` içində lokaldır.

PDF üçün: `Ctrl+P` → "Save as PDF" (hər ekran ayrı səhifədə).

## Fayl strukturu

```
wireframes/
  index.html      səhifə: örtük, prinsiplər, 10 ekran + annotasiya siyahıları
  core.js         DSL: hand-drawn primitivlər + qlobal shell (rail, top bar)
  frames-a.js     My Work OS  — Bugün, Günü balanslaşdır
  frames-b.js     Projects    — icmal, board, work item detalı
  frames-c.js     Xəritə + Knowledge — qraf, sənəd, data dictionary
  frames-d.js     People      — kataloq, profil
  _shot.html      tək ekranı PNG-ə çıxarmaq üçün köməkçi səhifə
  vendor/         rough.js + Kalam (latin / latin-ext woff2)
```

## Ekran əlavə etmək

1. `frames-*.js` içində `frames.yeni_ad = function (f) { ... }` yaz.
2. `index.html`-də `<svg class="frame" viewBox="0 0 1440 900" data-frame="yeni_ad"></svg>` qoy.
3. Altına `<ol class="notes">` ilə annotasiyaları yaz — nömrələr avtomatikdir.

Əsas primitivlər (`core.js`): `rect`, `rrect`, `circle`, `line`, `text`, `pline(s)`,
`card`, `chip`, `btn`, `input`, `av`, `avstack`, `check`, `arrow`, `anno`, `annoS`, `chev`.
Qlobal karkas: `WF.shell(f, { crumb, active })`.

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

## PNG çıxarma

```powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "file:///C:/.../wireframes/_shot.html?f=board"
& $chrome --headless=new --disable-gpu --hide-scrollbars `
  --window-size=1440,900 --user-data-dir="$env:TEMP\wf" `
  --screenshot="board.png" $url
```

`?f=` dəyərləri: `today`, `plan`, `project`, `board`, `workitem`, `map`, `doc`,
`datadict`, `people`, `person`.
