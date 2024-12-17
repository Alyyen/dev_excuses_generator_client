import { ExcuseType } from "./types/excuse.type";

export default async function fetchCurrentExcuse(
  currentHttpCode: string
): Promise<ExcuseType | string> {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.message;
  }
}
