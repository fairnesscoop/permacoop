export class HtmlColumn {
  public readonly isRaw = true;

  constructor(private readonly text: string, private readonly html: string) {}

  public getRaw(): string {
    return this.html;
  }

  public toString() {
    return this.text;
  }
}
