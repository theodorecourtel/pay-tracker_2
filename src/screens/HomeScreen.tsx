import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Button } from '@/components/Button';
import { COLORS, SPACING, FONT_SIZES } from '@/styles/theme';

interface HomeScreenProps {
  onStartPress: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.emoji}>💳</Text>
          <Text style={styles.title}>PAY TRACKER</Text>
          <Text style={styles.subtitle}>
            Gérez vos dettes entre amis facilement
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <FeatureItem
            icon="✓"
            title="Suivi des argents avancés"
            description="Gardez trace de tous les montants prêtés ou empruntés"
          />
          <FeatureItem
            icon="🔔"
            title="Rappels automatiques"
            description="Recevez des notifications pour ne pas oublier les dettes"
          />
          <FeatureItem
            icon="🔄"
            title="Synchronisation en temps réel"
            description="Les données se mettent à jour automatiquement entre amis"
          />
        </View>

        <View style={styles.ctaSection}>
          <Button
            title="COMMENCER"
            onPress={onStartPress}
            size="lg"
            style={{ width: '100%' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    padding: SPACING.lg,
    justifyContent: 'space-between',
    minHeight: Dimensions.get('window').height,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  featuresSection: {
    marginBottom: SPACING.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  featureIcon: {
    fontSize: FONT_SIZES['2xl'],
    marginRight: SPACING.md,
    marginTop: SPACING.xs,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  ctaSection: {
    marginTop: SPACING.xl,
  },
});
