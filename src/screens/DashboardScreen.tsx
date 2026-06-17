import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useDebts } from '@/context/DebtContext';
import { Card } from '@/components/Card';
import { TransactionCard } from '@/components/TransactionCard';
import { Navigation } from '@/components/Navigation';
import { COLORS, SPACING, FONT_SIZES } from '@/styles/theme';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
  currentScreen: string;
  onTransactionPress?: (debtId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  currentScreen,
  onTransactionPress,
}) => {
  const { debts, user, getTotalOwed, getTotalCredited } = useDebts();
  const totalOwed = getTotalOwed();
  const totalCredited = getTotalCredited();
  const unPaidDebts = debts.filter((d) => !d.isPaid);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>
              👤 Bonjour, {user?.name.split(' ')[0]}!
            </Text>
          </View>

          {/* Balance Cards */}
          <View style={styles.balanceSection}>
            <Card style={[styles.balanceCard, styles.owedCard]}>
              <Text style={styles.balanceLabel}>Vous devez</Text>
              <Text style={styles.balanceAmount}>{totalOwed}€</Text>
            </Card>
            <Card style={[styles.balanceCard, styles.creditedCard]}>
              <Text style={styles.balanceLabel}>On vous doit</Text>
              <Text style={styles.balanceAmount}>{totalCredited}€</Text>
            </Card>
          </View>

          {/* Recent Transactions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 TRANSACTIONS RÉCENTES</Text>
            {unPaidDebts.length > 0 ? (
              unPaidDebts.map((debt) => (
                <TransactionCard
                  key={debt.id}
                  transaction={debt}
                  onPress={() => onTransactionPress?.(debt.id)}
                />
              ))
            ) : (
              <Card>
                <Text style={styles.emptyText}>
                  Aucune dette en attente. Bien joué ! 🎉
                </Text>
              </Card>
            )}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <Navigation
          items={[
            {
              label: 'Ajouter',
              icon: '+',
              onPress: () => onNavigate('add-debt'),
            },
            {
              label: 'Amis',
              icon: '👥',
              onPress: () => onNavigate('friends'),
              active: currentScreen === 'friends',
            },
            {
              label: 'Paramètres',
              icon: '⚙️',
              onPress: () => onNavigate('settings'),
              active: currentScreen === 'settings',
            },
            {
              label: 'Profil',
              icon: '👤',
              onPress: () => onNavigate('profile'),
              active: currentScreen === 'profile',
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  balanceSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  balanceCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
  },
  owedCard: {
    backgroundColor: '#FEE2E2',
  },
  creditedCard: {
    backgroundColor: '#DCFCE7',
  },
  balanceLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  balanceAmount: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    color: COLORS.text,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingVertical: SPACING.lg,
  },
});
