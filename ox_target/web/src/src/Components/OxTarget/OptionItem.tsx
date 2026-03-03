import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { OptionItemProps } from '../../types/types';

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 26,
      delay: i * 0.03,
    },
  }),
  exit: () => ({
    opacity: 0,
    x: -8,
    transition: {
      duration: 0.12,
      ease: 'easeIn',
    },
  }),
  hover: {
    x: 4,
    transition: { type: 'spring', stiffness: 450, damping: 28 },
  },
};

export default function OptionItem({
  option,
  targetType,
  targetId,
  zoneId,
  onSelect,
  index,
  accentColor = '#3B82F6',
}: OptionItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (): void => {
    const el = ref.current;
    if (el) el.style.pointerEvents = 'none';
    onSelect({ targetType, targetId, zoneId });
    setTimeout(() => {
      if (ref.current) ref.current.style.pointerEvents = 'auto';
    }, 100);
  };

  const iconColor = option.iconColor ?? 'rgba(255,255,255,0.4)';

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={itemVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      whileHover='hover'
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        fontFamily: '"Nunito", sans-serif',
        height: '32px',
        minWidth: '160px',
        maxWidth: '280px',
        width: 'fit-content',
        paddingLeft: '12px',
        paddingRight: '16px',
        marginBottom: '3px',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
        willChange: 'transform, opacity',
      }}>
      <motion.div
        variants={{
          hover: { scaleY: 1, opacity: 1, height: '100%', top: 0, bottom: 0 },
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        style={{
          position: 'absolute',
          left: 0,
          top: '6px',
          bottom: '6px',
          width: '2px',
          borderRadius: '2px',
          background: accentColor,
          transformOrigin: 'center',
        }}
      />

      <motion.div
        variants={{
          hover: { opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          borderRadius: '4px',
          pointerEvents: 'none',
        }}
      />

      <motion.i
        className={`fa-fw ${option.icon}`}
        variants={{
          hover: { color: '#ffffff', opacity: 1 },
        }}
        transition={{ duration: 0.15 }}
        style={{
          fontSize: '10.5pt',
          color: iconColor,
          opacity: 0.75,
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
      />

      <motion.p
        variants={{
          hover: { color: '#ffffff', opacity: 1, x: 1 },
        }}
        style={{
          margin: 0,
          fontSize: '10.5pt',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.012em',
          position: 'relative',
          zIndex: 1,
          whiteSpace: 'nowrap',
        }}>
        {option.label}
      </motion.p>
    </motion.div>
  );
}
