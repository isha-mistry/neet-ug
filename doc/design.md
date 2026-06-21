# Shared Frontend Design Reference

## 1. Overview

This file is a shared styling guideline derived from the Journey Home module. It documents the visual language already implemented in `src/styles/journey-home.css`, then separates reusable standards from Journey Home-specific treatments so other pages can adopt the same heading, button, card, border, spacing, gradient, shadow, and motion patterns consistently.

Files analyzed:

- `src/components/features/journey-home/*`
- `src/lib/journey-home/*`
- `src/styles/journey-home.css`
- Existing shared token context in `src/styles/globals.css`

Note: the requested path used `jouney-home`, but the repository module is spelled `journey-home`.

Use this document in two ways:

- As a source-of-truth reference for the current Journey Home visual system.
- As a practical mini design system for future pages until the patterns are extracted into shared CSS utilities or React components.

The reusable recommendations below should be treated as standards for new frontend work unless a page has a strong domain-specific reason to differ.

## 2. Global Reusable Design Standards

These patterns are reusable across marketing, predictor, counseling, college, quota, and content pages. They are based on Journey Home, but they should be promoted into shared utilities/components rather than remaining tied to `.journey-home` selectors.

### 2.1 Global Color System

Use the existing global tokens from `globals.css` as the base color language:

| Design role | Recommended token | Current Journey alias | Usage standard |
| --- | --- | --- | --- |
| Brand primary | `--color-primary` | `--blue` | Primary CTAs, active navigation, highlighted words, active nodes |
| Brand hover | `--color-primary-hover` | `--blue-bright` | Hover accents, bright gradient stops |
| Brand pressed | `--color-primary-pressed` | `--blue-deep` | Primary button hover/pressed backgrounds, dark gradient stops |
| Brand soft surface | `--color-primary-fixed` | `--blue-tint` | Badges, active rings, selected backgrounds, subtle highlights |
| Brand soft hover | `--color-surface-container-low` | `--blue-soft` | Secondary button hover, table emphasis, soft callout backgrounds |
| Main text | `--color-on-surface` | `--ink` | Headings, strong body text, card titles |
| Secondary text | `--color-on-surface-variant` | `--muted` | Paragraphs, supporting copy, inactive labels |
| Muted text / outlines | `--color-outline` | `--dim` | Metadata, captions, helper copy |
| Page background | `--color-surface-container-lowest` or `--color-background` | `--bg` | Page shells and calm section backgrounds |
| Alternate section background | `--color-surface` | `--alt` | Alternating page bands and form fills |
| Border default | `--color-outline-variant` | `--line` | Cards, dividers, table lines |
| Border strong | `--color-outline` mixed with outline variant | `--line-2` | Outline buttons, progress tracks, inactive nodes |
| Success / safe | `--color-tertiary` | `--safe` | Positive data states and safe tags |
| Success soft | `--color-tertiary-fixed` | `--safe-bg` | Positive chip backgrounds and checklist icons |
| Warning / borderline | `--color-secondary` | `--warn` | Borderline or warning states |
| Warning soft | `--color-secondary-fixed` | `--warn-bg` | Warning chip backgrounds |
| Error / risk | `--color-error` | `--risk` | Risk states, mistake icons, validation states |
| Error soft | `--color-error-container` | `--risk-bg` | Risk chip backgrounds |

Reusable color standards:

- Use brand blue for one clear primary action per section.
- Use `--color-on-surface-variant` for most supporting text; reserve `--color-outline` for metadata and very low-emphasis copy.
- Use `--color-primary-fixed` for soft brand backgrounds, not low-opacity custom blues.
- Use semantic safe/warn/risk colors for ranking, eligibility, cutoff, and seat-chance states.
- Avoid new raw hex values unless introducing a documented semantic token.

Journey Home literals that should become shared tokens:

| Literal | Recommended shared token | Why |
| --- | --- | --- |
| `#ffffff` / `#fff` | `--color-surface-container-lowest` or `--color-on-primary` depending on context | Avoid raw white drift |
| `#b97e14` | `--color-accent-gold` | Star/testimonial accent |
| `#bbd0ff` | `--color-brand-inverse-muted` | Eyebrow text on blue panels |
| `#c9d8ff` | `--color-brand-inverse-body` | Body copy on blue panels |
| `#a9c0f5` | `--color-brand-inverse-placeholder` | Inverse form placeholder/fine print |
| `rgba(37,70,208,.35)` | `--border-brand-hover` | Common hover border |
| `rgba(37,70,208,.55)` | `--shadow-brand-action` | Primary CTA glow |

### 2.2 Heading and Typography Standards

Use this hierarchy for future pages. Journey Home uses Hanken Grotesk locally, while the broader app uses Inter tokens. Until typography is unified, preserve the shape of the hierarchy and map it to the active page font.

Recommended type roles:

| Role | Recommended style | Use for |
| --- | --- | --- |
| Page hero title | `clamp(36px, 4.9vw, 60px)`, weight `800`, line-height `1.05`, tracking `-0.028em` | Top page promise, landing-page hero H1 |
| Page title / strong final CTA | `clamp(31px, 4.6vw, 54px)`, weight `800`, line-height `1.04`, tracking `-0.025em` | Major CTA bands, large page-end statements |
| Section title | `clamp(29px, 3.8vw, 44px)`, weight `800`, line-height `1.08`, tracking `-0.022em` | Standard H2 across feature sections |
| Compact section title | `clamp(23px, 2.6vw, 31px)`, weight `800`, line-height `1.12` | CTA banners and smaller section blocks |
| Card title large | `20px` to `21px`, weight `800`, tracking `-0.01em` | Feature/tool/package cards |
| Card title small | `16px` to `16.5px`, weight `800`, tracking `-0.01em` | Resource/problem cards and dense panels |
| Body | `15px` to `16px`, line-height `1.55` to `1.65`, weight `400/500` | Main content paragraphs |
| Lead / subtitle | `17px`, line-height about `1.65`, muted, max width `620px` | Section subtitles and hero ledes |
| Label / eyebrow | Mono or label font, `10px` to `11px`, uppercase, weight `600/700`, tracking `0.14em` | Section eyebrows, form labels, metadata labels |
| Caption / metadata | `10px` to `12px`, muted or dim, often mono | Notes, timestamps, status metadata |
| Data value | Mono, `17px` to `32px`, weight `700`, tracking `-0.02em` to `-0.03em` | Stats, prices, ranks, counts |

Default heading pattern for new sections:

```html
<section>
  <span class="section-eyebrow">Step label or category</span>
  <h2 class="section-title">Main message <em>with emphasis.</em></h2>
  <p class="section-lede">Short supporting copy, ideally one or two lines.</p>
</section>
```

Reusable styling rules:

- Headings should be bold, compact, and slightly negatively tracked.
- Use blue emphasis inside headings through `em` or a semantic text-emphasis component.
- Keep lead copy muted and constrained; avoid full-width paragraphs in wide containers.
- Use uppercase mono/label text sparingly for structure, not for long copy.
- Prefer `0.14em` as the default label letter-spacing. Journey Home currently uses many close values; future work should consolidate them.

Recommended shared typography tokens:

```css
:root {
  --text-page-hero: clamp(36px, 4.9vw, 60px);
  --text-page-title: clamp(31px, 4.6vw, 54px);
  --text-section-title: clamp(29px, 3.8vw, 44px);
  --text-section-title-sm: clamp(23px, 2.6vw, 31px);
  --text-card-title: 20px;
  --text-card-title-sm: 16.5px;
  --text-lede: 17px;
  --text-body: 15px;
  --text-body-sm: 13.5px;
  --text-label: 10.5px;
  --line-tight: 1.08;
  --line-body: 1.6;
  --tracking-heading: -0.022em;
  --tracking-label: 0.14em;
}
```

### 2.3 Button Standards

Journey Home defines a strong reusable button language. Convert it into a shared `Button` component or utility set.

#### Base Button

Recommended default:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 48px;
  padding: 14px 28px;
  border-radius: var(--radius-lg);
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    background-color 0.16s ease,
    border-color 0.16s ease,
    color 0.16s ease;
}

.button:active {
  transform: translateY(1px);
}

.button svg {
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.2, 0.6, 0.2, 1);
}

.button:hover svg {
  transform: translateX(4px);
}
```

#### Primary Button

Primary button standard:

- Background: `--color-primary`.
- Text: `--color-on-primary`.
- Border: none.
- Radius: `--radius-lg`.
- Shadow: `--shadow-primary-button` or `0 10px 28px -10px rgba(37,70,208,.55)`.
- Hover: `--color-primary-pressed`, translate `-1px`, stronger glow.
- Active: translate down `1px`.
- Focus: global focus-visible ring.
- Disabled: add opacity `0.55`, `cursor: not-allowed`, no transform, no glow increase.

Use for high-intent actions: submit, scan, predict, book, unlock, continue, compare, or choose the recommended plan.

Journey Home source pattern: `.btn.btn-blue`.

#### Secondary Button

Secondary button standard:

- Background: `--color-surface-container-lowest`.
- Text: `--color-primary`.
- Border: `1.5px solid` strong outline/brand-mixed border.
- Radius: `--radius-lg`.
- Hover: border `--color-primary`, background `--color-surface-container-low` or `--color-primary-fixed` when stronger emphasis is needed.
- Shadow: none by default.

Use for alternate navigation, lower-intent CTAs, supporting links, and non-recommended package actions.

Journey Home source pattern: `.btn.btn-line`.

#### Inverse Button

Use on blue gradient or dark brand panels.

- Background: `--color-on-primary` / white.
- Text: `--color-primary`.
- Hover: `--color-primary-fixed`.
- Border: none unless the panel needs extra contrast.

Journey Home source patterns: playbook form submit, challenge band CTA.

#### Text / Arrow Link Button

Use inside cards where a full button is too heavy.

- Display: inline-flex.
- Text: `--color-primary`.
- Font: `13.5px` to `14px`, weight `700`.
- Gap: `7px` to `8px`.
- Hover: gap expands to `12px`.

Journey Home source patterns: `.slink`, `.go`, `.aiq-band-cta`, resource links.

#### Button Extraction Recommendations

Create a shared `Button` API:

```tsx
<Button variant="primary" size="md">Check my chances</Button>
<Button variant="secondary" size="md">Talk to counselor</Button>
<Button variant="inverse" size="md">Send me the playbook</Button>
<Button variant="text" trailingIcon>View details</Button>
```

Recommended props:

- `variant`: `primary`, `secondary`, `inverse`, `text`, `ghost`.
- `size`: `sm`, `md`, `lg`.
- `fullWidth`: for forms, cards, and mobile CTAs.
- `isDisabled`: must style disabled behavior explicitly.
- `trailingIcon`: standardize arrows instead of mixing text arrows and SVG arrows.

### 2.4 Border and Radius Standards

Recommended border widths:

| Token | Value | Use |
| --- | --- | --- |
| `--border-width-hairline` | `1px` | Cards, dividers, tables, section rules |
| `--border-width-control` | `1.5px` | Inputs, secondary buttons, gradient-border masks |
| `--border-width-active` | `2px` | Selected packages, active nodes |
| `--border-width-focus` | `2.5px` or global focus shadow | Focus-visible states |
| `--border-width-accent` | `3px` | Left-accent callouts |

Recommended radius scale:

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | `4px` | Focus ring rounding, tiny marks |
| `--radius-md` | `8px` | Small buttons, close buttons, compact controls |
| `--radius-control` | `12px` | Inputs, icon tiles, map thumbnails |
| `--radius-card` | `16px` | Default cards and accordions |
| `--radius-panel` | `20px` | Tables, large grouped containers |
| `--radius-feature` | `24px` | Featured cards and forms |
| `--radius-hero` | `28px` | Large CTA panels and hero visuals |
| `--radius-pill` | `9999px` | Chips, badges, progress bars |
| `--radius-circle` | `50%` | Avatars, dots, FABs |

Current inconsistency to resolve: Journey Home uses `10px`, `12px`, `14px`, `16px`, `20px`, `24px`, `26px`, `28px`, `var(--radius-lg)`, `99px`, and `50%`. Future pages should use the table above and avoid one-off radius values.

### 2.5 Card and Container Standards

Default reusable card:

```css
.card {
  background: var(--color-surface-container-lowest);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-lg);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 10px 26px -16px rgba(37, 70, 208, 0.2);
}
```

Recommended variants:

| Variant | Visual treatment | Use |
| --- | --- | --- |
| `card-default` | White/lowest surface, subtle border, soft shadow | Standard repeated content cards |
| `card-hover` | Hover lift `-4px`, stronger shadow, optional brand border | Clickable or interactive cards |
| `card-feature` | Larger radius/padding, stronger shadow | Hero-adjacent or high-value cards |
| `card-gradient-border` | Pseudo-element or wrapper gradient border | Important calculators/forms/lead capture |
| `card-data` | Compact, mono metrics, dividers | Stats, ranks, seat counts |
| `card-warning` | Error/risk soft icon or border | Mistakes, alerts, validation context |

Reusable card rules:

- Default card padding should be `24px` or `28px`; use `32px` for feature cards.
- Use `18px` as the default grid gap between cards.
- Interactive cards should transition transform, box-shadow, and border-color together.
- Do not nest visual cards inside visual cards unless the inner element is a distinct control or table.
- If a card is clickable, the hover state should communicate affordance through lift, border, or arrow motion.

### 2.6 Gradient Standards

Reusable gradients derived from Journey Home:

| Standard gradient | Recommended token | Use |
| --- | --- | --- |
| Brand CTA band | `linear-gradient(135deg, var(--color-primary), var(--color-primary-pressed))` | CTA sections, stat bands, lead magnets |
| Soft feature panel | `linear-gradient(165deg, var(--color-primary-fixed), #fff 55%, var(--color-surface-container-low))` | Hero visuals and feature previews |
| Soft section atmosphere | Blue radial gradients with low opacity | Hero/page intro backgrounds only |
| Gradient border | Brand blue to soft blue to safe green | Diagnostic tools and high-value forms |
| Data bar | `linear-gradient(90deg, #a9bef3, var(--color-primary))` | Progress/funnel bars |
| Edge fade mask | Transparent-to-black-to-transparent | Marquees and horizontal overflow previews |

Gradient rules:

- Use gradients to highlight important page regions, not every card.
- Keep content readable: inverse text on blue gradients should use documented inverse tokens.
- Prefer one gradient family per page.
- Use gradient borders for important interactive tools, not normal cards.
- Avoid decorative gradients that do not communicate hierarchy or state.

### 2.7 Shadow and Glow Standards

Reusable shadows:

| Shadow role | Current value / source | Use |
| --- | --- | --- |
| Card subtle | Journey `--shadow-sm` | Default cards and FAQs |
| Card large | Journey `--shadow-lg` | Hovered cards, hero panels, modals |
| Primary action | `--shadow-primary-button` | Primary filled buttons |
| Primary action hover | `--shadow-primary-button-hover` | Primary button hover |
| Brand active ring | `0 0 0 7px var(--color-primary-fixed)` plus blue depth shadow | Active nodes, selected states |
| Overlay/menu | Dark low-alpha shadows | Nav, dropdowns, mobile menus, modals |

Reusable shadow rules:

- Shadows should be brand-tinted for key conversion surfaces and neutral/dark for overlays.
- Default cards should be subtle; reserve large shadows for hover, modals, and feature panels.
- Glow effects should indicate active, selected, or primary CTA states.
- Avoid combining heavy shadow and heavy border unless a component is truly featured.

### 2.8 Motion and Interaction Standards

Standard timing:

| Motion role | Duration/easing | Use |
| --- | --- | --- |
| Fast control hover | `0.15s` to `0.16s ease` | Buttons, inputs, nav links |
| Icon slide | `0.2s cubic-bezier(0.2, 0.6, 0.2, 1)` | Arrow/icon movement |
| Card lift | `0.22s ease` | Cards and package panels |
| Spotlight fade | `0.25s ease` | Cursor spotlight hover |
| Modal/content fade | `0.28s ease` | Dialogs and content swaps |
| State timeline | `0.35s cubic-bezier(0.3, 0.8, 0.3, 1)` | Progress nodes and selected states |
| Reveal | `0.7s cubic-bezier(0.2, 0.6, 0.2, 1)` | Scroll reveal |

Reusable interaction patterns:

- Button hover: lift `-1px`, stronger shadow only for primary actions.
- Button active: translate down `1px`.
- Arrow/icon hover: move right `4px` or increase link gap by about `5px`.
- Card hover: lift `-4px`, switch to large shadow, optionally tint border.
- Input focus: border changes to primary, background becomes white/lowest surface.
- Selected node/state: filled primary background, white text, primary-fixed ring.
- Reveal: fade and translate up into place; disable under reduced motion.

Reduced-motion standard:

- Every infinite animation must pause or disable under `prefers-reduced-motion: reduce`.
- Scroll-driven animations should provide a static equivalent.
- Hover transitions may remain if subtle, but large movement should be removed.

### 2.9 Spacing and Layout Standards

Use existing global layout tokens:

- Content width: `--max-width-page`.
- Page gutter: `--spacing-gutter`.
- Navbar-to-hero offset: `--spacing-below-navbar-y`, `--spacing-below-navbar-y-md`.

Recommended spacing scale:

| Token | Value | Use |
| --- | --- | --- |
| `--space-1` | `4px` | Tiny offsets, badge internals |
| `--space-2` | `8px` | Icon/text gaps, compact controls |
| `--space-3` | `12px` | Form/control internals |
| `--space-4` | `14px` | Small row gaps, button icon gaps |
| `--space-5` | `18px` | Default card grid gap |
| `--space-6` | `24px` | Standard card padding and section internals |
| `--space-7` | `28px` | Large card padding |
| `--space-8` | `32px` | Feature card/panel padding |
| `--space-9` | `46px` | Header-to-grid spacing |
| `--space-10` | `60px` | Major internal section spacing |
| `--space-section` | `104px` | Desktop vertical section padding |
| `--space-section-mobile` | `72px` | Mobile vertical section padding |

Layout standards:

- Use a shared page container equivalent to `.ms-layout-page` / Journey `.wrap`.
- Default section padding: `104px 0` desktop, `72px 0` mobile.
- Default grid gap: `18px` for repeated cards.
- Default header-to-content spacing: `42px` to `46px`.
- Two-column hero or tool layouts should collapse to one column below about `1040px`.
- Multi-card grids should generally collapse from four/three columns to two columns to one column.

### 2.10 Premium Table, Card Border, and Gradient Border Panel Standards

For all structured data directories, guidelines, and tool interfaces:

#### 1. Premium Tables (e.g. `.quota-table`)
- **Wrapper**: Use `.quota-table-wrap` for rounded corners (`16px`), standard border, and soft card shadow.
- **Header (`thead`)**: Background must be the solid brand primary color (`var(--color-primary)`).
- **Header Text (`th`)**: Bold uppercase white text, tracking `0.14em`, size `10px`, with generous vertical padding.
- **First Column Shading**: The leftmost header/row cells (`td:first-child`) get bold text (`font-bold`) and a subtle light blue-grey background tint via CSS color-mix to emphasize the row labels.
- **Borders**: Use thin horizontal row borders (`border-b border-outline-variant/40`) with no vertical grid borders.

#### 2. Card Left-Border Accents
- Select cards (such as key step-by-step guides like `QuotaProcessList` or key highlights) should utilize a left accent border (`border-l-4 border-l-primary`) for high contrast and guidance as shown in Image 2.
- Standardize normal card panels to use `bg-surface-container-lowest` (white) and `border-outline-variant` (solid 1px outline matching `var(--line)`) for consistent presentation and contrast. Avoid transparent outline variants (`border-outline-variant/40`) or grey card backgrounds on standard content panels to preserve global design system uniformity.

#### 3. Premium Gradient Border Panel (e.g. `.gradient-border-panel`)
- Use for standout components, high-value lead magnets, and calculators (replaces basic card borders).
- **Radius**: `24px` (`var(--radius-feature)`).
- **Implementation**: Outer wrapper or pseudo-element with `1.5px` border padding and a gradient from `rgb(37, 70, 208)` (vibrant royal blue) through `rgba(37, 70, 208, 0.08)` (45% midpoint) to `rgba(21, 164, 95, 0.35)` (emerald green) using mask-composite matching the Seat Radar card styling.

## 3. Global Reusable Patterns to Extract

### Section Header

Reusable across most pages.

- Eyebrow: inline-flex, mono/label, uppercase, primary color, leading line accent.
- Title: large bold heading with optional blue `em` emphasis.
- Lede: muted text, max width around `620px`.

Recommended component: `SectionHeader`.

### Primary CTA Group

Reusable for hero, final CTA, card CTAs, and conversion sections.

- Use a flex row with `13px` to `14px` gap and wrapping.
- Primary action first, secondary action second.
- On mobile, allow buttons to wrap and optionally become full width.

Recommended component: `CtaGroup`.

### Badge / Pill

Reusable for hero badges, status chips, featured flags, and scores.

- Display: inline-flex, centered.
- Radius: pill.
- Padding: compact, usually `4px 11px` or `8px 16px`.
- Font: label/mono for metadata; sans for marketing badges.
- Color: primary-on-soft for brand, semantic colors for statuses.

Recommended components: `Badge`, `StatusChip`.

### Icon Tile

Reusable for problem cards, tool cards, warning lists, and feature lists.

- Size: `44px` or `48px`.
- Radius: `12px` or `14px`.
- Background: brand soft, risk soft, or semantic soft.
- Icon: currentColor, 18px to 22px.

Recommended component: `IconTile`.

### Metric Pair

Reusable for stats, seats, ranks, prices, and counts.

- Value: mono, bold, brand or ink color.
- Label: small muted text.
- Keep metric groups aligned and compact.

Recommended component: `MetricPair`.

### Gradient CTA Band

Reusable for high-priority conversion sections.

- Background: brand CTA gradient.
- Radius: `28px`.
- Padding: `50px 54px` desktop, `36px 26px` mobile.
- Text: inverse colors.
- Button: inverse button.
- Optional decoration: subtle dashed/radial shape, not content-heavy.

Recommended component: `GradientCtaBand`.

### Gradient Border Panel

Reusable for high-value tools, not basic content.

- Wrapper or pseudo-element with `1.5px` gradient border.
- Interior remains white/lowest surface for readability.
- Radius: `20px` to `24px`.
- Use for calculators, lead forms, predictor summaries, and standout widgets.

Recommended utility: `gradient-border-panel`.

### Interactive Card Hover

Reusable card hover standard:

- Transform: `translateY(-4px)`.
- Shadow: large card shadow.
- Border: optional brand hover border.
- Duration: `0.22s`.

Do not apply hover lift to static legal copy, dense tables, or non-clickable text blocks unless it helps comprehension.

### Spotlight Hover

Journey Home's `.spot` pattern can be a shared enhancement for premium cards.

- Uses a radial gradient at pointer position.
- Opacity fades in on hover.
- Should be optional and subtle.
- Avoid on dense forms, tables, and mobile-critical controls.

## 4. Journey Home-Specific Styles

These styles belong to Journey Home unless deliberately generalized later.

### Journey Scroll Path

Specific to the Journey Home storytelling flow.

- SVG dotted track spanning the page.
- Animated progress stroke with gradient.
- Moving `#jdot` with pulsing ring.
- Step nodes positioned left/right of sections.
- Special z-index layering when rounds are pinned.

Can be generalized only if another page needs a guided vertical journey or timeline.

### Seat Radar Gradient Tool Card

Partly reusable, partly page-specific.

Reusable pieces:

- Gradient border panel.
- Form field styling.
- Full-width primary action.
- Status chips.
- Modal lead form.

Page-specific pieces:

- Live data label copy.
- Safe/borderline/reach calculation display.
- Rank and state rows.
- Blinking placeholder language.

### Hero Particle Panel

Specific to Journey Home's applicant-to-seat story.

- Animated particle/canvas stage.
- Live applicant/seat chips.
- Morph legend state.
- Soft blue-white visual panel.

The panel surface can inspire future feature previews, but the particle animation is not a global primitive.

### Rounds Sticky Interaction

Specific to counseling-round storytelling.

- Sticky Step 06 section.
- Wheel/touch interception.
- Active round state bridge.
- Round node track and panel swap.

Do not reuse this interaction globally without careful accessibility review.

### Funnel Compression Rows

Mostly Journey Home-specific content, but the visual pattern can be reused for data funnels.

Reusable pieces:

- Horizontal data rows.
- Animated progress bars.
- Mono metric values.

Page-specific pieces:

- NEET applicant/qualification/seat funnel content.

### Testimonial Marquee

Reusable with caution.

- The marquee visual can be used for social proof.
- Infinite motion should get a reduced-motion fallback.
- Content must be verified and consented before production use.

### Floating WhatsApp Button

Potentially shared, but product-wide use should be intentional.

- Fixed blue circular action.
- Large brand glow.
- Hover scale.
- Should not conflict with mobile navigation, chat widgets, or sticky form CTAs.

## 5. Journey Home Component Breakdown

### Module Shell

Journey Home uses a scoped root `.journey-home` that maps global tokens to local aliases, sets font, line-height, color, background, focus styles, and overflow behavior. This is useful for module isolation, but future shared patterns should use global tokens directly.

### Hero

The hero combines a strong page title, primary/secondary CTA pair, compact stats, and an animated visual panel. This is a good reference for future landing pages: one clear message, one primary CTA, one secondary CTA, and a visual proof element.

### Ticker Stats

The ticker uses a bordered full-width stat band with equal columns. It can inspire shared stat strips, but the four NEET stats are page-specific.

### Seat Radar

This is the highest-value interactive section. It demonstrates the recommended treatment for important tools: gradient border, clear form labels, full-width primary action, live state indicator, semantic chips, and compact lead modal.

### State Hub and AIQ Band

The state cards demonstrate reusable metric-card structure: code label, visual thumbnail, title, authority metadata, metric pairs, supporting copy, and arrow link. The AIQ band is a reusable pattern for a featured horizontal card.

### Challenge, Tools, and Resources

These sections show the shared card language most clearly: icon tile, badge where needed, bold compact heading, muted copy, hover lift, and primary or text-link CTA.

### Rounds Panel

This is the main page-specific interaction. The visual state language for active/past nodes is reusable for steppers, but the sticky scroll lock behavior should remain Journey-specific.

### Comparison, Mistakes, FAQ

These sections use reusable containers: bordered table wrapper, warning list panel, and accordion cards. Their patterns should be candidates for shared `DataComparisonTable`, `WarningList`, and `FaqList` components.

### Packages

The package cards define a useful pricing pattern: three-column grid, one recommended card with primary button and blue border, secondary actions on non-recommended cards, mono price, and checklist rows.

### Playbook and Final CTA

These are strong references for conversion sections. Use a gradient CTA band for embedded lead capture, and a calmer final CTA section for end-of-page conversion.

## 6. Implementation Recommendations

### Promote Shared Tokens

Add or formalize these in `globals.css` or `src/design/dravio.theme.ts`:

- `--text-page-hero`, `--text-section-title`, `--text-card-title`, `--text-lede`.
- `--space-section`, `--space-section-mobile`, `--space-grid`, `--space-header-to-grid`.
- `--radius-control`, `--radius-card`, `--radius-panel`, `--radius-feature`, `--radius-hero`.
- `--shadow-card-sm`, `--shadow-card-lg`, `--shadow-brand-action`, `--shadow-brand-action-hover`.
- `--gradient-brand-band`, `--gradient-feature-soft`, `--gradient-border-brand`, `--gradient-edge-fade`.
- `--border-brand-hover`, `--surface-brand-hover`, `--text-inverse-muted`.

### Extract Shared Components

Highest-value extraction order:

1. `Button` with primary, secondary, inverse, text, size, and fullWidth variants.
2. `SectionHeader` for eyebrow/title/lede.
3. `Card` with default, hover, feature, and gradientBorder variants.
4. `StatusChip` for safe/warn/risk and other semantic states.
5. `ArrowLink` for card-level CTAs.
6. `IconTile` and `MetricPair`.
7. `GradientCtaBand` and `LeadModal`.
8. `FaqList`, `WarningList`, and `ComparisonTable` wrappers.

### Organize CSS for Scalability

`journey-home.css` is safely scoped, but it mixes shared primitives with page-specific sections. Prefer this structure going forward:

- Shared tokens and utilities live in `globals.css`, Tailwind theme config, or shared CSS modules.
- Shared React components own their component styles.
- Journey-only storytelling styles remain under the Journey Home module.
- Avoid copying `.journey-home` selectors into other modules; extract the pattern first.

If Journey Home CSS stays as one file, group it in this order:

1. Token aliases and base reset.
2. Reusable primitives.
3. Shared component patterns.
4. Journey-specific sections.
5. Motion/keyframes.
6. Responsive rules.

### Standardize Current Inconsistencies

- Typography: reduce repeated body sizes to `13.5px`, `15px`, `17px`, and the documented heading sizes.
- Letter spacing: use `0.14em` for labels unless intentionally different.
- Radius: use the radius scale in this document instead of one-off `10px`, `14px`, `26px`, etc.
- Hover lift: standardize cards to `-4px`; keep buttons at `-1px`.
- Borders: use `1px` default, `1.5px` controls, `2px` selected states.
- Buttons: add disabled styles and use one arrow icon strategy.
- Motion: add reduced-motion handling for `ring`, `pulse`, `blink`, `mq`, and data-bar animations.
- Inline styles: replace JSX inline spacing/background overrides with semantic classes.

## 7. Quick Adoption Checklist for New Pages

When building a new page, use this checklist:

- Use the shared page container width and gutter.
- Start each major section with eyebrow, section title, and lede when appropriate.
- Use one primary CTA per decision area and make secondary actions visually quieter.
- Use default cards for repeated content; use gradient borders only for high-value tools.
- Use `18px` grid gaps and `42px` to `46px` header-to-content spacing.
- Use semantic status chips for safe/warn/risk or success/warning/error states.
- Use brand gradients for major CTA bands, not routine cards.
- Use hover lift only on interactive cards.
- Use muted text for supporting copy and dim text only for metadata.
- Respect reduced-motion for all infinite, scroll-based, or large movement animations.

## 8. Source Mapping

Reusable patterns came from these Journey Home selectors:

- Headings: `.hero h1`, `h2.t`, `.final h2`, `.pb h2`.
- Section labels and copy: `.eyebrow`, `.lede`, `.mono`.
- Buttons: `.btn`, `.btn-blue`, `.btn-line`, `.pb-form .btn`, `.fab`.
- Cards: `.card`, `.scard`, `.tool`, `.pack`, `.rescard`, `.faq`, `.tst`.
- Gradient border: `.radar-card::before`.
- Status chips: `.chip`, `.c-safe`, `.c-warn`, `.c-risk`.
- Icon tiles: `.pico`, `.tico`, `.mist-ico`.
- CTA bands: `.chband`, `.pb`, `.final`.
- Motion: `.reveal`, `.spot`, `.rpanel-swap`, `ring`, `pulse`, `blink`, `mq`.
- Journey-only interactions: `#journey`, `#jsvg`, `#jdot`, `.jnode`, `.rounds-pinned`, `.rnode2`.