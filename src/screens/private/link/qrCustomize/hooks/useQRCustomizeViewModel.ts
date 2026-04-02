import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { qrCodeCustomizeValidations, type QRCodeCustomizeFormData } from "../validations";
import { useParams } from "react-router";
import { useFindUrlByIdQuery } from "@/services/api/url/queries";

export function useQRCustomizeViewModel () {
  const id = useParams().id as string

  const {
    data: url
  } = useFindUrlByIdQuery(id)


  const form = useForm({
    resolver: zodResolver(qrCodeCustomizeValidations),
    defaultValues: {
      watermarkLogo: true
    },
    values: {
      watermarkLogo: !!url?.qrCodeOptions?.watermarkLogo,
      dotsColor: url?.qrCodeOptions?.dotsColor,
      backgroundColor: url?.qrCodeOptions?.backgroundColor,
      centerLogo: url?.qrCodeOptions?.centerLogo,
      cornersDotStyle: url?.qrCodeOptions?.cornersDotStyle as QRCodeCustomizeFormData['cornersDotStyle'],
      cornersSquareStyle: url?.qrCodeOptions?.cornersSquareStyle as QRCodeCustomizeFormData['cornersSquareStyle'],
      dotsStyle: url?.qrCodeOptions?.dotsStyle as QRCodeCustomizeFormData['dotsStyle'],
    },
    mode: 'onChange'
  })

  return {
    form,
  }
}