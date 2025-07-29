import * as z from "zod";

export const schema =(translate: (id: string) => string) => z.object({
  email: z.email({ message: translate('signIn.errorEmailEmpty')}),
  password: z.string().min(1, {message: translate('signIn.errorPasswordEmpty')}),
});
export type ScheduleFormData = z.infer<ReturnType<typeof schema>>
