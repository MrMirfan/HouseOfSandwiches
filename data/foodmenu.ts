import axios from 'axios';
import csv from 'csv-parser';
import { Readable } from 'stream';

import { MenuCard } from '@/interfaces/MenuCard';

const url:any = process.env.NEXT_PUBLIC_SHEET_URL;

async function fetchmenu():Promise<Array<MenuCard>> {
    try {
        console.log(url);
        const response = await axios.get(url);
        return await parseDataToCSV(response.data);
    } catch (error: any) {
        throw new Error('Error fetching data:', error);
    }
}

function parseDataToCSV(data: any):Promise<Array<MenuCard>> {
    return new Promise((resolve, reject) => {
        const results: Array<MenuCard> = [];
        Readable.from(data)
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

export default fetchmenu();