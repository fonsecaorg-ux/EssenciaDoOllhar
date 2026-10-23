import { useEffect, useState } from 'react';
import { startOfMonth } from '../../lib/date.js';
import BottomSheet from './BottomSheet.jsx';
import Button from './Button.jsx';
import Calendar from './Calendar.jsx';

export default function DatePickerSheet({ open, value, onClose, onConfirm }) {
  const [month, setMonth] = useState(() => startOfMonth(value || new Date()));
  const [draft, setDraft] = useState(value || new Date());

  // Sincroniza o rascunho sempre que a folha abre.
  useEffect(() => {
    if (!open) return;
    setMonth(startOfMonth(value || new Date()));
    setDraft(value || new Date());
  }, [open, value]);

  return (
    <BottomSheet
      open={open}
      title="Selecione a data"
      onClose={onClose}
      footer={<Button onClick={() => onConfirm(draft)}>Selecionar</Button>}
    >
      <Calendar month={month} onMonthChange={setMonth} value={draft} onChange={setDraft} />
    </BottomSheet>
  );
}
