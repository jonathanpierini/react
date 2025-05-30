import promptSet from '../data/prompt_master_structured.json';

export function buildPrompt(dominantPole, userMessage) {
  const polePrompt = promptSet[dominantPole] || promptSet["default"];

  return `${polePrompt.intro}\n\nUtente: ${userMessage}\n\nAssistente:`;
}
