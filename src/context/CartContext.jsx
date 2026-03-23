import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const CART_KEY = 'quickdine_cart'

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, restaurantId, restaurantName } = action.payload
      // If cart has items from a different restaurant, clear it
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        return {
          restaurantId,
          restaurantName,
          items: [{ ...item, quantity: 1 }]
        }
      }
      const existing = state.items.find(i => i.id === item.id)
      if (existing) {
        return {
          ...state,
          restaurantId,
          restaurantName,
          items: state.items.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }
      return {
        ...state,
        restaurantId,
        restaurantName,
        items: [...state.items, { ...item, quantity: 1 }]
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload)
      }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === id ? { ...i, quantity } : i
        )
      }
    }
    case 'CLEAR_CART':
      return { restaurantId: null, restaurantName: null, items: [] }
    case 'LOAD_CART':
      return action.payload
    default:
      return state
  }
}

const initialState = { restaurantId: null, restaurantName: null, items: [] }

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY)
    if (saved) {
      try {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) })
      } catch (e) {
        localStorage.removeItem(CART_KEY)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const addItem = (item, restaurantId, restaurantName) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, restaurantId, restaurantName } })
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getItemQuantity = (id) => {
    const item = cart.items.find(i => i.id === id)
    return item ? item.quantity : 0
  }

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    totalItems,
    totalAmount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
