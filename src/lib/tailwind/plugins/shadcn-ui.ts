import animatePlugin from 'tailwindcss-animate'
import plugin from 'tailwindcss/plugin'

function withOpacity(color: string) {
  return `hsla(var(${color}), <alpha-value>)`
}

export const shadcnPlugin = plugin(
  function ({ addBase, addUtilities }) {
    addBase({ ':root': { '--radius': '0.5rem' } })
    addBase({
      '*': { '@apply border-border': {} },
      body: { '@apply bg-background text-foreground': {} },
    })
    addUtilities({})
  },
  {
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: '2rem',
        },
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          neutral: {
            DEFAULT: withOpacity('--neutral'),
            50: withOpacity('--neutral-50'),
            100: withOpacity('--neutral-100'),
            200: withOpacity('--neutral-200'),
            300: withOpacity('--neutral-300'),
            400: withOpacity('--neutral-400'),
            500: withOpacity('--neutral-500'),
            600: withOpacity('--neutral-600'),
            700: withOpacity('--neutral-700'),
            800: withOpacity('--neutral-800'),
            900: withOpacity('--neutral-900'),
            950: withOpacity('--neutral-950'),
            1000: withOpacity('--neutral-1000'),
          },
          slate: {
            50: withOpacity('--slate-50'),
            100: withOpacity('--slate-100'),
            200: withOpacity('--slate-200'),
            300: withOpacity('--slate-300'),
            400: withOpacity('--slate-400'),
            500: withOpacity('--slate-500'),
            600: withOpacity('--slate-600'),
            700: withOpacity('--slate-700'),
            800: withOpacity('--slate-800'),
            900: withOpacity('--slate-900'),
            950: withOpacity('--slate-950'),
            1000: withOpacity('--slate-1000'),
          },
          gray: {
            50: withOpacity('--gray-50'),
            100: withOpacity('--gray-100'),
            200: withOpacity('--gray-200'),
            300: withOpacity('--gray-300'),
            400: withOpacity('--gray-400'),
            500: withOpacity('--gray-500'),
            600: withOpacity('--gray-600'),
            700: withOpacity('--gray-700'),
            800: withOpacity('--gray-800'),
            900: withOpacity('--gray-900'),
            950: withOpacity('--gray-950'),
            1000: withOpacity('--gray-1000'),
          },
          zinc: {
            50: withOpacity('--zinc-50'),
            100: withOpacity('--zinc-100'),
            200: withOpacity('--zinc-200'),
            300: withOpacity('--zinc-300'),
            400: withOpacity('--zinc-400'),
            500: withOpacity('--zinc-500'),
            600: withOpacity('--zinc-600'),
            700: withOpacity('--zinc-700'),
            800: withOpacity('--zinc-800'),
            900: withOpacity('--zinc-900'),
            950: withOpacity('--zinc-950'),
            1000: withOpacity('--zinc-1000'),
          },
          emerald: {
            50: withOpacity('--emerald-50'),
            100: withOpacity('--emerald-100'),
            200: withOpacity('--emerald-200'),
            300: withOpacity('--emerald-300'),
            400: withOpacity('--emerald-400'),
            500: withOpacity('--emerald-500'),
            600: withOpacity('--emerald-600'),
            700: withOpacity('--emerald-700'),
            800: withOpacity('--emerald-800'),
            900: withOpacity('--emerald-900'),
            950: withOpacity('--emerald-950'),
            1000: withOpacity('--emerald-1000'),
          },
          red: {
            50: withOpacity('--red-50'),
            100: withOpacity('--red-100'),
            200: withOpacity('--red-200'),
            300: withOpacity('--red-300'),
            400: withOpacity('--red-400'),
            500: withOpacity('--red-500'),
            600: withOpacity('--red-600'),
            700: withOpacity('--red-700'),
            800: withOpacity('--red-800'),
            900: withOpacity('--red-900'),
            950: withOpacity('--red-950'),
            1000: withOpacity('--red-1000'),
          },
          green: {
            DEFAULT: withOpacity('--green'),
            50: withOpacity('--green-50'),
            100: withOpacity('--green-100'),
            200: withOpacity('--green-200'),
            300: withOpacity('--green-300'),
            400: withOpacity('--green-400'),
            500: withOpacity('--green-500'),
            600: withOpacity('--green-600'),
            700: withOpacity('--green-700'),
            800: withOpacity('--green-800'),
            900: withOpacity('--green-900'),
            950: withOpacity('--green-950'),
            1000: withOpacity('--green-1000'),
          },
          background: {
            DEFAULT: withOpacity('--background'),
            50: withOpacity('--background-50'),
            100: withOpacity('--background-100'),
            200: withOpacity('--background-200'),
            300: withOpacity('--background-300'),
            400: withOpacity('--background-400'),
            500: withOpacity('--background-500'),
            600: withOpacity('--background-600'),
            700: withOpacity('--background-700'),
            800: withOpacity('--background-800'),
            900: withOpacity('--background-900'),
            950: withOpacity('--background-950'),
            1000: withOpacity('--background-1000'),
          },
          foreground: {
            DEFAULT: withOpacity('--foreground'),
            50: withOpacity('--foreground-50'),
            100: withOpacity('--foreground-100'),
            200: withOpacity('--foreground-200'),
            300: withOpacity('--foreground-300'),
            400: withOpacity('--foreground-400'),
            500: withOpacity('--foreground-500'),
            600: withOpacity('--foreground-600'),
            700: withOpacity('--foreground-700'),
            800: withOpacity('--foreground-800'),
            900: withOpacity('--foreground-900'),
            950: withOpacity('--foreground-950'),
            1000: withOpacity('--foreground-1000'),
          },
          navigation: {
            DEFAULT: withOpacity('--navigation'),
            50: withOpacity('--navigation-50'),
            100: withOpacity('--navigation-100'),
            200: withOpacity('--navigation-200'),
            300: withOpacity('--navigation-300'),
            400: withOpacity('--navigation-400'),
            500: withOpacity('--navigation-500'),
            600: withOpacity('--navigation-600'),
            700: withOpacity('--navigation-700'),
            800: withOpacity('--navigation-800'),
            900: withOpacity('--navigation-900'),
            950: withOpacity('--navigation-950'),
            1000: withOpacity('--navigation-1000'),
          },
          primary: {
            DEFAULT: withOpacity('--primary'),
            foreground: withOpacity('--primary-foreground'),
            50: withOpacity('--primary-50'),
            100: withOpacity('--primary-100'),
            200: withOpacity('--primary-200'),
            300: withOpacity('--primary-300'),
            400: withOpacity('--primary-400'),
            500: withOpacity('--primary-500'),
            600: withOpacity('--primary-600'),
            700: withOpacity('--primary-700'),
            800: withOpacity('--primary-800'),
            900: withOpacity('--primary-900'),
            950: withOpacity('--primary-950'),
            1000: withOpacity('--primary-1000'),
          },
          secondary: {
            DEFAULT: withOpacity('--secondary'),
            foreground: withOpacity('--secondary-foreground'),
            50: withOpacity('--secondary-50'),
            100: withOpacity('--secondary-100'),
            200: withOpacity('--secondary-200'),
            300: withOpacity('--secondary-300'),
            400: withOpacity('--secondary-400'),
            500: withOpacity('--secondary-500'),
            600: withOpacity('--secondary-600'),
            700: withOpacity('--secondary-700'),
            800: withOpacity('--secondary-800'),
            900: withOpacity('--secondary-900'),
            950: withOpacity('--secondary-950'),
            1000: withOpacity('--secondary-1000'),
          },
          muted: {
            DEFAULT: withOpacity('--muted'),
            foreground: withOpacity('--muted-foreground'),
            50: withOpacity('--muted-50'),
            100: withOpacity('--muted-100'),
            200: withOpacity('--muted-200'),
            300: withOpacity('--muted-300'),
            400: withOpacity('--muted-400'),
            500: withOpacity('--muted-500'),
            600: withOpacity('--muted-600'),
            700: withOpacity('--muted-700'),
            800: withOpacity('--muted-800'),
            900: withOpacity('--muted-900'),
            950: withOpacity('--muted-950'),
            1000: withOpacity('--muted-1000'),
          },
          accent: {
            DEFAULT: withOpacity('--accent'),
            foreground: withOpacity('--accent-foreground'),
            50: withOpacity('--accent-50'),
            100: withOpacity('--accent-100'),
            200: withOpacity('--accent-200'),
            300: withOpacity('--accent-300'),
            400: withOpacity('--accent-400'),
            500: withOpacity('--accent-500'),
            600: withOpacity('--accent-600'),
            700: withOpacity('--accent-700'),
            800: withOpacity('--accent-800'),
            900: withOpacity('--accent-900'),
            950: withOpacity('--accent-950'),
            1000: withOpacity('--accent-1000'),
          },
          destructive: {
            DEFAULT: withOpacity('--destructive'),
            foreground: withOpacity('--destructive-foreground'),
            50: withOpacity('--destructive-50'),
            100: withOpacity('--destructive-100'),
            200: withOpacity('--destructive-200'),
            300: withOpacity('--destructive-300'),
            400: withOpacity('--destructive-400'),
            500: withOpacity('--destructive-500'),
            600: withOpacity('--destructive-600'),
            700: withOpacity('--destructive-700'),
            800: withOpacity('--destructive-800'),
            900: withOpacity('--destructive-900'),
            950: withOpacity('--destructive-950'),
            1000: withOpacity('--destructive-1000'),
          },
          popover: {
            DEFAULT: withOpacity('--popover'),
            foreground: withOpacity('--popover-foreground'),
            50: withOpacity('--popover-50'),
            100: withOpacity('--popover-100'),
            200: withOpacity('--popover-200'),
            300: withOpacity('--popover-300'),
            400: withOpacity('--popover-400'),
            500: withOpacity('--popover-500'),
            600: withOpacity('--popover-600'),
            700: withOpacity('--popover-700'),
            800: withOpacity('--popover-800'),
            900: withOpacity('--popover-900'),
            950: withOpacity('--popover-950'),
            1000: withOpacity('--popover-1000'),
          },
          card: {
            DEFAULT: withOpacity('--card'),
            foreground: withOpacity('--card-foreground'),
            50: withOpacity('--card-50'),
            100: withOpacity('--card-100'),
            200: withOpacity('--card-200'),
            300: withOpacity('--card-300'),
            400: withOpacity('--card-400'),
            500: withOpacity('--card-500'),
            600: withOpacity('--card-600'),
            700: withOpacity('--card-700'),
            800: withOpacity('--card-800'),
            900: withOpacity('--card-900'),
            950: withOpacity('--card-950'),
            1000: withOpacity('--card-1000'),
          },
          success: {
            DEFAULT: withOpacity('--success'),
            foreground: withOpacity('--success-foreground'),
            50: withOpacity('--success-50'),
            100: withOpacity('--success-100'),
            200: withOpacity('--success-200'),
            300: withOpacity('--success-300'),
            400: withOpacity('--success-400'),
            500: withOpacity('--success-500'),
            600: withOpacity('--success-600'),
            700: withOpacity('--success-700'),
            800: withOpacity('--success-800'),
            900: withOpacity('--success-900'),
            950: withOpacity('--success-950'),
            1000: withOpacity('--success-1000'),
          },
          border: {
            DEFAULT: withOpacity('--border'),
            50: withOpacity('--border-50'),
            100: withOpacity('--border-100'),
            200: withOpacity('--border-200'),
            300: withOpacity('--border-300'),
            400: withOpacity('--border-400'),
            500: withOpacity('--border-500'),
            600: withOpacity('--border-600'),
            700: withOpacity('--border-700'),
            800: withOpacity('--border-800'),
            900: withOpacity('--border-900'),
            950: withOpacity('--border-950'),
            1000: withOpacity('--border-1000'),
          },
          input: {
            DEFAULT: withOpacity('--input'),
            50: withOpacity('--input-50'),
            100: withOpacity('--input-100'),
            200: withOpacity('--input-200'),
            300: withOpacity('--input-300'),
            400: withOpacity('--input-400'),
            500: withOpacity('--input-500'),
            600: withOpacity('--input-600'),
            700: withOpacity('--input-700'),
            800: withOpacity('--input-800'),
            900: withOpacity('--input-900'),
            950: withOpacity('--input-950'),
            1000: withOpacity('--input-1000'),
          },
          ring: {
            DEFAULT: withOpacity('--ring'),
            50: withOpacity('--ring-50'),
            100: withOpacity('--ring-100'),
            200: withOpacity('--ring-200'),
            300: withOpacity('--ring-300'),
            400: withOpacity('--ring-400'),
            500: withOpacity('--ring-500'),
            600: withOpacity('--ring-600'),
            700: withOpacity('--ring-700'),
            800: withOpacity('--ring-800'),
            900: withOpacity('--ring-900'),
            950: withOpacity('--ring-950'),
            1000: withOpacity('--ring-1000'),
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
    plugins: [animatePlugin],
  }
)
