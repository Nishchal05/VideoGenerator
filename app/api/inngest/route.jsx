import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { GenerateAIVideoData } from "@/inngest/function";
import { NextResponse } from "next/server";

// Helper function to add CORS headers
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_API_URL);  // Replace with your frontend domain
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

// Wrapper function to handle CORS and Inngest requests
async function handleRequest(req) {
  const method = req.method;

  // Handle OPTIONS request for preflight CORS
  if (method === "OPTIONS") {
    const res = NextResponse.json({}, { status: 200 });
    return addCorsHeaders(res);
  }

  // Handle GET, POST, PUT methods with Inngest
  const inngestHandler = serve({
    client: inngest,
    functions: [GenerateAIVideoData],
  });

  const res = await inngestHandler(req);
  return addCorsHeaders(res);  // Add CORS headers to the response
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const OPTIONS = handleRequest;
