import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const mandalaImage = "/images/mandala_gold.png";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

export function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}

export function MandalaFrame({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
      <div className="absolute top-0 left-0 w-[clamp(260px,38vw,400px)] transition-opacity duration-1000">
        <InviteImage src="/images/10.png" alt="" className="w-full h-auto object-contain drop-shadow-sm opacity-50" eager />
      </div>
      {!minimal && (
        <div className="absolute bottom-0 right-0 w-[clamp(260px,38vw,400px)] transition-opacity duration-1000">
          <InviteImage src="/images/10.png" alt="" className="w-full h-auto object-contain drop-shadow-sm opacity-50 rotate-180" />
        </div>
      )}
    </div>
  );
}

export function FloatingPetals({ disabled = false }: { disabled?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    // Red, White, Gold theme colors
    const colors = ["#d90429", "#e63946", "#fcfbfa", "#f5eedc", "#FCD34D", "#D97706"];
    const petalCount = isMobile ? 15 : 30;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled]);

  if (disabled) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(217,4,41,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
