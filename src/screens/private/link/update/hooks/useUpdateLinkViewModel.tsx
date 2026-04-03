import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { updateLinkValidations, type UpdateLinkFormData } from "../validations";
import { useFindUrlByIdQuery, useUpdateUrlMutation } from "@/services/api/url/queries";
import { useEffect } from "react";

export function useUpdateLinkViewModel () {
  const id = useParams().id as string
  const navigate = useNavigate()
  
  const form = useForm<UpdateLinkFormData>({
    resolver: zodResolver(updateLinkValidations)
  })

  const { data } = useFindUrlByIdQuery(id)

  const { 
    mutateAsync, 
    isPending,
  } = useUpdateUrlMutation()

  useEffect(() => {
    if (!data) return

    form.reset({
      title: data.title || '',
      description: data.description || '',
      expireAt: data.expireAt ? new Date(data.expireAt) : null,
    })
  }, [data, form])

  async function handleSubmit (values: UpdateLinkFormData) {
    await mutateAsync({ id, payload: values })
    navigate(-1)
  }

  return {
    form,
    data,
    isPending,
    handleSubmit
  }
}
