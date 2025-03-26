"use client"

import type React from "react"
import { useState } from "react"
import { Search, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import BarcodeScanner from "./barcode-scanner"

type ProductSearchProps = {
  onSearch: (query: string) => void
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScannerOpen, setIsScannerOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleBarcodeDetected = (barcode: string) => {
    setSearchQuery(barcode)
    onSearch(barcode)
  }

  return (
    <>
      <div className="relative">
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-l-none" size="sm">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="ml-1 border-primary text-primary hover:bg-primary/10"
            onClick={() => setIsScannerOpen(true)}
            title="Scan Barcode"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <BarcodeScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onDetected={handleBarcodeDetected}
      />
    </>
  )
}

