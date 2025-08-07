import { Slice } from '@reduxjs/toolkit';
import WithAsyncSlice from 'store/WithAsyncSlice';
import Products from './components/Products';
import { productsApi } from './store/services/products';

export function App() {
  return (
    <WithAsyncSlice slices={[productsApi as unknown as Slice]}>
      <Products />
    </WithAsyncSlice>
  );
}

export default App;
