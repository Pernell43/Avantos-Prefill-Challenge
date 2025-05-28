import { FormList } from './features/FormList/FormList';
import { PrefillPanel } from './features/PrefillPanel/PrefillPanel';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Avantos Prefill Challenge</h1>
      <FormList />
      <PrefillPanel />
    </div>
  );
}

export default App;
