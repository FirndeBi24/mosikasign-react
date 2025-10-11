# 🚀 Démarrage rapide

Guide ultra-rapide pour intégrer MosikaSign dans votre application React.

## Installation (30 secondes)

```bash
npm install @mosikasign/react
# ou
yarn add @mosikasign/react
```

## Utilisation minimale (2 minutes)

```jsx
import { MosikaSignForm } from '@mosikasign/react';

function App() {
  return (
    <MosikaSignForm
      formUrl="https://firndebi.mosikasign.com/s/VOTRE_SLUG"
      onCompleted={(data) => alert('Formulaire complété!')}
    />
  );
}
```

**C'est tout !** 🎉 Le formulaire est intégré et fonctionnel.

## Utilisation complète (5 minutes)

```jsx
import React, { useState } from 'react';
import { MosikaSignForm } from '@mosikasign/react';

function SignatureFlow() {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleted = (data) => {
    console.log('✅ Signé par:', data.submitterName);
    setIsCompleted(true);
    
    // Optionnel : Envoyer à votre backend
    fetch('/api/save-signature', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  };

  if (isCompleted) {
    return <h1>✓ Merci pour votre signature !</h1>;
  }

  return (
    <div>
      <h1>Signez votre document</h1>
      <MosikaSignForm
        formUrl="https://firndebi.mosikasign.com/s/VOTRE_SLUG"
        onCompleted={handleCompleted}
        width="100%"
        height="900px"
      />
    </div>
  );
}
```

## Configuration MosikaSign (backend)

Pour que le composant fonctionne, ajoutez ce code dans votre fichier Rails `app/views/submit_form/completed.html.erb` :

```html
<script>
  if (window.parent !== window) {
    window.parent.postMessage({
      type: 'mosikasign:completed',
      slug: '<%= @submitter.slug %>',
      submitterId: '<%= @submitter.id %>',
      submissionId: '<%= @submitter.submission_id %>',
      completedAt: '<%= @submitter.completed_at.iso8601 %>',
      templateName: '<%= j @submitter.submission.template.name %>',
      submitterName: '<%= j @submitter.name %>',
      submitterEmail: '<%= j @submitter.email %>'
    }, '*');
  }
</script>
```

## Obtenir votre URL de formulaire

L'URL du formulaire est au format :

```
https://VOTRE_DOMAINE.mosikasign.com/s/SLUG_DU_FORMULAIRE
```

Exemple : `https://firndebi.mosikasign.com/s/CSY97EsMSraHJ3`

Cette URL est générée quand vous créez une soumission dans MosikaSign.

## Props principales

| Prop | Description | Exemple |
|------|-------------|---------|
| `formUrl` | URL du formulaire | `"https://app.com/s/abc123"` |
| `onCompleted` | Callback à la complétion | `(data) => console.log(data)` |
| `width` | Largeur | `"100%"` ou `1000` |
| `height` | Hauteur | `"800px"` ou `900` |

## Événements disponibles

```jsx
<MosikaSignForm
  formUrl="..."
  onCompleted={(data) => {
    // Formulaire complété
    console.log('Complété:', data);
  }}
  onReady={() => {
    // Iframe chargée
    console.log('Prêt');
  }}
  onError={(error) => {
    // Erreur survenue
    console.error('Erreur:', error);
  }}
/>
```

## Données reçues à la complétion

```javascript
{
  type: 'mosikasign:completed',
  slug: 'CSY97EsMSraHJ3',
  submitterId: '123',
  submissionId: '456',
  completedAt: '2025-01-15T10:30:00Z',
  templateName: 'Contrat de travail',
  submitterName: 'Jean Dupont',
  submitterEmail: 'jean@example.com'
}
```

## Frameworks supportés

### Next.js

```jsx
'use client'; // Pour Next.js 13+

import { MosikaSignForm } from '@mosikasign/react';

export default function SignaturePage() {
  return <MosikaSignForm formUrl="..." onCompleted={...} />;
}
```

### Create React App

Fonctionne directement sans configuration.

### Vite

Fonctionne directement sans configuration.

### Remix

```jsx
import { MosikaSignForm } from '@mosikasign/react';

export default function Route() {
  return <MosikaSignForm formUrl="..." onCompleted={...} />;
}
```

## Sécurité

Pour restreindre les origines autorisées :

```jsx
<MosikaSignForm
  formUrl="..."
  allowedOrigins={['https://firndebi.mosikasign.com']}
  onCompleted={...}
/>
```

## Styling

```jsx
<MosikaSignForm
  formUrl="..."
  className="mon-formulaire"
  containerStyle={{ padding: '20px' }}
  iframeStyle={{ borderRadius: '8px' }}
/>
```

## Besoin d'aide ?

- 📖 [Documentation complète](./README.md)
- 🐛 [Reporter un bug](https://github.com/votre-org/mosikasign-react/issues)
- 💬 Support : support@mosikasign.com

## Checklist de démarrage

- [ ] Package installé : `npm install @mosikasign/react`
- [ ] Script postMessage ajouté dans `completed.html.erb`
- [ ] Composant intégré dans votre app
- [ ] Callback `onCompleted` configuré
- [ ] URL de formulaire obtenue
- [ ] Test effectué

**Prêt à signer ! ✍️**

