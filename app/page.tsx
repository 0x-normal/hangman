'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This component is the official entry point for the root '/'
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // CRITICAL: Immediately redirect the browser to the static HTML file.
    // This file is located in your /public directory.
    router.replace('/hangman.html');
  }, [router]);

  // Render a minimal loader while redirecting
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#3b82f6', color: 'white' }}>
      Loading Game...
    </div>
  );
}
