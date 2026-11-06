/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { brl } from "@/lib/config";
import type { Vehicle } from "@/lib/vehicles";

const empty = {
  brand: "", model: "", version: "", year_fab: "", year_model: "", km: "",
  price: "", transmission: "Automático", fuel: "Flex", color: "",
};

const input = "w-full rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm";

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [list, setList] = useState<Vehicle[]>([]);
  const [form, setForm] = useState(empty);
  const [files, setFiles] = useState<FileList | null>(null);
  const [msg, setMsg] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false });
    setList((data as Vehicle[]) ?? []);
  }, []);

  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (session) load(); }, [session, load]);

  if (!ready) return null;
  if (!supabase) {
    return <p className="p-8">Supabase não configurado. Defina as variáveis em .env.local (veja o README).</p>;
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-sm p-8">
        <h1 className="font-display mb-4 text-2xl text-gold-gradient">Admin Soul Cars</h1>
        <form
          className="grid gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const { error } = await supabase!.auth.signInWithPassword(login);
            if (error) setMsg("Login inválido.");
          }}
        >
          <input className={input} type="email" placeholder="E-mail" value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })} required />
          <input className={input} type="password" placeholder="Senha" value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })} required />
          <button className="bg-gold-gradient rounded-lg py-2 font-bold text-background">Entrar</button>
          {msg && <p className="text-sm text-red-400">{msg}</p>}
        </form>
      </main>
    );
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Salvando...");
    const urls: string[] = [];
    for (const f of Array.from(files ?? [])) {
      const path = `${crypto.randomUUID()}-${f.name.replace(/[^\w.-]/g, "_")}`;
      const { error } = await supabase!.storage.from("vehicle-photos").upload(path, f);
      if (error) { setMsg("Erro no upload: " + error.message); return; }
      urls.push(supabase!.storage.from("vehicle-photos").getPublicUrl(path).data.publicUrl);
    }
    const { error } = await supabase!.from("vehicles").insert({
      brand: form.brand, model: form.model, version: form.version || null,
      year_fab: Number(form.year_fab), year_model: Number(form.year_model),
      km: Number(form.km), price: Number(form.price),
      transmission: form.transmission, fuel: form.fuel, color: form.color, photos: urls,
    });
    if (error) { setMsg("Erro: " + error.message); return; }
    setForm(empty); setFiles(null); setMsg("Veículo cadastrado!"); load();
  }

  const f = (k: keyof typeof empty, ph: string, type = "text") => (
    <input className={input} type={type} placeholder={ph} value={form[k]} required={k !== "version"}
      onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
  );

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-gold-gradient">Estoque (admin)</h1>
        <button className="text-sm text-muted underline" onClick={() => supabase!.auth.signOut()}>Sair</button>
      </div>

      <form onSubmit={save} className="mb-10 grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2">
        {f("brand", "Marca")}{f("model", "Modelo")}{f("version", "Versão")}{f("color", "Cor")}
        {f("year_fab", "Ano fabricação", "number")}{f("year_model", "Ano modelo", "number")}
        {f("km", "Km", "number")}{f("price", "Preço (R$)", "number")}
        <select className={input} value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })}>
          <option>Automático</option><option>Manual</option><option>CVT</option>
        </select>
        <select className={input} value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })}>
          <option>Flex</option><option>Gasolina</option><option>Diesel</option><option>Híbrido</option><option>Elétrico</option>
        </select>
        <input className={`${input} sm:col-span-2`} type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} />
        <button className="bg-gold-gradient rounded-lg py-2 font-bold text-background sm:col-span-2">Cadastrar veículo</button>
        {msg && <p className="text-sm text-gold sm:col-span-2">{msg}</p>}
      </form>

      <ul className="grid gap-2">
        {list.map((v) => (
          <li key={v.id} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-3 text-sm">
            <span>
              <strong>{v.brand} {v.model}</strong> · {v.year_model} · {brl(v.price)}
              {v.status === "sold" && <em className="ml-2 text-gold">(vendido)</em>}
            </span>
            <span className="flex gap-3">
              <button className="underline" onClick={async () => {
                await supabase!.from("vehicles").update({ status: v.status === "sold" ? "available" : "sold" }).eq("id", v.id);
                load();
              }}>{v.status === "sold" ? "Reativar" : "Marcar vendido"}</button>
              <button className="text-red-400 underline" onClick={async () => {
                if (confirm("Excluir este veículo?")) { await supabase!.from("vehicles").delete().eq("id", v.id); load(); }
              }}>Excluir</button>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
