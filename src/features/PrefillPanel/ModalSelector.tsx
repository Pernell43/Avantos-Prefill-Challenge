import { useModalStore } from './useModalStore.ts';
import { useFormStore } from '../../hooks/useFormStore.ts';
import { buildParentMap, getAllAncestors } from '../../utils/traverseDAG.ts';
import type { FormNode } from '../../models/FormTypes.ts';
import { globalData } from '../../data/globalData.ts';

export function ModalSelector() {
  const { isOpen, field, close } = useModalStore();
  const formGraph = useFormStore((s) => s.formGraph);
  const selectedForm = useFormStore((s) => s.selectedForm);
  const updateFormField = useFormStore((s) => s.updateFormField);

  if (!isOpen || !field || !selectedForm) return null;

  const parentMap = buildParentMap(formGraph);
  const ancestorIds = getAllAncestors(selectedForm.id, parentMap);
  const ancestorForms: FormNode[] = formGraph.filter(f => ancestorIds.has(f.id));

  const handleSelect = (formId: string, fieldId: string) => {
    const sourceForm = formGraph.find(f => f.id === formId);
    const sourceField = sourceForm?.fields.find(f => f.id === fieldId);
    if (!sourceForm || !sourceField) return;

    updateFormField(selectedForm.id, {
      ...field,
      prefill: {
        sourceType: 'form' as const,
        sourceFormId: formId,
        sourceFieldId: fieldId,
        sourceFieldName: sourceField.name,
      },
    });
    close();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20%',
        left: '20%',
        right: '20%',
        background: 'white',
        padding: '1rem',
        border: '1px solid black',
        zIndex: 1000,
      }}
    >
      <h3>Configure Prefill: {field.name}</h3>
      {ancestorForms.length === 0 ? (
        <p>No upstream forms found.</p>
      ) : (
        <ul>
          {ancestorForms.map((form) => (
            <li key={form.id}>
              <strong>{form.name}</strong>
              <ul>
                {form.fields.map((f) => (
                  <li key={f.id}>
                    <button onClick={() => handleSelect(form.id, f.id)}>
                      Use "{f.name}"
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <button onClick={close}>Cancel</button>
      <hr />
        <h4>Global Values</h4>
        <ul>
        {Object.entries(globalData).map(([key, value]) => (
            <li key={key}>
            <button
                onClick={() => {
                updateFormField(selectedForm.id, {
                    ...field,
                    prefill: {
                    sourceType: 'global',
                    globalKey: key,
                    },
                });
                close();
                }}
            >
                Use global: {key} ({value})
            </button>
            </li>
        ))}
        </ul>
    </div>
  );
}
