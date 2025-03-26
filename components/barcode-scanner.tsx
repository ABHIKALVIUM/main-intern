"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Quagga from "@ericblade/quagga2"

type BarcodeScannerProps = {
  isOpen: boolean
  onClose: () => void
  onDetected: (barcode: string) => void
}

export default function BarcodeScanner({ isOpen, onClose, onDetected }: BarcodeScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null)
  const [camera, setCamera] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && scannerRef.current) {
      startScanner()
    }

    return () => {
      stopScanner()
    }
  }, [isOpen])

  const startScanner = async () => {
    setError(null)

    try {
      // Check if camera is available
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter((device) => device.kind === "videoinput")

      if (cameras.length === 0) {
        setError("No camera found on this device")
        return
      }

      setCamera(true)

      await Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment", // Use the rear camera if available
            width: { min: 200, max: 300 }, // Reduced max width
            height: { min: 100, max: 200 }, // Reduced max height
            aspectRatio: { min: 1, max: 2 },
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: navigator.hardwareConcurrency || 2, // Reduced workers
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader", "upc_reader", "upc_e_reader"],
        },
        locate: true,
      })

      Quagga.start()

      Quagga.onDetected((result) => {
        if (result && result.codeResult) {
          const code = result.codeResult.code
          if (code) {
            onDetected(code)
            stopScanner()
            onClose()
          }
        }
      })
    } catch (err) {
      console.error("Error starting scanner:", err)
      setError("Failed to start the barcode scanner. Please make sure you've granted camera permissions.")
      setCamera(false)
    }
  }

  const stopScanner = () => {
    Quagga.stop()
    setCamera(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-[300px] overflow-hidden">
        {" "}
        {/* Fixed width */}
        <div className="p-3 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Scan Barcode</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="p-3">
          {error ? (
            <div className="text-center py-4">
              <p className="text-red-500 mb-3 text-sm">{error}</p>
              <Button
                onClick={startScanner}
                className="bg-primary hover:bg-primary/90 text-white text-sm py-1 px-3"
                size="sm"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div
                ref={scannerRef}
                className="relative overflow-hidden bg-black rounded-lg mx-auto"
                style={{
                  width: "240px", // Reduced width
                  height: "160px", // Reduced height
                }}
              >
                {!camera && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera size={24} className="mx-auto mb-1" />
                      <p className="text-sm">Starting camera...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 text-center text-xs text-muted-foreground">
                <p>Position the barcode within the scanner view.</p>
                <p>The scanner will automatically detect valid barcodes.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

