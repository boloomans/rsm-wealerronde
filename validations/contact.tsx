import * as yup from "yup"

export const contactFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  tag: yup.string().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
})
