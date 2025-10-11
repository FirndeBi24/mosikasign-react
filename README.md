# @mosikasign/react

Composant React officiel pour intégrer les formulaires MosikaSign dans vos applications.

## 🚀 Installation

```bash
npm install @mosikasign/react
# ou
yarn add @mosikasign/react
```

## 📖 Utilisation

### Exemple de base

```tsx
import React from 'react';
import { MosikaSignForm } from '@mosikasign/react';

function App() {
  const handleCompleted = (data) => {
    console.log('✅ Formulaire complété!', data);
    alert(`Merci ${data.submitterName}!`);
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

export default App;
```

### Avec TypeScript

```tsx
import React from 'react';
import { MosikaSignForm, CompletionData } from '@mosikasign/react';

function App() {
  const handleCompleted = (data: CompletionData) => {
    console.log('Document complété:', data);
    
    // Accès aux données typées
    console.log('Slug:', data.slug);
    console.log('Soumission ID:', data.submissionId);
    console.log('Complété le:', data.completedAt);
    console.log('Nom du signataire:', data.submitterName);
  };

  const handleError = (error) => {
    console.error('Erreur:', error);
  };

  const handleReady = () => {
    console.log('📄 Formulaire chargé');
  };

  return (
    <div>
      <h1>Signez votre document</h1>
      <MosikaSignForm
        formUrl="https://firndebi.mosikasign.com/s/YOUR_SLUG"
        onCompleted={handleCompleted}
        onError={handleError}
        onReady={handleReady}
        allowedOrigins={['https://firndebi.mosikasign.com']}
      />
    </div>
  );
}
```

## 🎨 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `formUrl` | `string` | **Requis** | URL complète du formulaire MosikaSign |
| `onCompleted` | `(data: CompletionData) => void` | - | Callback appelé quand le formulaire est complété |
| `onReady` | `() => void` | - | Callback appelé quand l'iframe est chargée |
| `onError` | `(error: ErrorData) => void` | - | Callback appelé en cas d'erreur |
| `width` | `string \| number` | `"100%"` | Largeur de l'iframe |
| `height` | `string \| number` | `"800px"` | Hauteur de l'iframe |
| `className` | `string` | `""` | Classes CSS personnalisées |
| `iframeStyle` | `CSSProperties` | `{}` | Styles inline pour l'iframe |
| `containerStyle` | `CSSProperties` | `{}` | Styles inline pour le conteneur |
| `allowFullscreen` | `boolean` | `false` | Autoriser le mode plein écran |
| `title` | `string` | `"MosikaSign Form"` | Titre accessible pour l'iframe |
| `allowedOrigins` | `string[]` | - | Origines autorisées (sécurité) |

## 📦 Types TypeScript

### CompletionData

```typescript
interface CompletionData {
  type: 'mosikasign:completed';
  slug: string;
  submitterId: string;
  submissionId: string;
  completedAt: string; // ISO 8601 format
  templateName?: string;
  submitterName?: string;
  submitterEmail?: string;
}
```

### ErrorData

```typescript
interface ErrorData {
  type: 'mosikasign:error';
  slug?: string;
  error: string;
  message?: string;
}
```

## 🔒 Sécurité

Pour restreindre les origines autorisées à envoyer des messages postMessage :

```tsx
<MosikaSignForm
  formUrl="https://firndebi.mosikasign.com/s/YOUR_SLUG"
  allowedOrigins={[
    'https://firndebi.mosikasign.com',
    'https://app.mosikasign.com'
  ]}
  onCompleted={handleCompleted}
/>
```

## 🎯 Exemples avancés

### Redirection après complétion

```tsx
function SignatureFlow() {
  const handleCompleted = (data) => {
    // Sauvegarder dans votre backend
    fetch('/api/signature-completed', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(() => {
      // Rediriger vers une page de confirmation
      window.location.href = '/thank-you';
    });
  };

  return (
    <MosikaSignForm
      formUrl="https://firndebi.mosikasign.com/s/YOUR_SLUG"
      onCompleted={handleCompleted}
    />
  );
}
```

### Avec styles personnalisés

```tsx
<MosikaSignForm
  formUrl="https://firndebi.mosikasign.com/s/YOUR_SLUG"
  onCompleted={handleCompleted}
  containerStyle={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  }}
  iframeStyle={{
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }}
/>
```

### Gestion d'état dans votre app

```tsx
import { useState } from 'react';
import { MosikaSignForm, CompletionData } from '@mosikasign/react';

function SignatureWidget() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionData, setCompletionData] = useState<CompletionData | null>(null);

  const handleCompleted = (data: CompletionData) => {
    setIsCompleted(true);
    setCompletionData(data);
  };

  if (isCompleted && completionData) {
    return (
      <div>
        <h2>✅ Document signé avec succès!</h2>
        <p>Merci {completionData.submitterName}</p>
        <p>Complété le: {new Date(completionData.completedAt).toLocaleDateString()}</p>
      </div>
    );
  }

  return (
    <MosikaSignForm
      formUrl="https://firndebi.mosikasign.com/s/YOUR_SLUG"
      onCompleted={handleCompleted}
    />
  );
}
```

## 🛠️ Configuration Backend

Pour que le composant fonctionne, vous devez ajouter ce script à votre page de complétion MosikaSign (`completed.html.erb`) :

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

## 📝 License

MIT

## 🤝 Support

Pour toute question ou problème, contactez support@mosikasign.com

