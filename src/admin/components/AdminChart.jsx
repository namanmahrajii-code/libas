import React, { useState } from 'react';

export const RevenueAreaChart = ({ data, height = 220 }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.value), 1000);
  const minVal = 0;
  const paddingX = 40;
  const paddingY = 20;
  const width = 600;

  // Calculate points
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.value - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  return (
    <div className="w-full relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = height - paddingY - pct * (height - paddingY * 2);
          const val = Math.round(minVal + pct * (maxVal - minVal));
          return (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={paddingX - 8}
                y={y + 3}
                fontSize="10"
                fill="#94a3b8"
                textAnchor="end"
                fontFamily="monospace"
              >
                ₹{val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill="url(#areaGradient)" />

        {/* Line stroke */}
        <path
          d={pathD}
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points and hover interaction */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredIdx === i ? 5 : 3.5}
              fill="#ffffff"
              stroke="#10b981"
              strokeWidth="2.5"
              className="transition-all cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
            {/* Label along X axis */}
            <text
              x={p.x}
              y={height - 4}
              fontSize="10"
              fill="#64748b"
              textAnchor="middle"
              fontWeight="600"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="absolute bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full font-mono"
          style={{
            left: `${(points[hoveredIdx].x / width) * 100}%`,
            top: `${(points[hoveredIdx].y / height) * 100}%`,
          }}
        >
          <div className="font-bold text-emerald-400">₹{points[hoveredIdx].value.toLocaleString()}</div>
          <div className="text-[10px] text-slate-300">{points[hoveredIdx].label}</div>
        </div>
      )}
    </div>
  );
};

export const OrdersBarChart = ({ data, height = 200 }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.map((d) => d.value), 10);

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-44 pt-6 px-2">
        {data.map((item, i) => {
          const heightPct = (item.value / maxVal) * 100;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1.5 group relative"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {hoveredIdx === i && (
                <div className="absolute -top-8 bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-mono shadow whitespace-nowrap z-10">
                  {item.value} Orders
                </div>
              )}
              <div className="w-full bg-slate-100 rounded-t-sm h-36 flex items-end overflow-hidden">
                <div
                  style={{ height: `${Math.max(heightPct, 8)}%` }}
                  className={`w-full transition-all duration-300 rounded-t-sm ${
                    hoveredIdx === i ? 'bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-600'
                  }`}
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-500 group-hover:text-slate-900">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CategoryShareChart = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  const total = categories.reduce((sum, c) => sum + c.value, 0) || 1;

  const colorPalette = [
    'bg-emerald-500 text-emerald-600',
    'bg-indigo-500 text-indigo-600',
    'bg-amber-500 text-amber-600',
    'bg-purple-500 text-purple-600',
    'bg-rose-500 text-rose-600',
    'bg-cyan-500 text-cyan-600',
    'bg-slate-500 text-slate-600',
  ];

  return (
    <div className="space-y-3">
      {/* Multi-segmented stacked bar */}
      <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden">
        {categories.map((c, i) => {
          const pct = ((c.value / total) * 100).toFixed(1);
          const colorClass = colorPalette[i % colorPalette.length].split(' ')[0];
          return (
            <div
              key={c.name}
              style={{ width: `${pct}%` }}
              className={`${colorClass} h-full transition-all`}
              title={`${c.name}: ${pct}%`}
            />
          );
        })}
      </div>

      {/* Breakdown list */}
      <div className="space-y-2 pt-2">
        {categories.map((c, i) => {
          const pct = Math.round((c.value / total) * 100);
          const [bg, text] = colorPalette[i % colorPalette.length].split(' ');
          return (
            <div key={c.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-xs ${bg}`} />
                <span className="text-slate-700 font-medium">{c.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">₹{c.value.toLocaleString()}</span>
                <span className="text-slate-400 text-[11px] w-8 text-right font-mono">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
