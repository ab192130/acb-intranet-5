# Modul xəritəsi — sahə → modul → alt-modul

Vayrfreymlər ekranı göstərir; bu sənəd onların **biznes strukturunu** saxlayır.
Səhifə nömrəsi (`00`–`07`) deck sırasıdır, taksonomiya isə biznes iyerarxiyasıdır — ikisi
qəsdən ayrıdır. Görünüş: [`wireframes/modules.html`](wireframes/modules.html) → sahə
səhifəsi (`area-*.html`) → modul səhifəsi.

## Prinsiplər

Üç növü qarışdırmırıq:

- **Modul** — öz obyekti, sahibi və icazələri var; ayrıca buraxıla bilər.
- **Alt-modul** — modulun içində tamamlanan iş vahidi; öz ekranı ola bilər, amma ayrı məhsul deyil.
- **Lens / axın** — başqa modulun datasına baxış və ya proses; öz obyekti yoxdur.

Qaydalar:

- Alt-modul ekran deyil: bir alt-modul bir neçə ekran (default, state, empty) daşıya bilər.
- Səhifə faylı alt-modul sərhədi deyil: `03-map.html` ayrı fayl qalır, amma `Projects`
  alt-moduludur. Fayl birləşdirmək ekran kodunu təkrarlayır; sərhəd bu sənəddədir.
- Naviqasiya üç səviyyədədir: sahə səhifəsi → modul səhifəsi → ekran. Alt-modul ayrı route
  açmır; modul səhifəsinin içində `#anchor`-dur.
- Lens ayrı modul açmır; sahibi olan modulun altında yaşayır.
- Alt-modul sərhədi dəyişəndə əvvəl bu sənəd, sonra ekran dəyişir.

## Ağac

```text
A. İş icrası                     area-work.html
   01 My Work OS
      · Bugün
      · Plan balansı
      · Növbə                 (təsdiq və təhvil)
   02 Projects
      · İcmal
      · İşlər
      · Resurslar
      · Axın görünüşü
      · Struktur xəritəsi     (03-map səhifəsi)

B. İnsan və təşkilat             area-people.html
   05 People
      · Kataloq
      · Şəxs profili
      · Onboarding            (00-onboarding səhifəsi)

C. Bilik                        area-knowledge.html
   04 Knowledge
      · Sənədlər
      · Use case kataloqu
      · Data dictionary

D. Buraxılış                    area-delivery.html
   07 Buraxılış
      · Tələb və bölgü
      · Paket və qapılar
      · Lövhə

E. Platform                     area-platform.html
   06 Axınlar
      · Axın şablonu
      · Səlahiyyət lensi
```

Sıra təsadüfi deyil: **icra → insan → bilik → buraxılış → qaydalar**. Əvvəl gündəlik iş,
sonra onu kim edir, sonra nəyi bilirik, sonra nə buraxırıq, ən sonda hamısını idarə edən qat.

## Modullar

| Modul | Obyekt | Sahib | Alt-modullar | Ekranlar |
|---|---|---|---|---|
| **01 My Work OS** | Şəxsin gündəliyi | Hər işçi | Bugün · Plan balansı · Növbə | 3 |
| **02 Projects** | Layihə, work item | Owner / Lead | İcmal · İşlər · Resurslar · Axın görünüşü · Struktur xəritəsi | 7 |
| **05 People** | Şəxs, komanda | HR | Kataloq · Profil · Onboarding | 9 |
| **04 Knowledge** | Sənəd, use case, data dictionary | PMO / bilik sahibi | Sənədlər · Use case · Data dictionary | 3 |
| **07 Buraxılış** | Tələb, paket, milestone | PMO + mühəndislik | Tələb · Paket və qapılar · Lövhə | 3 |
| **06 Axınlar** | Axın şablonu, səlahiyyət | PMO / admin | Şablon · Səlahiyyət lensi | 2 |

Cəm: **5 sahə · 6 modul · 19 alt-modul · 27 ekran**.

## Nə dəyişdi — köhnə bölmələr

| Köhnə bölmə | Yeni yeri | Səbəb |
|---|---|---|
| 00 Onboarding | `People › Onboarding` | Modul deyil, HR prosesidir; `People` + `Axınlar` birləşməsidir |
| 01 My Work OS | `İş icrası › My Work OS` | Modul kimi qalır — ayrı giriş nöqtəsidir |
| 02 Projects | `İş icrası › Projects` | Modul kimi qalır, alt-modullara bölünür |
| 03 Xəritə | `Projects › Struktur xəritəsi` | Lens-dir: öz obyekti yoxdur |
| 04 Knowledge | `Bilik › Knowledge` | Modul kimi qalır |
| 05 People | `İnsan və təşkilat › People` | Modul kimi qalır, Onboarding buraya keçir |
| 06 Axınlar | `Platform › Axınlar` | Layihənin altı deyil, qayda mühərrikidir |
| 07 Buraxılış | `Buraxılış › Buraxılış` | Ayrı aktyor (PMO) və ayrı lifecycle |

## Boşluqlar

Strukturda yeri var, ekranı yoxdur. Yeni ekran çəkiləndə əvvəl buraya əlavə olunur:

- **Portfolio** — `Projects` alt-modulu: şirkət səviyyəsində layihə siyahısı. İndi yalnız
  tək layihənin icmalı var.
- **Milestone siyahısı** — `Buraxılış` alt-modulu: milestone ayrı obyektdir (D13), amma
  lövhədə yalnız filtr kimi görünür.
- **Komandalar / orq strukturu** — `People` alt-modulu: kataloq və profil var, komanda
  səhifəsi yoxdur.
- **Rollar və icazələr** — `Platform` alt-modulu: səlahiyyət lensi var, tam matris yoxdur.
- **Şablonlar / siyasətlər** — `Knowledge` alt-modulu: gələcək, V1-də deyil.

## V1 sırası

V1 dəsti D1–D13 qərarlarına əsaslanır:

1. **Projects** — İcmal + İşlər (icma, work item relsi).
2. **My Work OS** — Bugün + Növbə.
3. **Knowledge** — üç resurs tipi.
4. **People** — Kataloq + Profil.
5. İkinci dalğa: **Buraxılış**, **Axınlar**, **Onboarding**, **Struktur xəritəsi**.
