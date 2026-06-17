import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDebts } from '@/context/DebtContext';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/styles/theme';

interface AddDebtScreenProps {
  onGoBack: () => void;
}

export const AddDebtScreen: React.FC<AddDebtScreenProps> = ({ onGoBack }) => {
  const { friends, addDebt } = useDebts();
  const [selectedFriend, setSelectedFriend] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isYouOwing, setIsYouOwing] = useState<boolean>(true);
  const [showFriendPicker, setShowFriendPicker] = useState<boolean>(false);

  const handleAddDebt = () => {
    if (!selectedFriend || !amount) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }

    const friend = friends.find((f) => f.id === selectedFriend);
    if (!friend) return;

    addDebt({
      id: Date.now().toString(),
      friendId: selectedFriend,
      friendName: friend.name,
      amount: parseFloat(amount),
      description,
      date: new Date(),
      isPaid: false,
      isYouOwing,
    });

    onGoBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onGoBack}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Ajouter une dette</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.content}>
            {/* Friend Selection */}
            <View style={styles.section}>
              <Text style={styles.label}>QUI EST IMPLIQUÉ ?</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowFriendPicker(!showFriendPicker)}
              >
                <Text
                  style={[
                    styles.inputText,
                    !selectedFriend && { color: COLORS.textLight },
                  ]}
                >
                  {selectedFriend
                    ? friends.find((f) => f.id === selectedFriend)?.name
                    : 'Rechercher un ami'}
                </Text>
                <Text style={styles.picker}>▼</Text>
              </TouchableOpacity>

              {showFriendPicker && (
                <Card style={styles.friendList}>
                  {friends.map((friend) => (
                    <TouchableOpacity
                      key={friend.id}
                      style={styles.friendOption}
                      onPress={() => {
                        setSelectedFriend(friend.id);
                        setShowFriendPicker(false);
                      }}
                    >
                      <Text style={styles.friendOptionText}>{friend.name}</Text>
                    </TouchableOpacity>
                  ))}
                </Card>
              )}
            </View>

            {/* Amount */}
            <View style={styles.section}>
              <Text style={styles.label}>MONTANT</Text>
              <View style={styles.amountInputContainer}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0,00"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                  placeholderTextColor={COLORS.textLight}
                />
                <Text style={styles.currency}>€</Text>
              </View>
            </View>

            {/* Type */}
            <View style={styles.section}>
              <Text style={styles.label}>JE DOIS / ON ME DOIT</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => setIsYouOwing(true)}
                >
                  <View
                    style={[
                      styles.radio,
                      isYouOwing && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>Je dois</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => setIsYouOwing(false)}
                >
                  <View
                    style={[
                      styles.radio,
                      !isYouOwing && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>On me doit</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.label}>DESCRIPTION (optionnel)</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Ex: café, soirée..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                placeholderTextColor={COLORS.textLight}
              />
            </View>

            {/* Submit */}
            <Button
              title="AJOUTER"
              onPress={handleAddDebt}
              size="lg"
              style={styles.submitButton}
            />
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.primary,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
  },
  picker: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.sm,
  },
  friendList: {
    marginTop: SPACING.sm,
    paddingVertical: 0,
  },
  friendOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  friendOptionText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
  },
  amountInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
  },
  currency: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  radioGroup: {
    gap: SPACING.md,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.md,
  },
  radioSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
  },
  textArea: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
});
