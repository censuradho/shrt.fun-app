import { useWatch, type UseFormReturn } from "react-hook-form";
import type { QRCodeCustomizeFormData } from "../validations";
import { useGenerateQrCodePreviewMutation } from "@/services/api/url/queries";
import { useEffect } from "react";
import { QRCodePreview } from "../../create/components/QRCodePreview";

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
    mutate({
      ...(specs.dotsColor && ({
        dotsColor: specs.dotsColor,
      })),
      backgroundColor: specs.backgroundColor,
      dotsStyle: specs.dotsStyle,
      cornersDotStyle: specs.cornersDotStyle,
      cornersSquareStyle: specs.cornersSquareStyle,
      centerLogo: specs.centerLogo,
      hideWatermark: !specs.hasWaterMark,
    })
  }, [specs])

  return (
    <>
      <QRCodePreview 
        src={data?.qrCode || null} 
        isPending={isPending}
        size={18}
      />
    </>
  )
}