import { create } from 'zustand';
import type { FormNode, FormField } from '../models/FormTypes.ts';

interface FormStore {
  formGraph: FormNode[];
  selectedForm: FormNode | null;
  setFormGraph: (forms: FormNode[]) => void;
  selectForm: (form: FormNode | null) => void;
  updateFormField: (formId: string, updatedField: FormField) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formGraph: [],
  selectedForm: null,

  setFormGraph: (forms) => set({ formGraph: forms }),

  selectForm: (form) => set({ selectedForm: form }),

  updateFormField: (formId, updatedField) =>
    set((state) => {
      const updatedGraph = state.formGraph.map((form) =>
        form.id === formId
          ? {
              ...form,
              fields: form.fields.map((field) =>
                field.id === updatedField.id ? updatedField : field
              ),
            }
          : form
      );

      return {
        formGraph: updatedGraph,
        selectedForm:
          state.selectedForm?.id === formId
            ? {
                ...state.selectedForm,
                fields: updatedGraph.find((f) => f.id === formId)?.fields || [],
              }
            : state.selectedForm,
      };
    }),
}));