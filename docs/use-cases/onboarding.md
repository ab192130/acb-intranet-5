# Onboarding — ilk giriş axını

**Status:** In wireframe · [vayrfreym](../wireframes/00-onboarding.html)
**Mənbə:** ilk giriş ssenarisi · 5 noyabr 2026

## Məqsəd

Yeni işçi sistemə ilk dəfə girdikdə onu təbrik etmək, 6 dəqiqə içində komanda, ofis, qaydalar
və dəstək haqqında ən vacib şeyi göstərmək. Onboarding “oxu və qəbul et” divarı deyil; hər addım
bir qərar və ya bir ünvan verir.

**Non-goals:** şirkət tarixi, uzun video, çoxsəhifəli əl kitabı, HR-in artıq bildiyi məlumatı
təkrar soruşmaq.

**Vizual istiqamət:** struktur referensə uyğundur — mərkəzləşdirilmiş tək sütun, tək primary
hərəkət və aşağıda 7 nöqtəli tərəqqi. Vizual dil isə dəyişmir: rough.js + Kalam, paper palitra
(`#fbfaf5`) və tək accent (`#a4512f`). Yəni referensdən **struktur** götürülür, **üslub** yox.

## Aktyorlar

- **Yeni işçi** — axını keçən şəxs; istənilən addımda dayandıra bilər.
- **Buddy** — ilk 2 həftə üçün adlı ünvan; onboarding-in əsas insan dəstəyi.
- **Manager** — ilk 1:1 və 30/60/90 gün hədəfləri.
- **HR / Compliance** — davranış kodeksi və anonim kanal.
- **IT** — MFA, parol meneceri, cihaz və hadisə bildirişi.

## Axın

| # | Addım | Ekran | Nəticə |
|---|---|---|---|
| 1 | Xoş gəldin | `onboard-welcome` | İstifadəçi nə qədər davam edəcəyini bilir; “başla” və ya “sonra” seçir. |
| 2 | Tanışlıq | `onboard-questions` | Kiçik profil formu: ad, vəzifə, komanda və bir cümlə; kataloq kartını qurur. |
| 3 | Komanda | `onboard-team` | Buddy açıq qarşılama zolağı; 6 üzv kart olmadan, böyük mərkəzli avatarlar, bir cümlə və detallar chip-lərdə. |
| 4 | Ofis və masan | `onboard-office` | Girişdən masaya yol, zona xəritəsi, masa kartı (B2-14). |
| 5 | Davranış kodeksi | `onboard-conduct` | 4 prinsip və versiyaya bağlı təsdiq. |
| 6 | Təhlükəsizlik | `onboard-security` | 7 vərdiş, 2 birbaşa addım (MFA, parol meneceri), hadisə SLA-sı. |
| 7 | Dəstək | `onboard-support` | Buddy / IT / HR / Compliance / bilik bazası + SLA; My Work OS-ə keçid. |

## Sıra qərarı

İlk təklif “təbrik → suallar → ofis → masa → kodeks → IT → komanda → dəstək” idi. Dəyişdirilən
üç şey:

1. **Komanda ofisdən əvvəl.** Yeni işçi üçün “kimlərlə işləyəcəyəm” sualı “harada oturacağam”
   sualından güclüdür; ofis turu insanlar tanındıqdan sonra məntiqlidir.
2. **Masa ayrı ekran deyil, ofis planının içindədir.** “Öz masan” ofisdən ayrılsa, plan yenə
   statik şəkil olaraq qalır. İzometrik planda tək akcent pin kifayətdir.
3. **Qaydalar dəstəkdən əvvəl, dəstək ən sonda.** Əvvəl öhdəlik (kodeks, təhlükəsizlik), sonra
   “kömək hardan” sualı. Dəstək son ekran olduğu üçün istifadəçi “bitdi” deyil, “davam edir”
   hissi ilə iş masasına keçir.

## Qərarlar

- **D1.** Onboarding app shell-dən kənar fokus rejimidir; sol rels və top bar yoxdur.
- **D2.** Addım sayı 7-dir; hər addım təxmini 1 dəqiqədir, ümumi 6 dəq.
- **D3.** Tərəqqi yuxarıda nazik zolaq və aşağıda “Addım n / 7” ilə göstərilir.
- **D4.** “Sessiyanı saxla və çıx” hər ekranda var; qayıdanda qaldığı addımdan davam edir.
- **D5.** Tanışlıq maksimum 3 addımdır; profil sahələri və qalan addımlar keçilə bilər, cavablar profildə düzəldilir.
- **D6.** Ofis planı izometrikdir; akcent yalnız öz masasındadır, digər zonalar neytraldır.
- **D7.** Kodeks və təhlükəsizlik təsdiqi sənəd versiyasına bağlanır; sənəd dəyişsə, yenidən
  təsdiq tələb olunur.
- **D8.** Təhlükəsizlikdə 2 addım (MFA, parol meneceri) tamamlanmadan “Təsdiqlə” aktiv olmur.
- **D9.** Onboarding bitəndən sonra dəstək kanalları profildə qalır.
- **D10.** Son hərəkət “İş masasına keç” — birbaşa My Work OS-ə aparır.

## Açıq suallar

- Profil sahələrinin dəqiq mətni və komanda siyahısı hansı komanda ilə təsdiqlənir?
- İzometrik plan real mərtəbə planından avtomatik yaradılacaq, yoxsa əl ilə saxlanacaq?
- Təhlükəsizlik təsdiqi IT auditin hansı versiyasına bağlanır və neçə aydan bir yenilənir?
- Anonim kanalın sahibi HR-dir, yoxsa Compliance?
