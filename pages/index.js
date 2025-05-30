
import Link from 'next/link';
export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>MentalWealth</h1>
      <Link href="/quiz"><button>Inizia il Quiz</button></Link>
    </div>
  );
}
