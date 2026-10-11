import { skillGroups } from "@/lib/constants";

export default function TechStack() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      className="scroll-mt-20 border-y border-line bg-subtle py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:grid lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
        <div>
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-4 max-w-md text-2xl font-semibold tracking-tight sm:text-3xl">
            A practical stack for delivering complete products.
          </h2>
        </div>
        <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:mt-0">
          {skillGroups.map((group) => (
            <div key={group.label} className="border-t border-line pt-4">
              <dt className="font-semibold">{group.label}</dt>
              <dd className="mt-3 leading-7 text-secondary">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
