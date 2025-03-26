"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
  orderDetails: any
}

export default function SuccessModal({ isOpen, onClose, orderDetails }: SuccessModalProps) {
  const { clearCart } = useCart()

  if (!isOpen) return null

  const handleClose = () => {
    clearCart()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h3 className="text-2xl font-bold mb-2">Purchase Successful!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for your order, {orderDetails.customer.name}. Your order has been confirmed.
        </p>

        <div className="bg-secondary/50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Order number:</span>
            <span className="font-medium">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total amount:</span>
            <span className="font-bold">${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          A confirmation email has been sent to {orderDetails.customer.email}. We'll notify you when your order ships.
        </p>

        <Button className="w-full bg-primary hover:bg-primary/90 text-white" onClick={handleClose}>
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}

