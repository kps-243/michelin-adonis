interface StarProps {
  size?: number
}

export function MichelinStar({ size = 14 }: StarProps) {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" aria-hidden="true">
  <circle cx="100" cy="100" r="95" fill="#dc2626"/>

  <g transform="translate(100,100)">

    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="white" transform="rotate(0)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="white" transform="rotate(60)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="white" transform="rotate(120)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="white" transform="rotate(180)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="white" transform="rotate(240)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="white" transform="rotate(300)"/>

    <circle cx="0" cy="0" r="36" fill="#dc2626"/>

    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="none" stroke="#dc2626" stroke-width="8" transform="rotate(0)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="none" stroke="#dc2626" stroke-width="8" transform="rotate(60)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="none" stroke="#dc2626" stroke-width="8" transform="rotate(120)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="none" stroke="#dc2626" stroke-width="8" transform="rotate(180)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="none" stroke="#dc2626" stroke-width="8" transform="rotate(240)"/>
    <path d="M 0,-65 C 20,-65 36,-50 36,-30 C 36,-10 20,0 0,0 C -20,0 -36,-10 -36,-30 C -36,-50 -20,-65 0,-65 Z" fill="none" stroke="#dc2626" stroke-width="8" transform="rotate(300)"/>

  </g>
    </svg>
  )
}

interface StarsProps {
  count: number
  size?: number
  gap?: string
}

export function MichelinStars({ count, size = 14, gap = 'gap-0.5' }: StarsProps) {
  return (
    <span className={`inline-flex items-center ${gap}`}>
      {Array.from({ length: Math.max(0, count) }).map((_, i) => (
        <MichelinStar key={i} size={size} />
      ))}
    </span>
  )
}
