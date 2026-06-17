import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useDebts } from '@/context/DebtContext';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/styles/theme';

interface ProfileScreenProps {
  onGoBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onGoBack }) => {
  const { user } = useDebts();
  const [notifications, setNotifications] = React.useState(true);
  const [reminders, setReminders] = React.useState(true);
  const [emails, setEmails] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>⚙️ Paramètres</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Profile Section */}
            <Text style={styles.sectionTitle}>PROFIL</Text>
            <Card style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Button
                  title="Modifier"
                  onPress={() => {}}
                  variant="secondary"
                  size="sm"
                />
              </View>

              <View style={styles.profileInfo}>
                <ProfileField label="Nom" value={user?.name || ''} />
                <ProfileField label="Email" value={user?.email || ''} />
                <ProfileField label="Téléphone" value={user?.phone || ''} />
              </View>
            </Card>

            {/* Preferences */}
            <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
              PRÉFÉRENCES
            </Text>
            <Card style={styles.settingsList}>
              <SettingItem
                label="Notifications push"
                value={notifications}
                onChange={setNotifications}
              />
              <SettingItem
                label="Rappels de paiement"
                value={reminders}
                onChange={setReminders}
              />
              <SettingItem
                label="Emails de synthèse"
                value={emails}
                onChange={setEmails}
              />
            </Card>

            {/* Appearance */}
            <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
              APPARENCE
            </Text>
            <Card style={styles.settingsList}>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>○</Text>
                <Text style={styles.settingText}>Mode clair</Text>
              </View>
              <View style={[styles.settingItem, styles.settingItemBordered]}>
                <Text style={styles.settingLabel}>○</Text>
                <Text style={styles.settingText}>Mode sombre</Text>
              </View>
            </Card>

            {/* Logout */}
            <Button
              title="Se déconnecter"
              onPress={() => {}}
              variant="danger"
              size="lg"
              style={styles.logoutButton}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

interface ProfileFieldProps {
  label: string;
  value: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
};

interface SettingItemProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ label, value, onChange }) => {
  return (
    <View style={styles.settingItem}>
      <Text style={styles.settingText}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: COLORS.border, true: COLORS.primary }}
        thumbColor={value ? COLORS.primary : COLORS.disabled}
      />
    </View>
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
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  sectionTitleSpaced: {
    marginTop: SPACING.lg,
  },
  profileCard: {
    marginBottom: SPACING.lg,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  profileInfo: {
    gap: SPACING.md,
  },
  fieldContainer: {
    marginBottom: SPACING.md,
  },
  fieldLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  fieldValue: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingsList: {
    marginBottom: SPACING.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  settingItemBordered: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  settingLabel: {
    fontSize: FONT_SIZES.lg,
    marginRight: SPACING.md,
  },
  settingText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    flex: 1,
  },
  logoutButton: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
});
