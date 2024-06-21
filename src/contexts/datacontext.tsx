import React, { createContext, useContext, useState, ReactNode } from 'react';


interface Title {
    content: string
}

// Definição dos tipos
interface DataContextProps {
  title: Title | null;
  setTitle: React.Dispatch<React.SetStateAction<Title | null>>;
}

// Inicialização do contexto
const DataContext = createContext<DataContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: AuthProviderProps) => {
  const [title, setTitle] = useState<Title | null>(null);

  return (
    <DataContext.Provider value={{ title, setTitle }}>
      {children}
    </DataContext.Provider>
  );
};

