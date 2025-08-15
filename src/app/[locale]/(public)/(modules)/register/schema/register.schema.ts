import * as z from "zod";

export const registerSchema = (translate: (id: string) => string) => z.object({
  name: z.string({ message: 'shouldNotToBeEmpty' }),
  surname: z.string({ message: 'shouldNotToBeEmpty' }),
  email: z.email({ message: translate('errorEmailEmpty')}),
  password: z.string().min(1, {message: translate('errorPasswordEmpty')}),
});
export type RegisterScheduleFormData = z.infer<ReturnType<typeof registerSchema>>
