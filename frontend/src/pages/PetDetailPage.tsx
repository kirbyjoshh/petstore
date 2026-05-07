import {
  Container, Box, Typography, Chip, Button, Breadcrumbs, Link,
  CircularProgress, AppBar, Toolbar, Grid, Snackbar, Paper
} from '@mui/material'
import { useNavigate, useParams, Link as RouterLink, useSearchParams } from 'react-router-dom'
import { usePetDetail } from '../hooks/usePetDetail'
import ErrorState from '../components/ErrorState'
import CartButton from '../components/CartButton'
import CartDrawer from '../components/CartDrawer'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const PLACEHOLDER = '/placeholder-pet.svg'

const categoryEmoji: Record<string, string> = {
  DOG: '🐶',
  CAT: '🐱',
  BIRD: '🐦',
  FISH: '🐟',
}

function formatPrice(price: number | null): string | null {
  if (price == null || price === 0) return null
  return `₱${price.toFixed(2)}`
}

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data: pet, isLoading, isError, error } = usePetDetail(id ?? '')
  const [activePhoto, setActivePhoto] = useState<string | null>(null)
  const [snackOpen, setSnackOpen] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const { addItem } = useCart()

  const catalogueLink = `/?${searchParams.toString()}`

  if (isLoading) {
    return (
      <>
        <AppBar position="static" color="primary" elevation={1}>
          <Toolbar>
            <Typography variant="h6" className="font-bold tracking-wide">🐾 Petstore</Typography>
            <CartButton />
          </Toolbar>
        </AppBar>
        <Box className="flex justify-center items-center min-h-[60vh]">
          <CircularProgress size={56} />
        </Box>
      </>
    )
  }

  if (isError || !pet) {
    return (
      <>
        <AppBar position="static" color="primary" elevation={1}>
          <Toolbar>
            <Typography variant="h6" className="font-bold tracking-wide">🐾 Petstore</Typography>
            <CartButton />
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" className="py-16">
          <ErrorState
            message={(error as Error)?.message ?? 'Pet not found.'}
            onRetry={() => navigate(-1)}
          />
        </Container>
      </>
    )
  }

  const primaryPhoto = pet.photos.find((p) => p.isPrimary)?.url ?? pet.primaryPhotoUrl ?? PLACEHOLDER
  const displayPhoto = activePhoto ?? primaryPhoto
  const formattedPrice = formatPrice(pet.price)

  return (
    <>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" className="font-bold tracking-wide">🐾 Petstore</Typography>
          <CartButton />
        </Toolbar>
      </AppBar>
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <Container maxWidth="lg" className="py-8">
        <Breadcrumbs className="mb-6" separator="•">
          <Link component={RouterLink} to={catalogueLink} underline="hover" color="inherit">
            Catalogue
          </Link>
          <Typography color="text.primary">{pet.name}</Typography>
        </Breadcrumbs>

        <Paper className="glass-card p-6 rounded-[32px]" elevation={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="overflow-hidden rounded-[28px] shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
                <img
                  src={displayPhoto}
                  alt={pet.name}
                  className="w-full object-cover"
                  style={{ minHeight: 420, maxHeight: 520 }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
                />
              </Box>

              {pet.photos.length > 1 && (
                <Box className="mt-4 flex flex-wrap gap-3">
                  {pet.photos.map((photo, i) => (
                    <Box
                      key={i}
                      className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${displayPhoto === photo.url ? 'border-blue-400' : 'border-transparent hover:border-blue-300'}`}
                      onClick={() => setActivePhoto(photo.url)}
                    >
                      <img
                        src={photo.url}
                        alt={`${pet.name} photo ${i + 1}`}
                        className="h-full w-full object-cover cursor-pointer"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="flex flex-col gap-6">
                <Box>
                  <Typography variant="h3" component="h1" className="font-bold">
                    {pet.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" className="mt-2 max-w-2xl">
                    A happy pet with a gentle personality—perfect for your modern home.
                  </Typography>
                </Box>

                <Box className="flex flex-wrap items-center gap-3">
                  <Chip
                    label={`${categoryEmoji[pet.category]} ${pet.category}`}
                    color="primary"
                    size="medium"
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                  />
                  <Chip
                    label={pet.available ? 'Available now' : 'Currently unavailable'}
                    color={pet.available ? 'success' : 'default'}
                    variant={pet.available ? 'filled' : 'outlined'}
                    size="medium"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Paper className="glass-card p-5 rounded-[28px]" elevation={0}>
                  <Box className="flex flex-wrap gap-4">
                    <Box>
                      <Typography variant="caption" color="text.secondary" className="uppercase tracking-[0.24em]">
                        Breed
                      </Typography>
                      <Typography variant="body1" className="font-semibold mt-1">
                        {pet.breed}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" className="uppercase tracking-[0.24em]">
                        Age
                      </Typography>
                      <Typography variant="body1" className="font-semibold mt-1">
                        {pet.ageMonths < 12
                          ? `${pet.ageMonths} month${pet.ageMonths !== 1 ? 's' : ''}`
                          : `${Math.floor(pet.ageMonths / 12)} yr ${pet.ageMonths % 12} mo`}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Typography variant="body1" className="leading-relaxed text-slate-700">
                  {pet.description}
                </Typography>

                <Box className="flex flex-col gap-4">
                  <Box className="flex flex-wrap items-center justify-between gap-4">
                    {formattedPrice ? (
                      <Typography variant="h4" className="font-bold text-blue-600">
                        {formattedPrice}
                      </Typography>
                    ) : (
                      <Typography variant="h6" color="text.secondary">
                        Contact us for pricing
                      </Typography>
                    )}
                    <Button
                      variant="contained"
                      size="large"
                      disabled={!pet.available}
                      onClick={() => { addItem(pet); setSnackOpen(true) }}
                      sx={{ textTransform: 'none', borderRadius: 3, px: 4 }}
                    >
                      {pet.available ? 'Add to Cart' : 'Currently Unavailable'}
                    </Button>
                  </Box>
                  <Button variant="outlined" component={RouterLink} to={catalogueLink} sx={{ textTransform: 'none' }}>
                    ← Back to Catalogue
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        message={`Added ${pet.name} to cart!`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  )
}
