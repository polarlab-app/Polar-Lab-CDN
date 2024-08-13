import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const slugArray = params.slug;
    const fileName = slugArray[slugArray.length - 2];
    const fileExtension = slugArray[slugArray.length - 1];
    const folderPath = slugArray.slice(0, -2).join('/');

    const safeFolderPath = path.normalize(folderPath);
    const basePath = path.join(process.cwd(), 'assets');
    const fullPath = path.join(basePath, safeFolderPath, `${fileName}.${fileExtension}`);

    try {
        const stats = await fs.promises.lstat(fullPath);
        if (!stats.isFile()) {
            return NextResponse.json({ message: 'File not found lmao try again' }, { status: 404 });
        }

        const fileBuffer = await fs.promises.readFile(fullPath);
        const resizedImageBuffer = await sharp(fileBuffer).resize(128, 128).toFormat('webp').toBuffer();

        return new NextResponse(resizedImageBuffer, {
            headers: {
                'Content-Type': 'image/webp',
            },
        });
    } catch (err) {
        return NextResponse.json({ message: 'File not found, I call that a skill issue' }, { status: 404 });
    }
}
