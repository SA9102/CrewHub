import { signIn } from "@/auth"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const SignIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <FieldSet className="mx-auto flex w-full max-w-sm flex-col">
        {/* <FieldLegend>Sign In</FieldLegend> */}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              autoComplete="off"
              aria-invalid
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              aria-invalid
            />
          </Field>
          <Button>Sign In</Button>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

export default SignIn
