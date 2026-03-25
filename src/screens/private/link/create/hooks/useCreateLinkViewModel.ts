import { useCreateUrlMutation } from "@/services/api/url/queries";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { createLinkValidation, type CreateLinkFormData } from "../validations";
import { useState } from "react";

interface SuccessModalData {
  shortUrl: string;
}

export function useCreateLinkViewModel () {
  const [successModal, setSuccessModal] = useState<SuccessModalData | null>(null);
  
  const form = useForm<CreateLinkFormData>({
    resolver: standardSchemaResolver(createLinkValidation),
    mode: 'onChange'
  })

  const {
    mutate,
    isPending
  } = useCreateUrlMutation()
  const handleSubmit = (data: CreateLinkFormData) => {
    mutate({
      url: data.url,
      slug: data.slug || undefined
    }, {
      onSuccess: ({ data }) => {
        setSuccessModal(data)
      }
    })
  }

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(handleSubmit)
    },
    isPending,
    successModal,
    setSuccessModal
  }
}