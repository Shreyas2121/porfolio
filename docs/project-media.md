# Project media

`/projects` lists professional `caseStudies` and `independentProjects` from
`src/lib/constants.ts`. Each entry has a unique `slug` and a direct URL at
`/projects/<slug>`. Professional selected-work entries on the experience page
can link to those slugs too.

The homepage and index use only `cover`. The detail page uses `media`, keeping
galleries from increasing the height of preview cards. Missing covers and empty
media sections collapse on the public site.

`WorkCard` provides the same preview on the homepage, work index and experience
page: a linked cover and title, summary, highlighted outcome or capability, three
technology labels and a primary case-study action. Independent previews also
offer separate demo and source links where available. Footers align within each
grid row. The homepage features four projects; the complete index groups all
eight into independent and professional work. PizzaStore leads the homepage and
independent project index with a larger storefront preview. Covered featured
cards stack their cover above the text through tablet widths and place it beside
the text on desktop.

## Cover

Use a representative screenshot or an explicitly labelled diagram. PizzaStore
uses an actual storefront screenshot as its cover and video poster, with ten
screenshots in `public/projects/pizza-store/` and a 3:13 YouTube walkthrough.
Its content and media records are maintained in `src/lib/pizza-store.ts`, and its
URL remains `/projects/food-delivery-platform`. The supplied PNGs are
preserved without re-encoding. The original MP4 is archived outside `public/` in
the ignored `archived-media/` folder and is not deployed. Walkthroughs accept only
YouTube video IDs; local video sources are not supported. Professional visuals are explicitly
labelled as reconstructed overviews; independent visuals describe their product
workflows. Keep those labels when updating the diagrams, or replace them with
an accurate caption when adding a real product screenshot.

```ts
cover: {
  src: "/projects/example/cover.webp",
  alt: "Describe the relevant product view or flow.",
  width: 1600,
  height: 1000,
  caption: "Describe what this visual shows.",
}
```

Use real intrinsic dimensions. The frame reserves that aspect ratio before the
image loads. Keep cover assets at the same 16:10 ratio for consistent previews.
Screenshots and diagrams use `object-contain` so controls and labels remain visible.

## Detail media

Add a `media` array to either project type. Array order controls the order within
each section; optional numeric `order` values override it. IDs should be unique
within the project. Screenshots and diagrams can also use `section: "workflows"`
or `section: "decisions"` to appear next to the relevant explanation. Empty
professional sections and their contents links collapse automatically.
The following paths are
examples; add actual files in `public/projects/<slug>/` before adding these records.

```ts
media: [
  {
    id: "workspace",
    type: "screenshot",
    section: "gallery",
    src: "/projects/example/workspace.webp",
    alt: "Describe the visible workflow and relevant controls.",
    width: 1600,
    height: 1000,
    caption: "Workspace with source citations open.",
  },
  {
    id: "architecture",
    type: "diagram",
    section: "architecture",
    src: "/projects/example/architecture.svg",
    expanded: { // optional; use the larger asset's own intrinsic dimensions
      src: "/projects/example/architecture-detailed.svg",
      alt: "Detailed description of the expanded architecture.",
      width: 1800,
      height: 1400,
    },
    alt: "Short description of the relationships shown.",
    width: 1200,
    height: 800,
    caption: "Application and data flow.",
    explanation: "Text equivalent explaining the important relationships.",
    legend: [{ symbol: "Solid arrow", meaning: "Request flow" }], // match the actual diagram
  },
  {
    id: "walkthrough",
    type: "video",
    section: "walkthrough",
    youtubeId: "BlVTIPPrUW0", // the 11-character ID, not a URL or file path
    poster: "/projects/example/walkthrough-poster.webp",
    width: 1920,
    height: 1080,
    title: "Research workflow",
    caption: "Import a source and inspect a cited answer.",
    duration: "0:45",
    steps: ["Import the source.", "Ask a question.", "Inspect its citations."],
    transcript: "/projects/example/transcript.txt",
  },
]
```

The gallery leads with one large image, selectable thumbnails, previous/next
buttons and an enlarge control. Arrow keys, Home and End work when the gallery
or its controls have focus; they do not change the gallery inside an open viewer.
Portrait screenshots retain their dimensions rather than being cropped into a
landscape frame. Diagrams offer enlargement, zoom/reset controls,
contained scrolling and their text explanation. Native modal dialogs contain
keyboard focus, close with Escape, restore opener focus and lock background scrolling.
The image and its longer explanation scroll inside the viewer so the close and
zoom controls remain available on short landscape screens. The legacy
`expandedSrc` field remains supported for an alternate asset with the same ratio;
prefer `expanded` when its dimensions or description differ.

Videos load a responsive YouTube privacy-enhanced iframe only after Play is
selected. The preview uses a local screenshot; the player reserves a 16:9 frame
with a minimum height of 200px and supports fullscreen. Focus moves to the iframe
after activation. Duration, a Watch on YouTube link and optional written steps or
transcript remain available independently of playback. Manage video captions in
YouTube. The watch link also works when embeds are blocked or unavailable; the
site does not claim to detect playback errors inside the cross-origin player.
Cover failures preserve their dimensions while keeping the case-study link usable.

Use `youtubeId` on every video record. `src` is forbidden by the media type and
IDs are validated before embed URLs are built. `pnpm test:videos` rejects video
files under `public/`; the same check runs before every production build.

Public records include product screenshots, diagrams and a YouTube walkthrough.
Add truthful screenshots and short recordings when available;
do not publish test illustrations as product captures. The preserved development
example is `docs/media-component-preview.tsx.example` and is not a public route.

## Verification

Case studies use a sticky contents rail on desktop and an expandable contents
control on mobile. Links follow the current reading section, support direct
fragment URLs, and focus the selected section after navigation. Only populated
gallery, walkthrough and professional architecture sections appear in the contents.
Anchor offsets account for both the fixed navbar and the mobile contents control.

Every detail page includes a compact work type, context and core stack strip.
Long overview and decision prose is constrained separately from the wider media
column. Workflow columns adapt to the number of user groups, and limitations use
a neutral supporting panel.

The shared next-project navigation visits all eight projects in index order,
including professional case studies, then wraps back to the first. Breadcrumb
and footer links restore the index position remembered when opening a preview in
the same tab. This position is kept in session storage for up to 30 minutes;
direct entries and unavailable storage fall back to normal index/category links.
Modified clicks retain standard new-tab behavior.

Run `pnpm test:media` with Node 22+ and Chrome or Edge installed. Set `CHROME_PATH`
if the executable is outside the usual installation paths. The script starts its
own development server and headless browser, creates a temporary fixture route
and assets in `public/__media-check`, and removes these and the browser profile
afterwards. Existing fixture paths are never overwritten. The fixtures use labelled
illustrations and intentionally missing assets to exercise gallery and error states;
they are not published as project content.
Browser-test compilation uses an isolated directory under `.next` and restores
Next's temporary TypeScript include afterwards, keeping the production build
separate from test compilation.

The browser checks cover the complete index and all eight detail URLs, empty media
sections, gallery selection, modal keyboard focus and restoration, Escape, zoom,
YouTube click-to-load, embed URL, player title, focus, fullscreen permission and
watch-link fallback with external YouTube requests blocked (not hosted playback),
portrait dimensions, expanded diagram dimensions, figure order,
gallery arrow keys and contained zoom/panning, desktop and mobile contents navigation,
direct section URLs, section focus and active states, resume icon affordances,
and reflow in both themes at 320, 390, 768 and 1440px, plus a short landscape viewer.
Run `pnpm build` afterwards for production validation.
