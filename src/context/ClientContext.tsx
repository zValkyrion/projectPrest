import React, { createContext, useContext, useState } from 'react';
import { Client, ClientContextType } from '../types/client';

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);

  const addClient = (clientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...clientData,
      id: crypto.randomUUID(),
    };
    setClients([...clients, newClient]);
  };

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setClients(clients.map(client => 
      client.id === id ? { ...client, ...clientData } : client
    ));
  };

  const removeClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const getClientById = (id: string) => {
    return clients.find(client => client.id === id);
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, updateClient, removeClient, getClientById }}>
      {children}
    </ClientContext.Provider>
  );
}

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};