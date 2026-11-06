# Design validation — People / Projects

Bu qovluq `05-people.html#person` və `02-projects.html#project` ekranlarının design səthlərində yoxlanmasını saxlayır.

## Fayllar

| Fayl | Nədir |
|---|---|
| `people-profile.desigma` | Desigma design sənədi — 1440×900 frame, 126 native layer |
| `profile.png` | Desigma board-unun düzəldilmiş PNG exportu |
| `people-profile.excalidraw` | Excalidraw board — 2 frame: `Profile — default` və `Review notes` |
| `projects-overview.excalidraw` | Excalidraw board — 2 frame: `Projects — Overview` və `Review notes` (171 element) |

## Necə açmaq

**Excalidraw**
1. `excalidraw.com` aç.
2. `Open` → `people-profile.excalidraw` və ya `projects-overview.excalidraw` faylını seç.
3. VS Code istifadə edirsinizsə, Excalidraw extension ilə də açmaq olar.

**Desigma**
1. Desigma desktop app-i aç.
2. `File → Open` → `people-profile.desigma`.

## Nə yoxlanıldı

- Excalidraw profile board-u hand-drawn üslubda qurulub; profil ekranı və review qeydləri ayrı frame-lərdədir.
- Excalidraw projects board-u əsas layihə icmalını, alt layihələri, activity və resurs relsini bir board-da göstərir.
- Desigma board-u daha dəqiq layer strukturu ilə qurulub; PNG export alınıb.
- Hər iki fayl repository-də saxlanıla bilən açıq formatdadır (`.excalidraw`, `.desigma`).

## Profile board — düzəlişlər

- “Nə ilə məşğuldur” kartının boş qalan mətn sətirləri əlavə olundu.
- “Açıq işlər (4)” başlığı ilə uyğunsuz olan 3 sətir 4-ə çatdırıldı (`ACB-128` əlavə olundu).
- Sol rail-də nav ikonları əlavə olundu: günəş, grid, sənəd, insan, xəritə.
- “Açıq işlər” kartının alt padding-i artırıldı və `Person ≠ User` qeydi aşağı çəkildi.
- `profile.png` düzəldilmiş versiya ilə əvəz olundu.

## MCP qeydi

- **Desigma MCP** `~/.config/opencode/opencode.jsonc` faylında `desigma` serveri kimi qoşulub; workspace `docs/design`-dir.
- **Excalidraw MCP** hələ qoşulmayıb. Lazım olsa, `mcp-excalidraw-server` və ya rəsmi Excalidraw MCP ilə əlavə etmək olar. Bu fayl MCP olmadan, birbaşa `.excalidraw` JSON kimi yaradılıb.
- Desigma MCP-də boş səhifələri silmək/rename etmək bu sessiyada alınmadı; Desigma app-də `Pages` panelindən əl ilə təmizləmək olar. Board `People — Profile 2` səhifəsindədir.

## Növbəti addım

- Excalidraw board-da profile ekranının **empty** və **read-only** variantlarını ayrı frame kimi əlavə etmək.
- Projects board-una **Works** tabını və **empty project** state-ini əlavə etmək.
- Lazım olsa, həmin frame-ləri PNG/SVG kimi export edib `docs/wireframes` sənədlərinə bağlamaq.
