import { ColorPickerHook } from '../../create/components/ColorPickerHook'
import { HexColorInputHook } from '@/components/hook/HexColorInputHook'
import { useFormState, type UseFormReturn } from 'react-hook-form'
import type { QRCodeCustomizeFormData } from '../validations'

interface ColorsCardProps {
  form: UseFormReturn<QRCodeCustomizeFormData>
}

export function ColorsCard ({ form }: ColorsCardProps) {
  const { errors } = useFormState({ control: form.control })
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
        />
        <HexColorInputHook
          control={form.control}
          name="backgroundColor"
          label="Background"
          errorMessage={errors.backgroundColor?.message}
        />
      </div>
    </div>
  )
}
