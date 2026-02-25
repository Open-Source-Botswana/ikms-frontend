
import { tokenService } from "../auth/token.service";


export const DTOKEN = process.env.NEXT_PUBLIC_DJANGO_BASE_ADMIN_TOKEN;
export const D_VERIFIER_1_TOKEN = process.env.NEXT_PUBLIC_DJANGO_BASE_VERIFIER_1_TOKEN


export async function fetchWithAuth<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {


    let token = tokenService.getAccessToken();
    if (!token && DTOKEN) {
        // console.info("ℹ️ Using default admin token from env.");
        console.info("ℹ️ Using default verifier token from env.");
        tokenService.setToken(DTOKEN);
        token = DTOKEN;
    }

    if (!token) {
        console.warn("⚠️ No token available for fetchWithAuth");
    }

    const headers: Record<string, string> = {
        // "Content-Type": "application/json",
        ...(init?.headers as Record<string, string> | undefined),
    };

    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    if (
        !headers['Content-Type'] &&
        init?.body &&
        typeof init.body === 'string'
    ) {
        headers['Content-Type'] = 'application/json';
    }

    // if (init?.body instanceof FormData) {
    //     delete headers['Content-Type'];
    // }

    // console.error(headers)

    const res = await fetch(input, { ...init, headers, });
    if (!res.ok) {
        const text = await res.text().catch(() => null);
        const error = new Error(`Fetch error: ${res.status} ${res.statusText} - ${text || 'No response body'}`);
        (error as any).status = res.status;
        throw error;
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {

        return res.json();
    }


    return (await res.text()) as unknown as T;
}


export async function fetchWithAuthMedia<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {


    let token = tokenService.getAccessToken();
    if (!token && DTOKEN) {
        // console.info("ℹ️ Using default admin token from env.");
        console.info("ℹ️ Using default verifier token from env.");
        tokenService.setToken(DTOKEN);
        token = DTOKEN;
    }


    const headers: Record<string, string> = {
        // "Content-Type": "application/json",
        ...(init?.headers as Record<string, string> | undefined),
    };

    const res = await fetch(input, { ...init, headers, credentials: 'same-origin' });
    if (!res.ok) {
        const text = await res.text().catch(() => null);
        const error = new Error(`Fetch error: ${res.status} ${res.statusText} - ${text || 'No response body'}`);
        (error as any).status = res.status;
        throw error;
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {

        return res.json();
    }


    return (await res.text()) as unknown as T;

};

export async function simpleFetcher<T = unknown>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers,
        },
    })
    const text = await res.text()

    if (!text) {
        return {} as T
    }

    try {

        const json = JSON.parse(text)


        if (!res.ok) {
            throw new Error(json.error?.message || `Request failed: ${res.status}`)
        }

        return json as T
    } catch (parseError) {

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`)
        }

        throw parseError
    }

}


export async function fetchWithMeta<T = unknown>(
  url: string,
  init?: RequestInit
): Promise<{ data: T; status: number; headers: Headers }> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : {}

  if (!res.ok) {
    throw new Error(data.error?.message || `Request failed: ${res.status}`)
  }

  return {
    data: data as T,
    status: res.status,
    headers: res.headers,
  }
}
