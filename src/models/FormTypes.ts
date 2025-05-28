export interface FormField {
  id: string;
  name: string;
  type: string;
  prefill?: PrefillMapping | null;
}

export interface PrefillMapping {
  sourceType: 'form' | 'global';
  sourceFormId?: string;
  sourceFieldId?: string;
  sourceFieldName?: string;
  globalKey?: string;
}

export interface FormNode {
  id: string;
  name: string;
  fields: FormField[];
  downstreamFormIds: string[];
}