import { Suspense, ReactNode } from 'react';
import { Box, Skeleton } from '@mui/material';

interface SuspenseWithSkeletonProps {
  children: ReactNode;
  /** Custom skeleton component */
  skeleton?: ReactNode;
}

const DefaultSkeleton = () => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <Skeleton
      variant="rounded"
      sx={{
        flex: 1,
        minHeight: 'auto',
      }}
    />
  </Box>
);

export function SuspenseWithSkeleton({
  children,
  skeleton,
}: SuspenseWithSkeletonProps) {
  const fallback = skeleton || <DefaultSkeleton />;

  return <Suspense fallback={fallback}>{children}</Suspense>;
}

export default SuspenseWithSkeleton;
