// src/app/lib/fileStorage.js
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp'; // npm install sharp

const STORAGE_PATH = process.env.FILE_STORAGE_PATH || '/mnt/onestorage/jcdental-files';
const THUMBNAILS_PATH = path.join(STORAGE_PATH, 'thumbnails');

// Ensure directories exist
async function ensureDirectories() {
  await fs.mkdir(STORAGE_PATH, { recursive: true });
  await fs.mkdir(THUMBNAILS_PATH, { recursive: true });
}

// Generate unique filename
function generateFileName(originalName) {
  const ext = path.extname(originalName);
  const hash = crypto.randomBytes(16).toString('hex');
  return `${hash}${ext}`;
}

// Save file to disk
export async function saveFile(buffer, originalName, mimeType) {
  await ensureDirectories();
  
  const fileName = generateFileName(originalName);
  const filePath = path.join(STORAGE_PATH, fileName);
  
  await fs.writeFile(filePath, buffer);
  
  // Generate thumbnail for images
  let thumbnailName = null;
  if (mimeType.startsWith('image/')) {
    thumbnailName = await generateThumbnail(buffer, fileName);
  }
  
  return {
    fileName,
    filePath,
    thumbnailName,
    size: buffer.length
  };
}

// Generate thumbnail
async function generateThumbnail(buffer, fileName) {
  try {
    const thumbnailName = `thumb_${fileName}`;
    const thumbnailPath = path.join(THUMBNAILS_PATH, thumbnailName);
    
    await sharp(buffer)
      .resize(300, 300, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: 80 })
      .toFile(thumbnailPath);
    
    return thumbnailName;
  } catch (error) {
    console.error('Thumbnail generation failed:', error);
    return null;
  }
}

// Get file from disk
export async function getFile(fileName) {
  const filePath = path.join(STORAGE_PATH, fileName);
  return fs.readFile(filePath);
}

// Get thumbnail
export async function getThumbnail(thumbnailName) {
  const thumbnailPath = path.join(THUMBNAILS_PATH, thumbnailName);
  return fs.readFile(thumbnailPath);
}

// Delete file
export async function deleteFile(fileName, thumbnailName) {
  try {
    await fs.unlink(path.join(STORAGE_PATH, fileName));
    if (thumbnailName) {
      await fs.unlink(path.join(THUMBNAILS_PATH, thumbnailName));
    }
  } catch (error) {
    console.error('File deletion failed:', error);
  }
}