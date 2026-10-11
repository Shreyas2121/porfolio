# Portfolio UI/UX review

Review date: 10 October 2026. Lens: a full-stack developer with **4+ years of experience**. This review evaluates presentation, navigation, interaction and media readiness. Existing text is used to understand the pages; rewriting or evaluating your claims is outside scope.

Review basis: source inspection of the homepage, project index/detail template, experience page, resume page, shared components, styles and project data. A local preview was attempted, but requests did not complete even after compilation, so no rendered screenshots or browser interaction results were obtained. Layout recommendations below are based on the implemented markup/styles; responsive, contrast and performance checks are acceptance criteria for follow-up, not claimed test passes.

## Overall assessment

The portfolio has a good foundation: consistent spacing conventions, a restrained emerald/slate palette, legible typography, clear primary actions and dedicated project pages. Keep that foundation.

The biggest improvement is **making your work easier to see and assess**. Currently, most of the experience is reading similarly styled blocks. The portrait supplies personality, but projects have very little visual identity. For your experience level, I would aim for a polished engineering portfolio where a visitor can quickly identify your strongest work, inspect the product, and then explore its architecture.

My recommended direction is a shorter overview page, a coherent work index, and spacious project detail pages with actual screenshots, diagrams and short demos. More animation or decoration would have much less value.

## 1. Highest-impact changes

| Priority | Current observation | Recommended change | Why it matters |
| --- | --- | --- | --- |
| High | Homepage renders all professional case studies, all independent projects and the full achievements/stack for every job. | Feature 2–3 work previews and a compact career summary; keep full detail on dedicated pages. | Establishes a clear order of importance and reduces repeated reading. |
| High | Projects are mainly text and technology badges. | Give each featured project one meaningful cover visual and a consistent media area. | Visitors can recognize and compare the work before reading deeply. |
| High | Homepage selected work includes professional case studies; `/projects` includes only independent projects. | Make `/projects` the complete work index with professional and independent groupings. | A navigation item should lead to the work visitors just saw advertised. |
| High | Media support is an optional image array; videos and diagrams have no dedicated presentation. | Define cover, gallery, architecture and walkthrough sections now. | Avoids redesigning the page every time an asset is added. |
| Medium | Large headings, rounded boxes, pills and generous section padding repeat throughout. | Vary the composition: media previews, compact timeline, open prose and a small number of emphasis panels. | Makes the strongest material stand out and gives long pages a clearer rhythm. |
| Medium | Project detail pages have many sections but no local navigation. | Add section anchors, a desktop contents rail and a compact mobile contents control. | Lets technical reviewers jump to the material they care about. |
| Medium | Resume links use a download icon even when they open a page. | Use a document icon for viewing and reserve the download icon for downloading. | The affordance should match the result. |

## 2. Homepage and first impression

### Hero

The two-column layout, portrait and strong headline create a clear introduction. Keep the photo; it makes the site personal. Reduce how much vertical space the introduction consumes, especially on mobile.

- Give the primary work action a clear position within the first mobile viewport. Make the resume action visually secondary.
- Reduce the mobile heading scale slightly and tune line breaks through width and typography, without forcing desktop line breaks onto phones.
- Replace the three vertically stacked signal panels on narrow screens with a more compact treatment. They should help scanning without becoming a section of their own.
- Scale down the mobile portrait. A large portrait beneath a long introduction delays the first project substantially.
- Keep either the photo framing or the stronger glow as the main accent; the grid, gradient, border, inset frame and overlay together add several competing layers.
- Treat the photo caption as supporting information. Keep enough of the image visible and ensure its dark overlay remains readable in both themes.

For desktop, aim to show the beginning of selected work around the first fold on a typical laptop. This is a design target, not a fixed viewport-height rule; content must still reflow naturally.

### Recommended page order

1. Compact introduction with work and resume actions.
2. Two or three featured work previews, including professional work.
3. Compact experience timeline with a route to the full experience page.
4. Small grouped capabilities section.
5. Contact block and footer.

The current ordering of work before the full career history is sensible. The issue is the amount shown within each section. Let the homepage act as an overview.

## 3. Project previews and the work index

### Give projects a recognizable visual identity

Use one representative visual per preview: a product screenshot, a focused workflow diagram or an architecture excerpt. Use consistent preview dimensions and restrained frames. A generic gradient and icon can be a fallback, but should not be the defining visual for all professional work.

Recommended preview structure:

```text
+---------------------------------------------+
| Product screenshot / relevant diagram        |
| Consistent preview frame                    |
+---------------------------------------------+
| Project title                 Project type  |
| Short overview                              |
| One prominent role/outcome summary          |
| A few supporting technology labels          |
| View case study       Demo       Source     |
+---------------------------------------------+
```

This specifies hierarchy, not replacement copy. The existing detail can remain on the project page.

- Make the title and cover link to the case study. Keep Demo and Source as separate links; avoid nesting links inside one giant clickable card.
- Give the case study action the strongest visual emphasis on the overview. On the detail page, the demo can be primary.
- Use a consistent footer placement so actions line up between adjacent cards with different description lengths.
- Show only a few technology labels in previews. Put the complete list in the detail view.
- Limit previews to one cover image. Currently some homepage image loops render every supplied image, so adding a gallery could unexpectedly make homepage cards much taller.
- Keep media and labels consistent across the homepage, index and detail page. The cover should help the visitor recognize the same project after navigating.

### Resolve the professional-work navigation gap

The professional `caseStudies` items have no slug or dedicated detail route. They look substantial on the homepage but offer no deeper destination. Meanwhile, the experience page's selected-work action leads to the independent-project index.

Add professional case-study routes, or provide a clearly identified destination in the experience page until those routes exist. The work index should expose both categories. With the current small collection, simple grouped sections are sufficient; search and a large filter system would add unnecessary interaction.

Do not give all projects identical prominence. One larger featured project followed by smaller previews would make the selection feel intentional. The 4+ years perspective calls for visible prioritization and ownership, rather than maximum card count.

## 4. Project detail pages

The existing sections provide a useful starting structure, but nearly everything is a text panel. The architecture section is particularly suited to a diagram alongside the existing explanations.

Recommended page composition:

```text
Breadcrumb / All work
Project title + concise overview + actions
Compact role / scope / context strip

Large product cover or walkthrough poster

Desktop contents rail    Main reading column
Overview                Problem and solution
Product walkthrough     Video and/or key screenshots
Architecture            Large diagram + explanation
Decisions               Focused decision blocks
Constraints             Neutral supporting section

Next project            Contact / All work
```

- Keep long prose to approximately 60–75 characters per line as a starting design target. Media can span a wider area than the text.
- Add real section headings. Several current section labels are styled paragraphs; semantic headings make the same structure available to assistive technology.
- Use a sticky contents rail on wide screens. On phones, use a labelled disclosure with anchor links; a long horizontal tab strip can hide destinations.
- Account for the fixed navbar in anchor offsets and keep the selected section visible in local navigation.
- Use cards for genuinely discrete items. Problem/solution prose and architecture explanations do not all need enclosing boxes.
- Adapt grids to the amount of material. For example, the workflow grid always has three desktop columns even when a project has two user groups.
- Keep technical constraints visible, but consider a neutral panel rather than an amber warning treatment for ordinary project scope. Amber plus a warning icon makes that section unusually prominent.
- Add a next-project link at the end. Currently the ending repeats demo/source actions but gives little help continuing through the portfolio.
- Preserve scroll position when returning to the index, and give every project a usable direct URL.

## 5. Space for diagrams, screenshots and videos

**There is partial image support today, but the portfolio is not yet designed for the complete media experience you want.**

In `src/lib/constants.ts`, `ProjectImage` contains only `src` and `alt`, and projects have optional `images` arrays. The current project records do not populate those arrays. The rendering branches disappear when images are absent, so no visible space is currently reserved. There are no dedicated video, poster, caption, diagram or zoom fields.

### Media placement

| Asset | Placement | Presentation |
| --- | --- | --- |
| Project cover | Homepage/index preview and near the top of the detail page | One consistent frame; 16:10 or 16:9 is a practical starting point. |
| Product screenshots | Walkthrough section near the relevant explanation | One large image with thumbnails or a short sequence of figures. |
| Architecture diagram | Architecture section | Full-width figure with a neutral canvas and an explicit enlarge control. |
| Sequence/data-flow diagram | Beside the decision or workflow it explains | Independent figure with a caption and a readable expanded view. |
| Demo video | Near the top or in the walkthrough section | Poster, play control, duration and normal player controls. |

Reserve these slots in the layout and data structure. Use labelled placeholders in design previews while assets are being prepared; collapse missing sections on the public site so it does not look unfinished. When an asset exists, reserve its dimensions before it loads to avoid layout movement.

### Screenshots

- Current image containers use `object-cover` inside fixed video-shaped frames. This can crop controls, navigation and labels. Use `object-contain` for full product screenshots; use cropping only for an intentional cover or detail crop.
- Avoid putting several entire dashboards in tiny equal-sized thumbnails and expecting their text to be readable. Lead with one useful view and allow enlargement.
- Add a caption for each image and a clear selected state for gallery thumbnails. Captions can explain what area the visitor is looking at without turning into another paragraph-heavy section.
- Support keyboard access and visible previous/next controls if using a gallery. Swipe can supplement those controls on mobile.
- Include actual mobile screenshots where they help demonstrate the product's responsive experience.
- Keep screenshots truthful to the product. Do not recolor a product screenshot just to match the portfolio theme.

### Diagrams

- Prefer SVG for crisp architecture diagrams when appropriate. Put diagrams on an explicit canvas so lines and labels remain visible in both portfolio themes.
- Show a simplified readable overview inline and offer a larger detailed view when needed. Shrinking one complex diagram to phone width is insufficient.
- Add a legend when symbols need explanation. Distinguish relationships with labels and line styles as well as color.
- Offer enlarge/fullscreen plus zoom/reset controls where the diagram warrants them. If panning is needed, keep it contained within the viewer.
- Supply a short text summary and a longer nearby explanation for complex relationships. W3C recommends text equivalents for complex images: [Complex Images](https://www.w3.org/WAI/tutorials/images/complex/).
- Reconstructed professional-work diagrams should be visibly identified as such and use material you can share.

### Videos

- Use a clear poster and click-to-play. Avoid autoplaying multiple demos while visitors scroll.
- A short walkthrough, roughly 30–90 seconds as an editorial starting point, is easier to inspect than a long unstructured recording.
- Include duration before playback, accessible playback controls and fullscreen support. Add captions for speech and a useful written walkthrough for important visual-only actions.
- Keep key screenshots available independently so understanding the project does not require playing a video.
- On mobile, preserve native fullscreen playback and avoid a floating player that obscures the page.
- Use lightweight posters and load the player/video on demand. Include an error fallback or direct video link if playback fails.

### Media viewer behavior

An expanded screenshot or diagram should have a labelled close control, Escape dismissal, sensible initial focus, contained keyboard focus while modal, focus restoration to its opener and background scroll locking. Loading and failure states should preserve the frame and explain what happened.

The existing `src/components/modal.tsx` is not mounted in the reviewed pages and should not be assumed ready for a media gallery. It lacks the dialog semantics and keyboard/focus behavior above; its outside-click ref also wraps the backdrop, which prevents the intended backdrop dismissal from behaving as expected.

### Suggested media model

Keep a single `cover` separate from a `media` collection. Each media entry should identify its type (`screenshot`, `diagram`, `video`), source, intrinsic dimensions/aspect ratio, accessible description and visible caption. Video entries additionally need a poster, duration and caption/transcript references; diagrams may need a larger source or text explanation. Include grouping/order so assets can sit next to the section they explain.

This is a design specification for future implementation. No media components or assets are added by this review.

## 6. Experience and capabilities

The dedicated experience page deserves the detail it has. The homepage repeats enough of it that the second page offers limited visual progression.

- Use a compact vertical timeline or simple rows on the homepage: dates, company, role and a small amount of supporting detail.
- Give the current role slightly more emphasis and keep earlier roles visually quieter. Move the current-role marker next to the role/date rather than after all the detail.
- On the experience page, improve the separation of role header, contributions and associated work. Link associated work to the corresponding case study when one exists.
- Avoid nested card grids for every subsection; simple dividers can organize secondary material with less visual noise.
- Keep capabilities grouped by function. Reduce pill density and avoid making every label look like a clickable filter when it is static.
- Let evidence in projects do more of the work of demonstrating expertise. A capabilities list should be easy to scan and occupy less space than featured work.

## 7. Visual system, typography and themes

- Keep emerald as the main action color. Use violet and amber sparingly and consistently so they do not compete for attention.
- Define a small hierarchy of surface styles: page, raised card and media canvas. The current repeated gradients and bordered cards make different kinds of information look equally important.
- Use one consistent outer alignment for navigation and major sections. The current mix of `max-w-7xl`, `max-w-6xl` and `max-w-5xl` should be intentional; constrain prose inside the shared outer grid.
- Reduce repeated oversized section introductions. Reserve the largest type for the page hero and a few key moments.
- Use roughly 16–18px for sustained reading and reserve the smallest text for genuinely secondary metadata. Several dense project/experience descriptions currently use 14px alongside many 12px labels.
- Limit all-caps, widely tracked labels. They work as small signposts but become noise when repeated inside every card.
- Use responsive section spacing rather than `py-24` throughout. A starting range of 48–64px on phones and 72–96px on desktop would reduce unnecessary mobile scrolling while preserving breathing room.
- The stylesheet names Inter but does not load it. Either load the chosen font intentionally or treat the system font as the design font; confirm wrapping across platforms.
- Define colors by purpose, such as primary action, text on accent and elevated surface. The current light theme globally remaps dark-oriented utility classes, which makes exceptions and future media styling harder to reason about.
- Review both themes independently, including hover, focus, photo overlays and media controls. The contact email button, for example, changes from a dark button to a pale button in light mode because of these global mappings; choose its hierarchy intentionally.
- Keep motion subtle. Short hover/focus transitions are sufficient; loading entrances, parallax and scroll hijacking would delay access to the work.

## 8. Navigation, contact and resume

### Navigation

- Add an active route state and `aria-current` where appropriate. The current navbar renders all destinations alike.
- Maintain a clear distinction between in-page anchors and separate pages. Homepage work links and the Projects navigation should ultimately expose the same collection.
- Add a skip-to-main-content link. Place shared navigation outside the main content landmark when refining the page shell.
- Keep the mobile menu a straightforward disclosure unless intentionally redesigning it as a modal drawer. A disclosure needs predictable tab order, Escape dismissal and focus return; a modal drawer additionally needs focus containment and an inert background.
- Check menu behavior after selecting the current route, the resume link and anchor links, and after resizing to desktop. Ensure hidden menu state does not unexpectedly reappear on returning to mobile.
- Include theme access where it remains discoverable on mobile without making the header crowded.

### Contact

The contact block is easy to identify and has a clear primary action. Keep that simplicity. Add a visible email address with a copy control and accessible success feedback, so someone without a configured mail app can still contact you. Keep LinkedIn and GitHub secondary. A contact form is optional and unnecessary solely for visual completeness.

### Resume

The dedicated resume page already offers preview, download and an external-view fallback, which is useful. Reduce its introductory space so the document or its actions appear sooner, especially on a phone. Treat the embedded viewer as an enhancement: offer a prominent external-view action when the small viewport or third-party loading makes reading difficult. Add a stable loading state and keep fallback actions usable if embedding fails.

The iframe currently has a 560px minimum height; evaluate that against short mobile viewports and avoid a frustrating page-scroll/document-scroll combination. Verify the external document can be opened without signing in before sharing the portfolio.

## 9. Accessibility and responsive acceptance criteria

The existing focus-visible styles, labelled theme/menu controls and reduced-motion stylesheet are good foundations. This review is not a full accessibility conformance audit.

- Confirm all routes at 320, 390, 768, 1024 and 1440px, plus a short landscape viewport. Check navigation wrapping, titles, tag wrapping and CTA placement.
- Verify 200% zoom and reflow at narrow widths. `overflow-hidden` on the page should not conceal clipped text or focus indicators.
- Keep essential information visible without hover. Make links recognizable through more than color alone when embedded in prose.
- Test actual text/background combinations, including translucent panels. WCAG AA calls for at least 4.5:1 for normal text and 3:1 for qualifying large text: [Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- Aim for roughly 44×44px interactive targets for comfortable touch use. This is a design target; WCAG 2.2 AA's minimum target-size criterion is 24×24 CSS pixels with stated exceptions and spacing allowances: [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- Check heading order, descriptive link names, decorative icon handling and a keyboard path through the whole site.
- Check menu Escape behavior and focus placement. For future media dialogs, verify focus containment, restoration and screen-reader announcements.
- Preserve image dimensions, use responsive image sizes and defer below-the-fold media. The project `Image` components currently use `fill` without `sizes`; add accurate sizes with the new layouts.
- Avoid eager video embeds on the homepage. Test media loading on a slow connection and ensure the page remains useful when an asset fails.
- Measure production performance after media is added. Development compilation time is not evidence of visitor-facing speed, and no production performance score is asserted here.

## 10. Suggested implementation order

1. **Structure:** settle the complete work index, professional case-study destinations and shorter homepage hierarchy.
2. **Media layout:** build one representative detail page with a real screenshot, diagram and video; refine desktop and mobile behavior before duplicating the pattern.
3. **Visual refinement:** adjust hero proportions, card composition, type scale, section spacing, alignment and theme colors.
4. **Interaction:** active navigation, local contents, media viewer, email copy feedback and resume states.
5. **Verification:** keyboard use, responsive reflow, both themes, media failures and production loading behavior.

The single most valuable change is to move from a predominantly text-led presentation to **a small selection of visually inspectable projects with clear paths into deeper engineering detail**. That would better support the impression of someone with 4+ years of practical experience while retaining the current design foundation.
