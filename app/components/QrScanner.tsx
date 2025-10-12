"use client"

import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect } from 'react'
interface QrScannerProps{
    onScanSuccess :(decodedText : string)=>void;
}

const QrScanner: React.FC<QrScannerProps> = ({onScanSuccess}) => {

    useEffect(()=>{
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
        const successCallBack = (decodedText:string)=>{
            onScanSuccess(decodedText);
            scanner.clear();
        };
        const errorCallBack = (error:unknown)=>{
            console.error(error);
        };
        scanner.render(successCallBack,errorCallBack);
        return()=>{
            scanner.clear().catch(error=>{
                console.error("failed to clear the scanner or unmount.",error);
            });
        };


    },[onScanSuccess])
  return (
    <div>
        <h2>Qrcode scanner</h2>
        <div id='reader'style={{width:'300px',margin:'auto'}}>

        </div>
    </div>
  )
}

export default QrScanner