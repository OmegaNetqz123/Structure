import fs from 'fs';
import path from "path";
import { parse } from 'csv-parse/sync';
import { json } from 'stream/consumers';
import { Locator } from '@playwright/test';


export class Testdatacalls {


    async jsonreader(filepath: string) {
        let data = await JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        return data;
    }


    CSVreader<T = any>(filename: string): T[] {
        const filePath = path.join(__dirname, '..', 'test-data', filename);
        const filecontent = fs.readFileSync(filePath, 'utf-8');
        const records = parse(filecontent, { columns: true, skipEmptyLines: true }) as T[];
        return records;
    }

    async fileupload(filename: string, ele: Locator) {
        let filePath = path.join(__dirname, '..', 'test-data', 'filename');
        await ele.setInputFiles(filePath);
    }



}   