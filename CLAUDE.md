# CLAUDE.md - AI Assistant Guide for rogersans.me

## Project Overview

This is **Roger Sans's personal portfolio website** - a static single-page application showcasing his work as a Product Designer. The site features a homepage with an about section, project showcase, work experience, and contact form, along with detailed project case study pages.

## Tech Stack

- **HTML5** - Single `index.html` file containing all pages
- **CSS3** - Custom styles in `styles.css` with CSS variables
- **Vanilla JavaScript** - Minimal JS in `script.js` for interactivity
- **Google Fonts** - Inter font family
- **FormSubmit** - Third-party service for contact form handling

## Codebase Structure

```
rogersans.me/
├── index.html          # Main HTML file (all pages)
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── profilepic.png      # Profile picture
├── README.md           # Basic readme
└── Assets/
    ├── *.svg           # Project logos (tiles, studio, nuvix, riotgames)
    ├── Tiles/          # Tiles project images
    ├── Studio/         # Studio project images
    ├── Nuvix/          # Nuvix project images
    ├── League of Legends/  # LoL project images
    └── logos/          # Company/brand logos
```

## Key Files

### index.html
Contains all pages in a single file:
- **Homepage** (`.page-home`): Header, About, Projects list, Experience, Contact form
- **Project Pages** (`.page-project`): Individual case study pages for each project
  - `#tiles-page` - Tiles app (iOS exploration app)
  - `#studio-page` - StudioApp (tattoo studio management)
  - `#nuvix-page` - Nuvix (AI news podcast platform)
  - `#lol-page` - League of Legends (Riot Games partnership)

### styles.css
CSS organization:
1. **Reset & Variables** (lines 1-13) - CSS custom properties in `:root`
2. **Layout** (lines 28-76) - Pages wrapper, flexbox layout
3. **Components** - Header, section cards, project list, experience list
4. **Interactive States** - Hover effects with brand colors
5. **Responsive Design** - Media queries at 1700px, 1300px, 900px, 600px, 500px

**CSS Variables:**
```css
--bg: #000;           /* Background (black) */
--text: #fff;         /* Primary text (white) */
--text-secondary: #888; /* Secondary text (gray) */
--accent: #fff;       /* Accent color */
--font: 'Inter', ...  /* Font stack */
```

### script.js
Two main features:
1. **Contact Form** (lines 1-74) - Form validation and AJAX submission
2. **Project Navigation** (lines 76-140) - `openProject()` and `closeProject()` functions

## Conventions

### HTML Structure
- Use semantic elements: `<header>`, `<section>`, `<main>`, `<footer>`
- Section cards use `.section-card` class with `.section-title` for headings
- Project pages follow consistent structure: header with back/CTA buttons, banner, section cards

### CSS Patterns
- **BEM-like naming**: `.section-card`, `.section-title`, `.project-list`
- **Component modifiers**: `.experience-tiles`, `.experience-antler` for hover colors
- **Spacing**: 16px gaps, 24px padding for cards, 48px container padding
- **Border radius**: 24px for cards/buttons, 18px for smaller elements, 100px for pills
- **Transitions**: `0.2s ease` for simple, `0.6s cubic-bezier(0.34, 1.56, 0.64, 1)` for spring

### Brand Colors (hover states)
- **Tiles**: `#fff` (white)
- **Studio**: `#E2FF8E` (lime green)
- **Nuvix**: `#D1A2FF` (purple)
- **League of Legends**: `#FFD874` (gold)
- **Antler**: `#FF303C` (red)
- **MobyFox**: `#00BDA8` (teal)
- **WebTVAsia**: `#FF0000` (red)

### JavaScript Patterns
- Use `DOMContentLoaded` event for initialization
- Form validation with regex for email
- CSS class toggling for state management (`.active`, `.visible`)
- Functions exposed globally: `openProject()`, `closeProject()`

## Development Workflow

### Local Development
Open `index.html` directly in a browser - no build process required.

### Adding a New Project
1. Add project logo SVG to `Assets/`
2. Create image folder in `Assets/[ProjectName]/`
3. Add project to the project list in homepage section
4. Add project link to the projects list in index.html
5. Create new `.page-project` div with unique ID (e.g., `#newproject-page`)
6. Add data-project attribute to link: `data-project="newproject"`
7. Add hover color styles in CSS for the new project

### Modifying Experience
Add new experience items following the pattern:
```html
<li>
    <a href="[URL]" target="_blank" class="experience-link experience-[name]">
        <img src="Assets/logos/[logo]" alt="[Company] logo" class="experience-logo">
        <div class="experience-info">
            <span class="experience-name">[Company]</span>
            <span class="experience-role">[Role]</span>
        </div>
        <span class="experience-date">[Date]</span>
    </a>
</li>
```

### Contact Form
- Uses FormSubmit.co AJAX endpoint
- Sends to: `roger.works@icloud.com`
- No backend required

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| > 1700px   | Two-column: 800px home + 800px project |
| 1300-1700px| Two-column: 600px each |
| 900-1300px | Two-column: 500px each |
| < 900px    | Single column, project pages overlay |
| < 600px    | Split sections stack vertically |
| < 500px    | Project/experience grids become single column |

## Important Notes

- All project pages exist in DOM at load time (hidden with `width: 0`)
- Images use `.webp` format for optimization
- No JavaScript framework or build tools - pure vanilla
- Dark theme only (no light mode toggle)
- Copyright year is hardcoded to 2026 in footer

## Quick Commands

```bash
# Preview locally
open index.html

# Check file sizes
ls -lh *.html *.css *.js

# Find all image assets
find Assets -type f -name "*.png" -o -name "*.webp" -o -name "*.svg"
```
