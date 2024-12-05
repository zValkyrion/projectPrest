import React, { createContext, useContext, useState } from 'react';
import { InventoryItem } from '../types/inventory';

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  removeItem: (id: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const addItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};