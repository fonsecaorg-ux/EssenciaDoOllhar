// Horários fictícios de atendimento. Troque por uma consulta real:
// agendamentos do profissional no dia, menos os já ocupados.

const BASE_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export function getSlots(date, professionalId = '') {
  const seed = date.getDate() + professionalId.length;

  return BASE_SLOTS.map((time, index) => ({
    time,
    available: (seed + index) % 6 !== 0,
  }));
}

export function toTimestamp(date, time) {
  const [hours, minutes] = time.split(':').map(Number);
  const value = new Date(date);
  value.setHours(hours, minutes, 0, 0);
  return value.toISOString();
}
