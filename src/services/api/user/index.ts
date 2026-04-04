import { api } from ".."
import type { UpdateUsernameRequestPayload } from "./types"

async function updateUsername (payload: UpdateUsernameRequestPayload) {
  return api.patch('/users/username', payload)
}

export const userService = {
  updateUsername
}