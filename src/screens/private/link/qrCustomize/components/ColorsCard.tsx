import { HexColorInputHook } from '@/components/hook/HexColorInputHook'
import { Icon } from '@/components/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { PLANS_LABELS } from '@/constants/plans'
import { useAuth } from '@/contexts/auth/auth.context'
import { useFormState, type UseFormReturn } from 'react-hook-form'
import { ColorPickerHook } from '../../create/components/ColorPickerHook'
import type { QRCodeCustomizeFormData } from '../validations'
interface ColorsCardProps {
  form: UseFormReturn<QRCodeCustomizeFormData>
}

export function ColorsCard ({ form }: ColorsCardProps) {
  const { isFree } = useAuth()

  const { errors } = useFormState({ control: form.control })


  const renderTooltipLockInfo = () => {
    if (!isFree) return null

    return (
      <Tooltip>
        <TooltipTrigger><Icon name="Lock" size={12} /></TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            Personalizar as cores do QR Code é um recurso disponível apenas para usuários {PLANS_LABELS.GROWTH}
          </p>
        </TooltipContent>
      </Tooltip>
    )
  }
  
  return (
    <div>
      <h2 className="text-lg">Escolha suas cores</h2>
      <div className="mt-4">
        <h3 className="text-xxs text-card-foreground uppercase">Preset</h3>
        <div className='mt-2'>
          <ColorPickerHook
            control={form.control}
            name="dotsColor"
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">

        <HexColorInputHook
          control={form.control}
          name="dotsColor"
          label="Code"
          errorMessage={errors.dotsColor?.message}
          disabled={isFree}
          tailLabel={renderTooltipLockInfo()}
        />
        <HexColorInputHook
          control={form.control}
          name="backgroundColor"
          label="Background"
          disabled={isFree}
          errorMessage={errors.backgroundColor?.message}
          tailLabel={renderTooltipLockInfo()}
        />
      </div>
    </div>
  )
}
