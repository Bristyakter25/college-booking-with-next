// app/api/colleges/route.js
import dbConnect, { collectionNamesObj } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const collegeCollection = await dbConnect(collectionNamesObj.infoCollection);
    const colleges = await collegeCollection.find({}).toArray();

    return NextResponse.json(colleges, { status: 200 });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      { message: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
