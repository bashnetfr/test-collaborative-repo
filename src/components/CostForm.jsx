import { useState } from 'react';

const FREQUENCIES = [
  { value: 'one-time', label: 'One-time' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export default function CostForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [frequency, setFrequency] = useState('monthly');

  function handleSubmit(e) {
    e.preventDefault();
    const parsed = parseFloat(price);
    if (!name.trim() || isNaN(parsed) || parsed <= 0) return;
    onSubmit({ name: name.trim(), amount: parsed, frequency });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink-muted mb-1.5">
          What is it?
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Netflix, gym membership, coffee…"
          className="w-full bg-surface border border-black/10 rounded-sm px-4 py-3 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-ink-muted mb-1.5">
          Cost ($)
        </label>
        <input
          id="price"
          type="number"
          min="0.01"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className="w-full bg-surface border border-black/10 rounded-sm px-4 py-3 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-muted mb-1.5">
          How often?
        </label>
        <div className="flex gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFrequency(f.value)}
              className={`flex-1 py-2.5 rounded-sm text-sm font-medium transition
                ${frequency === f.value
                  ? 'bg-ink text-base'
                  : 'bg-surface border border-black/10 text-ink-muted hover:border-ink/30'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-accent text-ink font-display font-bold text-lg py-3.5 rounded-sm hover:bg-accent-hover active:scale-[0.98] transition"
      >
        Is it worth it?
      </button>
    </form>
  );
}
