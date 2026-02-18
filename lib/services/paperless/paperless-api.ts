import { CONFIG } from "@/app/api/config";
import { ApiResponse } from "@/lib/types/paperless";


const AUTH = Buffer.from('admin:admin@P_123').toString('base64');

async function fetchApi<T>(endpoint: string, auth: string): Promise<ApiResponse<T>> {

try{

  const response = await fetch(`${CONFIG.PAPERLESS_API_BASE}${endpoint}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
      Accept:`application/json; version=9`,
    },
  })

    if (!response.ok) {
      throw new Error(`⚠ HTTP error! Status: ${response.status}`);
    }
    const data = await response.json() as T;
    return { data, success: true };
}
catch (error) {
    console.error(`⚠ Error fetching ${endpoint}:`, error);
    return {
      data: [] as unknown as T,
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
}

}



export const paperlessAPIService = {
    getDocuments:() => fetchApi('/api/documents/', AUTH),

}
