// [Axes/Callbacks](https://www.chartjs.org/docs/latest/axes/#callbacks)
export interface ChartScaleCallbacks {
  beforeUpdate?: (scale?: any) => void;
  beforeSetDimension?: (scale?: any) => void;
  afterSetDimension?: (scale?: any) => void;
  beforeDataLimits?: (scale?: any) => void;
  afterDataLimits?: (scale?: any) => void;
  beforeBuildTicks?: (scale?: any) => void;
  afterBuildTicks?: (scale?: any) => void;
  beforeTickToLabelConversion?: (scale?: any) => void;
  afterTickToLabelConversion?: (scale?: any) => void;
  beforeCalculateTickRotation?: (scale?: any) => void;
  afterCalculateTickRotation?: (scale?: any) => void;
  beforeFit?: (scale?: any) => void;
  afterFit?: (scale?: any) => void;
  afterUpdate?: (scale?: any) => void;
}
