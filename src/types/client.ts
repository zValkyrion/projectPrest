export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  references: {
    name: string;
    phone: string;
  }[];
}

export interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  removeClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
}