# Holopoint website

One-page static site for the Holopoint trading card game shop in Larisa. Greek by default, with an English switch. No build step and no dependencies.

## Preview locally

```sh
python3 -m http.server 8765
```

Then open <http://localhost:8765>. Add `?lang=en` to open it in English.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page structure and all Greek text |
| `js/main.js` | English text (the `en` object at the top) and the animations |
| `css/style.css` | Styles, colours and animation definitions |
| `assets/fonts/` | Syne and Manrope, self-hosted (SIL Open Font License) |

When you change a Greek sentence in `index.html`, change the matching English one in `js/main.js`. The two are linked by the `data-i18n` key on the element.

## Details still to fill in

Every placeholder is marked with a `data-todo` attribute in `index.html`:

```sh
grep -n "data-todo" index.html
```

- `address`: street address
- `phone` and `email`: there is an example link format in the comment above each one
- `instagram`, `facebook`, `tiktok`: the links currently point to `#`
- `map`: replace the search query in the link with the exact address
- `legal`: registered business name, ΑΦΜ, ΔΟΥ and Γ.Ε.ΜΗ. number in the footer

Opening hours currently read "Θα ανακοινωθεί σύντομα". The Greek is in `index.html` and the English is `visit.hours` in `js/main.js`.

The hero badge reads "Ανοίγουμε σύντομα". Swap in the month once it is fixed (`hero.badge` for the English).

## Publish on GitHub Pages

1. Commit and push to `main`.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`.
4. The site appears at `https://<username>.github.io/holopoint-web/` after a minute or two.

For a custom domain, enter it on the same settings page and add the DNS records GitHub shows.
