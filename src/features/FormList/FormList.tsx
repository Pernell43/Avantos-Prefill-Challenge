import { useEffect } from 'react';
import { fetchFormGraph } from '../../api/forms.ts';
import { useFormStore } from '../../hooks/useFormStore.ts';

export function FormList() {
  const formGraph = useFormStore((state) => state.formGraph);
  const setFormGraph = useFormStore((state) => state.setFormGraph);
  const selectForm = useFormStore((state) => state.selectForm);

  useEffect(() => {
    fetchFormGraph().then((data) => {
        console.log('API data:', data);
        setFormGraph(data);  // <-- this line might be the issue
    });
    }, []);

  return (
    <div>
      <h2>Forms</h2>
      <ul>
        {formGraph.map((form) => (
          <li key={form.id}>
            <button onClick={() => selectForm(form)}>{form.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
