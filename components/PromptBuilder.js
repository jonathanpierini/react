import promptData from '../data/prompt_master_structured.json';

export function buildPrompt(dominantPole, userInput) {
  const base = promptData[dominantPole] || promptData.default;

  return `
Sei un assistente ACT clinico. Usa un tono ${base.tone} e rispondi tenendo presente:

Tema principale: ${base.theme}
Frase chiave: ${base.keyPhrase}
Tecniche suggerite: ${base.techniques.join(', ')}

Utente: ${userInput}
Assistente:
  `;
}
