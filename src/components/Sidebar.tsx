import React from 'react';
import { LogOut, Users, Plus, User, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  onAddClient: () => void;
  onViewClients: () => void;
  onViewLoans: () => void;
  onRegisterLoan: () => void;
}

export function Sidebar({ onAddClient, onViewClients, onViewLoans, onRegisterLoan }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Sistema de Préstamos</h2>
      </div>
      
      <nav className="flex-1">
        <button
          onClick={onAddClient}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
        >
          <Plus size={20} />
          <span>Registrar Cliente</span>
        </button>

        <button
          onClick={onViewClients}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
        >
          <Users size={20} />
          <span>Ver Clientes</span>
        </button>

        <button
          onClick={onRegisterLoan}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
        >
          <DollarSign size={20} />
          <span>Registrar Préstamo</span>
        </button>

        <button
          onClick={onViewLoans}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
        >
          <Users size={20} />
          <span>Ver Préstamos</span>
        </button>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <User size={20} />
          <span>{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-700 rounded"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}