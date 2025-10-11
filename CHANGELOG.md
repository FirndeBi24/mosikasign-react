# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2025-01-XX

### Ajouté
- Composant React `MosikaSignForm` pour intégrer les formulaires MosikaSign
- Support TypeScript avec types complets
- Hook personnalisé `usePostMessage` pour la communication iframe
- Détection automatique de la complétion du formulaire via postMessage
- Support de multiples callbacks: `onCompleted`, `onReady`, `onError`
- Restriction de sécurité via `allowedOrigins`
- Props pour personnaliser l'apparence (width, height, styles, className)
- Documentation complète avec exemples
- Exemples d'utilisation JavaScript et TypeScript
- Support pour React 16.8+, 17.x et 18.x

### Sécurité
- Validation des origines des messages postMessage
- Try-catch pour la gestion des erreurs de communication

