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
    <Box className="flex flex-col items-center justify-center py-16">
      <Box className="glass-card p-10 rounded-[32px] text-center">
        <PetsIcon sx={{ fontSize: 64, color: '#60a5fa' }} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          {message ?? defaultMessage}
        </Typography>
      </Box>
    </Box>
  )
}
