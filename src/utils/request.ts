type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function request<T = any>(url: string): Promise<T>;
export function request<T = any>(url: string, method: HttpMethod): Promise<T>;
export function request<T = any>(
  url: string,
  method: HttpMethod,
  data: any
): Promise<T>;
export function request<T = any>(
  url: string,
  method?: HttpMethod,
  data?: any
): Promise<T> {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => res.json() as Promise<T>);
}
