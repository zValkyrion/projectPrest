import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLoan } from '../context/LoanContext';
import { useClient } from '../context/ClientContext';
import { format, addDays } from 'date-fns';
import { Client } from '../types/client';

interface AddLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClient?: Client;
}

export function AddLoanModal({ isOpen, onClose, selectedClient }: AddLoanModalProps) {
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const { addLoan } = useLoan();
  const { clients } = useClient();
  const [selectedClientId, setSelectedClientId] = useState(selectedClient?.id || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loanAmount = parseFloat(amount);
    const durationDays = parseInt(duration);
    const dailyPayment = loanAmount / durationDays;
    const start = new Date(startDate);
    const end = addDays(start, durationDays);

    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return;

    addLoan({
      clientName: client.name,
      amount: loanAmount,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      dailyPayment,
    });

    onClose();
    setAmount('');
    setStartDate('');
    setDuration('');
    setSelectedClientId('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Registrar Nuevo Préstamo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="clientSelect" className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <select
              id="clientSelect"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Monto del Préstamo
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duración (días)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="1"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Registrar Préstamo
          </button>
        </form>
      </div>
    </div>
  );
}