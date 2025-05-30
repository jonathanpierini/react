// components/Chat.jsx
import { useState, useEffect } from 'react';
import { buildPrompt } from '../utils/PromptBuilder';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [dominantPole, setDominantPole] = useState('');

  useEffect(() => {
    const pole = localStorage.getItem('dominantPole') || 'Valori';
    setDominantPole(pole);
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    const prompt = buildPrompt(dominantPole, updatedMessages);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'system', content: `Agisci come terapeuta ACT, polo dominante: ${dominantPole}` }, ...updatedMessages],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const aiReply = data.choices?.[0]?.message?.content || 'Errore nella risposta.';
      setMessages([...updatedMessages, { role: 'assistant', content: aiReply }]);
      setReply(aiReply);
      setInput('');
    } catch (error) {
      setReply('Errore di rete o configurazione API.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Polo attivo: {dominantPole}</h2>
      <div className="border rounded p-4 bg-gray-50 h-96 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={msg.role === 'user' ? 'text-blue-600' : 'text-green-700'}>
              <strong>{msg.role === 'user' ? 'Tu' : 'MentalWealth'}:</strong> {msg.content}
            </span>
          </div>
        ))}
      </div>
      <textarea
        className="w-full border mt-4 p-2 rounded"
        rows={3}
        value={input}
        placeholder="Scrivi qui la tua riflessione..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={send} className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
        Invia
      </button>
      {reply && <p className="mt-4 italic text-gray-700">Risposta: {reply}</p>}
    </div>
  );
}

