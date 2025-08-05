import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../models/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/' }),
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => `products`,
    }),
  }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery } = productsApi;
