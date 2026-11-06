-- Execute no SQL Editor do Supabase.
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  version text,
  year_fab int not null,
  year_model int not null,
  km int not null default 0,
  price numeric not null,
  transmission text not null default 'Automático',
  fuel text not null default 'Flex',
  color text not null,
  photos text[] not null default '{}',
  status text not null default 'available' check (status in ('available','sold')),
  created_at timestamptz not null default now()
);

alter table public.vehicles enable row level security;

-- Público: vê somente veículos disponíveis.
create policy "public read available" on public.vehicles
  for select using (status = 'available' or auth.role() = 'authenticated');

-- Admin (usuário autenticado): cadastra, edita e remove.
create policy "admin write" on public.vehicles
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Bucket público de fotos.
insert into storage.buckets (id, name, public) values ('vehicle-photos', 'vehicle-photos', true)
  on conflict do nothing;

create policy "public read photos" on storage.objects
  for select using (bucket_id = 'vehicle-photos');
create policy "admin upload photos" on storage.objects
  for insert with check (bucket_id = 'vehicle-photos' and auth.role() = 'authenticated');
create policy "admin delete photos" on storage.objects
  for delete using (bucket_id = 'vehicle-photos' and auth.role() = 'authenticated');
