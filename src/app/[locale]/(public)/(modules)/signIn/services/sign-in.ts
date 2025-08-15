import { ScheduleFormData } from "../schema/signIn.schema";
export const submitLogin = async (data: ScheduleFormData, locale: string, error: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
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
     window.location.href = `/${locale}/Home`;
  } catch (error) {
     throw error;
  }
}

