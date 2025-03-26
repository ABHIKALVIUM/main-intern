"use client"

import { Camera } from "lucide-react"
import { useState } from "react"
import BarcodeScanner from "./barcode-scanner"

type FloatingScanButtonProps = {
  onBarcodeDetected: (barcode: string) => void
}

export default function FloatingScanButton({ onBarcodeDetected }: FloatingScanButtonProps) {
  const [isScannerOpen, setIsScannerOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsScannerOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all z-10 md:hidden"
        aria-label="Scan Barcode"
      >
        <Camera className="h-5 w-5" />
      </button>

      <BarcodeScanner isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} onDetected={onBarcodeDetected} />
    </>
  )
}

