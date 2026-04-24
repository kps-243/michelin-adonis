import { FormEvent, useState } from 'react'
import Button from './Button'

interface Props {
  /** Texte affiché dans l'input quand vide */
  placeholder?: string
  /** Texte du bouton de soumission */
  buttonLabel?: string
  /** Valeur initiale (mode non-contrôlé) ou contrôlée (avec onChange) */
  value?: string
  /** Si fourni, le composant devient contrôlé */
  onChange?: (value: string) => void
  /** Callback déclenché à la soumission (Enter ou clic sur le bouton) */
  onSearch: (query: string) => void
  /** Classes additionnelles sur le wrapper */
  className?: string
}

export default function SearchBar({
  placeholder = 'Rechercher...',
  buttonLabel = 'Rechercher',
  value: controlledValue,
  onChange,
  onSearch,
  className = '',
}: Props) {
  const [internalValue, setInternalValue] = useState('')
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  const isEmpty = value.trim().length === 0

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-1 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-1 ${className}`.trim()}
      role="search"
    >
      <input
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="
          flex-1 min-w-0
          bg-transparent
          px-3 py-2
          text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400
          focus:outline-none
        "
      />
      <Button type="submit" variant="soft" size="sm" disabled={isEmpty}>
        {buttonLabel}
      </Button>
    </form>
  )
}
