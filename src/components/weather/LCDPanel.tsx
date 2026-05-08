import React from 'react';

interface LCDPanelProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}

export default function LCDPanel({
  label,
  value,
  unit = '',
  color = 'var(--lcd-green)',
}: LCDPanelProps) {
  return (
    <div
      className="rounded-lg p-4 flex flex-col items-center gap-2"
      style={{
        background: 'var(--lcd-bg)',
        border: '3px inset rgba(0,0,0,0.8)',
        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.8), 0 0 15px rgba(57,255,20,0.2)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.625rem',
          color: 'rgba(57,255,20,0.6)',
          letterSpacing: '2px',
        }}
        className="uppercase tracking-widest"
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-lcd)',
          fontSize: '1.75rem',
          color,
          fontWeight: 'bold',
          textShadow: `0 0 8px ${color}80`,
          animation: 'lcdFlicker 0.15s ease-in-out',
        }}
        className="leading-tight"
      >
        {value}
        {unit && <span style={{ fontSize: '0.875rem', marginLeft: '0.25rem' }}>{unit}</span>}
      </div>
    </div>
  );
}
