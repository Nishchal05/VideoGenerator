import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

// Helper function to add CORS headers
function addCorsHeaders(response) {
  // Allow all origins by default for development or use your frontend domain in production
  response.headers.set("Access-Control-Allow-Origin", "*"); // Replace with process.env.NEXT_PUBLIC_API_URL if you prefer specific origin
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

// POST handler with CORS
export async function POST(req) {
  try {
    const { prompt, videoId } = await req.json();
    
    // Send event using inngest
    await inngest.send({
      name: "ai/generate-video-data",
      data: {
        prompt: prompt,
        videoId: videoId,
      },
    });

    let res = NextResponse.json({ result: 'Event Sent!' });
    return addCorsHeaders(res); // Add CORS headers to the response

  } catch (error) {
    console.error("Error during POST request:", error);
    let res = NextResponse.json({ error: 'An error occurred while sending event' }, { status: 500 });
    return addCorsHeaders(res); // Add CORS headers to error response
  }
}

// Handle OPTIONS requests (for CORS preflight)
export async function OPTIONS() {
  let res = NextResponse.json({}, { status: 200 });
  return addCorsHeaders(res); // Add CORS headers to OPTIONS response
}
