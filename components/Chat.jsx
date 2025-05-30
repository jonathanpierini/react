import { useState } from 'react';
import { buildPrompt } from './PromptBuilder';

export default function Chat() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const dominantPole = typeof window !== 'undefined' ? localStorage.getItem('dominantPole') : 'default';

  const send = async () => {
    const prompt = buildPrompt(dominantPole, input);
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    setReply(data.choices?.[0]?.message?.content || 'Errore nella risposta.');
  };

  return (
    <div style={{ padding: 30 }}>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Scrivi qui…" />
      <button onClick={send}>Invia</button>
      <p><strong>Risposta:</strong> {reply}</p>
    </div>
  );
}
