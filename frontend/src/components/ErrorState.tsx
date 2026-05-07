import { Box, Typography, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Box className="flex flex-col items-center justify-center py-16 gap-4">
      <Box className="glass-card p-8 rounded-[28px] text-center">
        <ErrorOutlineIcon sx={{ fontSize: 64, color: '#f97316' }} />
        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
          {message}
        </Typography>
        {onRetry && (
          <Button variant="contained" color="error" onClick={onRetry} sx={{ mt: 2, textTransform: 'none' }}>
            Retry
          </Button>
        )}
      </Box>
    </Box>
  )
}
