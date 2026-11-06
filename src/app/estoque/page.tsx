import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { getVehicles } from "@/lib/vehicles";

export const dynamic = "force-dynamic";
export const metadata = { title: "Estoque | Soul Cars" };

export default async function Estoque() {
  const vehicles = await getVehicles();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display mb-6 text-3xl text-gold-gradient">Nosso estoque</h1>
        {vehicles.length === 0 ? (
          <p className="text-muted">Nenhum veículo disponível no momento.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
