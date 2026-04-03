import { useWatch, type UseFormReturn } from "react-hook-form";
import type { QRCodeCustomizeFormData } from "../validations";
import { useGenerateQrCodePreviewMutation } from "@/services/api/url/queries";
import { useEffect } from "react";
import { QRCodePreview } from "../../create/components/QRCodePreview";
import { isValidHexColor } from "@/utils/validations";

interface QRCodePreviewCardProps {
  form: UseFormReturn<QRCodeCustomizeFormData>
}


export function QRCodePreviewCard ({ form }: QRCodePreviewCardProps) {
  const specs = useWatch({
    control: form.control,
  })

  const {
    data,
    isPending,
    mutate
  } = useGenerateQrCodePreviewMutation()

  useEffect(() => {

    const {
      backgroundColor,
      dotsColor,dotsStyle,
      cornersDotStyle,
      cornersSquareStyle,
      centerLogo,
      hasWaterMark
    } = specs

    if (backgroundColor && !isValidHexColor(backgroundColor || '') ) return
    if (dotsColor && !isValidHexColor(dotsColor || '') ) return
    
    mutate({
      ...(dotsColor && ({
        dotsColor,
      })),
      backgroundColor: backgroundColor,
      dotsStyle: dotsStyle,
      cornersDotStyle: cornersDotStyle,
      cornersSquareStyle: cornersSquareStyle,
      centerLogo: centerLogo,
      hideWatermark: !hasWaterMark,
    })
  }, [specs])

  return (
    <>
      <QRCodePreview 
        src={data?.qrCode || null} 
        isPending={isPending}
        size={300}
      />
    </>
  )
}