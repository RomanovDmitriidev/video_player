export enum ThemeType {
  Light = 'light',
  Dark = 'dark'
}

export const ThemeScheme: Record<ThemeType, { value: string; text: string }> = {
  [ThemeType.Light]: {
    value: ThemeType.Light,
    text: 'Светлая тема'
  },
  [ThemeType.Dark]: {
    value: ThemeType.Dark,
    text: 'Тёмная тема'
  }
};
