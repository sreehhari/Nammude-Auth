"use client"

import React from "react";
import { useScanner } from "./Context";
import QrScanner from "./components/QrScanner";

export default function Home() {
  const { isScannerOpen, closeScanner, setScanSuccessHandler } = useScanner();

  // Set up the scan success handler
  React.useEffect(() => {
    setScanSuccessHandler((decodedText: string) => {
      console.log("QR Code scanned:", decodedText);
      console.log("type of :",typeof decodedText);
      console.log("Length:", decodedText.length);

      // Handle the scanned data here
      alert(`Scanned: ${decodedText}`);
      closeScanner();
    });
  }, []);

  return (
    <>
      {isScannerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Scan QR Code</h2>
              <button
                onClick={closeScanner}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            <QrScanner />
          </div>
        </div>
      )}
    </>
  );
}