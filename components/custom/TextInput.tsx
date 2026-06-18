import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

// FIXME - fix the props of 'form' and 'setForm'
interface props {
  label: string
  type: "text" | "email" | "password"
  field: string
  //   value: any
  form: any
  setForm: any
  tooltip?: React.ReactNode
}

/**
 * Controlled text input for a form. Abstracts much of the boilerplate code.
 * @param label {string}
 * @returns
 */
const TextInput = ({ label, type, field, form, setForm, tooltip }: props) => {
  /**
   * Converts the given label to kebab-case. Used in the 'id' and
   * 'name' attributes of the 'Input' component.
   */
  const labelToName = () => {
    return label.toLowerCase().split(" ").join("-")
  }

  return (
    <Field>
      <FieldLabel htmlFor="organisation-name">
        {label}
        {tooltip}
      </FieldLabel>
      <Input
        id={labelToName()}
        name={labelToName()}
        type={type}
        autoComplete="off"
        aria-invalid
        value={form.field}
        onChange={(e) => {
          console.log("FORM")
          console.log(field)
          setForm({ ...form, [field]: e.target.value })
        }}
      />
    </Field>
  )
}

export default TextInput
