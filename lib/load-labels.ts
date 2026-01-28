import fs from 'fs';
import path from 'path';
import { LabelsData } from './types/labels';

const IKMS_LABELS_PATH = path.join(
  process.cwd(),
  'public',
  'data',
  'ikmslabels.json'
);

export async function loadLabelsData(): Promise<LabelsData> {
  try {

    console.log('🔍 [loadLabelsData] Starting to load labels from:', IKMS_LABELS_PATH);
    if (!fs.existsSync(IKMS_LABELS_PATH)) {
      console.error('❌ [loadLabelsData] ERROR: File does NOT exist at path:', IKMS_LABELS_PATH);
    }

    const fileContents = fs.readFileSync(IKMS_LABELS_PATH, 'utf8');
    console.log(`📄 [loadLabelsData] File read successfully. Size: ${fileContents.length} chars`);

    if (fileContents.trim() === '') {
      console.warn('⚠️ [loadLabelsData] WARNING: File is empty!');
      return {};
    }

        let parsedData;
    try {
      parsedData = JSON.parse(fileContents);
      console.log('🧩 [loadLabelsData] JSON parsed successfully. Type:', typeof parsedData);
    } catch (parseError) {
      console.error('💥 [loadLabelsData] FAILED to parse JSON:', parseError);
      console.error('Raw content preview:', fileContents.substring(0, 200));
      return {};
    }

    if (typeof parsedData !== 'object' || parsedData === null || Array.isArray(parsedData)) {
      console.error(
        '🚫 [loadLabelsData] INVALID structure: expected non-null object, got:',
        parsedData
      );
      return {};
    }

    const keys = Object.keys(parsedData);
    console.log(`📊 [loadLabelsData] Loaded ${keys.length} label(s):`, keys);

    if (keys.length > 0) {
      const firstLabel = parsedData[keys[0]];
      console.log('🧪 [loadLabelsData] Sample label:', {
        id: firstLabel?.id,
        label_domain: firstLabel?.label_domain,
        title: firstLabel?.title?.substring(0, 50) + '...',
      });
    }

    return parsedData as LabelsData;
  } catch (error) {
    console.error('🔥 [loadLabelsData] UNEXPECTED ERROR during loading:', error);
  }
  return {};
}
