import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { qrCodeCustomizeValidations } from "../validations";

export function useQRCustomizeViewModel () {
  const form = useForm({
    resolver: zodResolver(qrCodeCustomizeValidations),
    defaultValues: {
      watermarkLogo: true
    },
    mode: 'onChange'
  })


  return {
    form,
  }
}