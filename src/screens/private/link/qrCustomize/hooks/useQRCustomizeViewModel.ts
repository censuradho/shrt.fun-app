import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { qrCodeCustomizeValidations, type QRCodeCustomizeFormData } from "../validations";
import { useParams } from "react-router";
import { useFindUrlByIdQuery } from "@/services/api/url/queries";
import { useAuth } from "@/contexts/auth/auth.context";
import { PLANS_ENUM } from "@/constants/plans";

export function useQRCustomizeViewModel () {
  const { me } = useAuth()

  const id = useParams().id as string

  const {
    data: url
  } = useFindUrlByIdQuery(id)


  const form = useForm({
    resolver: zodResolver(qrCodeCustomizeValidations),
    defaultValues: {
      hasWaterMark: true
    },
    values: {
      hasWaterMark:  me?.plan.name === PLANS_ENUM.FREE,
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