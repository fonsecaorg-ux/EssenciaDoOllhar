// Guarda em memória os agendamentos criados nesta sessão (modo demonstração).
// Quando o Supabase está configurado, a lista real vem do banco e este store
// continua servindo apenas para atualizar a UI imediatamente após o insert.
let appointments = [];
const listeners = new Set();

export function getSessionAppointments() {
  return appointments;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function addSessionAppointment(appointment) {
  appointments = [appointment, ...appointments];
  listeners.forEach((listener) => listener());
}
