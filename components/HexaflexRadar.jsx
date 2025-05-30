import { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip,
  ResponsiveContainer
} from 'recharts';

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
    const raw = JSON.parse(localStorage.getItem('scores') || '{}');
    const formatted = poles.map(pole => ({
      pole,
      score: raw[pole] || 0
    }));
    setScores(formatted);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ textAlign: 'center' }}>Bilanciamento ACT – Hexaflex</h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} data={scores}>
          <PolarGrid />
          <PolarAngleAxis dataKey="pole" style={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
          <Radar name="Punteggio" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip formatter={(value) => `${value}/5`} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
