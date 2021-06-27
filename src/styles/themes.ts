export const themes = {
  light: {
    primary: '#f8f8f8',
  },
  dark: {
    primary: '#1d1d1d',
  }
}

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof themes.light | typeof themes.dark;