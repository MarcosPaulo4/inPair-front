import { RegisterScheduleFormData } from "../schema/register.schema";

export const submitRegister = async (data: RegisterScheduleFormData, locale: string, error: string) => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      });
    if (!response.ok) {
      throw new Error(error);
    }
     window.location.href = `/${locale}/login`;
  } catch (error) {
     throw error;
}
}