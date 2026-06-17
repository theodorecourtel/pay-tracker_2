import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Debt } from '@/types';
import { Card } from './Card';
import { COLORS, SPACING, FONT_SIZES } from '@/styles/theme';

interface TransactionCardProps {
  transaction: Debt;
  onPress?: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onPress }) => {
  const direction = transaction.isYouOwing ? '→' : '←';
  const statusColor = transaction.isPaid ? COLORS.success : COLORS.danger;
  const statusText = transaction.isPaid ? 'Payé' : 'À payer';

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.direction}>{direction}</Text>
          <View style={styles.info}>
            <Text style={styles.name}>{transaction.friendName}</Text>
            <Text style={styles.date}>
              {transaction.date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
              })}
            </Text>
          </View>
          <View>
            <Text style={[styles.amount, { color: statusColor }]}>
              {transaction.isYouOwing ? '+' : '-'}{transaction.amount}€
            </Text>
            <Text style={[styles.status, { color: statusColor }]}>{statusText}</Text>
          </View>
        </View>
        {transaction.description && (
          <Text style={styles.description}>{transaction.description}</Text>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  direction: {
    fontSize: FONT_SIZES['2xl'],
    marginRight: SPACING.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  date: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  amount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    textAlign: 'right',
  },
  status: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginTop: SPACING.md,
  },
});
