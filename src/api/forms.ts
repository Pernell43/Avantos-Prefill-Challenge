import axios from 'axios';
import type { FormNode } from '../models/FormTypes.ts';

export const fetchFormGraph = async (): Promise<FormNode[]> => {
  const response = await axios.get('http://localhost:3000/api/v1/mock/actions/blueprints/mock/graph');
  const { nodes, forms }: { nodes: any[]; forms: any[] } = response.data;

  const formMap = new Map<string, typeof forms[number]>();
  forms.forEach((f) => formMap.set(f.id, f));

  const result: FormNode[] = nodes
    .filter((n) => n.type === 'form')
    .map((n) => {
      const formDetails = formMap.get(n.data.component_id);
      return {
        id: n.id,
        name: n.data.name,
        fields: formDetails
          ? Object.keys(formDetails.field_schema.properties).map((fieldId) => ({
              id: fieldId,
              name: fieldId,
              type: formDetails.field_schema.properties[fieldId].type,
              prefill: null,
            }))
          : [],
        downstreamFormIds: n.data.prerequisites || [],
      };
    });

  return result;
};