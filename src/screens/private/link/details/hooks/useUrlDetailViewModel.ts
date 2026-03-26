import { useFindHistCountByLocationQuery } from "@/services/api/analytics/queries";
import { useFindUrlByIdQuery } from "@/services/api/url/queries";
import { useParams } from "react-router";

export function useUrlDetailViewModel() {
  const id = useParams().id as string;

  const hitsCountByLocation = useFindHistCountByLocationQuery(id)

  const {
    data,
    isPending
  } = useFindUrlByIdQuery(id)

  return {
    data,
    isPending,
    hitsCountByLocation
  }
}