"use client"

import React, { createContext, ReactNode, useContext, useState } from 'react'
//define the shape of the context data ie define the main interface
interface ScannerContextType{
    isScannerOpen:boolean;
    openScanner:()=> void;
    closeScanner:()=>void;
    setScanSuccessHandler:(handler:(decodedText:string)=>void)=>void;
    triggerScanSuccess:(decodedText:string)=>void;
}

const ScannerContext = createContext<ScannerContextType|undefined>(undefined);

const ScannerProvider = ({children}:{children:ReactNode}) => {
  const[isScannerOpen,setIsScannerOpen]=useState(false);
  const[onScanSuccess,setOnScanSuccess]=useState<(decodedText:string)=>void>(()=>()=>{});
  const openScanner = ()=>setIsScannerOpen(true);
  const closeScanner =()=>setIsScannerOpen(false);

  const setScanSuccessHandler=(handler:(decodedText:string)=>void)=>{
    setOnScanSuccess(()=>handler);
  };

  const triggerScanSuccess =(decodedText:string)=>{
    if(onScanSuccess){
      onScanSuccess(decodedText);
    }
  }
  const value ={
    isScannerOpen,
    openScanner,
    closeScanner,
    setScanSuccessHandler,
    triggerScanSuccess,
  }
  return (
    <ScannerContext.Provider value={value}>
      {children}
    </ScannerContext.Provider>
  );
}
export const useScanner =()=>{
  const context = useContext(ScannerContext);
  if(context==undefined){
    throw new Error('useScanner must be used within a scanner provider ');
    
  }
  return context;

}

export default ScannerProvider