import { Alert, AlertTitle, Button, Stack } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router';

const RouteErrorBoundary = () => {
  const error = useRouteError();

  console.log('error', error);

  if (isRouteErrorResponse(error)) {
    return (
      <Stack sx={{ p: 3 }}>
        <Alert variant="filled" severity="error" sx={{ mb: 4 }}>
          <AlertTitle>
            {error.status} {error.statusText}
          </AlertTitle>
          {error.data?.message || 'Something went wrong with this route.'}
        </Alert>

        <Button
          variant="outlined"
          color="error"
          onClick={() => (window.location.href = '/')}
          sx={{
            marginLeft: 'auto',
          }}
        >
          Go Home
        </Button>
      </Stack>
    );
  }

  return (
    <Stack sx={{ p: 3 }}>
      <Alert variant="filled" severity="error" sx={{ mb: 4 }}>
        <AlertTitle>Oops! Something went wrong</AlertTitle>
        {error instanceof Error ? error.message : 'Unknown error occurred'}
      </Alert>

      <Button
        variant="outlined"
        color="error"
        onClick={() => window.location.reload()}
        sx={{
          marginLeft: 'auto',
        }}
      >
        Reload Page
      </Button>
    </Stack>
  );
};

export default RouteErrorBoundary;
