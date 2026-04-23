interface Props {
  image: string
  badge?: string
  className?: string
}

export default function NewSection({ image, badge = 'Nos nouveauté', className = '' }: Props) {
  return (
    <div className={`relative w-full h-48 lg:h-64 rounded-2xl overflow-hidden ${className}`}>
      <img
        src={image}
        alt={badge}
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
      <span className="absolute bottom-3.5 left-3.5 bg-red-primary text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
        {badge}
      </span>
    </div>
  )
}
