# ACB Intranet — lo-fi vayr-freymlər

Dörd məhsulun (My Work OS, Projects, Xəritə, Knowledge, People) kağız-qələm səviyyəsində
eskizləri. Məqsəd dizaynı "göstərmək" deyil — **struktur və axın barədə qərar çıxarmaq**.

## Necə açmaq

`docs/wireframes/index.html` faylını brauzerdə aç (iki dəfə klik). Oradan bölmələrə keç.
Build yoxdur, server lazım deyil, internet lazım deyil — rough.js və Kalam şrifti
`vendor/` içində lokaldır.

PDF üçün: bölmə səhifəsini aç → `Ctrl+P` → "Save as PDF" (hər ekran ayrı səhifədə).

## Fayl strukturu

```
docs/wireframes/
  index.html            giriş: örtük, dizayn prinsipləri, bölmələrin siyahısı
  01-my-work-os.html    Bugün · Günü balanslaşdır
  02-projects.html      Layihə icmalı · Board · Work item detalı
  03-map.html           Asılılıq xəritəsi
  04-knowledge.html     Resurs — use case · Data dictionary
  05-people.html        Kataloq · Şəxs profili
  deck.css              səhifə karkası: örtük, bölmə, annotasiya, solo rejim
  core.js               ortaq DSL: hand-drawn primitivlər + qlobal shell  ← reuse edilir
  README.md             bu fayl
  vendor/               rough.js + kalam.css + Kalam woff2 (latin / latin-ext)
```

Hər bölmə səhifəsi **özü tamdır**: ekran kodu həmin faylın içindədir, başqa səhifədən
asılı deyil. Ortaq olan yalnız üç şeydir — `core.js` (çəkmə DSL-i), `deck.css`
(səhifə görünüşü) və `vendor/` (şrift + rough.js).

## core.js-i başqa səhifədə işlətmək

```html
<link rel="stylesheet" href="vendor/kalam.css">
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

`core.js` qlobal `WF` obyekti verir: `WF.Frame`, `WF.shell`, `WF.C` (rənglər), `WF.W/H`,
`WF.frames` (ekran reyestri).

## Ekran əlavə etmək

1. Uyğun bölmə səhifəsindəki inline `<script>`-də `frames.yeni_ad = function (f) { ... }` yaz.
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

## People kataloqu — kart şəbəkəsi

Kataloq cədvəl deyil, kart axınıdır (Higgsfield-ın media-first feed patterni):
kartın üst qatında avatar, şöbə və sistem statusu; altında ad, rol, "nə üçün
yazmalı" və layihə komandası. Hover/fokusda kartın üzərində "Profil aç" və
sürətli əməliyyat çıxır. Axtarış, "Hamısı" + "Rəqəmsallaşdırma", rol və
sıralama tək sıradadır; bu səhifədə qlobal shell axtarışı gizlədilir ki, iki
axtarış sahəsi olmasın.

Cədvəl görünüşü qəsdən yoxdur: eyni məlumat kartda bir baxışda oxunur, sütun
başlığı tələb etmir və dar ekrana birbaşa düşür.

## Annotasiya konvensiyası

- `f.anno(n, x, y, tx, ty)` — böyük nömrə (r=11), istəyə bağlı dashed leader xətti ilə.
- `f.annoS(n, x, y)` — kiçik nömrə (r=8), başlıq/sətir yanında inline marker.
- Hər nömrə həmin səhifədəki `<ol class="notes">` siyahısında izah olunur.
  Ekranda izahsız nömrə qalmamalıdır.

## Tək ekranı PNG kimi çıxarmaq

`<səhifə>.html#<frame>` rejimi yalnız həmin ekranı 1440 × 900 full-bleed göstərir —
naviqasiya, başlıq və annotasiyalar gizlədilir:

```powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "file:///C:/.../docs/wireframes/02-projects.html#board"
& $chrome --headless=new --disable-gpu --hide-scrollbars `
  --window-size=1440,900 --user-data-dir="$env:TEMP\wf" `
  --screenshot="board.png" $url
```

| Səhifə | `#` dəyərləri |
|---|---|
| `01-my-work-os.html` | `today`, `plan` |
| `02-projects.html` | `project`, `board`, `workitem` |
| `03-map.html` | `map` |
| `04-knowledge.html` | `doc`, `datadict` |
| `05-people.html` | `people`, `person` |
