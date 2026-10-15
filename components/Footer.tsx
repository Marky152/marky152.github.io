export default function Footer() {
  return (
    <footer className="border-t hairline px-6 py-8 sm:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-display text-sm font-bold">
          Mark Menezes<span className="text-gold">.</span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
          Designed & built with intent · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
