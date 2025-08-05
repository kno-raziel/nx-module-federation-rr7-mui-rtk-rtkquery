import { Provider } from 'react-redux';
import Products from './components/Products';
import { store } from './store';
import { useTheme } from '@mui/material';

export function App() {
  const theme = useTheme();

  console.log('theme', theme);

  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
}

export default App;
