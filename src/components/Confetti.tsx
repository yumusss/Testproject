import { motion } from 'motion/react';
import { useState } from 'react';

const COLORS = ['#ff5a5f', '#ff9f1c', '#ffd23f', '#3ddc84', '#4cc9f0', '#7b61ff', '#ff70a6'];

function makePieces() {
  return Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    drift: (Math.random() - 0.5) * 200,
    spin: (Math.random() - 0.5) * 1080,
    delay: Math.random() * 0.6,
    duration: 2.2 + Math.random() * 1.5,
    round: Math.random() > 0.5,
  }));
}

export default function Confetti() {
  const [pieces] = useState(makePieces);

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          style={{
            left: `${p.left}%`,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
          }}
          initial={{ y: '-10vh', x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', x: p.drift, rotate: p.spin, opacity: [1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}
