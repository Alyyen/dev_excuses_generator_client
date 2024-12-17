import { Tag } from "./enums/tag.enum";

export default async function createNewExcuse(
  httpCode: number | string,
  message: string,
  tag: Tag
) {
  const api = process.env.NEXT_PUBLIC_API;

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

  if (!response.ok) {
    const errorData = await response.json();
    return errorData.message || "An unexpected error occurred";
  }

  await response.json();
  return httpCode;
}
