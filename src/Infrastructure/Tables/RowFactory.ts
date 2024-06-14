import { Inject, Injectable } from '@nestjs/common';
import { ITranslator } from 'src/Infrastructure/Translations/ITranslator';
import { ITemplates } from 'src/Infrastructure/Templates/ITemplates';
import { ICell } from '.';
import { htmlToText } from '../Common/Utils/formatUtils';

class ValueCell implements ICell {
  public readonly name = 'scalar';

  constructor(private readonly value: any) {}

  public renderHtml(): string {
    return this.renderText();
  }

  public renderText(): string {
    return this.value.toString();
  }
}

class TemplateCell implements ICell {
  public readonly name = 'template';

  constructor(
    private readonly templateName: string,
    private readonly context: object,
    private readonly templates: ITemplates
  ) {}

  public renderHtml(): string {
    return this.templates.render(this.templateName, this.context);
  }

  public renderText(): string {
    return htmlToText(this.renderHtml());
  }
}

export type ActionsOptions = {
  view?: {
    url: string;
  };
  edit?: {
    url: string;
  };
  delete?: {
    url: string;
  };
};

class ActionsCell implements ICell {
  public readonly name = 'actions';

  constructor(
    private readonly options: ActionsOptions,
    private readonly templates: ITemplates
  ) {}

  public renderHtml(): string {
    return this.templates.render('tables/cells/actions.njk', {
      actions: this.options
    });
  }

  public renderText(): string {
    throw new Error('Does not render to text');
  }
}

class TransCell implements ICell {
  public readonly name = 'trans';

  constructor(
    public readonly message: string,
    public readonly params: object,
    private readonly translator: ITranslator
  ) {}

  public renderHtml(): string {
    return this.renderText();
  }

  public renderText(): string {
    return this.translator.translate(this.message, this.params);
  }
}

@Injectable()
export class RowFactory {
  constructor(
    @Inject('ITranslator')
    private readonly translator: ITranslator,
    @Inject('ITemplates')
    private readonly templates: ITemplates
  ) {}

  public createBuilder(): RowBuilder {
    return new RowBuilder(this.translator, this.templates);
  }
}

export class RowBuilder {
  private cells: ICell[];

  constructor(
    private readonly translator: ITranslator,
    private readonly templates: ITemplates
  ) {
    this.cells = [];
  }

  public apply(cb: (b: RowBuilder) => void): RowBuilder {
    cb(this);
    return this;
  }

  public value(value: string | number): RowBuilder {
    this.cells.push(new ValueCell(value));
    return this;
  }

  public template(name: string, context: object): RowBuilder {
    this.cells.push(new TemplateCell(name, context, this.templates));
    return this;
  }

  public trans(message: string, params?: object): RowBuilder {
    this.cells.push(new TransCell(message, params, this.translator));
    return this;
  }

  public picto(picto: string, message: string, attr: any = {}): RowBuilder {
    this.cells.push(
      new TemplateCell(
        'tables/cells/picto.njk',
        { message, picto, attr },
        this.templates
      )
    );
    return this;
  }

  public actions(options: ActionsOptions): RowBuilder {
    this.cells.push(new ActionsCell(options, this.templates));
    return this;
  }

  public build(): ICell[] {
    return this.cells;
  }
}
