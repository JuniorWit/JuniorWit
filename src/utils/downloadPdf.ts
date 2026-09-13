import { recordBrochureDownload } from '../services/leadService';

/**
 * Downloads the official JuniorWit service brochure PDF safely.
 * Fetches the binary blob to ensure that the user receives an intact PDF file,
 * avoiding any proxy/HTML fallback corruption.
 */
export async function downloadBrochurePDF(): Promise<void> {
  const fileName = 'JuniorWit_실행력좋은주니어_서비스소개서_2026.pdf';
  const fileUrl = '/juniorwit-brochure.pdf';

  try {
    recordBrochureDownload();

    const response = await fetch(fileUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      throw new Error('Server returned HTML instead of PDF binary');
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    }, 1500);
  } catch (err) {
    console.warn('Blob download fallback triggered:', err);
    // Direct fallback
    const directLink = document.createElement('a');
    directLink.href = fileUrl;
    directLink.download = fileName;
    directLink.target = '_blank';
    document.body.appendChild(directLink);
    directLink.click();
    setTimeout(() => {
      document.body.removeChild(directLink);
    }, 1500);
  }
}
