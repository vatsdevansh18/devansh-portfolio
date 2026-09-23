'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CursorVariant = 'default' | 'project' | 'drag' | 'text' | 'email';

interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursorVariant: (variant: CursorVariant) => void;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');

  return (
    <CursorContext.Provider value={{ cursorVariant, cursorText, setCursorVariant, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
