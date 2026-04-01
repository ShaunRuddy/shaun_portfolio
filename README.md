# Engineering portfolio (static site)

Single-page portfolio: `index.html`, `styles.css`, and `main.js` load copy and project data from **`content.json`**.

## Editing content

- **Global copy, hero, about, skills, experience, contact:** edit fields in `content.json`.
- **Projects:** add objects under `projects.hardware` or `projects.software` (order in the array is the order on the page).

For field-by-field notes, image rules, and a checklist, see **`PROJECT_TEMPLATE.md`**.

---

## Project template (`content.json`)

### Minimal (required fields)

Add one object per project; keep valid JSON (commas between items, no trailing comma after the last property).

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

### Full example (wide card, images, constraints)

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
    "items": ["&lt;5 kg", "Outdoor IP rating", "Budget under $500"]
  },
  "result": "Result: Grade A · Passed vibration test at X Hz."
}
```

**Required on every project:** `id`, `title`, `description`, `result`, `tags`, `placeholder` (with at least `emoji`).  
**Optional:** `layout` (`"wide"` only), `images`, `constraints`, and `placeholder.label` (used with wide layout for the banner).
