import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { getVehicles } from "@/lib/vehicles";
import { SITE } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function Home() {
  const vehicles = (await getVehicles()).slice(0, 6);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;

  return (
    <>
      <Header />
      <main>
        <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center">
          <Image src="/brand/logo.jpg" alt="Soul Cars - Carros com alma" width={320} height={320} priority className="rounded-2xl" />
          <h1 className="sr-only">Soul Cars, carros com alma</h1>
          <p className="mt-4 max-w-xl text-muted">
            Veículos selecionados, com procedência e atendimento de verdade.
          </p>
          <Link href="/estoque" className="bg-gold-gradient mt-6 rounded-full px-8 py-3 font-bold text-background">
            Ver estoque
          </Link>
        </section>

        <section className="mx-auto max-w-6xl px-4">
          <h2 className="font-display mb-6 text-2xl text-gold-gradient">Destaques do estoque</h2>
          {vehicles.length === 0 ? (
            <p className="text-muted">Novos veículos em breve.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v) => (
                <VehicleCard key={v.id} v={v} />
              ))}
            </div>
          )}
        </section>

        <section id="localizacao" className="mx-auto mt-16 max-w-6xl px-4">
          <h2 className="font-display mb-2 text-2xl text-gold-gradient">Onde estamos</h2>
          <p className="mb-4 text-muted">{SITE.address}</p>
          <iframe
            title="Localização da Soul Cars"
            src={mapSrc}
            className="h-96 w-full rounded-xl border border-line"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
