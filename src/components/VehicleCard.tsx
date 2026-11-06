import Link from "next/link";
import { brl } from "@/lib/config";
import type { Vehicle } from "@/lib/vehicles";

export default function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <Link
      href={`/veiculo/${v.id}`}
      className="group overflow-hidden rounded-xl border border-line bg-surface transition hover:border-gold"
    >
      <div className="aspect-[4/3] bg-surface-2">
        {v.photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={v.photos[0]} alt={`${v.brand} ${v.model}`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">Foto em breve</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold group-hover:text-gold">
          {v.brand} {v.model}
        </h3>
        <p className="text-sm text-muted">{v.version}</p>
        <p className="mt-2 text-xs text-muted">
          {v.year_fab}/{v.year_model} · {v.km.toLocaleString("pt-BR")} km · {v.transmission}
        </p>
        <p className="mt-3 text-xl font-extrabold text-gold-gradient">{brl(v.price)}</p>
      </div>
    </Link>
  );
}
