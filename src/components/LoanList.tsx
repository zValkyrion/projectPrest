import React, { useState } from 'react';
import { Trash2, DollarSign } from 'lucide-react';
import { useLoan } from '../context/LoanContext';
import { calculateLoanStatus, hasPaymentToday, getRemainingAmount } from '../types/loan';
import { format, parseISO } from 'date-fns';
import { LoanStatusTabs } from './LoanStatusTabs';

type TabOption = 'all' | 'current' | 'pending';

export function LoanList() {
  const { loans, removeLoan, addPayment } = useLoan();
  const [currentTab, setCurrentTab] = useState<TabOption>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-600';
      case 'late': return 'text-red-600';
      case 'completed': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const handlePayment = (loanId: string, dailyPayment: number) => {
    addPayment(loanId, dailyPayment);
  };

  const filteredLoans = loans.filter(loan => {
    const paidToday = hasPaymentToday(loan);
    switch (currentTab) {
      case 'current':
        return paidToday;
      case 'pending':
        return !paidToday && calculateLoanStatus(loan) !== 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Préstamos Activos</h2>
      
      <LoanStatusTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLoans.map((loan) => {
          const status = calculateLoanStatus(loan);
          const paidToday = hasPaymentToday(loan);
          const remaining = getRemainingAmount(loan);

          return (
            <div
              key={loan.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1 w-full">
                  <h3 className="font-semibold text-lg">{loan.clientName}</h3>
                  <p className="text-gray-600 text-sm">
                    Monto: ${loan.amount.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Pago diario: ${loan.dailyPayment.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Periodo: {format(parseISO(loan.startDate), 'dd/MM/yyyy')} - {format(parseISO(loan.endDate), 'dd/MM/yyyy')}
                  </p>
                  <p className={`${getStatusColor(status)} text-sm`}>
                    Estado: {status === 'current' ? 'Al corriente' : status === 'late' ? 'Atrasado' : status === 'completed' ? 'Completado' : 'Pendiente'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Restante: ${remaining.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {paidToday ? '✅ Pago de hoy realizado' : '❌ Pago de hoy pendiente'}
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  {!paidToday && status !== 'completed' && (
                    <button
                      onClick={() => handlePayment(loan.id, loan.dailyPayment)}
                      className="text-green-500 hover:text-green-700 p-2"
                      title="Registrar pago"
                    >
                      <DollarSign size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => removeLoan(loan.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Eliminar préstamo"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filteredLoans.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            {currentTab === 'current' 
              ? 'No hay préstamos al corriente'
              : currentTab === 'pending'
              ? 'No hay préstamos con pagos pendientes'
              : 'No hay préstamos registrados'}
          </p>
        )}
      </div>
    </div>
  );
}