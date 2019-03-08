import { Color } from './color';
import { Colors } from './colors';
import { defaultColors } from './default-colors';

/**
 * Generate colors by chart type
 */
export function getColors(chartType: string, index: number, count: number): Color {
  if (chartType === 'pie' || chartType === 'doughnut') {
    return formatPieColors(generateColors(count));
  }

  if (chartType === 'polarArea') {
    return formatPolarAreaColors(generateColors(count));
  }

  if (chartType === 'line' || chartType === 'radar') {
    return formatLineColor(generateColor(index));
  }

  if (chartType === 'bar' || chartType === 'horizontalBar') {
    return formatBarColor(generateColor(index));
  }

  if (chartType === 'bubble') {
    return formatPieColors(generateColors(count));
  }

  if (chartType === 'scatter') {
    return formatPieColors(generateColors(count));
  }

  throw new Error(`getColors - Unsupported chart type ${chartType}`);
}

function rgba(colour: Array<number>, alpha: number): string {
  return 'rgba(' + colour.concat(alpha).join(',') + ')';
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatLineColor(colors: Array<number>): Color {
  return {
    backgroundColor: rgba(colors, 0.4),
    borderColor: rgba(colors, 1),
    pointBackgroundColor: rgba(colors, 1),
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: rgba(colors, 0.8)
  };
}

function formatBarColor(colors: Array<number>): Color {
  return {
    backgroundColor: rgba(colors, 0.6),
    borderColor: rgba(colors, 1),
    hoverBackgroundColor: rgba(colors, 0.8),
    hoverBorderColor: rgba(colors, 1)
  };
}

function formatPieColors(colors: Array<number[]>): Colors {
  return {
    backgroundColor: colors.map((color: number[]) => rgba(color, 0.6)),
    borderColor: colors.map(() => '#fff'),
    pointBackgroundColor: colors.map((color: number[]) => rgba(color, 1)),
    pointBorderColor: colors.map(() => '#fff'),
    pointHoverBackgroundColor: colors.map((color: number[]) => rgba(color, 1)),
    pointHoverBorderColor: colors.map((color: number[]) => rgba(color, 1))
  };
}

function formatPolarAreaColors(colors: Array<number[]>): Color {
  return {
    backgroundColor: colors.map((color: number[]) => rgba(color, 0.6)),
    borderColor: colors.map((color: number[]) => rgba(color, 1)),
    hoverBackgroundColor: colors.map((color: number[]) => rgba(color, 0.8)),
    hoverBorderColor: colors.map((color: number[]) => rgba(color, 1))
  };
}

function getRandomColor(): number[] {
  return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}

/**
 * Generate colors for line|bar charts
 */
function generateColor(index: number): number[] {
  return defaultColors[index] || getRandomColor();
}

/**
 * Generate colors for pie|doughnut charts
 */
function generateColors(count: number): Array<number[]> {
  const colorsArr: Array<number[]> = new Array(count);
  for (let i = 0; i < count; i++) {
    colorsArr[i] = defaultColors[i] || getRandomColor();
  }
  return colorsArr;
}
