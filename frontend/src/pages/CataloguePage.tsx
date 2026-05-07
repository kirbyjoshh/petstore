import { useState } from 'react'
import { Container, Typography, Box, Pagination, AppBar, Toolbar, Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Snackbar, Alert, CircularProgress } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { usePets } from '../hooks/usePets'
import PetGrid from '../components/PetGrid'
import PetCardSkeleton from '../components/PetCardSkeleton'
import CategoryFilter, { VALID_CATEGORIES } from '../components/CategoryFilter'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import CartButton from '../components/CartButton'
import { createPet, CreatePetPayload } from '../api/adminApi'

export default function CataloguePage() {
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
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" className="font-bold tracking-wide">
            🐾 Petstore
          </Typography>
          <CartButton />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className="py-10">
        <Box className="flex flex-col gap-6">
          <Paper className="glass-card hero-card overflow-hidden" sx={{ p: 4, borderRadius: 4 }}>
            <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <Box>
                <Typography variant="h3" component="h1" className="font-bold text-slate-900">
                  Modern Pet Shopping, Reimagined
                </Typography>
                <Typography variant="body1" color="text.secondary" className="max-w-2xl mt-2">
                  Discover healthy, happy pets in a polished online marketplace designed for pet lovers.
                </Typography>
              </Box>
              <Box className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button variant="contained" color="primary" onClick={() => window.scrollTo({ top: 260, behavior: 'smooth' })}>
                  Browse Pets
                </Button>
                <Button variant="outlined" color="primary" onClick={openAddDialog} sx={{ textTransform: 'none' }}>
                  Add Animal
                </Button>
                <Typography variant="caption" color="text.secondary" className="mt-2 sm:mt-0 sm:ml-4">
                  New arrivals every week.
                </Typography>
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
