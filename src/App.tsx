import React, { useState } from 'react';
import { View } from 'react-native';
import { DebtProvider } from '@/context/DebtContext';
import { HomeScreen } from '@/screens/HomeScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { AddDebtScreen } from '@/screens/AddDebtScreen';
import { TransactionDetailScreen } from '@/screens/TransactionDetailScreen';
import { FriendsScreen } from '@/screens/FriendsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

type Screen =
  | 'home'
  | 'dashboard'
  | 'add-debt'
  | 'transaction-detail'
  | 'friends'
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedDebtId, setSelectedDebtId] = useState<string>('');

  const handleNavigate = (screen: Screen, debtId?: string) => {
    setCurrentScreen(screen);
    if (debtId) setSelectedDebtId(debtId);
  };

  return (
    <DebtProvider>
      <View style={{ flex: 1 }}>
        {currentScreen === 'home' && (
          <HomeScreen
            onStartPress={() => handleNavigate('dashboard')}
          />
        )}
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onNavigate={handleNavigate}
            currentScreen={currentScreen}
            onTransactionPress={(debtId) =>
              handleNavigate('transaction-detail', debtId)
            }
          />
        )}
        {currentScreen === 'add-debt' && (
          <AddDebtScreen
            onGoBack={() => handleNavigate('dashboard')}
          />
        )}
        {currentScreen === 'transaction-detail' && (
          <TransactionDetailScreen
            debtId={selectedDebtId}
            onGoBack={() => handleNavigate('dashboard')}
          />
        )}
        {currentScreen === 'friends' && (
          <FriendsScreen
            onGoBack={() => handleNavigate('dashboard')}
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen
            onGoBack={() => handleNavigate('dashboard')}
          />
        )}
      </View>
    </DebtProvider>
  );
}
