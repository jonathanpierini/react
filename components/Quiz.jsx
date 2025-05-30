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
    setAnswers([...answers, { ...question, selected: option }]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const scores = calculateScores(answers.concat({ ...question, selected: option }));
      const dominantPole = getDominantPole(scores);
      localStorage.setItem("dominantPole", dominantPole);
      router.push('/chat');
    }
  };

  const q = questions[current];

  return (
    <div style={{ padding: 30 }}>
      <h2>{q.question}</h2>
      {q.options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(opt)} style={{ display: 'block', margin: '10px 0' }}>
          {opt}
        </button>
      ))}
    </div>
  );
}
