import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { GenerateAIVideoData } from "@/inngest/function";
import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],  // Allowed methods
  origin: `${process.env.NEXT_PUBLIC_API_URL}`,  // Allowed origin
  credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
});

// Helper function to run middleware
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

// Wrapper to serve with CORS handling
async function handleRequest(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);
  
  // Serve Inngest functions after CORS is handled
  return serve({
    client: inngest,
    functions: [GenerateAIVideoData],
  })(req, res);
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
