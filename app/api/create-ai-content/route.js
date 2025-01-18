import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*"); 
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
export async function POST(req) {
  try {
    const { prompt, videoId } = await req.json();
    await inngest.send({
      name: "ai/generate-video-data",
      data: {
        prompt: prompt,
        videoId: videoId,
      },
    });

    let res = NextResponse.json({ result: 'Event Sent!' });
    return addCorsHeaders(res);

  } catch (error) {
    console.error("Error during POST request:", error);
    let res = NextResponse.json({ error: 'An error occurred while sending event' }, { status: 500 });
    return addCorsHeaders(res); 
  }
}

// Handle OPTIONS requests (for CORS preflight)
export async function OPTIONS() {
  let res = NextResponse.json({}, { status: 200 });
  return addCorsHeaders(res); 
}
