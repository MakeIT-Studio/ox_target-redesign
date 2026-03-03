export type TargetOption = {
  label: string;
  icon: string;
  iconColor?: string;
  hide?: boolean;
};

export type TargetOptions = Record<string, TargetOption[]>;
export type TargetZones = TargetOption[][];

export type SetTargetPayload = {
  options?: TargetOptions;
  zones?: TargetZones;
};

export type VisiblePayload = {
  state: boolean;
};

export type SelectPayload = {
  targetType: string;
  targetId: number;
  zoneId?: number;
};

export type TargetState = {
  options: TargetOptions | undefined;
  zones: TargetZones | undefined;
  hasTarget: boolean;
};

export type UiConfig = {
  color: string;
};

export type EyeIconProps = {
  active: boolean;
  color?: string;
};

export type OptionItemProps = {
  option: TargetOption;
  targetType: string;
  targetId: number;
  zoneId?: number;
  onSelect: (payload: SelectPayload) => void;
  index: number;
  accentColor?: string;
};

export type OptionsListProps = {
  options: TargetOptions | undefined;
  zones: TargetZones | undefined;
  onSelect: (payload: SelectPayload) => void;
  accentColor?: string;
};

export const State: TargetState = {
  options: undefined,
  zones: undefined,
  hasTarget: false,
};

export const DefaultConfig: UiConfig = {
  color: '#3B82F6',
};
