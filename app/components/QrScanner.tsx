"use client"

import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect, useRef } from 'react'
import { useScanner } from '../Context';

const QrScanner: React.FC = () => {
    const {triggerScanSuccess} = useScanner();
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const isInitialized = useRef(false);

    useEffect(()=>{
        // Prevent double initialization in Strict Mode
        if (isInitialized.current) return;
        isInitialized.current = true;

        //creating a new scanner
        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                qrbox:{
                    width:250,
                    height:250,
                },
                fps:5,
            },
            false //set false for less verbose logging 
        );
        
        scannerRef.current = scanner;

        const successCallBack = (decodedText:string)=>{
            triggerScanSuccess(decodedText);
            scanner.clear();
        };
        
        const errorCallBack = (error:unknown)=>{
            
            if (error && typeof error === 'string' && !error.includes('NotFoundException')) {
                console.warn('QR Scanner error:', error);
            }
        };
        
        scanner.render(successCallBack,errorCallBack);
        
        return()=>{
            isInitialized.current = false;
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error=>{
                    console.error("failed to clear the scanner on unmount.",error);
                });
                scannerRef.current = null;
            }
        };
    },[triggerScanSuccess])
    
  return (
    <div>
        <h2>Qrcode scanner</h2>
        <div id='reader' style={{width:'300px',margin:'auto'}}>
        </div>
    </div>
  )
}

export default QrScanner