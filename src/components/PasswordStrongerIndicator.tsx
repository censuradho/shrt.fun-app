import { cn } from "@/lib/utils"
import { hasLowercaseCharacter, hasMinLength, hasNumber, hasSpecialCharacter, hasUppercaseCharacter } from "@/utils/passwordValidations"

interface PasswordStrongIndicatorProps {
  value: string
}

export function PasswordStrongIndicator({ value }: PasswordStrongIndicatorProps) {
  if (value.length === 0) return null
  
  const isValidMinLength = hasMinLength(value, 8)
  const isValidUppercase = hasUppercaseCharacter(value)
  const isValidLowercase = hasLowercaseCharacter(value)
  const isValidNumber = hasNumber(value)
  const isValidSpecialCharacter = hasSpecialCharacter(value)

  const validations = [
    isValidMinLength,
    isValidUppercase,
    isValidLowercase,
    isValidNumber,
    isValidSpecialCharacter,
  ]

  const validCount = validations.filter(Boolean).length


  const strengthColor = {
    'bg-destructive': validCount <= 1,
    'bg-warn': validCount > 1 && validCount <= 3,
    'bg-success': validCount > 3,
    'bg-blitzit-teal': validCount > 4,
  }

  const strengthLabel = {
    'Fraca': validCount <= 1,
    'Média': validCount > 1 && validCount <= 3,
    'Forte': validCount > 3 && validCount <= 4,
    'Muito Forte': validCount > 4,
  }

  const strengthLabelColor = {
    'text-destructive': validCount <= 1,
    'text-warn': validCount > 1 && validCount <= 3,
    'text-success': validCount > 3,
    'text-blitzit-teal': validCount > 4,
  }

  const totalStrength = validations.map((_, index) => (
    <div
      key={index}
      className={cn(
        'w-full h-1 rounded bg-muted',
        index < validCount && strengthColor
      )}
    />
  ))

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex gap-2 ">
          {totalStrength}
        </div>
        <p className={cn(strengthLabelColor, 'text-sm')}>{cn(strengthLabel)}</p>

      </div>
      <ul className="text-xs list-disc pl-8 text-muted-foreground bg-muted p-2 rounded">
        <li 
          className={cn({
            'text-blitzit-teal': isValidMinLength,
          })}
        >Mínimo 8 caracteres</li>
        <li className={cn({
          'text-blitzit-teal': isValidUppercase,
        })}>Contém letras maiúsculas</li>
        <li className={cn({
          'text-blitzit-teal': isValidLowercase,
        })}>Contém letras minúsculas</li>
        <li className={cn({
          'text-blitzit-teal': isValidNumber,
        })}>Contém números</li>
        <li className={cn({
          'text-blitzit-teal': isValidSpecialCharacter,
        })}>Contém caracteres especiais</li>
      </ul>
    </div>
  )
}