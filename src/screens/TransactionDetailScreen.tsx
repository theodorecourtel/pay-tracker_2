import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDebts } from '@/context/DebtContext';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/styles/theme';

interface TransactionDetailScreenProps {
  debtId: string;
  onGoBack: () => void;
}

export const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({
  debtId,
  onGoBack,
}) => {
  const { debts, markAsPaid, deleteDebt } = useDebts();
  const debt = debts.find((d) => d.id === debtId);

  if (!debt) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backButton}>← Retour</Text>
          </TouchableOpacity>
          <Text style={styles.error}>Transaction non trouvée</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backButton}>← Retour</Text>
          </TouchableOpacity>
          <Text style={styles.friendName}>{debt.friendName}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Amount Card */}
        <Card
          style={[
            styles.amountCard,
            debt.isYouOwing
              ? styles.amountCardOwing
              : styles.amountCardCredited,
          ]}
        >
          <Text style={styles.amountLabel}>
            {debt.isYouOwing ? 'Vous devez' : 'On vous doit'}
          </Text>
          <Text style={styles.amount}>{debt.amount}€</Text>
          <Text style={styles.status}>
            {debt.isPaid ? '✓ Payé' : '⏱️ À payer'}
          </Text>
        </Card>

        {/* Details */}
        <Card style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>DÉTAILS</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailValue}>{debt.description || '-'}</Text>
          </View>
          <View style={[styles.detailItem, styles.borderTop]}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {debt.date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
          <View style={[styles.detailItem, styles.borderTop]}>
            <Text style={styles.detailLabel}>Partagé par</Text>
            <Text style={styles.detailValue}>{debt.friendName}</Text>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          {!debt.isPaid && (
            <Button
              title="Marquer comme payé"
              onPress={() => {
                markAsPaid(debt.id);
                onGoBack();
              }}
              variant="success"
              size="lg"
              style={styles.button}
            />
          )}
          <Button
            title="Supprimer"
            onPress={() => {
              deleteDebt(debt.id);
              onGoBack();
            }}
            variant="danger"
            size="lg"
            style={styles.button}
          />
        </View>
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
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  backButton: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    fontWeight: '600',
  },
  friendName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  error: {
    fontSize: FONT_SIZES.base,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  amountCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  amountCardOwing: {
    backgroundColor: '#FEE2E2',
  },
  amountCardCredited: {
    backgroundColor: '#DCFCE7',
  },
  amountLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  amount: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  status: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  detailsCard: {
    marginBottom: SPACING.lg,
  },
  detailsTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  detailItem: {
    paddingVertical: SPACING.md,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  detailLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  detailValue: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  actions: {
    gap: SPACING.md,
  },
  button: {
    width: '100%',
  },
});
