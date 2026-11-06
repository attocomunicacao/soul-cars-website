import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getVehicle } from "@/lib/vehicles";
import { brl, whatsappLink } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function VehiclePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const v = await getVehicle(id);
  if (!v) notFound();

  const name = `${v.brand} ${v.model} ${v.version ?? ""}`.trim();
  const msg = `Olá! Tenho interesse no ${name} ${v.year_fab}/${v.year_model} (${brl(v.price)}) que vi no site da Soul Cars.`;
  const specs: [string, string][] = [
    ["Ano", `${v.year_fab}/${v.year_model}`],
    ["Quilometragem", `${v.km.toLocaleString("pt-BR")} km`],
    ["Câmbio", v.transmission],
    ["Combustível", v.fuel],
    ["Cor", v.color],
  ];

  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
        <div className="grid gap-3">
          {v.photos.length === 0 && (
            <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-surface-2 text-muted">
              Foto em breve
            </div>
          )}
          {v.photos.map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p} src={p} alt={name} className="w-full rounded-xl object-cover" />
          ))}
        </div>
        <div>
          <h1 className="font-display text-3xl">{name}</h1>
          <p className="mt-3 text-3xl font-extrabold text-gold-gradient">{brl(v.price)}</p>
          <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-surface">
            {specs.map(([k, val]) => (
              <div key={k} className="flex justify-between px-4 py-3 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="font-semibold">{val}</dd>
              </div>
            ))}
          </dl>
          <a
            href={whatsappLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-gradient mt-6 inline-block rounded-full px-8 py-3 font-bold text-background"
          >
            Tenho interesse (WhatsApp)
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
