import { useEffect, useState } from 'react';

export default function HexaflexRadar() {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('scores') || '{}');
    setScores(saved);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Radar ACT</h2>
      <ul>
        {Object.entries(scores).map(([pole, val]) => (
          <li key={pole}>{pole}: {val}</li>
        ))}
      </ul>
    </div>
  );
}
