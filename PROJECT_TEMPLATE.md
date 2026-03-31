# How to add a project (`content.json`)

Projects live under `projects.hardware` or `projects.software` as **arrays of objects**. Pick the list that fits the work (physical systems vs. code / algorithms / ML). Order inside each array is the order shown on the site.

---

## Required fields (every project)

| Field | Type | Notes |
|--------|------|--------|
| `id` | string | Unique slug, e.g. `"my-robot-arm"`. Letters, numbers, hyphens. |
| `title` | string | Project name shown as the card heading. |
| `description` | string | Short paragraph: what you built and your role. Plain text (no HTML). |
| `result` | string | Outcome line: metrics, grade, deployment, or one punchy sentence. |
| `tags` | array of strings | Shown as uppercase chips, joined with ` · `. Example: `["ROS2", "Python"]`. |
| `placeholder` | object | Used when there are **no** images (or empty `images`). |
| `placeholder.emoji` | string | Single emoji for the grey media area. |
| `placeholder.label` | string | **Optional.** If set **and** `layout` is `"wide"`, shows the capstone-style banner (emoji + label) instead of a small emoji-only box. |

---

## Optional fields

| Field | Type | Notes |
|--------|------|--------|
| `layout` | string | Only value used by the site: `"wide"`. Makes the card span two columns on desktop (good for flagship projects). Omit on normal cards. |
| `images` | array | Paths to images **relative to the site root** (same folder as `shaun_ruddy_portfolio.html`). See below. |
| `constraints` | object | Extra paragraph with a **bold** label + bullet-style line. Common for design specs. |
| `constraints.label` | string | e.g. `"Design Constraints"`. |
| `constraints.items` | array of strings | Each item is joined with ` · `. Use `&lt;` in JSON if you need a literal `<` (e.g. mass limits). |

---

## Images

- Put files in `assets/` (or another folder next to the HTML) and reference them like `"assets/screenshot.png"`.
- **One image:** shown full-width.
- **Two or more:** shown as a **carousel** (prev/next, dots, swipe on touch).
- Each entry can be:
  - a **string** (path only), or  
  - an **object** `{ "src": "assets/photo.png", "alt": "Short description for accessibility" }` (recommended).

If `images` is missing or `[]`, the `placeholder` emoji (and optional wide label) is used.

---

## Minimal example (software-style)

Add this object inside `"software": [ ... ]` (or `"hardware": [ ... ]`), with commas between projects as usual:

```json
{
  "id": "example-minimal",
  "placeholder": { "emoji": "🔧" },
  "tags": ["Tag One", "Tag Two"],
  "title": "Project Title",
  "description": "What you did in two or three sentences. Mention tools, goal, and your contribution.",
  "result": "One line: outcome, metric, or status."
}
```

---

## Full example (hardware-style, wide card, images, constraints)

```json
{
  "id": "my-capstone-project",
  "layout": "wide",
  "placeholder": {
    "emoji": "🚁",
    "label": "CAPSTONE — SHORT LABEL"
  },
  "images": [
    {
      "src": "assets/project-hero.png",
      "alt": "Render of the assembly"
    },
    {
      "src": "assets/project-detail.png",
      "alt": "CAD section view"
    }
  ],
  "tags": ["Capstone", "CAD", "FEA"],
  "title": "Human-readable project name",
  "description": "Longer description: problem, approach, what you personally owned (analysis, build, tests).",
  "constraints": {
    "label": "Design Constraints",
    "items": [
      "&lt;5 kg",
      "Outdoor IP rating",
      "Budget under $500"
    ]
  },
  "result": "Result: Grade A · Passed vibration test at X Hz."
}
```

---

## Checklist before you save

1. Valid JSON: commas between objects/properties, no trailing comma after the last item in an object/array.
2. `id` is unique across **both** `hardware` and `software`.
3. Image paths work when you open the site from the project folder (use a local server so `content.json` loads).
4. `&` in text: in JSON strings you can write `\u0026` for `&` if needed inside words; for HTML-like `&lt;` use the entity in the string as shown above.

---

## Where this is rendered

`main.js` reads `content.json` and builds the Portfolio section: category titles come from `projects.categories`, and each list under `projects.hardware` / `projects.software` is rendered as project cards with optional carousel.
