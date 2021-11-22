import {
  Document,
  HeadingLevel,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType
} from 'docx';
import { ArrayUtils } from 'src/Infrastructure/Common/Utils/ArrayUtils';
import { DocxFunction } from 'src/Infrastructure/docx.interfaces';
import { PayrollElementsLocals } from '../../PayrollElements/DTO/PayrollElementsDTO';

export const fn: DocxFunction = (locals: PayrollElementsLocals) => {
  const { elements, now, formatMoney, dateUtils } = locals;

  return new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: 'Fairness - Éléments de paie',
            heading: HeadingLevel.HEADING_1
          }),

          new Paragraph({
            children: [
              new TextRun({ text: 'Période', bold: true }),
              new TextRun(`: ${dateUtils.format(now, 'MM/y')}`)
            ]
          }),

          // Aggregated numbers

          new Paragraph({
            text: 'Totaux',
            heading: HeadingLevel.HEADING_2
          }),

          new Paragraph({
            children: [
              new TextRun({ text: 'Salaires brut', bold: true }),
              new TextRun(
                `: ${formatMoney(
                  elements.map(el => el.monthlyEarnings).reduce((a, b) => a + b)
                )}`
              ),
              new TextRun('\t'),
              new TextRun({ text: 'Transport', bold: true }),
              new TextRun(
                `: ${formatMoney(
                  elements.map(el => el.transportFee).reduce((a, b) => a + b)
                )}`
              ),
              new TextRun('\t'),
              new TextRun({ text: 'Tickets resto', bold: true }),
              new TextRun(
                `: ${formatMoney(
                  elements.map(el => el.mealTickets).reduce((a, b) => a + b)
                )}`
              )
            ]
          }),

          // Employee list

          new Paragraph({
            text: 'Salariés',
            heading: HeadingLevel.HEADING_2
          }),

          ...ArrayUtils.flatMap(elements, el => [
            // BEGIN Employee info
            new Paragraph({
              children: [
                new TextRun({ text: 'Prénom', bold: true }),
                new TextRun({ text: `: ${el.firstName}` }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Nom', bold: true }),
                new TextRun({ text: `: ${el.lastName}` }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: "Date d'entrée", bold: true }),
                new TextRun({
                  text: `: ${dateUtils.format(el.joiningDate, 'dd/MM/y')}`
                }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Date de sortie', bold: true }),
                new TextRun({
                  text: `: ${
                    el.leavingDate
                      ? dateUtils.format(el.leavingDate, 'dd/MM/y')
                      : '/'
                  }`
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Statut', bold: true }),
                new TextRun({
                  text: `: ${el.executivePosition ? 'Cadre' : 'Non-cadre'}`
                }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Salaire brut annuel', bold: true }),
                new TextRun({
                  text: `: ${formatMoney(el.annualEarnings)}`
                }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Salaire brut mensuel', bold: true }),
                new TextRun({
                  text: `: ${formatMoney(el.monthlyEarnings)}`
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'TC/TP', bold: true }),
                new TextRun({
                  text: `: ${el.workingTime === 'full_time' ? 'TC' : 'TP'}`
                }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Transport', bold: true }),
                new TextRun({
                  text: `: ${formatMoney(el.transportFee)}`
                }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Tickets resto', bold: true }),
                new TextRun({ text: `: ${el.mealTickets}` }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Mutuelle', bold: true }),
                new TextRun({
                  text: `: ${el.healthInsurance ? 'Oui' : 'Non'}`
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Congés payés', bold: true }),
                new TextRun({ text: `: ${el.totalPaidLeaves}` }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Congés sans solde', bold: true }),
                new TextRun({
                  text: `: ${el.totalUnpaidLeaves}`
                }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Congés maladie', bold: true }),
                new TextRun({ text: `: ${el.totalMedicalLeaves}` }),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'Congés exceptionnels', bold: true }),
                new TextRun({
                  text: `: ${el.totalSpecialLeaves}`
                })
              ]
            }),
            // END Employee info

            // BEGIN Leaves
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Liste des congés',
                  bold: true
                }),
                new TextRun(' :'),
                ...(el.leaves.length === 0 ? [new TextRun('/')] : [])
              ]
            }),
            ...(el.leaves.length === 0
              ? []
              : [
                  new Table({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE
                    },
                    rows: [
                      new TableRow({
                        tableHeader: true,
                        children: [
                          new TableCell({
                            children: [new Paragraph('Date de début de congés')]
                          }),
                          new TableCell({
                            children: [new Paragraph('Date de fin de congés')]
                          })
                        ]
                      }),
                      ...el.leaves.map(
                        leave =>
                          new TableRow({
                            children: [
                              new TableCell({
                                children: [
                                  new Paragraph(
                                    dateUtils.format(leave.startDate, 'dd/MM/y')
                                  )
                                ]
                              }),
                              new TableCell({
                                children: [
                                  new Paragraph(
                                    dateUtils.format(leave.endDate, 'dd/MM/y')
                                  )
                                ]
                              })
                            ]
                          })
                      )
                    ]
                  })
                ]),
            // END Leaves

            new Paragraph({
              children: [
                new TextRun({ text: 'Commentaire', bold: true }),
                new TextRun(`: /`) // May be filled by cooperators after downloading.
              ]
            }),

            new Paragraph('')
          ])
        ]
      }
    ]
  });
};
