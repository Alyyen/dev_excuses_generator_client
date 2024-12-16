import { Tag } from "./tag.enum";

export default async function createNewExcuse(
  httpCode: number | string,
  message: string,
  tag: Tag
) {
  const api = process.env.NEXT_PUBLIC_API;

  try {
    const response = await fetch(`${api}/excuses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        http_code: httpCode,
        message: message,
        tag: tag,
      }),
    });

    await response.json();
    return httpCode;
  } catch (error) {
    console.log({ error });
    return "Error while creating new excuse";
  }
}
