import { type UseFormReturn } from 'react-hook-form'
import type { QRCodeCustomizeFormData } from '../validations'
import { SwitchHook } from '@/components/hook/SwitchHook'
import { appConfig } from '@/config/app'

interface AdvanceCardProps {
  form: UseFormReturn<QRCodeCustomizeFormData>
}

export function AdvanceCard ({ form }: AdvanceCardProps) {
  return (
    <div>
      <h2 className="text-lg">Opções avançadas</h2>
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-xxs text-card-foreground uppercase">Branding</h3>
        <SwitchHook 
          control={form.control}
          name="watermarkLogo"
          label={`${appConfig.name} logo`}
          disabled
          renderLabel
        />
      </div>
    </div>
  )
}
