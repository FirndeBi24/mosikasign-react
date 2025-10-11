import React, { useState } from 'react';
import { MosikaSignForm } from '@mosikasign/react';

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  const handleCompleted = (data) => {
    console.log('✅ Formulaire complété!', data);
    setIsCompleted(true);
    setCompletionData(data);
  };

  const handleError = (error) => {
    console.error('❌ Erreur:', error);
    alert('Une erreur est survenue: ' + error.error);
  };

  const handleReady = () => {
    console.log('📄 Formulaire chargé et prêt');
  };

  if (isCompleted && completionData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: 'green' }}>✓ Document signé avec succès!</h1>
        <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <h3>Détails de la soumission:</h3>
          <ul>
            <li><strong>Nom:</strong> {completionData.submitterName}</li>
            <li><strong>Email:</strong> {completionData.submitterEmail}</li>
            <li><strong>Template:</strong> {completionData.templateName}</li>
            <li><strong>Complété le:</strong> {new Date(completionData.completedAt).toLocaleString()}</li>
            <li><strong>ID Soumission:</strong> {completionData.submissionId}</li>
          </ul>
        </div>
        <button 
          onClick={() => {
            setIsCompleted(false);
            setCompletionData(null);
          }}
          style={{
            marginTop: '30px',
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Nouveau formulaire
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Exemple d'intégration MosikaSign</h1>
        <p>Remplissez et signez le formulaire ci-dessous:</p>
        
        <MosikaSignForm
          formUrl="https://firndebi.mosikasign.com/s/CSY97EsMSraHJ3"
          onCompleted={handleCompleted}
          onError={handleError}
          onReady={handleReady}
          width="100%"
          height="900px"
          allowedOrigins={['https://firndebi.mosikasign.com']}
        />
      </div>
    </div>
  );
}

export default App;

