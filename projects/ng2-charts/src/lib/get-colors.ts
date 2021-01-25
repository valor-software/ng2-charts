import { baseColors } from './base-colors';
import { Color } from 'chart.js';

export const builtInDefaults = {
  line: {
    datasets: {
      backgroundColor: context => rgba(generateColor(context.datasetIndex), 0.4),
      borderColor: context => rgba(generateColor(context.datasetIndex), 1),
      pointBackgroundColor: context => rgba(generateColor(context.datasetIndex), 1),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: context => rgba(generateColor(context.datasetIndex), 0.8)
    }
  },
  bar: {
    datasets: {
      backgroundColor: context => rgba(generateColor(context.datasetIndex), 0.6),
      borderColor: context => rgba(generateColor(context.datasetIndex), 1),
      hoverBackgroundColor: context => rgba(generateColor(context.datasetIndex), 0.8),
      hoverBorderColor: context => rgba(generateColor(context.datasetIndex), 1)
    }
  },
  get radar(): { [key: string]: Color } {
    return this.line;
  },
  doughnut: {
    datasets: {
      backgroundColor: context => rgba(generateColor(context.dataIndex), 0.6),
      borderColor: '#fff',
      pointBackgroundColor: context => rgba(generateColor(context.dataIndex), 1),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: context => rgba(generateColor(context.dataIndex), 1),
      pointHoverBorderColor: context => rgba(generateColor(context.dataIndex), 1)
    }
  },
  get pie(): { [key: string]: Color } {
    return this.doughnut;
  },
  polarArea: {
    datasets: {
      backgroundColor: context => rgba(generateColor(context.dataIndex), 0.6),
      borderColor: context => rgba(generateColor(context.dataIndex), 1),
      hoverBackgroundColor: context => rgba(generateColor(context.dataIndex), 0.8),
      hoverBorderColor: context => rgba(generateColor(context.dataIndex), 1)
    }
  },
  get bubble(): { [key: string]: Color } {
    return this.doughnut;
  },
  get scatter(): { [key: string]: Color } {
    return this.doughnut;
  },
  get area(): { [key: string]: Color } {
    return this.polarArea;
  }
};

function rgba(colour: Array<number>, alpha: number): string {
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
function generateColor(index: number): number[] {
  return baseColors[index] || getRandomColor();
}
