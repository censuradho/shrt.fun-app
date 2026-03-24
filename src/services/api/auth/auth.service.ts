import { api } from "..";
import type { SignUpRequestPayload } from "./types";

function signUp (input: SignUpRequestPayload) {
  return api.post("/auth/sign-up", input)
}

export const authService = {
  signUp,
}