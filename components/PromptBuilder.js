import { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip,
  ResponsiveContainer
} from 'recharts';

// Etichette ufficiali dei 6 poli ACT
const poles = [
  'Contatto con il presente',
  'Valori',
  'Azione impegnata',
  'Sé come contesto',
  'Defusione',
  'Accettazione'
];

export default function HexaflexRadar() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Recupera i punteggi salvati nel localStorage (es. dal quiz Halifax)
    const raw = JSON.parse(localStorage.getItem('scores') || '{}');

    // Prepara il dataset per il grafico radar
    const formatted = poles.map(pole => ({
      pole,
      score: raw[pole] || 0
    }));

    setScores(formatted);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
        Bilanciamento ACT – Hexaflex
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} data={scores}>
          <PolarGrid />
          <PolarAngleAxis dataKey="pole" style={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
          <Radar
            name="Punteggio"
            dataKey="score"
            stroke="#007BFF"
            fill="#007BFF"
            fillOpacity={0.6}
          />
          <Tooltip formatter={(value) => `${value}/5`} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
