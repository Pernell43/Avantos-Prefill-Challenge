import { useFormStore } from '../../hooks/useFormStore.ts';
import type { FormField } from '../../models/FormTypes.ts';
import { useModalStore } from './useModalStore.ts';
import { ModalSelector } from './ModalSelector';

export function PrefillPanel() {
  // ✅ Call all hooks unconditionally
  const selectedForm = useFormStore((s) => s.selectedForm);
  const selectForm = useFormStore((s) => s.selectForm);
  const openModal = useModalStore((s) => s.open);

  // ✅ Conditional logic AFTER all hooks
  if (!selectedForm) return null;

  const handleClear = (fieldId: string) => {
    const updatedFields = selectedForm.fields.map((field) =>
      field.id === fieldId ? { ...field, prefill: null } : field
    );
    selectForm({ ...selectedForm, fields: updatedFields });
  };

  const handleConfigure = (field: FormField) => {
    openModal(field);
  };

    return (
        <div className="prefill-panel">
            <h3>Prefill Config for: {selectedForm.name}</h3>
            <ul>
            {selectedForm.fields.map((field) => (
                <li key={field.id} className="prefill-field">
                <strong>{field.name}</strong>{' '}
                {field.prefill ? (
                    field.prefill.sourceType === 'form' ? (
                    <span style={{ color: 'green' }}>
                        → From Form {field.prefill.sourceFormId} {'>'} {field.prefill.sourceFieldName}
                    </span>
                    ) : (
                    <span style={{ color: 'blue' }}>
                        → From Global: {field.prefill.globalKey}
                    </span>
                    )
                ) : (
                    <span style={{ color: 'gray' }}>No Prefill</span>
                )}
                <span>
                    {field.prefill && (
                    <button onClick={() => handleClear(field.id)}>✖</button>
                    )}
                    {!field.prefill && (
                    <button onClick={() => handleConfigure(field)}>⚙</button>
                    )}
                </span>
                </li>
            ))}
            </ul>
            <ModalSelector />
        </div>
    );
}
