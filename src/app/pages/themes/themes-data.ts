/**
 * Preset themes matching shadcn's theme picker (ui.shadcn.com/themes).
 * Each theme defines light + dark values for the core color tokens.
 * Values are OKLch, sourced from the shadcn registry base colors.
 */
export interface ThemePreset {
  name: string;
  slug: string;
  /** Swatch color for the picker button (oklch) */
  activeColor: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: 'Default',
    slug: 'default',
    activeColor: 'oklch(0.205 0 0)',
    cssVars: {
      light: {
        '--primary': 'oklch(0.205 0 0)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--ring': 'oklch(0.708 0 0)',
        '--radius': '0.625rem',
      },
      dark: {
        '--primary': 'oklch(0.922 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--ring': 'oklch(0.556 0 0)',
        '--radius': '0.625rem',
      },
    },
  },
  {
    name: 'Red',
    slug: 'red',
    activeColor: 'oklch(0.637 0.237 25.331)',
    cssVars: {
      light: {
        '--primary': 'oklch(0.637 0.237 25.331)',
        '--primary-foreground': 'oklch(0.971 0.013 17.38)',
        '--ring': 'oklch(0.637 0.237 25.331)',
        '--radius': '0.625rem',
      },
      dark: {
        '--primary': 'oklch(0.637 0.237 25.331)',
        '--primary-foreground': 'oklch(0.971 0.013 17.38)',
        '--ring': 'oklch(0.637 0.237 25.331)',
        '--radius': '0.625rem',
      },
    },
  },
  {
    name: 'Rose',
    slug: 'rose',
    activeColor: 'oklch(0.645 0.246 16.439)',
    cssVars: {
      light: {
        '--primary': 'oklch(0.645 0.246 16.439)',
        '--primary-foreground': 'oklch(0.969 0.015 12.422)',
        '--ring': 'oklch(0.645 0.246 16.439)',
        '--radius': '0.625rem',
      },
      dark: {
        '--primary': 'oklch(0.645 0.246 16.439)',
        '--primary-foreground': 'oklch(0.969 0.015 12.422)',
        '--ring': 'oklch(0.645 0.246 16.439)',
        '--radius': '0.625rem',
      },
    },
  },
  {
    name: 'Orange',
    slug: 'orange',
    activeColor: 'oklch(0.705 0.213 47.604)',
    cssVars: {
      light: {
        '--primary': 'oklch(0.705 0.213 47.604)',
        '--primary-foreground': 'oklch(0.98 0.016 73.684)',
        '--ring': 'oklch(0.705 0.213 47.604)',
        '--radius': '0.625rem',
      },
      dark: {
        '--primary': 'oklch(0.646 0.222 41.116)',
        '--primary-foreground': 'oklch(0.98 0.016 73.684)',
        '--ring': 'oklch(0.646 0.222 41.116)',
        '--radius': '0.625rem',
      },
    },
  },
  {
    name: 'Green',
    slug: 'green',
    activeColor: 'oklch(0.723 0.219 149.579)',
    cssVars: {
      light: {
        '--primary': 'oklch(0.627 0.194 149.214)',
        '--primary-foreground': 'oklch(0.982 0.018 155.826)',
        '--ring': 'oklch(0.627 0.194 149.214)',
        '--radius': '0.625rem',
      },
      dark: {
        '--primary': 'oklch(0.723 0.219 149.579)',
        '--primary-foreground': 'oklch(0.266 0.065 152.934)',
        '--ring': 'oklch(0.723 0.219 149.579)',
        '--radius': '0.625rem',
      },
    },
  },
  {
    name: 'Blue',
    slug: 'blue',
    activeColor: 'oklch(0.623 0.214 259.815)',
    cssVars: {
      light: {
        '--primary': 'oklch(0.546 0.245 262.881)',
        '--primary-foreground': 'oklch(0.97 0.014 254.604)',
        '--ring': 'oklch(0.546 0.245 262.881)',
        '--radius': '0.625rem',
      },
      dark: {
        '--primary': 'oklch(0.623 0.214 259.815)',
        '--primary-foreground': 'oklch(0.97 0.014 254.604)',
        '--ring': 'oklch(0.623 0.214 259.815)',
        '--radius': '0.625rem',
      },
    },
  },
  {
    name: 'Yellow',
    slug: 'yellow',
    activeColor: 'oklch(0.852 0.199 91.936)',
    cssVars: {
      light: {
        '--primary': 'oklch(0.852 0.199 91.936)',
        '--primary-foreground': 'oklch(0.421 0.095 57.708)',
        '--ring': 'oklch(0.852 0.199 91.936)',
        '--radius': '0.625rem',
      },
      dark: {
        '--primary': 'oklch(0.852 0.199 91.936)',
        '--primary-foreground': 'oklch(0.421 0.095 57.708)',
        '--ring': 'oklch(0.852 0.199 91.936)',
        '--radius': '0.625rem',
      },
    },
  },
  {
    name: 'Violet',
    slug: 'violet',
    activeColor: 'oklch(0.606 0.25 292.717)',
    cssVars: {
      light: {
        '--primary': 'oklch(0.541 0.281 293.009)',
        '--primary-foreground': 'oklch(0.969 0.016 293.756)',
        '--ring': 'oklch(0.541 0.281 293.009)',
        '--radius': '0.625rem',
      },
      dark: {
        '--primary': 'oklch(0.606 0.25 292.717)',
        '--primary-foreground': 'oklch(0.969 0.016 293.756)',
        '--ring': 'oklch(0.606 0.25 292.717)',
        '--radius': '0.625rem',
      },
    },
  },
];
