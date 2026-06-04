# AGENTS.md

IMPORTANT:
This file must be read before implementing any feature, refactor, bug fix, UI change, or architectural decision.

The purpose of this document is to ensure all AI-generated code follows the same architecture, conventions, design language, and product vision.

---

# PROJECT

Name: CodeSprint

CodeSprint is a developer-focused typing platform that helps users improve coding typing speed using real programming code snippets instead of plain text.

The product focuses on:

- Syntax muscle memory
- Coding speed
- Programming fluency
- Real-world code patterns

The goal is NOT to build another typing website.

The goal is to build the best coding typing experience possible.

---

# AI ROLE

Act as a Senior Frontend Engineer.

Responsibilities:

- Write production-quality code
- Prefer simplicity over cleverness
- Optimize for maintainability
- Follow existing project architecture
- Keep UX fast and frictionless
- Avoid unnecessary abstractions
- Avoid premature optimization

When making decisions:

1. Choose the simplest solution that works.
2. Avoid introducing complexity for future possibilities.
3. Prioritize developer experience.
4. Prioritize user experience over technical elegance.

---

# PRODUCT VISION

CodeSprint should feel like:

- MonkeyType for developers
- Fast
- Minimal
- Focused
- Modern
- Premium

The user should be able to:

1. Open the application
2. Choose language
3. Choose difficulty
4. Choose duration
5. Start typing immediately
6. See results
7. Start another test

Everything else is secondary.

If a feature does not improve this loop, question whether it belongs in V1.

---

# MVP SCOPE

Supported Languages:

- Java
- Python
- JavaScript
- C++

Difficulty Levels:

- Beginner
- Intermediate
- Advanced

Durations:

- 30 seconds
- 60 seconds
- 120 seconds

Live Metrics:

- WPM
- Accuracy
- Time Remaining

Results Metrics:

- WPM
- Accuracy
- Errors
- Characters Typed

---

# TECH STACK

Frontend:

- React
- TypeScript
- Vite

Styling:

- Tailwind CSS

State Management:

- React Hooks
- Context only if absolutely necessary

Routing:

- React Router (if routing becomes necessary)

Data:

- Local JSON snippets (V1)

Backend:

- None (V1)

Deployment:

- Vercel

---

# ARCHITECTURE

The application is intentionally simple.

Single-page application.

NO landing page.

NO authentication.

NO dashboard.

NO onboarding.

NO sidebar.

NO complex routing.

Flow:

Selection Controls
↓
Typing Area
↓
Results Screen

Everything happens on a single screen.

---

# PROPOSED FOLDER STRUCTURE

src/

├── components/
│
├── features/
│   ├── typing/
│   ├── results/
│   ├── language-selector/
│   ├── difficulty-selector/
│   └── duration-selector/
│
├── hooks/
│
├── data/
│   └── snippets/
│
├── lib/
│
├── types/
│
├── constants/
│
├── utils/
│
├── styles/
│
└── App.tsx

---

# CORE ENGINE RULES

The typing engine is the heart of the application.

All typing logic should live inside:

features/typing

or

hooks/useTypingEngine.ts

Do NOT scatter typing logic across components.

The engine must track:

- Current snippet
- Current character index
- Typed characters
- Errors
- Accuracy
- WPM
- Timer
- Test state

Test States:

IDLE
RUNNING
FINISHED

Use a finite-state approach whenever possible.

---

# UI PHILOSOPHY

The UI must remain:

- Minimal
- Focused
- Clean
- Premium

Avoid:

- Decorative elements
- Visual clutter
- Heavy shadows
- Excessive animations
- Large gradients
- Glassmorphism

Every element should have a purpose.

---

# DESIGN SYSTEM

Theme:

Dark-first.

Developer-centric.

Inspired by:

- MonkeyType
- Linear
- Raycast
- Vercel

NOT inspired by:

- Dribbble concepts
- Neon gaming dashboards
- SaaS admin templates

---

# COLOR RULES

Primary Background:

#060B14

Secondary Background:

#0E1525

Surface:

#111827

Border:

#1F2937

Primary Text:

#F8FAFC

Secondary Text:

#94A3B8

Accent:

#22D3EE

Success:

#22C55E

Error:

#EF4444

Warning:

#F59E0B

---

# IMPORTANT DESIGN CONSTRAINT

Do NOT overuse the accent color.

Accent color exists for:

- Active tab
- Selected option
- Cursor
- CTA button

Nothing else.

The interface should feel calm.

Most of the UI should use neutral colors.

If everything glows, nothing stands out.

---

# TYPOGRAPHY

Primary Font:

Inter

Code Font:

JetBrains Mono

Rules:

- Use consistent spacing
- Avoid oversized headings
- Prioritize readability
- Keep code snippets visually dominant

---

# UX RULES

The typing experience must feel instant.

Avoid:

- Loading states
- Delays
- Page refreshes
- Navigation after test completion

Results should replace the typing area in-place.

The user should never lose context.

---

# ACCESSIBILITY

Always:

- Support keyboard navigation
- Maintain sufficient contrast
- Use semantic HTML
- Provide visible focus states

Never remove accessibility for aesthetics.

---

# COMPONENT RULES

Components should:

- Be small
- Be reusable
- Have a single responsibility

Avoid:

- Components exceeding ~300 lines
- Deep prop drilling
- Massive files

If a component becomes too large:

Extract:

- hooks
- utilities
- child components

---

# TYPESCRIPT RULES

Always:

- Use strict typing
- Define interfaces
- Avoid any

Prefer:

interface

over

type

unless unions are required.

---

# TAILWIND RULES

Prefer:

- Tailwind utilities

Avoid:

- Inline styles
- CSS files unless necessary
- Tailwind class duplication

When repeated styles appear:

Create reusable components.

---

# PERFORMANCE RULES

Do not optimize prematurely.

However:

- Avoid unnecessary re-renders
- Memoize only when justified
- Keep state localized

Simplicity > micro-optimization.

---

# DATA RULES

V1 snippets are stored locally.

Location:

data/snippets

Example:

java.json
python.json
javascript.json
cpp.json

Structure:

{
  "language": "java",
  "difficulty": "beginner",
  "snippet": "int age = 20;"
}

Do not introduce databases in V1.

---

# TESTING RULES

Critical logic to test:

- WPM calculations
- Accuracy calculations
- Timer behavior
- Error tracking
- State transitions

UI testing is secondary.

Typing engine correctness is primary.

Stay focused on the core typing loop.

---

# DECISION RULES

Before introducing:

- New dependency
- New library
- New state management solution
- New architectural pattern

ASK FIRST.

Do not install packages without approval.

---

# UI CHANGE RULE

Before significantly changing:

- Layout
- Navigation
- Design language
- Color system
- User flow

ASK FIRST.

Preserve the established product vision.

---

# CODE QUALITY CHECKLIST

Before completing any task verify:

- TypeScript has no errors
- No unused code
- No duplicated logic
- Components remain focused
- Accessibility is preserved
- UX remains fast
- Architecture remains simple

---

# FINAL REMINDER

Read this file before every task.

Every feature, component, refactor, bug fix, and design decision must comply with this document.

Consistency is more important than creativity.