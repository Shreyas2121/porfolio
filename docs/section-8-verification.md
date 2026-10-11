# Navigation, contact and resume verification

Verified on 11 October 2026 against a production build in headless Chrome.

- Production build, TypeScript and ESLint passed.
- 83 browser assertions passed, including 60 responsive checks across the home,
  work index, experience, resume and Citeleaf detail routes in both themes.
- Viewports: 320×844, 390×844, 768×900, 1024×900, 1440×900 and 844×390.
- Keyboard checks covered skip-link focus, menu Escape dismissal and focus
  restoration, current-route selection, anchor focus, and desktop resize reset.
- Projects remains active on project detail routes; selected homepage anchors
  use `aria-current="location"`. Page links use `aria-current="page"`.
- The shared theme button toggled correctly before and after resizing.
- Clipboard success and rejection were simulated to check the copied value,
  live status messages and selectable-address fallback.
- Mobile resume preview remained opt-in; desktop preview loaded automatically.
  External viewing precedes downloading in both visual and keyboard order.
- With Google Drive requests blocked and the loading timeout accelerated,
  the preview displayed its fallback message and retained external-view links.
- The public Google Drive document displayed its actual resume text in a fresh
  browser profile without signing in.

Cross-origin iframe contents cannot be inspected by the portfolio. An iframe
load event indicates frame navigation, not successful document rendering; the
interface therefore always retains external viewing and download options.
