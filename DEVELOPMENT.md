# Guide de développement

Ce guide explique comment développer et contribuer au package `@mosikasign/react`.

## Structure du projet

```
packages/mosikasign-react/
├── src/
│   ├── index.ts              # Point d'entrée principal
│   ├── types.ts              # Définitions TypeScript
│   ├── MosikaSignForm.tsx    # Composant principal
│   └── hooks/
│       └── usePostMessage.ts # Hook pour postMessage
├── examples/                 # Exemples d'utilisation
├── dist/                     # Fichiers buildés (généré)
├── package.json
├── tsconfig.json
├── rollup.config.js
└── README.md
```

## Installation pour développement

```bash
cd packages/mosikasign-react
npm install
```

## Scripts disponibles

### Build

Compiler le package :

```bash
npm run build
```

Cela génère :
- `dist/index.js` - CommonJS
- `dist/index.esm.js` - ES Module
- `dist/index.d.ts` - Types TypeScript

### Watch mode

Recompiler automatiquement lors des changements :

```bash
npm run dev
```

## Tester localement

### Option 1 : npm link

```bash
# Dans le package
npm link

# Dans votre projet test
npm link @mosikasign/react
```

### Option 2 : Installer depuis le dossier

```bash
# Dans votre projet test
npm install ../path/to/packages/mosikasign-react
```

## Développement avec exemple

1. Créer un nouveau projet React :

```bash
npx create-react-app test-app
cd test-app
```

2. Lier le package :

```bash
npm link @mosikasign/react
```

3. Utiliser le composant :

```jsx
import { MosikaSignForm } from '@mosikasign/react';

function App() {
  return (
    <MosikaSignForm
      formUrl="https://your-url.com/s/slug"
      onCompleted={(data) => console.log(data)}
    />
  );
}
```

## Modifications du code

### Ajouter une nouvelle prop

1. Ajouter le type dans `src/types.ts` :

```typescript
export interface MosikaSignFormProps {
  // ... props existantes
  newProp?: string;
}
```

2. Utiliser dans le composant `src/MosikaSignForm.tsx` :

```typescript
export const MosikaSignForm: React.FC<MosikaSignFormProps> = ({
  // ... props existantes
  newProp,
}) => {
  // Utiliser newProp
};
```

3. Documenter dans `README.md`

### Ajouter un nouveau type de message

1. Ajouter dans `src/types.ts` :

```typescript
export interface NewMessageData {
  type: 'mosikasign:newmessage';
  // ... autres champs
}

export type MosikaSignMessage = 
  | CompletionData 
  | ErrorData 
  | ReadyData
  | NewMessageData;
```

2. Gérer dans le hook `src/hooks/usePostMessage.ts` :

```typescript
switch (type) {
  // ... cas existants
  case 'mosikasign:newmessage':
    onNewMessage?.(event.data);
    break;
}
```

## Conventions de code

### TypeScript

- Utiliser des interfaces pour les props
- Typer explicitement les paramètres et retours de fonctions
- Éviter `any`, préférer `unknown` si nécessaire

### Naming

- Composants : PascalCase (`MosikaSignForm`)
- Hooks : camelCase avec préfixe `use` (`usePostMessage`)
- Types : PascalCase (`CompletionData`)
- Props : camelCase (`formUrl`, `onCompleted`)

### Commentaires

- Documenter les props avec JSDoc
- Ajouter des commentaires pour la logique complexe
- Expliquer les décisions de design

## Tests (à venir)

Pour ajouter des tests :

1. Installer Jest et React Testing Library :

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

2. Créer `src/__tests__/MosikaSignForm.test.tsx`

3. Ajouter script dans `package.json` :

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## Versions et publication

Suivre le [Semantic Versioning](https://semver.org/) :

- **MAJOR** (1.0.0 → 2.0.0) : Breaking changes
- **MINOR** (1.0.0 → 1.1.0) : Nouvelles fonctionnalités (rétrocompatibles)
- **PATCH** (1.0.0 → 1.0.1) : Bug fixes

Voir [PUBLISHING.md](./PUBLISHING.md) pour les détails de publication.

## Troubleshooting

### Erreur "React is not defined"

Assurez-vous que React est installé dans votre projet test :

```bash
npm install react react-dom
```

### Types TypeScript ne fonctionnent pas

1. Vérifier que `dist/index.d.ts` existe après build
2. Vérifier le champ `types` dans `package.json`

### Hot reload ne fonctionne pas

Avec `npm link`, le hot reload peut ne pas fonctionner. Utilisez plutôt :

```bash
npm install ../path/to/package
```

## Ressources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Rollup Documentation](https://rollupjs.org/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

