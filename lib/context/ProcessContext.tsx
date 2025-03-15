"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Criterion } from "@/lib/api";

// Define the context state shape
interface ProcessContextState {
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  criteria: Criterion[];
  setCriteria: (criteria: Criterion[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// Create the context with default values
const ProcessContext = createContext<ProcessContextState>({
  pdfFile: null,
  setPdfFile: () => {},
  criteria: [],
  setCriteria: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
});

// Custom hook to use the context
export const useProcess = () => useContext(ProcessContext);

// Provider component
export function ProcessProvider({ children }: { children: ReactNode }) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <ProcessContext.Provider
      value={{
        pdfFile,
        setPdfFile,
        criteria,
        setCriteria,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}
