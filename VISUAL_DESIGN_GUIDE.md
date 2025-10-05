# Visual Design Guide - Cake Display Components

## 🎨 Design Overview

This guide provides a visual reference for the cake display components, showing the exact layout, spacing, and design elements used.

---

## Component 1: CakeDisplay (Hero Section)

### Desktop Layout (lg: 1024px+)
```
┌───────────────────────────────────────────────────────────────────────────┐
│                        FULL WIDTH SECTION                                 │
│  Background: Gradient (pink-50 → purple-50 → blue-50)                    │
│  Padding: py-20 (5rem top/bottom)                                        │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                    CONTAINER (max-width)                            │ │
│  │                                                                     │ │
│  │  ┌─────────────────────────┐    ┌──────────────────────────────┐  │ │
│  │  │  LEFT COLUMN (50%)      │    │  RIGHT COLUMN (50%)          │  │ │
│  │  │  Gap: 12 (3rem)         │    │                              │  │ │
│  │  │                         │    │                              │  │ │
│  │  │  ┌───────────────────┐  │    │  ┌────────────────────────┐ │  │ │
│  │  │  │                   │  │    │  │  TITLE (5xl-6xl)       │ │  │ │
│  │  │  │   3D CAKE MODEL   │  │    │  │  "Crafting Sweet..."   │ │  │ │
│  │  │  │                   │  │    │  │  Font: Bold            │ │  │ │
│  │  │  │   Height: 600px   │  │    │  └────────────────────────┘ │  │ │
│  │  │  │   Border-radius:  │  │    │                              │  │ │
│  │  │  │   24px (3xl)      │  │    │  ┌────────────────────────┐ │  │ │
│  │  │  │                   │  │    │  │  SUBTITLE (2xl)        │ │  │ │
│  │  │  │   • Auto-rotate   │  │    │  │  Color: primary-600    │ │  │ │
│  │  │  │   • Floating      │  │    │  └────────────────────────┘ │  │ │
│  │  │  │   • Shadows       │  │    │                              │  │ │
│  │  │  │   • Lighting      │  │    │  ┌────────────────────────┐ │  │ │
│  │  │  │                   │  │    │  │  DESCRIPTION (lg)      │ │  │ │
│  │  │  │  [✨ 3D Preview]  │  │    │  │  Color: gray-700       │ │  │ │
│  │  │  │  (Floating badge) │  │    │  │  Line-height: relaxed  │ │  │ │
│  │  │  │                   │  │    │  └────────────────────────┘ │  │ │
│  │  │  └───────────────────┘  │    │                              │  │ │
│  │  │                         │    │  ┌────────────────────────┐ │  │ │
│  │  │  Decorative blurs:      │    │  │  FEATURES GRID (2x2)   │ │  │ │
│  │  │  • Pink blur top-right  │    │  │                        │ │  │ │
│  │  │  • Purple blur bottom   │    │  │  ┌────────┬─────────┐  │ │  │ │
│  │  │                         │    │  │  │ Icon   │  Icon   │  │ │  │ │
│  │  │                         │    │  │  │ Label  │  Label  │  │ │  │ │
│  │  │                         │    │  │  │ Text   │  Text   │  │ │  │ │
│  │  │                         │    │  │  └────────┴─────────┘  │ │  │ │
│  │  │                         │    │  │  ┌────────┬─────────┐  │ │  │ │
│  │  │                         │    │  │  │ Icon   │  Icon   │  │ │  │ │
│  │  │                         │    │  │  │ Label  │  Label  │  │ │  │ │
│  │  │                         │    │  │  │ Text   │  Text   │  │ │  │ │
│  │  │                         │    │  │  └────────┴─────────┘  │ │  │ │
│  │  │                         │    │  └────────────────────────┘ │  │ │
│  │  │                         │    │                              │  │ │
│  │  │                         │    │  ┌────────────────────────┐ │  │ │
│  │  │                         │    │  │  CTA BUTTONS           │ │  │ │
│  │  │                         │    │  │  [Explore] [Order]     │ │  │ │
│  │  │                         │    │  └────────────────────────┘ │  │ │
│  │  │                         │    │                              │  │ │
│  │  │                         │    │  ┌────────────────────────┐ │  │ │
│  │  │                         │    │  │  STATISTICS            │ │  │ │
│  │  │                         │    │  │  500+ | 1000+ | 5★     │ │  │ │
│  │  │                         │    │  └────────────────────────┘ │  │ │
│  │  └─────────────────────────┘    └──────────────────────────────┘  │ │
│  │                                                                     │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### Mobile Layout (< 1024px)
```
┌─────────────────────────────┐
│     FULL WIDTH SECTION      │
│                             │
│  ┌───────────────────────┐  │
│  │  3D CAKE MODEL        │  │
│  │  Height: 500px        │  │
│  │  Full width           │  │
│  │                       │  │
│  │  [✨ 3D Preview]      │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  TITLE                │  │
│  │  (Stacked below)      │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  SUBTITLE             │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  DESCRIPTION          │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  FEATURES (2x2)       │  │
│  │  ┌────────┬────────┐  │  │
│  │  │ Icon 1 │ Icon 2 │  │  │
│  │  └────────┴────────┘  │  │
│  │  ┌────────┬────────┐  │  │
│  │  │ Icon 3 │ Icon 4 │  │  │
│  │  └────────┴────────┘  │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  CTA BUTTONS          │  │
│  │  [Explore]            │  │
│  │  [Order]              │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  STATISTICS           │  │
│  │  500+ | 1000+ | 5★    │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

---

## Component 2: CakeDetailDisplay (Product Page)

### Desktop Layout (lg: 1024px+)
```
┌───────────────────────────────────────────────────────────────────────────┐
│                        CONTAINER (max-width)                              │
│  Padding: py-12 (3rem top/bottom)                                        │
│                                                                           │
│  ┌─────────────────────────┐    ┌──────────────────────────────────────┐ │
│  │  LEFT COLUMN (50%)      │    │  RIGHT COLUMN (50%)                  │ │
│  │  Position: sticky       │    │  Scrollable content                  │ │
│  │  Top: 96px (24)         │    │                                      │ │
│  │                         │    │                                      │ │
│  │  ┌───────────────────┐  │    │  ┌────────────────────────────────┐ │ │
│  │  │                   │  │    │  │  [Category Badge]              │ │ │
│  │  │  MAIN IMAGE       │  │    │  │  Gradient: primary → accent    │ │ │
│  │  │  or 3D MODEL      │  │    │  └────────────────────────────────┘ │ │
│  │  │                   │  │    │                                      │ │
│  │  │  Height: 500px    │  │    │  ┌────────────────────────────────┐ │ │
│  │  │  Border-radius:   │  │    │  │  TITLE (4xl-5xl)               │ │ │
│  │  │  16px (2xl)       │  │    │  │  Font: Bold                    │ │ │
│  │  │                   │  │    │  └────────────────────────────────┘ │ │
│  │  │  [$299]           │  │    │                                      │ │
│  │  │  (Price badge)    │  │    │  ┌────────────────────────────────┐ │ │
│  │  │                   │  │    │  │  DESCRIPTION (lg)              │ │ │
│  │  │  Hover: scale     │  │    │  │  Leading: relaxed              │ │ │
│  │  │                   │  │    │  └────────────────────────────────┘ │ │
│  │  └───────────────────┘  │    │                                      │ │
│  │                         │    │  ┌────────────────────────────────┐ │ │
│  │  ┌───────────────────┐  │    │  │  DETAILS GRID                  │ │ │
│  │  │ THUMBNAILS        │  │    │  │  ┌──────────┬──────────┐       │ │ │
│  │  │ ┌──┬──┬──┬──┐     │  │    │  │  │  💰      │  👥      │       │ │ │
│  │  │ │  │  │  │  │     │  │    │  │  │  Price   │  Servings│       │ │ │
│  │  │ └──┴──┴──┴──┘     │  │    │  │  │  $299    │  50-60   │       │ │ │
│  │  │ 4 columns         │  │    │  │  └──────────┴──────────┘       │ │ │
│  │  │ Gap: 3 (0.75rem)  │  │    │  │  ┌─────────────────────┐       │ │ │
│  │  └───────────────────┘  │    │  │  │  ⏰ Preparation      │       │ │ │
│  │                         │    │  │  │  3-4 days            │       │ │ │
│  │                         │    │  │  └─────────────────────┘       │ │ │
│  │                         │    │  └────────────────────────────────┘ │ │
│  │                         │    │                                      │ │
│  │                         │    │  ┌────────────────────────────────┐ │ │
│  │                         │    │  │  TAGS                          │ │ │
│  │                         │    │  │  #wedding #elegant #custom     │ │ │
│  │                         │    │  └────────────────────────────────┘ │ │
│  │                         │    │                                      │ │
│  │                         │    │  ┌────────────────────────────────┐ │ │
│  │                         │    │  │  [Order This Cake]             │ │ │
│  │                         │    │  │  Full width button             │ │ │
│  │                         │    │  │  Gradient background           │ │ │
│  │                         │    │  └────────────────────────────────┘ │ │
│  │                         │    │                                      │ │
│  │                         │    │  ┌────────────────────────────────┐ │ │
│  │                         │    │  │  📅 Custom Order Info          │ │ │
│  │                         │    │  │  Background: blue-50           │ │ │
│  │                         │    │  │  Border: blue-100              │ │ │
│  │                         │    │  └────────────────────────────────┘ │ │
│  └─────────────────────────┘    └──────────────────────────────────────┘ │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Primary Colors
```
Primary-50:  #FFF5F7  (Very light pink)
Primary-100: #FFE5E9  (Light pink)
Primary-500: #FF6B9D  (Main pink)
Primary-600: #E85A87  (Dark pink)
Primary-900: #8B1538  (Very dark pink)
```

### Accent Colors
```
Accent-50:   #FFF0F5  (Very light rose)
Accent-500:  #FF9BB3  (Rose pink)
Secondary-500: #9370DB (Medium purple)
```

### Gradients
```css
/* Background Gradient */
background: linear-gradient(135deg, 
  #FFF5F7 0%,    /* pink-50 */
  #F3E8FF 50%,   /* purple-50 */
  #EFF6FF 100%   /* blue-50 */
);

/* Button Gradient */
background: linear-gradient(90deg,
  #FF6B9D 0%,    /* primary-500 */
  #FF9BB3 50%,   /* accent-500 */
  #9370DB 100%   /* secondary-500 */
);

/* Card Gradient */
background: linear-gradient(135deg,
  rgba(255,255,255,0.5) 0%,
  rgba(243,232,255,0.3) 100%
);
```

---

## 📏 Spacing System

### Component Spacing
```
Section Padding:     py-20 (5rem = 80px)
Container Max-Width: max-w-7xl (1280px)
Grid Gap:           gap-12 (3rem = 48px)
Card Padding:       p-4 to p-6 (1rem to 1.5rem)
```

### Element Spacing
```
Title Margin:       mb-4 to mb-6 (1rem to 1.5rem)
Paragraph Margin:   mb-4 (1rem)
Button Gap:         gap-4 (1rem)
Feature Grid Gap:   gap-6 (1.5rem)
```

---

## 🔤 Typography

### Font Sizes
```
Hero Title:      text-5xl md:text-6xl (3rem / 3.75rem)
Section Title:   text-4xl md:text-5xl (2.25rem / 3rem)
Subtitle:        text-2xl (1.5rem)
Body:            text-lg (1.125rem)
Small:           text-sm (0.875rem)
```

### Font Weights
```
Bold:            font-bold (700)
Semibold:        font-semibold (600)
Medium:          font-medium (500)
```

---

## 🎭 Animation Timings

### Entrance Animations
```javascript
// Fade in with slide
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}

// Scale in
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: 0.1 }}
```

### Continuous Animations
```javascript
// Floating badge
animate={{ y: [0, -10, 0] }}
transition={{ 
  repeat: Infinity, 
  duration: 3, 
  ease: "easeInOut" 
}}

// 3D model rotation
autoRotateSpeed={1}  // 1 rotation per second
```

### Hover Effects
```css
/* Button hover */
hover:scale-105 hover:shadow-2xl
transition-all duration-300

/* Image hover */
group-hover:scale-110
transition-transform duration-500
```

---

## 📱 Responsive Breakpoints

```
sm:  640px   (Small tablets)
md:  768px   (Tablets)
lg:  1024px  (Laptops) ← Main breakpoint for side-by-side
xl:  1280px  (Desktops)
2xl: 1536px  (Large desktops)
```

### Layout Changes
```
< 1024px:  Stacked layout (1 column)
≥ 1024px:  Side-by-side (2 columns)
```

---

## 🎯 Key Design Elements

### 1. Glass Morphism Cards
```css
background: rgba(255,255,255,0.6)
backdrop-filter: blur(8px)
border: 1px solid rgba(255,255,255,0.2)
```

### 2. Floating Badges
```css
position: absolute
top: -24px
right: -24px
background: gradient
box-shadow: 0 20px 25px rgba(0,0,0,0.15)
```

### 3. Icon Containers
```css
width: 48px (w-12)
height: 48px (h-12)
background: gradient
border-radius: 8px (rounded-lg)
display: flex
align-items: center
justify-content: center
```

### 4. Decorative Blurs
```css
position: absolute
width: 256px (w-64)
height: 256px (h-64)
background: rgba(255,192,203,0.2)
border-radius: 50%
filter: blur(48px)
```

---

## ✨ Interactive Elements

### Hover States
- **Buttons:** Scale up (105%), increase shadow
- **Cards:** Lift effect with shadow
- **Images:** Zoom in (110%)
- **Links:** Color change, underline

### Focus States
- **Buttons:** Ring outline
- **Inputs:** Border color change
- **Links:** Visible focus indicator

---

## 🎬 Animation Sequence

### Page Load (CakeDisplay)
```
0.0s: 3D Model starts loading
0.3s: Left column (3D) fades in from left
0.5s: Title fades in from right
0.6s: Subtitle fades in
0.7s: Description fades in
0.8s: Feature 1 scales in
0.9s: Feature 2 scales in
1.0s: Feature 3 scales in
1.1s: Feature 4 scales in
1.2s: CTA buttons fade in
1.3s: Statistics fade in
```

### Scroll Animations
- Elements fade in when 50% visible
- Stagger delay: 0.1s between items
- Once: true (no repeat on scroll up)

---

## 📐 Exact Dimensions

### CakeDisplay Component
```
3D Canvas:
  Desktop: 600px height
  Mobile:  500px height
  Border-radius: 24px

Feature Cards:
  Padding: 16px (p-4)
  Icon size: 48x48px
  Border-radius: 12px

Buttons:
  Height: 48px (size="lg")
  Padding: 16px 32px
  Border-radius: 12px
```

### CakeDetailDisplay Component
```
Main Image:
  Height: 500px
  Border-radius: 16px

Thumbnails:
  Height: 96px (h-24)
  Border-radius: 8px
  Gap: 12px

Detail Cards:
  Padding: 16px (p-4)
  Icon container: 40x40px
  Border-radius: 12px
```

---

## 🎨 Shadow System

```css
/* Small shadow */
shadow-md: 0 4px 6px rgba(0,0,0,0.1)

/* Medium shadow */
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)

/* Large shadow */
shadow-xl: 0 20px 25px rgba(0,0,0,0.1)

/* Extra large shadow */
shadow-2xl: 0 25px 50px rgba(0,0,0,0.25)
```

---

## 🔧 Customization Quick Reference

### Change Main Color
```jsx
// Find and replace
"primary-500" → "blue-500"
"primary-600" → "blue-600"
```

### Adjust Layout Width
```jsx
// In component
className="container-custom"
// In CSS
.container-custom {
  max-width: 1280px; /* Change this */
}
```

### Modify 3D Canvas Height
```jsx
// In component
className="h-[600px]"  // Change to h-[700px]
```

---

**Last Updated:** 2025-10-05
**Version:** 1.0.0
