import { ImageBase64InputHook } from '@/components/hook/ImageBase64InputHook'
import { SwitchHook } from '@/components/hook/SwitchHook'
import { Icon } from '@/components/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { appConfig } from '@/config/app'
import { PLANS_LABELS } from '@/constants/plans'
import { useAuth } from '@/contexts/auth/auth.context'
import { type UseFormReturn } from 'react-hook-form'
import type { QRCodeCustomizeFormData } from '../validations'

interface AdvanceCardProps {
  form: UseFormReturn<QRCodeCustomizeFormData>
}

export function AdvanceCard ({ form }: AdvanceCardProps) {
  const { isFree } = useAuth()

  const lockTooltip = isFree ? (
    <Tooltip>
      <TooltipTrigger><Icon name="Lock" size={12} /></TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">
          Disponível apenas para usuários {PLANS_LABELS.GROWTH}
        </p>
      </TooltipContent>
    </Tooltip>
  ) : null

  return (
    <div>
      <h2 className="text-lg">Opções avançadas</h2>
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-lg mb-4">Branding</h3>
        <ImageBase64InputHook
          control={form.control}
          name="centerLogo"
          label="Logo central"
          disabled={isFree}
          tailLabel={lockTooltip}
        />
        <div className='mt-4'>
          <SwitchHook
            control={form.control}
            name="hasWaterMark"
            label={`${appConfig.name} marca d'água`}
            renderLabel
            disabled={isFree}
          />
        </div>
      </div>
    </div>
  )
}
