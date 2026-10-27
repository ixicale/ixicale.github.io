# [ixicale.github.io](https://ixicale.github.io)

This is the repository for my personal website. It is built using Jekyll and hosted on GitHub Pages.

## Made with

- [Jekyll](https://jekyllrb.com/)
- [GitHub Pages](https://pages.github.com/)
- [Bulma](https://bulma.io/)
- [Font Awesome](https://fontawesome.com/)

No build tools and no JavaScript libraries. The scripts are plain JavaScript.

## How to change the site

| To change | Edit |
| --- | --- |
| Page text (titles, about me, buttons, menu) | `_data/content.yml` |
| Jobs and the projects in each job | `_data/experience.yml` |
| Personal projects | `_data/projects.yml` |
| Skills | `_data/skills.yml` |
| Contact links (email, LinkedIn, GitHub) | `_data/social.yml` |
| Name, email, SEO text, preview image | `_config.yml` |
| Colors, radius, shadows | `_sass/_tokens.scss` |
| Order of the sections | `index.html` |

## Project structure

```
_config.yml              Site settings
_data/                   All content (YAML)
_layouts/default.html    Page frame
_includes/
  head.html              Meta tags, SEO, CSS
  scripts.html           JavaScript files
  components/            Small parts used many times (navbar, footer, tags, modal)
  sections/              One file for each page section
_sass/
  _tokens.scss           Design tokens (light and dark theme)
  _base.scss             Page-wide rules
  components/            Styles for _includes/components
  sections/              Styles for _includes/sections
assets/
  css/main.scss          Entry file for the styles
  js/                    theme.js, navbar.js, modal.js, typing.js
  images/                Icons, company logos, preview image
```

## Run on your computer

```bash
./local.sh --deploy   # http://localhost:4000
./local.sh --remove
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### If you like my work, consider buying me a [Ko-fi](https://ko-fi.com/ixicale) 🍵 and help me with a star ⭐
