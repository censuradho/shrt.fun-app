import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from ".";
import type { UpdateUsernameRequestPayload } from "./types";

export function useUpdateUsernameMutation() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (payload: UpdateUsernameRequestPayload) => userService.updateUsername(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  })

  return mutation;
}