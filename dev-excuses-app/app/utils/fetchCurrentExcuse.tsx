import { Excuse } from "./excuse.type";

export default async function fetchCurrentExcuse(
  currentHttpCode: string
): Promise<Excuse | number | null> {
  const api = process.env.NEXT_PUBLIC_API;

  try {
    const response = await fetch(`${api}/excuses/${currentHttpCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const excuse = await response.json();
    return excuse;
  } catch (error) {
    return 404;
  }
}
