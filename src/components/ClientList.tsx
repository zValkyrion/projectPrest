import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useClient } from '../context/ClientContext';
import { SearchBar } from './SearchBar';
import { EditClientModal } from './EditClientModal';
import { Client } from '../types/client';

export function ClientList() {
  const { clients, removeClient } = useClient();
  const [search, setSearch] = useState('');
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search)
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Clientes Registrados</h2>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nombre, email o teléfono..."
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{client.name}</h3>
                <p className="text-gray-600 text-sm">Email: {client.email}</p>
                <p className="text-gray-600 text-sm">Teléfono: {client.phone}</p>
                <p className="text-gray-600 text-sm">Dirección: {client.address}</p>
                <div className="mt-2">
                  <p className="font-medium text-gray-700 text-sm">Referencias:</p>
                  {client.references.map((ref, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {ref.name} - {ref.phone}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingClient(client)}
                  className="text-blue-500 hover:text-blue-700 p-2"
                  title="Editar cliente"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => removeClient(client.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Eliminar cliente"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredClients.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">No se encontraron clientes</p>
        )}
      </div>

      <EditClientModal
        isOpen={editingClient !== null}
        onClose={() => setEditingClient(null)}
        client={editingClient}
      />
    </div>
  );
}