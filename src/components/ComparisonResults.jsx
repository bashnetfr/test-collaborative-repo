const CATEGORY_ICONS = {
  food: '☕',
  entertainment: '🎬',
  time: '⏱',
  goods: '🎮',
};

export default function ComparisonResults({ itemName, amount, frequency, comparisons }) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl text-ink">{itemName}</h2>
        <p className="text-ink-muted mt-1">
          ${amount.toFixed(2)} / {frequency}
        </p>
      </div>

      <div className="space-y-2.5">
        {comparisons.map((c, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-surface border border-black/10 rounded-sm px-4 py-3"
          >
            <span className="text-xl mt-0.5" aria-hidden="true">
              {CATEGORY_ICONS[c.category] || '💡'}
            </span>
            <p className="text-ink text-sm leading-snug">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
