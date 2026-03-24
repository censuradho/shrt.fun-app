import type { UseFormRegisterReturn } from "react-hook-form";
import { PasswordField } from "../form/PasswordField";
import type { TextFieldProps } from "../form/TextField";

type PasswordFieldHookProps = TextFieldProps & {
  register: UseFormRegisterReturn
}

export function PasswordFieldHook (props: PasswordFieldHookProps) {
  const { register, ...otherProps } = props;
  
  return (
    <PasswordField
      placeholder="••••••••"
      {...otherProps}
      {...register}
      onBlur={(event) => {
        register.onBlur(event)
        otherProps.onBlur?.(event)
      }}
    />
  );
}
