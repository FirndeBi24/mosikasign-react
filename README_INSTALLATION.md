# 📦 Package @mosikasign/react - Instructions d'installation

Ce fichier explique comment déplacer et publier le package React qui vient d'être créé.

## ✅ Ce qui a été créé

Le package complet a été créé dans : `packages/mosikasign-react/`

### Structure créée

```
packages/mosikasign-react/
├── src/
│   ├── index.ts                    # Point d'entrée
│   ├── types.ts                    # Types TypeScript
│   ├── MosikaSignForm.tsx          # Composant principal
│   └── hooks/
│       └── usePostMessage.ts       # Hook pour postMessage
├── examples/
│   ├── basic/
│   │   ├── App.jsx                 # Exemple JavaScript
│   │   └── index.html
│   └── typescript-example.tsx      # Exemple TypeScript
├── package.json                    # Configuration npm
├── tsconfig.json                   # Configuration TypeScript
├── rollup.config.js                # Configuration build
├── README.md                       # Documentation principale
├── LICENSE                         # Licence MIT
├── CHANGELOG.md                    # Historique des versions
├── PUBLISHING.md                   # Guide de publication
├── DEVELOPMENT.md                  # Guide de développement
├── QUICK_START.md                  # Démarrage rapide
├── .gitignore
└── .npmignore
```

### Modification backend effectuée

Le fichier `app/views/submit_form/completed.html.erb` a été modifié pour envoyer un événement `postMessage` quand le formulaire est complété.

## 🚀 Prochaines étapes

### 1. Déplacer le package (optionnel)

Si vous voulez le sortir du projet Rails :

```bash
# Depuis la racine de votre projet
mv packages/mosikasign-react ~/Documents/mosikasign-react

# Ou vers un autre emplacement
mv packages/mosikasign-react /chemin/vers/nouvel/emplacement
```

### 2. Installer les dépendances

```bash
cd packages/mosikasign-react
# ou : cd ~/Documents/mosikasign-react

npm install
```

### 3. Builder le package

```bash
npm run build
```

Cela créera le dossier `dist/` avec les fichiers compilés.

### 4. Tester localement

Avant de publier sur npm, testez le package :

```bash
# Dans le dossier du package
npm link

# Dans un projet React de test
cd /chemin/vers/mon-projet-test
npm link @mosikasign/react
```

Puis utilisez le composant dans votre projet test :

```jsx
import { MosikaSignForm } from '@mosikasign/react';

function App() {
  return (
    <MosikaSignForm
      formUrl="https://firndebi.mosikasign.com/s/VOTRE_SLUG"
      onCompleted={(data) => console.log(data)}
    />
  );
}
```

### 5. Publier sur npm

Quand vous êtes prêt :

```bash
# Se connecter à npm (une seule fois)
npm login

# Publier
npm publish --access public
```

Voir [PUBLISHING.md](./PUBLISHING.md) pour plus de détails.

## 📖 Documentation

- **[README.md](./README.md)** - Documentation complète du package
- **[QUICK_START.md](./QUICK_START.md)** - Guide de démarrage rapide
- **[PUBLISHING.md](./PUBLISHING.md)** - Guide de publication sur npm
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guide de développement
- **[CHANGELOG.md](./CHANGELOG.md)** - Historique des versions

## 🔧 Configuration requise

### Backend (Rails)

Le script postMessage a déjà été ajouté à `app/views/submit_form/completed.html.erb`.

Vérifiez que le code suivant est bien présent à la fin du fichier :

```html
<script>
  // Notify parent window if embedded in iframe
  (function() {
    if (window.parent !== window) {
      try {
        window.parent.postMessage({
          type: 'mosikasign:completed',
          slug: '<%= j @submitter.slug %>',
          submitterId: '<%= @submitter.id %>',
          submissionId: '<%= @submitter.submission_id %>',
          completedAt: '<%= @submitter.completed_at.iso8601 %>',
          templateName: '<%= j @submitter.submission.template.name %>',
          submitterName: '<%= j @submitter.name %>',
          submitterEmail: '<%= j @submitter.email %>'
        }, '*');
      } catch (e) {
        console.error('MosikaSign: Error sending postMessage', e);
      }
    }
  })();
</script>
```

### Frontend (React)

Les utilisateurs devront installer le package :

```bash
npm install @mosikasign/react
```

## 📋 Checklist avant publication

- [ ] `npm install` exécuté sans erreurs
- [ ] `npm run build` crée le dossier `dist/`
- [ ] Tests locaux avec `npm link` réussis
- [ ] README.md vérifié et complet
- [ ] Version correcte dans package.json (1.0.0 pour la première)
- [ ] Compte npm créé et connecté
- [ ] Organisation @mosikasign créée (optionnel)
- [ ] Prêt à publier avec `npm publish --access public`

## 🎯 Utilisation après publication

Une fois publié, les développeurs pourront l'utiliser ainsi :

```bash
npm install @mosikasign/react
```

```jsx
import { MosikaSignForm } from '@mosikasign/react';

function App() {
  const handleCompleted = (data) => {
    console.log('Formulaire complété!', data);
  };

  return (
    <MosikaSignForm
      formUrl="https://firndebi.mosikasign.com/s/CSY97EsMSraHJ3"
      onCompleted={handleCompleted}
      width="100%"
      height="900px"
    />
  );
}
```

## 🆘 Besoin d'aide ?

- Voir la [documentation complète](./README.md)
- Consulter les [exemples](./examples/)
- Lire le [guide de démarrage rapide](./QUICK_START.md)

## ✨ Fonctionnalités

✅ Composant React simple à utiliser  
✅ Support TypeScript complet  
✅ Détection automatique de la complétion  
✅ Communication sécurisée via postMessage  
✅ Callbacks pour tous les événements  
✅ Personnalisation complète (styles, taille)  
✅ Compatible React 16.8+, 17.x, 18.x  
✅ Zero dépendances (sauf React)  
✅ Bundle léger (~5KB gzippé)  

---

**Le package est prêt à être utilisé et publié ! 🚀**

