import { motion } from 'motion/react';

export type FlowerData = {
  id: number;
  x: number; // 0..1 of garden width
  y: number; // 0..1 of garden height (where the stem touches the ground)
  color: string;
  center: string;
  petals: number;
  size: number;
  stemHeight: number;
};

type Props = {
  flower: FlowerData;
  night: boolean;
};

export default function Flower({ flower, night }: Props) {
  const { size, stemHeight, petals, color, center } = flower;
  const petalAngles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);

  return (
    <div
      className="flower"
      style={{
        left: `${flower.x * 100}%`,
        top: `${flower.y * 100}%`,
      }}>
      {/* Stem grows up from the ground */}
      <motion.div
        className="stem"
        style={{ height: stemHeight }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}>
        <motion.div
          className="leaf"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 12 }}
        />
      </motion.div>

      {/* Head pops open, then sways gently forever */}
      <motion.div
        className="flower-head"
        style={{ bottom: stemHeight - size / 2, width: size, height: size, marginLeft: -size / 2 }}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 220, damping: 10 }}>
        <motion.svg
          viewBox="-50 -50 100 100"
          width={size}
          height={size}
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3 + (flower.id % 3), repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: night ? `drop-shadow(0 0 10px ${color})` : 'none' }}>
          {petalAngles.map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-24"
              rx="14"
              ry="24"
              fill={color}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle r="15" fill={center} />
          <circle cx="-5" cy="-3" r="2.5" fill="#3b2a1a" />
          <circle cx="5" cy="-3" r="2.5" fill="#3b2a1a" />
          <path
            d="M -6 5 Q 0 11 6 5"
            stroke="#3b2a1a"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
