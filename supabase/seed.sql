-- ============================================================================
-- ESSÊNCIA DO OLHAR · Dados iniciais (catálogo + profissional)
-- Execute depois de 0001_init.sql, no SQL Editor do Supabase.
-- ============================================================================

insert into public.servicos (nome, descricao, preco, duracao_minutos)
values
  ('Design de Sobrancelhas', 'Design personalizado', 70.00, 45),
  ('Micropigmentação', 'Técnica fio a fio', 380.00, 120),
  ('Design com Henna', 'Cor e preenchimento', 55.00, 40),
  ('Extensão de Cílios', 'Fio a fio clássico', 190.00, 90),
  ('Laminação de Sobrancelhas', 'Alinhamento e volume', 150.00, 60)
on conflict (nome) do nothing;

insert into public.profissionais (nome, especialidade)
select 'Kezia Fonseca', 'Sobrancelhas & Estética'
where not exists (
  select 1 from public.profissionais where nome = 'Kezia Fonseca'
);
