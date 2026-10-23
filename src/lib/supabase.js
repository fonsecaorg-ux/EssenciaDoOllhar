import { createClient } from '@supabase/supabase-js';

// Preencha o .env (veja .env.example). Sem as variáveis o app usa os dados
// fictícios de src/data/mock.js, então o layout pode ser validado offline.
const url = import.meta.env.VITE_SUPABASE_URL;

// Aceita tanto a chave nova (publishable) quanto a legada (anon).
const publicKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && publicKey ? createClient(url, publicKey) : null;

export const isSupabaseConfigured = Boolean(supabase);
