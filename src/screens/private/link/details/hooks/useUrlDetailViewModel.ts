import { useFindUrlByIdQuery } from "@/services/api/url/queries";
import { useParams } from "react-router";

export function useUrlDetailViewModel() {
  const id = useParams().id as string;

  const {
    data,
    isPending
  } = useFindUrlByIdQuery(id)

  return {
    data,
    isPending
  }
}