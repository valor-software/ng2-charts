import { glob } from 'glob';
import fs from 'fs/promises';

async function copyComponentFiles() {
  try {
    const files = await glob('apps/ng2-charts-demo/src/**/*.component.ts');

    // Iterate over the list of files
    for (const srcPath of files) {
      // Construct the full path to the destination file
      const destPath = srcPath.replace('.ts', '.txt');

      try {
        await fs.copyFile(srcPath, destPath);
        console.log(`Copied ${srcPath} to ${destPath}`);
      } catch (err) {
        console.error(`Error copying ${srcPath} to ${destPath}:`, err);
      }
    }
  } catch (err) {
    console.error('Error finding files:', err);
  }
}

copyComponentFiles();
