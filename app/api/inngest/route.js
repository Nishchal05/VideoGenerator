import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { GenerateAIVideoData } from "@/inngest/function";
import { NextResponse } from "next/server";
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*"); 
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
async function handleRequest(req) {
  const method = req.method;

  try {
    if (method === "OPTIONS") {
      const res = NextResponse.json({}, { status: 200 });
      return addCorsHeaders(res);
    }
    const inngestHandler = serve({
      client: inngest,
      functions: [GenerateAIVideoData],
    });

    const res = await inngestHandler(req);
    return addCorsHeaders(res);  
  } catch (error) {
    console.error('Error during request handling:', error);
    const res = NextResponse.json({ error: 'An error occurred during the request' }, { status: 500 });
    return addCorsHeaders(res);
  }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const OPTIONS = handleRequest;
