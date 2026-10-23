// Dados fictícios usados enquanto o Supabase não estiver configurado.
// Os formatos imitam o retorno das consultas (incluindo os joins aninhados).

export const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_SERVICOS = [
  {
    id: 'svc-design',
    nome: 'Design de Sobrancelhas',
    descricao: 'Design personalizado',
    preco: 70,
    duracao_minutos: 45,
  },
  {
    id: 'svc-micro',
    nome: 'Micropigmentação',
    descricao: 'Técnica fio a fio',
    preco: 380,
    duracao_minutos: 120,
  },
  {
    id: 'svc-henna',
    nome: 'Design com Henna',
    descricao: 'Cor e preenchimento',
    preco: 55,
    duracao_minutos: 40,
  },
  {
    id: 'svc-cilios',
    nome: 'Extensão de Cílios',
    descricao: 'Fio a fio clássico',
    preco: 190,
    duracao_minutos: 90,
  },
  {
    id: 'svc-laminacao',
    nome: 'Laminação de Sobrancelhas',
    descricao: 'Alinhamento e volume',
    preco: 150,
    duracao_minutos: 60,
  },
];

export const MOCK_PROFISSIONAIS = [
  {
    id: 'pro-kezia',
    nome: 'Kezia Fonseca',
    especialidade: 'Sobrancelhas & Estética',
  },
];

const inDays = (days, hours, minutes = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

export const MOCK_AGENDAMENTOS = [
  {
    id: 'ag-1',
    data_hora: inDays(2, 10),
    status: 'confirmado',
    observacoes: null,
    servicos: { nome: 'Design de Sobrancelhas' },
    profissionais: { nome: 'Kezia Fonseca' },
  },
  {
    id: 'ag-2',
    data_hora: inDays(9, 14, 30),
    status: 'pendente',
    observacoes: null,
    servicos: { nome: 'Micropigmentação' },
    profissionais: { nome: 'Kezia Fonseca' },
  },
  {
    id: 'ag-3',
    data_hora: inDays(-14, 9),
    status: 'concluido',
    observacoes: null,
    servicos: { nome: 'Design com Henna' },
    profissionais: { nome: 'Kezia Fonseca' },
  },
  {
    id: 'ag-4',
    data_hora: inDays(-30, 16),
    status: 'cancelado',
    observacoes: null,
    servicos: { nome: 'Extensão de Cílios' },
    profissionais: { nome: 'Kezia Fonseca' },
  },
];

// Substitua os campos "antes"/"depois" por URLs do Supabase Storage quando
// as fotos reais estiverem disponíveis (ex.: /storage/v1/object/public/...).
export const MOCK_DESTAQUES = [
  { id: 'd-1', titulo: 'Design personalizado', antes: null, depois: null },
  { id: 'd-2', titulo: 'Brow lamination', antes: null, depois: null },
  { id: 'd-3', titulo: 'Micropigmentação', antes: null, depois: null },
  { id: 'd-4', titulo: 'Extensão de cílios', antes: null, depois: null },
];

export const MOCK_PERFIL = {
  nome: 'Kezia Fonseca',
  subtitulo: 'Sobrancelhas & Estética',
  foto: null,
  qualificacoes: [
    'Master em Design de Sobrancelhas',
    'Especialista em Micropigmentação',
    'Certificação em Extensão de Cílios',
    'Visagismo e Estética Facial',
  ],
};

export const MOCK_GALERIA = MOCK_DESTAQUES;
