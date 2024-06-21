import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IPayData } from '../interfaces/interfaces';



// Definição dos tipos
interface PaymentContextProps {
  payment: IPayData | null;
  setPayment: React.Dispatch<React.SetStateAction<IPayData | null>>;
}

// Inicialização do contexto
const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const [payment, setPayment] = useState<IPayData | null>(null);

  return (
    <PaymentContext.Provider value={{ payment, setPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};