# RMX Labs - Design System

## Pattern: Immersive + Interactive

- **CTA**: Above fold
- **Sections**:
    1. Hero
    2. Features
    3. CTA

## Style: Dark Mode (OLED) / Tech / Future

- **Keywords**: Dark theme, low light, high contrast, deep black, midnight blue, futuristic, innovative.
- **Best For**: Tech companies, startups, developer tools.
- **Performance**: ⚡ Excellent
- **Accessibility**: ✓ WCAG AAA

## Colors (Dark Mode Adjusted)

| Role | Hex | Tailwind Equivalent |
|------|-----|-------------------|
| **Background** | `#020617` | `bg-slate-950` |
| **Surface** | `#0F172A` | `bg-slate-900` |
| **Primary** | `#3B82F6` | `blue-500` |
| **Secondary** | `#60A5FA` | `blue-400` |
| **Accent/CTA** | `#F97316` | `orange-500` |
| **Text Primary** | `#F8FAFC` | `text-slate-50` |
| **Text Secondary** | `#94A3B8` | `text-slate-400` |

## Typography

- **Headings**: `Space Grotesk` (Tech/Modern)
- **Body**: `DM Sans` (Clean/Readable)
- **Google Fonts**:

  ```css
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  ```

- **Usage**:
  - `font-display`: Space Grotesk
  - `font-body`: DM Sans

## Key Effects

- Minimal glow (text-shadow: 0 0 20px rgba(59, 130, 246, 0.5))
- Glassmorphism on cards (`bg-slate-900/50 backdrop-blur-xl`)
- Smooth gradients
- Visible focus rings

## Pre-Delivery Checklist

- [x] No emojis as icons (use SVG: Heroicons/Lucide)
- [x] cursor-pointer on all clickable elements
- [x] Hover states with smooth transitions (150-300ms)
- [x] Dark mode contrasts verified
- [x] Responsive: Mobile first
