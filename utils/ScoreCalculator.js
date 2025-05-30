export function calculateScores(answers) {
  const scores = {
    accettazione: 0,
    defusione: 0,
    sé: 0,
    valori: 0,
    azione: 0,
    presenza: 0,
  };

  answers.forEach(({ pole }) => {
    if (scores[pole] !== undefined) {
      scores[pole]++;
    }
  });

  return scores;
}

export function getDominantPole(scores) {
  return Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}
