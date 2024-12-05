import React from 'react';
import { Plus } from 'lucide-react';
import { Client } from '../types/client';

interface ClientLoanCardProps {
  client: Client;
  onAddLoan: (client: Client) => void;
}

export function ClientLoanCard({ client, onAddLoan }: ClientLoanCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{client.name}</h3>
          <p className="text-gray-600">Email: {client.email}</p>
          <p className="text-gray-600">Teléfono: {client.phone}</p>
        </div>
        <button
          onClick={() => onAddLoan(client)}
          className="text-blue-500 hover:text-blue-700 p-2"
          title="Agregar préstamo"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}