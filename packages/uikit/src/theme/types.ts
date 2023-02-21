export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  nav: string;
};

export type Spacing = number[];

export type Radii = {
  small: string;
  default: string;
  card: string;
  circle: string;
};

export type Shadows = {
  level1: string;
  active: string;
  success: string;
  warning: string;
  focus: string;
  inset: string;
  tooltip: string;
};

export type Gradients = {
  bubblegum: string;
  inverseBubblegum: string;
  cardHeader: string;
  blue: string;
  violet: string;
  violetAlt: string;
  gold: string;
  success?: string;
  lottery?: string;
};

export type Colors = {
  primary: string;
  primaryBright: string;
  primaryDark: string;
  secondary: string;
  tertiary: string;
  success: string;
  failure: string;
  warning: string;
  cardBorder: string;
  cardBorderBlur: string;
  contrast: string;
  dropdown: string;
  dropdownDeep: string;
  invertedContrast: string;
  input: string;
  inputSecondary: string;
  background: string;
  backgroundDisabled: string;
  backgroundAlt: string;
  backgroundModal: string;
  toggleTurnRight: string;
  defaulltToggle: string;
  backgroundAlt2: string;
  backgroundTotal: string;
  borderBtn: string;
  grey: string;
  text: string;
  textDark: string;
  modal: string;
  textDisabled: string;
  textSubtle: string;
  disabled: string;
  bgButton?: string;
  bgPrimaryButton?: string;
  bgRedOrangeButton?: string;
  // Gradients
  gradients: Gradients;
  succesGradient: string;
  // Additional colors
  binance: string;
  overlay: string;
  gold: string;
  silver: string;
  bronze: string;
  sencondaryLottery?: string;
};

export type ZIndices = {
  dropdown: number;
  modal: number;
};
