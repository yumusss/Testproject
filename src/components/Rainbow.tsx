import { motion } from 'motion/react';

const COLORS = ['#ff5a5f', '#ff9f1c', '#ffd23f', '#3ddc84', '#4cc9f0', '#7b61ff', '#c77dff'];

export default function Rainbow() {
  return (
    <motion.svg
      className="rainbow"
      viewBox="0 0 400 210"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}>
      {COLORS.map((color, i) => {
        const r = 190 - i * 14;
        return (
          <motion.path
            key={color}
            d={`M ${200 - r} 205 A ${r} ${r} 0 0 1 ${200 + r} 205`}
            stroke={color}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: 'easeInOut' }}
          />
        );
      })}
    </motion.svg>
  );
}
