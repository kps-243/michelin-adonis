interface Props {
  children: React.ReactNode
}

export default function PrimaryTitle({ children = '' }: Props) {
  return (
      <h1 className="font-title text-[1.75rem] font-semibold leading-tight text-gray-900 dark:text-white">
        {children}
      </h1>
  )
}
