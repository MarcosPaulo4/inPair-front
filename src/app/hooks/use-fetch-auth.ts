export async function useFetchAuth<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T | null> {
  const makeRequest = async (): Promise<Response> => {
    return fetch(input, {
      ...init,
      credentials: 'include',
    })
  }
    let response = await makeRequest();

    if (response.status === 401) {
      const refreshResponse = await fetch(`${process.env.API_URL}/refresh`, {
        method: 'POST',
        credentials: 'include',
      })

      if (refreshResponse.ok) {
        response = await makeRequest()
      }
      
      if (!response.ok) {
           const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Erro na requisição autenticada');
      }
    }

return response.json() as Promise<T>

}