"use client"

import { useState } from "react"
import { CartProvider } from "@/components/cart-context"
import Navbar from "@/components/navbar"
import ProductGrid from "@/components/product-grid"
import { mockProducts } from "@/lib/mock-data"
import ShoppingBag from "@/components/shopping-bag"
import ProductDetailModal from "@/components/product-detail-modal"
import Footer from "@/components/footer"
import ProductSearch from "@/components/product-search"
import FloatingScanButton from "@/components/floating-scan-button"

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const lowercaseQuery = query.toLowerCase()

    // First try to match by barcode (id)
    const barcodeMatch = mockProducts.find((product) => product.id === query)

    if (barcodeMatch) {
      setFilteredProducts([barcodeMatch])
    } else {
      // Otherwise search by name, brand, or description
      const results = mockProducts.filter(
        (product) =>
          (product.name && product.name.toLowerCase().includes(lowercaseQuery)) ||
          (product.brand && product.brand.toLowerCase().includes(lowercaseQuery)) ||
          (product.description && product.description.toLowerCase().includes(lowercaseQuery)),
      )
      setFilteredProducts(results)
    }

    setSearchPerformed(true)
  }

  const resetSearch = () => {
    setFilteredProducts(mockProducts)
    setSearchPerformed(false)
    setSearchQuery("")
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to StyleShop</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover the latest trends in fashion and accessories with our curated collection of premium products.
            </p>
            <div className="max-w-xl mx-auto">
              <ProductSearch onSearch={handleSearch} />
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">
                {searchPerformed
                  ? `Search Results for "${searchQuery}" (${filteredProducts.length})`
                  : "Featured Products"}
              </h2>

              <div className="flex gap-2">
                {searchPerformed && (
                  <button
                    onClick={resetSearch}
                    className="px-4 py-2 text-sm text-primary border border-primary rounded-md hover:bg-primary/10"
                  >
                    Clear Search
                  </button>
                )}
                {!searchPerformed && (
                  <>
                    <button className="px-4 py-2 text-sm bg-secondary text-foreground rounded-md hover:bg-secondary/80">
                      Latest
                    </button>
                    <button className="px-4 py-2 text-sm bg-white text-foreground rounded-md hover:bg-secondary/50">
                      Popular
                    </button>
                  </>
                )}
              </div>
            </div>

            {searchPerformed && filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-secondary/20 rounded-lg">
                <p className="text-xl text-muted-foreground mb-4">No products found matching "{searchQuery}"</p>
                <button
                  onClick={resetSearch}
                  className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} onProductClick={(product) => setSelectedProduct(product)} />
            )}
          </section>
        </main>

        <ShoppingBag isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        <FloatingScanButton onBarcodeDetected={handleSearch} />

        <Footer />
      </div>
    </CartProvider>
  )
}

