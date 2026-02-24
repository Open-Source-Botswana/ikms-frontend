import { PaperlessService } from "@/lib/services/paperless/paperless";
import { NextResponse } from "next/server"
import { CONFIG } from "../../config";

export async function POST(request: Request) {

      const paperlessService = new PaperlessService(CONFIG.PAPERLESS_API_BASE, CONFIG.PAPERLESS_API_TOKEN);

  try {
    console.log('➡️ Sending doc to Paperless API...');
    const formData = await request.formData()
    const documents = await paperlessService.addDocument(formData);
    // console.log("➡️ Request Completed:", documents)


    return new NextResponse(JSON.stringify(documents, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error posting document:', error);
    return new Response(JSON.stringify({ error: 'Failed to post document' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
