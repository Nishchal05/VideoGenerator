import Cors from 'cors';
import { db } from "@/configs/db";
import { VIDEO_RAW_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; 

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  origin: 'https://video-generator-dusky.vercel.app',  // Replace with your frontend domain
  credentials: true,
});

// Helper function to run CORS middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// POST handler with CORS
export async function POST(req, res) {
  await runMiddleware(req, res, cors);  // Add CORS support

  try {
    const { videoId, useremail } = await req.json();

    const response = await db.insert(VIDEO_RAW_TABLE).values({
      videoId: videoId,
      createdBy: useremail,
    }).returning(VIDEO_RAW_TABLE); 

    return NextResponse.json({ response: response });
  } catch (error) {
    console.error('Error during video data insertion:', error);
    return NextResponse.json({ error: 'An error occurred on the server' }, { status: 500 });
  }
}

// PUT handler with CORS
export async function PUT(req, res) {
  await runMiddleware(req, res, cors);  // Add CORS support

  try {
    const { videoId, videoData } = await req.json();

    const response = await db.update(VIDEO_RAW_TABLE)
      .set({ videoData: videoData })
      .where(eq(VIDEO_RAW_TABLE.videoId, videoId))
      .returning(VIDEO_RAW_TABLE);

    return NextResponse.json({ response: response });
  } catch (error) {
    console.error('Error during video data update:', error);
    return NextResponse.json({ error: 'An error occurred while updating video data' }, { status: 500 });
  }
}

// GET handler with CORS
export async function GET(req, res) {
  await runMiddleware(req, res, cors);  // Add CORS support

  try {
    const url = new URL(req.url);
    const videoId = url.searchParams.get("videoId");

    const result = await db
      .select()
      .from(VIDEO_RAW_TABLE)
      .where(eq(VIDEO_RAW_TABLE.videoId, videoId));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error during video data retrieval:', error);
    return NextResponse.json({ error: 'An error occurred while fetching video data' }, { status: 500 });
  }
}

// Handle OPTIONS requests for preflight CORS
export async function OPTIONS(req, res) {
  await runMiddleware(req, res, cors);
  return NextResponse.json({}, { status: 200 });
}
