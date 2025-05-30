import { useState } from 'react';
import questions from '../data/questions.json';
import { calculateScores, getDominantPole } from '../utils/ScoreCalculator';
import { useRouter } from 'next/router';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();

  const handleAnswer = (option) => {
    const question = questions[current];
    const selected = {
      question: question.question,
      pole: question.pole,
      score: option.score
    };

    const updatedAnswers = [...answers, selected];
    setAnswers(updatedAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const scores = calculateScores(updatedAnswers);
      const dominantPole = getDominantPole(scores);
      localStorage.setItem("scores", JSON.stringify(scores));
      localStorage.setItem("dominantPole", dominantPole);
      router.push('/chat');
    }
  };

  const q = questions[current];

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{q.question}</h2>
      {q.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(opt)}
          style={{
            display: 'block',
            margin: '10px 0',
            padding: '12px',
            width: '100%',
            background: '#f4f4f4',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        >
          {opt.text}
        </button>
      ))}
      <p style={{ marginTop: '1rem' }}>Domanda {current + 1} di {questions.length}</p>
    </div>
  );
}

