import glob from 'glob';
import fs from 'fs';

glob(
  `apps/ng2-charts-demo/src/**/*.component.ts`,
  { ignore: 'man.css' },
  (err, files) => {
    if (err) {
      // Handle the error
    }

    // Iterate over the list of files
    files.forEach((srcPath) => {
      // Construct the full path to the destination file
      const destPath = srcPath.replace('.ts', '.txt');

      fs.copyFile(srcPath, destPath, (err) => {
        if (err) {
          // Handle the error
        }
      });
    });
  },
);
