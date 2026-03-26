import { useCreateUrlMutation } from "@/services/api/url/queries";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { createLinkValidation, type CreateLinkFormData } from "../validations";
import { useState } from "react";
import { slugify } from "@/utils/slugify";

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
      slug: data.slug || undefined,
      title: data.title || undefined
    }, {
      onSuccess: ({ data }) => {
        setSuccessModal(data)
      }
    })
  }

  const handleGenerateSlug = () => {
    const url = form.getValues('url')
    if (!url) {
      form.setError('slug', {
        message: 'Informe a URL de destino para gerar um slug'
      })
      return
    }
    const path = url
      .replace(/(^\w+:|^)\/\//, '')
      .split('/')
      .filter(Boolean)
      .slice(1)

    const slug = slugify(path.join('-') + '-' + Math.random().toString(36).substring(2, 8))

    form.setValue('slug', slug)
  }

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(handleSubmit)
    },
    isPending,
    successModal,
    setSuccessModal,
    handleGenerateSlug
  }
}