export default async function fetchRandomExcuse(): Promise<number> {
  const api = process.env.NEXT_PUBLIC_API;

  // get the "http_codes" already showed
  const stored = localStorage.getItem("http_codes");
  const http_codes_stored = stored ? JSON.parse(stored) : [];

  const apiRoute = `${api}/excuses/any?http_codes=${http_codes_stored}`;

  try {
    const response = await fetch(apiRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const newExcuseHttpCode = await response.json();

    // Store the new http_code in local storage
    const updatedHttpCodes = [...http_codes_stored, newExcuseHttpCode];
    localStorage.setItem("http_codes", JSON.stringify(updatedHttpCodes));

    // Return the http_code
    return newExcuseHttpCode;
  } catch (error: any) {
    return error.message;
  }
}
