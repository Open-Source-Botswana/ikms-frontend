import { PaperlessService } from "@/lib/services/paperless/paperless";
import { NextResponse } from "next/server";


export async function GET(request: Request){

    const paperlessService = new PaperlessService(process.env.PAPERLESS_SEARCH_URL, process.env.PAPERLESS_API_TOKEN);
    try {
        console.log('Fetching documents from Paperless API...');
        const documents = await paperlessService.getDocuments();
        return new NextResponse(JSON.stringify(documents), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch documents' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}
