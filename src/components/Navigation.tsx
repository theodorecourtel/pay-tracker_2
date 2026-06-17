import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, SHADOWS } from '@/styles/theme';

interface NavItem {
  label: string;
  icon: string;
  onPress: () => void;
  active?: boolean;
}

interface NavigationProps {
  items: NavItem[];
  addButtonOnPress?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items, addButtonOnPress }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, item.active && styles.activeItem]}
          onPress={item.onPress}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={[styles.label, item.active && styles.activeLabel]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.md,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeItem: {
    borderTopWidth: 3,
    borderTopColor: COLORS.primary,
    paddingTop: SPACING.sm,
  },
  icon: {
    fontSize: FONT_SIZES['2xl'],
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
