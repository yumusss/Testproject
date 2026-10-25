import { motion } from 'motion/react';
import { useMemo, useState } from 'react';

type Props = {
  id: number;
  color: string;
  night: boolean;
  onTap: () => void;
};

function randomPath(seed: number) {
  // Deterministic-ish wandering path across the sky (in vw / vh).
  const r = (n: number) => {
    const v = Math.sin(seed * 9301 + n * 49297) * 233280;
    return v - Math.floor(v);
  };
  const xs = Array.from({ length: 6 }, (_, i) => `${5 + r(i) * 85}vw`);
  const ys = Array.from({ length: 6 }, (_, i) => `${8 + r(i + 10) * 45}vh`);
  return { x: [...xs, xs[0]], y: [...ys, ys[0]] };
}

export default function Butterfly({ id, color, night, onTap }: Props) {
  const path = useMemo(() => randomPath(id + 1), [id]);
  const [spins, setSpins] = useState(0);

  return (
    <motion.button
      type="button"
      aria-label="Kelebek"
      className="butterfly"
      initial={{ x: path.x[0], y: path.y[0], opacity: 0 }}
      animate={{ x: path.x, y: path.y, opacity: 1 }}
      transition={{
        x: { duration: 18 + (id % 5) * 3, repeat: Infinity, ease: 'easeInOut' },
        y: { duration: 18 + (id % 5) * 3, repeat: Infinity, ease: 'easeInOut' },
        opacity: { duration: 1 },
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        setSpins((s) => s + 1);
        onTap();
      }}>
      <motion.svg
        viewBox="-30 -25 60 50"
        width="64"
        height="54"
        key={spins}
        initial={{ rotate: 0, scale: 1 }}
        animate={spins > 0 ? { rotate: 360, scale: [1, 1.4, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ filter: night ? `drop-shadow(0 0 8px ${color})` : 'none' }}>
        <motion.g
          animate={{ scaleX: [1, 0.25, 1] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}>
          <ellipse cx="-13" cy="-8" rx="13" ry="12" fill={color} />
          <ellipse cx="13" cy="-8" rx="13" ry="12" fill={color} />
          <ellipse cx="-10" cy="10" rx="9" ry="8" fill={color} opacity="0.85" />
          <ellipse cx="10" cy="10" rx="9" ry="8" fill={color} opacity="0.85" />
          <circle cx="-13" cy="-8" r="4" fill="white" opacity="0.7" />
          <circle cx="13" cy="-8" r="4" fill="white" opacity="0.7" />
        </motion.g>
        <rect x="-2.5" y="-14" width="5" height="28" rx="2.5" fill="#3b2a1a" />
        <path
          d="M -1 -14 Q -6 -22 -9 -22 M 1 -14 Q 6 -22 9 -22"
          stroke="#3b2a1a"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>
    </motion.button>
  );
}
