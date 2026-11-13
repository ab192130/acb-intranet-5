# ACB Intranet — lo-fi vayr-freymlər

Səkkiz bölmənin (Onboarding, My Work OS, Projects, Xəritə, Knowledge, People, Axınlar,
Buraxılış) kağız-qələm səviyyəsində eskizləri. Məqsəd dizaynı "göstərmək" deyil — **struktur və axın
barədə qərar çıxarmaq**.

## Necə açmaq

`docs/wireframes/index.html` faylını brauzerdə aç (iki dəfə klik) → **Modullar** kartı →
bölmənin kartı. Bölmə səhifələrində yuxarıdakı `← Modullar` həmişə siyahıya qaytarır.
Build yoxdur, server lazım deyil, internet lazım deyil — rough.js və Kalam şrifti
`vendor/` içində lokaldır.

PDF üçün: bölmə səhifəsini aç → `Ctrl+P` → "Save as PDF" (hər ekran ayrı səhifədə).

## Fayl strukturu

```
docs/wireframes/
  index.html            giriş: başlıq + Modullar və Komponent kiti kartları
  modules.html          bölmələrin kart siyahısı (ekran sayı və alt-ekranlar ilə)
  components.html       shadcn anatomiyalı wireframe komponent kiti
  00-onboarding.html    Xoş gəldin · Tanışlıq · Komanda · Ofis · Qaydalar · Dəstək
  01-my-work-os.html    Bugün · Günü balanslaşdır
  02-projects.html      Layihə icmalı · Resources · Works
  03-map.html           Asılılıq xəritəsi
  04-knowledge.html     Resurs — sənəd · use case · data dictionary
  05-people.html        Kataloq · Şəxs profili
  06-flows.html         Axın canvası · səlahiyyət lensi
  07-delivery.html      Tələb · paket · buraxılış lövhəsi
  deck.css              səhifə karkası: örtük, bölmə, annotasiya, solo rejim
  core.js               ortaq DSL: hand-drawn primitivlər + WF.ui + qlobal shell
  README.md             bu fayl
  vendor/               rough.js + kalam.css + Kalam woff2 (ə/Ə patçı ilə)
```

## Use case-lər

Layihə ssenariləri ayrı qovluqda saxlanılır:
[`docs/use-cases`](../use-cases/README.md) →
[Layihə Overview ssenariləri](../use-cases/project-overview.md) ·
[Onboarding axını](../use-cases/onboarding.md).

Hər bölmə səhifəsi **özü tamdır**: ekran kodu həmin faylın içindədir, başqa səhifədən
asılı deyil. Ortaq olan yalnız üç şeydir — `core.js` (çəkmə DSL-i), `deck.css`
(səhifə görünüşü) və `vendor/` (şrift + rough.js).

## Modullar səhifəsi — kart naviqasiyası

`modules.html` bölmələri cədvəl siyahısı kimi deyil, tam kliklənən kartlar kimi göstərir:
üstdə bölmə nömrəsi və ekran sayı, ortada ad və bir cümləlik təyinat, altda ekran adları.
Hover/fokusda üst accent zolağı açılır, kart bir az qalxır və “Ekranlara bax” oxu sağa
sürüşür. Klaviatura ilə `Tab` → `Enter` işləyir; `prefers-reduced-motion` zamanı hərəkət
söndürülür. Stil `deck.css`-dəki `.modcard` dilindədir — əlavə kitabxana yoxdur.

## Üslub — tünd studiya karkası

İki qat var və onlar qəsdən ayrı saxlanılır:

- **Karkas** (`deck.css`): demək olar qara fon (`#08080a`), hairline xətlər (`#24242c`),
  tək lime vurğu (`#c9ff3d`), mono mikro-label-lar, yumşaq radial işıqlar və incə film
  grain-i. Naviqasiya yapışqan (sticky), kartlar hover-də qalxır və lime halqa alır.
  Şrift Kalam-dır — eskiz səsi qorunur, "studiya" hissi yalnız səthdən və tipografiyadan gəlir.
- **Ekranlar** (`core.js` → `C.*`): eyni əl çəkməsi (rough.js), amma tərsinə çevrilmiş
  palitra — kağız yerinə `#121218`, mürəkkəb yerinə `#e8e8e3`. `C.white` "səth" tokeni
  olaraq qalır, `C.ink` ilə cüt-cüt tərsinə düşür, ona görə bütün fg/bg cütləri işləyir.
  Danger (`#ff6b5e`) yalnız destructive variantlarda var; lime hər yerdə "diqqət" deməkdir.

**Kalam AZ patçı:** Kalam-da `ə`/`Ə` (U+0259, U+018F) yoxdur — mətn sistem şriftinə
düşürdü. Dörd woff2 faylında `e`/`E` qlifi 180° çevrilərək həmin kod nöqtələrinə əlavə
olunub; mövcud qliflər, advancelər və fayl adları dəyişməyib, `kalam.css` də olduğu kimidir.

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

`WF.shell` opsiyaları: `header: false` → top bar çəkilmir, sol rail-də `⌘K` axtarış
triggeri görünür; `search: false` yalnız top bar axtarışını gizlədir.

## Komponent qatı (WF.ui)

`core.js` içindəki `WF.ui` shadcn anatomiyasını wireframe dilinə köçürür: button, badge,
input/select/textarea, checkbox/radio/switch, avatar, tabs, card, alert, breadcrumb,
dropdown menu, dialog, table, progress, skeleton, tooltip, accordion, separator.
Həndəsə `rough: 0.8` (əl çəkməsi), mətn Kalam, palitra `C.*`-dir. Mövcud səhifələr köhnə
primitivləri işlətməyə davam edir; yeni səhifələr birbaşa `WF.ui.*` çağıra bilər.

```js
WF.ui.tabs(f, 348, 192, ['Overview', 'Resources', 'Works'], 0, { itemPad: 16 });
WF.ui.button(f, 72, 192, 120, 'Yadda saxla', { variant: 'outline' });
```

Canlı referans və anatomiya: `components.html`.

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
| Kağız | `#0b0b0e` |
| Mürəkkəb | `#e8e8e3` (ikinci `#a8a8b2`, solğun `#7d7d88`) |
| Doldurma | `#1a1a21` / `#25252e` |
| Vurğu | `#c9ff3d` — yalnız primary hərəkət və annotasiya |
| Təhlükə | `#ff6b5e` — yalnız destructive |
| Şrift | Kalam 400 / 700 (+ AZ patç: `ə`, `Ə`) |
| Ölçülər | 10.5 / 12.5 / 15 / 24 / 30 |
| Radius | 5–6 px (çip və düymələr 16–22) |
| Onboarding | struktur referensdən: mərkəz, tək accent, 7 nöqtə; dil rough.js + Kalam |

İkon dəsti, foto, animasiya və real data **qəsdən yoxdur** — lo-fi mərhələsində bunlar
müzakirəni yayındırır. Palitra isə tünd eskizdir: qara səth, açıq ştrix, bir lime vurğu.
Rəng burada brend qərarı deyil, iyerarxiya alətidir — accent həmişə "buraya bax" deməkdir.
**Onboarding istisnadır:** strukturca referensə uyğun mərkəzləşdirilmişdir, amma vizual
dil dəyişmir — rough.js + Kalam və tünd eskiz palitrası.

## Onboarding — ilk giriş axını

Onboarding ayrı bölmədir (`00`), çünki ilk giriş bütün iş məkanından əvvəl gəlir və fərqli
rejimdə işləyir: sol rels, top bar və “+ Yarat” yoxdur. Məzmun referensdəki kimi mərkəzdədir —
bir başlıq, bir alt mətn, bir primary hərəkət və aşağıda 7 nöqtə. Vizual dil isə dəyişmir:
rough.js + Kalam, tünd eskiz palitrası və tək lime accent.

Sıra qəsdən belədir:

1. **Xoş gəldin** — təbrik, 6 dəqiqəlik gözlənti və 4 fəslin xəritəsi; yarımçıq buraxmaq olar.
2. **Tanışlıq** — kiçik profil formu: ad, vəzifə, komanda və bir cümləlik təqdimat.
   HR məlumatları təkrarlanmır, ad/vəzifə əvvəlcədən dolu gəlir və hər sahə keçilə bilər.
3. **Komanda** — buddy, manager və komanda. Hər üzv kartdan çıxarılıb: böyük mərkəzli
   avatar, bir insan cümləsi və detallar chip-lərdə; buddy ayrıca açıq qarşılama zolağıdır.
4. **Ofis və masan** — izometrik plan, girişdən öz masasına yol, zonalar və masa kartı. Akcent
   yalnız “sənin masan” pinindədir; plan naviqasiya alətidir, dekorasiya deyil.
5. **Davranış kodeksi** — 4 prinsip və versiyaya bağlı təsdiq.
6. **Təhlükəsizlik** — IT audit qaydaları vərdiş kimi: etməli / etməməli, iki birbaşa addım
   (MFA, parol meneceri), hadisə SLA-sı və təsdiq qapısı.
7. **Dəstək** — ad + kanal + SLA və My Work OS-ə keçid.

Ən çox dəyişən qərar: **komanda ofisdən əvvəl**, **qaydalar dəstəkdən əvvəl** və **dəstək son
addım**. Bu, “əvvəl aidiyyət, sonra yer, sonra öhdəlik, ən sonda kömək” prinsipidir.

## People kataloqu — kart şəbəkəsi

Kataloq cədvəl deyil, kart axınıdır (Higgsfield-ın media-first feed patterni):
kartın üst qatında avatar, şöbə və sistem statusu; altında ad, rol, "nə üçün
yazmalı" və layihə komandası. Hover/fokusda kartın üzərində "Profil aç" və
sürətli əməliyyat çıxır. Axtarış, "Hamısı" + "Rəqəmsallaşdırma", rol və
sıralama tək sıradadır; bu səhifədə qlobal shell axtarışı gizlədilir ki, iki
axtarış sahəsi olmasın.

Cədvəl görünüşü qəsdən yoxdur: eyni məlumat kartda bir baxışda oxunur, sütun
başlığı tələb etmir və dar ekrana birbaşa düşür.

## Axınlar — work item-in üzərindəki müqavilə

Axın ayrı modul deyil, work item-in üzərində işləyən qatdır. Dörd anlayışı qarışdırmırıq:

- **Status** — işin harada olduğu (`Backlog … Done`). Yeganə qruplaşdırma oxu olaraq qalır.
- **Gate / təsdiq** — kimin qərarı gözlənilir, hansı artefakt versiyasına, hansı SLA ilə.
- **Təhvil** — nəyin kimə verildiyi; paket, qəbul meyarları və alıcı (hesabsız xarici alıcı da).
- **Avtomatlaşdırma** — yalnız xatırlatma, eskalasiya və bağlanma; qərar heç vaxt avtomatik verilmir.

Əsas qaydalar:

- `In Review` statusdur; təsdiq isə ayrıca obyektdir — gate yeddinci status yaratmır.
- Təsdiq artefaktın konkret versiyasına bağlanır; fayl dəyişsə, təsdiq etibarsız olur.
- “Rəy” bloklamır, “təsdiq” bloklayır, “qəbul” nəticəni qəbul edir, “təhvil” sahibliyi dəyişir.
- Təsdiqçi **şəxs deyil, roldur**; vakant rol, delegasiya və məzuniyyət fallback zənciri ilə həll olunur.
- Şablon versiyalıdır: davam edən iş köhnə versiyada qalır, yeni qayda yalnız yeni işlərə tətbiq olunur.
- Health gecikən gate və qəbul edilməyən təhvildən də törəyir; səbəb həmişə göstərilir.

Canvas qatı: axın forma deyil, **node-based lövhədir** — mərhələlər node, ötürmələr xətt,
düzəliş dövrəsi görünən kəsik xəttdir. Konfiqurasiya yalnız seçilmiş node üçün açılır;
“Axın ↔ Səlahiyyət” eyni canvasın iki lensidir. Bu, adi istifadəçinin axını bir baxışda
anlamasını, adminin isə dərinliyə enməsini ayırır. Model Higgsfield Canvas-ı izləyir:
node-based lövhə, kontekstual inspector, template və canlı komanda iştirakı.

Ekranlar: [təsdiq/təhvil növbəsi](01-my-work-os.html#approvals) ·
[work item axın relsi](02-projects.html#project-workitem) ·
[layihə axın görünüşü](02-projects.html#project-flow) ·
[axın canvası](06-flows.html#flow-template) · [səlahiyyət lensi](06-flows.html#flow-authority).

## Buraxılış — tələb, paket və qapılar

Buraxılış axını development alətindən asılı deyil. Sistem yalnız **qərar və sübut** qatını
saxlayır:

- **Tələb (PMO)** — task deyil; triage qəbul edir, məlumat istəyir və ya rədd edir.
- **Work item** — tələbin bölgüsü; status sadə qalır (`Backlog … Done`).
- **Paket** — yoxlanıla bilən iş toplusu; identifikator sərbəst mətndir, mənbə linki opsionaldır.
- **Milestone** — vaxt və nəticə öhdəliyi; paketlər ona **opsional** bağlanır. Bir milestone bir neçə paketlə tamamlana bilər; hotfix milestonesuz ola bilər.
- **Design** — default yoxdur; yalnız lazım olanda work item-ə **xarici asılılıq** kimi əlavə olunur. Sahibi şəxs və ya vendor ola bilər; ayrı departament, design work item və daimi mərhələ yaradılmır.
- **Mərhələ** — konfiqurasiya olunan yoxlama yeri; “dev / QA / staging” adları koda yazılmır.
- **Qapı** — kim, nə vaxt, hansı sübutla qərar verdi; “OK” sözü qərar sayılmır.
- **Keçid** — sistem aləti işə salmır; yalnız “bu paket bu mərhələyə keçdi” qeydini saxlayır.

Ekranlar: [tələb və bölgü](07-delivery.html#release-intake) ·
[paket və qapılar](07-delivery.html#release-package) ·
[buraxılış lövhəsi](07-delivery.html#release-board).

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
$url = "file:///C:/.../docs/wireframes/02-projects.html#project"
& $chrome --headless=new --disable-gpu --hide-scrollbars `
  --window-size=1440,900 --user-data-dir="$env:TEMP\wf" `
  --screenshot="project.png" $url
```

| Səhifə | `#` dəyərləri |
|---|---|
| `00-onboarding.html` | `onboard-welcome`, `onboard-questions`, `onboard-team`, `onboard-office`, `onboard-conduct`, `onboard-security`, `onboard-support` |
| `01-my-work-os.html` | `today`, `plan`, `approvals` |
| `02-projects.html` | `project`, `project-icon`, `project-resources`, `project-works`, `project-workitem`, `project-flow` |
| `03-map.html` | `map` |
| `04-knowledge.html` | `document`, `doc`, `datadict` |
| `05-people.html` | `people`, `person` |
| `06-flows.html` | `flow-template`, `flow-authority` |
| `07-delivery.html` | `release-intake`, `release-package`, `release-board` |
