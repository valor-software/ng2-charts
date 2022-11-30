import { baseColors } from './base-colors';
import { Color } from 'chart.js';

export const builtInDefaults = {
  plugins: { colors: {enabled: false }},
  datasets: {
    line: {
      backgroundColor: (context: any) => rgba(generateColor(context.datasetIndex), 0.4),
      borderColor: (context: any) => rgba(generateColor(context.datasetIndex), 1),
      pointBackgroundColor: (context: any) => rgba(generateColor(context.datasetIndex), 1),
      pointBorderColor: '#fff',
    },
    bar: {
      backgroundColor: (context: any) => rgba(generateColor(context.datasetIndex), 0.6),
      borderColor: (context: any) => rgba(generateColor(context.datasetIndex), 1)
    },
    get radar(): {[key: string]: ((context: any) => Color) | Color } {
      return this.line;
    },
    doughnut: {
      backgroundColor: (context: any) => rgba(generateColor(context.dataIndex), 0.6),
      borderColor: '#fff'
    },
    get pie(): {[key: string]: ((context: any) => Color) | Color } {
      return this.doughnut;
    },
    polarArea: {
      backgroundColor: (context: any) => rgba(generateColor(context.dataIndex), 0.6),
      borderColor: (context: any) => rgba(generateColor(context.dataIndex), 1),
    },
    get bubble(): {[key: string]: ((context: any) => Color) | Color } {
      return this.doughnut;
    },
    get scatter(): {[key: string]: ((context: any) => Color) | Color } {
      return this.doughnut;
    },
    get area(): {[key: string]: ((context: any) => Color) | Color } {
      return this.polarArea;
    }
  }
};

function rgba(colour: Array<number>, alpha: number): Color {
  return 'rgba(' + colour.concat(alpha).join(',') + ')';
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(): number[] {
  return [ getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255) ];
}

/**
 * Generate colors
 */
function generateColor(index = 0): number[] {
  return baseColors[index] || getRandomColor();
}
