import DefaultTranslator from "@/i18n/default.translator";

export default function useApi() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  async function get(url: string) {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers,
    });
    await handleError(response);
    return response.json();
  }

  async function post<T>(url: string, body: T) {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    await handleError(response);
    return response.json();
  }

  async function handleError(response: Response) {
    if (!response.ok) {
      const json = await response.json();
      const translatedMessages = json.errors.split(",").map((msg: string) => {
        return new DefaultTranslator().translate(msg);
      });
      throw new Error(translatedMessages ?? "Erro desconhecido");
    }
  }

  return { post, get };
}
