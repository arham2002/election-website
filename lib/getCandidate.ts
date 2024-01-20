import { google, sheets_v4 } from "googleapis";

let cachedData: sheets_v4.Schema$ValueRange | undefined;
let lastFetchTimestamp: number = 0;
const cacheTimeout = 1; // Cache timeout in milliseconds (5 minutes)

const email = process.env.GOOGLE_CLIENT_EMAIL
const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')


const auth = new google.auth.GoogleAuth({

  credentials: {
    client_email: email,
    private_key: key
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
  console.log(key)
  // Use cached data if it exists and is within the cache timeout
  if (cachedData && currentTime - lastFetchTimestamp < cacheTimeout) {
    return cachedData;
  }

  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error("Missing required environment variables. Please check your configuration.");
    process.exit(1); // Exit the process or handle the missing variables accordingly
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
    console.error(`Error fetching candidates: the credentials are ${process.env.GOOGLE_CLIENT_EMAIL} AND ${process.env.GOOGLE_PRIVATE_KEY}`, error);
    
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

    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.error("Missing required environment variables. Please check your configuration.");
      process.exit(1); // Exit the process or handle the missing variables accordingly
    }

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

  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error("Missing required environment variables. Please check your configuration.");
    process.exit(1); // Exit the process or handle the missing variables accordingly
  }

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

  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error("Missing required environment variables. Please check your configuration.");
    process.exit(1); // Exit the process or handle the missing variables accordingly
  }

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

  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error("Missing required environment variables. Please check your configuration.");
    process.exit(1); // Exit the process or handle the missing variables accordingly
  }

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

  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error("Missing required environment variables. Please check your configuration.");
    process.exit(1); // Exit the process or handle the missing variables accordingly
  }

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
