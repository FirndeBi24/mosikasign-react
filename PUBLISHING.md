# Guide de publication sur npm

Ce guide explique comment publier le package `@mosikasign/react` sur npm.

## Prérequis

1. **Compte npm** : Créer un compte sur [npmjs.com](https://www.npmjs.com/signup)
2. **Organisation npm** : Créer une organisation `@mosikasign` (optionnel mais recommandé)
3. **npm CLI** : Assurez-vous d'avoir npm installé

## Étapes de publication

### 1. Préparer le package

```bash
cd packages/mosikasign-react

# Installer les dépendances
npm install

# Builder le package
npm run build
```

Cela créera le dossier `dist/` avec les fichiers compilés.

### 2. Se connecter à npm

```bash
npm login
```

Entrez vos identifiants npm.

### 3. Vérifier le package

Avant de publier, vérifiez ce qui sera inclus :

```bash
npm pack --dry-run
```

Cela affichera la liste des fichiers qui seront publiés.

### 4. Publier (première fois)

Pour publier en public (gratuit) :

```bash
npm publish --access public
```

Pour publier en privé (nécessite un compte payant) :

```bash
npm publish
```

### 5. Mettre à jour les versions suivantes

1. Modifier le numéro de version dans `package.json` :
   - **Patch** (bug fixes) : 1.0.0 → 1.0.1
   - **Minor** (nouvelles fonctionnalités) : 1.0.0 → 1.1.0
   - **Major** (breaking changes) : 1.0.0 → 2.0.0

2. Mettre à jour `CHANGELOG.md`

3. Commiter et tagger :
   ```bash
   git add .
   git commit -m "chore: release v1.1.0"
   git tag v1.1.0
   git push origin main --tags
   ```

4. Builder et publier :
   ```bash
   npm run build
   npm publish --access public
   ```

## Automatisation avec npm scripts

Vous pouvez ajouter ces scripts dans `package.json` :

```json
{
  "scripts": {
    "version:patch": "npm version patch",
    "version:minor": "npm version minor",
    "version:major": "npm version major",
    "prepublishOnly": "npm run build"
  }
}
```

Ensuite :

```bash
npm run version:patch  # Incrémente automatiquement
npm publish --access public
```

## Configuration de l'organisation @mosikasign

Si vous voulez utiliser le scope `@mosikasign` :

1. Créer l'organisation sur npmjs.com
2. Inviter les membres de l'équipe
3. Le package sera automatiquement lié à l'organisation

## Tester avant publication

Vous pouvez tester localement avec `npm link` :

```bash
# Dans le dossier du package
cd packages/mosikasign-react
npm link

# Dans votre projet test
cd /chemin/vers/mon-app-test
npm link @mosikasign/react
```

## Dépublication (en cas d'erreur)

⚠️ **Attention** : La dépublication doit être faite dans les 72h après publication.

```bash
npm unpublish @mosikasign/react@1.0.0
```

## Badge npm dans README

Après publication, ajoutez ce badge dans votre README :

```markdown
[![npm version](https://badge.fury.io/js/%40mosikasign%2Freact.svg)](https://www.npmjs.com/package/@mosikasign/react)
[![npm downloads](https://img.shields.io/npm/dm/@mosikasign/react.svg)](https://www.npmjs.com/package/@mosikasign/react)
```

## Checklist de publication

- [ ] Version mise à jour dans package.json
- [ ] CHANGELOG.md mis à jour
- [ ] Code buildé (`npm run build`)
- [ ] Tests passent (si vous en avez)
- [ ] README.md à jour
- [ ] LICENSE présent
- [ ] .npmignore correctement configuré
- [ ] Git commit et tag créés
- [ ] Publié sur npm
- [ ] Testé l'installation : `npm install @mosikasign/react`

