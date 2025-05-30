// utils/ScoreCalculator.js

const scoreMap = {
  "Molto": 3,
  "Abbastanza": 2,
  "Poco": 1,
  "Sì, spesso": 3,
  "A volte": 2,
  "Raramente": 1,
  "Spesso": 3,
  "Qualche volta": 2,
  "Quasi mai": 1,
  "Sì": 3,
  "Non sempre": 2,
  "No": 1
};

export function calculateScores(answers) {
  const scores = {
    accettazione: 0,
    defusione: 0,
    "sé-osservante": 0,
    valori: 0,
    "azione-impegnata": 0,
    presenza: 0
  };

  answers.forEach(({ pole, selected }) => {
    const value = scoreMap[selected] || 0;
    if (pole && scores.hasOwnProperty(pole)) {
      scores[pole] += value;
    }
  });

  // Salvo per radar e chat
  localStorage.setItem("scores", JSON.stringify(scores));

  return scores;
}

export function getDominantPole(scores) {
  return Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}
