---
name: Obsidian & Ivory
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  headline-xl:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  section-gap: 120px
  content-gap: 64px
  element-gap: 24px
  margin-desktop: 80px
  margin-mobile: 24px
  gutter: 32px
---

## Brand & Style
The design system is centered on the concept of a "Digital Gallery"—a space where the interface recedes to provide a silent, sophisticated stage for high-resolution imagery. The brand personality is authoritative yet understated, targetting high-end editorial and commercial clients who value precision and artistry.

The visual style is **Minimalist** with a focus on **Editorial** composition. It utilizes generous negative space, intentional asymmetry, and high-contrast typography to evoke a premium, museum-like experience. Every element serves to guide the eye toward the photography, avoiding unnecessary ornamentation or digital noise.

## Colors
The palette is intentionally restrained to maintain the "Gallery" aesthetic. 

- **Deep Black (#1A1A1A):** Used for primary typography and structural borders to provide weight and authority.
- **Clean White (#FFFFFF):** The primary canvas color, used extensively to create breathing room.
- **Muted Gold (#C5A059):** Reserved strictly for primary Call-to-Actions (CTAs), focus states, and subtle branding accents. This metallic tone adds a touch of luxury without competing with the colors in the photographs.
- **Soft Grays (#F5F5F5, #757575):** Used for background sections and secondary metadata to create hierarchy without the harshness of pure black-on-white.

## Typography
The typography pairing balances classical elegance with modern utility. 

**Libre Caslon Text** is used for headlines. Its historical roots and refined serifs convey a sense of timelessness and "The Artist's Hand." For larger displays, tighten the letter spacing slightly to increase the impact.

**Hanken Grotesk** serves as the functional workhorse. It is used for body copy, captions, and pricing. Its clean, geometric nature ensures high legibility and provides a contemporary counterpoint to the serif headlines. Labels and metadata should use the uppercase variant with increased tracking to mimic gallery wall plaques.

## Layout & Spacing
The layout follows a **Fluid Grid** with a maximum container width of 1440px. 

- **The 12-Column Rule:** Use a 12-column grid for desktop. Images should span varying widths (e.g., a 4-column portrait next to an 8-column landscape) to create a rhythmic, editorial flow rather than a repetitive masonry block.
- **Gallery Padding:** Maintain a minimum 80px outer margin on desktop to frame the content. 
- **Vertical Rhythm:** Sections are separated by large gaps (120px+) to ensure that the user’s focus remains on one "story" or project at a time. 
- **Mobile Reflow:** On mobile, shift to a 4-column grid with reduced margins (24px). Images typically stack vertically, but maintain the 1:1 or 4:5 aspect ratios common in professional photography.

## Elevation & Depth
This design system rejects drop shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**. 

Depth is achieved through the stacking of colors and the use of scale. Surfaces remain flat (0dp elevation). To distinguish elements like cards or hover states, use a 1px solid border in `#F5F5F5` or a slight shift in background color. 

Images may use a subtle "letterbox" effect—placing them on a light gray background with generous internal padding—to simulate a physical matte frame. Transitions between pages should use a fade-to-white or sophisticated wipe to maintain the calm, premium feel.

## Shapes
The shape language is strictly **Sharp (0)**. 

Every element—from buttons to image containers to input fields—utilizes right angles. This architectural approach mirrors the edges of a photograph and the frames of a gallery. It reinforces a sense of precision, professionalism, and structural integrity. Circular elements should only be used for small, functional icons if absolutely necessary.

## Components
- **Buttons:** Primary buttons are solid `#1A1A1A` with white text. Secondary buttons are outlined with 1px borders. Text inside buttons should use `label-sm` (uppercase, tracked out). Hover states transition the primary button to the Muted Gold accent color.
- **Image Cards:** No borders or shadows. Titles and metadata appear below the image in `body-md` and `label-sm`. 
- **Chips/Categories:** Small, sharp-edged boxes with a 1px `#757575` border. On active state, the border and text turn black.
- **Input Fields:** Minimalist design consisting only of a bottom border (1px). Labels float above the line in `label-sm`.
- **Lists:** Used for service offerings or pricing. Items are separated by thin, full-width horizontal lines (hairlines) to emphasize the grid.
- **Navigation:** A minimal top bar with high transparency. Upon scrolling, it should blur the background slightly but remain mostly invisible to stay out of the way of the visuals.