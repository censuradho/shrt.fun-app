import { useFindUrlByIdQuery, useGetQrCode } from "@/services/api/url/queries";
import { useParams } from "react-router";

export function useUrlDetailViewModel() {
  const id = useParams().id as string;

  const {
    data,
    isPending
  } = useFindUrlByIdQuery(id)

  const {
    data: qrCode,
    isPending: isGeneratingQrCode
  } = useGetQrCode(id)

  return {
    data,
    isPending,
    qrCode,
    isGeneratingQrCode
  }
}