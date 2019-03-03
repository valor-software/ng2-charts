export const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(45, 192, 45)',
  blue: 'rgb(54, 162, 235)',
  darkblue: 'rgb(24, 42, 75)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,238,235)',
  darkgrey: 'rgb(81,88,85)',
  black: 'rgb(20,20,20)',
  white: 'rgb(255,255,255)',
};

export interface DataSeries {
  index: number;
  axisId: 'Oil' | 'Water';
  label: string;
  colorName: keyof typeof chartColors;
  units: 'celsius' | 'fahrenheit';
  activeInBypassMode: boolean;

  remoteData?: any;
}
