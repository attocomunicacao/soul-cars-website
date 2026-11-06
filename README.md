# Soul Cars — Carros com alma

Site da loja de veículos **Soul Cars** (soulcars.com.br), com vitrine de estoque, página por veículo com botão de WhatsApp, mapa da loja e painel administrativo interno.

📄 [Apresentação comercial](docs/apresentacao-comercial.md)

## Stack
Next.js · TypeScript · Tailwind CSS · Supabase (banco, auth e storage) · Vercel

## Rodar localmente
```bash
npm install
npm run dev
```
Sem Supabase configurado, o site exibe 3 veículos de demonstração.

## Configurar o Supabase
1. Crie um projeto em supabase.com.
2. No SQL Editor, execute [`supabase/schema.sql`](supabase/schema.sql).
3. Em Authentication, crie o usuário administrador (e-mail e senha) e desative o cadastro público.
4. Copie `.env.example` para `.env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Acesse `/admin` para cadastrar veículos.

## Deploy
Importe o repositório na Vercel, defina as mesmas variáveis de ambiente e aponte o domínio `soulcars.com.br` (DNS no Registro.br).

## Estrutura
- `src/app` — páginas (`/`, `/estoque`, `/veiculo/[id]`, `/admin`)
- `src/lib` — configuração da loja, cliente Supabase e consulta de veículos
- `supabase/schema.sql` — tabelas, políticas de segurança (RLS) e bucket de fotos
