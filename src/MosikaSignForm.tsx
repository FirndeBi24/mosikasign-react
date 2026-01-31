import React, { useRef } from 'react';
import { usePostMessage } from './hooks/usePostMessage';
import type { MosikaSignFormProps } from './types';

export const MosikaSignForm: React.FC<MosikaSignFormProps> = ({
  formUrl,
  onCompleted,
  onDeclined,
  onReady,
  onError,
  width = '100%',
  height = '800px',
  className = '',
  iframeStyle = {},
  containerStyle = {},
  allowFullscreen = false,
  title = 'MosikaSign Form',
  allowedOrigins,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Hook pour écouter les messages postMessage
  usePostMessage({
    onCompleted,
    onDeclined,
    onReady,
    onError,
    allowedOrigins,
  });

  // Normaliser la largeur/hauteur
  const normalizedWidth = typeof width === 'number' ? `${width}px` : width;
  const normalizedHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`mosikasign-form-container ${className}`}
      style={{
        width: normalizedWidth,
        position: 'relative',
        ...containerStyle,
      }}
    >
      <iframe
        ref={iframeRef}
        src={formUrl}
        width={normalizedWidth}
        height={normalizedHeight}
        title={title}
        allowFullScreen={allowFullscreen}
        style={{
          border: 'none',
          display: 'block',
          ...iframeStyle,
        }}
        allow="camera; microphone"
      />
    </div>
  );
};

