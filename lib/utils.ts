import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/**
 * Returns a Response with an error message and 400 status code, if the field value is invalid
 * @param {string} field - The field of the text that is being tested against
 * @param {string} text - The text on which the regex will be tested against
 * @param {RegExp} regex - The regular expression that will be used to test the text
 * @returns {Response}
 */
export const hasFailedRegex = (field: string, text: string, regex: RegExp) => {
  if (!regex.test(text)) {
    return Response.json({ error: `${field} is invalid` }, { status: 400 })
  }

  return null
}
