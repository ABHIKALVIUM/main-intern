"use client"

import { useState } from "react"
import ProductCard from "./product-card"
import ProductDetailModal from "./product-detail-modal"

type Product = {
  id: string | number
  title?: string
  name?: string
  price: number
  image: string
  category?: string
  brand?: string
  description?: string
}

type ProductGridProps = {
  products: Product[]
  onProductClick?: (product: Product) => void
}

export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product)
    } else {
      setSelectedProduct(product)
    }
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products available</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                title: product.title || product.name || "",
                price: product.price,
                image: product.image,
                category: product.category || product.brand || "",
              }}
              onClick={() => handleProductClick(product)}
            />
          ))
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && !onProductClick && (
        <ProductDetailModal product={selectedProduct} isOpen={true} onClose={closeModal} />
      )}
    </>
  )
}

