import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import templateHTML from './template';
import templateHTML2 from './template2';

interface DataInterface {
  [key: string]: string;
}

function processTemplate(data: DataInterface, templateHTML: string): string {
  let html = templateHTML;
  Object.keys(data).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
  });
  return html;
}

async function printDocument(data: DataInterface) {
  const processedHTML1 = processTemplate(data, templateHTML);
  const processedHTML2 = processTemplate(data, templateHTML2);

  const tempDiv1 = document.createElement('div');
  tempDiv1.innerHTML = processedHTML1;
  const input1 = tempDiv1.children[0];

  const tempDiv2 = document.createElement('div');
  tempDiv2.innerHTML = processedHTML2;
  const input2 = tempDiv2.children[0];

  if (
    !input1 ||
    !(input1 instanceof HTMLElement) ||
    !input2 ||
    !(input2 instanceof HTMLElement)
  ) {
    console.error('The first or second child is not an HTML element.');
    return;
  }

  document.body.appendChild(tempDiv1);
  document.body.appendChild(tempDiv2);

  try {
    const canvas1 = await html2canvas(input1 as HTMLElement);
    const canvas2 = await html2canvas(input2 as HTMLElement);

    const doc = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const widthScale1 = pdfWidth / canvas1.width;
    const heightScale1 = pdfHeight / canvas1.height;
    const scale1 = Math.min(widthScale1, heightScale1);

    const imgWidth1 = canvas1.width * scale1;
    const imgHeight1 = canvas1.height * scale1;

    const widthScale2 = pdfWidth / canvas2.width;
    const heightScale2 = pdfHeight / canvas2.height;
    const scale2 = Math.min(widthScale2, heightScale2);

    const imgWidth2 = canvas2.width * scale2;
    const imgHeight2 = canvas2.height * scale2;

    doc.addImage(
      canvas1.toDataURL('image/webp'),
      'WEBP',
      0,
      0,
      imgWidth1,
      imgHeight1,
    );

    doc.addPage();
    doc.addImage(
      canvas2.toDataURL('image/webp'),
      'WEBP',
      0,
      0,
      imgWidth2,
      imgHeight2,
    );

    doc.save(`${data.nome_escola}-${data.dataofobservation}.pdf`);
  } catch (error) {
    console.error('Failed to generate PDF', error);
  } finally {
    document.body.removeChild(tempDiv1);
    document.body.removeChild(tempDiv2);
  }
}

export default printDocument;
