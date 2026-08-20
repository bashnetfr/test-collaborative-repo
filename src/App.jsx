import { useState } from 'react';
import CostForm from './components/CostForm';
import ComparisonResults from './components/ComparisonResults';
import { getComparisons } from './lib/getComparisons';

export default function App() {
  const [result, setResult] = useState(null);

  function handleCompare({ name, amount, frequency }) {
    const comparisons = getComparisons(amount, frequency);
    setResult({ name, amount, frequency, comparisons });
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 sm:py-20">
      <header className="text-center mb-10">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink tracking-tight">
          Is It Worth It?
        </h1>
        <p className="text-ink-muted mt-2 text-base">
          Turn any cost into something you actually understand.
        </p>
      </header>

      <main className="w-full max-w-md">
        <CostForm onSubmit={handleCompare} />

        {result && (
          <div className="mt-8">
            <ComparisonResults
              itemName={result.name}
              amount={result.amount}
              frequency={result.frequency}
              comparisons={result.comparisons}
            />
          </div>
        )}
      </main>
    </div>
  );
}
