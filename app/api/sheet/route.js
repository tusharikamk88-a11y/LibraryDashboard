import Papa from "papaparse";
import { NextResponse } from "next/server";

// Your Google Sheet ID (same one used in the original Streamlit app).
// You can override this by setting SHEET_ID in your Vercel project's
// Environment Variables instead of hardcoding it here.
const SHEET_ID = process.env.SHEET_ID || "19xw_V1NFzpNxLi7fkdB2ZjyBai-hmOd1S2hX6T991eQ";

function getSheetUrl(sheetName) {
  const encoded = encodeURIComponent(sheetName);
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encoded}`;
}

// Normalize a raw parsed row: lowercase/trim keys, coerce "available" to boolean.
function cleanRecords(rows, isBookSheet) {
  return rows.map((row) => {
    const cleaned = {};
    for (const key of Object.keys(row)) {
      const newKey = key.trim().toLowerCase();
      cleaned[newKey] = row[key];
    }
    if (isBookSheet) {
      if (cleaned.available === undefined || cleaned.available === "") {
        // No "available" column in the sheet at all -> default to available,
        // matching the original app's fallback behavior.
        cleaned.available = true;
      } else {
        const raw = String(cleaned.available).trim().toLowerCase();
        cleaned.available = ["yes", "true", "1"].includes(raw);
      }
    }
    return cleaned;
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get("sheet");

  if (!sheet) {
    return NextResponse.json({ error: "Missing 'sheet' query param" }, { status: 400 });
  }

  const isBookSheet = sheet.toLowerCase().includes("catalogue");

  try {
    const res = await fetch(getSheetUrl(sheet), { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Google Sheets responded with ${res.status}`);
    }
    const csvText = await res.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const records = cleanRecords(parsed.data, isBookSheet);

    return NextResponse.json({ records });
  } catch (err) {
    return NextResponse.json(
      { error: `Error loading sheet "${sheet}": ${err.message}` },
      { status: 500 }
    );
  }
}
