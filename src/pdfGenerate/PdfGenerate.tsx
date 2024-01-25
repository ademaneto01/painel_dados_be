import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import templateHTML from './template';

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
  const processedHTML = processTemplate(data, templateHTML);

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = processedHTML;

  const input = tempDiv.children[0];

  if (!input || !(input instanceof HTMLElement)) {
    console.error('The first child is not an HTML element.');
    return;
  }

  document.body.appendChild(tempDiv);
  try {
    const canvas = await html2canvas(input as HTMLElement);

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.nome_escola}-${data.dataofobservation}.pdf`);
  } catch (error) {
    console.error('Failed to generate PDF', error);
  } finally {
    document.body.removeChild(tempDiv);
  }
}

export default printDocument;
