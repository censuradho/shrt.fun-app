import { useState } from "react";
import { TextField, type TextFieldProps } from "./TextField";

export function PasswordField (props: TextFieldProps) {
  const [isVIsible, setIsVisible] = useState(false)

  return (
    <TextField
      {...props}
      type={isVIsible ? "text" : "password"}
      tailIcon={{
        name: isVIsible ? "Eye" : "EyeOff",
        onClick: () => setIsVisible(!isVIsible)
      }}
    />
  )
}
