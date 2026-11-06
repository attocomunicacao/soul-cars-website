import Image from "next/image";
import Link from "next/link";
import { SITE, whatsappLink } from "@/lib/config";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/logo.jpg" alt="Soul Cars" width={48} height={48} className="rounded-full" />
          <span className="font-display text-xl text-gold-gradient">{SITE.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide md:flex">
          <Link href="/estoque" className="hover:text-gold">Estoque</Link>
          <Link href="/#localizacao" className="hover:text-gold">Localização</Link>
        </nav>
        <a
          href={whatsappLink("Olá! Vim pelo site da Soul Cars.")}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold-gradient rounded-full px-5 py-2 text-sm font-bold text-background"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
