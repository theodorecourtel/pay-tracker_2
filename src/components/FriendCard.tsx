import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Friend } from '@/types';
import { Card } from './Card';
import { COLORS, SPACING, FONT_SIZES } from '@/styles/theme';
import { Button } from './Button';

interface FriendCardProps {
  friend: Friend;
  onPress?: () => void;
}

export const FriendCard: React.FC<FriendCardProps> = ({ friend, onPress }) => {
  const totalBalance = friend.totalCredited - friend.totalOwed;
  const isBalancePositive = totalBalance >= 0;

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{friend.name.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{friend.name}</Text>
            <Text style={styles.email}>{friend.email}</Text>
          </View>
        </View>

        <View style={styles.balanceContainer}>
          {friend.totalOwed > 0 && (
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Vous devez :</Text>
              <Text style={[styles.balanceAmount, { color: COLORS.danger }]}>
                {friend.totalOwed}€
              </Text>
            </View>
          )}
          {friend.totalCredited > 0 && (
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>On vous doit :</Text>
              <Text style={[styles.balanceAmount, { color: COLORS.success }]}>
                {friend.totalCredited}€
              </Text>
            </View>
          )}
        </View>

        <Button
          title="Voir détails"
          onPress={onPress || (() => {})}
          variant="secondary"
          size="sm"
          style={styles.button}
        />
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
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  email: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  balanceContainer: {
    marginBottom: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  balanceLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  balanceAmount: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  button: {
    marginTop: SPACING.md,
  },
});
