interface Props {
  children: React.ReactNode
  className?: string
  hidden?: boolean
}

export default function SecondaryTitle({ children, className = '', hidden = false }: Props) {
  return (
    <div className={className}>
      {!hidden && <div className="w-10 h-0.75 bg-red-primary mb-3 rounded-sm" />}
      <h2 className={`font-title text-[1.375rem] font-semibold leading-tight ${hidden ? 'text-red-primary!' : 'text-gray-900! dark:text-white!'}`}>
        {children}
      </h2>
    </div>
  )
}
