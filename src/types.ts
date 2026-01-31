import { CSSProperties } from 'react';

export interface MosikaSignFormProps {
  /**
   * URL complète du formulaire MosikaSign
   * @example "https://firndebi.mosikasign.com/s/CSY97EsMSraHJ3"
   */
  formUrl: string;

  /**
   * Callback appelé quand le formulaire est complété
   */
  onCompleted?: (data: CompletionData) => void;

  /**
   * Callback appelé quand le formulaire est refusé/décliné
   */
  onDeclined?: (data: DeclineData) => void;

  /**
   * Callback appelé quand l'iframe est chargée et prête
   */
  onReady?: () => void;

  /**
   * Callback appelé en cas d'erreur
   */
  onError?: (error: ErrorData) => void;

  /**
   * Largeur de l'iframe
   * @default "100%"
   */
  width?: string | number;

  /**
   * Hauteur de l'iframe
   * @default "800px"
   */
  height?: string | number;

  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Styles inline personnalisés pour l'iframe
   */
  iframeStyle?: CSSProperties;

  /**
   * Styles inline pour le conteneur
   */
  containerStyle?: CSSProperties;

  /**
   * Autoriser le mode plein écran
   * @default false
   */
  allowFullscreen?: boolean;

  /**
   * Titre accessible pour l'iframe
   * @default "MosikaSign Form"
   */
  title?: string;

  /**
   * Origines autorisées pour postMessage (sécurité)
   * Si non spécifié, accepte toutes les origines
   * @example ["https://firndebi.mosikasign.com"]
   */
  allowedOrigins?: string[];
}

export interface CompletionData {
  type: 'mosikasign:completed';
  slug: string;
  submitterId: string;
  submissionId: string;
  completedAt: string;
  templateName?: string;
  submitterName?: string;
  submitterEmail?: string;
}

export interface DeclineData {
  type: 'mosikasign:declined';
  slug: string;
  submitterId: string;
  submissionId: string;
  declinedAt: string;
  declineReason: string;
  submitterName?: string;
  submitterEmail?: string;
}

export interface ErrorData {
  type: 'mosikasign:error';
  slug?: string;
  error: string;
  message?: string;
}

export interface ReadyData {
  type: 'mosikasign:ready';
  slug: string;
}

export type MosikaSignMessage = CompletionData | DeclineData | ErrorData | ReadyData;

