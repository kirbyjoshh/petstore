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
      <Box sx={{ 
        width: 420, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(20, 30, 50, 0.96) 100%)',
      }}>
        <Box 
          className="flex items-center justify-between px-6 py-5"
          sx={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Box>
            <Typography 
              variant="h6" 
              className="font-display font-bold"
              sx={{ color: '#e2e8f0', fontSize: '1.25rem' }}
            >
              Your Cart
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ color: '#94a3b8', fontSize: '0.875rem', mt: 0.25 }}
            >
              {items.length} item{items.length === 1 ? '' : 's'} selected
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="Close cart" sx={{ color: '#94a3b8', transition: 'all 0.2s ease', '&:hover': { color: '#cbd5e1', backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.12)' }} />

        {items.length === 0 ? (
          <Box className="flex flex-col items-center justify-center flex-1 gap-4 p-8 text-slate-300">
            <Box 
              sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(236, 72, 153, 0.08) 100%)',
                border: '2px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <PetsIcon sx={{ fontSize: 56, color: '#60a5fa' }} />
            </Box>
            <Typography 
              variant="h6"
              className="font-display font-bold"
              sx={{ color: '#cbd5e1', fontSize: '1.125rem' }}
            >
              Your cart is empty
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 'xs', textAlign: 'center' }}>
              Add some adorable pets to your cart and they will show up here.
            </Typography>
            <Button 
              variant="contained" 
              onClick={onClose} 
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                mt: 2,
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2 }}>
              {items.map((item) => (
                <ListItem 
                  key={item.id} 
                  disableGutters 
                  sx={{ 
                    py: 2, 
                    px: 2, 
                    mb: 1, 
                    borderRadius: '1rem',
                    background: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.1)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderColor: 'rgba(59, 130, 246, 0.2)',
                    }
                  }}
                >
                  <Box className="flex gap-3 w-full items-start">
                    <img
                      src={item.photoUrl || PLACEHOLDER}
                      alt={item.name}
                      style={{ width: 64, height: 64, borderRadius: '0.75rem', objectFit: 'cover', flexShrink: 0 }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
                    />
                    <Box className="flex flex-col flex-1 gap-2 min-w-0">
                      <Box className="flex items-center justify-between gap-2">
                        <Typography 
                          variant="subtitle2" 
                          className="font-semibold truncate"
                          sx={{ color: '#e2e8f0' }}
                        >
                          {item.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          sx={{
                            color: '#ef4444',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Chip
                        label={item.category}
                        color={categoryColors[item.category] ?? 'default'}
                        size="small"
                        sx={{ width: 'fit-content', fontWeight: 500 }}
                      />
                      <Box className="flex items-center justify-between">
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          ₱{item.price.toFixed(2)} each
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

            <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.12)' }} />
            <Box 
              className="p-6 flex flex-col gap-4"
              sx={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0.02) 100%)',
                borderTop: '1px solid rgba(59, 130, 246, 0.1)',
              }}
            >
              <Box className="flex items-center justify-between">
                <Typography 
                  variant="subtitle1" 
                  className="font-semibold"
                  sx={{ color: '#cbd5e1', fontSize: '1rem' }}
                >
                  Subtotal
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  className="font-display font-bold"
                  sx={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.25rem',
                  }}
                >
                  ₱{subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 1.5,
                  borderRadius: '0.875rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 12px 28px rgba(59, 130, 246, 0.4)',
                  }
                }}
              >
                Proceed to Checkout
              </Button>
              <Button 
                variant="text" 
                fullWidth 
                onClick={onClose} 
                sx={{ 
                  color: '#94a3b8', 
                  textTransform: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#cbd5e1',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  )
}
