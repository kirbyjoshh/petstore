import {
  Drawer, Box, Typography, IconButton, Divider, Button,
  List, ListItem, Chip
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import PetsIcon from '@mui/icons-material/Pets'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const PLACEHOLDER = '/placeholder-pet.svg'

const categoryColors: Record<string, 'primary' | 'secondary' | 'success' | 'info'> = {
  DOG: 'primary',
  CAT: 'secondary',
  BIRD: 'success',
  FISH: 'info',
}

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 420, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'rgba(15,23,42,0.96)' }}>
        <Box className="glass-card flex items-center justify-between px-5 py-4">
          <Box>
            <Typography variant="h6" className="font-bold">Your Cart</Typography>
            <Typography variant="body2" color="text.secondary">
              {items.length} item{items.length === 1 ? '' : 's'} selected
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="Close cart" sx={{ color: '#94a3b8' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.16)' }} />

        {items.length === 0 ? (
          <Box className="flex flex-col items-center justify-center flex-1 gap-4 p-8 text-slate-300">
            <PetsIcon sx={{ fontSize: 72, color: '#60a5fa' }} />
            <Typography variant="h6">Your cart is empty</Typography>
            <Typography variant="body2" color="text.secondary" className="max-w-xs text-center">
              Add some adorable pets to your cart and they will show up here.
            </Typography>
            <Button variant="contained" onClick={onClose} sx={{ textTransform: 'none' }}>
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }}>
              {items.map((item) => (
                <ListItem key={item.id} disableGutters sx={{ py: 1.5 }}>
                  <Box className="flex gap-3 w-full items-start">
                    <img
                      src={item.photoUrl || PLACEHOLDER}
                      alt={item.name}
                      style={{ width: 60, height: 60, borderRadius: 18, objectFit: 'cover', flexShrink: 0 }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
                    />
                    <Box className="flex flex-col flex-1 gap-1 min-w-0">
                      <Box className="flex items-center justify-between gap-2">
                        <Typography variant="subtitle2" className="font-semibold truncate">
                          {item.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Chip
                        label={item.category}
                        color={categoryColors[item.category] ?? 'default'}
                        size="small"
                        sx={{ width: 'fit-content' }}
                      />
                      <Box className="flex items-center justify-between">
                        <Typography variant="caption" color="text.secondary">
                          ₱${item.price.toFixed(2)} each
                        </Typography>
                        <Box className="flex items-center gap-1">
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            aria-label="Increase quantity"
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.16)' }} />
            <Box className="p-5 flex flex-col gap-3">
              <Box className="flex items-center justify-between">
                <Typography variant="subtitle1" className="font-semibold">Subtotal</Typography>
                <Typography variant="subtitle1" className="font-bold text-cyan-400">
                  ₱${subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ textTransform: 'none' }}
              >
                Checkout
              </Button>
              <Button variant="text" fullWidth onClick={onClose} sx={{ color: '#94a3b8', textTransform: 'none' }}>
                Continue Shopping
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  )
}
