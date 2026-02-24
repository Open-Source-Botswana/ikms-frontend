import { ApiResponse, PaperlessDocument } from "@/lib/types/paperless";
import { paperlessAPIService } from "./paperless-api";
import { API_ENDPOINTS } from "@/lib/constants/apiEndpoints";


export class PaperlessService {

    private baseUrl: string;
    private apiToken: string;

    constructor(baseUrl?: string, apiToken?: string) {

        if (!baseUrl || !apiToken) {
            throw new Error('Missing required environment variables: PAPERLESS_SEARCH_URL and PAPERLESS_API_TOKEN');
        }
        this.baseUrl = baseUrl;
        this.apiToken = apiToken;

    }

    private async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {

        console.log("➡️ Initializing request:")
        console.log(`➡️ Request URL: ${url}`)

        const response = await fetch(url, {
            headers: {
                Authorization: `Token ${this.apiToken}`,
                Accept: 'application/json; version=6',
            },
            ...options
        });

        if (!response.ok) {
            console.log("➡️ Found error from request:")
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        return response;
    }

    async addDocument(doc: FormData) {

        return this.makeRequest(`${API_ENDPOINTS.paperless.uploadDocument}`, {
            method: 'POST',
            body: doc,
        });
    }
    async getDocuments(): Promise<PaperlessDocument[] | null> {
        try {
            const response = await paperlessAPIService.getDocuments();
            return response.data as PaperlessDocument[];
        } catch (error) {
            console.error(`Error fetching document:`, error);
            return null;
        }
    }

}
