# Layihə Overview — ssenari kataloqu

> **Status:** In wireframe · 2/7 (default + inline edit)
>
> **Konteks:** ACB Intranet → Projects → Layihə səhifəsi → **Overview** tabı
>
> **Mənbə vayrfreym:** [02-projects.html#project](../wireframes/02-projects.html#project)
>
> **Əlaqəli:** [Wireframes README](../wireframes/README.md) · [Use case index](README.md)
>
> **Son yenilənmə:** 29 oktyabr 2026

---

## 1. Məqsəd və çərçivə

Bu sənəd **yalnız Layihə səhifəsinin Overview tabı** üçün əsas istifadə ssenarilərini
(use case-ləri) toplayır. `Works` və `Resources` ayrı tablar kimi qalır; Overview onlara
keçid verir, amma onların daxili axınlarını əhatə etmir.

### 1.1 Overview nəyə cavab verməlidir?

Layihəyə girən istifadəçi ilk 30 saniyədə bunları anlamalıdır:

- Bu nə layihədir və nəyə görə var?
- Layihə sağlamdır, yoxsa riskdədir? Nə qədər irəliləyib?
- Kim **Owner**, kim **Lead**-dir və kimə müraciət etməliyəm?
- İçində hansı alt layihələr var və onların vəziyyəti necədir?
- Son nə dəyişdi?
- Növbəti addım nədir və hansı taba keçməliyəm?

### 1.2 Model fərziyyələri

| Obyekt | Hazırkı vəziyyət | Qərar |
|---|---|---|
| `Project` | Var | — |
| `Project.status` | Var (`Aktiv`) | Lifecycle statusu |
| `Project.health` | Yoxdur | Törəyən health siqnalı |
| `Subproject` | Var (nested) | — |
| `Goal` | Sərbəst mətn kimi görünür | **Sərbəst mətn qalır** |
| `Milestone` | Yoxdur | **Layihə daxilində milestone** |
| `Member / Role` | Var (Owner, Lead, Contributor) | İdarəetmə axını yoxdur |
| `Work item` | Var (Works tabı) | Overview-də yalnız xülasə |
| `Resource` | Var (Resources tabı) | Overview-də xülasə lazımdır? |
| `Activity` | Var (right rail) | Filtr / dərin link yoxdur |
| `Version` | Var (snapshot) | Müqayisə səthi seçilməlidir |
| `Risk / Blocker` | Ayrıca obyekt deyil | **Törəyən** (bloklanmış iş / gecikmiş milestone) |

### 1.3 Status və health — iki ayrı ox

Status və health eyni çipdə birləşdirilmir. Status layihənin **lifecycle** vəziyyətidir;
health isə icranın **törəyən sağlamlıq siqnalıdır**.

| Ölçü | Nədir | Dəyərlər | Kim dəyişir |
|---|---|---|---|
| **Status** | Layihənin həyat dövrü | `Qaralama`, `Aktiv`, `Dayandırılıb`, `Bitdi`, `Arxivlənib` | Owner/Lead (əl ilə) |
| **Health** | İcranın sağlamlığı | `Sağlam`, `Diqqət`, `Riskdə`, `Bloklanıb` | Sistem (törəyən) |

**Törəmə qaydaları (təklif):**

- `Bloklanıb` — ən azı bir kritik/yüksək prioritetli iş bloklanıb.
- `Riskdə` — gecikmiş milestone, yüksək risk siqnalı və ya işlərin 30%+ hissəsi bloklanıb.
- `Diqqət` — 14 gün aktivlik yoxdur və ya milestone 7 günə yaxınlaşır.
- `Sağlam` — heç bir siqnal yoxdur.
- `Bitdi` / `Arxivlənib` halında health göstərilmir.
- Hər siqnalın səbəbi görünməlidir: “2 iş bloklanıb”, “1 milestone gecikib”, “14 gün aktivlik yoxdur”.

> Rəqəmlər ilkin təklifdir; v1-də sadələşdirilə bilər. Əsas prinsip: **“Bloklanıb” status deyil,
> health-dir** — “Bitdi + Bloklanıb” kimi ziddiyyət yaranmasın.

### 1.4 Progress və milestone

- `Subproject.progress` = bitmiş work item / bütün work item.
- `Project.progress` = alt layihələr + birbaşa işlər üzrə **iş sayına görə çəkili orta**.
- İş yoxdursa progress `—` göstərilir; `0%` başlamış kimi oxunmamalıdır.
- Layihənin başlanğıc/son tarixi yoxdur; **layihə deadline-u yoxdur**.
- `Milestone` layihə daxilində ayrı obyektdir: başlıq, tarix, status, bağlı işlər.
- Milestone progress-i dəyişmir; health-ə təsir edir (gecikmə / yaxınlaşma).

---

## 2. Aktyorlar

| Aktyor | Əsas hüquq və məqsəd |
|---|---|
| **Owner** | Layihənin məsuliyyəti, üzvlər, arxivləşdirmə |
| **Lead** | Gündəlik icra, icmal, məqsədlər, işlərin prioriteti |
| **Contributor** | Work item, resurs, şərh; icmalı oxuyur |
| **Viewer / Stakeholder** | Yalnız oxuyur, brif götürür, paylaşır |

> Qeyd: `Person ≠ User` prinsipi burada da keçərlidir — hesabı olmayan şəxs komandada
> görünə bilər, amma sistem hərəkətləri edə bilməz.

---

## 3. Ssenari indeksi

<a id="scenarios"></a>

| ID | Ssenari | Qrup | Prioritet | V1 | Status |
|---|---|---|---|---|---|
| [U1](#u1) | Layihəyə ilk baxış | Orientasiya | P0 | Bəli | Təsdiq gözləyir |
| [U2](#u2) | Sağlamlıq və irəliləyiş | Orientasiya | P0 | Bəli | Təsdiq gözləyir |
| [U3](#u3) | Məqsədləri anlamaq | Orientasiya | P0 | Bəli | Təsdiq gözləyir |
| [U4](#u4) | Alt layihələri görmək | Orientasiya | P0 | Bəli | Təsdiq gözləyir |
| [U5](#u5) | Komandanı tanımaq | Orientasiya | P0 | Bəli | Təsdiq gözləyir |
| [U6](#u6) | İcmalı inline redaktə etmək | Məzmun | P0 | Bəli | In wireframe |
| [U7](#u7) | Məqsədləri redaktə etmək — U6-ya birləşdi | Məzmun | P1 | Xeyr | Birləşdirildi |
| [U8](#u8) | Bloklanmanı qeyd etmək | Məzmun | P1 | Bəli | Təsdiq gözləyir |
| [U9](#u9) | Üzv əlavə etmək / rol dəyişmək | Komanda | P1 | Bəli | Təsdiq gözləyir |
| [U10](#u10) | Layihəni arxivləşdirmək | Komanda | P2 | Xeyr | Təsdiq gözləyir |
| [U11](#u11) | Work item yaratmaq | Keçid | P0 | Bəli | Təsdiq gözləyir |
| [U12](#u12) | Resurslara keçmək | Keçid | P1 | Bəli | Təsdiq gözləyir |
| [U13](#u13) | Fəaliyyəti izləmək | Keçid | P1 | Bəli | Təsdiq gözləyir |
| [U14](#u14) | Versiyaları görmək / müqayisə | Keçid | P2 | Xeyr | Təsdiq gözləyir |
| [U15](#u15) | Paylaşmaq / brif çıxarmaq | Keçid | P2 | Xeyr | Təsdiq gözləyir |
| [U16](#u16) | Yeni / boş layihə | Vəziyyət | P0 | Bəli | Təsdiq gözləyir |
| [U17](#u17) | Read-only Viewer | Vəziyyət | P1 | Bəli | Təsdiq gözləyir |
| [U18](#u18) | Riskdə / bloklanmış layihə | Vəziyyət | P1 | Bəli | Təsdiq gözləyir |
| [U19](#u19) | Çox alt layihə / böyük komanda | Vəziyyət | P2 | Xeyr | Təsdiq gözləyir |

---

## 4. Ssenarilər

### A. Orientasiya və oxuma

<a id="u1"></a>

#### U1 — Layihəyə ilk baxış

**Aktyor:** Hamı · **Prioritet:** P0 · **Status:** Təsdiq gözləyir

**Vayrfreym:** [project](../wireframes/02-projects.html#project)

**Məqsəd:** Layihəyə keçiddən sonra konteksti itirmədən harada olduğunu və layihənin
nə olduğunu anlamaq.

**Tetik:** Sidebar-dan layihə seçimi, axtarış nəticəsi, birbaşa link, bildiriş.

**Əsas axın:**

1. İstifadəçi layihəni açır.
2. Breadcrumb, layihə adı, status və son yenilənmə görünür.
3. Owner və Lead ayrı-ayrı göstərilir.
4. Overview tabı default açılır.
5. İstifadəçi icmalı oxuyur və ya növbəti taba keçir.

**Ekran tələbləri:**

- Breadcrumb: `Layihələr / <layihə>`; nested layihədə dərinlik görünməlidir.
- Başlıq + status + health + son yenilənmə.
- Owner və Lead avatarları, adları və rolları.
- Tabs: `Overview / Resources / Works`; Overview aktiv.
- Sağda və ya yuxarıda primary action: `Work item yarat`; Owner/Lead üçün ikinci dərəcəli `Redaktə et`.

**Data:** `Project`, `Person`, `Activity`, `Version`.

**Kənar hallar:** arxivlənmiş layihə; silinmiş layihəyə köhnə link; icazə yoxdur;
layihə adı dəyişib, link köhnə adla gəlir.

---

<a id="u2"></a>

#### U2 — Sağlamlıq və irəliləyiş

**Aktyor:** Hamı · **Prioritet:** P0 · **Status:** Təsdiq gözləyir

**Vayrfreym:** [project](../wireframes/02-projects.html#project)

**Məqsəd:** Layihənin “yaxşı gedir, yoxsa yox” sualına bir baxışda cavab vermək.

**Tetik:** Overview açılır; status/health göstəricisinə və ya progress blokuna baxılır.

**Əsas axın:**

1. Lifecycle status göstərilir: `Aktiv`, `Dayandırılıb`, `Bitdi`, `Arxivlənib`.
2. Health ayrı göstərilir: `Sağlam`, `Diqqət`, `Riskdə`, `Bloklanıb`.
3. Progress work item və alt layihələrdən hesablanır.
4. Növbəti milestone və açıq / bloklanmış iş sayı görünür.
5. Health siqnalının səbəbi göstərilir.

**Ekran tələbləri:**

- Status və health **iki ayrı** çip/göstərici kimi göstərilir.
- Progress: alt layihələr + birbaşa işlər üzrə roll-up; iş yoxdursa `—`.
- 3 metrik: açıq iş, bloklanmış iş, bitmiş iş.
- Növbəti milestone: başlıq + tarix + status.
- Health səbəbi: “2 iş bloklanıb”, “1 milestone gecikib”.
- `Bitdi` / `Arxivlənib` halında health gizlədilir.

**Data:** `Project.status`, `Project.health`, `WorkItem`, `Subproject`, `Milestone`.

**Kənar hallar:** iş yoxdur (progress `—`); milestone yoxdur; health hesablana bilmir;
status əl ilə dəyişib; data köhnədir.

---

<a id="u3"></a>

#### U3 — Məqsədləri anlamaq

**Aktyor:** Hamı · **Prioritet:** P0 · **Status:** Təsdiq gözləyir

**Vayrfreym:** [project](../wireframes/02-projects.html#project)

**Məqsəd:** Layihənin nəyə nail olmaq istədiyini oxumaq.

**Tetik:** İcmal blokunun oxunması.

**Əsas axın:**

1. İstifadəçi “Məqsədlər” blokunu görür.
2. Məqsədlər sərbəst mətn kimi göstərilir.
3. Redaktə hərəkəti U6 daxilindədir.
4. Məqsədlərin ayrıca statusu, sahibi və bağlı işi izlənmir.

**Ekran tələbləri:**

- Məqsədlər bir mətn blokudur; paraqraf/bullet kimi oxunur.
- Status, sahib, bağlı iş göstərilmir.
- Boş halda izahlı placeholder.

**Data:** `Project.goals` (sərbəst mətn).

**Kənar hallar:** məqsəd yoxdur; uzun mətn; köhnə mətn; dəyişiklik versiyada görünür.

---

<a id="u4"></a>

#### U4 — Alt layihələri görmək

**Aktyor:** Hamı · **Prioritet:** P0 · **Status:** Təsdiq gözləyir

**Vayrfreym:** [project](../wireframes/02-projects.html#project)

**Məqsəd:** Layihənin hansı alt layihələrdən ibarət olduğunu və hər birinin vəziyyətini
görmək.

**Tetik:** Overview-də “Alt layihələr” blokuna baxış.

**Əsas axın:**

1. Alt layihə kartları görünür: ad, progress, açıq iş sayı, komanda.
2. Kartın içinə keçid var.
3. “+ Alt layihə” yalnız səlahiyyətli istifadəçiyə görünür.
4. Ümumi progress alt layihələrdən roll-up olunur.

**Ekran tələbləri:**

- Kartda ad, status, progress, açıq iş, Lead/komanda.
- Boş alt layihə üçün “hələ iş yoxdur” vəziyyəti.
- Çox olduqda “hamısı” / yığcam görünüş.

**Data:** `Subproject`, `WorkItem`, `Member`.

**Kənar hallar:** alt layihə yoxdur; 20+ alt layihə; arxivlənmiş alt layihə;
dairəvi asılılıq (praktikada olmamalıdır).

---

<a id="u5"></a>

#### U5 — Komandanı tanımaq

**Aktyor:** Hamı · **Prioritet:** P0 · **Status:** Təsdiq gözləyir

**Vayrfreym:** [project](../wireframes/02-projects.html#project)

**Məqsəd:** Owner, Lead və üzvləri ayırd etmək; kimə hansı məsələ ilə müraciət etməyi
bilmək.

**Tetik:** “Üzvlər” blokuna baxış; profilə keçid.

**Əsas axın:**

1. Owner və Lead ayrıca vurğulanır.
2. Üzvlər kart/sətir kimi görünür: avatar, ad, rol.
3. Profilə keçid var.
4. Owner/Lead “İdarə et” ilə üzv əlavə edə bilir.

**Ekran tələbləri:**

- Owner ≠ Lead izahı görünməlidir.
- Rol etiketləri: Owner, Lead, Contributor, Viewer.
- Hesabı olmayan şəxs üçün neytral işarə.
- “İdarə et” yalnız səlahiyyətliyə.

**Data:** `Member`, `Person`, `Role`.

**Kənar hallar:** 100+ üzv; xarici podratçı; hesabsız şəxs; Owner dəyişikliyi.

---

### B. Məzmun və qərar

<a id="u6"></a>

#### U6 — İcmalı inline redaktə etmək

**Aktyor:** Owner / Lead · **Prioritet:** P0 · **Status:** In wireframe

**Vayrfreym:** [project-edit](../wireframes/02-projects.html#project-edit)

**Məqsəd:** Layihənin təsvirini və məqsədlərini yerində, modal açmadan yeniləmək.

**Tetik:** Təsvir və ya məqsədlər mətninə klik / fokus.

**Əsas axın:**

1. İstifadəçi mətnə klikləyir; həmin blok inline editora çevrilir.
2. Təsvir markdown textarea; məqsədlər ayrıca sərbəst mətn textarea-sı olur.
3. Yazarkən 800ms debounce ilə autosave; status “Yadda saxlanılır…” göstərir.
4. Blur dərhal saxlayır; Esc son saxlanmış vəziyyətə qaytarır; ⌘/Ctrl+Enter dərhal saxlayır.
5. Save versiya snapshot-u və activity yazısı yaradır.

**Ekran tələbləri:**

- Modal/panel yoxdur; layout jump minimaldır.
- Toolbar: B / I / link / list (təsvir üçün).
- Focus ring, caret və placeholder.
- Autosave statusu: “Yadda saxlanılır…” → “Yadda saxlanıldı”; xəta inline.
- Yalnız Owner/Lead; Viewer read-only.
- “Redaktə” düyməsi yoxdur; mətnin özü editordur.

**Data:** `Project.about`, `Project.goals`, `Version`, `Activity`.

**Kənar hallar:** debounce zamanı səhifədən çıxma; save xətası; paralel redaktə;
boş sahə; uzun mətn; icazə itkisi.

---

<a id="u7"></a>

#### U7 — Məqsədləri redaktə etmək — U6-ya birləşdi

**Aktyor:** Lead / Owner · **Prioritet:** P1 · **Status:** U6-ya birləşdirildi

**Vayrfreym:** —

**Qeyd:** Məqsədlər sərbəst mətn olduğu üçün ayrıca status, sahib və bağlı iş axını
yoxdur. Redaktə U6 daxilində baş verir; ayrıca ekran/freym tələb etmir.

---

<a id="u8"></a>

#### U8 — Bloklanmanı qeyd etmək

**Aktyor:** Lead / Owner · **Prioritet:** P1 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** İşin bloklandığını qeyd etmək və health siqnalını törətmək.

**Tetik:** Work item-də “Bloklandı” statusu və ya dependency əlavə etmək.

**Əsas axın:**

1. İstifadəçi work item-i bloklanmış kimi qeyd edir (səbəb + blocker link).
2. `blocks` / `blocked by` əlaqəsi yaranır.
3. Layihə health-i yenidən hesablanır.
4. Overview-də səbəb görünür: “2 iş bloklanıb”.

**Ekran tələbləri:**

- Ayrıca `Risk` obyekti yoxdur; siqnal work item / dependency-dən törəyir.
- Bloklanma səbəbi və blocker linki.
- Health `Bloklanıb` / `Riskdə` avtomatik hesablanır.
- “Həll olundu” work item statusunu dəyişir.

**Data:** `WorkItem.status`, `Dependency`, `Project.health`.

**Kənar hallar:** bir neçə blocker; blocker başqa layihədədir; bloklanma həll olunub,
status yenilənməyib.

---

### C. Komanda və idarəetmə

<a id="u9"></a>

#### U9 — Üzv əlavə etmək / rol dəyişmək

**Aktyor:** Owner / Lead · **Prioritet:** P1 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** Layihə komandasını idarə etmək.

**Tetik:** “İdarə et” və ya üzv paneli.

**Əsas axın:**

1. Şəxs ad / e-poçt ilə axtarılır.
2. Rol seçilir: Lead, Contributor, Viewer.
3. Əlavə edilir; şəxs bildiriş alır.
4. Mövcud üzvün rolu dəyişdirilir və ya çıxarılır.
5. Dəyişiklik activity-yə düşür.

**Ekran tələbləri:**

- Axtarış + nəticə siyahısı.
- Rol izahı (nəyə icazə verir).
- Owner-i çıxarmaq mümkün olmamalıdır (əvvəl transfer).
- Son üzvü çıxarmaq xəbərdarlığı.

**Data:** `Person`, `Member`, `Role`, `Activity`.

**Kənar hallar:** hesabı olmayan şəxs; artıq üzvdür; özünü çıxarma; son Owner.

---

<a id="u10"></a>

#### U10 — Layihəni arxivləşdirmək

**Aktyor:** Owner · **Prioritet:** P2 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** Layihəni aktiv siyahıdan çıxarmaq, tarixçəni saxlayaraq.

**Tetik:** `···` menyusu → “Arxivləşdir”.

**Əsas axın:**

1. Təsdiq dialoqu açılır.
2. Nəticələr göstərilir: açıq işlər, tablar, üzvlər.
3. Təsdiqləndikdə layihə arxivə keçir.
4. Sidebar və axtarışdan çıxarılır; link read-only açılır.

**Ekran tələbləri:**

- Dağıdıcı hərəkət ayrıca vurğulanmalıdır.
- “Ləğv et” default.
- Arxivdən qaytarma yolu göstərilməlidir.

**Data:** `Project`, `Activity`, `Version`.

**Kənar hallar:** açıq işlər var; alt layihələr var; istifadəçi səhvən arxivləşdirir.

---

### D. Keçidlər və əməliyyatlar

<a id="u11"></a>

#### U11 — Work item yaratmaq

**Aktyor:** Contributor+ · **Prioritet:** P0 · **Status:** Təsdiq gözləyir

**Vayrfreym:** [board](../wireframes/02-projects.html#board)

**Məqsəd:** Layihə kontekstindən çıxmadan yeni iş yaratmaq.

**Tetik:** “Work item yarat” (primary action) və ya `C`.

**Əsas axın:**

1. Modal / drawer açılır; layihə əvvəlcədən seçilib.
2. Başlıq, tip, assignee, prioritet daxil edilir.
3. “Yarat” ilə iş yaranır.
4. İstifadəçi board-da həmin işi görür və ya Overview-a qayıdır.

**Ekran tələbləri:**

- Layihə sahəsi dəyişməz (kontekstdən gəlir).
- Yalnız 4-5 sahə; qalanı detala qalır.
- Klaviatura ilə sürətli yaratma.
- Boş başlıq validasiyası.

**Data:** `WorkItem`, `Project`, `Person`.

**Kənar hallar:** icazə yoxdur; şəbəkə xətası; dublikat başlıq; alt layihə seçimi.

---

<a id="u12"></a>

#### U12 — Resurslara keçmək

**Aktyor:** Hamı · **Prioritet:** P1 · **Status:** Təsdiq gözləyir

**Vayrfreym:** [Resources](../wireframes/04-knowledge.html#document)

**Məqsəd:** Layihəyə aid sənəd, use case və data dictionary resurslarını tapmaq.

**Tetik:** Overview-də “Resurslar” bloku və ya `Resources` tabı.

**Əsas axın:**

1. Overview-də resursların xülasəsi görünür (3 tip üzrə say).
2. İstifadəçi `Resources` tabına keçir.
3. Tip / sahib / son yenilənmə üzrə filtr edir.
4. Resursu açır.

**Ekran tələbləri:**

- 3 tip ayrı-ayrı qruplaşdırılmalıdır: sənəd, use case, data dictionary.
- Son yenilənmə və sahib.
- Boş halda “hələ resurs yoxdur”.

**Data:** `Resource`, `Document`, `UseCase`, `DataDictionary`.

**Kənar hallar:** resurs yoxdur; köhnə versiya; icazə yoxdur; resurs başqa layihədən paylaşılıb.

---

<a id="u13"></a>

#### U13 — Fəaliyyəti izləmək

**Aktyor:** Hamı · **Prioritet:** P1 · **Status:** Təsdiq gözləyir

**Vayrfreym:** [project](../wireframes/02-projects.html#project)

**Məqsəd:** Layihədə son nə dəyişdiyini və kim tərəfindən dəyişdiyini görmək.

**Tetik:** Sağ relsdəki “Fəaliyyət” bloku.

**Əsas axın:**

1. Fəaliyyət tarixə görə qruplaşdırılır (bugün, dünən, …).
2. Hər sətirdə kim, nə etdi, nə vaxt.
3. Sətirə klik həmin işə/resursa aparır.
4. “Hamısı” ayrıca filtr ekranına keçir.

**Ekran tələbləri:**

- Tip üzrə filtr: iş, resurs, komanda, versiya.
- Şəxs üzrə filtr.
- Dərin link.
- Boş fəaliyyət üçün “hələ dəyişiklik yoxdur”.

**Data:** `Activity`, `WorkItem`, `Resource`, `Member`.

**Kənar hallar:** çox səs-küylü feed; silinmiş obyektə link; icazə yoxdur.

---

<a id="u14"></a>

#### U14 — Versiyaları görmək / müqayisə

**Aktyor:** Lead / Viewer · **Prioritet:** P2 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** Layihənin hansı versiyada olduğunu və nə dəyişdiyini görmək.

**Tetik:** “Versiya 12” çipi və ya “Müqayisə et”.

**Əsas axın:**

1. Versiya siyahısı açılır: nömrə, tarix, müəllif.
2. İki versiya seçilir.
3. Fərq göstərilir: icmal, məqsədlər, komanda, status.
4. İstifadəçi bağlayır və ya köhnə versiyaya baxır.

**Ekran tələbləri:**

- Versiya çipi Overview-də qalır.
- Müqayisə ayrıca səthdə açılır: v1 təklifi — full-screen modal/drawer; ayrıca route sonra.
- Yalnız dəyişən sahələr vurğulanır.

**Data:** `Version`, `Project`, `Activity`.

**Kənar hallar:** yalnız bir versiya; böyük fərq; silinmiş istifadəçi; icazə.

---

<a id="u15"></a>

#### U15 — Paylaşmaq / brif çıxarmaq

**Aktyor:** Owner / Viewer · **Prioritet:** P2 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** Layihəni stakeholderə ötürmək və ya qısa brif çıxarmaq.

**Tetik:** `Paylaş` və ya `···` menyusu.

**Əsas axın:**

1. İstifadəçi “Paylaş”a basır.
2. Link kopyalanır və ya brif (PDF/oxunaqlı səhifə) yaradılır.
3. Kimin görəcəyi seçilir.
4. Nəticə paylaşılır.

**Ekran tələbləri:**

- Link icazəsi aydın olsun (Viewer/Contributor).
- Brifdə yalnız ictimai məlumat.
- Kopyalandı bildirişi.

**Data:** `Project`, `Member`, `Resource`.

**Kənar hallar:** məxfi resurslar; vaxtı keçmiş link; icazəsiz paylaşma.

---

### E. Kənar vəziyyətlər

<a id="u16"></a>

#### U16 — Yeni / boş layihə

**Aktyor:** Owner / Lead · **Prioritet:** P0 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** Yeni layihədə ilk addımı göstərmək və boşluq hissini aradan qaldırmaq.

**Tetik:** Layihə yaradılır və ya bütün məzmun silinir.

**Əsas axın:**

1. Boş Overview açılır.
2. 3 addımlı checklist görünür: icmalı yaz, ilk işi yarat, komandanı dəvət et.
3. Hər addım birbaşa hərəkətə aparır.
4. Addımlar tamamlandıqca checklist yenilənir.

**Ekran tələbləri:**

- Boş səhifədə izahsız heç nə qalmasın.
- “İlk işi yarat” primary action.
- Şablon seçimi (istəyə bağlı).

**Data:** `Project`, `WorkItem`, `Member`.

**Kənar hallar:** şablondan yaradılıb; icazə yoxdur; yarımçıq setup.

---

<a id="u17"></a>

#### U17 — Read-only Viewer

**Aktyor:** Viewer · **Prioritet:** P1 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** Oxu icazəsi olan istifadəçinin nə edə bilmədiyini aydın göstərmək.

**Tetik:** Viewer layihəni açır.

**Əsas axın:**

1. Bütün məzmun görünür.
2. Redaktə / yarat / idarə et hərəkətləri görünmür və ya deaktivdir.
3. Səbəb tooltip/izahla bildirilir.
4. “Paylaş” və ya “Brif” mövcud ola bilər.

**Ekran tələbləri:**

- Disabled düymələr səbəbsiz qalmamalıdır.
- “Viewer” rolu profil sahəsində görünsün.
- Gizli məlumat (məxfi resurs) göstərilməməlidir.

**Data:** `Member.role`, `Permission`.

**Kənar hallar:** icazə sonradan dəyişir; link paylaşılıb; anonim istifadəçi.

---

<a id="u18"></a>

#### U18 — Riskdə / bloklanmış layihə

**Aktyor:** Hamı · **Prioritet:** P1 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** Layihənin problemli olduğunu ilk baxışda görmək və səbəbini anlamaq.

**Tetik:** Overview açılır; health `Riskdə` və ya `Bloklanıb`.

**Əsas axın:**

1. Health göstəricisi accent/destructive variantda görünür.
2. Banner: törəyən səbəb + “Ətraflı”.
3. Bloklanmış işlər və ya gecikmiş milestone görünür.
4. İstifadəçi işə və ya milestone-a keçə bilir.

**Ekran tələbləri:**

- Rəng yalnız siqnal üçün (accent/destructive).
- Səbəb olmadan `Riskdə` / `Bloklanıb` göstərilməməlidir.
- “Nə etməliyəm?” sualına qısa cavab.
- Health lifecycle statusundan ayrı göstərilir.

**Data:** `Project.health`, `WorkItem.status`, `Milestone`, `Dependency`.

**Kənar hallar:** siqnal həll olunub, health hələ yenilənməyib; bir neçə siqnal;
threshold səhv işləyir.

---

<a id="u19"></a>

#### U19 — Çox alt layihə / böyük komanda

**Aktyor:** Hamı · **Prioritet:** P2 · **Status:** Təsdiq gözləyir

**Vayrfreym:** —

**Məqsəd:** Böyük layihədə Overview-ı oxunaqlı saxlamaq.

**Tetik:** 20+ alt layihə, 50+ üzv.

**Əsas axın:**

1. Alt layihələr qruplaşdırılır / yığcamlaşdırılır.
2. “Hamısı” ayrıca siyahıya aparır.
3. Üzvlər avatarla yığılır; “+N” göstərilir.
4. Axtarış/filtr tətbiq olunur.

**Ekran tələbləri:**

- İlk 4-6 alt layihə + “daha çox”.
- Üzv stack + “+N nəfər”.
- Performans üçün virtualization (real tətbiqdə).

**Data:** `Subproject`, `Member`.

**Kənar hallar:** çox sayda; boş alt layihələr; eyni adlı alt layihələr.

---

## 5. Hazırkı vayrfreymlə müqayisə

Mövcud [Layihə icmalı](../wireframes/02-projects.html#project) freymində olanlar:

- Layihə adı, status çipi, Owner/Lead, üzv sayı, son yenilənmə.
- Overview / Resources / Works tabları.
- İcmal, məqsədlər, alt layihə kartları, üzvlər.
- Sağ relsdə fəaliyyət və versiya.

Çatışmayanlar:

- Status yalnız lifecycle vəziyyətidir; health siqnalı yoxdur.
- Ümumi progress, növbəti milestone və health səbəbi yoxdur.
- Məqsədlər sərbəst mətn kimi redaktə olunmur.
- Bloklanma / risk siqnalı Overview-də görünmür.
- Resurslar üçün xülasə bloku yoxdur.
- “Mənim rolum / mənim işlərim” konteksti yoxdur.
- Boş, read-only və riskdə vəziyyətləri yoxdur.
- Fəaliyyət filtrsizdir, dərin link yoxdur.
- Versiya çipi var, müqayisə hərəkəti yoxdur.
- Üzv idarəetməsi yalnız “İdarə et” mətnidir.

---

## 6. V1 üçün təklif

<a id="v1"></a>

| # | Vayrfreym / vəziyyət | Ssenarilər | Nə göstərir |
|---|---|---|---|
| 1 | **Overview — default** | U1–U5, U11–U13 | Dolu layihə; status + health, progress, növbəti milestone, məqsədlər, alt layihələr, komanda, resurs xülasəsi, fəaliyyət |
| 2 | **Overview — riskdə** | U2, U8, U18 | Törəyən health səbəbi, bloklanmış işlər, risk banneri |
| 3 | **Overview — boş** | U16 | 3 addımlı onboarding checklist |
| 4 | **Layihə haqqında — inline redaktə** | U6 | Inline textarea + toolbar + autosave debounce; Esc/⌘Enter |
| 5 | **Komanda və rollar paneli** | U9 | Üzv axtarışı, rol dəyişmə, çıxarma |
| 6 | **Read-only Viewer** | U17 | Gizlədilmiş/deaktiv hərəkətlər, səbəb izahı |
| 7 | **Quick create work item** | U11 | Default üzərində modal; kontekst əvvəlcədən dolu |

> Təklif: 1, 3, 4, 6, 7 mütləq; 2 və 5 ikinci dövrədə. Bu, 6–7 freymlə Overview-ı
> tam əhatə edir.

**Tətbiq:** 1 — [Overview default](../wireframes/02-projects.html#project),
4 — [inline redaktə](../wireframes/02-projects.html#project-edit) çəkildi (29 oktyabr 2026).
Qalan freymlər növbəti.

---

## 7. Qərarlar

<a id="decisions"></a>

| # | Sual | Variantlar | Təklif | Təsdiq |
|---|---|---|---|---|
| D1 | Status modeli | Tək status və ya status + health | **Təsdiqləndi:** lifecycle statusu (`Qaralama / Aktiv / Dayandırılıb / Bitdi / Arxivlənib`) + ayrı health (`Sağlam / Diqqət / Riskdə / Bloklanıb`) | ✅ |
| D2 | Progress | Əl ilə % və ya işlərdən avtomatik | **Təsdiqləndi:** work item + alt layihələrdən avtomatik | ✅ |
| D3 | Məqsədlər | Sərbəst mətn və ya ayrıca obyekt | **Təsdiqləndi:** sərbəst mətn | ✅ |
| D4 | Risk | Ayrıca risk və ya bloklanmış işdən törəmə | **Təsdiqləndi:** törəyən (bloklanmış iş / gecikmiş milestone) | ✅ |
| D5 | Deadline / milestone | V1-də və ya sonra | **Təsdiqləndi:** layihə deadline-u yox; milestone var | ✅ |
| D6 | Primary action | `Work item yarat` və ya `İcmalı redaktə et` | **Təsdiqləndi:** `Work item yarat`; redaktə ikinci dərəcəli | ✅ |
| D7 | Viewer read-only | V1-də və ya sonra | **Təsdiqləndi:** V1-də ayrıca vəziyyət | ✅ |
| D8 | Versiya müqayisəsi | Ayrıca route və ya full-screen modal | **Təsdiqləndi:** v1 full-screen modal/drawer; ayrıca route sonra | ✅ |
| D9 | İcmal redaktəsi | Panel vs inline | **Təsdiqləndi:** inline; autosave debounce 800ms; Esc ləğv; ⌘/Ctrl+Enter save | ✅ |

**D1–D9 bağlandı.** Status/health modeli, inline redaktə və versiya səthi təsdiqləndi.
V1 vayrfreymləri üçün əsas hazırdır.

### 7.1 Versiya müqayisəsi — “ayrıca ekran” nə deməkdir?

- **A. Ayrıca səhifə / route:** `/projects/:id/versions` — tam səhifə, versiya siyahısı və diff.
  Overview-dan tamamilə çıxır.
- **B. Full-screen modal / drawer:** “Versiya 12” çipindən açılır; kontekst qalır, ayrı route yoxdur.
- **Təsdiqləndi:** v1 üçün **B**; versiya axını tez-tez istifadə olunarsa, sonra A-ya keç.

---

## 8. Növbəti addım

<a id="next"></a>

1. Ssenari siyahısı və V1 dəsti təsdiqləndi (29 oktyabr 2026).
2. V1 vayrfreymlərini `docs/wireframes/02-projects.html` əsasında çək.
3. Hər yeni freym üçün bu sənədə link əlavə et.

**Təsdiq üçün yoxlama:**

- [x] Ssenari siyahısı tamdır (U1–U19).
- [x] V1 dəsti (1, 3, 4, 6, 7 + 2, 5) uyğundur.
- [x] Status + health iki ayrı ox kimi təsdiqləndi.
- [x] Versiya müqayisəsi səthi seçildi (modal vs ayrıca səhifə).
- [x] D1–D9 qərarları bağlanıb.
- [x] İnline redaktə + autosave debounce təsdiqləndi.
- [ ] Vayrfreym çəkməyə başlayaq.
