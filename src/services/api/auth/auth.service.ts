import { api } from "..";
import type { Me, SignUpRequestPayload } from "./types";

function signUp (input: SignUpRequestPayload) {
  return api.post("/auth/sign-up", input)
}

async function me () {
  const { data } = await api.get<Me>("/auth/me")
  return data
}

export const authService = {
  signUp,
  me,
}