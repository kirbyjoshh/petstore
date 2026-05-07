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
      className="flex flex-col h-full cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.24)]"
      onClick={() => navigate(`/pets/${pet.id}`)}
      role="article"
      aria-label={pet.name}
    >
      <Box className="relative overflow-hidden">
        <CardMedia
          component="img"
          height="260"
          image={pet.primaryPhotoUrl ?? PLACEHOLDER}
          alt={pet.name}
          className="object-cover h-64 w-full"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
        />
        <Chip
          label={`${categoryEmoji[pet.category]} ${pet.category}`}
          color={categoryColors[pet.category] ?? 'default'}
          size="small"
          sx={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(15, 23, 42, 0.7)', color: '#fff' }}
        />
      </Box>
      <CardContent className="flex flex-col flex-1 gap-3 p-5">
        <Typography variant="h6" component="h2" className="font-semibold text-slate-900">
          {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="leading-snug">
          {pet.breed} · {pet.ageMonths < 12
            ? `${pet.ageMonths}mo`
            : `${Math.floor(pet.ageMonths / 12)}yr ${pet.ageMonths % 12}mo`}
        </Typography>
        <Box className="flex items-center justify-between gap-3 mt-auto">
          <Typography variant="h6" className="font-bold text-blue-600">
            {pet.price != null && pet.price > 0 ? `₱${pet.price.toFixed(2)}` : 'Contact us'}
          </Typography>
          <Button
            variant="contained"
            size="small"
            disabled={!pet.available}
            onClick={(e) => { e.stopPropagation(); addItem(pet) }}
            aria-label={pet.available ? `Add ${pet.name} to cart` : `${pet.name} unavailable`}
            sx={{ borderRadius: 3, textTransform: 'none' }}
          >
            {pet.available ? 'Add to Cart' : 'Unavailable'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
