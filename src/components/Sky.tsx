import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

type Props = {
  night: boolean;
};

function makeStars() {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 55,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 3,
  }));
}

export default function Sky({ night }: Props) {
  const [stars] = useState(makeStars);

  return (
    <div className="sky" aria-hidden="true">
      <AnimatePresence mode="wait">
        {night ? (
          <motion.div
            key="moon"
            className="moon"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          />
        ) : (
          <motion.div
            key="sun"
            className="sun"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, rotate: 360 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{
              y: { type: 'spring', stiffness: 60, damping: 14 },
              opacity: { duration: 0.5 },
              rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
            }}>
            <div className="sun-face">
              <span className="eye" />
              <span className="eye" />
              <span className="smile" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {night &&
          stars.map((s) => (
            <motion.span
              key={s.id}
              className="star"
              style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, delay: s.delay, repeat: Infinity }}
            />
          ))}
      </AnimatePresence>

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="cloud"
          style={{ top: `${8 + i * 12}%`, scale: 1 - i * 0.2 }}
          initial={{ x: '-30vw' }}
          animate={{ x: '110vw', opacity: night ? 0.35 : 0.95 }}
          transition={{
            x: { duration: 45 + i * 15, repeat: Infinity, ease: 'linear', delay: -i * 18 },
            opacity: { duration: 1 },
          }}
        />
      ))}
    </div>
  );
}
