'use client';
import { useEffect } from 'react';

export default function Page() {
  // NOTE: Remove the 'sdk.actions.ready()' call from here!
  // This is necessary if the iframe is calling it as well.

  return (
    <iframe
      src="/hangman.html"
      style={{ width: '100vw', height: '100vh', border: 'none' }}
    />
  );
}
