import { SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted md:flex-row md:justify-between">
        <div>
          <p className="font-display text-lg text-gold-gradient">{SITE.name}</p>
          <p className="font-[family-name:var(--font-script)] text-2xl text-gold-light">Carros com alma</p>
        </div>
        <div>
          <p>{SITE.address}</p>
          <p>{SITE.phoneDisplay}</p>
          <p className="mt-2">© {new Date().getFullYear()} Soul Cars. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
