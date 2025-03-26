"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

type ProductCardProps = {
  product: {
    id: number | string
    title: string
    price: number
    image: string
    category: string
  }
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 p-4"
      onClick={onClick}
    >
      <div className="relative w-full h-56">
        <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
        <div className="flex justify-between items-center">
          <p className="font-bold">${product.price.toFixed(2)}</p>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </div>
  )
}

