import React, { createContext, useState, useCallback } from 'react';
import { Debt, Friend, User } from '@/types';

interface DebtContextType {
  debts: Debt[];
  friends: Friend[];
  user: User | null;
  addDebt: (debt: Debt) => void;
  updateDebt: (id: string, updates: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
  markAsPaid: (id: string) => void;
  addFriend: (friend: Friend) => void;
  getTotalOwed: () => number;
  getTotalCredited: () => number;
}

export const DebtContext = createContext<DebtContextType | undefined>(undefined);

export const DebtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: '1',
      friendId: 'f1',
      friendName: 'Sarah',
      amount: 40,
      description: 'Dîner au resto',
      date: new Date(2026, 5, 12),
      isPaid: false,
      isYouOwing: true,
    },
    {
      id: '2',
      friendId: 'f2',
      friendName: 'Marc',
      amount: 15,
      description: 'Cinéma',
      date: new Date(2026, 5, 15),
      isPaid: false,
      isYouOwing: true,
    },
    {
      id: '3',
      friendId: 'f3',
      friendName: 'Luc',
      amount: 25,
      description: 'Café',
      date: new Date(2026, 5, 10),
      isPaid: false,
      isYouOwing: false,
    },
  ]);

  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 'f1',
      name: 'Sarah',
      email: 'sarah@email.com',
      totalOwed: 40,
      totalCredited: 0,
    },
    {
      id: 'f2',
      name: 'Marc',
      email: 'marc@email.com',
      totalOwed: 15,
      totalCredited: 0,
    },
    {
      id: 'f3',
      name: 'Luc',
      email: 'luc@email.com',
      totalOwed: 0,
      totalCredited: 25,
    },
  ]);

  const [user] = useState<User>({
    id: 'user1',
    name: 'John Doe',
    email: 'john@email.com',
    phone: '+33 6 12 34 56 78',
  });

  const addDebt = useCallback((debt: Debt) => {
    setDebts((prevDebts) => [...prevDebts, debt]);
  }, []);

  const updateDebt = useCallback((id: string, updates: Partial<Debt>) => {
    setDebts((prevDebts) =>
      prevDebts.map((debt) => (debt.id === id ? { ...debt, ...updates } : debt))
    );
  }, []);

  const deleteDebt = useCallback((id: string) => {
    setDebts((prevDebts) => prevDebts.filter((debt) => debt.id !== id));
  }, []);

  const markAsPaid = useCallback((id: string) => {
    updateDebt(id, { isPaid: true });
  }, [updateDebt]);

  const addFriend = useCallback((friend: Friend) => {
    setFriends((prevFriends) => [...prevFriends, friend]);
  }, []);

  const getTotalOwed = useCallback(() => {
    return debts
      .filter((debt) => !debt.isPaid && debt.isYouOwing)
      .reduce((sum, debt) => sum + debt.amount, 0);
  }, [debts]);

  const getTotalCredited = useCallback(() => {
    return debts
      .filter((debt) => !debt.isPaid && !debt.isYouOwing)
      .reduce((sum, debt) => sum + debt.amount, 0);
  }, [debts]);

  return (
    <DebtContext.Provider
      value={{
        debts,
        friends,
        user,
        addDebt,
        updateDebt,
        deleteDebt,
        markAsPaid,
        addFriend,
        getTotalOwed,
        getTotalCredited,
      }}
    >
      {children}
    </DebtContext.Provider>
  );
};

export const useDebts = () => {
  const context = React.useContext(DebtContext);
  if (!context) {
    throw new Error('useDebts must be used within DebtProvider');
  }
  return context;
};
