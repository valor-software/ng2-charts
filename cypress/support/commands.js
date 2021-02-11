import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 0.01, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  comparisonMethod: 'ssim'
});
