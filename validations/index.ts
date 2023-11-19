import { z } from 'zod'
export const LoginValidations = z.object({
    username: z.string().min(1, { message: "Harus di isi" }),
    password: z.string().min(1, { message: "Harus di isi" })
})

export type LoginValidationsType = z.infer<typeof LoginValidations>