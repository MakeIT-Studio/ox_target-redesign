import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { api, useNuiEvent } from '../../Fivem';
import type {
  SelectPayload,
  SetTargetPayload,
  TargetState,
  UiConfig,
  VisiblePayload,
} from '../../types/types';
import { DefaultConfig, State } from '../../types/types';
import EyeIcon from './EyeIcon';
import OptionsList from './OptionsList';

export default function OxTarget() {
  const [visible, setVisible] = useState(false);
  const [targetState, setTargetState] = useState<TargetState>(State);
  const [uiConfig, setUiConfig] = useState<UiConfig>(DefaultConfig);

  useNuiEvent<{ config: UiConfig }>('setupConfig', (data) => {
    if (data.config) {
      setUiConfig(data.config);
    }
  });

  useNuiEvent<VisiblePayload>('visible', (data) => {
    setVisible(data.state);
    if (!data.state) setTargetState(State);
  });

  useNuiEvent<object>('leftTarget', () => {
    setTargetState(State);
  });

  useNuiEvent<SetTargetPayload>('setTarget', (data) => {
    setTargetState({
      options: data.options,
      zones: data.zones,
      hasTarget: true,
    });
  });

  const handleSelect = useCallback((payload: SelectPayload): void => {
    api.send('select', [payload.targetType, payload.targetId, payload.zoneId]);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key='ox-target-root'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '100vw',
            height: '100vh',
            position: 'relative',
          }}>
          <EyeIcon active={targetState.hasTarget} color={uiConfig.color} />

          <div
            style={{
              position: 'absolute',
              top: 'calc(48.4%)',
              left: 'calc(50% + 18pt)',
            }}>
            <OptionsList
              options={targetState.options}
              zones={targetState.zones}
              onSelect={handleSelect}
              accentColor={uiConfig.color}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
