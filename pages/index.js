
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>MentalWealth</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Un percorso terapeutico personalizzato basato sull’ACT e sulla tua esperienza.
      </p>
      <Link href="/quiz">
        <button
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          aria-label="Inizia il questionario Halifax"
        >
          Inizia il Quiz
        </button>
      </Link>
    </main>
  );
}
