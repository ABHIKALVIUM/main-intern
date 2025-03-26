"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import CheckoutForm from "./checkout-form"
import SuccessModal from "./success-modal"

type CheckoutPageProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutPage({ isOpen, onClose }: CheckoutPageProps) {
  const { items, getTotalPrice } = useCart()
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  if (!isOpen) return null

  const handleProceedToCheckout = () => {
    setShowForm(true)
  }

  const handleFormSubmit = (formData: any) => {
    setOrderDetails({
      items,
      total: getTotalPrice(),
      customer: formData,
    })
    setShowForm(false)
    setShowSuccess(true)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto m-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-foreground">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {showForm ? (
          <CheckoutForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} total={getTotalPrice()} />
        ) : (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Your bag is empty</p>
                <Button onClick={onClose} className="bg-primary hover:bg-primary/90 text-white">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 flex">
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name || item.title || "Product"}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <p className="text-sm text-primary font-medium">{item.brand || ""}</p>
                        <h4 className="font-medium">{item.name || item.title || "Product"}</h4>
                        <div className="flex justify-between mt-1">
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-6 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between mb-4 text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {showSuccess && orderDetails && (
          <SuccessModal isOpen={showSuccess} onClose={onClose} orderDetails={orderDetails} />
        )}
      </div>
    </div>
  )
}

