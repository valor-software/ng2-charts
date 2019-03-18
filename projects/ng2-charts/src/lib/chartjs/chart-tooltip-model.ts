import { ChartColor } from './chart-color';
import { ChartTooltipItem } from './chart-tooltip-item';
import { ChartTooltipModelElement } from './chart-tooltip-model-element';

// [Configuration/Tooltip/Tooltip Model](https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-model)
export interface ChartTooltipModel {
  // The items that we are rendering in the tooltip. See Tooltip Item Interface section
  dataPoints: ChartTooltipItem[];
  // Positioning
  xPadding: number;
  yPadding: number;
  xAlign: string;
  yAlign: string;
  // X and Y properties are the top left of the tooltip
  x: number;
  y: number;
  width: number;
  height: number;
  // Where the tooltip points to
  caretX: number;
  caretY: number;
  /**
   * The body lines that need to be rendered
   * Each object contains 3 parameters
   * * before: string[] -- lines of text before the line with the color square
   * * lines: string[]; -- lines of text to render as the main item with color square
   * * after: string[]; -- lines of text to render after the main lines
   */
  body: ChartTooltipModelElement[];
  // lines of text that appear after the title but before the body
  beforeBody: string[];
  // line of text that appear after the body and before the footer
  afterBody: string[];
  bodyFontColor: ChartColor;
  _bodyFontFamily: string;
  _bodyFontStyle: string;
  _bodyAlign: string;
  bodyFontSize: number;
  bodySpacing: number;
  // Title
  // lines of text that form the title
  title: string[];
  titleFontColor: ChartColor;
  _titleFontFamily: string;
  _titleFontStyle: string;
  titleFontSize: number;
  _titleAlign: string;
  titleSpacing: number;
  titleMarginBottom: number;
  // Footer
  // lines of text that form the footer
  footer: string[];
  footerFontColor: ChartColor;
  _footerFontFamily: string;
  _footerFontStyle: string;
  footerFontSize: number;
  _footerAlign: string;
  footerSpacing: number;
  footerMarginTop: number;
  // Appearance
  caretSize: number;
  caretPadding: number;
  cornerRadius: number;
  backgroundColor: ChartColor;
  // colors to render for each item in body[]. This is the color of the squares in the tooltip
  labelColors: ChartColor[];
  labelTextColors: ChartColor[];
  // 0 opacity is a hidden tooltip
  opacity: number;
  legendColorBackground: ChartColor;
  displayColors: boolean;
  borderColor: ChartColor;
  borderWidth: number;
}
