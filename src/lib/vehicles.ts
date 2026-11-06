import { supabase } from "./supabase";

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  version: string | null;
  year_fab: number;
  year_model: number;
  km: number;
  price: number;
  transmission: string;
  fuel: string;
  color: string;
  photos: string[];
  status: "available" | "sold";
};

// Dados de demonstração, usados apenas enquanto o Supabase não estiver configurado.
const DEMO: Vehicle[] = [
  { id: "demo-1", brand: "Volkswagen", model: "Jetta", version: "GLI 2.0 TSI", year_fab: 2020, year_model: 2020, km: 38000, price: 159900, transmission: "Automático", fuel: "Gasolina", color: "Preto", photos: [], status: "available" },
  { id: "demo-2", brand: "Honda", model: "Civic", version: "Touring 1.5 Turbo", year_fab: 2019, year_model: 2019, km: 52000, price: 124900, transmission: "Automático", fuel: "Gasolina", color: "Prata", photos: [], status: "available" },
  { id: "demo-3", brand: "Toyota", model: "Corolla", version: "Altis Hybrid", year_fab: 2022, year_model: 2023, km: 21000, price: 169900, transmission: "Automático", fuel: "Híbrido", color: "Branco", photos: [], status: "available" },
];

export async function getVehicles(): Promise<Vehicle[]> {
  if (!supabase) return DEMO;
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("status", "available")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return data as Vehicle[];
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  if (!supabase) return DEMO.find((v) => v.id === id) ?? null;
  const { data } = await supabase.from("vehicles").select("*").eq("id", id).single();
  return (data as Vehicle) ?? null;
}
