'use client';
import { sdk } from '@farcaster/miniapp-sdk';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => { sdk.actions.ready(); }, []);
  
  return (
    <iframe
      src="/hangman.html"
      style={{ width: '100vw', height: '100vh', border: 'none' }}
    />
  );
}
