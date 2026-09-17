---
title: News scrape image URL extraction
version: 1.0
date_created: 2026-09-17
last_updated: 2026-09-17
owner: Alta Voz
tags: [tool, scrape, news, image, backend]
---

# Introduction

This specification defines how the Alta Voz news scrape pipeline MUST resolve a thumbnail image URL from a selected DOM node. The normative reference implementation is `web_scraping/scrape.js` (`rawImageUrl`, `imgAttrUrl`, `pickWidestUrl`, `pickFromStyle`, `abs`). The backend (`alta-voz-api` scrape controller) MUST match that behavior bit-for-bit for the cases defined here.

## 1. Purpose & Scope

**Purpose:** Ensure news items get a usable image URL when media sites put the URL in attributes other than `img[src]` (notably `data-bgset` and CSS `background-image` in `style`).

**In scope:**
- Selecting the image node via the configured CSS selector `access.image`
- Resolving a raw URL from that node (`img` vs non-`img` rules)
- Choosing among multiple candidates in srcset-like values (largest `Nw`)
- Parsing the first `url(...)` from a `style` attribute
- Absolutizing the resolved URL according to `access.extImg` and page origin

**Out of scope:**
- Choosing or validating CSS selectors per medium
- Fetching HTML / Puppeteer / anti-bot behavior
- Looking at child `img` / `picture` when the selected node is non-`img`
- Special-casing `amp-img` (treat as non-`img` unless the matched element’s tag is `img`)
- `srcset` density descriptors (`1x`, `2x`, …)
- Multiple `url(...)` entries beyond the first match in `style`
- Per-medium attribute overrides beyond the global algorithm below

**Audience:** Engineers implementing or updating news scrape image extraction in `alta-voz-api`.

**Assumption:** Cheerio (or equivalent) has already loaded the listing page HTML; attribute values are decoded (e.g. `&quot;` in `style` appears as `"`).

## 2. Definitions

| Term | Definition |
|------|------------|
| **access** | Per-medium scrape config object: `main`, `title`, `link`, `image`, `content`, `ext`, `extImg`. |
| **image selector** | CSS selector string in `access.image`, evaluated within each `main` match. |
| **image node** | First element matching `access.image` inside a news item container. |
| **raw URL** | URL string extracted from attributes/style before absolutization. |
| **srcset-like value** | Comma-separated list of candidates, optionally with width descriptors like `585w` (applies to `srcset`, `data-srcset`, `data-bgset`). |
| **Nw** | Width descriptor in a srcset-like candidate (integer + `w`). |
| **extImg** | Boolean: when true, resolve relative image URLs against the page origin via the URL API. |
| **page origin** | `new URL(listingPageUrl).origin` of the scraped listing URL. |

## 3. Requirements, Constraints & Guidelines

### Requirements

- **REQ-001**: If `access.image` is missing, empty, or falsy, the item’s `image` field MUST be `null`. Do not search for a default `img`.
- **REQ-002**: If the image selector matches no element, `image` MUST be `null`. The news item MUST still be emitted if `title` or `link` is present (image absence MUST NOT drop the item).
- **REQ-003**: Use only the **first** matching image node under the current `main` element.
- **REQ-004**: Classification is by the **matched element’s tag name**, not by parsing the selector string. If the tag is `img`, use the img path (REQ-005). Otherwise use the non-img path (REQ-006).
- **REQ-005** (img path): Resolve raw URL in this order, first non-empty wins:
  1. `src`
  2. `data-src`
  3. `data-lazy-src`
  4. `srcset` via **REQ-008**
  5. `data-srcset` via **REQ-008**
- **REQ-006** (non-img path): Resolve raw URL in this order, first non-empty wins:
  1. `data-bgset` via **REQ-008**
  2. `style` via **REQ-009**
  3. Same attribute chain as **REQ-005** (`src` → `data-src` → `data-lazy-src` → `srcset` → `data-srcset`)
- **REQ-007**: If no usable raw URL is found, `image` MUST be `null`.
- **REQ-008** (pick widest / first): For a srcset-like string:
  - Split on `,`
  - For each part, match `^(\S+)(?:\s+(\d+)w)?` (case-insensitive `w`)
  - Prefer the candidate with the **largest** numeric `Nw`
  - If no part has an `Nw`, use the **first** token URL
  - Empty / missing input → no value
- **REQ-009** (style): From the `style` attribute, match the first `url(...)` with pattern `url\(\s*['"]?([^'")]+)['"]?\s*\)` (case-insensitive `url`). Return the captured URL trimmed. No match → no value. Density descriptors and later `url(...)` entries are ignored.
- **REQ-010** (absolutize): After raw resolution, apply `abs(pageOrigin, rawUrl, access.extImg)`:
  - If `rawUrl` is null/empty → `null`
  - If `extImg` is false and raw matches `^https?:\/\/` (case-insensitive) → return raw unchanged
  - If `extImg` is false and raw is not absolute http(s) → return raw unchanged
  - If `extImg` is true → `new URL(rawUrl, pageOrigin).href`, or raw on constructor failure

### Constraints

- **CON-001**: No new `access` fields are required for this behavior (no `imageAttr` / `cssImageAttr`).
- **CON-002**: Do not invent URLs from child nodes when the selected node has no resolvable URL.
- **CON-003**: Behavior MUST match `web_scraping/scrape.js` for the cases in §9; that file is the parity oracle.

### Guidelines

- **GUD-001**: Keep extraction in a small pure helper (e.g. `rawImageUrl(node)`) called from the scrape loop; avoid duplicating attribute order in call sites.
- **GUD-002**: Prefer decoding HTML entities in attributes before parsing `style` (Cheerio does this by default).

### Patterns

- **PAT-001**: Non-`img` thumbs (e.g. `a.penci-image-holder`, Tailwind `div` with `bg-cover`) → `data-bgset` / `style` first.
- **PAT-002**: Lazy `img` → `data-src` / `data-lazy-src` / `srcset` after empty `src`.

## 4. Interfaces & Data Contracts

### 4.1 Access fields (image-related)

| Field | Type | Role |
|-------|------|------|
| `image` | string | CSS selector; empty → skip image (`null`) |
| `extImg` | boolean | Absolutize resolved image URL against page origin |

### 4.2 Output field

| Field | Type | Meaning |
|-------|------|---------|
| `image` | string \| null | Final image URL after extraction + `abs`, or `null` |

### 4.3 Pseudocode (normative order)

```text
rawImageUrl(node):
  if node is missing → null
  if node.tag == "img":
    return imgAttrUrl(node)
  return pickWidestUrl(node.data-bgset)
      || pickFromStyle(node.style)
      || imgAttrUrl(node)

imgAttrUrl(node):
  return node.src
      || node.data-src
      || node.data-lazy-src
      || pickWidestUrl(node.srcset)
      || pickWidestUrl(node.data-srcset)
      || null

finalImage = abs(pageOrigin, rawImageUrl(firstMatch(access.image)), access.extImg)
```

## 5. Acceptance Criteria

- **AC-001**: Given `access.image` is `""`, When an item is scraped, Then `image` is `null`.
- **AC-002**: Given a matched `img` with only `data-src="https://cdn.example/a.jpg"`, When extracted, Then `image` is that URL (subject to `extImg`).
- **AC-003**: Given a matched `img` with `srcset="https://cdn.example/s.jpg 365w, https://cdn.example/l.jpg 585w"`, When extracted, Then `image` is `https://cdn.example/l.jpg`.
- **AC-004**: Given a matched `a` with `data-bgset="https://cdn.example/bg.jpg"` and a `style` containing another URL, When extracted, Then `image` is the `data-bgset` URL.
- **AC-005**: Given a matched `div` with only `style="background-image:url(https://cdn.example/x.webp)"` (no quotes), When extracted, Then `image` is `https://cdn.example/x.webp`.
- **AC-006**: Given a matched `a` with `style` containing `url("https://cdn.example/q.jpg")` (or HTML-entity quotes decoded to `"`), and no `data-bgset`, When extracted, Then `image` is `https://cdn.example/q.jpg`.
- **AC-007**: Given `extImg: true` and raw `/uploads/a.jpg` with page origin `https://media.example`, When absolutized, Then `image` is `https://media.example/uploads/a.jpg`.
- **AC-008**: Given `extImg: false` and raw `/uploads/a.jpg`, When absolutized, Then `image` is `/uploads/a.jpg` (unchanged).
- **AC-009**: Given no resolvable URL on the matched node, When scraped, Then `image` is `null` and the item is still produced if title or link exists.
- **AC-010**: Given `srcset` with only density descriptors and no `Nw`, When extracted, Then the first URL token is used (densities ignored).

## 6. Test Automation Strategy

- **Test Levels**: Unit tests for `pickWidestUrl`, `pickFromStyle`, `rawImageUrl`, and `abs`; optional integration against fixture HTML snippets (no live network required).
- **Frameworks**: Whatever the API already uses for unit tests (e.g. Node `assert` / existing test runner). Prefer fixtures over live sites.
- **Test Data Management**: Inline HTML strings from §9; no production credentials.
- **CI/CD Integration**: Run unit tests on PR for the scrape/image helper module.
- **Coverage Requirements**: Cover REQ-005, REQ-006, REQ-008, REQ-009, REQ-010 and AC-001–AC-010.
- **Performance Testing**: Not required for this change.

## 7. Rationale & Context

Many listing pages do not put the thumbnail in `img[src]`. Common patterns:
- Theme “image holder” anchors with `data-bgset` and `background-image` in `style` (e.g. Penci).
- Decorative `div`s with Tailwind `bg-cover` and inline `background-image`.

The previous backend path (`element.find(image).attr('src')` only) fails those cases. The web_scraping tooling already implements a fuller resolver; the backend MUST adopt the same algorithm so exported selectors and production scrape stay consistent.

Empty `image` remains an explicit skip so incomplete configs do not invent thumbnails.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: News medium listing HTML — source DOM for extraction.

### Third-Party Services
- None specific to image URL resolution.

### Infrastructure Dependencies
- **INF-001**: Existing scrape job that loads listing HTML into a DOM parser (Cheerio or equivalent).

### Data Dependencies
- **DAT-001**: Per-medium `access` config including `image` and `extImg` (from Strapi / migration payload).

### Technology Platform Dependencies
- **PLT-001**: DOM attribute access and CSS selection equivalent to Cheerio’s `.attr`, `.is('img')`, `.find`.
- **PLT-002**: WHATWG URL resolution for `extImg: true`.

### Compliance Dependencies
- None.

## 9. Examples & Edge Cases

### 9.1 Non-img with data-bgset + style (Penci-like)

```html
<a class="penci-image-holder"
   style="background-image: url(&quot;https://example.com/a-585x329.jpg&quot;);"
   data-bgset="https://example.com/a-585x329.jpg"
   href="/story/"></a>
```

Selector: `a.penci-image-holder` → raw = `data-bgset` URL.

### 9.2 Non-img style only (Tailwind-like)

```html
<div class="h-[300px] bg-cover"
     style="background-image:url(https://cdn.example/photo.webp)"></div>
```

Selector: that `div` → raw = `https://cdn.example/photo.webp`.

### 9.3 Img srcset widest

```html
<img srcset="https://cdn.example/s.jpg 365w, https://cdn.example/l.jpg 585w" />
```

→ `https://cdn.example/l.jpg`.

### 9.4 Img lazy attr

```html
<img data-src="https://cdn.example/lazy.jpg" />
```

→ `https://cdn.example/lazy.jpg`.

### 9.5 Empty selector

`image: ""` → `null` (no node lookup).

## 10. Validation Criteria

- [ ] Unit tests pass for AC-001–AC-010
- [ ] `alta-voz-api` scrape image path no longer relies solely on `.attr('src')` when other attrs/style provide a URL
- [ ] Side-by-side check: same fixture HTML + same `access.image` yields the same `image` string as `web_scraping/scrape.js` helpers
- [ ] No new required fields added to `access` schema for this feature

## 11. Related Specifications / Further Reading

- Reference implementation: `web_scraping/scrape.js` (`rawImageUrl`, `abs`)
- Agent docs: `web_scraping/docs/agent/scraping.md` (image field description)
- Current backend call site to replace: `alta-voz-api/src/api/scrape/controllers/scrape.js` (image via `.attr('src')` only)
