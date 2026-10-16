import type { IndependentProject } from "@/lib/constants";

export const archboard: IndependentProject = {
  slug: "archboard",
  title: "Archboard",
  context: "Local-first architecture diagram editor",
  description:
    "An architecture workspace for turning software systems into editable diagrams, presenting request flows and keeping portable diagrams alongside a codebase, with local persistence and authenticated collaboration.",
  highlights: [
    "Editable system diagrams with component, code, schema and note cards, connections and boundaries",
    "Local project-JSON import with validation, diagram preview and automatic layout",
    "Account-scoped offline updates with a durable outbox and commit-before-acknowledgement synchronization",
    "Presentation steps, immutable checkpoints and portable JSON, SVG and PNG exports",
  ],
  stack: ["TypeScript", "React", "NestJS", "React Flow", "Yjs", "IndexedDB", "PostgreSQL", "TypeORM", "WebSockets", "Better Auth", "Zustand", "Vite"],
  repository: "https://github.com/Shreyas2121/archboard",
  demo: "https://archboard-one.vercel.app/",
  cover: {
    src: "/projects/archboard/editor-overview.png",
    alt: "Archboard editor displaying PizzaStore user, store and membership cards with connections, an add-to-board sidebar and the inspector.",
    width: 1912,
    height: 905,
    caption: "Architecture editor with the PizzaStore data model",
  },
  media: [
    {
      id: "editor-overview",
      type: "screenshot",
      section: "gallery",
      src: "/projects/archboard/editor-overview.png",
      alt: "Archboard's dark editor showing connected User, Store and Store Membership cards, card creation tools, inspector tabs and a Saved to server indicator.",
      width: 1912,
      height: 905,
      caption: "Editing the PizzaStore data model with cards, connections and boundaries",
    },
    {
      id: "project-json-import",
      type: "screenshot",
      section: "gallery",
      src: "/projects/archboard/project-json-import.png",
      alt: "Create a diagram from project JSON dialog with Database relationships selected, optional extraction instructions, a copy-prompt control and a JSON file picker before a file is loaded.",
      width: 1106,
      height: 752,
      caption: "Project JSON setup with a focused extraction prompt and local file import",
    },
    {
      id: "landing",
      type: "screenshot",
      section: "gallery",
      src: "/projects/archboard/landing.png",
      alt: "Archboard landing page with the headline Think in systems. See the whole board., a client-to-API-to-database illustration, GitHub sign-in and a local demo link.",
      width: 1915,
      height: 906,
      caption: "Product introduction with sign-in and a local demo entry point",
    },
  ],
  problem:
    "Architecture explanations often live in disconnected drawings or static images that are difficult to edit, present and keep with a project. A collaborative editor also needs to distinguish a locally saved edit from a committed server update, preserve pending work through disconnections and enforce current permissions when clients reconnect.",
  solution:
    "Archboard combines an interactive system canvas with a local document model, browser persistence and an optional authenticated server workflow. Developers can start from templates or import focused project-context JSON, edit cards and relationships, walk through ordered presentation steps and export editable or visual artifacts. Shared boards add owner, editor and viewer access, invitations, discussion and committed checkpoints.",
  users: [
    {
      role: "Developers",
      capabilities:
        "Sketch systems, document contracts in code and schema cards, import project-context JSON and export diagrams to keep alongside a repository. A local demo supports exploration without signing in.",
    },
    {
      role: "Collaborators",
      capabilities:
        "Work on authenticated boards with role-based editing, invitations and discussion. Cached eligible boards retain local updates while disconnected and queue them for synchronization.",
    },
    {
      role: "Presenters and reviewers",
      capabilities:
        "Explain request flows through ordered steps, notes and highlights, explicitly follow a presenter and inspect committed checkpoints without overwriting the original board.",
    },
  ],
  architecture: [
    {
      layer: "Canvas and document model",
      details:
        "React Flow handles canvas interaction. Domain commands edit a Yjs document with graph contracts and validation; Zustand holds transient interface state rather than a second editable graph.",
      technologies: ["React", "React Flow", "Yjs", "Zustand", "TypeScript"],
    },
    {
      layer: "Local persistence and synchronization",
      details:
        "Account-scoped IndexedDB storage keeps document updates and a durable outbox. Local writer ownership and recovery rules preserve pending work, while the interface distinguishes device saving, pending updates and server acknowledgement.",
      technologies: ["IndexedDB", "Yjs", "WebSockets"],
    },
    {
      layer: "Server authority and durability",
      details:
        "The NestJS server checks current access and validates graph updates before committing snapshots, updates and retry receipts in PostgreSQL. HTTP services manage accounts, board metadata, memberships, invitations, discussion and checkpoints.",
      technologies: ["NestJS", "PostgreSQL", "TypeORM", "Better Auth"],
    },
    {
      layer: "Project import and portability",
      details:
        "Project-context JSON is parsed, validated and arranged locally with a bounded layout worker and grid fallback. Portable board JSON preserves editable content; controlled SVG and PNG exports support sharing visual explanations.",
      technologies: ["JSON", "Web Workers", "SVG", "PNG"],
    },
  ],
  decisions: [
    {
      title: "Separate local saving from server durability",
      description:
        "An IndexedDB write does not imply a committed server save. Explicit pending and acknowledged states keep offline work visible and avoid presenting uncertain synchronization as success.",
    },
    {
      title: "Commit before acknowledging an update",
      description:
        "The server commits accepted graph updates before sending an acknowledgement. Retained receipts let a retry with the same update ID and exact bytes recover the original result after a lost acknowledgement.",
    },
    {
      title: "Enforce authority beyond document merging",
      description:
        "Yjs supplies merging, while Archboard owns role checks, graph limits and isolated validation. Current server authority decides whether an update is accepted, including after a client reconnects.",
    },
    {
      title: "Import project context without a hosted model dependency",
      description:
        "Users extract a focused JSON description with their own coding tool, then review a locally validated preview. Import adds fresh graph IDs beside existing content and preserves declared relationships; hosted AI generation is retired from the active runtime.",
    },
    {
      title: "Restore copies instead of rewriting history",
      description:
        "Checkpoints remain immutable and restore into a new private board. Deleted-object restoration creates fresh IDs while retaining tombstones, keeping old references from silently becoming active again.",
    },
  ],
  limitations: [
    "Integrated browser and database verification remains partly deferred; the project does not claim production readiness or measured collaboration performance.",
    "Editing targets desktop screens. Narrow screens support reading and presentation and may be read-only.",
    "The current API uses one NestJS writer per database; horizontal collaboration scaling is outside the implemented deployment model.",
    "Browser storage and server checkpoints are not independent backups. Portable exports are available; scheduled server backup and restore tooling remains deferred.",
  ],
};
