import React from "react"
import { FieldSet } from "../ui/field"

interface props {
  children: React.ReactNode
}

/**
 * Returns some JSX surrounding a form. Used for pages that contain
 * a form, as they have the same form styling.
 * @param children
 */
const FormWrapper = ({ children }: props) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <FieldSet className="mx-auto flex w-full max-w-sm flex-col">
        {children}
      </FieldSet>
    </div>
  )
}

export default FormWrapper
