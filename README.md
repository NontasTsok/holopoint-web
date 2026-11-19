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
| `assets/fonts/` | Manrope, self-hosted (SIL Open Font License) |
| `assets/cards/` | The three card images in the hero (temporary; to be replaced before the shop opens) |

When you change a Greek sentence in `index.html`, change the matching English one in `js/main.js`. The two are linked by the `data-i18n` key on the element.

When you change `css/style.css` or `js/main.js`, raise the `?v=` number on both links in `index.html`. Without that, visitors' browsers can show the new page with an old saved stylesheet for a few minutes, and the layout breaks.

## Details still to add

These were left off the page until they are known:

- Phone, email and social links: add them as rows in the `visit__list` block in `index.html`, next to the address.
- Legal details (registered business name, ΑΦΜ, ΔΟΥ, Γ.Ε.ΜΗ. number): add them as a line in the footer.
- Opening hours: the page reads "Θα ανακοινωθεί σύντομα". The Greek is in `index.html` and the English is `visit.hours` in `js/main.js`.
- Opening date: the hero badge reads "Ανοίγουμε σύντομα". Swap in the month once it is fixed (`hero.badge` for the English).

The address appears in three places: the address row and the map card in `index.html`, and `visit.address` / `visit.map.city` in `js/main.js`. Both Google Maps links in `index.html` carry it in their `query=` parameter.

## Publish on GitHub Pages

1. Commit and push to `main`.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`.
4. The site appears at `https://<username>.github.io/holopoint-web/` after a minute or two.

For a custom domain, enter it on the same settings page and add the DNS records GitHub shows.
