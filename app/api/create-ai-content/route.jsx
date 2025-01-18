import Cors from 'cors';
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

// Initialize the CORS middleware
const cors = Cors({
  methods: ['POST', 'OPTIONS'],  // Specify allowed methods
  origin: `${process.env.NEXT_PUBLIC_API_URL}`,  // Replace with your frontend domain
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
  // Add CORS support
  await runMiddleware(req, res, cors);

  const { prompt, videoId } = await req.json();
  await inngest.send({
    name: "ai/generate-video-data",
    data: {
      prompt: prompt,
      videoId: videoId
    }
  });

  return NextResponse.json({ result: 'Event Sent!' });
}

// Handle OPTIONS requests for preflight CORS
export async function OPTIONS(req, res) {
  await runMiddleware(req, res, cors);
  return NextResponse.json({}, { status: 200 });
}
