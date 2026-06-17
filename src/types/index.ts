export interface Debt {
  id: string;
  friendId: string;
  friendName: string;
  amount: number;
  description: string;
  date: Date;
  isPaid: boolean;
  isYouOwing: boolean; // true = you owe, false = they owe you
}

export interface Friend {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalOwed: number; // montant total que vous leur devez
  totalCredited: number; // montant total qu'ils vous doivent
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Transaction {
  debt: Debt;
  friend: Friend;
}
