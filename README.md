# 💳 PayTracker - Gestion de dettes entre amis

## 📱 À propos

PayTracker est une application mobile moderne conçue pour résoudre le problème des dettes oubliées entre amis. L'application permet de :

- **Suivre les argents avancés** : Enregistrez rapidement qui vous doit de l'argent et à qui vous en devez
- **Recevoir des rappels** : Obtenez des notifications pour ne pas oublier de payer vos dettes
- **Synchroniser en temps réel** : Les données se mettent à jour automatiquement entre tous les utilisateurs

## 🎯 Public cible

- Étudiants
- Groupes d'amis
- Colocataires
- Collègues

## 🚀 Fonctionnalités principales

### 1. Tableau de bord (Dashboard)
- Vue d'ensemble du solde (argent dû / argent à recevoir)
- Liste des transactions récentes
- Accès rapide à toutes les fonctionnalités

### 2. Gestion des dettes
- Ajouter une nouvelle dette
- Sélectionner le montant et le bénéficiaire
- Ajouter une description
- Marquer comme payé
- Supprimer une transaction

### 3. Gestion des amis
- Liste de tous les amis
- Solde avec chaque ami
- Recherche rapide
- Ajouter de nouveaux amis

### 4. Profil & Paramètres
- Informations personnelles
- Préférences de notifications
- Mode sombre/clair
- Déconnexion

## 🎨 Design

### Palette de couleurs
- **Primaire** : Indigo (#6366F1)
- **Secondaire** : Rose (#EC4899)
- **Succès** : Vert (#10B981)
- **Danger** : Rouge (#EF4444)
- **Fond** : Gris très clair (#F9FAFB)

### Style
- Interface épurée et moderne
- Design adapté aux mobiles
- Interactions fluides
- Typographie claire

## 🛠️ Stack technique

- **Framework** : React Native + Expo
- **Langage** : TypeScript
- **Gestion d'état** : Context API
- **Navigation** : React Navigation

## 📁 Structure du projet

```
pay-tracker_2/
├── src/
│   ├── screens/          # Écrans principaux
│   │   ├── HomeScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── AddDebtScreen.tsx
│   │   ├── TransactionDetailScreen.tsx
│   │   ├── FriendsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/       # Composants réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── TransactionCard.tsx
│   │   ├── FriendCard.tsx
│   │   └── Navigation.tsx
│   ├── context/          # Gestion d'état
│   │   └── DebtContext.tsx
│   ├── types/            # Définitions TypeScript
│   │   └── index.ts
│   ├── styles/           # Thème et couleurs
│   │   └── theme.ts
│   └── App.tsx          # Composant principal
├── app.json             # Configuration Expo
├── package.json         # Dépendances
├── tsconfig.json        # Configuration TypeScript
└── README.md            # Documentation
```

## 🚀 Démarrage rapide

### Installation

```bash
npm install
# ou
yarn install
```

### Lancer l'application

```bash
npm start
# ou
yarn start
```

Scanchez le QR code avec Expo Go sur votre téléphone pour voir l'app en direct.

### Développement

- iOS : `npm run ios`
- Android : `npm run android`
- Web : `npm run web`

## 📱 Écrans implémentés

1. **HomeScreen** - Écran d'accueil avec onboarding
2. **DashboardScreen** - Vue principale avec solde et transactions
3. **AddDebtScreen** - Formulaire d'ajout de dette
4. **TransactionDetailScreen** - Détails d'une transaction
5. **FriendsScreen** - Gestion des amis
6. **ProfileScreen** - Profil et paramètres

## 🔒 Données de démonstration

L'application inclut des données pré-remplies pour tester rapidement :

- 3 amis : Sarah, Marc, Luc
- 3 transactions avec différents montants et statuts
- Profil utilisateur exemple

## 📝 Notes de développement

- Navigation complètement fonctionnelle
- Context API pour la gestion d'état
- Tous les écrans sont responsifs
- Typage complet avec TypeScript
- Design cohérent et moderne

## 🔄 Prochaines étapes

- [ ] Intégration Firebase pour synchronisation temps réel
- [ ] Système d'authentification
- [ ] Notifications push
- [ ] Export des données
- [ ] Partage de dettes en groupe
- [ ] Système de paiement intégré

## 📄 Licence

MIT

## 👨‍💻 Développé avec Copilot

Votre partenaire de développement IA
