import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useGetProductsQuery } from '../store/services/products';
import CardProduct from './CardProduct';
import { Product } from '../models/product';

const INITIAL_DATA: Product[] = [];

const Products = () => {
  const theme = useTheme();

  const { data = INITIAL_DATA, error, isLoading } = useGetProductsQuery();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (error) {
    return null;
  }

  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <Grid container spacing={2}>
      {data.map((product) => (
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 4,
            lg: 3,
          }}
          key={product.id}
        >
          <CardProduct product={product} variant={isMobile ? 'list' : 'grid'} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
