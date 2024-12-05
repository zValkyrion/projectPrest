import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useClient } from '../context/ClientContext';
import { Client } from '../types/client';

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export function EditClientModal({ isOpen, onClose, client }: EditClientModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [references, setReferences] = useState<{ name: string; phone: string; }[]>([]);
  
  const { updateClient } = useClient();

  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(client.email);
      setPhone(client.phone);
      setAddress(client.address);
      setReferences(client.references);
    }
  }, [client]);

  if (!isOpen || !client) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClient(client.id, {
      name,
      email,
      phone,
      address,
      references,
    });
    onClose();
  };

  const addReference = () => {
    setReferences([...references, { name: '', phone: '' }]);
  };

  const removeReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index));
  };

  const updateReference = (index: number, field: 'name' | 'phone', value: string) => {
    setReferences(references.map((ref, i) => 
      i === index ? { ...ref, [field]: value } : ref
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Cliente</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={2}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Referencias
              </label>
              <button
                type="button"
                onClick={addReference}
                className="text-blue-500 hover:text-blue-700"
              >
                <Plus size={20} />
              </button>
            </div>
            {references.map((ref, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ref.name}
                  onChange={(e) => updateReference(index, 'name', e.target.value)}
                  placeholder="Nombre"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <input
                  type="tel"
                  value={ref.phone}
                  onChange={(e) => updateReference(index, 'phone', e.target.value)}
                  placeholder="Teléfono"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {references.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}