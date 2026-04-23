import { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'soft' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center font-title font-medium rounded-md ' +
    'transition-colors duration-150 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2 ' +
    'disabled:opacity-100 disabled:cursor-not-allowed'

  const variants: Record<Variant, string> = {
    primary:
      'bg-red-primary text-white hover:bg-red-secondary active:bg-red-secondary ' +
      'disabled:bg-gray-300 disabled:text-gray-500',
    soft:
      'bg-red-primary/30 text-white hover:bg-red-secondary/60 active:bg-red-secondary/70 ' +
      'disabled:bg-red-primary/25',
    ghost:
      'bg-transparent text-red-primary hover:bg-red-secondary/10 hover:text-red-secondary ' +
      'disabled:text-gray-400',
  }

  const sizes: Record<Size, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-base',
  }

  const width = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`.trim()}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
