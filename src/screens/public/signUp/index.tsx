
import { Spinner } from "@/components/spinner";
import { SignUpForm } from "./components/SignUpForm";
import { useSignUpViewModel } from "./hooks/useSignUpViewModel";
import { Button } from "@/components/Button";

export function SignUpScreen () {
  const viewModel = useSignUpViewModel()

  return (
    <main className="flex flex-col items-center justify-center h-full w-full min-h-dvh lg:p-6">
      <div
        className="w-full flex-1 lg:max-w-[650px] mx-auto  bg-card rounded-md border border-outline"
      >
        {viewModel.isSignUpSuccessful  && (
          <div className="p-6 flex flex-col gap-4 items-center justify-center min-h-[300px]">
            {viewModel.resendEmailConfirmationTokenMutation.isPending && (
              <Spinner size={50}/>
            )}
            {!viewModel.resendEmailConfirmationTokenMutation.isPending && (
              <>
                <strong className="text-xl">Verifique seu email</strong>
                <p className="text-center text-sm text-card-foreground">Enviamos um link de confirmação para <strong className="text-foreground">{viewModel.form.getValues('email')}</strong></p>
                <p className="px-4 py-6 bg-muted rounded w-full text-center text-card-foreground text-xs">Abra o email e clique no link para ativar sua conta. Verifique também a pasta de spam se não encontrar.</p>
                <span className="text-sm text-card-foreground">Não recebeu? <button 
                  className="text-link cursor-pointer"
                  onClick={viewModel.handleResendConfirmationEmail}
                >Reenviar</button></span>
                <div className="flex items-center justify-center pt-4 border-t border-outline w-full">
                  <Button
                    variant="text"
                    onClick={() => viewModel.handleReset()}
                    headIcon={{
                      name: 'ChevronLeft'
                    }}
                  >Recomeçar cadastro</Button>
                  <Button
                    variant="text"                    
                    tailIcon={{
                      name: 'ChevronRight'
                    }}
                  >Ir para o login</Button>
                </div>
              </>
            )}
          </div>
        )}
        {!viewModel.isSignUpSuccessful && (
          <div className="max-w-[650px] mx-auto">
            <SignUpForm 
              form={viewModel.form} 
              onSubmit={viewModel.handleSubmit} 
              isPending={viewModel.isPending} 
            />
          </div>
        )}
      </div>
    </main>
  )
}