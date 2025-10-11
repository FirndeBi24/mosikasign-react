import { useEffect, useCallback } from 'react';
import type { MosikaSignMessage, MosikaSignFormProps } from '../types';

interface UsePostMessageOptions {
  onCompleted?: MosikaSignFormProps['onCompleted'];
  onReady?: MosikaSignFormProps['onReady'];
  onError?: MosikaSignFormProps['onError'];
  allowedOrigins?: string[];
}

export function usePostMessage({
  onCompleted,
  onReady,
  onError,
  allowedOrigins,
}: UsePostMessageOptions) {
  
  const handleMessage = useCallback((event: MessageEvent<MosikaSignMessage>) => {
    // Vérification de sécurité : origines autorisées
    if (allowedOrigins && allowedOrigins.length > 0) {
      if (!allowedOrigins.includes(event.origin)) {
        console.warn(`MosikaSign: Message reçu d'une origine non autorisée: ${event.origin}`);
        return;
      }
    }

    const { type, ...data } = event.data || {};

    // Vérifier que c'est bien un message MosikaSign
    if (!type || typeof type !== 'string' || !type.startsWith('mosikasign:')) {
      return;
    }

    switch (type) {
      case 'mosikasign:completed':
        onCompleted?.(event.data as any);
        break;

      case 'mosikasign:ready':
        onReady?.();
        break;

      case 'mosikasign:error':
        onError?.(event.data as any);
        break;

      default:
        console.log('MosikaSign: Message non géré:', type);
    }
  }, [onCompleted, onReady, onError, allowedOrigins]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);
}

