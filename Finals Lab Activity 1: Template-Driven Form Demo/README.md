# Template-Driven Form — Angular Forms Lab

An Angular 18 standalone application demonstrating a **Template-Driven Form** with validation, three additional fields (Gender, Status, Comments), and polished CSS styling.

---

## Features

| Field | Type | Validation |
|-------|------|------------|
| Username | Text input | Required, min 3 chars |
| Email | Email input | Required, valid email |
| Password | Password input | Required, min 6 chars |
| Role | Select dropdown | Required |
| **Gender** | Radio buttons | **Required** |
| **Employment Status** | Radio buttons | **Required** |
| **Comments / Notes** | Textarea | Optional |

- Submit button disabled until all required fields are valid  
- Inline error messages on touched/invalid fields  
- Success summary card after submission  
- Responsive layout with DM Serif Display + DM Sans typography  

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR-USERNAME/Template-Driven.git
cd Template-Driven

# 2. Install dependencies
npm install

# 3. Run dev server
npm start
# → http://localhost:4200
```

---

## Build for Production

```bash
npm run build
# Output: dist/angular-forms/browser/
```

---

## Deploy to Netlify

### Option A — Netlify CLI (recommended)

```bash
# Install CLI (once)
npm install -g netlify-cli

# Login
netlify login

# Deploy from project root
netlify deploy --prod
# When prompted:
#   Publish directory: dist/angular-forms/browser
```

### Option B — Netlify Dashboard (drag & drop)

1. Run `npm run build`
2. Go to **https://app.netlify.com**
3. Drag the `dist/angular-forms/browser` folder onto the deploy area
4. Your site is live! Copy the URL.

### Option C — GitHub Auto-Deploy

1. Push this repo to GitHub as **Template-Driven**
2. Go to **https://app.netlify.com → Add new site → Import from Git**
3. Select your repo
4. Build settings (auto-detected via `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist/angular-forms/browser`
5. Click **Deploy site**

The `netlify.toml` already handles Angular SPA routing (redirects `/*` → `index.html`).

---

## Project Structure

```
src/
└── app/
    ├── template-demo/
    │   ├── template-demo.component.ts      ← Component class + properties
    │   ├── template-demo.component.html    ← Template with ngModel + ngForm
    │   └── template-demo.component.css     ← Scoped styles
    ├── app.component.ts
    ├── app.config.ts
    └── app.routes.ts
```

---

## Submission

- **Netlify URL:** `https://YOUR-SITE.netlify.app`
- **GitHub Repo:** `https://github.com/YOUR-USERNAME/Template-Driven`
