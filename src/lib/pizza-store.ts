import type { IndependentProject } from "@/lib/constants";

export const pizzaStore: IndependentProject = {
  slug: "food-delivery-platform",
  title: "PizzaStore",
  context: "Flagship project · Multi-store ordering, operations and accounting",
  description:
    "A multi-store food ordering and operations platform that connects customer checkout to inventory, fulfillment, payment recovery and a double-entry ledger, with dedicated workspaces for store staff, finance and payroll.",
  highlights: [
    "One connected lifecycle from checkout and stock reservation to delivery, refunds and balanced accounting",
    "Server-owned pricing with saved customization, promotion, bundle and tax snapshots",
    "Five store-scoped staff roles with current-membership checks and isolated client caches",
    "Recoverable financial posting with a transactional outbox and immutable posted journals",
  ],
  stack: [
    "TypeScript", "React", "PostgreSQL", "Node.js", "Express", "Drizzle ORM",
    "Vite", "Mantine", "Tailwind CSS", "TanStack Query", "TanStack Table",
    "Zustand", "React Hook Form", "Zod", "Socket.IO", "JWT", "Razorpay Test Mode", "Vitest", "PGlite",
  ],
  repository: "https://github.com/Shreyas2121/pizza-store",
  demo: "https://pizza-store-delta-brown.vercel.app/",
  cover: {
    src: "/projects/pizza-store/storefront.png",
    alt: "PizzaStore customer storefront with its pizza hero, menu navigation, delivery pincode and ordering actions.",
    width: 1911,
    height: 905,
    caption: "Customer storefront · actual application screenshot",
  },
  media: [
    {
      id: "data-model",
      type: "diagram",
      section: "architecture",
      src: "/projects/pizza-store/data-model.png",
      alt: "PizzaStore data model connecting users and store memberships to stores, products, store products, orders and order items, with related payment attempts, refunds, promotions, promotion applications and journal entries.",
      width: 4854,
      height: 1263,
      caption: "Core data relationships across store operations, ordering, payments, promotions and accounting. Created with Archboard.",
      explanation:
        "Stores connect staff memberships, store-specific products and fulfillment. Orders preserve item snapshots and link to payment attempts, refunds and promotion applications, while journal entries record financial events. This is a focused overview of selected entities and relationships, rather than the complete database schema. Open the full-size diagram to inspect the labels and cardinalities.",
    },
    {
      id: "storefront",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/storefront.png",
      alt: "PizzaStore homepage with a pizza hero, delivery pincode, cart and order-now action.",
      width: 1911,
      height: 905,
      caption: "Customer storefront and ordering entry point",
    },
    {
      id: "store-menu",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/menu.png",
      alt: "Menu for the Fort store with food categories, product photos and a recommended sort control.",
      width: 1916,
      height: 910,
      caption: "Store-specific menu browsing and category filters",
    },
    {
      id: "product-customization",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/customization.png",
      alt: "Pepperoni Feast customization with Medium size, Hand Tossed crust and an estimated total of 549 rupees.",
      width: 1911,
      height: 890,
      caption: "Product customization with required options and an estimated total",
    },
    {
      id: "checkout-details",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/checkout-details.png",
      alt: "Checkout contact and delivery sections alongside an order summary showing a 20-rupee automatic item offer.",
      width: 1805,
      height: 736,
      caption: "Checkout store context, customer details and automatic offers",
    },
    {
      id: "checkout-payment",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/checkout-payment.png",
      alt: "Cash-on-delivery and simulated online payment choices with item discount, included tax and a 529-rupee total payable.",
      width: 1902,
      height: 910,
      caption: "Payment choices and the quote's tax, discount and savings breakdown",
    },
    {
      id: "order-fulfillment",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/order-fulfillment.png",
      alt: "Staff detail view for pending COD order 421, showing payment status, fulfillment controls and saved item customizations.",
      width: 1897,
      height: 922,
      caption: "Staff order detail with separate payment and fulfillment states",
    },
    {
      id: "inventory",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/inventory.png",
      alt: "Fort store inventory table with on-hand, reserved, available and threshold quantities for each product.",
      width: 1571,
      height: 912,
      caption: "Store inventory with on-hand, reserved and available stock",
    },
    {
      id: "ledger-trial-balance",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/ledger-trial-balance.png",
      alt: "Ledger trial balance showing equal total debits and credits of 364292.62 rupees, with account-level balances.",
      width: 1541,
      height: 812,
      caption: "Ledger trial balance with equal debit and credit totals",
    },
    {
      id: "promotions",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/promotions.png",
      alt: "Promotion administration showing percentage, fixed-amount, buy-two-get-one and free-delivery offers with store participation.",
      width: 1567,
      height: 902,
      caption: "Global promotion definitions and selected-store participation",
    },
    {
      id: "store-staff",
      type: "screenshot",
      section: "gallery",
      src: "/projects/pizza-store/store-staff.png",
      alt: "Active store staff with manager, payroll manager, inventory staff, finance manager and operator roles and suspension or revocation actions.",
      width: 1547,
      height: 891,
      caption: "Store staff roles and membership lifecycle controls",
    },
    {
      id: "product-demo",
      type: "video",
      section: "walkthrough",
      src: "/projects/pizza-store/walkthrough.mp4",
      poster: "/projects/pizza-store/storefront.png",
      width: 1914,
      height: 910,
      title: "PizzaStore product demo",
      caption: "Recorded walkthrough of the PizzaStore application.",
      duration: "3:13",
      steps: [],
    },
  ],
  problem:
    "A restaurant order affects more than a cart. Store prices and offers can change, two customers can compete for the last item, and payment confirmation can arrive after a failed request. Delivery, refunds, cash drawers and operating costs then need to agree with the financial records. Across multiple stores, each staff member also needs access to the right operations without exposing another store's data or restricted payroll information.",
  solution:
    "PizzaStore brings the storefront and operational workspaces into one application. The server owns checkout pricing and preserves the accepted quote, inventory reservations coordinate online payment with stock, and store permissions constrain staff actions. Business changes record financial events in the same database transaction; a separately invoked posting worker turns supported events into balanced journals. Store and consolidated reporting connect the customer order to the money collected, revenue recognized and costs recorded.",
  users: [
    {
      role: "Customers",
      capabilities:
        "Choose a store, browse its priced menu, customize items, buy component-backed combos, discover offers, apply eligible coupons and validate delivery addresses. Place COD or simulated online orders, inspect saved order history and contact support through chat.",
    },
    {
      role: "Store managers",
      capabilities:
        "Manage store prices, product mappings, delivery zones and safe store settings. Operate orders, inventory and permitted finance workflows, assign operators and inventory staff, review audits and control the store's participation in promotions.",
    },
    {
      role: "Operators and inventory staff",
      capabilities:
        "Operators advance fulfillment and record permitted cash movements. Inventory staff restock, adjust quantities and manage availability and low-stock thresholds. Each role receives its own server-enforced permissions.",
    },
    {
      role: "Finance managers",
      capabilities:
        "Handle authorized expense, refund, cash and settlement workflows; investigate reconciliation issues; inspect the ledger, store reports and CSV exports. Private expense receipts are downloaded through an authorized API.",
    },
    {
      role: "Payroll managers",
      capabilities:
        "Maintain employee profiles and effective-dated compensation, calculate monthly pay runs, and move them through approval, payment and posting. Payroll permissions are separate from order, inventory and general finance access.",
    },
    {
      role: "Platform administrators",
      capabilities:
        "Manage the global catalogue, stores, promotion definitions, support and privileged staff roles. Access consolidated finance and platform reconciliation, and control fiscal-period closure and reopening.",
    },
  ],
  workflows: [
    {
      title: "From menu selection to an accepted quote",
      description:
        "Checkout revalidates store availability, delivery eligibility and prices on the server. Automatic offers and manual coupons are exclusive discount modes; combo compare-at markdown stays separate from promotion savings. The ordinary free-delivery threshold is evaluated before promotions. Saved item, customization, bundle, discount and included-tax snapshots preserve the accepted amounts when definitions change.",
    },
    {
      title: "From reserved stock to verified payment",
      description:
        "COD checkout commits its local order, payment, stock and promotion changes together. Online checkout saves the order and reserves demand before the provider call. Verified capture consumes the saved reservation and advances the order. Retry uses saved prices and restores the original demand only when stock and promotion capacity permit; uncertain provider state retains holds for reconciliation.",
    },
    {
      title: "From fulfillment to refunds and cash control",
      description:
        "Staff advance orders through preparation, dispatch and delivery under store permissions. COD delivery records collection under the cash-session policy. Cancellation restores recorded tracked sales once, while refund approval and disbursement remain separate workflows. Refund requests retain distinct item and delivery allocations, and counted cash closure records variance evidence.",
    },
    {
      title: "From business events to financial reporting",
      description:
        "Payment capture records collection; delivery recognizes revenue and standard cost. Supported refund, settlement, cash, expense and payroll events feed the posting worker. Reports read posted journals, support store and consolidated views, and share calculation policies with CSV exports. Corrections use linked reversals that retain the original posted history.",
    },
  ],
  architecture: [
    {
      layer: "Customer and staff application",
      details:
        "One React application provides the storefront, operations, finance, payroll and public engineering docs. TanStack Query manages API data; Zustand manages shared client state. Account and store context scope caches, while route and feature boundaries support lazy loading.",
      technologies: ["React 19", "TypeScript", "Vite", "React Router", "Mantine", "TanStack Query", "Zustand"],
    },
    {
      layer: "Modular API and authorization",
      details:
        "An Express modular monolith separates domain routes, services, repositories and policies. JWT authentication reloads the current user; resource-derived store checks use active memberships. Zod validates contracts, while request IDs, safe audit records, Winston logs and protected financial metrics support diagnosis.",
      technologies: ["Node.js", "Express 5", "JWT", "Zod", "Winston"],
    },
    {
      layer: "Transactional persistence",
      details:
        "PostgreSQL holds store configuration, checkout snapshots, inventory movements and reservations, staff memberships, financial events and journals. Drizzle and checked-in SQL migrations define the schema. Local transactions coordinate related writes; ordered stock-row locks stabilize inventory allocation.",
      technologies: ["PostgreSQL", "Drizzle ORM", "SQL migrations", "Row locks"],
    },
    {
      layer: "Payments, realtime and files",
      details:
        "A payment adapter supports a credential-free in-process simulator and optional Razorpay Test Mode. Provider calls remain outside local SQL transactions; verification and reconciliation resolve that boundary. Socket.IO uses server-derived audiences for best-effort notifications. Public uploads and private receipts use separate local file access paths.",
      technologies: ["Payment simulator", "Razorpay Test Mode", "Socket.IO", "Local file storage"],
    },
    {
      layer: "Financial posting and recovery",
      details:
        "Business mutations and financial events commit together. A separate batch command claims supported events with leases and bounded retries, then posts journals using stable source identities. PostgreSQL triggers enforce balance and protect posted entries and lines; repeat posting reuses the existing journal after an acknowledgment failure.",
      technologies: ["Transactional outbox", "Posting policies", "PostgreSQL triggers", "Reconciliation commands"],
    },
  ],
  decisions: [
    {
      title: "Keep related business writes in a modular monolith",
      description:
        "Checkout, stock and promotion effects share local transactions without introducing distributed services. Domain boundaries still separate policies and workflows. The tradeoff is a shared process and release boundary, with explicit recovery when an external payment operation succeeds independently of the database.",
    },
    {
      title: "Use exact money and preserve historical prices",
      description:
        "Domain and persistence calculations use integer paise, with INR formatting at the presentation boundary. Server-owned quotes and saved snapshots prevent browser totals or later catalogue edits from redefining an accepted order. Store timezone and business-date policies provide consistent reporting periods.",
    },
    {
      title: "Separate stock reservations from transaction locks",
      description:
        "A row lock protects a stock check during the transaction; an online reservation persists after commit while payment is pending. Capture, release and retry operate on saved demand. Provider-aware expiry preserves holds when payment state is uncertain, and a terminal cancelled order cannot be revived by late capture.",
    },
    {
      title: "Check current authority instead of embedding permissions in JWTs",
      description:
        "Tokens carry identity and token-version claims. Active user and store-membership checks make suspension or revocation effective on the next HTTP request. Resource ownership determines store scope, and principal-scoped caches prevent stale account or store data from crossing context changes. Socket rooms are notification audiences rather than authorization evidence.",
    },
    {
      title: "Make accounting recoverable and keep realtime separate",
      description:
        "The financial outbox preserves posting work alongside the business mutation. Leases, retries and unique journal source identities let processing resume without posting the same source twice. Socket notifications happen after commit and remain best-effort; they do not drive accounting or replace an authoritative API read.",
    },
    {
      title: "Distinguish payment collection from earned revenue",
      description:
        "Capturing money records collection, while delivery recognizes sales and standard cost. Posted journals become immutable, and corrections create linked opposite entries. Expense and payroll commands add approval, actor-separation and period rules instead of treating every status change as an unrestricted update.",
    },
    {
      title: "Keep the demo useful without provider credentials",
      description:
        "The simulator supports fresh online checkout without payment-provider setup; optional Razorpay Test Mode exposes the external boundary. Public /docs pages explain architecture, order lifecycle, inventory and reliability without login or a running API, and a guarded recruiter seed prepares a two-store walkthrough.",
    },
  ],
  evidence: [
    {
      title: "Policy and workflow coverage",
      description:
        "The project verification record dated 10 October 2026 reports 951 backend tests and 245 frontend tests passing, alongside lint, typechecks and production builds. Coverage includes pure business policies, mocked service orchestration, generated SQL and client cache contracts; these checks do not establish live concurrency or hosted behavior.",
      href: "https://github.com/Shreyas2121/pizza-store/blob/HEAD/docs/case-study-verification.md",
      label: "Verification record",
    },
    {
      title: "Database constraints and repeatable demo data",
      description:
        "An isolated PGlite recruiter-seed test checks foreign keys, order and inventory totals, balanced journals, immutability triggers, rollback, admin preservation and repeat-run behavior. It uses current schema declarations and the real posting-kernel migration, rather than applying the entire historical migration chain.",
      href: "https://github.com/Shreyas2121/pizza-store/blob/HEAD/backend/src/scripts/recruiter-demo.test.ts",
      label: "Recruiter-seed test",
    },
    {
      title: "Reports and exports reconcile against fixed fixtures",
      description:
        "The recorded offline checks compare 12 reports and 12 CSV exports across four store-months, plus six promotion journals across three two-store scenarios. They exercise production report policies with deterministic inputs; they do not reconcile a configured database or measure report latency.",
      href: "https://github.com/Shreyas2121/pizza-store/blob/HEAD/docs/case-study-evidence.md",
      label: "Source and test evidence",
    },
  ],
  limitations: [
    "An INR portfolio application for company-operated stores. Tax, receipts and payroll are demonstration policies; statutory filing and invoice services are outside its scope. Standard product cost is a reporting proxy rather than recipe-level inventory valuation.",
    "Optional maintenance timers handle financial posting, payment reconciliation and reservation expiry while the API is awake. They pause when the free hosting service sleeps, so the demo does not provide an always-running recovery schedule.",
    "The deployment uses Cloudinary for new images and private receipts, with existing public images bundled at their original paths. Simulator state and Socket.IO delivery remain process-local; multiple API instances would require shared realtime coordination, and production invitation delivery needs an adapter.",
    "Realtime notifications are best-effort, with known audience-context gaps in some payment-finalization paths. Clients must read authoritative state through the API.",
    "Full PostgreSQL contention tests, complete migration-chain execution, hosted browser/provider checks and measured report-performance benchmarks remain separate verification work. The inventory explorer is a teaching model.",
    "Prepared payment and settlement history is seeded evidence. Use fresh orders for simulator or provider demonstrations. The free-hosted API may take time to wake on the first request.",
  ],
};
