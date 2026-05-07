import { Box, Card, CardMedia, CardContent, Typography, Chip, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PetSummary } from '../api/petsApi'
import { useCart } from '../context/CartContext'

interface PetCardProps {
  pet: PetSummary
}

const PLACEHOLDER = '/placeholder-pet.svg'

const categoryColors: Record<string, 'primary' | 'secondary' | 'success' | 'info'> = {
  DOG: 'primary',
  CAT: 'secondary',
  BIRD: 'success',
  FISH: 'info',
}

const categoryEmoji: Record<string, string> = {
  DOG: '🐶',
  CAT: '🐱',
  BIRD: '🐦',
  FISH: '🐟',
}

export default function PetCard({ pet }: PetCardProps) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  return (
    <Card
      className="flex flex-col h-full cursor-pointer overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-white/8 to-white/4 shadow-glow transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-lg hover:border-white/20"
      onClick={() => navigate(`/pets/${pet.id}`)}
      role="article"
      aria-label={pet.name}
    >
      <Box className="relative overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
        <CardMedia
          component="img"
          height="260"
          image={pet.primaryPhotoUrl ?? PLACEHOLDER}
          alt={pet.name}
          className="object-cover h-64 w-full transition-transform duration-500 hover:scale-110"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        <Chip
          label={`${categoryEmoji[pet.category]} ${pet.category}`}
          color={categoryColors[pet.category] ?? 'default'}
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 12, 
            left: 12, 
            backgroundColor: 'rgba(15, 23, 42, 0.85)', 
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.8125rem',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            '& .MuiChip-label': {
              padding: '0 8px',
            }
          }}
        />
      </Box>
      <CardContent className="flex flex-col flex-1 gap-4 p-6">
        <div>
          <Typography 
            variant="h6" 
            component="h2" 
            className="font-display font-bold text-lg text-white leading-snug mb-1"
          >
            {pet.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            className="text-sm leading-relaxed text-slate-400"
          >
            {pet.breed} · {pet.ageMonths < 12
              ? `${pet.ageMonths}mo`
              : `${Math.floor(pet.ageMonths / 12)}yr ${pet.ageMonths % 12}mo`}
          </Typography>
        </div>
        <Box className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-white/8">
          <Typography 
            variant="h6" 
            className="font-display font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {pet.price != null && pet.price > 0 ? `₱${pet.price.toFixed(2)}` : 'Contact us'}
          </Typography>
          <Button
            variant="contained"
            size="small"
            disabled={!pet.available}
            onClick={(e) => { e.stopPropagation(); addItem(pet) }}
            aria-label={pet.available ? `Add ${pet.name} to cart` : `${pet.name} unavailable`}
            sx={{ 
              borderRadius: '0.75rem',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              background: pet.available ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : '#475569',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': pet.available ? {
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
              } : {},
              '&:disabled': {
                background: '#475569',
                color: '#94a3b8',
              }
            }}
          >
            {pet.available ? 'Add to Cart' : 'Unavailable'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
