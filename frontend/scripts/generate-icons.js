const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

(async () => {
  const inputSvg = path.join(__dirname, '..', 'src', 'logo.svg');
  const publicDir = path.join(__dirname, '..', 'public');

  const targets = [
    { size: 512, file: 'logo512.png' },
    { size: 192, file: 'logo192.png' },
    { size: 64, file: 'favicon.png' },
    { size: 32, file: 'favicon-32.png' }
  ];

  try {
    await Promise.all(
      targets.map(({ size, file }) =>
        sharp(inputSvg)
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toFile(path.join(publicDir, file))
      )
    );

    // Copy the 32x32 favicon to favicon.png for compatibility
    await fs.promises.copyFile(
      path.join(publicDir, 'favicon-32.png'),
      path.join(publicDir, 'favicon.png')
    );

    console.log('Generated icons successfully.');
  } catch (error) {
    console.error('Failed to generate icons:', error);
    process.exit(1);
  }
})();
