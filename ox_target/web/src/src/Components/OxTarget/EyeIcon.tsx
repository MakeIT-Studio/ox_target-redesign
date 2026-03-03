import { motion } from 'framer-motion';
import type { EyeIconProps } from '../../types/types';

const circleVariants = (activeColor: string) => ({
  inactive: {
    fill: 'rgba(255,255,255,0.15)',
    scale: 0.8,
    opacity: 0.6,
  },
  active: {
    fill: activeColor,
    scale: [1, 1.15, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      scale: {
        duration: 2.0,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
      opacity: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
      fill: { duration: 0.4 },
    },
  },
});

export default function EyeIcon({ active, color = '#3B82F6' }: EyeIconProps) {
  const variants = circleVariants(color);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        lineHeight: 0,
      }}>
      <motion.svg
        xmlns='http://www.w3.org/2000/svg'
        height='16px'
        viewBox='0 0 24 24'
        width='16px'
        animate={active ? 'active' : 'inactive'}
        variants={variants}
        transition={{ duration: 0.25, ease: 'easeOut' }}>
        <circle cx='12' cy='12' r='8' />
      </motion.svg>
    </div>
  );
}
