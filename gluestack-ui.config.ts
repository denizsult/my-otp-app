import { createConfig } from '@gluestack-ui/themed';

export const config = createConfig({
  aliases: {
    bg: 'backgroundColor',
    bgColor: 'backgroundColor',
    rounded: 'borderRadius',
  },
  tokens: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
    },
    space: {
      '0': 0,
      '1': 4,
      '2': 8,
      '3': 12,
      '4': 16,
      '5': 20,
      '6': 24,
      '7': 28,
      '8': 32,
      '9': 36,
      '10': 40,
    },
    radii: {
      'none': 0,
      'xs': 2,
      'sm': 4,
      'md': 6,
      'lg': 8,
      'xl': 12,
      '2xl': 16,
      '3xl': 24,
    },
  },
  globalStyle: {
    variants: {
      hardShadow: {
        '1': {
          shadowColor: '$backgroundLight800',
          shadowOffset: {
            width: -2,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 10,
        },
      },
      softShadow: {
        '1': {
          shadowColor: '$backgroundLight800',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        },
      },
    },
  },
});

type ConfigType = typeof config;

declare module '@gluestack-ui/themed' {
  interface UIConfig extends ConfigType {}
}
