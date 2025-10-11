import React, { useState, useCallback } from 'react';
import { MosikaSignForm, CompletionData, ErrorData } from '@mosikasign/react';

interface SignatureState {
  status: 'idle' | 'loading' | 'completed' | 'error';
  data?: CompletionData;
  error?: string;
}

const TypeScriptExample: React.FC = () => {
  const [state, setState] = useState<SignatureState>({ status: 'idle' });

  const handleCompleted = useCallback((data: CompletionData) => {
    console.log('Document complété:', data);
    
    setState({
      status: 'completed',
      data,
    });

    // Envoyer à votre backend
    fetch('/api/signature-completed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submitterId: data.submitterId,
        submissionId: data.submissionId,
        completedAt: data.completedAt,
      }),
    }).catch(console.error);
  }, []);

  const handleError = useCallback((error: ErrorData) => {
    console.error('Erreur:', error);
    setState({
      status: 'error',
      error: error.message || error.error,
    });
  }, []);

  const handleReady = useCallback(() => {
    setState({ status: 'loading' });
  }, []);

  const resetForm = useCallback(() => {
    setState({ status: 'idle' });
  }, []);

  // Rendu de la page de succès
  if (state.status === 'completed' && state.data) {
    return (
      <div className="success-container">
        <div className="success-content">
          <h1>✓ Document signé avec succès!</h1>
          
          <div className="details">
            <h2>Détails de la signature</h2>
            <dl>
              <dt>Signataire:</dt>
              <dd>{state.data.submitterName || 'N/A'}</dd>
              
              <dt>Email:</dt>
              <dd>{state.data.submitterEmail || 'N/A'}</dd>
              
              <dt>Document:</dt>
              <dd>{state.data.templateName || 'N/A'}</dd>
              
              <dt>Date de complétion:</dt>
              <dd>{new Date(state.data.completedAt).toLocaleString('fr-FR')}</dd>
              
              <dt>ID de soumission:</dt>
              <dd>{state.data.submissionId}</dd>
            </dl>
          </div>

          <button onClick={resetForm} className="btn-primary">
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Rendu de la page d'erreur
  if (state.status === 'error') {
    return (
      <div className="error-container">
        <h1>❌ Une erreur est survenue</h1>
        <p>{state.error}</p>
        <button onClick={resetForm} className="btn-primary">
          Réessayer
        </button>
      </div>
    );
  }

  // Rendu du formulaire
  return (
    <div className="form-container">
      <header>
        <h1>Signature de document</h1>
        <p>Veuillez remplir et signer le formulaire ci-dessous</p>
      </header>

      <main>
        <MosikaSignForm
          formUrl="https://firndebi.mosikasign.com/s/YOUR_SLUG_HERE"
          onCompleted={handleCompleted}
          onError={handleError}
          onReady={handleReady}
          width="100%"
          height="900px"
          allowedOrigins={[
            'https://firndebi.mosikasign.com',
            'https://app.mosikasign.com',
          ]}
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
      </main>

      {state.status === 'loading' && (
        <div className="loading-indicator">
          Chargement du formulaire...
        </div>
      )}
    </div>
  );
};

export default TypeScriptExample;

