import { useCreateUrlMutation } from "@/services/api/url/queries";
import { slugify } from "@/utils/slugify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createLinkValidation, type CreateLinkFormData } from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";

interface SuccessModalData {
  shortUrl: string;
}

export function useCreateLinkViewModel () {
  const [successModal, setSuccessModal] = useState<SuccessModalData | null>(null);
  
  const form = useForm({
    resolver: zodResolver(createLinkValidation),
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
    form,
    isPending,
    successModal,
    setSuccessModal,
    handleGenerateSlug,
    handleSubmit
  }
}