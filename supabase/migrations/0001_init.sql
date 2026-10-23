-- ============================================================================
-- ESSÊNCIA DO OLHAR · Schema inicial (PostgreSQL 15+ / Supabase)
-- Execute no SQL Editor do Supabase (role postgres / owner)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. TIPOS
-- ----------------------------------------------------------------------------
do $$
begin
  create type public.status_agendamento as enum
    ('pendente', 'confirmado', 'concluido', 'cancelado');
exception
  when duplicate_object then null;
end
$$;

-- ----------------------------------------------------------------------------
-- 2. TABELAS
-- ----------------------------------------------------------------------------
create table if not exists public.clientes (
  id         uuid primary key default gen_random_uuid(),
  nome       text        not null,
  telefone   text        not null,
  email      text,
  created_at timestamptz not null default now(),
  constraint clientes_nome_check   check (length(btrim(nome)) >= 3),
  constraint clientes_telefone_key unique (telefone),
  constraint clientes_email_check  check (
    email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  )
);

create table if not exists public.servicos (
  id              uuid primary key default gen_random_uuid(),
  nome            text          not null,
  descricao       text,
  preco           numeric(10,2) not null default 0,
  duracao_minutos integer       not null,
  created_at      timestamptz   not null default now(),
  constraint servicos_nome_key      unique (nome),
  constraint servicos_preco_check   check (preco >= 0),
  constraint servicos_duracao_check check (duracao_minutos between 5 and 480)
);

create table if not exists public.profissionais (
  id            uuid primary key default gen_random_uuid(),
  nome          text        not null,
  especialidade text,
  created_at    timestamptz not null default now()
);

create table if not exists public.agendamentos (
  id              uuid primary key default gen_random_uuid(),
  cliente_id      uuid not null references public.clientes (id)      on delete restrict,
  servico_id      uuid not null references public.servicos (id)      on delete restrict,
  profissional_id uuid not null references public.profissionais (id) on delete restrict,
  data_hora       timestamptz not null,
  status          public.status_agendamento not null default 'pendente',
  observacoes     text,
  created_at      timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 3. ÍNDICES
-- ----------------------------------------------------------------------------
create index if not exists agendamentos_cliente_id_idx      on public.agendamentos (cliente_id);
create index if not exists agendamentos_servico_id_idx      on public.agendamentos (servico_id);
create index if not exists agendamentos_profissional_id_idx on public.agendamentos (profissional_id);

create index if not exists agendamentos_data_hora_idx on public.agendamentos (data_hora);
create index if not exists agendamentos_agenda_idx    on public.agendamentos (profissional_id, data_hora);
create index if not exists agendamentos_ativos_idx    on public.agendamentos (data_hora)
  where status in ('pendente', 'confirmado');

create index if not exists clientes_nome_idx on public.clientes (lower(nome));

-- ----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
-- ----------------------------------------------------------------------------
alter table public.clientes      enable row level security;
alter table public.servicos      enable row level security;
alter table public.profissionais enable row level security;
alter table public.agendamentos  enable row level security;

-- Helper: considera "equipe" quem tem app_metadata.role = 'staff'
create or replace function public.is_staff()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'staff';
$$;

-- Catálogo: leitura pública (necessário para a página de agendamento)
drop policy if exists "catalogo_leitura_publica" on public.servicos;
create policy "catalogo_leitura_publica" on public.servicos
  for select to anon, authenticated
  using (true);

drop policy if exists "catalogo_escrita_staff" on public.servicos;
create policy "catalogo_escrita_staff" on public.servicos
  for all to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

drop policy if exists "catalogo_leitura_publica" on public.profissionais;
create policy "catalogo_leitura_publica" on public.profissionais
  for select to anon, authenticated
  using (true);

drop policy if exists "catalogo_escrita_staff" on public.profissionais;
create policy "catalogo_escrita_staff" on public.profissionais
  for all to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

-- Clientes: apenas equipe (anon nunca lê a base de clientes)
drop policy if exists "clientes_staff" on public.clientes;
create policy "clientes_staff" on public.clientes
  for all to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

-- Agendamentos: apenas equipe; o fluxo público usa a RPC abaixo
drop policy if exists "agendamentos_staff" on public.agendamentos;
create policy "agendamentos_staff" on public.agendamentos
  for all to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

-- ----------------------------------------------------------------------------
-- 5. AGENDAMENTO PÚBLICO (SECURITY DEFINER)
-- Cria/atualiza o cliente e o agendamento em uma única transação, permitindo
-- que o site (anon) agende sem ganhar SELECT em clientes/agendamentos.
-- ----------------------------------------------------------------------------
create or replace function public.criar_agendamento(
  p_nome            text,
  p_telefone        text,
  p_email           text,
  p_servico_id      uuid,
  p_profissional_id uuid,
  p_data_hora       timestamptz,
  p_observacoes     text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_cliente_id     uuid;
  v_agendamento_id uuid;
begin
  if p_nome is null or length(btrim(p_nome)) < 3 then
    raise exception 'Nome inválido' using errcode = '22023';
  end if;

  if p_telefone is null or length(btrim(p_telefone)) < 8 then
    raise exception 'Telefone inválido' using errcode = '22023';
  end if;

  if p_data_hora is null or p_data_hora <= now() then
    raise exception 'Data/hora deve estar no futuro' using errcode = '22023';
  end if;

  insert into public.clientes (nome, telefone, email)
  values (btrim(p_nome), btrim(p_telefone), nullif(btrim(p_email), ''))
  on conflict (telefone) do update
    set nome  = excluded.nome,
        email = coalesce(excluded.email, public.clientes.email)
  returning id into v_cliente_id;

  insert into public.agendamentos
    (cliente_id, servico_id, profissional_id, data_hora, status, observacoes)
  values
    (v_cliente_id, p_servico_id, p_profissional_id, p_data_hora, 'pendente',
     nullif(btrim(p_observacoes), ''))
  returning id into v_agendamento_id;

  return v_agendamento_id;
end;
$$;

revoke all on function public.criar_agendamento(text, text, text, uuid, uuid, timestamptz, text) from public;
grant execute on function public.criar_agendamento(text, text, text, uuid, uuid, timestamptz, text)
  to anon, authenticated;
