import React from 'react';
import { Trash2 } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export function InventoryList() {
  const { items, removeItem } = useInventory();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventario</h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500 text-center">No hay items en el inventario</p>
        )}
      </div>
    </div>
  );
}