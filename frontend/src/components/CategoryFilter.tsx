import { ToggleButton, ToggleButtonGroup, Typography, Box, Button } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const CATEGORIES = [
  { value: 'DOG', label: '🐶 Dogs' },
  { value: 'CAT', label: '🐱 Cats' },
  { value: 'BIRD', label: '🐦 Birds' },
  { value: 'FISH', label: '🐟 Fish' },
]

export const VALID_CATEGORIES = CATEGORIES.map((c) => c.value)

export default function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = searchParams.getAll('category')

  const handleChange = (_: React.MouseEvent, values: string[]) => {
    const next = new URLSearchParams(searchParams)
    next.delete('category')
    next.delete('page')
    values.forEach((v) => next.append('category', v))
    setSearchParams(next)
  }

  const handleClearAll = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('category')
    next.delete('page')
    setSearchParams(next)
  }

  return (
    <Box className="flex flex-col gap-4">
      <Box className="flex items-center gap-3">
        <Typography 
          variant="subtitle2" 
          className="font-display font-bold"
          sx={{ color: '#cbd5e1', fontSize: '1rem' }}
        >
          Filter by Category
        </Typography>
        {selected.length > 0 && (
          <Button 
            size="small" 
            onClick={handleClearAll} 
            color="inherit" 
            sx={{ 
              fontSize: '0.8125rem', 
              minWidth: 0, 
              px: 1.5,
              color: '#60a5fa',
              textTransform: 'none',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#93c5fd',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              }
            }}
          >
            Clear All
          </Button>
        )}
      </Box>
      <ToggleButtonGroup
        value={selected}
        onChange={handleChange}
        aria-label="Filter by pet category"
        color="primary"
        size="small"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          '& .MuiToggleButton-root': {
            borderRadius: '0.75rem',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#cbd5e1',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.9375rem',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              borderColor: 'rgba(59, 130, 246, 0.5)',
            },
            '&.Mui-selected': {
              backgroundColor: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)',
              borderColor: 'rgba(59, 130, 246, 0.8)',
              color: '#60a5fa',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
            },
            '&.Mui-selected:hover': {
              backgroundColor: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.3) 100%)',
            },
          },
        }}
      >
        {CATEGORIES.map(({ value, label }) => (
          <ToggleButton key={value} value={value} aria-label={label}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}
