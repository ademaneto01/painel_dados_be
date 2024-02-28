import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import templateHTML from './template';
import templateHTML2 from './template2';
import templateHTML3 from './template3';

interface DataInterface {
  [key: string]: string;
}

async function printDocument(data: DataInterface) {
  const processedHTML1 = processTemplate(data, templateHTML);
  const processedHTML2 = processTemplate(data, templateHTML2);
  const processedHTML3 = processTemplate(data, templateHTML3);

  const tempDiv1 = document.createElement('div');
  tempDiv1.innerHTML = processedHTML1;
  const input1 = tempDiv1.children[0];

  const tempDiv2 = document.createElement('div');
  tempDiv2.innerHTML = processedHTML2;
  const input2 = tempDiv2.children[0];

  const tempDiv3 = document.createElement('div');
  tempDiv3.innerHTML = processedHTML3;
  const input3 = tempDiv3.children[0];

  if (
    !input1 ||
    !(input1 instanceof HTMLElement) ||
    !input2 ||
    !(input2 instanceof HTMLElement) ||
    !input3 ||
    !(input3 instanceof HTMLElement)
  ) {
    console.error('One of the children is not an HTML element.');
    return;
  }

  document.body.appendChild(tempDiv1);
  document.body.appendChild(tempDiv2);
  document.body.appendChild(tempDiv3);

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
      canvas1.toDataURL('image/png'),
      'PNG',
      0,
      0,
      imgWidth1,
      imgHeight1,
    );


    doc.addPage();
    doc.addImage(
      canvas2.toDataURL('image/png'),
      'PNG',
      0,
      0,
      imgWidth2,
      imgHeight2,
    );


    const processedHTML3WithoutTags = processedHTML3.replace(/<[^>]+>/g, '');
    const finalcomentsLines = processedHTML3WithoutTags.split('\n');
    const rootFontSizeInPixels = 16;


    const fontSize3Rem = 0.6;
    const fontSize3 = fontSize3Rem * rootFontSizeInPixels;
    const fontColor3 = '#31599C'; 
    const fontFamily3 = 'Helvetica';

    doc.setFontSize(fontSize3);
    doc.setTextColor(fontColor3);
    doc.setFont(fontFamily3);

    const lineHeight = fontSize3 * 0.7;
    const textWidthRem = 11.4;
    const textWidth = textWidthRem * rootFontSizeInPixels;
    const finalcomentsYPosition = 56;

    finalcomentsLines.forEach((line, index) => {
      const splittedLines: string[] = doc.splitTextToSize(line, textWidth);
      splittedLines.forEach((splittedLine, i) => {
        doc.text(splittedLine, 10, finalcomentsYPosition + index * lineHeight + i * lineHeight);
      });
    });

    doc.save(`${data.nome_escola}-${data.dataofobservation}.pdf`);
  } catch (error) {
    console.error('Failed to generate PDF', error);
  } finally {
    document.body.removeChild(tempDiv1);
    document.body.removeChild(tempDiv2);
    document.body.removeChild(tempDiv3);
  }
}

function processTemplate(data: DataInterface, templateHTML: string): string {
  let html = templateHTML;
  Object.keys(data).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
  });
  return html;
}

export default printDocument;