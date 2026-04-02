import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { Controller, type UseFormReturn } from 'react-hook-form'

import dotSquare from '@/assets/qrcodesDotsPreview/dotsSquare.svg'
import dotsMixed from '@/assets/qrcodesDotsPreview/dotsMixed.svg'
import dotsRounded from '@/assets/qrcodesDotsPreview/dotsRounded.svg'
import dotsFluid from '@/assets/qrcodesDotsPreview/dotsFluid.svg'

import cornersDotDot from '@/assets/qrCodeCornerPreview/cornersDotDot.svg'
import cornersDotSquare from '@/assets/qrCodeCornerPreview/cornersDotSquare.svg'
import cornersSquareDot from '@/assets/qrCodeCornerPreview/cornersSquareDot.svg'
import cornersSquareExtra from '@/assets/qrCodeCornerPreview/cornersSquareExtra.svg'
import type { QRCodeCustomizeFormData } from '../validations'
import { QRCodeDotStyleEnum } from '@/constants/qrCode'

const dots = [
  { value: QRCodeDotStyleEnum.SQUARE, src: dotSquare },
  { value: QRCodeDotStyleEnum.FLUID, src: dotsFluid },
  { value: QRCodeDotStyleEnum.MIXED, src: dotsMixed },
  { value: QRCodeDotStyleEnum.ROUNDED, src: dotsRounded },
]

const corners = [
  { value: 'dot', src: cornersDotDot },
  { value: 'dotSquare', src: cornersDotSquare },
  { value: 'squareDot', src: cornersSquareDot },
  { value: 'extra-rounded', src: cornersSquareExtra },
]

const itemClassName = "p-2 border-5 border-outline rounded-md bg-white cursor-pointer outline-none data-[state=checked]:border-primary-500 focus-visible:ring-2 focus-visible:ring-ring"

interface StyleCardProps {
  form: UseFormReturn<QRCodeCustomizeFormData>
}

export function StyleCard ({ form }: StyleCardProps) {
  return (
    <div>
      <h2 className="text-lg">Selecione o estilo</h2>
      <div className="mt-4">
        <h3 className="text-xxs text-card-foreground uppercase">Patterns</h3>
        <Controller
          control={form.control}
          name="dotsStyle"
          render={({ field }) => (
            <RadioGroupPrimitive.Root
              value={field.value}
              onValueChange={field.onChange}
              className="flex items-center gap-2 flex-wrap mt-2"
            >
              {dots.map(({ value, src }) => (
                <RadioGroupPrimitive.Item
                  key={value}
                  value={value}
                  className={itemClassName}
                >
                  <div className="overflow-hidden rounded-md">
                    <img src={src} className="size-15 rounded-md scale-300" />
                  </div>
                </RadioGroupPrimitive.Item>
              ))}
            </RadioGroupPrimitive.Root>
          )}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xxs text-card-foreground uppercase">Cantos</h3>
        <Controller
          control={form.control}
          name="cornersSquareStyle"
          render={({ field }) => (
            <RadioGroupPrimitive.Root
              value={field.value ?? ''}
              onValueChange={field.onChange}
              className="flex items-center gap-2 flex-wrap mt-2"
            >
              {corners.map(({ value, src }) => (
                <RadioGroupPrimitive.Item
                  key={value}
                  value={value}
                  className={itemClassName}
                >
                  <div className="overflow-hidden rounded-md">
                    <img src={src} className="size-10 rounded-md" />
                  </div>
                </RadioGroupPrimitive.Item>
              ))}
            </RadioGroupPrimitive.Root>
          )}
        />
      </div>
    </div>
  )
}
