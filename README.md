# gpmf-studio-site

The GitHub Pages source for the GPMF Studio download site:
https://cabargas.com/gpmf-studio-site

Plain HTML/CSS/JS, no build step. Installers are built and hosted separately
in [gpmf-studio-releases](https://github.com/felipecabargas/gpmf-studio-releases);
this site only links to them.

## Local development

```bash
python3 -m http.server 8090
```

Then open http://localhost:8090/index.html

## Tests

```bash
node --test test/
```
