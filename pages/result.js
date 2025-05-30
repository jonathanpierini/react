import { useEffect, useState } from 'react';
import HexaflexRadar from '../components/HexaflexRadar';

export default function Results() {
  const [scores, setScores] = useState({});
  const [dominantPole, setDominantPole] = useState('');

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores') || '{}');
    const dominant = localStorage.getItem('dominantPole') || '';
    setScores(savedScores);
    setDominantPole(dominant);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Risultati del Quiz</h1>
      <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
        Polo ACT predominante: <strong>{dominantPole || 'Non disponibile'}</strong>
      </p>

      <div style={{ marginTop: '2rem' }}>
        <HexaflexRadar />
      </div>
    </div>
  );
}
