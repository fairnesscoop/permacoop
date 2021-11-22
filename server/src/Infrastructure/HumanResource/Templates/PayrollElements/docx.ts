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
import { PayrollElementsView } from 'src/Application/HumanResource/PayrollElements/View/PayrollElementsView';

export const fn: DocxFunction = (locals: PayrollElementsLocals) => {
  const { now, dateUtils } = locals;

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

          // Aggregates

          new Paragraph({
            text: 'Totaux',
            heading: HeadingLevel.HEADING_2
          }),

          new Table({
            width: { size: 50, type: WidthType.PERCENTAGE },
            rows: makeAggregateRows(locals)
          }),

          // Employee list

          new Paragraph({
            text: 'Salariés',
            heading: HeadingLevel.HEADING_2
          }),

          ...ArrayUtils.flatMap(makeEmployeeTables(locals), table => [
            table,
            new Paragraph('')
          ])
        ]
      }
    ]
  });
};

const makeAggregateRows = (locals: PayrollElementsLocals): TableRow[] => {
  const { elements, formatMoney } = locals;

  return [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: 'Salaires bruts', bold: true })]
            })
          ]
        }),
        new TableCell({
          children: [
            new Paragraph(
              formatMoney(
                elements.map(el => el.monthlyEarnings).reduce((a, b) => a + b)
              )
            )
          ]
        })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: 'Transport', bold: true })]
            })
          ]
        }),
        new TableCell({
          children: [
            new Paragraph(
              formatMoney(
                elements.map(el => el.transportFee).reduce((a, b) => a + b)
              )
            )
          ]
        })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Tickets restaurant', bold: true })
              ]
            })
          ]
        }),
        new TableCell({
          children: [
            new Paragraph(
              elements
                .map(el => el.mealTickets)
                .reduce((a, b) => a + b)
                .toString()
            )
          ]
        })
      ]
    })
  ];
};

const _chopIntoGroupsOfAtMost = <T>(size: number, items: T[]) => {
  const numGroups = Math.ceil(items.length / size);
  return new Array(numGroups)
    .fill('')
    .map((_, i) => items.slice(i * size, (i + 1) * size));
};

const makeEmployeeTables = (locals: PayrollElementsLocals): Table[] => {
  const { elements, dateUtils, formatMoney } = locals;

  const simpleColumns: {
    [K in keyof PayrollElementsView]?: [
      string,
      (v: PayrollElementsView[K]) => string
    ];
  } = {
    lastName: ['Nom', v => v],
    firstName: ['Prénom', v => v],
    executivePosition: ['Statut', v => (v ? 'Cadre' : 'Non-cadre')],
    joiningDate: ["Date d'entrée", v => dateUtils.format(v, 'MM/y')],
    leavingDate: [
      'Date de sortie',
      v => (v ? dateUtils.format(v, 'MM/y') : '')
    ],
    annualEarnings: ['Salaire brut annuel', formatMoney],
    monthlyEarnings: ['Salaire brut mensuel', formatMoney],
    workingTime: ['TC/TP', v => (v === 'full_time' ? 'TC' : 'TP')],
    transportFee: ['Transport', formatMoney],
    mealTickets: ['Tickets restaurant', v => `${v}`],
    healthInsurance: ['Mutuelle', v => (v ? 'Oui' : 'Non')],
    totalPaidLeaves: ['Congés pays', v => `${v}`],
    totalUnpaidLeaves: ['Congés sans solde', v => `${v}`],
    totalMedicalLeaves: ['Congés maladie', v => `${v}`],
    totalSpecialLeaves: ['Congés exceptionnels', v => `${v}`]
  };

  const makeEmployeeTable = (els: PayrollElementsView[]): Table => {
    const rows = Object.keys(simpleColumns).map(column => {
      const [label, format]: [string, (v: Object) => string] = simpleColumns[
        column
      ];
      return new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: label, bold: true })]
              })
            ]
          }),
          ...els.map(
            el =>
              new TableCell({ children: [new Paragraph(format(el[column]))] })
          )
        ]
      });
    });

    // Add leaves
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Congés', bold: true })]
              })
            ]
          }),
          ...els.map(
            el =>
              new TableCell({
                children: [
                  new Table({
                    width: {
                      size: 100,
                      type: WidthType.PERCENTAGE
                    },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({ children: [new Paragraph('Début')] }),
                          new TableCell({ children: [new Paragraph('Fin')] })
                        ]
                      }),
                      ...el.leaves.map(
                        leave =>
                          new TableRow({
                            children: [
                              new TableCell({
                                children: [
                                  new Paragraph(
                                    dateUtils.format(leave.startDate, 'dd/MM/Y')
                                  )
                                ]
                              }),
                              new TableCell({
                                children: [
                                  new Paragraph(
                                    dateUtils.format(leave.endDate, 'dd/MM/Y')
                                  )
                                ]
                              })
                            ]
                          })
                      )
                    ]
                  })
                ]
              })
          )
        ]
      })
    );

    // Add comment
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Commentaire', bold: true })]
              })
            ]
          }),
          ...els.map(_ => new TableCell({ children: [new Paragraph('')] }))
        ]
      })
    );

    return new Table({
      width: {
        size: ((1 + els.length) * 100) / (1 + numEmployeeColumns),
        type: WidthType.PERCENTAGE
      },
      rows
    });
  };

  // Ensure tables have a reasonable number of columns by splitting
  // employees (shown in columns) across multiple tables.
  const numEmployeeColumns = 3;
  return _chopIntoGroupsOfAtMost(numEmployeeColumns, elements).map(els =>
    makeEmployeeTable(els)
  );
};
