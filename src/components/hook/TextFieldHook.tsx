import type { UseFormRegisterReturn } from "react-hook-form";
import { TextField, type TextFieldProps } from "../form/TextField";

type TextFieldHookProps = TextFieldProps & {
  register: UseFormRegisterReturn
}

export function TextFieldHook (props: TextFieldHookProps) {
  const { register, ...otherProps } = props;
  return (
    <TextField
      {...register}
      {...otherProps}
    />
  );
}