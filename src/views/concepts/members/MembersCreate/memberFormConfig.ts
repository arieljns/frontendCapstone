import { z } from 'zod'

export const memberSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Enter a valid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
    role: z.enum(['user', 'admin'], {
        required_error: 'Role is required',
    }),
})

export type MemberFormValues = z.infer<typeof memberSchema>

export const defaultMemberValues: MemberFormValues = {
    email: '',
    password: '',
    role: 'user',
}
