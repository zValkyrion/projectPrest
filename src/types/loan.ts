import { addDays, format, isAfter, isBefore, isToday, parseISO } from 'date-fns';

export interface Loan {
  id: string;
  clientName: string;
  amount: number;
  startDate: string;
  endDate: string;
  dailyPayment: number;
  payments: Payment[];
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
}

export const calculateLoanStatus = (loan: Loan) => {
  const today = new Date();
  const start = parseISO(loan.startDate);
  const end = parseISO(loan.endDate);
  
  if (isBefore(today, start)) {
    return 'pending';
  }
  
  if (isAfter(today, end)) {
    return 'completed';
  }

  const expectedPayments = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalPaid = loan.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const expectedTotal = expectedPayments * loan.dailyPayment;

  if (totalPaid >= expectedTotal) {
    return 'current';
  }
  
  return 'late';
};

export const hasPaymentToday = (loan: Loan): boolean => {
  return loan.payments.some(payment => isToday(parseISO(payment.date)));
};

export const getRemainingAmount = (loan: Loan): number => {
  const totalAmount = loan.amount;
  const totalPaid = loan.payments.reduce((sum, payment) => sum + payment.amount, 0);
  return totalAmount - totalPaid;
};