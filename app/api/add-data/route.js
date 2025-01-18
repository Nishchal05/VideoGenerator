import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

// Handle CORS directly in the response
export async function POST(req) {
  try {
    // Parse the request body
    const { user } = await req.json();

    // Validate if user data exists
    if (!user || !user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({
        success: false,
        message: "User information is incomplete.",
      }, { status: 400 }); 
    }

    // Check if the user already exists in the database
    const data = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

    if (data.length > 0) {
      return NextResponse.json({
        success: true,
        message: "User already exists.",
        data: data,
      }, { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_URL,  // Allow the specific origin
          'Access-Control-Allow-Methods': 'POST, OPTIONS',  // Allow necessary methods
          'Access-Control-Allow-Headers': 'Content-Type',  // Allow necessary headers
        }
      });
    }

    // If the user doesn't exist, insert the user data into the database
    const result = await db.insert(USER_TABLE).values({
      name: user.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    }).returning(USER_TABLE);

    return NextResponse.json({
      success: true,
      message: "User added successfully.",
      data: result,
    }, { 
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_URL,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing the request.",
      error: error.toString(),
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_URL,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}

// Handle CORS preflight requests (OPTIONS)
export async function OPTIONS(req) {
  return NextResponse.json({}, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_URL,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
