import { useCustomizeQRCodeMutation, useFindUrlByIdQuery } from "@/services/api/url/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { qrCodeCustomizeValidations, type QRCodeCustomizeFormData } from "../validations";
import { useAuth } from "@/contexts/auth/auth.context";

export function useQRCustomizeViewModel () {
  const { isFree } = useAuth()

  const navigate = useNavigate()
  
  const {
    mutate,
    isPending
  } = useCustomizeQRCodeMutation()

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
      hasWaterMark: !(url?.qrCodeOptions?.hideWatermark) && !isFree,
      dotsColor: url?.qrCodeOptions?.dotsColor,
      backgroundColor: url?.qrCodeOptions?.backgroundColor,
      centerLogo: url?.qrCodeOptions?.centerLogo,
      cornersDotStyle: url?.qrCodeOptions?.cornersDotStyle as QRCodeCustomizeFormData['cornersDotStyle'],
      cornersSquareStyle: url?.qrCodeOptions?.cornersSquareStyle as QRCodeCustomizeFormData['cornersSquareStyle'],
      dotsStyle: url?.qrCodeOptions?.dotsStyle as QRCodeCustomizeFormData['dotsStyle'],
    },
    mode: 'onChange'
  })

  const handleSubmit = (data: QRCodeCustomizeFormData) => {
    mutate(
      { urlId: id, payload: {
        ...data,
        hideWatermark: !data.hasWaterMark
      } },
      { onSuccess: () => {
        toast.success('QR Code atualizado com sucesso!')
        navigate(-1)
      } 
      }
    )
  }

  return {
    form,
    isPending,
    handleSubmit,
  }
}