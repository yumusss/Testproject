import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { playCelebrate, playFlutter, playMagic, playPlant, playPop, setMuted } from './audio';
import Butterfly from './components/Butterfly';
import Confetti from './components/Confetti';
import Flower, { type FlowerData } from './components/Flower';
import Rainbow from './components/Rainbow';
import Sky from './components/Sky';

const PETAL_COLORS = [
  '#ff70a6',
  '#ff9770',
  '#ffd670',
  '#e9ff70',
  '#70d6ff',
  '#c77dff',
  '#ff5a5f',
  '#ffffff',
];
const CENTER_COLORS = ['#ffd23f', '#ff9f1c', '#fff3b0'];
const BUTTERFLY_COLORS = ['#ff70a6', '#70d6ff', '#ffd670', '#c77dff', '#ff9770', '#3ddc84'];
const MILESTONES = [10, 25, 50, 100];
const MAX_FLOWERS = 120;
const GROUND_TOP = 0.62; // fraction of the screen where the grass starts

type Sparkle = { id: number; x: number; y: number; color: string };

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

let nextId = 1;

export default function App() {
  const [flowers, setFlowers] = useState<FlowerData[]>([]);
  const [planted, setPlanted] = useState(0);
  const [butterflies, setButterflies] = useState<number[]>([1, 2]);
  const [night, setNight] = useState(false);
  const [rainbow, setRainbow] = useState(false);
  const [celebration, setCelebration] = useState<number | null>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [muted, setMutedState] = useState(false);
  const gardenRef = useRef<HTMLDivElement>(null);
  const lastSparkle = useRef(0);

  useEffect(() => setMuted(muted), [muted]);

  useEffect(() => {
    if (!rainbow) return;
    const t = setTimeout(() => setRainbow(false), 7000);
    return () => clearTimeout(t);
  }, [rainbow]);

  useEffect(() => {
    if (celebration === null) return;
    const t = setTimeout(() => setCelebration(null), 3500);
    return () => clearTimeout(t);
  }, [celebration]);

  const addSparkle = useCallback((x: number, y: number) => {
    const id = nextId++;
    setSparkles((s) => [...s.slice(-25), { id, x, y, color: pick(PETAL_COLORS) }]);
    setTimeout(() => setSparkles((s) => s.filter((p) => p.id !== id)), 700);
  }, []);

  const plant = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = gardenRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    let y = (e.clientY - rect.top) / rect.height;
    // A tap in the sky plants a flower on the grass right below it.
    if (y < GROUND_TOP + 0.04) y = GROUND_TOP + 0.04 + Math.random() * 0.25;

    const size = 48 + Math.random() * 36;
    const flower: FlowerData = {
      id: nextId++,
      x,
      y,
      color: pick(PETAL_COLORS),
      center: pick(CENTER_COLORS),
      petals: 5 + Math.floor(Math.random() * 4),
      size,
      stemHeight: size * (1.1 + Math.random() * 0.8),
    };
    setFlowers((f) => [...f, flower].slice(-MAX_FLOWERS));
    playPlant(x);
    for (let i = 0; i < 4; i++)
      addSparkle(e.clientX + (Math.random() - 0.5) * 40, e.clientY + (Math.random() - 0.5) * 40);

    const total = planted + 1;
    setPlanted(total);
    if (MILESTONES.includes(total)) {
      setCelebration(total);
      playCelebrate();
    }
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastSparkle.current < 45) return;
    lastSparkle.current = now;
    addSparkle(e.clientX, e.clientY);
  };

  const addButterfly = () => {
    setButterflies((b) => (b.length >= 8 ? b : [...b, nextId++]));
    playFlutter();
  };

  const clearGarden = () => {
    setFlowers([]);
    setPlanted(0);
    setButterflies([1, 2]);
    playPop();
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        className={`garden ${night ? 'night' : 'day'}`}
        ref={gardenRef}
        onPointerDown={plant}
        onPointerMove={onMove}>
        <Sky night={night} />
        <AnimatePresence>{rainbow && <Rainbow key="rainbow" />}</AnimatePresence>

        <div className="ground" style={{ top: `${GROUND_TOP * 100}%` }} aria-hidden="true">
          <div className="hill hill-back" />
          <div className="hill hill-front" />
        </div>

        {flowers
          .slice()
          .sort((a, b) => a.y - b.y)
          .map((f) => (
            <Flower key={f.id} flower={f} night={night} />
          ))}

        {butterflies.map((id, i) => (
          <Butterfly
            key={id}
            id={id}
            color={BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length]}
            night={night}
            onTap={playFlutter}
          />
        ))}

        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="sparkle"
            style={{ left: s.x, top: s.y, color: s.color }}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{ scale: [0, 1.2, 0], opacity: [1, 1, 0], rotate: 180, y: -20 }}
            transition={{ duration: 0.7 }}
            aria-hidden="true">
            ✦
          </motion.span>
        ))}

        <AnimatePresence>
          {flowers.length === 0 && (
            <motion.div
              className="hint"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ y: { duration: 1.6, repeat: Infinity }, opacity: { duration: 0.6 } }}>
              Çimenlere dokun, çiçek ek! 🌷
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {celebration !== null && (
            <>
              <Confetti key={`confetti-${celebration}`} />
              <motion.div
                key={`badge-${celebration}`}
                className="badge"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
                Harika! {celebration} çiçek! 🎉
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          className="counter"
          key={planted}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          aria-live="polite">
          🌼 {planted}
        </motion.div>

        <nav className="toolbar" onPointerDown={(e) => e.stopPropagation()}>
          <ToolButton label="Kelebek" emoji="🦋" onClick={addButterfly} />
          <ToolButton
            label={night ? 'Gündüz' : 'Gece'}
            emoji={night ? '☀️' : '🌙'}
            onClick={() => {
              setNight((n) => !n);
              playMagic();
            }}
          />
          <ToolButton
            label="Gökkuşağı"
            emoji="🌈"
            onClick={() => {
              setRainbow(true);
              playMagic();
            }}
          />
          <ToolButton label="Temizle" emoji="🧹" onClick={clearGarden} />
          <ToolButton
            label={muted ? 'Sessiz' : 'Ses'}
            emoji={muted ? '🔇' : '🔊'}
            onClick={() => setMutedState((m) => !m)}
          />
        </nav>
      </motion.main>
    </MotionConfig>
  );
}

function ToolButton({
  label,
  emoji,
  onClick,
}: {
  label: string;
  emoji: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      className="tool"
      aria-label={label}
      title={label}
      onClick={onClick}
      whileHover={{ scale: 1.12, rotate: -4 }}
      whileTap={{ scale: 0.85 }}>
      <span className="tool-emoji">{emoji}</span>
      <span className="tool-label">{label}</span>
    </motion.button>
  );
}
