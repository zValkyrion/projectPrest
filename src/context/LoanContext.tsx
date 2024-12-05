import React, { createContext, useContext, useState } from 'react';
import { Loan, Payment } from '../types/loan';

interface LoanContextType {
  loans: Loan[];
  addLoan: (loan: Omit<Loan, 'id' | 'payments'>) => void;
  removeLoan: (id: string) => void;
  addPayment: (loanId: string, amount: number) => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export function LoanProvider({ children }: { children: React.ReactNode }) {
  const [loans, setLoans] = useState<Loan[]>([]);

  const addLoan = (loanData: Omit<Loan, 'id' | 'payments'>) => {
    const newLoan: Loan = {
      ...loanData,
      id: crypto.randomUUID(),
      payments: [],
    };
    setLoans([...loans, newLoan]);
  };

  const removeLoan = (id: string) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };

  const addPayment = (loanId: string, amount: number) => {
    const payment: Payment = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      amount,
    };

    setLoans(loans.map(loan => 
      loan.id === loanId
        ? { ...loan, payments: [...loan.payments, payment] }
        : loan
    ));
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan, removeLoan, addPayment }}>
      {children}
    </LoanContext.Provider>
  );
}

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};