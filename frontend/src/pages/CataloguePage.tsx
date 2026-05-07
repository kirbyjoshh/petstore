import { useState } from 'react'
import { Container, Typography, Box, Pagination, AppBar, Toolbar, Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Snackbar, Alert, CircularProgress } from '@mui/material'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { usePets } from '../hooks/usePets'
import PetGrid from '../components/PetGrid'
import PetCardSkeleton from '../components/PetCardSkeleton'
import CategoryFilter, { VALID_CATEGORIES } from '../components/CategoryFilter'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import CartButton from '../components/CartButton'
import { createPet, CreatePetPayload } from '../api/adminApi'

export default function CataloguePage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Sanitize: strip any category values that aren't valid
  const rawCategories = searchParams.getAll('category')
  const categories = rawCategories.filter((c) => VALID_CATEGORIES.includes(c))

  const page = parseInt(searchParams.get('page') ?? '0', 10)

  const { data, isLoading, isError, error, refetch } = usePets(categories, page)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [photoUrl, setPhotoUrl] = useState('')
  const [form, setForm] = useState<CreatePetPayload>({
    name: '',
    category: 'DOG',
    breed: '',
    ageMonths: 0,
    description: '',
    price: null,
    available: true,
    photos: [],
  })

  const CATEGORIES = ['DOG', 'CAT', 'BIRD', 'FISH'] as const
  type Category = typeof CATEGORIES[number]

  const openAddDialog = () => {
    setSaveError(null)
    setPhotoUrl('')
    setForm({
      name: '',
      category: 'DOG',
      breed: '',
      ageMonths: 0,
      description: '',
      price: null,
      available: true,
      photos: [],
    })
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setSaveError(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)

    try {
      await createPet({
        ...form,
        photos: photoUrl.trim()
          ? [{ url: photoUrl.trim(), isPrimary: true }]
          : [],
      })
      setDialogOpen(false)
      setSnackbarOpen(true)
      refetch()
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setSaveError(message ?? 'Failed to add animal. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(value - 1))
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <AppBar 
        position="static" 
        color="primary" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Toolbar sx={{ gap: 2, py: 1.5 }}>
          <Typography 
            variant="h6" 
            className="font-display font-bold text-2xl"
            sx={{ 
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🐾 Petstore
          </Typography>
          <Box sx={{ flex: 1 }} />
          <CartButton />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className="py-12">
        <Box className="flex flex-col gap-8">
          <Paper 
            className="glass-card hero-card overflow-hidden" 
            sx={{ 
              p: 6,
              borderRadius: '2rem',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(236, 72, 153, 0.08) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            <Box className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <Box className="flex-1">
                <Typography 
                  variant="h3" 
                  component="h1" 
                  className="font-display font-bold text-4xl lg:text-5xl leading-tight mb-4"
                  sx={{
                    background: 'linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Modern Pet Shopping, Reimagined
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  className="max-w-2xl text-lg leading-relaxed"
                  sx={{ color: '#cbd5e1' }}
                >
                  Discover healthy, happy pets in a polished online marketplace designed for pet lovers.
                </Typography>
              </Box>
              <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => window.scrollTo({ top: 360, behavior: 'smooth' })}
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    py: 1.5,
                    px: 3,
                    borderRadius: '0.875rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 28px rgba(59, 130, 246, 0.4)',
                    }
                  }}
                >
                  Browse Pets
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={openAddDialog}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    py: 1.5,
                    px: 3,
                    borderRadius: '0.875rem',
                    borderColor: 'rgba(59, 130, 246, 0.4)',
                    color: '#60a5fa',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(59, 130, 246, 0.8)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    }
                  }}
                >
                  Add Animal
                </Button>
                <Button 
                  variant="text" 
                  color="primary" 
                  onClick={() => navigate('/admin')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    py: 1.5,
                    px: 2.5,
                    borderRadius: '0.75rem',
                    color: '#94a3b8',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#cbd5e1',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }
                  }}
                >
                  Admin
                </Button>
              </Box>
            </Box>
          </Paper>

          <Paper className="glass-card" sx={{ p: 3, borderRadius: 4 }}>
            <CategoryFilter />
          </Paper>

          {isLoading && (
            <Grid container spacing={3}>
              {Array.from({ length: 12 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <PetCardSkeleton />
                </Grid>
              ))}
            </Grid>
          )}
          {isError && (
            <ErrorState
              message={(error as Error)?.message ?? 'Failed to load pets.'}
              onRetry={() => refetch()}
            />
          )}
          {!isLoading && !isError && data && data.content.length === 0 && (
            <EmptyState categories={categories} />
          )}
          {!isLoading && !isError && data && data.content.length > 0 && (
            <>
              <Typography variant="body2" color="text.secondary">
                Showing {data.content.length} of {data.totalElements} pets
              </Typography>
              <PetGrid pets={data.content} />
              {data.totalPages > 1 && (
                <Box className="flex justify-center mt-4">
                  <Pagination
                    count={data.totalPages}
                    page={page + 1}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Animal</DialogTitle>
        <DialogContent dividers>
          {saveError && <Alert severity="error" sx={{ mb: 2 }}>{saveError}</Alert>}
          <Box display="grid" gap={2} mt={1}>
            <TextField
              label="Name"
              required
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as Category }))}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Breed"
              required
              value={form.breed}
              onChange={(e) => setForm((prev) => ({ ...prev, breed: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Age in Months"
              type="number"
              inputProps={{ min: 0 }}
              value={form.ageMonths}
              onChange={(e) => setForm((prev) => ({ ...prev, ageMonths: Number(e.target.value) }))}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              inputProps={{ min: 0, step: '0.01' }}
              value={form.price ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value === '' ? null : Number(e.target.value) }))}
              helperText="Leave blank if price is not available"
              fullWidth
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.available}
                  onChange={(e) => setForm((prev) => ({ ...prev, available: e.target.checked }))}
                />
              }
              label="Available"
            />
            <TextField
              label="Primary Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              helperText="Optional photo URL for the animal"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={saving}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? <CircularProgress size={18} /> : 'Save Animal'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Animal added successfully.
        </Alert>
      </Snackbar>
    </>
  )
}
