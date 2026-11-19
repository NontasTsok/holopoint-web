# Holopoint website

One-page static site for Holopoint, a trading card game shop opening in Larisa, Greece. Its job is to give the shop a credible online presence before it opens. An online shop will come later, on a separate platform.

- Live at https://nontastsok.github.io/holopoint-web/
- Hosted on GitHub Pages, deployed from `main` at the repo root. Every push to `main` goes public within a minute or two.

## This repo is public

Everything committed here is visible to anyone, including this file, commit messages and git history.

- Only commit information the shop intends to publish.
- Never commit secrets, private contact details, personal information about the people involved, or internal business notes (suppliers, pricing, applications in progress).
- If a task needs that kind of information, keep it out of the repo and ask where it should live.

## Layout

| Path | What it holds |
| --- | --- |
| `index.html` | Page structure and all Greek text |
| `js/main.js` | English text (the `en` object at the top), language switch, animations |
| `css/style.css` | Styles, colour tokens (`:root`), animation keyframes |
| `assets/fonts/` | Manrope, Greek and Latin subsets, self-hosted |
| `README.md` | How to preview, edit and publish, written for a human maintainer |

There is no build step and there are no dependencies. Keep it that way unless asked.

## Rules that are easy to break

- **Two languages.** Greek is the default and lives in the HTML. English is in `js/main.js`, matched by the element's `data-i18n` key. Any text change needs both. Product names that are the same in both languages (Booster Packs, Elite Trainer Boxes) have no key.
- **No third-party requests.** The footer says the site uses no cookies and no tracking. Fonts are self-hosted and the map is a link, not an embed. Adding analytics, an embedded map, a CDN font or a form service makes that statement false, so raise it first.
- **Original branding only.** Game names appear as text. No Pokémon logos, characters, card layouts or official artwork. The hero cards are abstract on purpose.
- **Unknown details are left off the page.** No bracketed placeholders and no links to `#`. Still unknown: phone, email, social links, opening date, opening hours, legal details (business name, ΑΦΜ, ΔΟΥ, Γ.Ε.ΜΗ.). `README.md` says where each one goes when it arrives.
- **The address appears in several places.** The address row and map card in `index.html`, two Google Maps links (`query=` parameter), and `visit.address` / `visit.map.city` in `js/main.js`.
- **Typography.** Manrope for everything. Very wide display faces were tried and rejected because headings looked squashed, especially on phones. Any new font must cover Greek.
- **Greek uppercase.** Text uppercased with CSS relies on `lang="el"` to drop accents, and the page switches to `lang="en"` in English mode. Greek that stays Greek in both languages should be typed in capitals without accents.
- **Tone.** Friendly and informal, singular "εσύ", with the polite plural when addressing parents. Welcoming to beginners, but it has to read as a trustworthy business.
- **Motion.** All animation must switch off under `prefers-reduced-motion`. Scroll-reveal content is hidden only when the `js` class is on `<html>`, so the page stays readable without JavaScript.

## Preview and checking

```sh
python3 -m http.server 8765
```

Open http://localhost:8765, or add `?lang=en` for English.

Check changes at about 390px and 1440px wide, in both languages. Headless Chrome ignores `--window-size` widths under roughly 500px and crops the screenshot instead, which looks like horizontal overflow. Use device emulation through the DevTools protocol for phone widths. Scroll through the page before a full-page screenshot, or the sections below the fold will still be hidden.

## Git

The owner usually commits and pushes. Do not commit or push unless asked, and remember that a push to `main` publishes.
