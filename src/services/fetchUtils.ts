export function makeOptions(method: string, body: object | null, addToken: boolean = true): RequestInit {
  const opts: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  
  if (body) {
    opts.body = JSON.stringify(body);
  }
  
  if (addToken) {
    const token = localStorage.getItem("token");
    if (token) {
      //@ts-ignore
      opts.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  
  console.log("opts", opts, "body", body);
  return opts;
}

/**
 * Utility Method to handle http-errors returned as a JSON-response with fetch
 * Meant to be used in the first .then() clause after a fetch-call
 */
export async function handleHttpErrors(res: Response) {
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }
    
    const errorResponse = await res.json();
    const msg = errorResponse.message ? errorResponse.message : "No details provided";
    throw new Error(msg);
  }
  return res.json();
}