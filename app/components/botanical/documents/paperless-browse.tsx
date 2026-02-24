
"use client"
import { DisplayDocument } from '@/lib/types/paperless'
import React, { useEffect, useState } from 'react'

export default function DocumentsPaperlessBrowse() {
    const [allDocuments, setAllDocuments] = useState<DisplayDocument[]>([])

    async function fetchData() {
        try {
            const response = await fetch('/api/documents');

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(` ⚠ HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const unexpectedResponse = await response.text();
                throw new TypeError(` ⚠ Expected JSON response, but received: ${unexpectedResponse}`);
            }

            const data = await response.json();
            console.log('Fetched data:', data);
            const documents: DisplayDocument[] = data.results?.map((doc: any) => ({
                id: doc.id.toString(),
                // classification: doc.archive_serial_number ?? "Unclassified",
                tags: doc.tags.map((tagId: number) => tagId.toString()),
                title: doc.title || doc.original_file_name,
                description: doc.content?.slice(0, 200) ?? "", // first 200 chars, adjust as needed
                documentType: doc.document_type?.toString() ?? "",
                date: doc.added || doc.created || doc.modified,
                pages: doc.page_count,
                uploader: doc.owner?.toString() ?? "",
            }))
            setAllDocuments(documents || [])
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);

        }
    }


    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='mt-28'>
            paperless-browse
            {/* Display document count */}
            <p>Number of documents: {allDocuments.length}</p>

        </div>
    )
}
