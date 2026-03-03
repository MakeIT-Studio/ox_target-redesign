import { AnimatePresence, motion } from 'framer-motion';
import type { OptionsListProps } from '../../types/types';
import OptionItem from './OptionItem';

export default function OptionsList({
  options,
  zones,
  onSelect,
  accentColor,
}: OptionsListProps) {
  const optionItems = options
    ? Object.entries(options).flatMap(([type, items]) =>
        items
          .filter((item) => !item.hide)
          .map((item, idx) => ({
            key: `opt-${type}-${idx}`,
            item,
            targetType: type,
            targetId: idx + 1,
            zoneId: undefined as number | undefined,
          })),
      )
    : [];

  const zoneItems = zones
    ? zones.flatMap((zoneItems, zoneIdx) =>
        zoneItems
          .filter((item) => !item.hide)
          .map((item, idx) => ({
            key: `zone-${zoneIdx}-${idx}`,
            item,
            targetType: 'zones',
            targetId: idx + 1,
            zoneId: zoneIdx + 1,
          })),
      )
    : [];

  const allItems = [...optionItems, ...zoneItems];

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: 0.02,
          },
        },
      }}
      style={{ display: 'flex', flexDirection: 'column' }}>
      <AnimatePresence mode='popLayout'>
        {allItems.map((entry, globalIndex) => (
          <OptionItem
            key={entry.key}
            option={entry.item}
            targetType={entry.targetType}
            targetId={entry.targetId}
            zoneId={entry.zoneId}
            index={globalIndex}
            onSelect={onSelect}
            accentColor={accentColor}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
