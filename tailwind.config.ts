import type {Config} from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    screens: {
      lg: '1025px',
      sm: '640px',
      xlg: {
        max: '1024px',
      },
      xsm: {
        max: '639px',
      },
      tablet: {
        min: '640px',
        max: '1024px',
      },
    },
    extend: {
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'cubic-left-story': 'cubic-bezier(.63,.14,.54,.89)',
      },
      fontFamily: {
        sackers: ['font-sackers'],
        beautique: ['font-beautique'],
        cormorant: ['font-cormorant'],
        helvetica: ['font-helvetica'],
        netflix: ['font-netflix', 'font-helvetica', 'sans-serif'],
        nf_Ic: ['font-nf-icon'],
      },
      colors: {
        primary: '#313131',
        background: '#FFFDF8',
        'gray-900': '#111827',
        'gray-400': '#9CA3AF',
        'greyscaletext-5': '#ECECEC',
        'greyscaletext-20': '#A9A9A9',
        'greyscaletext-30': '#828282',
        'greyscaletext-40': '#6A6A6A',
        'greyscaletext-50': '#454545',
        'greyscaletext-60': '#3F3F3F',
        'greyscaletext-90': '#1D1D1D',
        'greyscaletext-80': '#262626',
        'greyscaletext-87': 'rgba(0,0,0,0.87)',
        'greyscaletext-70': '#313131',
        emphasis: '#181513',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
