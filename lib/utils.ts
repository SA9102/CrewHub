import { prisma } from "@/prisma"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { verifyPassword } from "./auth"

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

/**
 * Returns a Response with an error message and 400 status code, if a given
 * first/last name is invalid. Returns null otherwise.
 * This is meant to be used within a route.ts API file.
 * @param {string} text - The text on which the regex will be tested against
 */
export const isValidName = (text: string) => {
  // ChatGPT-generated regex for checking name criteria
  const regex = /^[a-zA-Z\s'-]{2,50}$/

  // ChatGPT-generated regex for checking password criteria
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-+=?]).{8,}$/

  if (!regex.test(text)) {
    return Response.json({ error: "First/last name is invalid", status: 400 })
  }

  return null
}

/**
 * Returns a Response with an error message and 400 status code, if a given
 * password is invalid. Returns null otherwise.
 * This is meant to be used within a route.ts API file.
 * @param {string} text - The text on which the regex will be tested against
 */
export const isValidPassword = (text: string) => {
  // ChatGPT-generated regex for checking password criteria
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-+=?]).{8,}$/

  if (!regex.test(text)) {
    return Response.json({
      error: "Password does not match criteria",
      status: 400,
    })
  }

  return null
}
