import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Shreyas Rasaikar - Full-Stack Developer</p>
        <div className="flex items-center gap-5">
          <Link href="#top" className="inline-flex min-h-11 items-center hover:text-foreground">
            Back to top
          </Link>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
