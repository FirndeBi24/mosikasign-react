# 📑 Index des fichiers - @mosikasign/react

Guide rapide pour comprendre l'organisation du package.

## 📂 Structure du projet

```
packages/mosikasign-react/
├── 📁 src/                          # Code source
├── 📁 examples/                     # Exemples d'utilisation
├── 📁 dist/                         # Fichiers buildés (généré)
├── 📄 Configuration files
└── 📄 Documentation files
```

---

## 📁 Dossier `src/` - Code source

| Fichier | Description | À modifier ? |
|---------|-------------|--------------|
| **index.ts** | Point d'entrée, exporte tout | Rarement |
| **types.ts** | Définitions TypeScript | Oui, pour ajouter des types |
| **MosikaSignForm.tsx** | Composant principal | Oui, pour modifier le composant |
| **hooks/usePostMessage.ts** | Hook pour écouter postMessage | Oui, pour ajouter des événements |

### Détails

**index.ts**
- Exporte le composant et les types
- C'est ce que les utilisateurs importent

**types.ts**
- Définit toutes les interfaces TypeScript
- `MosikaSignFormProps` : Props du composant
- `CompletionData` : Données reçues à la complétion
- `ErrorData` : Données d'erreur
- `ReadyData` : Données quand prêt

**MosikaSignForm.tsx**
- Composant React principal
- Affiche l'iframe
- Gère les props (width, height, styles)

**hooks/usePostMessage.ts**
- Écoute les messages postMessage de l'iframe
- Valide les origines
- Appelle les callbacks appropriés

---

## 📁 Dossier `examples/` - Exemples

| Fichier | Description |
|---------|-------------|
| **basic/App.jsx** | Exemple JavaScript simple |
| **basic/index.html** | HTML pour tester l'exemple |
| **typescript-example.tsx** | Exemple TypeScript avancé |

Ces fichiers servent de référence aux utilisateurs du package.

---

## 📁 Dossier `dist/` - Build (généré)

Créé automatiquement par `npm run build`.

| Fichier | Description |
|---------|-------------|
| **index.js** | Bundle CommonJS |
| **index.esm.js** | Bundle ES Module |
| **index.d.ts** | Types TypeScript |
| **types/** | Types intermédiaires (généré) |

⚠️ **Ne pas modifier ces fichiers manuellement !** Ils sont regénérés à chaque build.

---

## ⚙️ Fichiers de configuration

| Fichier | Description | À modifier ? |
|---------|-------------|--------------|
| **package.json** | Configuration npm, scripts, dépendances | Oui |
| **tsconfig.json** | Configuration TypeScript | Rarement |
| **rollup.config.js** | Configuration du build | Rarement |
| **.gitignore** | Fichiers ignorés par Git | Rarement |
| **.npmignore** | Fichiers ignorés par npm | Rarement |

### Détails

**package.json**
- `name` : Nom du package
- `version` : Version (à incrémenter à chaque publication)
- `main` : Point d'entrée CommonJS
- `module` : Point d'entrée ES Module
- `types` : Point d'entrée TypeScript
- `scripts` : Commandes npm (build, dev)

**tsconfig.json**
- Cible ES2015
- JSX en mode React
- Génère les déclarations de types

**rollup.config.js**
- Build les fichiers .js et .d.ts
- Gère les dépendances peer
- Crée 2 formats : CJS et ESM

---

## 📖 Documentation

| Fichier | Description | Pour qui ? |
|---------|-------------|------------|
| **README.md** | Documentation complète | Utilisateurs |
| **QUICK_START.md** | Guide de démarrage rapide | Utilisateurs |
| **README_INSTALLATION.md** | Guide d'installation du package | Vous |
| **PUBLISHING.md** | Comment publier sur npm | Vous |
| **DEVELOPMENT.md** | Guide de développement | Contributeurs |
| **CHANGELOG.md** | Historique des versions | Tous |
| **FILES_INDEX.md** | Ce fichier (index des fichiers) | Vous |

### Détails

**README.md** ⭐ Principal
- Documentation complète
- Exemples d'utilisation
- Liste des props
- Types TypeScript

**QUICK_START.md** ⚡ Rapide
- Installation en 30 secondes
- Premier exemple en 2 minutes
- Utilisation complète en 5 minutes

**README_INSTALLATION.md** 🔧 Pour vous
- Résumé de ce qui a été créé
- Prochaines étapes
- Checklist de publication

**PUBLISHING.md** 📦 Publication
- Comment publier sur npm
- Gestion des versions
- Automatisation

**DEVELOPMENT.md** 💻 Développement
- Structure du code
- Comment contribuer
- Conventions

**CHANGELOG.md** 📝 Historique
- Liste des modifications
- Format standardisé
- À mettre à jour à chaque version

**FILES_INDEX.md** 📑 Navigation
- Ce fichier
- Vue d'ensemble du projet

---

## 🧪 Scripts de test

| Fichier | Description | Plateforme |
|---------|-------------|------------|
| **test-installation.sh** | Script de test | Linux/Mac |
| **test-installation.ps1** | Script de test | Windows |

Ces scripts vérifient que le package est prêt à être publié :
- ✅ Dépendances installées
- ✅ Build réussi
- ✅ Fichiers essentiels présents
- ✅ Taille des bundles

Usage :
```bash
# Linux/Mac
./test-installation.sh

# Windows
.\test-installation.ps1
```

---

## 📄 Autres fichiers

| Fichier | Description |
|---------|-------------|
| **LICENSE** | Licence MIT |
| **node_modules/** | Dépendances (généré) |

---

## 🎯 Fichiers essentiels à ne jamais supprimer

- ✅ `src/index.ts`
- ✅ `src/types.ts`
- ✅ `src/MosikaSignForm.tsx`
- ✅ `src/hooks/usePostMessage.ts`
- ✅ `package.json`
- ✅ `tsconfig.json`
- ✅ `rollup.config.js`
- ✅ `README.md`
- ✅ `LICENSE`

---

## 🔄 Workflow de développement

1. **Modifier le code** dans `src/`
2. **Tester** avec `npm run dev` (watch mode)
3. **Builder** avec `npm run build`
4. **Tester localement** avec `npm link`
5. **Documenter** dans README.md et CHANGELOG.md
6. **Publier** avec `npm publish --access public`

---

## 📊 Ordre de lecture recommandé

### Pour vous (mainteneur) :
1. 📖 **README_INSTALLATION.md** ← Commencer ici
2. 📂 **FILES_INDEX.md** (ce fichier)
3. 📝 **DEVELOPMENT.md**
4. 📦 **PUBLISHING.md**
5. 📖 **README.md**

### Pour les utilisateurs :
1. ⚡ **QUICK_START.md** ← Commencer ici
2. 📖 **README.md**
3. 👀 **examples/**

---

## 🆘 En cas de problème

**Build ne fonctionne pas ?**
- Vérifier que les dépendances sont installées : `npm install`
- Vérifier la version de Node.js : `node --version` (>= 14)

**Types TypeScript ne marchent pas ?**
- Vérifier que `dist/index.d.ts` existe
- Re-builder : `npm run build`

**npm publish échoue ?**
- Vérifier que vous êtes connecté : `npm whoami`
- Vérifier que le nom n'est pas pris : npmjs.com/package/@mosikasign/react

---

**Ce fichier sert de carte pour naviguer dans le projet ! 🗺️**

