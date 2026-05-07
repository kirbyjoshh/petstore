import { CircularProgress, Box } from '@mui/material'

export default function LoadingSpinner() {
  return (
    <Box className="flex justify-center items-center py-16" role="status" aria-label="Loading pets">
      <Box className="glass-card p-6 rounded-3xl">
        <CircularProgress size={52} thickness={4} />
      </Box>
    </Box>
  )
}
