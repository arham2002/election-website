import { google, sheets_v4 } from "googleapis";

let cachedData: sheets_v4.Schema$ValueRange | undefined;
let lastFetchTimestamp: number = 0;
const cacheTimeout = 1; // Cache timeout in milliseconds (5 minutes)

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  },
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets'
  ]
});
const sheets = google.sheets({ version: 'v4', auth });

async function getCandidates(): Promise<sheets_v4.Schema$ValueRange> {
  const currentTime = new Date().getTime();

  // Use cached data if it exists and is within the cache timeout
  if (cachedData && currentTime - lastFetchTimestamp < cacheTimeout) {
    return cachedData;
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:H"
    });

    cachedData = response.data;
    lastFetchTimestamp = currentTime;

    return cachedData;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
;}

export function cleanString(input: string): string {
  // Transform the input: make it case-insensitive, omit symbols, remove zeros, hyphens, commas, and replace 2 with "
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z1-9]/g, '')
    .replace(/[-0]/g, '')
    .replace(/,/g, '')
    .replace(/2c/g, '')
    .replace(/na/g, '');
}

export async function getSearchedCandidate(term: string, index: number): Promise<string[][] | undefined> {
  try {
    const data = await getCandidates();

    const filteredData = data.values?.filter((item) => {
      const cleanedItem = cleanString(item[index]);
      const cleanedTerm = cleanString(term);
      return cleanedItem == cleanedTerm;
    });


    
    return filteredData;
  } catch (error) {
    console.error("Error filtering candidates:", error);
    throw error;
  }
}



export async function getDistricts() {
  try {
    let districts: string[][] | undefined = [];
    const data = await getCandidates();
    const data2 = data.values;
    let columnIndex: number = 5;

    if (data2) {
      districts = data2.map((row: any) => row[columnIndex]);
    }

    return districts;
  } catch (error) {
    console.error('Error in getDistricts:', error);
    return undefined;
  }
}

export async function getSeats() {
  try {
    let districts: string[][] | undefined = [];
    const data = await getCandidates();
    const data2 = data.values;
    let columnIndex: number = 4;

    if (data2) {
      districts = data2.map((row: any) => row[columnIndex]);
    }

    return districts;
  } catch (error) {
    console.error('Error in getDistricts:', error);
    return undefined;
  }
}

export async function getSeatsId() {
  try {
    let seats: string[][] | undefined = [];
    const data = await getCandidates();
    const data2 = data.values;
    let columnIndex: number = 0;

    if (data2) {
      seats = data2.map((row: any) => row[columnIndex]);
    }
    return seats;
  } catch (error) {
    console.error('Error in getDistricts:', error);
    return undefined;
  }
}

export async function getSearchedCandidateByDist(term: string, index: number): Promise<string[][] | undefined> {
  try {
    const data = await getCandidates();

    const filteredData = data.values?.filter((item) => {
      const cleanedItem = cleanString(item[index]);
      const cleanedTerm = cleanString(term);
      return cleanedItem.includes(cleanedTerm);
    });


    
    return filteredData;
  } catch (error) {
    console.error("Error filtering candidates:", error);
    throw error;
  }
}
