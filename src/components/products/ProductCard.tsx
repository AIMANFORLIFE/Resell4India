import React from 'react'
import { useCart } from '../../contexts/CartContext'
import { showSuccess } from '../../utils/toast'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image?: string
  description?: string
}

export function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ id, name, price, quantity: 1 })
    showSuccess(`${name} added to cart!`)
  }

  return (
    <div className="card overflow-hidden">
      {image && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">
            ₹{price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
} 