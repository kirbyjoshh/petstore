import { Box, Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'

const CATEGORY_LABELS: Record<string, string> = {
  DOG: 'Dogs',
  CAT: 'Cats',
  BIRD: 'Birds',
  FISH: 'Fish',
}

interface EmptyStateProps {
  message?: string
  categories?: string[]
}

export default function EmptyState({ message, categories = [] }: EmptyStateProps) {
  const defaultMessage =
    categories.length === 1
      ? `No ${CATEGORY_LABELS[categories[0]] ?? categories[0]} available right now.`
      : categories.length > 1
      ? `No pets found in the selected categories.`
      : 'No pets available at the moment.'

  return (
    <Box className="flex flex-col items-center justify-center py-20">
      <Box 
        className="glass-card p-12 rounded-3xl text-center"
        sx={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(236, 72, 153, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.15)',
        }}
      >
        <Box 
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            mb: 3,
          }}
        >
          <PetsIcon sx={{ fontSize: 48, color: '#60a5fa' }} />
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#cbd5e1',
            fontWeight: 500,
            fontSize: '1.125rem',
            letterSpacing: '-0.3px',
          }}
        >
          {message ?? defaultMessage}
        </Typography>
      </Box>
    </Box>
  )
}
