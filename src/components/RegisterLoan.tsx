import React, { useState } from 'react';
import { useClient } from '../context/ClientContext';
import { SearchBar } from './SearchBar';
import { ClientLoanCard } from './ClientLoanCard';
import { AddLoanModal } from './AddLoanModal';
import { Client } from '../types/client';

export function RegisterLoan() {
  const { clients } = useClient();
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddLoanModalOpen, setIsAddLoanModalOpen] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search)
  );

  const handleAddLoan = (client: Client) => {
    setSelectedClient(client);
    setIsAddLoanModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Registrar Préstamo</h2>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar cliente por nombre, email o teléfono..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <ClientLoanCard
            key={client.id}
            client={client}
            onAddLoan={handleAddLoan}
          />
        ))}
        {filteredClients.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No se encontraron clientes
          </p>
        )}
      </div>

      <AddLoanModal
        isOpen={isAddLoanModalOpen}
        onClose={() => {
          setIsAddLoanModalOpen(false);
          setSelectedClient(null);
        }}
        selectedClient={selectedClient || undefined}
      />
    </div>
  );
}