import { Alert, AlertTitle, Button, Stack } from '@mui/material';

const RemoteModuleErrorBoundary = () => {
  return (
    <Stack sx={{ p: 3 }}>
      <Alert variant="filled" severity="error" sx={{ mb: 4 }}>
        <AlertTitle>Remote Module Failed to Load</AlertTitle>
        The requested feature is temporarily unavailable.
      </Alert>

      <Stack direction="row" marginLeft="auto">
        <Button
          variant="outlined"
          onClick={() => (window.location.href = '/')}
          sx={{ mr: 2 }}
        >
          Go Home
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Stack>
    </Stack>
  );
};

export default RemoteModuleErrorBoundary;
