import fs from 'fs';
import sharp from 'sharp';

interface Options {
  width: number;
  quality: number;
}

async function createPlaceholder(imagePath: string, options: Options = { width: 20, quality: 20 }): Promise<string> {
  const buffer = await sharp(imagePath)
    .resize(options.width)
    .blur()
    .jpeg({ quality: options.quality })
    .toBuffer();
  const base64Image = buffer.toString('base64');
  return `data:image/jpeg;base64,${base64Image}`;
}

export default createPlaceholder;