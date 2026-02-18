import { CONFIG } from "@/app/api/config";


export class ValidationService {
    static validateEnvironment(): void {
        if (!CONFIG.PAPERLESS_API_BASE || CONFIG.PAPERLESS_API_TOKEN) {
            throw new Error("⚠ Missing required environment variables for Paperless API.");
        }
    }
}
