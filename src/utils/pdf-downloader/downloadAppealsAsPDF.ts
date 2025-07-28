import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';

export const downloadAppealsAsPDF = (appeals: Appeal[] | Appeal) => {
  const data = Array.isArray(appeals) ? appeals : [appeals];
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Appeal Report', 14, 20);

  const tableBody = data.map((appeal) => [
  appeal.id ?? '-',                          // handle undefined
  appeal.status ?? '-',
  appeal.taxYear ?? '-',
  appeal.company ?? '-',
  appeal.state ?? '-',
  appeal.assessor ?? '-',
  appeal.accountNumber ?? '-',
  formatDate(appeal.appealedDeadline),
  formatDate(appeal.appealedDate),
  appeal.appealedBy ?? '-',
]);

  autoTable(doc, {
    head: [
      [
        'ID',
        'Status',
        'Tax Year',
        'Company',
        'State',
        'Assessor',
        'Account #',
        'Deadline',
        'Appealed Date',
        'Appealed By',
      ],
    ],
    body: tableBody,
    startY: 30,
    styles: { fontSize: 10 },
    theme: 'striped',
  });

  const filename =
    data.length > 1 ? `appeals-${Date.now()}.pdf` : `appeal-${data[0].id}.pdf`;

  doc.save(filename);
};

const formatDate = (date: string | Date | null) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString();
};
