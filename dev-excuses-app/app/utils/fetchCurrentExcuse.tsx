import { ExcuseType } from "./excuse.type";

export default async function fetchCurrentExcuse(
  currentHttpCode: string
): Promise<ExcuseType | number | null> {
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
    console.log({ error });
    return 404;
  }
}
