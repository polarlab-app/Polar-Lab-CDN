import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    const { headers } = req;
    const authKey = headers.get('Authorization');
    if (authKey !== process.env.API_KEY) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const filePath = formData.get('filePath');

    if (!file || !filePath) {
        return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fullPath = path.join('/assets', filePath);

    fs.writeFileSync(fullPath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
}
