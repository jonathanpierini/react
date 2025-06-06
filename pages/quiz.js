import { useState, useEffect } from 'react';
import questions from '../data/questions.json';
import { calculateScores, getDominantPole } from '../utils/ScoreCalculator';
import { useRouter } from 'next/router';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Serve per evitare l'uso di localStorage durante il rendering lato server
    setIsClient(true);
  }, []);

  const handleAnswer = (option) => {
    const question = questions[current];
    const updatedAnswers = [...answers, { ...question, selected: option }];
    setAnswers(updatedAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const scores = calculateScores(updatedAnswers);
      const dominantPole = getDominantPole(scores);

      if (isClient) {
        localStorage.setItem('scores', JSON.stringify(scores));
        localStorage.setItem('dominantPole', dominantPole);
      }

      router.push('/chat');
    }
  };

  // Se le domande non sono ancora caricate
  if (!questions || !questions[current]) {
    return <p>Caricamento in corso...</p>;
  }

  const q = questions[current];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{q.question}</h2>
      {q.options.map((opt, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(opt)}
          style={{
            display: 'block',
            margin: '10px 0',
            padding: '0.75rem 1.25rem',
            fontSize: '1rem',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {opt}
        </button>
      ))}
      <p style={{ marginTop: '2rem' }}>
        Domanda {current + 1} di {questions.length}
      </p>
    </div>
  );
}

