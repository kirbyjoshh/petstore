import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import CataloguePage from '../pages/CataloguePage'
import { CartProvider } from '../context/CartContext'

// Mock the API module
jest.mock('../api/petsApi', () => ({
  getPets: jest.fn().mockResolvedValue({
    content: [],
    page: 0,
    size: 12,
    totalElements: 0,
    totalPages: 0,
    last: true,
  }),
}))

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CartProvider>{ui}</CartProvider>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('CataloguePage smoke tests', () => {
  it('renders the page header', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByText(/Petstore/i)).toBeInTheDocument()
  })

  it('renders the category filter buttons', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByRole('button', { name: /🐶 Dogs/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /🐱 Cats/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /🐦 Birds/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /🐟 Fish/i })).toBeInTheDocument()
  })

  it('shows the empty catalogue message when no pets are available', async () => {
    renderWithProviders(<CataloguePage />)
    expect(await screen.findByText(/No pets available at the moment/i)).toBeInTheDocument()
  })
})
