import { Extension } from 'nunjucks';
import { ITemplates } from '../ITemplates';
import { Inline, Table } from 'src/Infrastructure/Tables';

// See: https://mozilla.github.io/nunjucks/api.html#custom-tags
export class TablesExtension implements Extension {
  public readonly tags = ['table', 'inlinetable'];

  constructor(private readonly templates: ITemplates) {}

  public parse(parser: any, nodes: any, _lexer: any) {
    const tagToken = parser.nextToken();

    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tagToken.value);

    const methodName =
      tagToken.value === 'table' ? 'renderTable' : 'renderInlineTable';

    return new nodes.CallExtension(this, methodName, args, []);
  }

  public renderTable(
    _context: object,
    table: Table,
    extraContext: object = {}
  ) {
    const html = this.templates.render('tables/table.njk', {
      table,
      ...extraContext
    });
    return this.templates.markSafe(html);
  }

  public renderInlineTable(
    _context: object,
    inline: Inline,
    extraContext: object = {}
  ) {
    const html = this.templates.render('tables/inlinetable.njk', {
      inline,
      ...extraContext
    });
    return this.templates.markSafe(html);
  }
}
