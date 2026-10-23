// Dados oficiais de contato e localização do studio.
export const CONTATO = {
  telefoneExibicao: '(13) 98812-6387',
  telefoneE164: '+5513988126387',
  whatsappNumero: '5513988126387',
  instagramUsuario: '@kezia_fonsec',
  instagramUrl: 'https://www.instagram.com/kezia_fonsec',
  endereco: 'Rua Nicanor Estevão de Souza, 19 - Vila São José, Cubatão/SP',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Rua Nicanor Estevão de Souza, 19 - Vila São José, Cubatão/SP'
  )}`,
};

// Link click-to-chat (wa.me) — abre a conversa direta, sem precisar de API.
export function whatsappUrl(mensagem = 'Olá, Kezia! Gostaria de agendar um horário.') {
  return `https://wa.me/${CONTATO.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}
