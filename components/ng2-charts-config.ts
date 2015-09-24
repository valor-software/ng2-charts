export enum Ng2ChartsTheme {BS3 = 1, BS4 = 2}

export class Ng2ChartsConfig {
  private static _theme: Ng2ChartsTheme;
  static get theme():Ng2ChartsTheme {
    // hack as for now
    let w: any = window;
    if (w && w.__theme === 'bs4') {
      return Ng2ChartsTheme.BS4;
    }
    return (this._theme || Ng2ChartsTheme.BS3);
  }
  static set theme(v:Ng2ChartsTheme){
    this._theme = v;
  }
}
