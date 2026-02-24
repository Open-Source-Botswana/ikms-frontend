import { CONFIG } from "@/app/api/config";

export const BASE_URL = process.env.DJANGO_BASE_URL || 'http://localhost:8000';
export const API_BASE_URL = `${BASE_URL}/api/`;
export const DTOKEN = process.env.NEXT_PUBLIC_DJANGO_BASE_ADMIN_TOKEN;


export const API_ENDPOINTS = {
    user: {
        token: `${API_BASE_URL}auth/token/`,
    },
    sites: {
        getAllSites: `${API_BASE_URL}sites/sites`,
        createSite: `${API_BASE_URL}sites/sites/`,
        getSiteById: (id: number) => `${API_BASE_URL}sites/sites/${id}/`,
        updateSite: (id: string) => `${API_BASE_URL}sites/sites/${id}/`,
        deleteSite: (id: string) => `${API_BASE_URL}sites/sites/${id}/`,
        submitVote: (id: number) => `${API_BASE_URL}sites/sites/${id}/submit_verification/`,
        getVotesBySiteId: (id: number) => `${API_BASE_URL}sites/verification-votes/${id}/site/`,
        getVerificationLogsBySiteId: (id: number) => `${API_BASE_URL}sites/verification-logs/${id}/verification-logs/`,
    },
    paperless: {
        uploadDocument: `${CONFIG.PAPERLESS_API_BASE}/api/documents/post_document/`
    }
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
export type EndpointKey = keyof ApiEndpoints;
export type SiteEndpointKey = keyof ApiEndpoints['sites'];
