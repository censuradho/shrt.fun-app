import { AxiosError } from "axios";
import { API_ERROR_MESSAGES } from "./errors";
import { toast } from "sonner";

export function toastifyApiErrorMessage (error: unknown) {
  const isAxiosError = error instanceof AxiosError

  if (!isAxiosError) return;

  const message = API_ERROR_MESSAGES?.[error.response?.data?.message as keyof typeof API_ERROR_MESSAGES] || 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'

  toast.error(
    <div className="flex flex-col">
      {message.title && (
        <strong>{message.title}</strong>
      )}
      <p className="font-normal">{message.description}</p>
    </div>
  )
}