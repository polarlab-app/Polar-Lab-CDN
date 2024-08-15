import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(req) {
    const { headers } = req;
    const authKey = headers.get('Authorization');
    if (authKey !== process.env.API_KEY) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const fileType = formData.get('fileType');
    const filePath = formData.get('filePath');

    if (!file || !filePath) {
        return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);

    if (fileType === 'profilePicture') {
        buffer = await sharp(buffer).resize(512, 512).toFormat('webp').toBuffer();
    }

    const baseDir = path.join(process.cwd(), 'assets');
    const sanitizedFilePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
    const fullPath = path.resolve(baseDir, sanitizedFilePath);

    if (!fullPath.startsWith(baseDir)) {
        return NextResponse.json({ message: 'Invalid file path' }, { status: 400 });
    }

    try {
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, buffer);
        return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to upload file' }, { status: 500 });
    }
}
