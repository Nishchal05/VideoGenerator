import { db } from "@/configs/db";
import { VIDEO_RAW_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// Helper function to add CORS headers
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");  // Allow all origins
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

// POST handler
export async function POST(req) {
  try {
    const { videoId, useremail } = await req.json();

    const response = await db.insert(VIDEO_RAW_TABLE).values({
      videoId: videoId,
      createdBy: useremail,
    }).returning(VIDEO_RAW_TABLE); 

    let res = NextResponse.json({ response: response });
    return addCorsHeaders(res); // Add CORS headers
  } catch (error) {
    console.error('Error during video data insertion:', error);
    let res = NextResponse.json({ error: 'An error occurred on the server' }, { status: 500 });
    return addCorsHeaders(res); // Add CORS headers
  }
}

// PUT handler
export async function PUT(req) {
  try {
    const { videoId, videoData } = await req.json();

    const response = await db.update(VIDEO_RAW_TABLE)
      .set({ videoData: videoData })
      .where(eq(VIDEO_RAW_TABLE.videoId, videoId))
      .returning(VIDEO_RAW_TABLE);

    let res = NextResponse.json({ response: response });
    return addCorsHeaders(res); // Add CORS headers
  } catch (error) {
    console.error('Error during video data update:', error);
    let res = NextResponse.json({ error: 'An error occurred while updating video data' }, { status: 500 });
    return addCorsHeaders(res); // Add CORS headers
  }
}

// GET handler
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const videoId = url.searchParams.get("videoId");

    const result = await db
      .select()
      .from(VIDEO_RAW_TABLE)
      .where(eq(VIDEO_RAW_TABLE.videoId, videoId));

    let res = NextResponse.json(result);
    return addCorsHeaders(res); // Add CORS headers
  } catch (error) {
    console.error('Error during video data retrieval:', error);
    let res = NextResponse.json({ error: 'An error occurred while fetching video data' }, { status: 500 });
    return addCorsHeaders(res); // Add CORS headers
  }
}

// Handle OPTIONS requests (for CORS preflight)
export async function OPTIONS() {
  let res = NextResponse.json({}, { status: 200 });
  return addCorsHeaders(res); // Add CORS headers
}
