# Section 9: accessibility and responsive verification

Verified on 11 October 2026 against a production build in Chrome 154, using
axe-core 4.14.0. This records the checks performed; it is not a claim of full
WCAG conformance.

## Changes made

- Removed page-level horizontal clipping and allowed long identifiers to wrap.
- Added a 404 page with the shared skip-link target and usable recovery links.
- Darkened the light-theme accent after axe found a 4.26:1 current-role badge.
- Put the desktop photo caption on an opaque background for predictable contrast.
- Separated cover links from captions and loading/error messages so visible
  status text does not conflict with link names.
- Gave repeated associated-work regions distinct company names for assistive
  technology, and corrected media control names and group/region semantics.
- Increased small media controls and secondary navigation targets to at least
  44px, retained inset focus indicators on linked covers, and underlined the
  resume fallback link within prose.

## Results

| Check | Coverage | Result |
| --- | --- | --- |
| axe WCAG A/AA and best practices | All 11 public routes, a 404 route, both themes at 390 and 1440px, plus an open mobile menu | 49 audits; no reported violations |
| Responsive layout and text clipping | All 12 routes, both themes at 320, 390, 768, 1024 and 1440px, plus 844×390 landscape | Passed |
| Zoom-equivalent reflow | Effective CSS widths 320, 384, 512 and 720px at device scale 2, representing 200% zoom on 640–1440px displays | Passed |
| Combined layout checks | Standard and zoom-equivalent viewports | 240 checks; no page overflow, clipped text or heading-level skips |
| Keyboard navigation | All 12 routes at mobile and desktop widths | 24 complete paths; 439 focus stops visited with visible focus |
| Menu interactions | Escape, focus return, breakpoint reset and section selection | Passed |
| Image behavior | Reserved dimensions, raster `sizes`, deferred images and blocked image requests | Passed; project links and failure messages remain usable |
| Media component suite | Gallery keys, selected state, actual generated video playback, captions, failed images/videos and written alternatives | Passed |
| Media dialog | Initial focus, Tab containment, Escape, scroll locking/restoration, zoom/reset and contained panning | Passed at 320×568, 667×375 and 1440×900 in both themes |
| Accessibility tree | Named dialog and polite zoom status | Passed |
| Source validation | Production build, TypeScript, ESLint and whitespace checks | Passed |

The media suite also runs axe against the closed fixture in both themes and
against an open dialog. Generated video and diagram fixtures are temporary test
assets and are removed after the run; they are not presented as project demos.

## Contrast review

Axe's unresolved results are retained in the [raw report](verification/section-9/report.json).
They concern decorative gradients/overlapping backgrounds and the cross-origin
resume frame. They are not silently counted as automated passes.

The additional [contrast bounds](verification/section-9/contrast-bounds.json)
check 16 combinations from the implemented theme values. These include badge
alpha compositing, worst-case black/white backgrounds under the translucent
navigation, maximum combined decorative glow/grid opacity, the opaque photo
caption and contact action. The minimum ratio among these combinations is
5.48:1. Mobile and desktop screenshots in both themes were also visually reviewed.

SVG project covers are unoptimized vector assets, so Next.js omits HTML `sizes`
and bitmap variants for them. Their frames still reserve the supplied aspect
ratio. Optimized raster images are checked for responsive `sizes`.

## Production loading samples

Three samples per route were taken with browser cache disabled and cleared, a
warm local production server, a 390×844 viewport, 4× CPU slowdown, and Chrome
network emulation configured for 150ms latency, 1.6Mbps download and 0.75Mbps
upload. Each sample observes paint, layout shifts and long tasks for three
seconds after page load. These are local laboratory observations, not field
Core Web Vitals or Lighthouse scores.

| Route | Median observed LCP | Maximum observed CLS | Local transferred bytes |
| --- | ---: | ---: | ---: |
| `/` | 528ms | 0 | 168,045 |
| `/projects` | 548ms | 0 | 166,250 |
| `/projects/citeleaf` | 556ms | 0 | 165,613 |

Exact samples and conditions are retained in the raw report. The homepage does
not mount an eager video player or document embed.

## Repeating the checks

Install dependencies and Chrome/Edge, or set `CHROME_PATH` to its executable.
The browser profile is created in the OS temporary directory and closed/removed
after testing, keeping browser locks out of the production build directory.

```sh
pnpm build
pnpm test:accessibility
pnpm test:media
```

`pnpm test:accessibility --audit-only` runs just the axe pass and replaces the
report with that limited run. Run the full command again for complete results.
The media suite uses an isolated development build for its temporary fixture;
its compilation time is excluded from production performance measurements.

## Remaining manual checks

Actual browser UI zoom, Safari/Firefox and real-device behavior, and hands-on
screen-reader navigation with NVDA/VoiceOver remain untested. The zoom-equivalent
matrix and Chrome accessibility-tree checks cover layout and semantics but do
not replace those checks. Google Drive document contents are outside the site's
automated audit; public unauthenticated access was verified in section 8, and
view/download links remain available independently of the embedded frame.
